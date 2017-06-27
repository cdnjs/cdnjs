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
      _.forEach(input, function(record) {
        Object.keys(record).forEach(function(key) {
          if (typeof record[key] === 'boolean') {
            record[key] = String(record[key])
          }
        })
        self.write(record);
      });
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
      err.jobId = jobId;
      err.batchId = batchId;
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

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
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
    var timeout = runTimeout(cleanUpNextTick);
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
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYXBpL2J1bGsuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qZ2xvYmFsIHByb2Nlc3MqL1xuLyoqXG4gKiBAZmlsZSBNYW5hZ2VzIFNhbGVzZm9yY2UgQnVsayBBUEkgcmVsYXRlZCBvcGVyYXRpb25zXG4gKiBAYXV0aG9yIFNoaW5pY2hpIFRvbWl0YSA8c2hpbmljaGkudG9taXRhQGdtYWlsLmNvbT5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbmhlcml0cyAgICAgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCdpbmhlcml0cycpLFxuICAgIHN0cmVhbSAgICAgICA9IHdpbmRvdy5qc2ZvcmNlLnJlcXVpcmUoJ3JlYWRhYmxlLXN0cmVhbScpLFxuICAgIER1cGxleCAgICAgICA9IHN0cmVhbS5EdXBsZXgsXG4gICAgZXZlbnRzICAgICAgID0gd2luZG93LmpzZm9yY2UucmVxdWlyZSgnZXZlbnRzJyksXG4gICAgXyAgICAgICAgICAgID0gd2luZG93LmpzZm9yY2UucmVxdWlyZSgnbG9kYXNoL2NvcmUnKSxcbiAgICBqb2luU3RyZWFtcyAgPSB3aW5kb3cuanNmb3JjZS5yZXF1aXJlKCdtdWx0aXN0cmVhbScpLFxuICAgIGpzZm9yY2UgICAgICA9IHdpbmRvdy5qc2ZvcmNlLnJlcXVpcmUoJy4vY29yZScpLFxuICAgIFJlY29yZFN0cmVhbSA9IHdpbmRvdy5qc2ZvcmNlLnJlcXVpcmUoJy4vcmVjb3JkLXN0cmVhbScpLFxuICAgIFByb21pc2UgICAgICA9IHdpbmRvdy5qc2ZvcmNlLnJlcXVpcmUoJy4vcHJvbWlzZScpLFxuICAgIEh0dHBBcGkgICAgICA9IHdpbmRvdy5qc2ZvcmNlLnJlcXVpcmUoJy4vaHR0cC1hcGknKTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogQ2xhc3MgZm9yIEJ1bGsgQVBJIEpvYlxuICpcbiAqIEBwcm90ZWN0ZWRcbiAqIEBjbGFzcyBCdWxrfkpvYlxuICogQGV4dGVuZHMgZXZlbnRzLkV2ZW50RW1pdHRlclxuICpcbiAqIEBwYXJhbSB7QnVsa30gYnVsayAtIEJ1bGsgQVBJIG9iamVjdFxuICogQHBhcmFtIHtTdHJpbmd9IFt0eXBlXSAtIFNPYmplY3QgdHlwZVxuICogQHBhcmFtIHtTdHJpbmd9IFtvcGVyYXRpb25dIC0gQnVsayBsb2FkIG9wZXJhdGlvbiAoJ2luc2VydCcsICd1cGRhdGUnLCAndXBzZXJ0JywgJ2RlbGV0ZScsIG9yICdoYXJkRGVsZXRlJylcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBPcHRpb25zIGZvciBidWxrIGxvYWRpbmcgb3BlcmF0aW9uXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuZXh0SWRGaWVsZF0gLSBFeHRlcm5hbCBJRCBmaWVsZCBuYW1lICh1c2VkIHdoZW4gdXBzZXJ0IG9wZXJhdGlvbikuXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuY29uY3VycmVuY3lNb2RlXSAtICdTZXJpYWwnIG9yICdQYXJhbGxlbCcuIERlZmF1bHRzIHRvIFBhcmFsbGVsLlxuICogQHBhcmFtIHtTdHJpbmd9IFtqb2JJZF0gLSBKb2IgSUQgKGlmIGFscmVhZHkgYXZhaWxhYmxlKVxuICovXG52YXIgSm9iID0gZnVuY3Rpb24oYnVsaywgdHlwZSwgb3BlcmF0aW9uLCBvcHRpb25zLCBqb2JJZCkge1xuICB0aGlzLl9idWxrID0gYnVsaztcbiAgdGhpcy50eXBlID0gdHlwZTtcbiAgdGhpcy5vcGVyYXRpb24gPSBvcGVyYXRpb247XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMuaWQgPSBqb2JJZDtcbiAgdGhpcy5zdGF0ZSA9IHRoaXMuaWQgPyAnT3BlbicgOiAnVW5rbm93bic7XG4gIHRoaXMuX2JhdGNoZXMgPSB7fTtcbn07XG5cbmluaGVyaXRzKEpvYiwgZXZlbnRzLkV2ZW50RW1pdHRlcik7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQnVsa35Kb2JJbmZvXG4gKiBAcHJvcCB7U3RyaW5nfSBpZCAtIEpvYiBJRFxuICogQHByb3Age1N0cmluZ30gb2JqZWN0IC0gT2JqZWN0IHR5cGUgbmFtZVxuICogQHByb3Age1N0cmluZ30gb3BlcmF0aW9uIC0gT3BlcmF0aW9uIHR5cGUgb2YgdGhlIGpvYlxuICogQHByb3Age1N0cmluZ30gc3RhdGUgLSBKb2Igc3RhdHVzXG4gKi9cblxuLyoqXG4gKiBSZXR1cm4gbGF0ZXN0IGpvYkluZm8gZnJvbSBjYWNoZVxuICpcbiAqIEBtZXRob2QgQnVsa35Kb2Ijb3BlblxuICogQHBhcmFtIHtDYWxsYmFjay48QnVsa35Kb2JJbmZvPn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48QnVsa35Kb2JJbmZvPn1cbiAqL1xuSm9iLnByb3RvdHlwZS5pbmZvID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICAvLyBpZiBjYWNoZSBpcyBub3QgYXZhaWxhYmxlLCBjaGVjayB0aGUgbGF0ZXN0XG4gIGlmICghdGhpcy5fam9iSW5mbykge1xuICAgIHRoaXMuX2pvYkluZm8gPSB0aGlzLmNoZWNrKCk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2pvYkluZm8udGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBPcGVuIG5ldyBqb2IgYW5kIGdldCBqb2JpbmZvXG4gKlxuICogQG1ldGhvZCBCdWxrfkpvYiNvcGVuXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxCdWxrfkpvYkluZm8+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxCdWxrfkpvYkluZm8+fVxuICovXG5Kb2IucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBidWxrID0gdGhpcy5fYnVsaztcbiAgdmFyIGxvZ2dlciA9IGJ1bGsuX2xvZ2dlcjtcblxuICAvLyBpZiBub3QgcmVxdWVzdGVkIG9wZW5pbmcgam9iXG4gIGlmICghdGhpcy5fam9iSW5mbykge1xuICAgIHZhciBvcGVyYXRpb24gPSB0aGlzLm9wZXJhdGlvbi50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChvcGVyYXRpb24gPT09ICdoYXJkZGVsZXRlJykgeyBvcGVyYXRpb24gPSAnaGFyZERlbGV0ZSc7IH1cbiAgICB2YXIgYm9keSA9IFtcbiAgICAgICc8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJVVEYtOFwiPz4nLFxuICAgICAgJzxqb2JJbmZvICB4bWxucz1cImh0dHA6Ly93d3cuZm9yY2UuY29tLzIwMDkvMDYvYXN5bmNhcGkvZGF0YWxvYWRcIj4nLFxuICAgICAgICAnPG9wZXJhdGlvbj4nICsgb3BlcmF0aW9uICsgJzwvb3BlcmF0aW9uPicsXG4gICAgICAgICc8b2JqZWN0PicgKyB0aGlzLnR5cGUgKyAnPC9vYmplY3Q+JyxcbiAgICAgICAgKHRoaXMub3B0aW9ucy5leHRJZEZpZWxkID9cbiAgICAgICAgICc8ZXh0ZXJuYWxJZEZpZWxkTmFtZT4nK3RoaXMub3B0aW9ucy5leHRJZEZpZWxkKyc8L2V4dGVybmFsSWRGaWVsZE5hbWU+JyA6XG4gICAgICAgICAnJyksXG4gICAgICAgICh0aGlzLm9wdGlvbnMuY29uY3VycmVuY3lNb2RlID9cbiAgICAgICAgICc8Y29uY3VycmVuY3lNb2RlPicrdGhpcy5vcHRpb25zLmNvbmN1cnJlbmN5TW9kZSsnPC9jb25jdXJyZW5jeU1vZGU+JyA6XG4gICAgICAgICAnJyksXG4gICAgICAgICh0aGlzLm9wdGlvbnMuYXNzaWdubWVudFJ1bGVJZCA/XG4gICAgICAgICAgJzxhc3NpZ25tZW50UnVsZUlkPicgKyB0aGlzLm9wdGlvbnMuYXNzaWdubWVudFJ1bGVJZCArICc8L2Fzc2lnbm1lbnRSdWxlSWQ+JyA6XG4gICAgICAgICAgJycpLFxuICAgICAgICAnPGNvbnRlbnRUeXBlPkNTVjwvY29udGVudFR5cGU+JyxcbiAgICAgICc8L2pvYkluZm8+J1xuICAgIF0uam9pbignJyk7XG5cbiAgICB0aGlzLl9qb2JJbmZvID0gYnVsay5fcmVxdWVzdCh7XG4gICAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgICBwYXRoIDogXCIvam9iXCIsXG4gICAgICBib2R5IDogYm9keSxcbiAgICAgIGhlYWRlcnMgOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCIgOiBcImFwcGxpY2F0aW9uL3htbDsgY2hhcnNldD11dGYtOFwiXG4gICAgICB9LFxuICAgICAgcmVzcG9uc2VUeXBlOiBcImFwcGxpY2F0aW9uL3htbFwiXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgIHNlbGYuZW1pdChcIm9wZW5cIiwgcmVzLmpvYkluZm8pO1xuICAgICAgc2VsZi5pZCA9IHJlcy5qb2JJbmZvLmlkO1xuICAgICAgc2VsZi5zdGF0ZSA9IHJlcy5qb2JJbmZvLnN0YXRlO1xuICAgICAgcmV0dXJuIHJlcy5qb2JJbmZvO1xuICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgc2VsZi5lbWl0KFwiZXJyb3JcIiwgZXJyKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gdGhpcy5fam9iSW5mby50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBiYXRjaCBpbnN0YW5jZSBpbiB0aGUgam9iXG4gKlxuICogQG1ldGhvZCBCdWxrfkpvYiNjcmVhdGVCYXRjaFxuICogQHJldHVybnMge0J1bGt+QmF0Y2h9XG4gKi9cbkpvYi5wcm90b3R5cGUuY3JlYXRlQmF0Y2ggPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJhdGNoID0gbmV3IEJhdGNoKHRoaXMpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGJhdGNoLm9uKCdxdWV1ZScsIGZ1bmN0aW9uKCkge1xuICAgIHNlbGYuX2JhdGNoZXNbYmF0Y2guaWRdID0gYmF0Y2g7XG4gIH0pO1xuICByZXR1cm4gYmF0Y2g7XG59O1xuXG4vKipcbiAqIEdldCBhIGJhdGNoIGluc3RhbmNlIHNwZWNpZmllZCBieSBnaXZlbiBiYXRjaCBJRFxuICpcbiAqIEBtZXRob2QgQnVsa35Kb2IjYmF0Y2hcbiAqIEBwYXJhbSB7U3RyaW5nfSBiYXRjaElkIC0gQmF0Y2ggSURcbiAqIEByZXR1cm5zIHtCdWxrfkJhdGNofVxuICovXG5Kb2IucHJvdG90eXBlLmJhdGNoID0gZnVuY3Rpb24oYmF0Y2hJZCkge1xuICB2YXIgYmF0Y2ggPSB0aGlzLl9iYXRjaGVzW2JhdGNoSWRdO1xuICBpZiAoIWJhdGNoKSB7XG4gICAgYmF0Y2ggPSBuZXcgQmF0Y2godGhpcywgYmF0Y2hJZCk7XG4gICAgdGhpcy5fYmF0Y2hlc1tiYXRjaElkXSA9IGJhdGNoO1xuICB9XG4gIHJldHVybiBiYXRjaDtcbn07XG5cbi8qKlxuICogQ2hlY2sgdGhlIGxhdGVzdCBqb2Igc3RhdHVzIGZyb20gc2VydmVyXG4gKlxuICogQG1ldGhvZCBCdWxrfkpvYiNjaGVja1xuICogQHBhcmFtIHtDYWxsYmFjay48QnVsa35Kb2JJbmZvPn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48QnVsa35Kb2JJbmZvPn1cbiAqL1xuSm9iLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGJ1bGsgPSB0aGlzLl9idWxrO1xuICB2YXIgbG9nZ2VyID0gYnVsay5fbG9nZ2VyO1xuXG4gIHRoaXMuX2pvYkluZm8gPSB0aGlzLl93YWl0QXNzaWduKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYnVsay5fcmVxdWVzdCh7XG4gICAgICBtZXRob2QgOiAnR0VUJyxcbiAgICAgIHBhdGggOiBcIi9qb2IvXCIgKyBzZWxmLmlkLFxuICAgICAgcmVzcG9uc2VUeXBlOiBcImFwcGxpY2F0aW9uL3htbFwiXG4gICAgfSk7XG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgbG9nZ2VyLmRlYnVnKHJlcy5qb2JJbmZvKTtcbiAgICBzZWxmLmlkID0gcmVzLmpvYkluZm8uaWQ7XG4gICAgc2VsZi50eXBlID0gcmVzLmpvYkluZm8ub2JqZWN0O1xuICAgIHNlbGYub3BlcmF0aW9uID0gcmVzLmpvYkluZm8ub3BlcmF0aW9uO1xuICAgIHNlbGYuc3RhdGUgPSByZXMuam9iSW5mby5zdGF0ZTtcbiAgICByZXR1cm4gcmVzLmpvYkluZm87XG4gIH0pO1xuICByZXR1cm4gdGhpcy5fam9iSW5mby50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIFdhaXQgdGlsbCB0aGUgam9iIGlzIGFzc2lnbmVkIHRvIHNlcnZlclxuICpcbiAqIEBtZXRob2QgQnVsa35Kb2IjaW5mb1xuICogQHBhcmFtIHtDYWxsYmFjay48QnVsa35Kb2JJbmZvPn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48QnVsa35Kb2JJbmZvPn1cbiAqL1xuSm9iLnByb3RvdHlwZS5fd2FpdEFzc2lnbiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHJldHVybiAodGhpcy5pZCA/IFByb21pc2UucmVzb2x2ZSh7IGlkOiB0aGlzLmlkIH0pIDogdGhpcy5vcGVuKCkpLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cblxuLyoqXG4gKiBMaXN0IGFsbCByZWdpc3RlcmVkIGJhdGNoIGluZm8gaW4gam9iXG4gKlxuICogQG1ldGhvZCBCdWxrfkpvYiNsaXN0XG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxBcnJheS48QnVsa35CYXRjaEluZm8+Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48QXJyYXkuPEJ1bGt+QmF0Y2hJbmZvPj59XG4gKi9cbkpvYi5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGJ1bGsgPSB0aGlzLl9idWxrO1xuICB2YXIgbG9nZ2VyID0gYnVsay5fbG9nZ2VyO1xuXG4gIHJldHVybiB0aGlzLl93YWl0QXNzaWduKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYnVsay5fcmVxdWVzdCh7XG4gICAgICBtZXRob2QgOiAnR0VUJyxcbiAgICAgIHBhdGggOiBcIi9qb2IvXCIgKyBzZWxmLmlkICsgXCIvYmF0Y2hcIixcbiAgICAgIHJlc3BvbnNlVHlwZTogXCJhcHBsaWNhdGlvbi94bWxcIlxuICAgIH0pO1xuICB9KS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgIGxvZ2dlci5kZWJ1ZyhyZXMuYmF0Y2hJbmZvTGlzdC5iYXRjaEluZm8pO1xuICAgIHZhciBiYXRjaEluZm9MaXN0ID0gcmVzLmJhdGNoSW5mb0xpc3Q7XG4gICAgYmF0Y2hJbmZvTGlzdCA9IF8uaXNBcnJheShiYXRjaEluZm9MaXN0LmJhdGNoSW5mbykgPyBiYXRjaEluZm9MaXN0LmJhdGNoSW5mbyA6IFsgYmF0Y2hJbmZvTGlzdC5iYXRjaEluZm8gXTtcbiAgICByZXR1cm4gYmF0Y2hJbmZvTGlzdDtcbiAgfSkudGhlbkNhbGwoY2FsbGJhY2spO1xuXG59O1xuXG4vKipcbiAqIENsb3NlIG9wZW5lZCBqb2JcbiAqXG4gKiBAbWV0aG9kIEJ1bGt+Sm9iI2Nsb3NlXG4gKiBAcGFyYW0ge0NhbGxiYWNrLjxCdWxrfkpvYkluZm8+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxCdWxrfkpvYkluZm8+fVxuICovXG5Kb2IucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgcmV0dXJuIHRoaXMuX2NoYW5nZVN0YXRlKFwiQ2xvc2VkXCIpLnRoZW4oZnVuY3Rpb24oam9iSW5mbykge1xuICAgIHNlbGYuaWQgPSBudWxsO1xuICAgIHNlbGYuZW1pdChcImNsb3NlXCIsIGpvYkluZm8pO1xuICAgIHJldHVybiBqb2JJbmZvO1xuICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICBzZWxmLmVtaXQoXCJlcnJvclwiLCBlcnIpO1xuICAgIHRocm93IGVycjtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgc3RhdHVzIHRvIGFib3J0XG4gKlxuICogQG1ldGhvZCBCdWxrfkpvYiNhYm9ydFxuICogQHBhcmFtIHtDYWxsYmFjay48QnVsa35Kb2JJbmZvPn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7UHJvbWlzZS48QnVsa35Kb2JJbmZvPn1cbiAqL1xuSm9iLnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHJldHVybiB0aGlzLl9jaGFuZ2VTdGF0ZShcIkFib3J0ZWRcIikudGhlbihmdW5jdGlvbihqb2JJbmZvKSB7XG4gICAgc2VsZi5pZCA9IG51bGw7XG4gICAgc2VsZi5lbWl0KFwiYWJvcnRcIiwgam9iSW5mbyk7XG4gICAgcmV0dXJuIGpvYkluZm87XG4gIH0sIGZ1bmN0aW9uKGVycikge1xuICAgIHNlbGYuZW1pdChcImVycm9yXCIsIGVycik7XG4gICAgdGhyb3cgZXJyO1xuICB9KTtcbn07XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuSm9iLnByb3RvdHlwZS5fY2hhbmdlU3RhdGUgPSBmdW5jdGlvbihzdGF0ZSwgY2FsbGJhY2spIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgYnVsayA9IHRoaXMuX2J1bGs7XG4gIHZhciBsb2dnZXIgPSBidWxrLl9sb2dnZXI7XG5cbiAgdGhpcy5fam9iSW5mbyA9IHRoaXMuX3dhaXRBc3NpZ24oKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgIHZhciBib2R5ID0gW1xuICAgICAgJzw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCI/PicsXG4gICAgICAnPGpvYkluZm8geG1sbnM9XCJodHRwOi8vd3d3LmZvcmNlLmNvbS8yMDA5LzA2L2FzeW5jYXBpL2RhdGFsb2FkXCI+JyxcbiAgICAgICAgJzxzdGF0ZT4nICsgc3RhdGUgKyAnPC9zdGF0ZT4nLFxuICAgICAgJzwvam9iSW5mbz4nXG4gICAgXS5qb2luKCcnKTtcbiAgICByZXR1cm4gYnVsay5fcmVxdWVzdCh7XG4gICAgICBtZXRob2QgOiAnUE9TVCcsXG4gICAgICBwYXRoIDogXCIvam9iL1wiICsgc2VsZi5pZCxcbiAgICAgIGJvZHkgOiBib2R5LFxuICAgICAgaGVhZGVycyA6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIiA6IFwiYXBwbGljYXRpb24veG1sOyBjaGFyc2V0PXV0Zi04XCJcbiAgICAgIH0sXG4gICAgICByZXNwb25zZVR5cGU6IFwiYXBwbGljYXRpb24veG1sXCJcbiAgICB9KTtcbiAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICBsb2dnZXIuZGVidWcocmVzLmpvYkluZm8pO1xuICAgIHNlbGYuc3RhdGUgPSByZXMuam9iSW5mby5zdGF0ZTtcbiAgICByZXR1cm4gcmVzLmpvYkluZm87XG4gIH0pO1xuICByZXR1cm4gdGhpcy5fam9iSW5mby50aGVuQ2FsbChjYWxsYmFjayk7XG5cbn07XG5cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogQmF0Y2ggKGV4dGVuZHMgUmVjb3JkU3RyZWFtKVxuICpcbiAqIEBwcm90ZWN0ZWRcbiAqIEBjbGFzcyBCdWxrfkJhdGNoXG4gKiBAZXh0ZW5kcyB7c3RyZWFtLldyaXRhYmxlfVxuICogQGltcGxlbWVudHMge1Byb21pc2UuPEFycmF5LjxSZWNvcmRSZXN1bHQ+Pn1cbiAqIEBwYXJhbSB7QnVsa35Kb2J9IGpvYiAtIEJ1bGsgam9iIG9iamVjdFxuICogQHBhcmFtIHtTdHJpbmd9IFtiYXRjaElkXSAtIEJhdGNoIElEIChpZiBhbHJlYWR5IGF2YWlsYWJsZSlcbiAqL1xudmFyIEJhdGNoID0gZnVuY3Rpb24oam9iLCBiYXRjaElkKSB7XG4gIEJhdGNoLnN1cGVyXy5jYWxsKHRoaXMsIHsgb2JqZWN0TW9kZTogdHJ1ZSB9KTtcbiAgdGhpcy5qb2IgPSBqb2I7XG4gIHRoaXMuaWQgPSBiYXRjaElkO1xuICB0aGlzLl9idWxrID0gam9iLl9idWxrO1xuICB0aGlzLl9kZWZlcnJlZCA9IFByb21pc2UuZGVmZXIoKTtcbiAgdGhpcy5fc2V0dXBEYXRhU3RyZWFtcygpO1xufTtcblxuaW5oZXJpdHMoQmF0Y2gsIHN0cmVhbS5Xcml0YWJsZSk7XG5cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5CYXRjaC5wcm90b3R5cGUuX3NldHVwRGF0YVN0cmVhbXMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJhdGNoID0gdGhpcztcbiAgdmFyIGNvbnZlcnRlck9wdGlvbnMgPSB7IG51bGxWYWx1ZSA6ICcjTi9BJyB9O1xuICB0aGlzLl91cGxvYWRTdHJlYW0gPSBuZXcgUmVjb3JkU3RyZWFtLlNlcmlhbGl6YWJsZSgpO1xuICB0aGlzLl91cGxvYWREYXRhU3RyZWFtID0gdGhpcy5fdXBsb2FkU3RyZWFtLnN0cmVhbSgnY3N2JywgY29udmVydGVyT3B0aW9ucyk7XG4gIHRoaXMuX2Rvd25sb2FkU3RyZWFtID0gbmV3IFJlY29yZFN0cmVhbS5QYXJzYWJsZSgpO1xuICB0aGlzLl9kb3dubG9hZERhdGFTdHJlYW0gPSB0aGlzLl9kb3dubG9hZFN0cmVhbS5zdHJlYW0oJ2NzdicsIGNvbnZlcnRlck9wdGlvbnMpO1xuXG4gIHRoaXMub24oJ2ZpbmlzaCcsIGZ1bmN0aW9uKCkge1xuICAgIGJhdGNoLl91cGxvYWRTdHJlYW0uZW5kKCk7XG4gIH0pO1xuICB0aGlzLl91cGxvYWREYXRhU3RyZWFtLm9uY2UoJ3JlYWRhYmxlJywgZnVuY3Rpb24oKSB7XG4gICAgYmF0Y2guam9iLm9wZW4oKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gcGlwZSB1cGxvYWQgZGF0YSB0byBiYXRjaCBBUEkgcmVxdWVzdCBzdHJlYW1cbiAgICAgIGJhdGNoLl91cGxvYWREYXRhU3RyZWFtLnBpcGUoYmF0Y2guX2NyZWF0ZVJlcXVlc3RTdHJlYW0oKSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIGR1cGxleCBkYXRhIHN0cmVhbSwgb3BlbmVkIGFjY2VzcyB0byBBUEkgcHJvZ3JhbW1lcnMgYnkgQmF0Y2gjc3RyZWFtKClcbiAgdmFyIGRhdGFTdHJlYW0gPSB0aGlzLl9kYXRhU3RyZWFtID0gbmV3IER1cGxleCgpO1xuICBkYXRhU3RyZWFtLl93cml0ZSA9IGZ1bmN0aW9uKGRhdGEsIGVuYywgY2IpIHtcbiAgICBiYXRjaC5fdXBsb2FkRGF0YVN0cmVhbS53cml0ZShkYXRhLCBlbmMsIGNiKTtcbiAgfTtcbiAgZGF0YVN0cmVhbS5vbignZmluaXNoJywgZnVuY3Rpb24oKSB7XG4gICAgYmF0Y2guX3VwbG9hZERhdGFTdHJlYW0uZW5kKCk7XG4gIH0pO1xuXG4gIHRoaXMuX2Rvd25sb2FkRGF0YVN0cmVhbS5vbigncmVhZGFibGUnLCBmdW5jdGlvbigpIHtcbiAgICBkYXRhU3RyZWFtLnJlYWQoMCk7XG4gIH0pO1xuICB0aGlzLl9kb3dubG9hZERhdGFTdHJlYW0ub24oJ2VuZCcsIGZ1bmN0aW9uKCkge1xuICAgIGRhdGFTdHJlYW0ucHVzaChudWxsKTtcbiAgfSk7XG4gIGRhdGFTdHJlYW0uX3JlYWQgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgdmFyIGNodW5rO1xuICAgIHdoaWxlICgoY2h1bmsgPSBiYXRjaC5fZG93bmxvYWREYXRhU3RyZWFtLnJlYWQoKSkgIT09IG51bGwpIHtcbiAgICAgIGRhdGFTdHJlYW0ucHVzaChjaHVuayk7XG4gICAgfVxuICB9O1xufTtcblxuLyoqXG4gKiBDb25uZWN0IGJhdGNoIEFQSSBhbmQgY3JlYXRlIHN0cmVhbSBpbnN0YW5jZSBvZiByZXF1ZXN0L3Jlc3BvbnNlXG4gKlxuICogQHByaXZhdGVcbiAqIEByZXR1cm5zIHtzdHJlYW0uRHVwbGV4fVxuICovXG5CYXRjaC5wcm90b3R5cGUuX2NyZWF0ZVJlcXVlc3RTdHJlYW0gPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJhdGNoID0gdGhpcztcbiAgdmFyIGJ1bGsgPSBiYXRjaC5fYnVsaztcbiAgdmFyIGxvZ2dlciA9IGJ1bGsuX2xvZ2dlcjtcblxuICByZXR1cm4gYnVsay5fcmVxdWVzdCh7XG4gICAgbWV0aG9kIDogJ1BPU1QnLFxuICAgIHBhdGggOiBcIi9qb2IvXCIgKyBiYXRjaC5qb2IuaWQgKyBcIi9iYXRjaFwiLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwidGV4dC9jc3ZcIlxuICAgIH0sXG4gICAgcmVzcG9uc2VUeXBlOiBcImFwcGxpY2F0aW9uL3htbFwiXG4gIH0sIGZ1bmN0aW9uKGVyciwgcmVzKSB7XG4gICAgaWYgKGVycikge1xuICAgICAgYmF0Y2guZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZGVidWcocmVzLmJhdGNoSW5mbyk7XG4gICAgICBiYXRjaC5pZCA9IHJlcy5iYXRjaEluZm8uaWQ7XG4gICAgICBiYXRjaC5lbWl0KCdxdWV1ZScsIHJlcy5iYXRjaEluZm8pO1xuICAgIH1cbiAgfSkuc3RyZWFtKCk7XG59O1xuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIFdyaXRhYmxlXG4gKlxuICogQG92ZXJyaWRlXG4gKiBAcHJpdmF0ZVxuICovXG5CYXRjaC5wcm90b3R5cGUuX3dyaXRlID0gZnVuY3Rpb24ocmVjb3JkLCBlbmMsIGNiKSB7XG4gIHJlY29yZCA9IF8uY2xvbmUocmVjb3JkKTtcbiAgaWYgKHRoaXMuam9iLm9wZXJhdGlvbiA9PT0gXCJpbnNlcnRcIikge1xuICAgIGRlbGV0ZSByZWNvcmQuSWQ7XG4gIH0gZWxzZSBpZiAodGhpcy5qb2Iub3BlcmF0aW9uID09PSBcImRlbGV0ZVwiKSB7XG4gICAgcmVjb3JkID0geyBJZDogcmVjb3JkLklkIH07XG4gIH1cbiAgZGVsZXRlIHJlY29yZC50eXBlO1xuICBkZWxldGUgcmVjb3JkLmF0dHJpYnV0ZXM7XG4gIHRoaXMuX3VwbG9hZFN0cmVhbS53cml0ZShyZWNvcmQsIGVuYywgY2IpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGR1cGxleCBzdHJlYW0gd2hpY2ggYWNjZXB0cyBDU1YgZGF0YSBpbnB1dCBhbmQgYmF0Y2ggcmVzdWx0IG91dHB1dFxuICpcbiAqIEByZXR1cm5zIHtzdHJlYW0uRHVwbGV4fVxuICovXG5CYXRjaC5wcm90b3R5cGUuc3RyZWFtID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9kYXRhU3RyZWFtO1xufTtcblxuLyoqXG4gKiBFeGVjdXRlIGJhdGNoIG9wZXJhdGlvblxuICpcbiAqIEBtZXRob2QgQnVsa35CYXRjaCNleGVjdXRlXG4gKiBAcGFyYW0ge0FycmF5LjxSZWNvcmQ+fHN0cmVhbS5TdHJlYW18U3RyaW5nfSBbaW5wdXRdIC0gSW5wdXQgc291cmNlIGZvciBiYXRjaCBvcGVyYXRpb24uIEFjY2VwdHMgYXJyYXkgb2YgcmVjb3JkcywgQ1NWIHN0cmluZywgYW5kIENTViBkYXRhIGlucHV0IHN0cmVhbSBpbiBpbnNlcnQvdXBkYXRlL3Vwc2VydC9kZWxldGUvaGFyZERlbGV0ZSBvcGVyYXRpb24sIFNPUUwgc3RyaW5nIGluIHF1ZXJ5IG9wZXJhdGlvbi5cbiAqIEBwYXJhbSB7Q2FsbGJhY2suPEFycmF5LjxSZWNvcmRSZXN1bHQ+fEFycmF5LjxCYXRjaFJlc3VsdEluZm8+Pn0gW2NhbGxiYWNrXSAtIENhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7QnVsa35CYXRjaH1cbiAqL1xuQmF0Y2gucHJvdG90eXBlLnJ1biA9XG5CYXRjaC5wcm90b3R5cGUuZXhlYyA9XG5CYXRjaC5wcm90b3R5cGUuZXhlY3V0ZSA9IGZ1bmN0aW9uKGlucHV0LCBjYWxsYmFjaykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBpZiBpbnB1dCBhcmd1bWVudCBpcyBvbWl0dGVkXG4gICAgY2FsbGJhY2sgPSBpbnB1dDtcbiAgICBpbnB1dCA9IG51bGw7XG4gIH1cblxuICAvLyBpZiBiYXRjaCBpcyBhbHJlYWR5IGV4ZWN1dGVkXG4gIGlmICh0aGlzLl9yZXN1bHQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYXRjaCBhbHJlYWR5IGV4ZWN1dGVkLlwiKTtcbiAgfVxuXG4gIHZhciByZGVmZXJyZWQgPSBQcm9taXNlLmRlZmVyKCk7XG4gIHRoaXMuX3Jlc3VsdCA9IHJkZWZlcnJlZC5wcm9taXNlO1xuICB0aGlzLl9yZXN1bHQudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICBzZWxmLl9kZWZlcnJlZC5yZXNvbHZlKHJlcyk7XG4gIH0sIGZ1bmN0aW9uKGVycikge1xuICAgIHNlbGYuX2RlZmVycmVkLnJlamVjdChlcnIpO1xuICB9KTtcbiAgdGhpcy5vbmNlKCdyZXNwb25zZScsIGZ1bmN0aW9uKHJlcykge1xuICAgIHJkZWZlcnJlZC5yZXNvbHZlKHJlcyk7XG4gIH0pO1xuICB0aGlzLm9uY2UoJ2Vycm9yJywgZnVuY3Rpb24oZXJyKSB7XG4gICAgcmRlZmVycmVkLnJlamVjdChlcnIpO1xuICB9KTtcblxuICBpZiAoXy5pc09iamVjdChpbnB1dCkgJiYgXy5pc0Z1bmN0aW9uKGlucHV0LnBpcGUpKSB7IC8vIGlmIGlucHV0IGhhcyBzdHJlYW0uUmVhZGFibGUgaW50ZXJmYWNlXG4gICAgaW5wdXQucGlwZSh0aGlzLl9kYXRhU3RyZWFtKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZGF0YTtcbiAgICBpZiAoXy5pc0FycmF5KGlucHV0KSkge1xuICAgICAgXy5mb3JFYWNoKGlucHV0LCBmdW5jdGlvbihyZWNvcmQpIHtcbiAgICAgICAgT2JqZWN0LmtleXMocmVjb3JkKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVjb3JkW2tleV0gPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgcmVjb3JkW2tleV0gPSBTdHJpbmcocmVjb3JkW2tleV0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBzZWxmLndyaXRlKHJlY29yZCk7XG4gICAgICB9KTtcbiAgICAgIHNlbGYuZW5kKCk7XG4gICAgfSBlbHNlIGlmIChfLmlzU3RyaW5nKGlucHV0KSl7XG4gICAgICBkYXRhID0gaW5wdXQ7XG4gICAgICB0aGlzLl9kYXRhU3RyZWFtLndyaXRlKGRhdGEsICd1dGY4Jyk7XG4gICAgICB0aGlzLl9kYXRhU3RyZWFtLmVuZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHJldHVybiBCYXRjaCBpbnN0YW5jZSBmb3IgY2hhaW5pbmdcbiAgcmV0dXJuIHRoaXMudGhlbkNhbGwoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBQcm9taXNlL0ErIGludGVyZmFjZVxuICogaHR0cDovL3Byb21pc2VzLWFwbHVzLmdpdGh1Yi5pby9wcm9taXNlcy1zcGVjL1xuICpcbiAqIERlbGVnYXRlIHRvIGRlZmVycmVkIHByb21pc2UsIHJldHVybiBwcm9taXNlIGluc3RhbmNlIGZvciBiYXRjaCByZXN1bHRcbiAqXG4gKiBAbWV0aG9kIEJ1bGt+QmF0Y2gjdGhlblxuICovXG5CYXRjaC5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uKG9uUmVzb2x2ZWQsIG9uUmVqZWN0LCBvblByb2dyZXNzKSB7XG4gIHJldHVybiB0aGlzLl9kZWZlcnJlZC5wcm9taXNlLnRoZW4ob25SZXNvbHZlZCwgb25SZWplY3QsIG9uUHJvZ3Jlc3MpO1xufTtcblxuLyoqXG4gKiBQcm9taXNlL0ErIGV4dGVuc2lvblxuICogQ2FsbCBcInRoZW5cIiB1c2luZyBnaXZlbiBub2RlLXN0eWxlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKlxuICogQG1ldGhvZCBCdWxrfkJhdGNoI3RoZW5DYWxsXG4gKi9cbkJhdGNoLnByb3RvdHlwZS50aGVuQ2FsbCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIGlmIChfLmlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgdGhpcy50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzKTtcbiAgICAgIH0pO1xuICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBCdWxrfkJhdGNoSW5mb1xuICogQHByb3Age1N0cmluZ30gaWQgLSBCYXRjaCBJRFxuICogQHByb3Age1N0cmluZ30gam9iSWQgLSBKb2IgSURcbiAqIEBwcm9wIHtTdHJpbmd9IHN0YXRlIC0gQmF0Y2ggc3RhdGVcbiAqIEBwcm9wIHtTdHJpbmd9IHN0YXRlTWVzc2FnZSAtIEJhdGNoIHN0YXRlIG1lc3NhZ2VcbiAqL1xuXG4vKipcbiAqIENoZWNrIHRoZSBsYXRlc3QgYmF0Y2ggc3RhdHVzIGluIHNlcnZlclxuICpcbiAqIEBtZXRob2QgQnVsa35CYXRjaCNjaGVja1xuICogQHBhcmFtIHtDYWxsYmFjay48QnVsa35CYXRjaEluZm8+fSBbY2FsbGJhY2tdIC0gQ2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHtQcm9taXNlLjxCdWxrfkJhdGNoSW5mbz59XG4gKi9cbkJhdGNoLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIGJ1bGsgPSB0aGlzLl9idWxrO1xuICB2YXIgbG9nZ2VyID0gYnVsay5fbG9nZ2VyO1xuICB2YXIgam9iSWQgPSB0aGlzLmpvYi5pZDtcbiAgdmFyIGJhdGNoSWQgPSB0aGlzLmlkO1xuXG4gIGlmICgham9iSWQgfHwgIWJhdGNoSWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYXRjaCBub3Qgc3RhcnRlZC5cIik7XG4gIH1cbiAgcmV0dXJuIGJ1bGsuX3JlcXVlc3Qoe1xuICAgIG1ldGhvZCA6ICdHRVQnLFxuICAgIHBhdGggOiBcIi9qb2IvXCIgKyBqb2JJZCArIFwiL2JhdGNoL1wiICsgYmF0Y2hJZCxcbiAgICByZXNwb25zZVR5cGU6IFwiYXBwbGljYXRpb24veG1sXCJcbiAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICBsb2dnZXIuZGVidWcocmVzLmJhdGNoSW5mbyk7XG4gICAgcmV0dXJuIHJlcy5iYXRjaEluZm87XG4gIH0pLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cblxuLyoqXG4gKiBQb2xsaW5nIHRoZSBiYXRjaCByZXN1bHQgYW5kIHJldHJpZXZlXG4gKlxuICogQG1ldGhvZCBCdWxrfkJhdGNoI3BvbGxcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbnRlcnZhbCAtIFBvbGxpbmcgaW50ZXJ2YWwgaW4gbWlsbGlzZWNvbmRzXG4gKiBAcGFyYW0ge051bWJlcn0gdGltZW91dCAtIFBvbGxpbmcgdGltZW91dCBpbiBtaWxsaXNlY29uZHNcbiAqL1xuQmF0Y2gucHJvdG90eXBlLnBvbGwgPSBmdW5jdGlvbihpbnRlcnZhbCwgdGltZW91dCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBqb2JJZCA9IHRoaXMuam9iLmlkO1xuICB2YXIgYmF0Y2hJZCA9IHRoaXMuaWQ7XG5cbiAgaWYgKCFqb2JJZCB8fCAhYmF0Y2hJZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkJhdGNoIG5vdCBzdGFydGVkLlwiKTtcbiAgfVxuICB2YXIgc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIHZhciBwb2xsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGlmIChzdGFydFRpbWUgKyB0aW1lb3V0IDwgbm93KSB7XG4gICAgICB2YXIgZXJyID0gbmV3IEVycm9yKFwiUG9sbGluZyB0aW1lIG91dC4gSm9iIElkID0gXCIgKyBqb2JJZCArIFwiICwgYmF0Y2ggSWQgPSBcIiArIGJhdGNoSWQpO1xuICAgICAgZXJyLm5hbWUgPSAnUG9sbGluZ1RpbWVvdXQnO1xuICAgICAgZXJyLmpvYklkID0gam9iSWQ7XG4gICAgICBlcnIuYmF0Y2hJZCA9IGJhdGNoSWQ7XG4gICAgICBzZWxmLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2VsZi5jaGVjayhmdW5jdGlvbihlcnIsIHJlcykge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBzZWxmLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChyZXMuc3RhdGUgPT09IFwiRmFpbGVkXCIpIHtcbiAgICAgICAgICBpZiAocGFyc2VJbnQocmVzLm51bWJlclJlY29yZHNQcm9jZXNzZWQsIDEwKSA+IDApIHtcbiAgICAgICAgICAgIHNlbGYucmV0cmlldmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcihyZXMuc3RhdGVNZXNzYWdlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlcy5zdGF0ZSA9PT0gXCJDb21wbGV0ZWRcIikge1xuICAgICAgICAgIHNlbGYucmV0cmlldmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLmVtaXQoJ3Byb2dyZXNzJywgcmVzKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KHBvbGwsIGludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuICBzZXRUaW1lb3V0KHBvbGwsIGludGVydmFsKTtcbn07XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQnVsa35CYXRjaFJlc3VsdEluZm9cbiAqIEBwcm9wIHtTdHJpbmd9IGlkIC0gQmF0Y2ggcmVzdWx0IElEXG4gKiBAcHJvcCB7U3RyaW5nfSBiYXRjaElkIC0gQmF0Y2ggSUQgd2hpY2ggaW5jbHVkZXMgdGhpcyBiYXRjaCByZXN1bHQuXG4gKiBAcHJvcCB7U3RyaW5nfSBqb2JJZCAtIEpvYiBJRCB3aGljaCBpbmNsdWRlcyB0aGlzIGJhdGNoIHJlc3VsdC5cbiAqL1xuXG4vKipcbiAqIFJldHJpZXZlIGJhdGNoIHJlc3VsdFxuICpcbiAqIEBtZXRob2QgQnVsa35CYXRjaCNyZXRyaWV2ZVxuICogQHBhcmFtIHtDYWxsYmFjay48QXJyYXkuPFJlY29yZFJlc3VsdD58QXJyYXkuPEJ1bGt+QmF0Y2hSZXN1bHRJbmZvPj59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge1Byb21pc2UuPEFycmF5LjxSZWNvcmRSZXN1bHQ+fEFycmF5LjxCdWxrfkJhdGNoUmVzdWx0SW5mbz4+fVxuICovXG5CYXRjaC5wcm90b3R5cGUucmV0cmlldmUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBidWxrID0gdGhpcy5fYnVsaztcbiAgdmFyIGpvYklkID0gdGhpcy5qb2IuaWQ7XG4gIHZhciBqb2IgPSB0aGlzLmpvYjtcbiAgdmFyIGJhdGNoSWQgPSB0aGlzLmlkO1xuXG4gIGlmICgham9iSWQgfHwgIWJhdGNoSWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYXRjaCBub3Qgc3RhcnRlZC5cIik7XG4gIH1cblxuICByZXR1cm4gam9iLmluZm8oKS50aGVuKGZ1bmN0aW9uKGpvYkluZm8pIHtcbiAgICByZXR1cm4gYnVsay5fcmVxdWVzdCh7XG4gICAgICBtZXRob2QgOiAnR0VUJyxcbiAgICAgIHBhdGggOiBcIi9qb2IvXCIgKyBqb2JJZCArIFwiL2JhdGNoL1wiICsgYmF0Y2hJZCArIFwiL3Jlc3VsdFwiXG4gICAgfSk7XG4gIH0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgdmFyIHJlc3VsdHM7XG4gICAgaWYgKGpvYi5vcGVyYXRpb24gPT09ICdxdWVyeScpIHtcbiAgICAgIHZhciBjb25uID0gYnVsay5fY29ubjtcbiAgICAgIHZhciByZXN1bHRJZHMgPSByZXNbJ3Jlc3VsdC1saXN0J10ucmVzdWx0O1xuICAgICAgcmVzdWx0cyA9IHJlc1sncmVzdWx0LWxpc3QnXS5yZXN1bHQ7XG4gICAgICByZXN1bHRzID0gXy5tYXAoXy5pc0FycmF5KHJlc3VsdHMpID8gcmVzdWx0cyA6IFsgcmVzdWx0cyBdLCBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICBiYXRjaElkOiBiYXRjaElkLFxuICAgICAgICAgIGpvYklkOiBqb2JJZFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdHMgPSBfLm1hcChyZXMsIGZ1bmN0aW9uKHJldCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiByZXQuSWQgfHwgbnVsbCxcbiAgICAgICAgICBzdWNjZXNzOiByZXQuU3VjY2VzcyA9PT0gXCJ0cnVlXCIsXG4gICAgICAgICAgZXJyb3JzOiByZXQuRXJyb3IgPyBbIHJldC5FcnJvciBdIDogW11cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBzZWxmLmVtaXQoJ3Jlc3BvbnNlJywgcmVzdWx0cyk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XG4gICAgc2VsZi5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgdGhyb3cgZXJyO1xuICB9KS50aGVuQ2FsbChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIEZldGNoIHF1ZXJ5IHJlc3VsdCBhcyBhIHJlY29yZCBzdHJlYW1cbiAqIEBwYXJhbSB7U3RyaW5nfSByZXN1bHRJZCAtIFJlc3VsdCBpZFxuICogQHJldHVybnMge1JlY29yZFN0cmVhbX0gLSBSZWNvcmQgc3RyZWFtLCBjb252ZXJ0aWJsZSB0byBDU1YgZGF0YSBzdHJlYW1cbiAqL1xuQmF0Y2gucHJvdG90eXBlLnJlc3VsdCA9IGZ1bmN0aW9uKHJlc3VsdElkKSB7XG4gIHZhciBqb2JJZCA9IHRoaXMuam9iLmlkO1xuICB2YXIgYmF0Y2hJZCA9IHRoaXMuaWQ7XG4gIGlmICgham9iSWQgfHwgIWJhdGNoSWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYXRjaCBub3Qgc3RhcnRlZC5cIik7XG4gIH1cbiAgdmFyIHJlc3VsdFN0cmVhbSA9IG5ldyBSZWNvcmRTdHJlYW0uUGFyc2FibGUoKTtcbiAgdmFyIHJlc3VsdERhdGFTdHJlYW0gPSByZXN1bHRTdHJlYW0uc3RyZWFtKCdjc3YnKTtcbiAgdmFyIHJlcVN0cmVhbSA9IHRoaXMuX2J1bGsuX3JlcXVlc3Qoe1xuICAgIG1ldGhvZCA6ICdHRVQnLFxuICAgIHBhdGggOiBcIi9qb2IvXCIgKyBqb2JJZCArIFwiL2JhdGNoL1wiICsgYmF0Y2hJZCArIFwiL3Jlc3VsdC9cIiArIHJlc3VsdElkLFxuICAgIHJlc3BvbnNlVHlwZTogXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIlxuICB9KS5zdHJlYW0oKS5waXBlKHJlc3VsdERhdGFTdHJlYW0pO1xuICByZXR1cm4gcmVzdWx0U3RyZWFtO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBCdWxrQXBpID0gZnVuY3Rpb24oKSB7XG4gIEJ1bGtBcGkuc3VwZXJfLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuXG5pbmhlcml0cyhCdWxrQXBpLCBIdHRwQXBpKTtcblxuQnVsa0FwaS5wcm90b3R5cGUuYmVmb3JlU2VuZCA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiAgcmVxdWVzdC5oZWFkZXJzID0gcmVxdWVzdC5oZWFkZXJzIHx8IHt9O1xuICByZXF1ZXN0LmhlYWRlcnNbXCJYLVNGREMtU0VTU0lPTlwiXSA9IHRoaXMuX2Nvbm4uYWNjZXNzVG9rZW47XG59O1xuXG5CdWxrQXBpLnByb3RvdHlwZS5pc1Nlc3Npb25FeHBpcmVkID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgcmV0dXJuIHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDQwMCAmJlxuICAgIC88ZXhjZXB0aW9uQ29kZT5JbnZhbGlkU2Vzc2lvbklkPFxcL2V4Y2VwdGlvbkNvZGU+Ly50ZXN0KHJlc3BvbnNlLmJvZHkpO1xufTtcblxuQnVsa0FwaS5wcm90b3R5cGUuaGFzRXJyb3JJblJlc3BvbnNlQm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgcmV0dXJuICEhYm9keS5lcnJvcjtcbn07XG5cbkJ1bGtBcGkucHJvdG90eXBlLnBhcnNlRXJyb3IgPSBmdW5jdGlvbihib2R5KSB7XG4gIHJldHVybiB7XG4gICAgZXJyb3JDb2RlOiBib2R5LmVycm9yLmV4Y2VwdGlvbkNvZGUsXG4gICAgbWVzc2FnZTogYm9keS5lcnJvci5leGNlcHRpb25NZXNzYWdlXG4gIH07XG59O1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuLyoqXG4gKiBDbGFzcyBmb3IgQnVsayBBUElcbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7Q29ubmVjdGlvbn0gY29ubiAtIENvbm5lY3Rpb24gb2JqZWN0XG4gKi9cbnZhciBCdWxrID0gZnVuY3Rpb24oY29ubikge1xuICB0aGlzLl9jb25uID0gY29ubjtcbiAgdGhpcy5fbG9nZ2VyID0gY29ubi5fbG9nZ2VyO1xufTtcblxuLyoqXG4gKiBQb2xsaW5nIGludGVydmFsIGluIG1pbGxpc2Vjb25kc1xuICogQHR5cGUge051bWJlcn1cbiAqL1xuQnVsay5wcm90b3R5cGUucG9sbEludGVydmFsID0gMTAwMDtcblxuLyoqXG4gKiBQb2xsaW5nIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzXG4gKiBAdHlwZSB7TnVtYmVyfVxuICovXG5CdWxrLnByb3RvdHlwZS5wb2xsVGltZW91dCA9IDEwMDAwO1xuXG4vKiogQHByaXZhdGUgKiovXG5CdWxrLnByb3RvdHlwZS5fcmVxdWVzdCA9IGZ1bmN0aW9uKHJlcXVlc3QsIGNhbGxiYWNrKSB7XG4gIHZhciBjb25uID0gdGhpcy5fY29ubjtcbiAgcmVxdWVzdCA9IF8uY2xvbmUocmVxdWVzdCk7XG4gIHZhciBiYXNlVXJsID0gWyBjb25uLmluc3RhbmNlVXJsLCBcInNlcnZpY2VzL2FzeW5jXCIsIGNvbm4udmVyc2lvbiBdLmpvaW4oJy8nKTtcbiAgcmVxdWVzdC51cmwgPSBiYXNlVXJsICsgcmVxdWVzdC5wYXRoO1xuICB2YXIgb3B0aW9ucyA9IHsgcmVzcG9uc2VUeXBlOiByZXF1ZXN0LnJlc3BvbnNlVHlwZSB9O1xuICBkZWxldGUgcmVxdWVzdC5wYXRoO1xuICBkZWxldGUgcmVxdWVzdC5yZXNwb25zZVR5cGU7XG4gIHJldHVybiBuZXcgQnVsa0FwaSh0aGlzLl9jb25uLCBvcHRpb25zKS5yZXF1ZXN0KHJlcXVlc3QpLnRoZW5DYWxsKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCBzdGFydCBidWxrbG9hZCBqb2IgYW5kIGJhdGNoXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBTT2JqZWN0IHR5cGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcGVyYXRpb24gLSBCdWxrIGxvYWQgb3BlcmF0aW9uICgnaW5zZXJ0JywgJ3VwZGF0ZScsICd1cHNlcnQnLCAnZGVsZXRlJywgb3IgJ2hhcmREZWxldGUnKVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIE9wdGlvbnMgZm9yIGJ1bGsgbG9hZGluZyBvcGVyYXRpb25cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5leHRJZEZpZWxkXSAtIEV4dGVybmFsIElEIGZpZWxkIG5hbWUgKHVzZWQgd2hlbiB1cHNlcnQgb3BlcmF0aW9uKS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5jb25jdXJyZW5jeU1vZGVdIC0gJ1NlcmlhbCcgb3IgJ1BhcmFsbGVsJy4gRGVmYXVsdHMgdG8gUGFyYWxsZWwuXG4gKiBAcGFyYW0ge0FycmF5LjxSZWNvcmQ+fHN0cmVhbS5TdHJlYW18U3RyaW5nfSBbaW5wdXRdIC0gSW5wdXQgc291cmNlIGZvciBidWxrbG9hZC4gQWNjZXB0cyBhcnJheSBvZiByZWNvcmRzLCBDU1Ygc3RyaW5nLCBhbmQgQ1NWIGRhdGEgaW5wdXQgc3RyZWFtIGluIGluc2VydC91cGRhdGUvdXBzZXJ0L2RlbGV0ZS9oYXJkRGVsZXRlIG9wZXJhdGlvbiwgU09RTCBzdHJpbmcgaW4gcXVlcnkgb3BlcmF0aW9uLlxuICogQHBhcmFtIHtDYWxsYmFjay48QXJyYXkuPFJlY29yZFJlc3VsdD58QXJyYXkuPEJ1bGt+QmF0Y2hSZXN1bHRJbmZvPj59IFtjYWxsYmFja10gLSBDYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMge0J1bGt+QmF0Y2h9XG4gKi9cbkJ1bGsucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbih0eXBlLCBvcGVyYXRpb24sIG9wdGlvbnMsIGlucHV0LCBjYWxsYmFjaykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGlmICghdHlwZSB8fCAhb3BlcmF0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW5zdWZmaWNpZW50IGFyZ3VtZW50cy4gQXQgbGVhc3QsICd0eXBlJyBhbmQgJ29wZXJhdGlvbicgYXJlIHJlcXVpcmVkLlwiKTtcbiAgfVxuICBpZiAoIV8uaXNPYmplY3Qob3B0aW9ucykgfHwgb3B0aW9ucy5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0KSB7IC8vIHdoZW4gb3B0aW9ucyBpcyBub3QgcGxhaW4gaGFzaCBvYmplY3QsIGl0IGlzIG9taXR0ZWRcbiAgICBjYWxsYmFjayA9IGlucHV0O1xuICAgIGlucHV0ID0gb3B0aW9ucztcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuICB2YXIgam9iID0gdGhpcy5jcmVhdGVKb2IodHlwZSwgb3BlcmF0aW9uLCBvcHRpb25zKTtcbiAgam9iLm9uY2UoJ2Vycm9yJywgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgaWYgKGJhdGNoKSB7XG4gICAgICBiYXRjaC5lbWl0KCdlcnJvcicsIGVycm9yKTsgLy8gcGFzcyBqb2IgZXJyb3IgdG8gYmF0Y2hcbiAgICB9XG4gIH0pO1xuICB2YXIgYmF0Y2ggPSBqb2IuY3JlYXRlQmF0Y2goKTtcbiAgdmFyIGNsZWFudXAgPSBmdW5jdGlvbigpIHtcbiAgICBiYXRjaCA9IG51bGw7XG4gICAgam9iLmNsb3NlKCk7XG4gIH07XG4gIHZhciBjbGVhbnVwT25FcnJvciA9IGZ1bmN0aW9uKGVycikge1xuICAgIGlmIChlcnIubmFtZSAhPT0gJ1BvbGxpbmdUaW1lb3V0Jykge1xuICAgICAgY2xlYW51cCgpO1xuICAgIH1cbiAgfTtcbiAgYmF0Y2gub24oJ3Jlc3BvbnNlJywgY2xlYW51cCk7XG4gIGJhdGNoLm9uKCdlcnJvcicsIGNsZWFudXBPbkVycm9yKTtcbiAgYmF0Y2gub24oJ3F1ZXVlJywgZnVuY3Rpb24oKSB7IGJhdGNoLnBvbGwoc2VsZi5wb2xsSW50ZXJ2YWwsIHNlbGYucG9sbFRpbWVvdXQpOyB9KTtcbiAgcmV0dXJuIGJhdGNoLmV4ZWN1dGUoaW5wdXQsIGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogRXhlY3V0ZSBidWxrIHF1ZXJ5IGFuZCBnZXQgcmVjb3JkIHN0cmVhbVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzb3FsIC0gU09RTCB0byBleGVjdXRlIGluIGJ1bGsgam9iXG4gKiBAcmV0dXJucyB7UmVjb3JkU3RyZWFtLlBhcnNhYmxlfSAtIFJlY29yZCBzdHJlYW0sIGNvbnZlcnRpYmxlIHRvIENTViBkYXRhIHN0cmVhbVxuICovXG5CdWxrLnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uKHNvcWwpIHtcbiAgdmFyIG0gPSBzb3FsLnJlcGxhY2UoL1xcKFtcXHNcXFNdK1xcKS9nLCAnJykubWF0Y2goL0ZST01cXHMrKFxcdyspL2kpO1xuICBpZiAoIW0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzb2JqZWN0IHR5cGUgZm91bmQgaW4gcXVlcnksIG1heWJlIGNhdXNlZCBieSBpbnZhbGlkIFNPUUwuXCIpO1xuICB9XG4gIHZhciB0eXBlID0gbVsxXTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgcmVjb3JkU3RyZWFtID0gbmV3IFJlY29yZFN0cmVhbS5QYXJzYWJsZSgpO1xuICB2YXIgZGF0YVN0cmVhbSA9IHJlY29yZFN0cmVhbS5zdHJlYW0oJ2NzdicpO1xuICB0aGlzLmxvYWQodHlwZSwgXCJxdWVyeVwiLCBzb3FsKS50aGVuKGZ1bmN0aW9uKHJlc3VsdHMpIHtcbiAgICB2YXIgc3RyZWFtcyA9IHJlc3VsdHMubWFwKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHNlbGZcbiAgICAgICAgLmpvYihyZXN1bHQuam9iSWQpXG4gICAgICAgIC5iYXRjaChyZXN1bHQuYmF0Y2hJZClcbiAgICAgICAgLnJlc3VsdChyZXN1bHQuaWQpXG4gICAgICAgIC5zdHJlYW0oKTtcbiAgICB9KTtcblxuICAgIGpvaW5TdHJlYW1zKHN0cmVhbXMpLnBpcGUoZGF0YVN0cmVhbSk7XG4gIH0pLmZhaWwoZnVuY3Rpb24oZXJyKSB7XG4gICAgcmVjb3JkU3RyZWFtLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgfSk7XG4gIHJldHVybiByZWNvcmRTdHJlYW07XG59O1xuXG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGpvYiBpbnN0YW5jZVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gU09iamVjdCB0eXBlXG4gKiBAcGFyYW0ge1N0cmluZ30gb3BlcmF0aW9uIC0gQnVsayBsb2FkIG9wZXJhdGlvbiAoJ2luc2VydCcsICd1cGRhdGUnLCAndXBzZXJ0JywgJ2RlbGV0ZScsICdoYXJkRGVsZXRlJywgb3IgJ3F1ZXJ5JylcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBPcHRpb25zIGZvciBidWxrIGxvYWRpbmcgb3BlcmF0aW9uXG4gKiBAcmV0dXJucyB7QnVsa35Kb2J9XG4gKi9cbkJ1bGsucHJvdG90eXBlLmNyZWF0ZUpvYiA9IGZ1bmN0aW9uKHR5cGUsIG9wZXJhdGlvbiwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IEpvYih0aGlzLCB0eXBlLCBvcGVyYXRpb24sIG9wdGlvbnMpO1xufTtcblxuLyoqXG4gKiBHZXQgYSBqb2IgaW5zdGFuY2Ugc3BlY2lmaWVkIGJ5IGdpdmVuIGpvYiBJRFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBqb2JJZCAtIEpvYiBJRFxuICogQHJldHVybnMge0J1bGt+Sm9ifVxuICovXG5CdWxrLnByb3RvdHlwZS5qb2IgPSBmdW5jdGlvbihqb2JJZCkge1xuICByZXR1cm4gbmV3IEpvYih0aGlzLCBudWxsLCBudWxsLCBudWxsLCBqb2JJZCk7XG59O1xuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLypcbiAqIFJlZ2lzdGVyIGhvb2sgaW4gY29ubmVjdGlvbiBpbnN0YW50aWF0aW9uIGZvciBkeW5hbWljYWxseSBhZGRpbmcgdGhpcyBBUEkgbW9kdWxlIGZlYXR1cmVzXG4gKi9cbmpzZm9yY2Uub24oJ2Nvbm5lY3Rpb246bmV3JywgZnVuY3Rpb24oY29ubikge1xuICBjb25uLmJ1bGsgPSBuZXcgQnVsayhjb25uKTtcbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gQnVsaztcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iXX0=
