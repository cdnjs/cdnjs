(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.jsforce||(g.jsforce = {}));g=(g.modules||(g.modules = {}));g=(g.api||(g.api = {}));g.Bulk = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process){
/*global process*/
/**
 * @file Manages Salesforce Bulk API related operations
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

'use strict';

var inherits     = window.jsforce.require('inherits'),
    stream       = window.jsforce.require('readable-stream'),
    Duplex       = stream.Duplex,
    events       = window.jsforce.require('events'),
    _            = window.jsforce.require('lodash/core'),
    joinStreams  = window.jsforce.require('multistream'),
    jsforce      = window.jsforce.require('./core'),
    RecordStream = window.jsforce.require('./record-stream'),
    Promise      = window.jsforce.require('./promise'),
    HttpApi      = window.jsforce.require('./http-api');

/*--------------------------------------------*/

/**
 * Class for Bulk API Job
 *
 * @protected
 * @class Bulk~Job
 * @extends events.EventEmitter
 *
 * @param {Bulk} bulk - Bulk API object
 * @param {String} [type] - SObject type
 * @param {String} [operation] - Bulk load operation ('insert', 'update', 'upsert', 'delete', or 'hardDelete')
 * @param {Object} [options] - Options for bulk loading operation
 * @param {String} [options.extIdField] - External ID field name (used when upsert operation).
 * @param {String} [options.concurrencyMode] - 'Serial' or 'Parallel'. Defaults to Parallel.
 * @param {String} [jobId] - Job ID (if already available)
 */
var Job = function(bulk, type, operation, options, jobId) {
  this._bulk = bulk;
  this.type = type;
  this.operation = operation;
  this.options = options || {};
  this.id = jobId;
  this.state = this.id ? 'Open' : 'Unknown';
  this._batches = {};
};

inherits(Job, events.EventEmitter);

/**
 * @typedef {Object} Bulk~JobInfo
 * @prop {String} id - Job ID
 * @prop {String} object - Object type name
 * @prop {String} operation - Operation type of the job
 * @prop {String} state - Job status
 */

/**
 * Return latest jobInfo from cache
 *
 * @method Bulk~Job#open
 * @param {Callback.<Bulk~JobInfo>} [callback] - Callback function
 * @returns {Promise.<Bulk~JobInfo>}
 */
Job.prototype.info = function(callback) {
  var self = this;
  // if cache is not available, check the latest
  if (!this._jobInfo) {
    this._jobInfo = this.check();
  }
  return this._jobInfo.thenCall(callback);
};

/**
 * Open new job and get jobinfo
 *
 * @method Bulk~Job#open
 * @param {Callback.<Bulk~JobInfo>} [callback] - Callback function
 * @returns {Promise.<Bulk~JobInfo>}
 */
Job.prototype.open = function(callback) {
  var self = this;
  var bulk = this._bulk;
  var logger = bulk._logger;

  // if not requested opening job
  if (!this._jobInfo) {
    var operation = this.operation.toLowerCase();
    if (operation === 'harddelete') { operation = 'hardDelete'; }
    var body = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<jobInfo  xmlns="http://www.force.com/2009/06/asyncapi/dataload">',
        '<operation>' + operation + '</operation>',
        '<object>' + this.type + '</object>',
        (this.options.extIdField ?
         '<externalIdFieldName>'+this.options.extIdField+'</externalIdFieldName>' :
         ''),
        (this.options.concurrencyMode ?
         '<concurrencyMode>'+this.options.concurrencyMode+'</concurrencyMode>' :
         ''),
        (this.options.assignmentRuleId ?
          '<assignmentRuleId>' + this.options.assignmentRuleId + '</assignmentRuleId>' :
          ''),
        '<contentType>CSV</contentType>',
      '</jobInfo>'
    ].join('');

    this._jobInfo = bulk._request({
      method : 'POST',
      path : "/job",
      body : body,
      headers : {
        "Content-Type" : "application/xml; charset=utf-8"
      },
      responseType: "application/xml"
    }).then(function(res) {
      self.emit("open", res.jobInfo);
      self.id = res.jobInfo.id;
      self.state = res.jobInfo.state;
      return res.jobInfo;
    }, function(err) {
      self.emit("error", err);
      throw err;
    });
  }
  return this._jobInfo.thenCall(callback);
};

/**
 * Create a new batch instance in the job
 *
 * @method Bulk~Job#createBatch
 * @returns {Bulk~Batch}
 */
Job.prototype.createBatch = function() {
  var batch = new Batch(this);
  var self = this;
  batch.on('queue', function() {
    self._batches[batch.id] = batch;
  });
  return batch;
};

/**
 * Get a batch instance specified by given batch ID
 *
 * @method Bulk~Job#batch
 * @param {String} batchId - Batch ID
 * @returns {Bulk~Batch}
 */
Job.prototype.batch = function(batchId) {
  var batch = this._batches[batchId];
  if (!batch) {
    batch = new Batch(this, batchId);
    this._batches[batchId] = batch;
  }
  return batch;
};

/**
 * Check the latest job status from server
 *
 * @method Bulk~Job#check
 * @param {Callback.<Bulk~JobInfo>} [callback] - Callback function
 * @returns {Promise.<Bulk~JobInfo>}
 */
Job.prototype.check = function(callback) {
  var self = this;
  var bulk = this._bulk;
  var logger = bulk._logger;

  this._jobInfo = this._waitAssign().then(function() {
    return bulk._request({
      method : 'GET',
      path : "/job/" + self.id,
      responseType: "application/xml"
    });
  }).then(function(res) {
    logger.debug(res.jobInfo);
    self.id = res.jobInfo.id;
    self.type = res.jobInfo.object;
    self.operation = res.jobInfo.operation;
    self.state = res.jobInfo.state;
    return res.jobInfo;
  });
  return this._jobInfo.thenCall(callback);
};

/**
 * Wait till the job is assigned to server
 *
 * @method Bulk~Job#info
 * @param {Callback.<Bulk~JobInfo>} [callback] - Callback function
 * @returns {Promise.<Bulk~JobInfo>}
 */
Job.prototype._waitAssign = function(callback) {
  return (this.id ? Promise.resolve({ id: this.id }) : this.open()).thenCall(callback);
};


/**
 * List all registered batch info in job
 *
 * @method Bulk~Job#list
 * @param {Callback.<Array.<Bulk~BatchInfo>>} [callback] - Callback function
 * @returns {Promise.<Array.<Bulk~BatchInfo>>}
 */
Job.prototype.list = function(callback) {
  var self = this;
  var bulk = this._bulk;
  var logger = bulk._logger;

  return this._waitAssign().then(function() {
    return bulk._request({
      method : 'GET',
      path : "/job/" + self.id + "/batch",
      responseType: "application/xml"
    });
  }).then(function(res) {
    logger.debug(res.batchInfoList.batchInfo);
    var batchInfoList = res.batchInfoList;
    batchInfoList = _.isArray(batchInfoList.batchInfo) ? batchInfoList.batchInfo : [ batchInfoList.batchInfo ];
    return batchInfoList;
  }).thenCall(callback);

};

/**
 * Close opened job
 *
 * @method Bulk~Job#close
 * @param {Callback.<Bulk~JobInfo>} [callback] - Callback function
 * @returns {Promise.<Bulk~JobInfo>}
 */
Job.prototype.close = function() {
  var self = this;
  return this._changeState("Closed").then(function(jobInfo) {
    self.id = null;
    self.emit("close", jobInfo);
    return jobInfo;
  }, function(err) {
    self.emit("error", err);
    throw err;
  });
};

/**
 * Set the status to abort
 *
 * @method Bulk~Job#abort
 * @param {Callback.<Bulk~JobInfo>} [callback] - Callback function
 * @returns {Promise.<Bulk~JobInfo>}
 */
Job.prototype.abort = function() {
  var self = this;
  return this._changeState("Aborted").then(function(jobInfo) {
    self.id = null;
    self.emit("abort", jobInfo);
    return jobInfo;
  }, function(err) {
    self.emit("error", err);
    throw err;
  });
};

/**
 * @private
 */
Job.prototype._changeState = function(state, callback) {
  var self = this;
  var bulk = this._bulk;
  var logger = bulk._logger;

  this._jobInfo = this._waitAssign().then(function() {
    var body = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<jobInfo xmlns="http://www.force.com/2009/06/asyncapi/dataload">',
        '<state>' + state + '</state>',
      '</jobInfo>'
    ].join('');
    return bulk._request({
      method : 'POST',
      path : "/job/" + self.id,
      body : body,
      headers : {
        "Content-Type" : "application/xml; charset=utf-8"
      },
      responseType: "application/xml"
    });
  }).then(function(res) {
    logger.debug(res.jobInfo);
    self.state = res.jobInfo.state;
    return res.jobInfo;
  });
  return this._jobInfo.thenCall(callback);

};


/*--------------------------------------------*/

/**
 * Batch (extends RecordStream)
 *
 * @protected
 * @class Bulk~Batch
 * @extends {stream.Writable}
 * @implements {Promise.<Array.<RecordResult>>}
 * @param {Bulk~Job} job - Bulk job object
 * @param {String} [batchId] - Batch ID (if already available)
 */
var Batch = function(job, batchId) {
  Batch.super_.call(this, { objectMode: true });
  this.job = job;
  this.id = batchId;
  this._bulk = job._bulk;
  this._deferred = Promise.defer();
  this._setupDataStreams();
};

inherits(Batch, stream.Writable);


/**
 * @private
 */
Batch.prototype._setupDataStreams = function() {
  var batch = this;
  var converterOptions = { nullValue : '#N/A' };
  this._uploadStream = new RecordStream.Serializable();
  this._uploadDataStream = this._uploadStream.stream('csv', converterOptions);
  this._downloadStream = new RecordStream.Parsable();
  this._downloadDataStream = this._downloadStream.stream('csv', converterOptions);

  this.on('finish', function() {
    batch._uploadStream.end();
  });
  this._uploadDataStream.once('readable', function() {
    batch.job.open().then(function() {
      // pipe upload data to batch API request stream
      batch._uploadDataStream.pipe(batch._createRequestStream());
    });
  });

  // duplex data stream, opened access to API programmers by Batch#stream()
  var dataStream = this._dataStream = new Duplex();
  dataStream._write = function(data, enc, cb) {
    batch._uploadDataStream.write(data, enc, cb);
  };
  dataStream.on('finish', function() {
    batch._uploadDataStream.end();
  });

  this._downloadDataStream.on('readable', function() {
    dataStream.read(0);
  });
  this._downloadDataStream.on('end', function() {
    dataStream.push(null);
  });
  dataStream._read = function(size) {
    var chunk;
    while ((chunk = batch._downloadDataStream.read()) !== null) {
      dataStream.push(chunk);
    }
  };
};

/**
 * Connect batch API and create stream instance of request/response
 *
 * @private
 * @returns {stream.Duplex}
 */
Batch.prototype._createRequestStream = function() {
  var batch = this;
  var bulk = batch._bulk;
  var logger = bulk._logger;

  return bulk._request({
    method : 'POST',
    path : "/job/" + batch.job.id + "/batch",
    headers: {
      "Content-Type": "text/csv"
    },
    responseType: "application/xml"
  }, function(err, res) {
    if (err) {
      batch.emit('error', err);
    } else {
      logger.debug(res.batchInfo);
      batch.id = res.batchInfo.id;
      batch.emit('queue', res.batchInfo);
    }
  }).stream();
};

/**
 * Implementation of Writable
 *
 * @override
 * @private
 */
Batch.prototype._write = function(record, enc, cb) {
  record = _.clone(record);
  if (this.job.operation === "insert") {
    delete record.Id;
  } else if (this.job.operation === "delete") {
    record = { Id: record.Id };
  }
  delete record.type;
  delete record.attributes;
  this._uploadStream.write(record, enc, cb);
};

/**
 * Returns duplex stream which accepts CSV data input and batch result output
 *
 * @returns {stream.Duplex}
 */
Batch.prototype.stream = function() {
  return this._dataStream;
};

/**
 * Execute batch operation
 *
 * @method Bulk~Batch#execute
 * @param {Array.<Record>|stream.Stream|String} [input] - Input source for batch operation. Accepts array of records, CSV string, and CSV data input stream in insert/update/upsert/delete/hardDelete operation, SOQL string in query operation.
 * @param {Callback.<Array.<RecordResult>|Array.<BatchResultInfo>>} [callback] - Callback function
 * @returns {Bulk~Batch}
 */
Batch.prototype.run =
Batch.prototype.exec =
Batch.prototype.execute = function(input, callback) {
  var self = this;

  if (typeof input === 'function') { // if input argument is omitted
    callback = input;
    input = null;
  }

  // if batch is already executed
  if (this._result) {
    throw new Error("Batch already executed.");
  }

  var rdeferred = Promise.defer();
  this._result = rdeferred.promise;
  this._result.then(function(res) {
    self._deferred.resolve(res);
  }, function(err) {
    self._deferred.reject(err);
  });
  this.once('response', function(res) {
    rdeferred.resolve(res);
  });
  this.once('error', function(err) {
    rdeferred.reject(err);
  });

  if (_.isObject(input) && _.isFunction(input.pipe)) { // if input has stream.Readable interface
    input.pipe(this._dataStream);
  } else {
    var data;
    if (_.isArray(input)) {
      _.forEach(input, function(record) { self.write(record); });
      self.end();
    } else if (_.isString(input)){
      data = input;
      this._dataStream.write(data, 'utf8');
      this._dataStream.end();
    }
  }

  // return Batch instance for chaining
  return this.thenCall(callback);
};

/**
 * Promise/A+ interface
 * http://promises-aplus.github.io/promises-spec/
 *
 * Delegate to deferred promise, return promise instance for batch result
 *
 * @method Bulk~Batch#then
 */
Batch.prototype.then = function(onResolved, onReject, onProgress) {
  return this._deferred.promise.then(onResolved, onReject, onProgress);
};

/**
 * Promise/A+ extension
 * Call "then" using given node-style callback function
 *
 * @method Bulk~Batch#thenCall
 */
Batch.prototype.thenCall = function(callback) {
  if (_.isFunction(callback)) {
    this.then(function(res) {
      process.nextTick(function() {
        callback(null, res);
      });
    }, function(err) {
      process.nextTick(function() {
        callback(err);
      });
    });
  }
  return this;
};

/**
 * @typedef {Object} Bulk~BatchInfo
 * @prop {String} id - Batch ID
 * @prop {String} jobId - Job ID
 * @prop {String} state - Batch state
 * @prop {String} stateMessage - Batch state message
 */

/**
 * Check the latest batch status in server
 *
 * @method Bulk~Batch#check
 * @param {Callback.<Bulk~BatchInfo>} [callback] - Callback function
 * @returns {Promise.<Bulk~BatchInfo>}
 */
Batch.prototype.check = function(callback) {
  var self = this;
  var bulk = this._bulk;
  var logger = bulk._logger;
  var jobId = this.job.id;
  var batchId = this.id;

  if (!jobId || !batchId) {
    throw new Error("Batch not started.");
  }
  return bulk._request({
    method : 'GET',
    path : "/job/" + jobId + "/batch/" + batchId,
    responseType: "application/xml"
  }).then(function(res) {
    logger.debug(res.batchInfo);
    return res.batchInfo;
  }).thenCall(callback);
};


/**
 * Polling the batch result and retrieve
 *
 * @method Bulk~Batch#poll
 * @param {Number} interval - Polling interval in milliseconds
 * @param {Number} timeout - Polling timeout in milliseconds
 */
Batch.prototype.poll = function(interval, timeout) {
  var self = this;
  var jobId = this.job.id;
  var batchId = this.id;

  if (!jobId || !batchId) {
    throw new Error("Batch not started.");
  }
  var startTime = new Date().getTime();
  var poll = function() {
    var now = new Date().getTime();
    if (startTime + timeout < now) {
      var err = new Error("Polling time out. Job Id = " + jobId + " , batch Id = " + batchId);
      err.name = 'PollingTimeout';
      self.emit('error', err);
      return;
    }
    self.check(function(err, res) {
      if (err) {
        self.emit('error', err);
      } else {
        if (res.state === "Failed") {
          if (parseInt(res.numberRecordsProcessed, 10) > 0) {
            self.retrieve();
          } else {
            self.emit('error', new Error(res.stateMessage));
          }
        } else if (res.state === "Completed") {
          self.retrieve();
        } else {
          self.emit('progress', res);
          setTimeout(poll, interval);
        }
      }
    });
  };
  setTimeout(poll, interval);
};

/**
 * @typedef {Object} Bulk~BatchResultInfo
 * @prop {String} id - Batch result ID
 * @prop {String} batchId - Batch ID which includes this batch result.
 * @prop {String} jobId - Job ID which includes this batch result.
 */

/**
 * Retrieve batch result
 *
 * @method Bulk~Batch#retrieve
 * @param {Callback.<Array.<RecordResult>|Array.<Bulk~BatchResultInfo>>} [callback] - Callback function
 * @returns {Promise.<Array.<RecordResult>|Array.<Bulk~BatchResultInfo>>}
 */
Batch.prototype.retrieve = function(callback) {
  var self = this;
  var bulk = this._bulk;
  var jobId = this.job.id;
  var job = this.job;
  var batchId = this.id;

  if (!jobId || !batchId) {
    throw new Error("Batch not started.");
  }

  return job.info().then(function(jobInfo) {
    return bulk._request({
      method : 'GET',
      path : "/job/" + jobId + "/batch/" + batchId + "/result"
    });
  }).then(function(res) {
    var results;
    if (job.operation === 'query') {
      var conn = bulk._conn;
      var resultIds = res['result-list'].result;
      results = res['result-list'].result;
      results = _.map(_.isArray(results) ? results : [ results ], function(id) {
        return {
          id: id,
          batchId: batchId,
          jobId: jobId
        };
      });
    } else {
      results = _.map(res, function(ret) {
        return {
          id: ret.Id || null,
          success: ret.Success === "true",
          errors: ret.Error ? [ ret.Error ] : []
        };
      });
    }
    self.emit('response', results);
    return results;
  }).fail(function(err) {
    self.emit('error', err);
    throw err;
  }).thenCall(callback);
};

/**
 * Fetch query result as a record stream
 * @param {String} resultId - Result id
 * @returns {RecordStream} - Record stream, convertible to CSV data stream
 */
Batch.prototype.result = function(resultId) {
  var jobId = this.job.id;
  var batchId = this.id;
  if (!jobId || !batchId) {
    throw new Error("Batch not started.");
  }
  var resultStream = new RecordStream.Parsable();
  var resultDataStream = resultStream.stream('csv');
  var reqStream = this._bulk._request({
    method : 'GET',
    path : "/job/" + jobId + "/batch/" + batchId + "/result/" + resultId,
    responseType: "application/octet-stream"
  }).stream().pipe(resultDataStream);
  return resultStream;
};

/*--------------------------------------------*/
/**
 * @private
 */
var BulkApi = function() {
  BulkApi.super_.apply(this, arguments);
};

inherits(BulkApi, HttpApi);

BulkApi.prototype.beforeSend = function(request) {
  request.headers = request.headers || {};
  request.headers["X-SFDC-SESSION"] = this._conn.accessToken;
};

BulkApi.prototype.isSessionExpired = function(response) {
  return response.statusCode === 400 &&
    /<exceptionCode>InvalidSessionId<\/exceptionCode>/.test(response.body);
};

BulkApi.prototype.hasErrorInResponseBody = function(body) {
  return !!body.error;
};

BulkApi.prototype.parseError = function(body) {
  return {
    errorCode: body.error.exceptionCode,
    message: body.error.exceptionMessage
  };
};

/*--------------------------------------------*/

/**
 * Class for Bulk API
 *
 * @class
 * @param {Connection} conn - Connection object
 */
var Bulk = function(conn) {
  this._conn = conn;
  this._logger = conn._logger;
};

/**
 * Polling interval in milliseconds
 * @type {Number}
 */
Bulk.prototype.pollInterval = 1000;

/**
 * Polling timeout in milliseconds
 * @type {Number}
 */
Bulk.prototype.pollTimeout = 10000;

/** @private **/
Bulk.prototype._request = function(request, callback) {
  var conn = this._conn;
  request = _.clone(request);
  var baseUrl = [ conn.instanceUrl, "services/async", conn.version ].join('/');
  request.url = baseUrl + request.path;
  var options = { responseType: request.responseType };
  delete request.path;
  delete request.responseType;
  return new BulkApi(this._conn, options).request(request).thenCall(callback);
};

/**
 * Create and start bulkload job and batch
 *
 * @param {String} type - SObject type
 * @param {String} operation - Bulk load operation ('insert', 'update', 'upsert', 'delete', or 'hardDelete')
 * @param {Object} [options] - Options for bulk loading operation
 * @param {String} [options.extIdField] - External ID field name (used when upsert operation).
 * @param {String} [options.concurrencyMode] - 'Serial' or 'Parallel'. Defaults to Parallel.
 * @param {Array.<Record>|stream.Stream|String} [input] - Input source for bulkload. Accepts array of records, CSV string, and CSV data input stream in insert/update/upsert/delete/hardDelete operation, SOQL string in query operation.
 * @param {Callback.<Array.<RecordResult>|Array.<Bulk~BatchResultInfo>>} [callback] - Callback function
 * @returns {Bulk~Batch}
 */
Bulk.prototype.load = function(type, operation, options, input, callback) {
  var self = this;
  if (!type || !operation) {
    throw new Error("Insufficient arguments. At least, 'type' and 'operation' are required.");
  }
  if (!_.isObject(options) || options.constructor !== Object) { // when options is not plain hash object, it is omitted
    callback = input;
    input = options;
    options = null;
  }
  var job = this.createJob(type, operation, options);
  job.once('error', function (error) {
    if (batch) {
      batch.emit('error', error); // pass job error to batch
    }
  });
  var batch = job.createBatch();
  var cleanup = function() {
    batch = null;
    job.close();
  };
  var cleanupOnError = function(err) {
    if (err.name !== 'PollingTimeout') {
      cleanup();
    }
  };
  batch.on('response', cleanup);
  batch.on('error', cleanupOnError);
  batch.on('queue', function() { batch.poll(self.pollInterval, self.pollTimeout); });
  return batch.execute(input, callback);
};

/**
 * Execute bulk query and get record stream
 *
 * @param {String} soql - SOQL to execute in bulk job
 * @returns {RecordStream.Parsable} - Record stream, convertible to CSV data stream
 */
Bulk.prototype.query = function(soql) {
  var m = soql.replace(/\([\s\S]+\)/g, '').match(/FROM\s+(\w+)/i);
  if (!m) {
    throw new Error("No sobject type found in query, maybe caused by invalid SOQL.");
  }
  var type = m[1];
  var self = this;
  var recordStream = new RecordStream.Parsable();
  var dataStream = recordStream.stream('csv');
  this.load(type, "query", soql).then(function(results) {
    var streams = results.map(function(result) {
      return self
        .job(result.jobId)
        .batch(result.batchId)
        .result(result.id)
        .stream();
    });

    joinStreams(streams).pipe(dataStream);
  }).fail(function(err) {
    recordStream.emit('error', err);
  });
  return recordStream;
};


/**
 * Create a new job instance
 *
 * @param {String} type - SObject type
 * @param {String} operation - Bulk load operation ('insert', 'update', 'upsert', 'delete', 'hardDelete', or 'query')
 * @param {Object} [options] - Options for bulk loading operation
 * @returns {Bulk~Job}
 */
Bulk.prototype.createJob = function(type, operation, options) {
  return new Job(this, type, operation, options);
};

/**
 * Get a job instance specified by given job ID
 *
 * @param {String} jobId - Job ID
 * @returns {Bulk~Job}
 */
Bulk.prototype.job = function(jobId) {
  return new Job(this, null, null, null, jobId);
};


/*--------------------------------------------*/
/*
 * Register hook in connection instantiation for dynamically adding this API module features
 */
jsforce.on('connection:new', function(conn) {
  conn.bulk = new Bulk(conn);
});


module.exports = Bulk;

}).call(this,require('_process'))

},{"_process":2}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

(function () {
  try {
    cachedSetTimeout = setTimeout;
  } catch (e) {
    cachedSetTimeout = function () {
      throw new Error('setTimeout is not defined');
    }
  }
  try {
    cachedClearTimeout = clearTimeout;
  } catch (e) {
    cachedClearTimeout = function () {
      throw new Error('clearTimeout is not defined');
    }
  }
} ())
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = cachedSetTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    cachedClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        cachedSetTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
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

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYXBpL2J1bGsuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmdsb2JhbCBwcm9jZXNzKi9cbi8qKlxuICogQGZpbGUgTWFuYWdlcyBTYWxlc2ZvcmNlIEJ1bGsgQVBJIHJlbGF0ZWQgb3BlcmF0aW9uc1xuICogQGF1dGhvciBTaGluaWNoaSBUb21pdGEgPHNoaW5pY2hpLnRvbWl0YUBnbWFpbC5jb20+XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgICAgID0gd2luZG93LmpzZm9yY2UucmVxdWlyZSgnaW5oZXJpdHMnKSxcbiAgICBzdHJlYW0gICAgICAgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCdyZWFkYWJsZS1zdHJlYW0nKSxcbiAgICBEdXBsZXggICAgICAgPSBzdHJlYW0uRHVwbGV4LFxuICAgIGV2ZW50cyAgICAgICA9IHdpbmRvdy5qc2ZvcmNlLnJlcXVpcmUoJ2V2ZW50cycpLFxuICAgIF8gICAgICAgICAgICA9IHdpbmRvdy5qc2ZvcmNlLnJlcXVpcmUoJ2xvZGFzaC9jb3JlJyksXG4gICAgam9pblN0cmVhbXMgID0gd2luZG93LmpzZm9yY2UucmVxdWlyZSgnbXVsdGlzdHJlYW0nKSxcbiAgICBqc2ZvcmNlICAgICAgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCcuL2NvcmUnKSxcbiAgICBSZWNvcmRTdHJlYW0gPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCcuL3JlY29yZC1zdHJlYW0nKSxcbiAgICBQcm9taXNlICAgICAgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCcuL3Byb21pc2UnKSxcbiAgICBIdHRwQXBpICAgICAgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCcuL2h0dHAtYXBpJyk7XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIENsYXNzIGZvciBCdWxrIEFQSSBKb2JcbiAqXG4gKiBAcHJvdGVjdGVkXG4gKiBAY2xhc3MgQnVsa35Kb2JcbiAqIEBleHRlbmRzIGV2ZW50cy5FdmVudEVtaXR0ZXJcbiAqXG4gKiBAcGFyYW0ge0J1bGt9IGJ1bGsgLSBCdWxrIEFQSSBvYmplY3RcbiAqIEBwYXJhbSB7U3RyaW5nfSBbdHlwZV0gLSBTT2JqZWN0IHR5cGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3BlcmF0aW9uXSAtIEJ1bGsgbG9hZCBvcGVyYXRpb24gKCdpbnNlcnQnLCAndXBkYXRlJywgJ3Vwc2VydCcsICdkZWxldGUnLCBvciAnaGFyZERlbGV0ZScpXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gT3B0aW9ucyBmb3IgYnVsayBsb2FkaW5nIG9wZXJhdGlvblxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmV4dElkRmllbGRdIC0gRXh0ZXJuYWwgSUQgZmllbGQgbmFtZSAodXNlZCB3aGVuIHVwc2VydCBvcGVyYXRpb24pLlxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmNvbmN1cnJlbmN5TW9kZV0gLSAnU2VyaWFsJyBvciAnUGFyYWxsZWwnLiBEZWZhdWx0cyB0byBQYXJhbGxlbC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbam9iSWRdIC0gSm9iIElEIChpZiBhbHJlYWR5IGF2YWlsYWJsZSlcbiAqL1xudmFyIEpvYiA9IGZ1bmN0aW9uKGJ1bGssIHR5cGUsIG9wZXJhdGlvbiwgb3B0aW9ucywgam9iSWQpIHtcbiAgdGhpcy5fYnVsayA9IGJ1bGs7XG4gIHRoaXMudHlwZSA9IHR5cGU7XG4gIHRoaXMub3BlcmF0aW9uID0gb3BlcmF0aW9uO1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB0aGlzLmlkID0gam9iSWQ7XG4gIHRoaXMuc3RhdGUgPSB0aGlzLmlkID8gJ09wZW4nIDogJ1Vua25vd24nO1xuICB0aGlzLl9iYXRjaGVzID0ge307XG59O1xuXG5pbmhlcml0cyhKb2IsIGV2ZW50cy5FdmVudEVtaXR0ZXIpO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEJ1bGt+Sm9iSW5mb1xuICogQHByb3Age1N0cmluZ30gaWQgLSBKb2IgSURcbiAqIEBwcm9wIHtTdHJpbmd9IG9iamVjdCAtIE9iamVjdCB0eXBlIG5hbWVcbiAqIEBwcm9wIHtTdHJpbmd9IG9wZXJhdGlvbiAtIE9wZXJhdGlvbiB0eXBlIG9mIHRoZSBqb2JcbiAqIEBwcm9wIHtTdHJpbmd9IHN0YXRlIC0gSm9iIHN0YXR1c1xuICovXG5cbi8qKlxuICogUmV0dXJuIGxhdGVzdCBqb2JJbmZvIGZyb20gY2FjaGVcbiAqXG4gKiBAbWV0aG9kIEJ1bGt+Sm9iI29wZW5cbiAqIEBwYXJhbSB7Q2FsbGJhY2suPEJ1bGt+Sm9iSW5mbz59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPEJ1bGt+Sm9iSW5mbz59XG4gKi9cbkpvYi5wcm90b3R5cGUuaW5mbyA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgLy8gaWYgY2FjaGUgaXMgbm90IGF2YWlsYWJsZSwgY2hlY2sgdGhlIGxhdGVzdFxuICBpZiAoIXRoaXMuX2pvYkluZm8pIHtcbiAgICB0aGlzLl9qb2JJbmZvID0gdGhpcy5jaGVjaygpO1xuICB9XG4gIHJldHVybiB0aGlzLl9qb2JJbmZvLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogT3BlbiBuZXcgam9iIGFuZCBnZXQgam9iaW5mb1xuICpcbiAqIEBtZXRob2QgQnVsa35Kb2Ijb3BlblxuICogQHBhcmFtIHtDYWxsYmFjay48QnVsa35Kb2JJbmZvPn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48QnVsa35Kb2JJbmZvPn1cbiAqL1xuSm9iLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgYnVsayA9IHRoaXMuX2J1bGs7XG4gIHZhciBsb2dnZXIgPSBidWxrLl9sb2dnZXI7XG5cbiAgLy8gaWYgbm90IHJlcXVlc3RlZCBvcGVuaW5nIGpvYlxuICBpZiAoIXRoaXMuX2pvYkluZm8pIHtcbiAgICB2YXIgb3BlcmF0aW9uID0gdGhpcy5vcGVyYXRpb24udG9Mb3dlckNhc2UoKTtcbiAgICBpZiAob3BlcmF0aW9uID09PSAnaGFyZGRlbGV0ZScpIHsgb3BlcmF0aW9uID0gJ2hhcmREZWxldGUnOyB9XG4gICAgdmFyIGJvZHkgPSBbXG4gICAgICAnPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiVVRGLThcIj8+JyxcbiAgICAgICc8am9iSW5mbyAgeG1sbnM9XCJodHRwOi8vd3d3LmZvcmNlLmNvbS8yMDA5LzA2L2FzeW5jYXBpL2RhdGFsb2FkXCI+JyxcbiAgICAgICAgJzxvcGVyYXRpb24+JyArIG9wZXJhdGlvbiArICc8L29wZXJhdGlvbj4nLFxuICAgICAgICAnPG9iamVjdD4nICsgdGhpcy50eXBlICsgJzwvb2JqZWN0PicsXG4gICAgICAgICh0aGlzLm9wdGlvbnMuZXh0SWRGaWVsZCA/XG4gICAgICAgICAnPGV4dGVybmFsSWRGaWVsZE5hbWU+Jyt0aGlzLm9wdGlvbnMuZXh0SWRGaWVsZCsnPC9leHRlcm5hbElkRmllbGROYW1lPicgOlxuICAgICAgICAgJycpLFxuICAgICAgICAodGhpcy5vcHRpb25zLmNvbmN1cnJlbmN5TW9kZSA/XG4gICAgICAgICAnPGNvbmN1cnJlbmN5TW9kZT4nK3RoaXMub3B0aW9ucy5jb25jdXJyZW5jeU1vZGUrJzwvY29uY3VycmVuY3lNb2RlPicgOlxuICAgICAgICAgJycpLFxuICAgICAgICAodGhpcy5vcHRpb25zLmFzc2lnbm1lbnRSdWxlSWQgP1xuICAgICAgICAgICc8YXNzaWdubWVudFJ1bGVJZD4nICsgdGhpcy5vcHRpb25zLmFzc2lnbm1lbnRSdWxlSWQgKyAnPC9hc3NpZ25tZW50UnVsZUlkPicgOlxuICAgICAgICAgICcnKSxcbiAgICAgICAgJzxjb250ZW50VHlwZT5DU1Y8L2NvbnRlbnRUeXBlPicsXG4gICAgICAnPC9qb2JJbmZvPidcbiAgICBdLmpvaW4oJycpO1xuXG4gICAgdGhpcy5fam9iSW5mbyA9IGJ1bGsuX3JlcXVlc3Qoe1xuICAgICAgbWV0aG9kIDogJ1BPU1QnLFxuICAgICAgcGF0aCA6IFwiL2pvYlwiLFxuICAgICAgYm9keSA6IGJvZHksXG4gICAgICBoZWFkZXJzIDoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiIDogXCJhcHBsaWNhdGlvbi94bWw7IGNoYXJzZXQ9dXRmLThcIlxuICAgICAgfSxcbiAgICAgIHJlc3BvbnNlVHlwZTogXCJhcHBsaWNhdGlvbi94bWxcIlxuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICBzZWxmLmVtaXQoXCJvcGVuXCIsIHJlcy5qb2JJbmZvKTtcbiAgICAgIHNlbGYuaWQgPSByZXMuam9iSW5mby5pZDtcbiAgICAgIHNlbGYuc3RhdGUgPSByZXMuam9iSW5mby5zdGF0ZTtcbiAgICAgIHJldHVybiByZXMuam9iSW5mbztcbiAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgIHNlbGYuZW1pdChcImVycm9yXCIsIGVycik7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2pvYkluZm8udGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgYmF0Y2ggaW5zdGFuY2UgaW4gdGhlIGpvYlxuICpcbiAqIEBtZXRob2QgQnVsa35Kb2IjY3JlYXRlQmF0Y2hcbiAqIEByZXR1cm5zIHtCdWxrfkJhdGNofVxuICovXG5Kb2IucHJvdG90eXBlLmNyZWF0ZUJhdGNoID0gZnVuY3Rpb24oKSB7XG4gIHZhciBiYXRjaCA9IG5ldyBCYXRjaCh0aGlzKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBiYXRjaC5vbigncXVldWUnLCBmdW5jdGlvbigpIHtcbiAgICBzZWxmLl9iYXRjaGVzW2JhdGNoLmlkXSA9IGJhdGNoO1xuICB9KTtcbiAgcmV0dXJuIGJhdGNoO1xufTtcblxuLyoqXG4gKiBHZXQgYSBiYXRjaCBpbnN0YW5jZSBzcGVjaWZpZWQgYnkgZ2l2ZW4gYmF0Y2ggSURcbiAqXG4gKiBAbWV0aG9kIEJ1bGt+Sm9iI2JhdGNoXG4gKiBAcGFyYW0ge1N0cmluZ30gYmF0Y2hJZCAtIEJhdGNoIElEXG4gKiBAcmV0dXJucyB7QnVsa35CYXRjaH1cbiAqL1xuSm9iLnByb3RvdHlwZS5iYXRjaCA9IGZ1bmN0aW9uKGJhdGNoSWQpIHtcbiAgdmFyIGJhdGNoID0gdGhpcy5fYmF0Y2hlc1tiYXRjaElkXTtcbiAgaWYgKCFiYXRjaCkge1xuICAgIGJhdGNoID0gbmV3IEJhdGNoKHRoaXMsIGJhdGNoSWQpO1xuICAgIHRoaXMuX2JhdGNoZXNbYmF0Y2hJZF0gPSBiYXRjaDtcbiAgfVxuICByZXR1cm4gYmF0Y2g7XG59O1xuXG4vKipcbiAqIENoZWNrIHRoZSBsYXRlc3Qgam9iIHN0YXR1cyBmcm9tIHNlcnZlclxuICpcbiAqIEBtZXRob2QgQnVsa35Kb2IjY2hlY2tcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPEJ1bGt+Sm9iSW5mbz59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPEJ1bGt+Sm9iSW5mbz59XG4gKi9cbkpvYi5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBidWxrID0gdGhpcy5fYnVsaztcbiAgdmFyIGxvZ2dlciA9IGJ1bGsuX2xvZ2dlcjtcblxuICB0aGlzLl9qb2JJbmZvID0gdGhpcy5fd2FpdEFzc2lnbigpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGJ1bGsuX3JlcXVlc3Qoe1xuICAgICAgbWV0aG9kIDogJ0dFVCcsXG4gICAgICBwYXRoIDogXCIvam9iL1wiICsgc2VsZi5pZCxcbiAgICAgIHJlc3BvbnNlVHlwZTogXCJhcHBsaWNhdGlvbi94bWxcIlxuICAgIH0pO1xuICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgIGxvZ2dlci5kZWJ1ZyhyZXMuam9iSW5mbyk7XG4gICAgc2VsZi5pZCA9IHJlcy5qb2JJbmZvLmlkO1xuICAgIHNlbGYudHlwZSA9IHJlcy5qb2JJbmZvLm9iamVjdDtcbiAgICBzZWxmLm9wZXJhdGlvbiA9IHJlcy5qb2JJbmZvLm9wZXJhdGlvbjtcbiAgICBzZWxmLnN0YXRlID0gcmVzLmpvYkluZm8uc3RhdGU7XG4gICAgcmV0dXJuIHJlcy5qb2JJbmZvO1xuICB9KTtcbiAgcmV0dXJuIHRoaXMuX2pvYkluZm8udGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBXYWl0IHRpbGwgdGhlIGpvYiBpcyBhc3NpZ25lZCB0byBzZXJ2ZXJcbiAqXG4gKiBAbWV0aG9kIEJ1bGt+Sm9iI2luZm9cbiAqIEBwYXJhbSB7Q2FsbGJhY2suPEJ1bGt+Sm9iSW5mbz59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPEJ1bGt+Sm9iSW5mbz59XG4gKi9cbkpvYi5wcm90b3R5cGUuX3dhaXRBc3NpZ24gPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICByZXR1cm4gKHRoaXMuaWQgPyBQcm9taXNlLnJlc29sdmUoeyBpZDogdGhpcy5pZCB9KSA6IHRoaXMub3BlbigpKS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG5cbi8qKlxuICogTGlzdCBhbGwgcmVnaXN0ZXJlZCBiYXRjaCBpbmZvIGluIGpvYlxuICpcbiAqIEBtZXRob2QgQnVsa35Kb2IjbGlzdFxuICogQHBhcmFtIHtDYWxsYmFjay48QXJyYXkuPEJ1bGt+QmF0Y2hJbmZvPj59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPEFycmF5LjxCdWxrfkJhdGNoSW5mbz4+fVxuICovXG5Kb2IucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBidWxrID0gdGhpcy5fYnVsaztcbiAgdmFyIGxvZ2dlciA9IGJ1bGsuX2xvZ2dlcjtcblxuICByZXR1cm4gdGhpcy5fd2FpdEFzc2lnbigpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGJ1bGsuX3JlcXVlc3Qoe1xuICAgICAgbWV0aG9kIDogJ0dFVCcsXG4gICAgICBwYXRoIDogXCIvam9iL1wiICsgc2VsZi5pZCArIFwiL2JhdGNoXCIsXG4gICAgICByZXNwb25zZVR5cGU6IFwiYXBwbGljYXRpb24veG1sXCJcbiAgICB9KTtcbiAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICBsb2dnZXIuZGVidWcocmVzLmJhdGNoSW5mb0xpc3QuYmF0Y2hJbmZvKTtcbiAgICB2YXIgYmF0Y2hJbmZvTGlzdCA9IHJlcy5iYXRjaEluZm9MaXN0O1xuICAgIGJhdGNoSW5mb0xpc3QgPSBfLmlzQXJyYXkoYmF0Y2hJbmZvTGlzdC5iYXRjaEluZm8pID8gYmF0Y2hJbmZvTGlzdC5iYXRjaEluZm8gOiBbIGJhdGNoSW5mb0xpc3QuYmF0Y2hJbmZvIF07XG4gICAgcmV0dXJuIGJhdGNoSW5mb0xpc3Q7XG4gIH0pLnRoZW5DYWxsKGNhbGxiYWNrKTtcblxufTtcblxuLyoqXG4gKiBDbG9zZSBvcGVuZWQgam9iXG4gKlxuICogQG1ldGhvZCBCdWxrfkpvYiNjbG9zZVxuICogQHBhcmFtIHtDYWxsYmFjay48QnVsa35Kb2JJbmZvPn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48QnVsa35Kb2JJbmZvPn1cbiAqL1xuSm9iLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHJldHVybiB0aGlzLl9jaGFuZ2VTdGF0ZShcIkNsb3NlZFwiKS50aGVuKGZ1bmN0aW9uKGpvYkluZm8pIHtcbiAgICBzZWxmLmlkID0gbnVsbDtcbiAgICBzZWxmLmVtaXQoXCJjbG9zZVwiLCBqb2JJbmZvKTtcbiAgICByZXR1cm4gam9iSW5mbztcbiAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgc2VsZi5lbWl0KFwiZXJyb3JcIiwgZXJyKTtcbiAgICB0aHJvdyBlcnI7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIHN0YXR1cyB0byBhYm9ydFxuICpcbiAqIEBtZXRob2QgQnVsa35Kb2IjYWJvcnRcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPEJ1bGt+Sm9iSW5mbz59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPEJ1bGt+Sm9iSW5mbz59XG4gKi9cbkpvYi5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICByZXR1cm4gdGhpcy5fY2hhbmdlU3RhdGUoXCJBYm9ydGVkXCIpLnRoZW4oZnVuY3Rpb24oam9iSW5mbykge1xuICAgIHNlbGYuaWQgPSBudWxsO1xuICAgIHNlbGYuZW1pdChcImFib3J0XCIsIGpvYkluZm8pO1xuICAgIHJldHVybiBqb2JJbmZvO1xuICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICBzZWxmLmVtaXQoXCJlcnJvclwiLCBlcnIpO1xuICAgIHRocm93IGVycjtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbkpvYi5wcm90b3R5cGUuX2NoYW5nZVN0YXRlID0gZnVuY3Rpb24oc3RhdGUsIGNhbGxiYWNrKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGJ1bGsgPSB0aGlzLl9idWxrO1xuICB2YXIgbG9nZ2VyID0gYnVsay5fbG9nZ2VyO1xuXG4gIHRoaXMuX2pvYkluZm8gPSB0aGlzLl93YWl0QXNzaWduKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICB2YXIgYm9keSA9IFtcbiAgICAgICc8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJVVEYtOFwiPz4nLFxuICAgICAgJzxqb2JJbmZvIHhtbG5zPVwiaHR0cDovL3d3dy5mb3JjZS5jb20vMjAwOS8wNi9hc3luY2FwaS9kYXRhbG9hZFwiPicsXG4gICAgICAgICc8c3RhdGU+JyArIHN0YXRlICsgJzwvc3RhdGU+JyxcbiAgICAgICc8L2pvYkluZm8+J1xuICAgIF0uam9pbignJyk7XG4gICAgcmV0dXJuIGJ1bGsuX3JlcXVlc3Qoe1xuICAgICAgbWV0aG9kIDogJ1BPU1QnLFxuICAgICAgcGF0aCA6IFwiL2pvYi9cIiArIHNlbGYuaWQsXG4gICAgICBib2R5IDogYm9keSxcbiAgICAgIGhlYWRlcnMgOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCIgOiBcImFwcGxpY2F0aW9uL3htbDsgY2hhcnNldD11dGYtOFwiXG4gICAgICB9LFxuICAgICAgcmVzcG9uc2VUeXBlOiBcImFwcGxpY2F0aW9uL3htbFwiXG4gICAgfSk7XG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgbG9nZ2VyLmRlYnVnKHJlcy5qb2JJbmZvKTtcbiAgICBzZWxmLnN0YXRlID0gcmVzLmpvYkluZm8uc3RhdGU7XG4gICAgcmV0dXJuIHJlcy5qb2JJbmZvO1xuICB9KTtcbiAgcmV0dXJuIHRoaXMuX2pvYkluZm8udGhlbkNhbGwoY2FsbGJhY2spO1xuXG59O1xuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIEJhdGNoIChleHRlbmRzIFJlY29yZFN0cmVhbSlcbiAqXG4gKiBAcHJvdGVjdGVkXG4gKiBAY2xhc3MgQnVsa35CYXRjaFxuICogQGV4dGVuZHMge3N0cmVhbS5Xcml0YWJsZX1cbiAqIEBpbXBsZW1lbnRzIHtQcm9taXNlLjxBcnJheS48UmVjb3JkUmVzdWx0Pj59XG4gKiBAcGFyYW0ge0J1bGt+Sm9ifSBqb2IgLSBCdWxrIGpvYiBvYmplY3RcbiAqIEBwYXJhbSB7U3RyaW5nfSBbYmF0Y2hJZF0gLSBCYXRjaCBJRCAoaWYgYWxyZWFkeSBhdmFpbGFibGUpXG4gKi9cbnZhciBCYXRjaCA9IGZ1bmN0aW9uKGpvYiwgYmF0Y2hJZCkge1xuICBCYXRjaC5zdXBlcl8uY2FsbCh0aGlzLCB7IG9iamVjdE1vZGU6IHRydWUgfSk7XG4gIHRoaXMuam9iID0gam9iO1xuICB0aGlzLmlkID0gYmF0Y2hJZDtcbiAgdGhpcy5fYnVsayA9IGpvYi5fYnVsaztcbiAgdGhpcy5fZGVmZXJyZWQgPSBQcm9taXNlLmRlZmVyKCk7XG4gIHRoaXMuX3NldHVwRGF0YVN0cmVhbXMoKTtcbn07XG5cbmluaGVyaXRzKEJhdGNoLCBzdHJlYW0uV3JpdGFibGUpO1xuXG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuQmF0Y2gucHJvdG90eXBlLl9zZXR1cERhdGFTdHJlYW1zID0gZnVuY3Rpb24oKSB7XG4gIHZhciBiYXRjaCA9IHRoaXM7XG4gIHZhciBjb252ZXJ0ZXJPcHRpb25zID0geyBudWxsVmFsdWUgOiAnI04vQScgfTtcbiAgdGhpcy5fdXBsb2FkU3RyZWFtID0gbmV3IFJlY29yZFN0cmVhbS5TZXJpYWxpemFibGUoKTtcbiAgdGhpcy5fdXBsb2FkRGF0YVN0cmVhbSA9IHRoaXMuX3VwbG9hZFN0cmVhbS5zdHJlYW0oJ2NzdicsIGNvbnZlcnRlck9wdGlvbnMpO1xuICB0aGlzLl9kb3dubG9hZFN0cmVhbSA9IG5ldyBSZWNvcmRTdHJlYW0uUGFyc2FibGUoKTtcbiAgdGhpcy5fZG93bmxvYWREYXRhU3RyZWFtID0gdGhpcy5fZG93bmxvYWRTdHJlYW0uc3RyZWFtKCdjc3YnLCBjb252ZXJ0ZXJPcHRpb25zKTtcblxuICB0aGlzLm9uKCdmaW5pc2gnLCBmdW5jdGlvbigpIHtcbiAgICBiYXRjaC5fdXBsb2FkU3RyZWFtLmVuZCgpO1xuICB9KTtcbiAgdGhpcy5fdXBsb2FkRGF0YVN0cmVhbS5vbmNlKCdyZWFkYWJsZScsIGZ1bmN0aW9uKCkge1xuICAgIGJhdGNoLmpvYi5vcGVuKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgIC8vIHBpcGUgdXBsb2FkIGRhdGEgdG8gYmF0Y2ggQVBJIHJlcXVlc3Qgc3RyZWFtXG4gICAgICBiYXRjaC5fdXBsb2FkRGF0YVN0cmVhbS5waXBlKGJhdGNoLl9jcmVhdGVSZXF1ZXN0U3RyZWFtKCkpO1xuICAgIH0pO1xuICB9KTtcblxuICAvLyBkdXBsZXggZGF0YSBzdHJlYW0sIG9wZW5lZCBhY2Nlc3MgdG8gQVBJIHByb2dyYW1tZXJzIGJ5IEJhdGNoI3N0cmVhbSgpXG4gIHZhciBkYXRhU3RyZWFtID0gdGhpcy5fZGF0YVN0cmVhbSA9IG5ldyBEdXBsZXgoKTtcbiAgZGF0YVN0cmVhbS5fd3JpdGUgPSBmdW5jdGlvbihkYXRhLCBlbmMsIGNiKSB7XG4gICAgYmF0Y2guX3VwbG9hZERhdGFTdHJlYW0ud3JpdGUoZGF0YSwgZW5jLCBjYik7XG4gIH07XG4gIGRhdGFTdHJlYW0ub24oJ2ZpbmlzaCcsIGZ1bmN0aW9uKCkge1xuICAgIGJhdGNoLl91cGxvYWREYXRhU3RyZWFtLmVuZCgpO1xuICB9KTtcblxuICB0aGlzLl9kb3dubG9hZERhdGFTdHJlYW0ub24oJ3JlYWRhYmxlJywgZnVuY3Rpb24oKSB7XG4gICAgZGF0YVN0cmVhbS5yZWFkKDApO1xuICB9KTtcbiAgdGhpcy5fZG93bmxvYWREYXRhU3RyZWFtLm9uKCdlbmQnLCBmdW5jdGlvbigpIHtcbiAgICBkYXRhU3RyZWFtLnB1c2gobnVsbCk7XG4gIH0pO1xuICBkYXRhU3RyZWFtLl9yZWFkID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgIHZhciBjaHVuaztcbiAgICB3aGlsZSAoKGNodW5rID0gYmF0Y2guX2Rvd25sb2FkRGF0YVN0cmVhbS5yZWFkKCkpICE9PSBudWxsKSB7XG4gICAgICBkYXRhU3RyZWFtLnB1c2goY2h1bmspO1xuICAgIH1cbiAgfTtcbn07XG5cbi8qKlxuICogQ29ubmVjdCBiYXRjaCBBUEkgYW5kIGNyZWF0ZSBzdHJlYW0gaW5zdGFuY2Ugb2YgcmVxdWVzdC9yZXNwb25zZVxuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7c3RyZWFtLkR1cGxleH1cbiAqL1xuQmF0Y2gucHJvdG90eXBlLl9jcmVhdGVSZXF1ZXN0U3RyZWFtID0gZnVuY3Rpb24oKSB7XG4gIHZhciBiYXRjaCA9IHRoaXM7XG4gIHZhciBidWxrID0gYmF0Y2guX2J1bGs7XG4gIHZhciBsb2dnZXIgPSBidWxrLl9sb2dnZXI7XG5cbiAgcmV0dXJuIGJ1bGsuX3JlcXVlc3Qoe1xuICAgIG1ldGhvZCA6ICdQT1NUJyxcbiAgICBwYXRoIDogXCIvam9iL1wiICsgYmF0Y2guam9iLmlkICsgXCIvYmF0Y2hcIixcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcInRleHQvY3N2XCJcbiAgICB9LFxuICAgIHJlc3BvbnNlVHlwZTogXCJhcHBsaWNhdGlvbi94bWxcIlxuICB9LCBmdW5jdGlvbihlcnIsIHJlcykge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGJhdGNoLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmRlYnVnKHJlcy5iYXRjaEluZm8pO1xuICAgICAgYmF0Y2guaWQgPSByZXMuYmF0Y2hJbmZvLmlkO1xuICAgICAgYmF0Y2guZW1pdCgncXVldWUnLCByZXMuYmF0Y2hJbmZvKTtcbiAgICB9XG4gIH0pLnN0cmVhbSgpO1xufTtcblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiBXcml0YWJsZVxuICpcbiAqIEBvdmVycmlkZVxuICogQHByaXZhdGVcbiAqL1xuQmF0Y2gucHJvdG90eXBlLl93cml0ZSA9IGZ1bmN0aW9uKHJlY29yZCwgZW5jLCBjYikge1xuICByZWNvcmQgPSBfLmNsb25lKHJlY29yZCk7XG4gIGlmICh0aGlzLmpvYi5vcGVyYXRpb24gPT09IFwiaW5zZXJ0XCIpIHtcbiAgICBkZWxldGUgcmVjb3JkLklkO1xuICB9IGVsc2UgaWYgKHRoaXMuam9iLm9wZXJhdGlvbiA9PT0gXCJkZWxldGVcIikge1xuICAgIHJlY29yZCA9IHsgSWQ6IHJlY29yZC5JZCB9O1xuICB9XG4gIGRlbGV0ZSByZWNvcmQudHlwZTtcbiAgZGVsZXRlIHJlY29yZC5hdHRyaWJ1dGVzO1xuICB0aGlzLl91cGxvYWRTdHJlYW0ud3JpdGUocmVjb3JkLCBlbmMsIGNiKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBkdXBsZXggc3RyZWFtIHdoaWNoIGFjY2VwdHMgQ1NWIGRhdGEgaW5wdXQgYW5kIGJhdGNoIHJlc3VsdCBvdXRwdXRcbiAqXG4gKiBAcmV0dXJucyB7c3RyZWFtLkR1cGxleH1cbiAqL1xuQmF0Y2gucHJvdG90eXBlLnN0cmVhbSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fZGF0YVN0cmVhbTtcbn07XG5cbi8qKlxuICogRXhlY3V0ZSBiYXRjaCBvcGVyYXRpb25cbiAqXG4gKiBAbWV0aG9kIEJ1bGt+QmF0Y2gjZXhlY3V0ZVxuICogQHBhcmFtIHtBcnJheS48UmVjb3JkPnxzdHJlYW0uU3RyZWFtfFN0cmluZ30gW2lucHV0XSAtIElucHV0IHNvdXJjZSBmb3IgYmF0Y2ggb3BlcmF0aW9uLiBBY2NlcHRzIGFycmF5IG9mIHJlY29yZHMsIENTViBzdHJpbmcsIGFuZCBDU1YgZGF0YSBpbnB1dCBzdHJlYW0gaW4gaW5zZXJ0L3VwZGF0ZS91cHNlcnQvZGVsZXRlL2hhcmREZWxldGUgb3BlcmF0aW9uLCBTT1FMIHN0cmluZyBpbiBxdWVyeSBvcGVyYXRpb24uXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxBcnJheS48UmVjb3JkUmVzdWx0PnxBcnJheS48QmF0Y2hSZXN1bHRJbmZvPj59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge0J1bGt+QmF0Y2h9XG4gKi9cbkJhdGNoLnByb3RvdHlwZS5ydW4gPVxuQmF0Y2gucHJvdG90eXBlLmV4ZWMgPVxuQmF0Y2gucHJvdG90eXBlLmV4ZWN1dGUgPSBmdW5jdGlvbihpbnB1dCwgY2FsbGJhY2spIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGlmICh0eXBlb2YgaW5wdXQgPT09ICdmdW5jdGlvbicpIHsgLy8gaWYgaW5wdXQgYXJndW1lbnQgaXMgb21pdHRlZFxuICAgIGNhbGxiYWNrID0gaW5wdXQ7XG4gICAgaW5wdXQgPSBudWxsO1xuICB9XG5cbiAgLy8gaWYgYmF0Y2ggaXMgYWxyZWFkeSBleGVjdXRlZFxuICBpZiAodGhpcy5fcmVzdWx0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQmF0Y2ggYWxyZWFkeSBleGVjdXRlZC5cIik7XG4gIH1cblxuICB2YXIgcmRlZmVycmVkID0gUHJvbWlzZS5kZWZlcigpO1xuICB0aGlzLl9yZXN1bHQgPSByZGVmZXJyZWQucHJvbWlzZTtcbiAgdGhpcy5fcmVzdWx0LnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgc2VsZi5fZGVmZXJyZWQucmVzb2x2ZShyZXMpO1xuICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICBzZWxmLl9kZWZlcnJlZC5yZWplY3QoZXJyKTtcbiAgfSk7XG4gIHRoaXMub25jZSgncmVzcG9uc2UnLCBmdW5jdGlvbihyZXMpIHtcbiAgICByZGVmZXJyZWQucmVzb2x2ZShyZXMpO1xuICB9KTtcbiAgdGhpcy5vbmNlKCdlcnJvcicsIGZ1bmN0aW9uKGVycikge1xuICAgIHJkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiAgfSk7XG5cbiAgaWYgKF8uaXNPYmplY3QoaW5wdXQpICYmIF8uaXNGdW5jdGlvbihpbnB1dC5waXBlKSkgeyAvLyBpZiBpbnB1dCBoYXMgc3RyZWFtLlJlYWRhYmxlIGludGVyZmFjZVxuICAgIGlucHV0LnBpcGUodGhpcy5fZGF0YVN0cmVhbSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGRhdGE7XG4gICAgaWYgKF8uaXNBcnJheShpbnB1dCkpIHtcbiAgICAgIF8uZm9yRWFjaChpbnB1dCwgZnVuY3Rpb24ocmVjb3JkKSB7IHNlbGYud3JpdGUocmVjb3JkKTsgfSk7XG4gICAgICBzZWxmLmVuZCgpO1xuICAgIH0gZWxzZSBpZiAoXy5pc1N0cmluZyhpbnB1dCkpe1xuICAgICAgZGF0YSA9IGlucHV0O1xuICAgICAgdGhpcy5fZGF0YVN0cmVhbS53cml0ZShkYXRhLCAndXRmOCcpO1xuICAgICAgdGhpcy5fZGF0YVN0cmVhbS5lbmQoKTtcbiAgICB9XG4gIH1cblxuICAvLyByZXR1cm4gQmF0Y2ggaW5zdGFuY2UgZm9yIGNoYWluaW5nXG4gIHJldHVybiB0aGlzLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogUHJvbWlzZS9BKyBpbnRlcmZhY2VcbiAqIGh0dHA6Ly9wcm9taXNlcy1hcGx1cy5naXRodWIuaW8vcHJvbWlzZXMtc3BlYy9cbiAqXG4gKiBEZWxlZ2F0ZSB0byBkZWZlcnJlZCBwcm9taXNlLCByZXR1cm4gcHJvbWlzZSBpbnN0YW5jZSBmb3IgYmF0Y2ggcmVzdWx0XG4gKlxuICogQG1ldGhvZCBCdWxrfkJhdGNoI3RoZW5cbiAqL1xuQmF0Y2gucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbihvblJlc29sdmVkLCBvblJlamVjdCwgb25Qcm9ncmVzcykge1xuICByZXR1cm4gdGhpcy5fZGVmZXJyZWQucHJvbWlzZS50aGVuKG9uUmVzb2x2ZWQsIG9uUmVqZWN0LCBvblByb2dyZXNzKTtcbn07XG5cbi8qKlxuICogUHJvbWlzZS9BKyBleHRlbnNpb25cbiAqIENhbGwgXCJ0aGVuXCIgdXNpbmcgZ2l2ZW4gbm9kZS1zdHlsZSBjYWxsYmFjayBmdW5jdGlvblxuICpcbiAqIEBtZXRob2QgQnVsa35CYXRjaCN0aGVuQ2FsbFxuICovXG5CYXRjaC5wcm90b3R5cGUudGhlbkNhbGwgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICBpZiAoXy5pc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgIHRoaXMudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJlcyk7XG4gICAgICB9KTtcbiAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQnVsa35CYXRjaEluZm9cbiAqIEBwcm9wIHtTdHJpbmd9IGlkIC0gQmF0Y2ggSURcbiAqIEBwcm9wIHtTdHJpbmd9IGpvYklkIC0gSm9iIElEXG4gKiBAcHJvcCB7U3RyaW5nfSBzdGF0ZSAtIEJhdGNoIHN0YXRlXG4gKiBAcHJvcCB7U3RyaW5nfSBzdGF0ZU1lc3NhZ2UgLSBCYXRjaCBzdGF0ZSBtZXNzYWdlXG4gKi9cblxuLyoqXG4gKiBDaGVjayB0aGUgbGF0ZXN0IGJhdGNoIHN0YXR1cyBpbiBzZXJ2ZXJcbiAqXG4gKiBAbWV0aG9kIEJ1bGt+QmF0Y2gjY2hlY2tcbiAqIEBwYXJhbSB7Q2FsbGJhY2suPEJ1bGt+QmF0Y2hJbmZvPn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48QnVsa35CYXRjaEluZm8+fVxuICovXG5CYXRjaC5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBidWxrID0gdGhpcy5fYnVsaztcbiAgdmFyIGxvZ2dlciA9IGJ1bGsuX2xvZ2dlcjtcbiAgdmFyIGpvYklkID0gdGhpcy5qb2IuaWQ7XG4gIHZhciBiYXRjaElkID0gdGhpcy5pZDtcblxuICBpZiAoIWpvYklkIHx8ICFiYXRjaElkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQmF0Y2ggbm90IHN0YXJ0ZWQuXCIpO1xuICB9XG4gIHJldHVybiBidWxrLl9yZXF1ZXN0KHtcbiAgICBtZXRob2QgOiAnR0VUJyxcbiAgICBwYXRoIDogXCIvam9iL1wiICsgam9iSWQgKyBcIi9iYXRjaC9cIiArIGJhdGNoSWQsXG4gICAgcmVzcG9uc2VUeXBlOiBcImFwcGxpY2F0aW9uL3htbFwiXG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgbG9nZ2VyLmRlYnVnKHJlcy5iYXRjaEluZm8pO1xuICAgIHJldHVybiByZXMuYmF0Y2hJbmZvO1xuICB9KS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG5cbi8qKlxuICogUG9sbGluZyB0aGUgYmF0Y2ggcmVzdWx0IGFuZCByZXRyaWV2ZVxuICpcbiAqIEBtZXRob2QgQnVsa35CYXRjaCNwb2xsXG4gKiBAcGFyYW0ge051bWJlcn0gaW50ZXJ2YWwgLSBQb2xsaW5nIGludGVydmFsIGluIG1pbGxpc2Vjb25kc1xuICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVvdXQgLSBQb2xsaW5nIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzXG4gKi9cbkJhdGNoLnByb3RvdHlwZS5wb2xsID0gZnVuY3Rpb24oaW50ZXJ2YWwsIHRpbWVvdXQpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgam9iSWQgPSB0aGlzLmpvYi5pZDtcbiAgdmFyIGJhdGNoSWQgPSB0aGlzLmlkO1xuXG4gIGlmICgham9iSWQgfHwgIWJhdGNoSWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYXRjaCBub3Qgc3RhcnRlZC5cIik7XG4gIH1cbiAgdmFyIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB2YXIgcG9sbCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBpZiAoc3RhcnRUaW1lICsgdGltZW91dCA8IG5vdykge1xuICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcihcIlBvbGxpbmcgdGltZSBvdXQuIEpvYiBJZCA9IFwiICsgam9iSWQgKyBcIiAsIGJhdGNoIElkID0gXCIgKyBiYXRjaElkKTtcbiAgICAgIGVyci5uYW1lID0gJ1BvbGxpbmdUaW1lb3V0JztcbiAgICAgIHNlbGYuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZWxmLmNoZWNrKGZ1bmN0aW9uKGVyciwgcmVzKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHNlbGYuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJlcy5zdGF0ZSA9PT0gXCJGYWlsZWRcIikge1xuICAgICAgICAgIGlmIChwYXJzZUludChyZXMubnVtYmVyUmVjb3Jkc1Byb2Nlc3NlZCwgMTApID4gMCkge1xuICAgICAgICAgICAgc2VsZi5yZXRyaWV2ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKHJlcy5zdGF0ZU1lc3NhZ2UpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVzLnN0YXRlID09PSBcIkNvbXBsZXRlZFwiKSB7XG4gICAgICAgICAgc2VsZi5yZXRyaWV2ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCByZXMpO1xuICAgICAgICAgIHNldFRpbWVvdXQocG9sbCwgaW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG4gIHNldFRpbWVvdXQocG9sbCwgaW50ZXJ2YWwpO1xufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBCdWxrfkJhdGNoUmVzdWx0SW5mb1xuICogQHByb3Age1N0cmluZ30gaWQgLSBCYXRjaCByZXN1bHQgSURcbiAqIEBwcm9wIHtTdHJpbmd9IGJhdGNoSWQgLSBCYXRjaCBJRCB3aGljaCBpbmNsdWRlcyB0aGlzIGJhdGNoIHJlc3VsdC5cbiAqIEBwcm9wIHtTdHJpbmd9IGpvYklkIC0gSm9iIElEIHdoaWNoIGluY2x1ZGVzIHRoaXMgYmF0Y2ggcmVzdWx0LlxuICovXG5cbi8qKlxuICogUmV0cmlldmUgYmF0Y2ggcmVzdWx0XG4gKlxuICogQG1ldGhvZCBCdWxrfkJhdGNoI3JldHJpZXZlXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxBcnJheS48UmVjb3JkUmVzdWx0PnxBcnJheS48QnVsa35CYXRjaFJlc3VsdEluZm8+Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48QXJyYXkuPFJlY29yZFJlc3VsdD58QXJyYXkuPEJ1bGt+QmF0Y2hSZXN1bHRJbmZvPj59XG4gKi9cbkJhdGNoLnByb3RvdHlwZS5yZXRyaWV2ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGJ1bGsgPSB0aGlzLl9idWxrO1xuICB2YXIgam9iSWQgPSB0aGlzLmpvYi5pZDtcbiAgdmFyIGpvYiA9IHRoaXMuam9iO1xuICB2YXIgYmF0Y2hJZCA9IHRoaXMuaWQ7XG5cbiAgaWYgKCFqb2JJZCB8fCAhYmF0Y2hJZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkJhdGNoIG5vdCBzdGFydGVkLlwiKTtcbiAgfVxuXG4gIHJldHVybiBqb2IuaW5mbygpLnRoZW4oZnVuY3Rpb24oam9iSW5mbykge1xuICAgIHJldHVybiBidWxrLl9yZXF1ZXN0KHtcbiAgICAgIG1ldGhvZCA6ICdHRVQnLFxuICAgICAgcGF0aCA6IFwiL2pvYi9cIiArIGpvYklkICsgXCIvYmF0Y2gvXCIgKyBiYXRjaElkICsgXCIvcmVzdWx0XCJcbiAgICB9KTtcbiAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICB2YXIgcmVzdWx0cztcbiAgICBpZiAoam9iLm9wZXJhdGlvbiA9PT0gJ3F1ZXJ5Jykge1xuICAgICAgdmFyIGNvbm4gPSBidWxrLl9jb25uO1xuICAgICAgdmFyIHJlc3VsdElkcyA9IHJlc1sncmVzdWx0LWxpc3QnXS5yZXN1bHQ7XG4gICAgICByZXN1bHRzID0gcmVzWydyZXN1bHQtbGlzdCddLnJlc3VsdDtcbiAgICAgIHJlc3VsdHMgPSBfLm1hcChfLmlzQXJyYXkocmVzdWx0cykgPyByZXN1bHRzIDogWyByZXN1bHRzIF0sIGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgIGJhdGNoSWQ6IGJhdGNoSWQsXG4gICAgICAgICAgam9iSWQ6IGpvYklkXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0cyA9IF8ubWFwKHJlcywgZnVuY3Rpb24ocmV0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWQ6IHJldC5JZCB8fCBudWxsLFxuICAgICAgICAgIHN1Y2Nlc3M6IHJldC5TdWNjZXNzID09PSBcInRydWVcIixcbiAgICAgICAgICBlcnJvcnM6IHJldC5FcnJvciA/IFsgcmV0LkVycm9yIF0gOiBbXVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfVxuICAgIHNlbGYuZW1pdCgncmVzcG9uc2UnLCByZXN1bHRzKTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcbiAgICBzZWxmLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICB0aHJvdyBlcnI7XG4gIH0pLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogRmV0Y2ggcXVlcnkgcmVzdWx0IGFzIGEgcmVjb3JkIHN0cmVhbVxuICogQHBhcmFtIHtTdHJpbmd9IHJlc3VsdElkIC0gUmVzdWx0IGlkXG4gKiBAcmV0dXJucyB7UmVjb3JkU3RyZWFtfSAtIFJlY29yZCBzdHJlYW0sIGNvbnZlcnRpYmxlIHRvIENTViBkYXRhIHN0cmVhbVxuICovXG5CYXRjaC5wcm90b3R5cGUucmVzdWx0ID0gZnVuY3Rpb24ocmVzdWx0SWQpIHtcbiAgdmFyIGpvYklkID0gdGhpcy5qb2IuaWQ7XG4gIHZhciBiYXRjaElkID0gdGhpcy5pZDtcbiAgaWYgKCFqb2JJZCB8fCAhYmF0Y2hJZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkJhdGNoIG5vdCBzdGFydGVkLlwiKTtcbiAgfVxuICB2YXIgcmVzdWx0U3RyZWFtID0gbmV3IFJlY29yZFN0cmVhbS5QYXJzYWJsZSgpO1xuICB2YXIgcmVzdWx0RGF0YVN0cmVhbSA9IHJlc3VsdFN0cmVhbS5zdHJlYW0oJ2NzdicpO1xuICB2YXIgcmVxU3RyZWFtID0gdGhpcy5fYnVsay5fcmVxdWVzdCh7XG4gICAgbWV0aG9kIDogJ0dFVCcsXG4gICAgcGF0aCA6IFwiL2pvYi9cIiArIGpvYklkICsgXCIvYmF0Y2gvXCIgKyBiYXRjaElkICsgXCIvcmVzdWx0L1wiICsgcmVzdWx0SWQsXG4gICAgcmVzcG9uc2VUeXBlOiBcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiXG4gIH0pLnN0cmVhbSgpLnBpcGUocmVzdWx0RGF0YVN0cmVhbSk7XG4gIHJldHVybiByZXN1bHRTdHJlYW07XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qKlxuICogQHByaXZhdGVcbiAqL1xudmFyIEJ1bGtBcGkgPSBmdW5jdGlvbigpIHtcbiAgQnVsa0FwaS5zdXBlcl8uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5cbmluaGVyaXRzKEJ1bGtBcGksIEh0dHBBcGkpO1xuXG5CdWxrQXBpLnByb3RvdHlwZS5iZWZvcmVTZW5kID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuICByZXF1ZXN0LmhlYWRlcnMgPSByZXF1ZXN0LmhlYWRlcnMgfHwge307XG4gIHJlcXVlc3QuaGVhZGVyc1tcIlgtU0ZEQy1TRVNTSU9OXCJdID0gdGhpcy5fY29ubi5hY2Nlc3NUb2tlbjtcbn07XG5cbkJ1bGtBcGkucHJvdG90eXBlLmlzU2Vzc2lvbkV4cGlyZWQgPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICByZXR1cm4gcmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gNDAwICYmXG4gICAgLzxleGNlcHRpb25Db2RlPkludmFsaWRTZXNzaW9uSWQ8XFwvZXhjZXB0aW9uQ29kZT4vLnRlc3QocmVzcG9uc2UuYm9keSk7XG59O1xuXG5CdWxrQXBpLnByb3RvdHlwZS5oYXNFcnJvckluUmVzcG9uc2VCb2R5ID0gZnVuY3Rpb24oYm9keSkge1xuICByZXR1cm4gISFib2R5LmVycm9yO1xufTtcblxuQnVsa0FwaS5wcm90b3R5cGUucGFyc2VFcnJvciA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgcmV0dXJuIHtcbiAgICBlcnJvckNvZGU6IGJvZHkuZXJyb3IuZXhjZXB0aW9uQ29kZSxcbiAgICBtZXNzYWdlOiBib2R5LmVycm9yLmV4Y2VwdGlvbk1lc3NhZ2VcbiAgfTtcbn07XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4vKipcbiAqIENsYXNzIGZvciBCdWxrIEFQSVxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtDb25uZWN0aW9ufSBjb25uIC0gQ29ubmVjdGlvbiBvYmplY3RcbiAqL1xudmFyIEJ1bGsgPSBmdW5jdGlvbihjb25uKSB7XG4gIHRoaXMuX2Nvbm4gPSBjb25uO1xuICB0aGlzLl9sb2dnZXIgPSBjb25uLl9sb2dnZXI7XG59O1xuXG4vKipcbiAqIFBvbGxpbmcgaW50ZXJ2YWwgaW4gbWlsbGlzZWNvbmRzXG4gKiBAdHlwZSB7TnVtYmVyfVxuICovXG5CdWxrLnByb3RvdHlwZS5wb2xsSW50ZXJ2YWwgPSAxMDAwO1xuXG4vKipcbiAqIFBvbGxpbmcgdGltZW91dCBpbiBtaWxsaXNlY29uZHNcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKi9cbkJ1bGsucHJvdG90eXBlLnBvbGxUaW1lb3V0ID0gMTAwMDA7XG5cbi8qKiBAcHJpdmF0ZSAqKi9cbkJ1bGsucHJvdG90eXBlLl9yZXF1ZXN0ID0gZnVuY3Rpb24ocmVxdWVzdCwgY2FsbGJhY2spIHtcbiAgdmFyIGNvbm4gPSB0aGlzLl9jb25uO1xuICByZXF1ZXN0ID0gXy5jbG9uZShyZXF1ZXN0KTtcbiAgdmFyIGJhc2VVcmwgPSBbIGNvbm4uaW5zdGFuY2VVcmwsIFwic2VydmljZXMvYXN5bmNcIiwgY29ubi52ZXJzaW9uIF0uam9pbignLycpO1xuICByZXF1ZXN0LnVybCA9IGJhc2VVcmwgKyByZXF1ZXN0LnBhdGg7XG4gIHZhciBvcHRpb25zID0geyByZXNwb25zZVR5cGU6IHJlcXVlc3QucmVzcG9uc2VUeXBlIH07XG4gIGRlbGV0ZSByZXF1ZXN0LnBhdGg7XG4gIGRlbGV0ZSByZXF1ZXN0LnJlc3BvbnNlVHlwZTtcbiAgcmV0dXJuIG5ldyBCdWxrQXBpKHRoaXMuX2Nvbm4sIG9wdGlvbnMpLnJlcXVlc3QocmVxdWVzdCkudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHN0YXJ0IGJ1bGtsb2FkIGpvYiBhbmQgYmF0Y2hcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFNPYmplY3QgdHlwZVxuICogQHBhcmFtIHtTdHJpbmd9IG9wZXJhdGlvbiAtIEJ1bGsgbG9hZCBvcGVyYXRpb24gKCdpbnNlcnQnLCAndXBkYXRlJywgJ3Vwc2VydCcsICdkZWxldGUnLCBvciAnaGFyZERlbGV0ZScpXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gT3B0aW9ucyBmb3IgYnVsayBsb2FkaW5nIG9wZXJhdGlvblxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmV4dElkRmllbGRdIC0gRXh0ZXJuYWwgSUQgZmllbGQgbmFtZSAodXNlZCB3aGVuIHVwc2VydCBvcGVyYXRpb24pLlxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmNvbmN1cnJlbmN5TW9kZV0gLSAnU2VyaWFsJyBvciAnUGFyYWxsZWwnLiBEZWZhdWx0cyB0byBQYXJhbGxlbC5cbiAqIEBwYXJhbSB7QXJyYXkuPFJlY29yZD58c3RyZWFtLlN0cmVhbXxTdHJpbmd9IFtpbnB1dF0gLSBJbnB1dCBzb3VyY2UgZm9yIGJ1bGtsb2FkLiBBY2NlcHRzIGFycmF5IG9mIHJlY29yZHMsIENTViBzdHJpbmcsIGFuZCBDU1YgZGF0YSBpbnB1dCBzdHJlYW0gaW4gaW5zZXJ0L3VwZGF0ZS91cHNlcnQvZGVsZXRlL2hhcmREZWxldGUgb3BlcmF0aW9uLCBTT1FMIHN0cmluZyBpbiBxdWVyeSBvcGVyYXRpb24uXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxBcnJheS48UmVjb3JkUmVzdWx0PnxBcnJheS48QnVsa35CYXRjaFJlc3VsdEluZm8+Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7QnVsa35CYXRjaH1cbiAqL1xuQnVsay5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uKHR5cGUsIG9wZXJhdGlvbiwgb3B0aW9ucywgaW5wdXQsIGNhbGxiYWNrKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgaWYgKCF0eXBlIHx8ICFvcGVyYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnN1ZmZpY2llbnQgYXJndW1lbnRzLiBBdCBsZWFzdCwgJ3R5cGUnIGFuZCAnb3BlcmF0aW9uJyBhcmUgcmVxdWlyZWQuXCIpO1xuICB9XG4gIGlmICghXy5pc09iamVjdChvcHRpb25zKSB8fCBvcHRpb25zLmNvbnN0cnVjdG9yICE9PSBPYmplY3QpIHsgLy8gd2hlbiBvcHRpb25zIGlzIG5vdCBwbGFpbiBoYXNoIG9iamVjdCwgaXQgaXMgb21pdHRlZFxuICAgIGNhbGxiYWNrID0gaW5wdXQ7XG4gICAgaW5wdXQgPSBvcHRpb25zO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG4gIHZhciBqb2IgPSB0aGlzLmNyZWF0ZUpvYih0eXBlLCBvcGVyYXRpb24sIG9wdGlvbnMpO1xuICBqb2Iub25jZSgnZXJyb3InLCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICBpZiAoYmF0Y2gpIHtcbiAgICAgIGJhdGNoLmVtaXQoJ2Vycm9yJywgZXJyb3IpOyAvLyBwYXNzIGpvYiBlcnJvciB0byBiYXRjaFxuICAgIH1cbiAgfSk7XG4gIHZhciBiYXRjaCA9IGpvYi5jcmVhdGVCYXRjaCgpO1xuICB2YXIgY2xlYW51cCA9IGZ1bmN0aW9uKCkge1xuICAgIGJhdGNoID0gbnVsbDtcbiAgICBqb2IuY2xvc2UoKTtcbiAgfTtcbiAgdmFyIGNsZWFudXBPbkVycm9yID0gZnVuY3Rpb24oZXJyKSB7XG4gICAgaWYgKGVyci5uYW1lICE9PSAnUG9sbGluZ1RpbWVvdXQnKSB7XG4gICAgICBjbGVhbnVwKCk7XG4gICAgfVxuICB9O1xuICBiYXRjaC5vbigncmVzcG9uc2UnLCBjbGVhbnVwKTtcbiAgYmF0Y2gub24oJ2Vycm9yJywgY2xlYW51cE9uRXJyb3IpO1xuICBiYXRjaC5vbigncXVldWUnLCBmdW5jdGlvbigpIHsgYmF0Y2gucG9sbChzZWxmLnBvbGxJbnRlcnZhbCwgc2VsZi5wb2xsVGltZW91dCk7IH0pO1xuICByZXR1cm4gYmF0Y2guZXhlY3V0ZShpbnB1dCwgY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBFeGVjdXRlIGJ1bGsgcXVlcnkgYW5kIGdldCByZWNvcmQgc3RyZWFtXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNvcWwgLSBTT1FMIHRvIGV4ZWN1dGUgaW4gYnVsayBqb2JcbiAqIEByZXR1cm5zIHtSZWNvcmRTdHJlYW0uUGFyc2FibGV9IC0gUmVjb3JkIHN0cmVhbSwgY29udmVydGlibGUgdG8gQ1NWIGRhdGEgc3RyZWFtXG4gKi9cbkJ1bGsucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24oc29xbCkge1xuICB2YXIgbSA9IHNvcWwucmVwbGFjZSgvXFwoW1xcc1xcU10rXFwpL2csICcnKS5tYXRjaCgvRlJPTVxccysoXFx3KykvaSk7XG4gIGlmICghbSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHNvYmplY3QgdHlwZSBmb3VuZCBpbiBxdWVyeSwgbWF5YmUgY2F1c2VkIGJ5IGludmFsaWQgU09RTC5cIik7XG4gIH1cbiAgdmFyIHR5cGUgPSBtWzFdO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciByZWNvcmRTdHJlYW0gPSBuZXcgUmVjb3JkU3RyZWFtLlBhcnNhYmxlKCk7XG4gIHZhciBkYXRhU3RyZWFtID0gcmVjb3JkU3RyZWFtLnN0cmVhbSgnY3N2Jyk7XG4gIHRoaXMubG9hZCh0eXBlLCBcInF1ZXJ5XCIsIHNvcWwpLnRoZW4oZnVuY3Rpb24ocmVzdWx0cykge1xuICAgIHZhciBzdHJlYW1zID0gcmVzdWx0cy5tYXAoZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICByZXR1cm4gc2VsZlxuICAgICAgICAuam9iKHJlc3VsdC5qb2JJZClcbiAgICAgICAgLmJhdGNoKHJlc3VsdC5iYXRjaElkKVxuICAgICAgICAucmVzdWx0KHJlc3VsdC5pZClcbiAgICAgICAgLnN0cmVhbSgpO1xuICAgIH0pO1xuXG4gICAgam9pblN0cmVhbXMoc3RyZWFtcykucGlwZShkYXRhU3RyZWFtKTtcbiAgfSkuZmFpbChmdW5jdGlvbihlcnIpIHtcbiAgICByZWNvcmRTdHJlYW0uZW1pdCgnZXJyb3InLCBlcnIpO1xuICB9KTtcbiAgcmV0dXJuIHJlY29yZFN0cmVhbTtcbn07XG5cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgam9iIGluc3RhbmNlXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBTT2JqZWN0IHR5cGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcGVyYXRpb24gLSBCdWxrIGxvYWQgb3BlcmF0aW9uICgnaW5zZXJ0JywgJ3VwZGF0ZScsICd1cHNlcnQnLCAnZGVsZXRlJywgJ2hhcmREZWxldGUnLCBvciAncXVlcnknKVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIE9wdGlvbnMgZm9yIGJ1bGsgbG9hZGluZyBvcGVyYXRpb25cbiAqIEByZXR1cm5zIHtCdWxrfkpvYn1cbiAqL1xuQnVsay5wcm90b3R5cGUuY3JlYXRlSm9iID0gZnVuY3Rpb24odHlwZSwgb3BlcmF0aW9uLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgSm9iKHRoaXMsIHR5cGUsIG9wZXJhdGlvbiwgb3B0aW9ucyk7XG59O1xuXG4vKipcbiAqIEdldCBhIGpvYiBpbnN0YW5jZSBzcGVjaWZpZWQgYnkgZ2l2ZW4gam9iIElEXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGpvYklkIC0gSm9iIElEXG4gKiBAcmV0dXJucyB7QnVsa35Kb2J9XG4gKi9cbkJ1bGsucHJvdG90eXBlLmpvYiA9IGZ1bmN0aW9uKGpvYklkKSB7XG4gIHJldHVybiBuZXcgSm9iKHRoaXMsIG51bGwsIG51bGwsIG51bGwsIGpvYklkKTtcbn07XG5cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKlxuICogUmVnaXN0ZXIgaG9vayBpbiBjb25uZWN0aW9uIGluc3RhbnRpYXRpb24gZm9yIGR5bmFtaWNhbGx5IGFkZGluZyB0aGlzIEFQSSBtb2R1bGUgZmVhdHVyZXNcbiAqL1xuanNmb3JjZS5vbignY29ubmVjdGlvbjpuZXcnLCBmdW5jdGlvbihjb25uKSB7XG4gIGNvbm4uYnVsayA9IG5ldyBCdWxrKGNvbm4pO1xufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBCdWxrO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuKGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaXMgbm90IGRlZmluZWQnKTtcbiAgICB9XG4gIH1cbiAgdHJ5IHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBpcyBub3QgZGVmaW5lZCcpO1xuICAgIH1cbiAgfVxufSAoKSlcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IGNhY2hlZFNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNhY2hlZENsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iXX0=
