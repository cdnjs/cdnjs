!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jsforce=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file Manages Salesforce Analytics API
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

var _        = require('underscore')._,
    Promise  = require('../promise');

/**
 * Report instance to retrieving asynchronously executed result
 *
 * @protected
 * @class Analytics~ReportInstance
 * @param {Analytics~Report} report - Report
 * @param {String} id - Report instance id
 */
var ReportInstance = function(report, id) {
  this._report = report;
  this._conn = report._conn;
  this.id = id;
};

/**
 * Retrieve report result asynchronously executed
 *
 * @method Analytics~ReportInstance#retrieve
 * @param {Callback.<Analytics~ReportResult>} [callback] - Callback function
 * @returns {Promise.<Analytics~ReportResult>}
 */
ReportInstance.prototype.retrieve = function(callback) {
  var conn = this._conn,
      report = this._report;
  var url = [ conn._baseUrl(), "analytics", "reports", report.id, "instances", this.id ].join('/');
  return conn._request(url).thenCall(callback);
};

/**
 * Report object in Analytics API
 *
 * @protected
 * @class Analytics~Report
 * @param {Connection} conn Connection
 */
var Report = function(conn, id) {
  this._conn = conn;
  this.id = id;
};

/**
 * Describe report metadata
 *
 * @method Analytics~Report#describe
 * @param {Callback.<Analytics~ReportMetadata>} [callback] - Callback function
 * @returns {Promise.<Analytics~ReportMetadata>}
 */
Report.prototype.describe = function(callback) {
  var url = [ this._conn._baseUrl(), "analytics", "reports", this.id, "describe" ].join('/');
  return this._conn._request(url).thenCall(callback);
};

/**
 * Run report synchronously
 *
 * @method Analytics~Report#execute
 * @param {Object} [options] - Options
 * @param {Boolean} options.details - Flag if include detail in result
 * @param {Analytics~ReportMetadata} options.metadata - Overriding report metadata
 * @param {Callback.<Analytics~ReportResult>} [callback] - Callback function
 * @returns {Promise.<Analytics~ReportResult>}
 */
Report.prototype.run = 
Report.prototype.exec = 
Report.prototype.execute = function(options, callback) {
  options = options || {};
  if (_.isFunction(options)) {
    callback = options;
    options = {};
  }
  var url = [ this._conn._baseUrl(), "analytics", "reports", this.id ].join('/');
  if (options.details) {
    url += "?includeDetails=true";
  }
  var params = { method : options.metadata ? 'POST' : 'GET', url : url };
  if (options.metadata) {
    params.headers = { "Content-Type" : "application/json" };
    params.body = JSON.stringify(options.metadata);
  }
  return this._conn._request(params).thenCall(callback);
};

/**
 * Run report asynchronously
 *
 * @method Analytics~Report#executeAsync
 * @param {Object} [options] - Options
 * @param {Boolean} options.details - Flag if include detail in result
 * @param {Analytics~ReportMetadata} options.metadata - Overriding report metadata
 * @param {Callback.<Analytics~ReportInstanceAttrs>} [callback] - Callback function
 * @returns {Promise.<Analytics~ReportInstanceAttrs>}
 */
Report.prototype.executeAsync = function(options, callback) {
  options = options || {};
  if (_.isFunction(options)) {
    callback = options;
    options = {};
  }
  var url = [ this._conn._baseUrl(), "analytics", "reports", this.id, "instances" ].join('/');
  if (options.details) {
    url += "?includeDetails=true";
  }
  var params = { method : 'POST', url : url, body: "" };
  if (options.metadata) {
    params.headers = { "Content-Type" : "application/json" };
    params.body = JSON.stringify(options.metadata);
  }
  return this._conn._request(params).thenCall(callback);
};

/**
 * Get report instance for specified instance ID
 *
 * @method Analytics~Report#instance
 * @param {String} id - Report instance ID
 * @returns {Analytics~ReportInstance}
 */
Report.prototype.instance = function(id) {
  return new ReportInstance(this, id);
};

/**
 * List report instances which had been executed asynchronously
 *
 * @method Analytics~Report#instances
 * @param {Callback.<Array.<Analytics~ReportInstanceAttrs>>} [callback] - Callback function
 * @returns {Promise.<Array.<Analytics~ReportInstanceAttrs>>}
 */
Report.prototype.instances = function(callback) {
  var url = [ this._conn._baseUrl(), "analytics", "reports", this.id, "instances" ].join('/');
  return this._conn._request(url).thenCall(callback);
};


/**
 * API class for Analytics API
 *
 * @class
 * @param {Connection} conn Connection
 */
var Analytics = function(conn) {
  this._conn = conn;
};

/**
 * Get report object of Analytics API
 *
 * @param {String} id - Report Id
 * @returns {Analytics~Report}
 */
Analytics.prototype.report = function(id) {
  return new Report(this._conn, id);
};

/**
 * Get recent report list
 *
 * @param {Callback.<Array.<Analytics~ReportInfo>>} [callback] - Callback function
 * @returns {Promise.<Array.<Analytics~ReportInfo>>}
 */
Analytics.prototype.reports = function(callback) {
  var url = [ this._conn._baseUrl(), "analytics", "reports" ].join('/');
  return this._conn._request(url).thenCall(callback);
};

module.exports = Analytics;

},{"../promise":21,"underscore":63}],2:[function(require,module,exports){
/**
 * @file Manages Salesforce Apex REST endpoint calls
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

/**
 * API class for Apex REST endpoint call
 *
 * @class
 * @param {Connection} conn Connection
 */
var Apex = function(conn) {
  this._conn = conn;
};

/**
 * @private
 */
Apex.prototype._baseUrl = function() {
  return this._conn.instanceUrl + "/services/apexrest";
};

/**
 * @private
 */
Apex.prototype._createRequestParams = function(method, path, body) {
  var params = {
    method: method,
    url: this._baseUrl() + path
  };
  if (!/^(GET|DELETE)$/i.test(method)) {
    params.headers = {
      "Content-Type" : "application/json"
    };
  }
  if (body) {
    params.body = JSON.stringify(body);
  }
  return params;
};

/**
 * Call Apex REST service in GET request
 *
 * @param {String} path - URL path to Apex REST service
 * @param {Callback.<Object>} [callback] - Callback function
 * @returns {Promise.<Object>}
 */
Apex.prototype.get = function(path, callback) {
  return this._conn._request(this._createRequestParams('GET', path)).thenCall(callback);
};

/**
 * Call Apex REST service in POST request
 *
 * @param {String} path - URL path to Apex REST service
 * @param {Object} [body] - Request body
 * @param {Callback.<Object>} [callback] - Callback function
 * @returns {Promise.<Object>}
 */
Apex.prototype.post = function(path, body, callback) {
  if (typeof body === 'function') {
    callback = body;
    body = undefined;
  }
  var params = this._createRequestParams('POST', path, body);
  return this._conn._request(params).thenCall(callback);
};

/**
 * Call Apex REST service in PUT request
 *
 * @param {String} path - URL path to Apex REST service
 * @param {Object} [body] - Request body
 * @param {Callback.<Object>} [callback] - Callback function
 * @returns {Promise.<Object>}
 */
Apex.prototype.put = function(path, body, callback) {
  if (typeof body === 'function') {
    callback = body;
    body = undefined;
  }
  var params = this._createRequestParams('PUT', path, body);
  return this._conn._request(params).thenCall(callback);
};

/**
 * Call Apex REST service in PATCH request
 *
 * @param {String} path - URL path to Apex REST service
 * @param {Object} [body] - Request body
 * @param {Callback.<Object>} [callback] - Callback function
 * @returns {Promise.<Object>}
 */
Apex.prototype.patch = function(path, body, callback) {
  if (typeof body === 'function') {
    callback = body;
    body = undefined;
  }
  var params = this._createRequestParams('PATCH', path, body);
  return this._conn._request(params).thenCall(callback);
};

/**
 * Synonym of Apex#delete()
 *
 * @method Apex#del
 *
 * @param {String} path - URL path to Apex REST service
 * @param {Object} [body] - Request body
 * @param {Callback.<Object>} [callback] - Callback function
 * @returns {Promise.<Object>}
 */
/**
 * Call Apex REST service in DELETE request
 *
 * @method Apex#delete
 *
 * @param {String} path - URL path to Apex REST service
 * @param {Object} [body] - Request body
 * @param {Callback.<Object>} [callback] - Callback function
 * @returns {Promise.<Object>}
 */
Apex.prototype.del =
Apex.prototype["delete"] = function(path, callback) {
  return this._conn._request(this._createRequestParams('DELETE', path)).thenCall(callback);
};


module.exports = Apex;

},{}],3:[function(require,module,exports){
(function (process){
/*global process*/
/**
 * @file Manages Salesforce Bulk API related operations
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

var util         = require('util'),
    stream       = require('stream'),
    Stream       = stream.Stream,
    events       = require('events'),
    _            = require('underscore')._,
    Connection   = require('../connection'),
    RecordStream = require('../record-stream'),
    CSV          = require('../csv'),
    Promise      = require('../promise');

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

util.inherits(Job, events.EventEmitter);

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
    var body = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<jobInfo  xmlns="http://www.force.com/2009/06/asyncapi/dataload">',
        '<operation>' + this.operation.toLowerCase() + '</operation>',
        '<object>' + this.type + '</object>',
        (this.options.extIdField ?
         '<externalIdFieldName>'+this.options.extIdField+'</externalIdFieldName>' :
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
 * Check the job status from server
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
  return (this.id ? new Promise({ id: this.id }) : this.open()).thenCall(callback);
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
 * Batch (extends RecordStream implements Sendable)
 *
 * @protected
 * @class Bulk~Batch
 * @extends {RecordStream}
 * @implements {Promise.<Array.<RecordResult>>}
 * @param {Bulk~Job} job - Bulk job object
 * @param {String} [batchId] - Batch ID (if already available)
 */
var Batch = function(job, batchId) {
  Batch.super_.apply(this);
  this.sendable = true;
  this.job = job;
  this.id = batchId;
  this._bulk = job._bulk;
  this._csvStream = new RecordStream.CSVStream({ nullValue: '#N/A' });
  this._csvStream.stream().pipe(this.stream());
  this._deferred = Promise.defer();
};

util.inherits(Batch, RecordStream);

/**
 * Execute batch operation
 *
 * @method Bulk~Batch#execute
 * @param {Array.<Record>|stream.Stream|String} [input] - Input source for batch operation. Accepts array of records, CSv string, and CSV data input stream.
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
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

  if (input instanceof Stream) {
    input.pipe(this.stream());
  } else {
    var data;
    if (_.isArray(input)) {
      _.forEach(input, function(record) { self.send(record); });
      self.end();
    } else if (_.isString(input)){
      data = input;
      var stream = this.stream();
      stream.write(data);
      stream.end();
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
 * @override
 */
Batch.prototype.send = function(record) {
  record = _.clone(record);
  if (this.job.operation === "insert") {
    delete record.Id;
  } else if (this.job.operation === "delete") {
    record = { Id: record.Id };
  }
  delete record.type;
  delete record.attributes;
  return this._csvStream.send(record);
};

/**
 * @override
 */
Batch.prototype.end = function(record) {
  if (record) {
    this.send(record);
  }
  this.sendable = false;
  this._csvStream.end();
};



/**
 * Check batch status in server
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
      self.emit('error', new Error("polling time out"));
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
 * Retrieve batch result
 *
 * @method Bulk~Batch#retrieve
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<Array.<RecordResult>|Array.<Bulk~BatchResultReference>>}
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
  }, function(err) {
    self.emit('error', err);
    throw err;
  }).thenCall(callback);
};

/**
 * Fetch query result as a record stream
 * @param {String} resultId - Result id
 * @returns {RecordStream.CSVStream} - Record stream, convertible to CSV data stream
 */
Batch.prototype.result = function(resultId) {
  var jobId = this.job.id;
  var batchId = this.id;

  if (!jobId || !batchId) {
    throw new Error("Batch not started.");
  }
  return new RecordStream.CSVStream(null,
    this._bulk._request({
      method : 'GET',
      path : "/job/" + jobId + "/batch/" + batchId + "/result/" + resultId
    }).stream()
  );
};

/**
 * @override
 */
Batch.prototype.stream = function() {
  if (!this._stream) {
    this._stream = new BatchStream(this);
  }
  return this._stream;
};

/*--------------------------------------------*/

/**
 * Batch uploading stream (extends WritableStream)
 *
 * @private
 * @class Bulk~BatchStream
 * @extends stream.Stream
 */
var BatchStream = function(batch) {
  BatchStream.super_.call(this);
  this.batch = batch;
  this.writable = true;
};

util.inherits(BatchStream, Stream);

/**
 * @private
 */
BatchStream.prototype._getRequestStream = function() {
  var batch = this.batch;
  var bulk = batch._bulk;
  var logger = bulk._logger;

  if (!this._reqStream) {
    this._reqStream = bulk._request({
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
  }
  return this._reqStream;
};

/**
 * @override
 */
BatchStream.prototype.write = function(data) {
  var batch = this.batch;
  if (!batch.job.id) {
    this._queue(data);
    return;
  }
  return this._getRequestStream().write(data);
};

/**
 * @override
 */
BatchStream.prototype.end = function(data) {
  var batch = this.batch;
  if (!batch.job.id) {
    this._ending = true;
    if (data) {
      this._queue(data);
    }
    return;
  }
  this.writable = false;
  this._getRequestStream().end(data);
};

/**
 * @private
 */
BatchStream.prototype._queue = function(data) {
  var bstream = this;
  var batch = this.batch;
  var job = batch.job;
  if (!this._buffer) {
    this._buffer = [];
    job.open(function(err) {
      if (err) {
        batch.emit("error", err);
        return;
      }
      bstream._buffer.forEach(function(data) {
        bstream.write(data);
      });
      if (bstream._ending) {
        bstream.end();
      }
      bstream._buffer = [];
    });
  }
  this._buffer.push(data);
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
Bulk.prototype._request = function(params, callback) {
  var conn = this._conn;
  params = _.clone(params);
  var baseUrl = [ conn.instanceUrl, "services/async", conn.version ].join('/');
  params.url = baseUrl + params.path;
  var options = {
    responseContentType: params.responseType,
    beforesend: function(conn, params) {
      params.headers["X-SFDC-SESSION"] = conn.accessToken;
    },
    parseError: function(err) {
      return {
        code: err.error.exceptionCode,
        message: err.error.exceptionMessage
      };
    }
  };
  delete params.path;
  delete params.responseType;
  return this._conn._request(params, callback, options);
};

/**
 * Create and start bulkload job and batch
 * 
 * @param {String} type - SObject type
 * @param {String} operation - Bulk load operation ('insert', 'update', 'upsert', 'delete', or 'hardDelete')
 * @param {Object} [options] - Options for bulk loading operation
 * @param {String} [options.extIdField] - External ID field name (used when upsert operation).
 * @param {Array.<Record>|stream.Stream|String} [input] - Input source for bulkload. Accepts array of records, CSv string, and CSV data input stream.
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
 * @returns {Bulk~Batch}
 */
Bulk.prototype.load = function(type, operation, options, input, callback) {
  var self = this;
  if (!type || !operation) {
    throw new Error("Insufficient arguments. At least, 'type' and 'operation' are required.");
  }
  if (operation.toLowerCase() !== 'upsert') { // options is only for upsert operation
    callback = input;
    input = options;
    options = null;
  }
  var job = this.createJob(type, operation, options);
  var batch = job.createBatch();
  var cleanup = function() { job.close(); };
  batch.on('response', cleanup);
  batch.on('error', cleanup);
  batch.on('queue', function() { batch.poll(self.pollInterval, self.pollTimeout); });
  return batch.execute(input, callback);
};

/**
 * Execute bulk query and get record stream
 *
 * @param {String} soql - SOQL to execute in bulk job
 * @returns {RecordStream.CSVStream} - Record stream, convertible to CSV data stream
 */
Bulk.prototype.query = function(soql) {
  var m = soql.replace(/\([\s\S]+\)/g, '').match(/FROM\s+(\w+)/i);
  if (!m) {
    throw new Error("No sobject type found in query, maybe caused by invalid SOQL.");
  }
  var type = m[1];
  var self = this;
  var rstream = new RecordStream.CSVStream();
  this.load(type, "query", soql).then(function(results) {
    // Ideally, it should merge result files into one stream.
    // Currently only first batch result is the target (mostly enough).
    var r = results[0];
    var result = self.job(r.jobId).batch(r.batchId).result(r.id);
    result.stream().pipe(rstream.stream());
  });
  return rstream;
};


/**
 * Create a new job instance
 *
 * @param {String} type - SObject type
 * @param {String} operation - Bulk load operation ('insert', 'update', 'upsert', 'delete', or 'hardDelete')
 * @param {Object} [options] - Options for bulk loading operation
 * @returns {Bulk~Job}
 */
Bulk.prototype.createJob = function(type, operation, options) {
  var job = new Job(this, type, operation, options);
  job.open();
  return job;
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

module.exports = Bulk;

}).call(this,require('_process'))
},{"../connection":14,"../csv":16,"../promise":21,"../record-stream":23,"_process":39,"events":37,"stream":43,"underscore":63,"util":46}],4:[function(require,module,exports){
/**
 * @file Manages Salesforce Chatter REST API calls
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

var util    = require('util'),
    _       = require('underscore'),
    Promise = require('../promise');

/**
 * API class for Chatter REST API call
 *
 * @class
 * @param {Connection} conn Connection
 */
var Chatter = module.exports = function(conn) {
  this._conn = conn;
};

/**
 * Sending request to API endpoint
 * @private
 */
Chatter.prototype._request = function(params, callback) {
  if (/^(put|post|patch)$/i.test(params.method)) {
    if (_.isObject(params.body)) {
      params.headers = {
        "Content-Type": "application/json"
      };
      params.body = JSON.stringify(params.body);
    }
  }
  params.url = this._normalizeUrl(params.url);
  return this._conn._request(params, callback);
};

/**
 * Convert path to site root relative url
 * @private
 */
Chatter.prototype._normalizeUrl = function(url) {
  if (url.indexOf('/chatter/') === 0 || url.indexOf('/connect/') === 0) {
    return '/services/data/v' + this._conn.version + url;
  } else if (/^\/v[\d]+\.[\d]+\//.test(url)) {
    return '/services/data' + url;
  } else if (url.indexOf('/services/') !== 0 && url[0] === '/') {
    return '/services/data/v' + this._conn.version + '/chatter' + url;
  } else {
    return url;
  }
};

/**
 * @typedef {Object} Chatter~RequestParams
 * @prop {String} method - HTTP method
 * @prop {String} url - Resource URL
 * @prop {String} [body] - HTTP body (in POST/PUT/PATCH methods)
 */

/**
 * @typedef {Object} Chatter~RequestResult
 */

/**
 * Make a request for chatter API resource
 *
 * @param {Chatter~RequestParams} params - Paramters representing HTTP request
 * @param {Callback.<Chatter~RequestResult>} [callback] - Callback func
 * @returns {Chatter~Request}
 */
Chatter.prototype.request = function(params, callback) {
  return new Request(this, params).thenCall(callback);
};

/**
 * Make a resource request to chatter API
 *
 * @param {String} url - Resource URL
 * @param {Object} [queryParams] - Query parameters (in hash object)
 * @returns {Chatter~Resource}
 */
Chatter.prototype.resource = function(url, queryParams) {
  return new Resource(this, url, queryParams);
};

/**
 * @typedef {Object} Chatter~BatchRequestResult
 * @prop {Boolean} hasError - Flag if the batch has one or more errors
 * @prop {Array.<Object>} results - Batch request results in array
 * @prop {Number} results.statusCode - HTTP response status code
 * @prop {Chatter~RequestResult} results.result - Parsed HTTP response body
 */

/**
 * Make a batch request to chatter API
 *
 * @params {Array.<Chatter~Request>} requests - Chatter API requests
 * @param {Callback.<Chatter~BatchRequestResult>} [callback] - Callback func
 * @returns {Promise.<Chatter~BatchRequestResult>}
 */
Chatter.prototype.batch = function(requests, callback) {
  var self = this;
  var batchRequests = [], batchDeferreds = [];
  _.forEach(requests, function(request) {
    var deferred = Promise.defer();
    request._promise = deferred.promise;
    batchRequests.push(request.batchParams());
    batchDeferreds.push(deferred);
  });
  var params = {
    method: 'POST',
    url: this._normalizeUrl('/connect/batch'),
    body: {
      batchRequests: batchRequests
    }
  };
  return this._request(params).then(function(res) {
    _.forEach(res.results, function(result, i) {
      var deferred = batchDeferreds[i];
      if (result.statusCode >= 400) {
        deferred.reject(result.result);
      } else {
        deferred.resolve(result.result);
      }
    });
    return res;
  }).thenCall(callback);
};

/*--------------------------------------------*/
/**
 * A class representing chatter API request
 *
 * @protected
 * @class Chatter~Request
 * @implements {Promise.<Chatter~RequestResult>}
 * @param {Chatter} chatter - Chatter API object
 * @param {Chatter~RequestParams} params - Paramters representing HTTP request
 */
var Request = function(chatter, params) {
  this._chatter = chatter;
  this._params = params;
  this._promise = null;
};

/**
 * @typedef {Object} Chatter~BatchRequestParams
 * @prop {String} method - HTTP method
 * @prop {String} url - Resource URL
 * @prop {String} [richInput] - HTTP body (in POST/PUT/PATCH methods)
 */

/**
 * Retrieve parameters in batch request form
 *
 * @method Chatter~Request#batchParams
 * @returns {Chatter~BatchRequestParams}
 */
Request.prototype.batchParams = function() {
  var params = this._params;
  var batchParams = {
    method: params.method,
    url: this._chatter._normalizeUrl(params.url)
  };
  if (this._params.body) {
    batchParams.richInput = this._params.body;
  }
  return batchParams;
};

/**
 * Retrieve parameters in batch request form
 *
 * @method Chatter~Request#promise
 * @returns {Promise.<Chatter~RequestResult>}
 */
Request.prototype.promise = function() {
  return this._promise || this._chatter._request(this._params);
};

/**
 * Returns Node.js Stream object for request
 *
 * @method Chatter~Request#stream
 * @returns {stream.Stream}
 */
Request.prototype.stream = function() {
  return this._chatter._request(this._params).stream();
};

/**
 * Promise/A+ interface
 * http://promises-aplus.github.io/promises-spec/
 *
 * Delegate to deferred promise, return promise instance for batch result
 *
 * @method Chatter~Request#then
 */
Request.prototype.then = function(onResolve, onReject) {
  return this.promise().then(onResolve, onReject);
};

/**
 * Promise/A+ extension
 * Call "then" using given node-style callback function
 *
 * @method Chatter~Request#thenCall
 */
Request.prototype.thenCall = function(callback) {
  return _.isFunction(callback) ? this.promise().thenCall(callback) : this;
};


/*--------------------------------------------*/
/**
 * A class representing chatter API resource
 *
 * @protected
 * @class Chatter~Resource
 * @extends Chatter~Request
 * @param {Chatter} chatter - Chatter API object
 * @param {String} url - Resource URL
 * @param {Object} [queryParams] - Query parameters (in hash object)
 */
var Resource = function(chatter, url, queryParams) {
  if (queryParams) {
    var qstring = _.map(_.keys(queryParams), function(name) {
      return name + "=" + encodeURIComponent(queryParams[name]);
    }).join('&');
    url += (url.indexOf('?') > 0 ? '&' : '?') + qstring;
  }
  Resource.super_.call(this, chatter, { method: 'GET', url: url });
  this._url = url;
};

util.inherits(Resource, Request);

/**
 * Create a new resource
 *
 * @method Chatter~Resource#create
 * @param {Object} data - Data to newly post
 * @param {Callback.<Chatter~RequestResult>} [callback] - Callback function
 * @returns {Chatter~Request}
 */
Resource.prototype.create = function(data, callback) {
  return this._chatter.request({
    method: 'POST',
    url: this._url,
    body: data
  }).thenCall(callback);
};

/**
 * Retrieve resource content
 *
 * @method Chatter~Resource#retrieve
 * @param {Callback.<Chatter~RequestResult>} [callback] - Callback function
 * @returns {Chatter~Request}
 */
Resource.prototype.retrieve = function(callback) {
  return this.thenCall(callback);
};

/**
 * Update specified resource
 *
 * @method Chatter~Resource#update
 * @param {Obejct} data - Data to update
 * @param {Callback.<Chatter~RequestResult>} [callback] - Callback function
 * @returns {Chatter~Request}
 */
Resource.prototype.update = function(data, callback) {
  return this._chatter.request({
    method: 'POST',
    url: this._url,
    body: data
  }).thenCall(callback);
};

/**
 * Synonym of Resource#delete()
 *
 * @method Chatter~Resource#del
 * @param {Callback.<Chatter~RequestResult>} [callback] - Callback function
 * @returns {Chatter~Request}
 */
/**
 * Delete specified resource
 *
 * @method Chatter~Resource#delete
 * @param {Callback.<Chatter~RequestResult>} [callback] - Callback function
 * @returns {Chatter~Request}
 */
Resource.prototype.del =
Resource.prototype["delete"] = function(callback) {
  return this._chatter.request({
    method: 'DELETE',
    url: this._url
  }).thenCall(callback);
};

},{"../promise":21,"underscore":63,"util":46}],5:[function(require,module,exports){
(function (process,Buffer){
/*global process, Buffer */
/**
 * @file Manages Salesforce Metadata API
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

var util    = require('util'),
    events  = require('events'),
    stream  = require('stream'),
    Stream  = stream.Stream,
    _       = require('underscore'),
    Promise = require('../promise'),
    SOAP    = require('../soap');

/*--------------------------------------------*/
/**
 * Class for Salesforce Metadata API
 *
 * @class
 * @param {Connection} conn - Connection object
 */
var Metadata = module.exports = function(conn) {
  this._conn = conn;
};


/**
 * Polling interval in milliseconds
 * @type {Number}
 */
Metadata.prototype.pollInterval = 1000;

/**
 * Polling timeout in milliseconds
 * @type {Number}
 */
Metadata.prototype.pollTimeout = 10000;


/**
 * Call Metadata API SOAP endpoint
 *
 * @private
 */
Metadata.prototype._invoke = function(method, message, callback) {
  var soapEndpoint = new SOAP({
    sessionId: this._conn.accessToken,
    serverUrl: this._conn.instanceUrl + "/services/Soap/m/" + this._conn.version,
    xmlns: "http://soap.sforce.com/2006/04/metadata"
  }, this._conn._transport);
  return soapEndpoint.invoke(method, message).then(function(res) {
    return res.result;
  }).thenCall(callback);
};


/**
 * @typedef {Object} Metadata~MetadataInfo
 * @prop {String} fullName - The name of the component
 */

/**
 * Asynchronously adds one or more new metadata components to the organization.
 *
 * @param {String} type - The type of metadata to create
 * @param {Metadata~MetadataInfo|Array.<Metadata~MetadataInfo>} metadata - Metadata to create
 * @param {Callback.<Metadata~AsyncResult|Array.<Metadata~AsyncResult>>} [callback] - Callback function
 * @returns {Metadata~AsyncResultLocator}
 */
Metadata.prototype.createAsync = function(type, metadata, callback) {
  if (Number(this._conn.version) > 30) {
    throw new Error("Async metadata CRUD calls are not supported on ver 31.0 or later.");
  }
  var convert = function(md) {
    md["@xsi:type"] = type;
    return md;
  };
  var isArray = _.isArray(metadata);
  metadata = isArray ? _.map(metadata, convert) : convert(metadata);
  var res = this._invoke("create", { metadata: metadata });
  return new AsyncResultLocator(this, res, isArray).thenCall(callback);
};

/**
 * @private
 */
function convertToSaveResult(result) {
  var saveResult = _.clone(result);
  saveResult.success = saveResult.success === 'true';
  return saveResult;
}

/**
 * Synonym of Metadata#create().
 *
 * @method createSync
 * @param {String} type - The type of metadata to create
 * @param {Metadata~MetadataInfo|Array.<Metadata~MetadataInfo>} metadata - Metadata to create
 * @param {Callback.<Metadata~SaveResult|Array.<Metadata~SaveResult>>} [callback] - Callback function
 * @returns {Promise.<Metadata~SaveResult|Array.<Metadata~SaveResult>>}
 */
/**
 * Synchronously adds one or more new metadata components to the organization.
 *
 * @method Metadata#create
 * @param {String} type - The type of metadata to create
 * @param {Metadata~MetadataInfo|Array.<Metadata~MetadataInfo>} metadata - Metadata to create
 * @param {Callback.<Metadata~SaveResult|Array.<Metadata~SaveResult>>} [callback] - Callback function
 * @returns {Promise.<Metadata~SaveResult|Array.<Metadata~SaveResult>>}
 */
Metadata.prototype.createSync =
Metadata.prototype.create = function(type, metadata, callback) {
  var convert = function(md) {
    md["@xsi:type"] = type;
    return md;
  };
  var isArray = _.isArray(metadata);
  metadata = isArray ? _.map(metadata, convert) : convert(metadata);
  return this._invoke("createMetadata", { metadata: metadata }).then(function(results) {
    return _.isArray(results) ? _.map(results, convertToSaveResult) : convertToSaveResult(results);
  }).thenCall(callback);
};

/**
 * @private
 */
function convertToMetadataInfo(rec) {
  var metadataInfo = _.clone(rec);
  delete metadataInfo.$;
  return metadataInfo;
}

/**
 * Synonym of Metadata#read()
 *
 * @method Metadata#readSync
 * @param {String} type - The type of metadata to read
 * @param {String|Array.<String>} fullNames - full name(s) of metadata objects to read
 * @param {Callback.<Metadata~ReadResult|Array.<Metadata~ReadResult>>} [callback] - Callback function
 * @returns {Promise.<Array.<Metadata~MetadataInfo|Array.<Metadata~MetadataInfo>>>}
 */
/**
 * Synchronously read specified metadata components in the organization.
 *
 * @method Metadata#read
 * @param {String} type - The type of metadata to read
 * @param {String|Array.<String>} fullNames - full name(s) of metadata objects to read
 * @param {Callback.<Metadata~ReadResult|Array.<Metadata~ReadResult>>} [callback] - Callback function
 * @returns {Promise.<Array.<Metadata~MetadataInfo|Array.<Metadata~MetadataInfo>>>}
 */
Metadata.prototype.readSync =
Metadata.prototype.read = function(type, fullNames, callback) {
  return this._invoke("readMetadata", { type: type, fullNames: fullNames }).then(function(res) {
    return _.isArray(res.records) ? _.map(res.records, convertToMetadataInfo) : convertToMetadataInfo(res.records);
  }).thenCall(callback);
};

/**
 * @typedef {Object} Metadata~UpdateMetadataInfo
 * @prop {String} currentName - The API name of the component or field before the update
 * @prop {Metadata~MetadataInfo} metadata - Full specification of the component or field you wish to update
 */

/**
 * Asynchronously updates one or more metadata components in the organization.
 *
 * @param {String} type - The type of metadata to update
 * @param {Metadata~UpdateMetadataInfo|Array.<Metadata~UpdateMetadataInfo>} updateMetadata - Updating metadata
 * @param {Callback.<Metadata~AsyncResult|Array.<Metadata~AsyncResult>>} [callback] - Callback function
 * @returns {Metadata~AsyncResultLocator}
 */
Metadata.prototype.updateAsync = function(type, updateMetadata, callback) {
  if (Number(this._conn.version) > 30) {
    throw new Error("Async metadata CRUD calls are not supported on ver 31.0 or later.");
  }
  var convert = function(umd) {
    umd.metadata["@xsi:type"] = type;
    return umd;
  };
  var isArray = _.isArray(updateMetadata);
  updateMetadata = isArray ? _.map(updateMetadata, convert) : convert(updateMetadata);
  var res = this._invoke("update", { updateMetadata: updateMetadata });
  return new AsyncResultLocator(this, res, isArray).thenCall(callback);
};

/**
 * Synonym of Metadata#update().
 *
 * @method Metadata#updateSync
 * @param {String} type - The type of metadata to update
 * @param {Metadata~MetadataInfo|Array.<Metadata~MetadataInfo>} updateMetadata - Updating metadata
 * @param {Callback.<Metadata~SaveResult|Array.<Metadata~SaveResult>>} [callback] - Callback function
 * @returns {Promise.<Metadata~SaveResult|Array.<Metadata~SaveResult>>}
 */
/**
 * Synchronously updates one or more metadata components in the organization.
 *
 * @method Metadata#update
 * @param {String} type - The type of metadata to update
 * @param {Metadata~MetadataInfo|Array.<Metadata~MetadataInfo>} updateMetadata - Updating metadata
 * @param {Callback.<Metadata~SaveResult|Array.<Metadata~SaveResult>>} [callback] - Callback function
 * @returns {Promise.<Metadata~SaveResult|Array.<Metadata~SaveResult>>}
 */
Metadata.prototype.updateSync =
Metadata.prototype.update = function(type, metadata, callback) {
  var convert = function(md) {
    md["@xsi:type"] = type;
    return md;
  };
  var isArray = _.isArray(metadata);
  metadata = isArray ? _.map(metadata, convert) : convert(metadata);
  return this._invoke("updateMetadata", { metadata: metadata }).then(function(results) {
    return _.isArray(results) ? _.map(results, convertToSaveResult) : convertToSaveResult(results);
  }).thenCall(callback);
};

/**
 * Upserts one or more components in your organization's data.
 *
 * @param {String} type - The type of metadata to upsert
 * @param {Metadata~MetadataInfo|Array.<Metadata~MetadataInfo>} metadata - Upserting metadata
 * @param {Callback.<Metadata~SaveResult|Array.<Metadata~SaveResult>>} [callback] - Callback function
 * @returns {Promise.<Metadata~SaveResult|Array.<Metadata~SaveResult>>}
 */
Metadata.prototype.upsertSync =
Metadata.prototype.upsert = function(type, metadata, callback) {
  var convert = function(md) {
    md["@xsi:type"] = type;
    return md;
  };
  var isArray = _.isArray(metadata);
  metadata = isArray ? _.map(metadata, convert) : convert(metadata);
  return this._invoke("upsertMetadata", { metadata: metadata }).then(function(results) {
    return _.isArray(results) ? _.map(results, convertToSaveResult) : convertToSaveResult(results);
  }).thenCall(callback);
};

/**
 * Asynchronously deletes specified metadata components in the organization.
 *
 * @param {String} type - The type of metadata to delete
 * @param {String|Metadata~MetadataInfo|Array.<String>|Array.<Metadata~MetadataInfo>} metadata - The fullName of metadata or metadata info to delete. If it is passed in fullName, the type parameter should not be empty.
 * @param {Callback.<Metadata~AsyncResult|Array.<Metadata~AsyncResult>>} [callback] - Callback function
 * @returns {Metadata~AsyncResultLocator}
 */
Metadata.prototype.deleteAsync = function(type, metadata, callback) {
  if (Number(this._conn.version) > 30) {
    throw new Error("Async metadata CRUD calls are not supported on ver 31.0 or later.");
  }
  var convert = function(md) {
    if (_.isString(md)) {
      md = { fullName : md };
    }
    md["@xsi:type"] = type;
    return md;
  };
  var isArray = _.isArray(metadata);
  metadata = isArray ? _.map(metadata, convert) : convert(metadata);
  var res = this._invoke("delete", { metadata: metadata });
  return new AsyncResultLocator(this, res, isArray).thenCall(callback);
};

/**
 * Synonym of Metadata#delete().
 *
 * @deprecated
 * @method Metadata#del
 * @param {String} [type] - The type of metadata to delete
 * @param {String|Metadata~MetadataInfo|Array.<String>|Array.<Metadata~MetadataInfo>} metadata - The fullName of metadata or metadata info to delete. If it is passed in fullName, the type parameter should not be empty.
 * @param {Callback.<Metadata~AsyncResult|Array.<Metadata~AsyncResult>>} [callback] - Callback function
 * @returns {Metadata~AsyncResultLocator}
 */
/**
 * Synonym of Metadata#delete().
 *
 * @method Metadata#deleteSync
 * @param {String} type - The type of metadata to delete
 * @param {String|Array.<String>} fullNames - The fullName of metadata to delete.
 * @param {Callback.<Metadata~SaveResult|Array.<Metadata~SaveResult>>} [callback] - Callback function
 * @returns {Promise.<Metadata~SaveResult|Array.<Metadata~SaveResult>>}
 */

/**
 * Synchronously deletes specified metadata components in the organization.
 *
 * @method Metadata#delete
 * @param {String} type - The type of metadata to delete
 * @param {String|Array.<String>} fullNames - The fullName of metadata to delete.
 * @param {Callback.<Metadata~SaveResult|Array.<Metadata~SaveResult>>} [callback] - Callback function
 * @returns {Promise.<Metadata~SaveResult|Array.<Metadata~SaveResult>>}
 */
Metadata.prototype.del =
Metadata.prototype.deleteSync =
Metadata.prototype["delete"] = function(type, fullNames, callback) {
  return this._invoke("deleteMetadata", { type: type, fullNames: fullNames }).then(function(results) {
    return _.isArray(results) ? _.map(results, convertToSaveResult) : convertToSaveResult(results);
  }).thenCall(callback);
};

/**
 * Rename fullname of a metadata component in the organization
 *
 * @param {String} type - The type of metadata to delete
 * @param {String} oldFullName - The original fullName of metadata
 * @param {String} newFullName - The new fullName of metadata
 * @param {Callback.<Metadata~SaveResult>} [callback] - Callback function
 * @returns {Promise.<Metadata~SaveResult>}
 */
Metadata.prototype.rename = function(type, oldFullName, newFullName, callback) {
  return this._invoke("renameMetadata", { type: type, oldFullName: oldFullName, newFullName: newFullName }).then(function(result) {
    return convertToSaveResult(result);
  }).thenCall(callback);
};

/**
 * Checks the status of asynchronous metadata calls
 *
 * @param {String|Array.<String>} ids - The asynchronous process ID(s)
 * @param {Callback.<Metadata~AsyncResult|Array.<Metadata~AsyncResult>>} [callback] - Callback function
 * @returns {Metadata~AsyncResultLocator}
 */
Metadata.prototype.checkStatus = function(ids, callback) {
  var isArray = _.isArray(ids);
  var res = this._invoke("checkStatus", { asyncProcessId: ids });
  return new AsyncResultLocator(this, res, isArray).thenCall(callback);
};

/**
 * @typedef {Object} Metadata~DescribeMetadataResult
 * @prop {Array.<Object>} metadataObjects - One or more metadata components and their attributes
 * @prop {Array.<String>} metadataObjects.childXmlNames - List of child sub-components for this component
 * @prop {String} metadataObjects.directoryName - The name of the directory in the .zip file that contains this component
 * @prop {Boolean} metadataObjects.inFolder - Indicates whether the component is in a folder or not
 * @prop {Boolean} metadataObjects.metaFile - Indicates whether the component requires an accompanying metadata file
 * @prop {String} metadataObjects.suffix - The file suffix for this component
 * @prop {String} metadataObjects.xmlName - The name of the root element in the metadata file for this component
 * @prop {String} organizationNamespace - The namespace of the organization
 * @prop {Boolean} partialSaveAllowed - Indicates whether rollbackOnError is allowed or not
 * @prop {Boolean} testRequired - Indicates whether tests are required or not
 */

/**
 * Retrieves the metadata which describes your organization, including Apex classes and triggers,
 * custom objects, custom fields on standard objects, tab sets that define an app,
 * and many other components.
 *
 * @param {String} [version] - The API version for which you want metadata; for example, 29.0
 * @param {Callback.<Metadata~DescribeMetadataResult>} [callback] - Callback function
 * @returns {Promise.<Metadata~DescribeMetadataResult>}
 */
Metadata.prototype.describe = function(version, callback) {
  if (!_.isString(version)) {
    callback = version;
    version = this._conn.version;
  }
  return this._invoke("describeMetadata", { asOfVersion: version }).then(function(res) {
    res.metadataObjects = _.isArray(res.metadataObjects) ? res.metadataObjects : [ res.metadataObjects ];
    res.metadataObjects = _.map(res.metadataObjects, function(mo) {
      if (mo.childXmlNames) {
        mo.childXmlNames = _.isArray(mo.childXmlNames) ? mo.childXmlNames: [ mo.childXmlNames ];
      }
      mo.inFolder = mo.inFolder === 'true';
      mo.metaFile = mo.metaFile === 'true';
      return mo;
    });
    res.partialSaveAllowed = res.partialSaveAllowed === 'true';
    res.testRequired = res.testRequired === 'true';
    return res;
  }).thenCall(callback);
};

/**
 * @typedef {Object} Metadata~ListMetadataQuery
 * @prop {String} type - The metadata type, such as CustomObject, CustomField, or ApexClass
 * @prop {String} [folder] - The folder associated with the component.
 */

/**
 * @typedef {Object} Metadata~FileProperties
 * @prop {String} type - The metadata type, such as CustomObject, CustomField, or ApexClass
 * @prop {String} createdById - ID of the user who created the file
 * @prop {String} createdByName - Name of the user who created the file
 * @prop {String} createdDate - Date and time when the file was created
 * @prop {String} fileName - Name of the file
 * @prop {String} fullName - The file developer name used as a unique identifier for API access
 * @prop {String} id - ID of the file
 * @prop {String} lastModifiedById - ID of the user who last modified the file
 * @prop {String} lastModifiedByName - Name of the user who last modified the file
 * @prop {String} lastModifiedDate - Date and time that the file was last modified
 * @prop {String} [manageableState] - Indicates the manageable state of the specified component if it is contained in a package
 * @prop {String} [namespacePrefix] - The namespace prefix of the component
 */

/**
 * Retrieves property information about metadata components in your organization
 *
 * @param {Metadata~ListMetadataQuery|Array.<Metadata~ListMetadataQuery>} queries - The criteria object(s) specifing metadata to list
 * @param {String} [version] - The API version for which you want metadata; for example, 29.0
 * @param {Callback.<Array.<Metadata~FileProperties>>} [callback] - Callback function
 * @returns {Promise.<Array.<Metadata~FileProperties>>}
 */
Metadata.prototype.list = function(queries, version, callback) {
  if (!_.isString(version)) {
    callback = version;
    version = this._conn.version;
  }
  if (!_.isArray(queries)) {
    queries = [ queries ];
  }
  return this._invoke("listMetadata", { queries: queries, asOfVersion: version }, callback);
};

/**
 * @typedef {Object} Metadata~RetrieveRequest
 */

/**
 * Retrieves XML file representations of components in an organization
 *
 * @param {Metadata~RetrieveRequest} request - Options for determining which packages or files are retrieved
 * @param {Callback.<Metadata~AsyncResult>} [callback] - Callback function
 * @returns {Metadata~RetrieveResultLocator}
 */
Metadata.prototype.retrieve = function(request, callback) {
  var res = this._invoke("retrieve", { request: request });
  return new RetrieveResultLocator(this, res).thenCall(callback);
};

/**
 * Checks the status of declarative metadata call retrieve() and returns the zip file contents
 *
 * @param {String} id - Async process id returned from previous retrieve request
 * @param {Callback.<Metadata~RetrieveResult>} [callback] - Callback function
 * @returns {Promise.<Metadata~RetrieveResult>}
 */
Metadata.prototype.checkRetrieveStatus = function(id, callback) {
  return this._invoke("checkRetrieveStatus", { asyncProcessId: id }, callback);
};

/**
 * Deploy components into an organization using zipped file representations
 *
 * @param {stream.Stream|Buffer} zipInput - Zipped file input source in readable stream or binary buffer
 * @param {Object} [options] - Options used in deployment
 * @param {Boolean} [options.allowMissingFiles] - Specifies whether a deploy succeeds even if files that are specified in package.xml but are not in the .zip file or not.
 * @param {Boolean} [options.autoUpdatePackage] - If a file is in the .zip file but not specified in package.xml, specifies whether the file should be automatically added to the package or not.
 * @param {Boolean} [options.checkOnly] - Indicates whether Apex classes and triggers are saved to the organization as part of the deployment (false) or not (true).
 * @param {Boolean} [options.ignoreWarnings] - Indicates whether a warning should allow a deployment to complete successfully (true) or not (false). Defaults to false.
 * @param {Boolean} [options.performRetrieve] - Indicates whether a retrieve() call is performed immediately after the deployment (true) or not (false).
 * @param {Boolean} [options.purgeOnDelete] - If true, the deleted components in the destructiveChanges.xml manifest file aren't stored in the Recycle Bin.
 * @param {Boolean} [options.rollbackOnError] - Indicates whether any failure causes a complete rollback (true) or not (false).
 * @param {Boolean} [options.runAllTests] - If true, all Apex tests defined in the organization are run.
 * @param {Array.<String>} [options.runTests] - A list of Apex tests to be run during deployment.
 * @param {Boolean} [options.singlePackage] - Indicates whether the specified .zip file points to a directory structure with a single package (true) or a set of packages (false).
 * @param {Callback.<Metadata~AsyncResult>} [callback] - Callback function
 * @returns {Metadata~DeployResultLocator}
 */
Metadata.prototype.deploy = function(zipInput, options, callback) {
  if (!options || _.isFunction(options)) {
    callback = options;
    options = {};
  }
  var deferred = Promise.defer();
  if (zipInput instanceof Stream) {
    var bufs = [];
    zipInput.on('data', function(d) {
      bufs.push(d);
    });
    zipInput.on('end', function() {
      deferred.resolve(Buffer.concat(bufs));
    });
    zipInput.resume();
  } else if (zipInput instanceof Buffer) {
    deferred.resolve(zipInput);
  } else {
    throw "Unexpected zipInput type";
  }

  var self = this;
  var res = deferred.promise.then(function(zipContentBuffer) {
    var zipContentB64 = zipContentBuffer.toString('base64');
    return self._invoke("deploy", { ZipFile: zipContentB64, DeployOptions: options }, callback);
  });
  return new DeployResultLocator(this, res).thenCall(callback);
};

/**
 * Checks the status of declarative metadata call deploy()
 *
 * @param {String} id - Async process id returned from previous deploy request
 * @param {Boolean} [includeDetails] - Sets the DeployResult object to include details information (default: false)
 * @param {Callback.<Metadata~DeployResult>} [callback] - Callback function
 * @returns {Promise.<Metadata~DeployResult>}
 */
Metadata.prototype.checkDeployStatus = function(id, includeDetails, callback) {
  if (_.isObject(includeDetails) || _.isBoolean(includeDetails)) {
    includeDetails = !!includeDetails;
  } else {
    callback = includeDetails;
    includeDetails = false;
  }
  return this._invoke("checkDeployStatus", {
    asyncProcessId: id,
    includeDetails : includeDetails
  }).then(function(res) {
    res.done = res.done === 'true';
    res.success = res.success === 'true';
    res.checkOnly = res.checkOnly === 'true';
    if (res.ignoreWarnings) {
      res.ignoreWarnings = res.ignoreWarnings === 'true';
    }
    if (res.rollbackOnError) {
      res.rollbackOnError = res.rollbackOnError === 'true';
    }
    res.numberComponentErrors = Number(res.numberComponentErrors);
    res.numberComponentsDeployed = Number(res.numberComponentsDeployed);
    res.numberComponentsTotal = Number(res.numberComponentsTotal);
    res.numberTestErrors = Number(res.numberTestErrors);
    res.numberTestsCompleted = Number(res.numberTestsCompleted);
    res.numberTestsTotal = Number(res.numberTestsTotal);

    return res;
  }).thenCall(callback);
};

/*--------------------------------------------*/

/**
 * @typedef {Object} Metadata~AsyncResult
 * @prop {Boolean} done - Indicates whether the call has completed or not
 * @prop {String} id - ID of the component being created, updated, deleted, deployed, or retrieved
 * @prop {String} state - The state four possible values: Queued, InProgress, Completed, and Error.
 * @prop {String} [statusCode] - If an error occurred during the create(), update(), or delete() call, a status code is returned
 * @prop {String} [message] - Message corresponding to the statusCode field returned
 */

/**
 * The locator class for Metadata API asynchronous call result
 *
 * @protected
 * @class Metadata~AsyncResultLocator
 * @extends events.EventEmitter
 * @implements Promise.<Metadata~AsyncResult|Array.<Metadata~AsyncResult>>
 * @param {Metadata} meta - Metadata API object
 * @param {Promise.<Metadata~AsyncResult|Array.<Metadata~AsyncResult>>} results - Promise object for async result info
 * @param {Boolean} [isArray] - Indicates whether the async request is given in array or single object
 */
var AsyncResultLocator = function(meta, results, isArray) {
  this._meta = meta;
  this._results = results;
  this._isArray = isArray;
};

util.inherits(AsyncResultLocator, events.EventEmitter);

/**
 * Promise/A+ interface
 * http://promises-aplus.github.io/promises-spec/
 *
 * Delegate to deferred promise, return promise instance for batch result
 *
 * @method Metadata~AsyncResultLocator#then
 */
AsyncResultLocator.prototype.then = function(onResolve, onReject) {
  var self = this;
  return this._results.then(function(results) {
    var convertType = function(res) {
      if (res.$ && res.$["xsi:nil"] === 'true') {
        return null;
      }
      res.done = res.done === 'true';
      return res;
    };
    results = _.isArray(results) ? _.map(results, convertType) : convertType(results);
    if (self._isArray && !_.isArray(results)) {
      results = [ results ];
    }
    return onResolve(results);
  }, onReject);
};

/**
 * Promise/A+ extension
 * Call "then" using given node-style callback function
 *
 * @method Metadata~AsyncResultLocator#thenCall
 */
AsyncResultLocator.prototype.thenCall = function(callback) {
  return _.isFunction(callback) ? this.then(function(res) {
    process.nextTick(function() {
      callback(null, res);
    });
  }, function(err) {
    process.nextTick(function() {
      callback(err);
    });
  }) : this;
};

/**
 * Check the status of async request
 *
 * @method Metadata~AsyncResultLocator#check
 * @param {Callback.<Metadata~AsyncResult|Array.<Metadata~AsyncResult>>} [callback] - Callback function
 * @returns {Promise.<Metadata~AsyncResult|Array.<Metadata~AsyncResult>>}
 */
AsyncResultLocator.prototype.check = function(callback) {
  var self = this;
  var meta = this._meta;
  return this.then(function(results) {
    var ids = _.isArray(results) ? _.map(results, function(res){ return res.id; }) : results.id;
    return meta.checkStatus(ids);
  }).thenCall(callback);
};

/**
 * Polling until async call status becomes complete or error
 *
 * @method Metadata~AsyncResultLocator#poll
 * @param {Number} interval - Polling interval in milliseconds
 * @param {Number} timeout - Polling timeout in milliseconds
 */
AsyncResultLocator.prototype.poll = function(interval, timeout) {
  var self = this;
  var startTime = new Date().getTime();
  var poll = function() {
    var now = new Date().getTime();
    if (startTime + timeout < now) {
      self.emit('error', new Error("polling time out"));
      return;
    }
    self.check().then(function(results) {
      var done = true;
      var resultArr = _.isArray(results) ? results : [ results ];
      for (var i=0, len=resultArr.length; i<len; i++) {
        var result = resultArr[i];
        if (result && !result.done) {
          done = false;
        }
      }
      if (done) {
        self.emit('complete', results);
      } else {
        setTimeout(poll, interval);
      }
    }, function(err) {
      self.emit('error', err);
    });
  };
  setTimeout(poll, interval);
};

/**
 * Check and wait until the async requests become in completed status
 *
 * @method Metadata~AsyncResultLocator#complete
 * @param {Callback.<Metadata~AsyncResult|Array.<Metadata~AsyncResult>>} [callback] - Callback function
 * @returns {Promise.<Metadata~AsyncResult|Array.<Metadata~AsyncResult>>}
 */
AsyncResultLocator.prototype.complete = function(callback) {
  var deferred = Promise.defer();
  this.on('complete', function(results) {
    deferred.resolve(results);
  });
  this.on('error', function(err) {
    deferred.reject(err);
  });
  var meta = this._meta;
  this.poll(meta.pollInterval, meta.pollTimeout);
  return deferred.promise.thenCall(callback);
};

/*--------------------------------------------*/
/**
 * The locator class to track retreive() Metadata API call result
 *
 * @protected
 * @class Metadata~RetrieveResultLocator
 * @extends Metadata~AsyncResultLocator
 * @param {Metadata} meta - Metadata API object
 * @param {Promise.<Metadata~AsyncResult>} result - Promise object for async result of retrieve call()
 */
var RetrieveResultLocator = function(meta, result) {
  RetrieveResultLocator.super_.call(this, meta, result);
};

util.inherits(RetrieveResultLocator, AsyncResultLocator);

/**
 * @typedef {Object} Metadata~RetrieveResult
 * @prop {Array.<Metadata~FileProperties>} fileProperties - Contains information about the properties of each component in the .zip file, and the manifest file package.xml
 * @prop {String} id - ID of the component being retrieved
 * @prop {Array.<Object>} messages - Contains information about the success or failure of the retrieve() call
 * @prop {String} zipFile - The zip file returned by the retrieve request. Base 64-encoded binary data
 */

/**
 * Check and wait until the async request becomes in completed status,
 * and retrieve the result data.
 *
 * @memthod Metadata~RetrieveResultLocator#complete
 * @param {Callback.<Metadata~RetrieveResult>} [callback] - Callback function
 * @returns {Promise.<Metadata~RetrieveResult>}
 */
RetrieveResultLocator.prototype.complete = function(callback) {
  var meta = this._meta;
  return RetrieveResultLocator.super_.prototype.complete.call(this).then(function(result) {
    return meta.checkRetrieveStatus(result.id);
  }).thenCall(callback);
};

/**
 * Change the retrieved result to Node.js readable stream
 *
 * @method Metadata~RetrieveResultLocator#stream
 * @returns {stream.Stream}
 */
RetrieveResultLocator.prototype.stream = function() {
  var rstream = new Stream();
  rstream.readable = true;
  this.complete(function(err, result) {
    if (err) {
      rstream.emit('error', err);
    } else {
      rstream.emit('data', new Buffer(result.zipFile, 'base64'));
      rstream.emit('end');
    }
  });
  return rstream;
};

/*--------------------------------------------*/
/**
 * The locator class to track deploy() Metadata API call result
 *
 * @protected
 * @class Metadata~DeployResultLocator
 * @extends Metadata~AsyncResultLocator
 * @param {Metadata} meta - Metadata API object
 * @param {Promise.<Metadata~AsyncResult>} result - Promise object for async result of deploy() call
 */
var DeployResultLocator = function(meta, result) {
  DeployResultLocator.super_.call(this, meta, result);
};

util.inherits(DeployResultLocator, AsyncResultLocator);

/**
 * @typedef {Object} Metadata~DeployResult
 * @prop {String} id - ID of the component being deployed
 * @prop {Boolean} checkOnly - Indicates whether this deployment is being used to check the validity of the deployed files without making any changes in the organization or not
 * @prop {String} completedDate - Timestamp for when the deployment process ended
 * @prop {String} createdDate - Timestamp for when the deploy() call was received
 * @prop {Array.<Object>} [details] - Provides the details of a deployment that is in-progress or ended, if includeDetails is set to true in checkDeployStatus() call
 * @prop {Boolean} done - Indicates whether the server finished processing the deploy() call for the specified id
 * @prop {String} [errorMessage] - Message corresponding to the values in the errorStatusCode field
 * @prop {String} [errorStatusCode] - If an error occurred during the deploy() call, a status code is returned, and the message corresponding to the status code is returned in the errorMessagefield
 * @prop {Boolean} [ignoreWarnings] - Specifies whether a deployment should continue even if the deployment generates warnings
 * @prop {String} lastModifiedDate - Timestamp of the last update for the deployment process
 * @prop {Number} numberComponentErrors - The number of components that generated errors during this deployment
 * @prop {Number} numberComponentsDeployed - The number of components deployed in the deployment process
 * @prop {Number} numberComponentsTotal - The total number of components in the deployment
 * @prop {Number} numberTestErrors - The number of Apex tests that have generated errors during this deployment
 * @prop {Number} numberTestsCompleted - The number of completedApex tests for this deployment
 * @prop {Number} numberTestsTotal - The total number of Apex tests for this deployment
 * @prop {Boolean} [rollbackOnError] - Indicates whether any failure causes a complete rollback or not. Default is true.
 * @prop {String} startDate - Timestamp for when the deployment process began
 * @prop {String} status - Indicates the current state of the deployment
 * @prop {Boolean} success - Indicates whether the deployment was successful or not
 */

/**
 * Check and wait until the async request becomes in completed status,
 * and retrieve the result data.
 *
 * @method Metadata~DeployResultLocator#complete
 * @param {Callback.<Metadata~DeployResult>} [callback] - Callback function
 * @returns {Promise.<Metadata~DeployResult>}
 */
DeployResultLocator.prototype.complete = function(includeDetails, callback) {
  if (_.isFunction(includeDetails)) {
    callback = includeDetails;
    includeDetails = false;
  }
  var meta = this._meta;
  return DeployResultLocator.super_.prototype.complete.call(this).then(function(result) {
    return meta.checkDeployStatus(result.id, includeDetails);
  }).thenCall(callback);
};

}).call(this,require('_process'),require("buffer").Buffer)
},{"../promise":21,"../soap":25,"_process":39,"buffer":33,"events":37,"stream":43,"underscore":63,"util":46}],6:[function(require,module,exports){
/**
 * @file Manages Streaming APIs
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

var events = require('events'),
    util   = require('util'),
    Faye   = require('faye');

/**
 * Streaming API topic class
 *
 * @class Streaming~Topic
 * @param {Streaming} steaming - Streaming API object
 * @param {String} name - Topic name
 */
var Topic = module.exports = function(streaming, name) {
  this._streaming = streaming;
  this.name = name;
};

/**
 * @typedef {Object} Streaming~StreamingMessage
 * @prop {Object} event
 * @prop {Object} event.type - Event type
 * @prop {Record} sobject - Record information
 */
/**
 * Subscribe listener to topic
 *
 * @method Streaming~Topic#subscribe
 * @param {Callback.<Streaming~StreamingMesasge>} listener - Streaming message listener
 * @returns {Streaming~Topic}
 */
Topic.prototype.subscribe = function(listener) {
  this._streaming.subscribe(this.name, listener);
  return this;
};

/**
 * Unsubscribe listener from topic
 *
 * @method Streaming~Topic#unsubscribe
 * @param {Callback.<Streaming~StreamingMesasge>} listener - Streaming message listener
 * @returns {Streaming~Topic}
 */
Topic.prototype.unsubscribe = function(listener) {
  this._streaming.unsubscribe(this.name, listener);
  return this;
};

/*--------------------------------------------*/

/**
 * Streaming API class
 *
 * @class
 * @extends events.EventEmitter
 * @param {Connection} conn - Connection object
 */
var Streaming = function(conn) {
  this._conn = conn;
};

util.inherits(Streaming, events.EventEmitter);

/** @private **/
Streaming.prototype._createClient = function() {
  var endpointUrl = [ this._conn.instanceUrl, "cometd", this._conn.version ].join('/');
  var fayeClient = new Faye.Client(endpointUrl, {});
  fayeClient.setHeader('Authorization', 'OAuth '+this._conn.accessToken);
  return fayeClient;
};

/**
 * Get named topic
 *
 * @param {String} name - Topic name
 * @returns {Streaming~Topic}
 */
Streaming.prototype.topic = function(name) {
  this._topics = this._topics || {};
  var topic = this._topics[name] = 
    this._topics[name] || new Topic(this, name);
  return topic;
};

/**
 * Subscribe topic
 *
 * @param {String} name - Topic name
 * @param {Callback.<Streaming~StreamingMessage>} listener - Streaming message listener
 * @returns {Streaming}
 */
Streaming.prototype.subscribe = function(name, listener) {
  if (!this._fayeClient) {
    if (Faye.Transport.NodeHttp) {
      Faye.Transport.NodeHttp.prototype.batching = false; // prevent streaming API server error
    }
    this._fayeClient = this._createClient();
  }
  this._fayeClient.subscribe("/topic/"+name, listener);
  return this;
};

/**
 * Unsubscribe topic
 *
 * @param {String} name - Topic name
 * @param {Callback.<Streaming~StreamingMessage>} listener - Streaming message listener
 * @returns {Streaming}
 */
Streaming.prototype.unsubscribe = function(name, listener) {
  if (this._fayeClient) {
    this._fayeClient.unsubscribe("/topic/"+name, listener);
  }
  return this;
};

module.exports = Streaming;

},{"events":37,"faye":47,"util":46}],7:[function(require,module,exports){
/**
 * @file Manages Tooling APIs
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

var util  = require('util'),
    _     = require('underscore')._,
    Cache = require('../cache');

/**
 * API class for Tooling API call
 *
 * @class
 * @param {Connection} conn - Connection
 */
var Tooling = function(conn) {
  this._conn = conn;
  this._logger = conn._logger;
  var delegates = [
    "query",
    "queryMore",
    "create",
    "insert",
    "retrieve",
    "update",
    "upsert",
    "del",
    "delete",
    "destroy",
    "describe",
    "describeGlobal",
    "sobject"
  ];
  delegates.forEach(function(method) {
    this[method] = conn.constructor.prototype[method];
  }, this);

  this.cache = new Cache();

  var cacheOptions = {
    key: function(type) { return type ? "describe." + type : "describe"; }
  };
  this.describe$ = this.cache.makeCacheable(this.describe, this, cacheOptions);
  this.describe = this.cache.makeResponseCacheable(this.describe, this, cacheOptions);
  this.describeSObject$ = this.describe$;
  this.describeSObject = this.describe;

  cacheOptions = { key: 'describeGlobal' };
  this.describeGlobal$ = this.cache.makeCacheable(this.describeGlobal, this, cacheOptions);
  this.describeGlobal = this.cache.makeResponseCacheable(this.describeGlobal, this, cacheOptions);

  this.initialize();
};

/**
 * Initialize tooling API
 * @protected
 */
Tooling.prototype.initialize = function() {
  this.sobjects = {};
  this.cache.clear();
  this.cache.get('describeGlobal').on('value', _.bind(function(res) {
    if (res.result) {
      var types = _.map(res.result.sobjects, function(so) { return so.name; });
      _.each(types, this.sobject, this);
    }
  }, this));
};

/**
 * @private
 */
Tooling.prototype._baseUrl = function() {
  return this._conn.urls.rest.base + "/tooling";
};

/**
 * @private
 */
Tooling.prototype._request = function() {
  return this._conn._request.apply(this._conn, arguments);
};

/**
 * Execute query by using SOQL
 * 
 * @param {String} soql - SOQL string
 * @param {Callback.<QueryResult>} [callback] - Callback function
 * @returns {Query.<QueryResult>}
 */
/**
 * Query next record set by using query locator
 *
 * @method Tooling#query
 * @param {String} locator - Next record set locator
 * @param {Callback.<QueryResult>} [callback] - Callback function
 * @returns {Query.<QueryResult>}
 */
/**
 * Retrieve specified records
 *
 * @method Tooling#queryMore
 * @param {String} type - SObject Type
 * @param {String|Array.<String>} ids - A record ID or array of record IDs 
 * @param {Callback.<Record|Array.<Record>>} [callback] - Callback function
 * @returns {Promise.<Record|Array.<Record>>}
 */

/**
 * Synonym of Tooling#create()
 *
 * @method Tooling#insert
 * @param {String} type - SObject Type
 * @param {Object|Array.<Object>} records - A record or array of records to create
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
/**
 * Create records
 *
 * @method Tooling#create
 * @param {String} type - SObject Type
 * @param {Record|Array.<Record>} records - A record or array of records to create
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */

/**
 * Update records
 *
 * @method Tooling#update
 * @param {String} type - SObject Type
 * @param {Record|Array.<Record>} records - A record or array of records to update
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */

/**
 * Upsert records
 *
 * @method Tooling#upsert
 * @param {String} type - SObject Type
 * @param {Record|Array.<Record>} records - Record or array of records to upsert
 * @param {String} extIdField - External ID field name
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */

/**
 * Synonym of Tooling#destroy()
 *
 * @method Tooling#delete
 * @param {String} type - SObject Type
 * @param {String|Array.<String>} ids - A ID or array of IDs to delete
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
/**
 * Synonym of Tooling#destroy()
 *
 * @method Tooling#del
 * @param {String} type - SObject Type
 * @param {String|Array.<String>} ids - A ID or array of IDs to delete
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
/**
 * Delete records
 *
 * @method Tooling#destroy
 * @param {String} type - SObject Type
 * @param {String|Array.<String>} ids - A ID or array of IDs to delete
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */

/**
 * Synonym of Tooling#describe()
 *
 * @method Tooling#describeSObject
 * @param {String} type - SObject Type
 * @param {Callback.<DescribeSObjectResult>} [callback] - Callback function
 * @returns {Promise.<DescribeSObjectResult>}
 */
/**
 * Describe SObject metadata
 *
 * @method Tooling#describe
 * @param {String} type - SObject Type
 * @param {Callback.<DescribeSObjectResult>} [callback] - Callback function
 * @returns {Promise.<DescribeSObjectResult>}
 */

/**
 * Describe global SObjects
 *
 * @method Tooling#describeGlobal
 * @param {Callback.<DescribeGlobalResult>} [callback] - Callback function
 * @returns {Promise.<DescribeGlobalResult>}
 */

/**
 * Get SObject instance
 *
 * @method Tooling#sobject
 * @param {String} type - SObject Type
 * @returns {SObject}
 */

/**
 * @typedef {Object} Tooling~ExecuteAnonymousResult
 * @prop {Boolean} compiled - Flag if the query is compiled successfully
 * @prop {String} compileProblem - Error reason in compilation
 * @prop {Boolean} success - Flag if the code is executed successfully
 * @prop {Number} line - Line number for the error
 * @prop {Number} column - Column number for the error
 * @prop {String} exceptionMessage - Exception message
 * @prop {String} exceptionStackTrace - Exception stack trace
 */
/**
 * Executes Apex code anonymously
 *
 * @param {String} body - Anonymous Apex code
 * @param {Callback.<Tooling~ExecuteAnonymousResult>} [callback] - Callback function
 * @returns {Promise.<Tooling~ExecuteAnonymousResult>}
 */
Tooling.prototype.executeAnonymous = function(body, callback) {
  var url = this._baseUrl() + "/executeAnonymous?anonymousBody=" + encodeURIComponent(body);
  return this._request(url).thenCall(callback);
};

/**
 * @typedef {Object} Tooling~CompletionsResult
 * @prop {Object} publicDeclarations
 */
/**
 * Retrieves available code completions of the referenced type
 *
 * @param {String} [type] - completion type (default 'apex')
 * @param {Callback.<Tooling~CompletionsResult>} [callback] - Callback function
 * @returns {Promise.<Tooling~CompletionsResult>}
 */
Tooling.prototype.completions = function(type, callback) {
  if (!_.isString(type)) {
    callback = type;
    type = 'apex';
  }
  var url = this._baseUrl() + "/completions?type=" + encodeURIComponent(type);
  return this._request(url).thenCall(callback);
};


module.exports = Tooling;

},{"../cache":13,"underscore":63,"util":46}],8:[function(require,module,exports){
/*global Sfdc */
var stream = require('stream'),
    _ = require('underscore');

function parseHeaders(hs) {
  var headers = {};
  hs.split(/\n/).forEach(function(line) {
    var pair = line.split(/\s*:\s*/);
    var name = pair[0].toLowerCase();
    var value = pair[1];
    headers[name] = value;
  });
  return headers;
}

module.exports = {
  
  supported: typeof Sfdc === 'object' && typeof Sfdc.canvas !== 'undefined',

  createRequest: function(signedRequest) {
    return function(params, callback) {
      var response;
      var str = new stream.Duplex();
      str._read = function(size) {
        if (response) {
          str.push(response.body);
        }
      };
      var bufs = [];
      var sent = false;
      str._write = function(chunk, encoding, callback) {
        bufs.push(chunk.toString(encoding));
        callback();
      };
      str.on('finish', function() {
        if (!sent) {
          send(bufs.join(''));
          sent = true;
        }
      });
      if (params.body || params.body === "" || !/^(put|post|patch)$/i.test(params.method)) {
        send(params.body);
        sent = true;
      }

      function send(body) {
        var settings = {
          client: signedRequest.client,
          method: params.method,
          data: body
        };
        if (params.headers) {
          settings.headers = {};
          for (var name in params.headers) {
            if (name.toLowerCase() === 'content-type') {
              settings.contentType = params.headers[name];
            } else {
              settings.headers[name] = params.headers[name];
            }
          }
        }
        settings.success = function(data) {
          var headers = parseHeaders(data.responseHeaders);
          var body = data.payload;
          if (!_.isString(body)) {
            body = JSON.stringify(body);
          }
          response = {
            statusCode : data.status,
            headers: headers,
            body: body
          };
          if (callback) {
            callback(null, response, response.body);
          }
          str.end();
        };
        settings.failure = function(err) {
          if (callback) {
            callback(err);
          }
        };
        Sfdc.canvas.client.ajax(params.url, settings);
      }
      return str;
    };
  }
};


},{"stream":43,"underscore":63}],9:[function(require,module,exports){
/**
 * @file Browser client connection management class
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var events = require('events'),
    util = require('util'),
    qs = require('querystring'),
    _ = require('underscore'),
    Connection = require('../connection'),
    OAuth2 = require('../oauth2');

/**
 * @private
 */
function popupWin(url, w, h) {
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  return window.open(url, null, 'location=yes,toolbar=no,status=no,menubar=no,width='+w+',height='+h+',top='+top+',left='+left);
}

function handleCallbackResponse() {
  var res = checkCallbackResponse();
  var state = localStorage.getItem('jsforce_state');
  if (res && state && res.body.state === state) {
    localStorage.removeItem('jsforce_state');
    var states = state.split('.');
    var prefix = states[0], promptType = states[1];
    var cli = new Client(prefix);
    if (res.success) {
      cli._storeTokens(res.body);
      location.hash = '';
    } else {
      cli._storeError(res.body);
    }
    if (promptType === 'popup') { window.close(); }
    return true;
  }
}

/**
 * @private
 */
function checkCallbackResponse() {
  var params;
  if (window.location.hash) {
    params = qs.parse(window.location.hash.substring(1));
    if (params.access_token) {
      return { success: true, body: params };
    }
  } else if (window.location.search) {
    params = qs.parse(window.location.search.substring(1));
    if (params.error) {
      return { success: false, body: params };
    }
  }
}

/** @private **/
var clientIdx = 0;


/**
 * @class
 * @todo add document
 */
var Client = function(prefix) {
  this._prefix = prefix || 'jsforce' + clientIdx++;
  this.connection = null;
};

util.inherits(Client, events.EventEmitter);

/**
 *
 */
Client.prototype.init = function(config) {
  if (handleCallbackResponse()) { return; }
  this.config = config;
  this.connection = new Connection(config);
  var tokens = this._getTokens();
  if (tokens) {
    this.connection.initialize(tokens);
    var self = this;
    setTimeout(function() {
      self.emit('connect', self.connection);
    }, 10);
  }
};

/** 
 *
 */
Client.prototype.login = function(options, callback) {
  if (_.isFunction(options)) {
    callback = options;
    options = {};
  }
  options = options || {}; 
  callback = callback || function(){ };
  _.extend(options, this.config);
  var self = this;
  this._prompt(options, callback);
};


Client.prototype._prompt = function(options, callback) {
  var self = this;
  var oauth2 = new OAuth2(options);
  var rand = Math.random().toString(36).substring(2);
  var state = [ this._prefix, "popup", rand ].join('.');
  localStorage.setItem("jsforce_state", state);
  var authzUrl = oauth2.getAuthorizationUrl({
    response_type: 'token',
    scope : options.scope,
    state: state
  });
  var size = options.size || {};
  var pw = popupWin(authzUrl, size.width || 912, size.height || 513);
  if (!pw) {
    state = [ this._prefix, "redirect", rand ].join('.');
    localStorage.setItem("jsforce_state", state);
    authzUrl = oauth2.getAuthorizationUrl({
      response_type: 'token',
      scope : options.scope,
      state: state
    });
    location.href = authzUrl;
    return;
  }
  self._removeTokens();
  var pid = setInterval(function() {
    try {
      if (!pw || pw.closed) {
        clearInterval(pid);
        var tokens = self._getTokens();
        if (tokens) {
          self.connection.initialize(tokens);
          self.emit('connect', self.connection);
          callback(null, { status: 'connect' });
        } else {
          var err = self._getError();
          if (err) {
            callback(new Error(err.error + ": " + err.error_description));
          } else {
            callback(null, { status: 'cancel' });
          }
        }
      }
    } catch(e) {}
  }, 1000);
};

/**
 *
 */
Client.prototype.isLoggedIn = function() {
  return !!(this.connection && this.connection.accessToken);
};

/**
 * 
 */
Client.prototype.logout = function() {
  this.connection.logout();
  this._removeTokens();
  this.emit('disconnect');
};

/**
 * @private
 */
Client.prototype._getTokens = function() {
  var regexp = new RegExp("(^|;\\s*)"+this._prefix+"_loggedin=true(;|$)");
  if (document.cookie.match(regexp)) {
    var issuedAt = Number(localStorage.getItem(this._prefix+'_issued_at'));
    if (Date.now() < issuedAt + 2 * 60 * 60 * 1000) { // 2 hours
      var userInfo;
      var idUrl = localStorage.getItem(this._prefix + '_id');
      if (idUrl) {
        var ids = idUrl.split('/');
        userInfo = { id: ids.pop(), organizationId: ids.pop(), url: idUrl };
      }
      return {
        accessToken: localStorage.getItem(this._prefix + '_access_token'),
        instanceUrl: localStorage.getItem(this._prefix + '_instance_url'),
        userInfo: userInfo
      };
    }
  }
  return null;
};

/**
 * @private
 */
Client.prototype._storeTokens = function(params) {
  localStorage.setItem(this._prefix + '_access_token', params.access_token);
  localStorage.setItem(this._prefix + '_instance_url', params.instance_url);
  localStorage.setItem(this._prefix + '_issued_at', params.issued_at);
  localStorage.setItem(this._prefix + '_id', params.id);
  document.cookie = this._prefix + '_loggedin=true;';
};

/**
 * @private
 */
Client.prototype._removeTokens = function() {
  localStorage.removeItem(this._prefix + '_access_token');
  localStorage.removeItem(this._prefix + '_instance_url');
  localStorage.removeItem(this._prefix + '_issued_at');
  localStorage.removeItem(this._prefix + '_id');
  document.cookie = this._prefix + '_loggedin=';
};

/**
 * @private
 */
Client.prototype._getError = function() {
  try {
    var err = JSON.parse(localStorage.getItem(this._prefix + '_error'));
    localStorage.removeItem(this._prefix + '_error');
    return err;
  } catch(e) {}
};

/**
 * @private
 */
Client.prototype._storeError = function(err) {
  localStorage.setItem(this._prefix + '_error', JSON.stringify(err));
};

/**
 *
 */
module.exports = new Client();

module.exports.Client = Client;

},{"../connection":14,"../oauth2":20,"events":37,"querystring":42,"underscore":63,"util":46}],10:[function(require,module,exports){
var jsforce = require('../jsforce');
var crequire;

// core-require code will be automatically generated in grunt process before making browser build
try {
  crequire = require('../core-require'); 
} catch(e) {}

jsforce.browser = require('./client');
jsforce.modules = jsforce.modules || {};
jsforce.require = function(name) {
  try {
    return crequire(name);
  } catch(e) {
    if (name === "jsforce" || name === "./jsforce") { return jsforce; }
    if (name.substring(0, 2) === "./") {
      var paths = name.substring(2).split("/");
      var p = paths.pop();
      paths.push(p.replace(/(^|\-)([a-zA-Z])/g, function(_0, _1, _2) {
        return _2.toUpperCase();
      }));
      var o = jsforce.modules;
      while (o && paths.length > 0) {
        o = o[paths.shift()];
      }
      return o;
    }
  }
};

module.exports = jsforce;
},{"../core-require":15,"../jsforce":18,"./client":9}],11:[function(require,module,exports){
/*global window, document */
var _index = 0;

module.exports = {

  supported: typeof window !== 'undefined',

  createRequest: function(jsonpParam, timeout) {
    jsonpParam = jsonpParam || 'callback';
    timeout = timeout || 10000;

    return function(params, callback) {
      if (params.method.toUpperCase() !== 'GET') {
        return callback(new Error('JSONP only supports GET request.'));
      }
      var cbFuncName = '_jsforce_jsonpCallback_' + (++_index);
      var callbacks = window;
      var url = params.url;
      url += url.indexOf('?')>0 ? '&' : '?';
      url += jsonpParam + '=' + cbFuncName;

      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      document.documentElement.appendChild(script);

      var pid = setTimeout(function() {
        cleanup();
        callback(new Error("JSONP call time out."));
      }, timeout);

      callbacks[cbFuncName] = function(res) {
        cleanup();
        callback(null, {
          statusCode: 200,
          headers: { "content-type": "application/json" },
          body: JSON.stringify(res)
        });
      };

      var cleanup = function() {
        clearTimeout(pid);
        document.documentElement.removeChild(script);
        delete callbacks[cbFuncName];
      };
    };

  }

};
},{}],12:[function(require,module,exports){
var stream = require('stream');

module.exports = function(params, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(params.method, params.url);
  if (params.headers) {
    for (var header in params.headers) {
      xhr.setRequestHeader(header, params.headers[header]);
    }
  }
  xhr.setRequestHeader("Accept", "*/*");
  var response;
  var str = new stream.Duplex();
  str._read = function(size) {
    if (response) {
      str.push(response.body);
    }
  };
  var bufs = [];
  var sent = false;
  str._write = function(chunk, encoding, callback) {
    bufs.push(chunk.toString(encoding === "buffer" ? "binary" : encoding));
    callback();
  };
  str.on('finish', function() {
    if (!sent) {
      xhr.send(bufs.join(''));
      sent = true;
    }
  });
  if (params.body || params.body === "" || !/^(put|post|patch)$/i.test(params.method)) {
    xhr.send(params.body);
    sent = true;
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var headers = {
        "content-type": xhr.getResponseHeader("content-type")
      };
      response = {
        statusCode: xhr.status,
        headers: headers,
        body: xhr.response
      };
      if (!response.statusCode) {
        response.statusCode = 400;
        response.body = "Access Declined";
      }
      if (callback) {
        callback(null, response, response.body);
      }
      str.end();
    }
  };
  return str;
};


},{"stream":43}],13:[function(require,module,exports){
/**
 * @file Manages asynchronous method response cache
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var events = require('events'),
    util   = require('util'),
    _      = require('underscore')._;

/**
 * Class for managing cache entry
 *
 * @private
 * @class
 * @constructor
 * @template T
 */
var CacheEntry = function() {
  this.fetching = false;
};

util.inherits(CacheEntry, events.EventEmitter);

/**
 * Get value in the cache entry
 *
 * @param {Callback.<T>} [callback] - Callback function callbacked the cache entry updated
 * @returns {T|undefined}
 */
CacheEntry.prototype.get = function(callback) {
  if (!callback) {
    return this._value;
  } else {
    this.once('value', callback);
    if (!_.isUndefined(this._value)) {
      this.emit('value', this._value);
    }
  }
};

/**
 * Set value in the cache entry
 *
 * @param {T} [value] - A value for caching
 */
CacheEntry.prototype.set = function(value) {
  this._value = value;
  this.emit('value', this._value);
};

/**
 * Clear cached value
 */
CacheEntry.prototype.clear = function() {
  this.fetching = false;
  delete this._value;
};


/**
 * Caching manager for async methods
 *
 * @class
 * @constructor
 */
var Cache = function() {
  this._entries = {};
};

/**
 * retrive cache entry, or create if not exists.
 *
 * @param {String} [key] - Key of cache entry
 * @returns {CacheEntry}
 */
Cache.prototype.get = function(key) {
  if (key && this._entries[key]) {
    return this._entries[key];
  } else {
    var entry = new CacheEntry();
    this._entries[key] = entry;
    return entry;
  }
};

/**
 * clear cache entries prefix matching given key
 * @param {String} [key] - Key prefix of cache entry to clear
 */
Cache.prototype.clear = function(key) {
  for (var k in this._entries) {
    if (!key || k.indexOf(key) === 0) {
      this._entries[k].clear();
    }
  }
};

/**
 * create and return cache key from namespace and serialized arguments.
 * @private
 */
function createCacheKey(namespace, args) {
  args = Array.prototype.slice.apply(args);
  return namespace + '(' + _.map(args, function(a){ return JSON.stringify(a); }).join(',') + ')';
}

/**
 * Enable caching for async call fn to intercept the response and store it to cache.
 * The original async calll fn is always invoked.
 *
 * @protected
 * @param {Function} fn - Function to covert cacheable
 * @param {Object} [scope] - Scope of function call
 * @param {Object} [options] - Options
 * @return {Function} - Cached version of function
 */
Cache.prototype.makeResponseCacheable = function(fn, scope, options) {
  var cache = this;
  options = options || {};
  return function() {
    var args = Array.prototype.slice.apply(arguments);
    var callback = args.pop();
    if (!_.isFunction(callback)) {
      args.push(callback);
      callback = null;
    }
    var key = _.isString(options.key) ? options.key :
              _.isFunction(options.key) ? options.key.apply(scope, args) :
              createCacheKey(options.namespace, args);
    var entry = cache.get(key);
    entry.fetching = true;
    if (callback) {
      args.push(function(err, result) {
        entry.set({ error: err, result: result });
        callback(err, result);
      });
    }
    var ret, error;
    try {
      ret = fn.apply(scope || this, args);
    } catch(e) {
      error = e;
    }
    if (ret && _.isFunction(ret.then)) { // if the returned value is promise
      if (!callback) {
        return ret.then(function(result) {
          entry.set({ error: undefined, result: result });
          return result;
        }, function(err) {
          entry.set({ error: err, result: undefined });
          throw err;
        });
      } else {
        return ret;
      }
    } else {
      entry.set({ error: error, result: ret });
      if (error) { throw error; }
      return ret;
    }
  };
};

/**
 * Enable caching for async call fn to lookup the response cache first, then invoke original if no cached value.
 *
 * @protected
 * @param {Function} fn - Function to covert cacheable
 * @param {Object} [scope] - Scope of function call
 * @param {Object} [options] - Options
 * @return {Function} - Cached version of function
 */
Cache.prototype.makeCacheable = function(fn, scope, options) {
  var cache = this;
  options = options || {};
  var $fn = function() {
    var args = Array.prototype.slice.apply(arguments);
    var callback = args.pop();
    if (!_.isFunction(callback)) {
      args.push(callback);
    }
    var key = _.isString(options.key) ? options.key :
              _.isFunction(options.key) ? options.key.apply(scope, args) :
              createCacheKey(options.namespace, args);
    var entry = cache.get(key);
    if (!_.isFunction(callback)) { // if callback is not given in last arg, return cached result (immediate).
      var value = entry.get();
      if (!value) { throw new Error('Function call result is not cached yet.'); }
      if (value.error) { throw value.error; }
      return value.result;
    }
    entry.get(function(value) {
      callback(value.error, value.result);
    });
    if (!entry.fetching) { // only when no other client is calling function
      entry.fetching = true;
      args.push(function(err, result) {
        entry.set({ error: err, result: result });
      });
      fn.apply(scope || this, args);
    }
  };
  $fn.clear = function() {
    var key = _.isString(options.key) ? options.key :
              _.isFunction(options.key) ? options.key.apply(scope, arguments) :
              createCacheKey(options.namespace, arguments);
    cache.clear(key);
  };
  return $fn;
};


module.exports = Cache;

},{"events":37,"underscore":63,"util":46}],14:[function(require,module,exports){
(function (Buffer){
/*global Buffer */
/**
 * @file Connection class to keep the API session information and manage requests
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var events  = require('events'),
    util    = require('util'),
    async   = require('async'),
    _       = require('underscore')._,
    Promise = require('./promise'),
    Logger  = require('./logger'),
    OAuth2  = require('./oauth2'),
    Query   = require('./query'),
    SObject = require('./sobject'),
    Transport = require('./transport'),
    Cache   = require('./cache');

var defaults = {
  loginUrl: "https://login.salesforce.com",
  instanceUrl: "",
  version: "31.0"
};

/**
 * Connection class to keep the API session information and manage requests
 *
 * @constructor
 * @extends events.EventEmitter
 * @param {Object} [options] - Connection options
 * @param {OAuth2|Object} [options.oauth2] - OAuth2 instance or options to be passed to OAuth2 constructor
 * @param {String} [options.logLevel] - Output logging level (DEBUG|INFO|WARN|ERROR|FATAL)
 * @param {String} [options.version] - Salesforce API Version (without "v" prefix)
 * @param {Number} [options.maxRequest] - Max number of requests allowed in parallel call
 * @param {String} [options.loginUrl] - Salesforce Login Server URL (e.g. https://login.salesforce.com/)
 * @param {String} [options.instanceUrl] - Salesforce Instance URL (e.g. https://na1.salesforce.com/)
 * @param {String} [options.serverUrl] - Salesforce SOAP service endpoint URL (e.g. https://na1.salesforce.com/services/Soap/u/28.0)
 * @param {String} [options.accessToken] - Salesforce OAuth2 access token
 * @param {String} [options.sessionId] - Salesforce session ID
 * @param {String} [options.refreshToken] - Salesforce OAuth2 refresh token
 * @param {String|Object} [options.signedRequest] - Salesforce Canvas signed request (Raw Base64 string, JSON string, or deserialized JSON)
 * @param {String} [options.proxyUrl] - Cross-domain proxy server URL, used in browser client, non Visualforce app.
 */
var Connection = module.exports = function(options) {
  var Bulk    = require('./api/bulk'),
      Streaming = require('./api/streaming'),
      Tooling = require('./api/tooling'),
      Analytics = require('./api/analytics'),
      Chatter = require('./api/chatter'),
      Apex    = require('./api/apex'),
      Metadata = require('./api/metadata');

  options = options || {};

  this._logger = new Logger(options.logLevel);

  var oauth2 = options.oauth2 || {
    loginUrl : options.loginUrl,
    clientId : options.clientId,
    clientSecret : options.clientSecret,
    redirectUri : options.redirectUri
  };

  /**
   * OAuth2 object
   * @member {OAuth2} Connection#oauth2
   */
  this.oauth2 = oauth2 instanceof OAuth2 ? oauth2 : new OAuth2(oauth2);

  this.loginUrl = options.loginUrl || oauth2.loginUrl || defaults.loginUrl;
  this.version = options.version || defaults.version;
  this.maxRequest = options.maxRequest || this.maxRequest || 10;

  /** @private */
  this._transport =
    options.proxyUrl ? new Transport.ProxyTransport(options.proxyUrl) : new Transport();

  /**
   * Streaming API object
   * @member {Streaming} Connection#streaming
   */
  if (Streaming) {
    this.streaming = new Streaming(this);
  }
  /**
   * Bulk API object
   * @member {Bulk} Connection#bulk
   */
  if (Bulk) {
    this.bulk = new Bulk(this);
  }
  /**
   * Tooling API object
   * @member {Tooling} Connection#tooling
   */
  if (Tooling) {
    this.tooling = new Tooling(this);
  }
  /**
   * Analytics API object
   * @member {Analytics} Connection#analytics
   */
  if (Analytics) {
    this.analytics = new Analytics(this);
  }
  /**
   * Chatter API object
   * @member {Chatter} Connection#chatter
   */
  if (Chatter) {
    this.chatter = new Chatter(this);
  }
  /**
   * Metadata API object
   * @member {Metadata} Connection#metadata 
   */
  if (Metadata) {
    this.metadata = new Metadata(this);
  }
  /**
   * Apex REST API object
   * @member {Apex} Connection#apex
   */
  if (Apex) {
    this.apex = new Apex(this);
  }
  /**
   * Cache object for result
   * @member {Cache} Connection#cache
   */
  this.cache = new Cache();

  // Allow to delegate connection refresh to outer function
  if (options.refreshFn) {
    this._refreshDelegate = {
      refreshToken: options.refreshFn
    };
  }

  var cacheOptions = {
    key: function(type) { return type ? "describe." + type : "describe"; }
  };
  this.describe$ = this.cache.makeCacheable(this.describe, this, cacheOptions);
  this.describe = this.cache.makeResponseCacheable(this.describe, this, cacheOptions);
  this.describeSObject$ = this.describe$;
  this.describeSObject = this.describe;

  cacheOptions = { key: 'describeGlobal' };
  this.describeGlobal$ = this.cache.makeCacheable(this.describeGlobal, this, cacheOptions);
  this.describeGlobal = this.cache.makeResponseCacheable(this.describeGlobal, this, cacheOptions);

  this.initialize(options);
};

util.inherits(Connection, events.EventEmitter);

/**
 * Initialize connection.
 *
 * @protected
 * @param {Object} options - Initialization options
 * @param {String} [options.instanceUrl] - Salesforce Instance URL (e.g. https://na1.salesforce.com/)
 * @param {String} [options.serverUrl] - Salesforce SOAP service endpoint URL (e.g. https://na1.salesforce.com/services/Soap/u/28.0)
 * @param {String} [options.accessToken] - Salesforce OAuth2 access token
 * @param {String} [options.sessionId] - Salesforce session ID
 * @param {String} [options.refreshToken] - Salesforce OAuth2 refresh token
 * @param {String|Object} [options.signedRequest] - Salesforce Canvas signed request (Raw Base64 string, JSON string, or deserialized JSON)
 * @param {UserInfo} [options.userInfo] - Logged in user information
 */
Connection.prototype.initialize = function(options) {
  if (!options.instanceUrl && options.serverUrl) {
    options.instanceUrl = options.serverUrl.split('/').slice(0, 3).join('/');
  }
  this.instanceUrl = options.instanceUrl || options.serverUrl || this.instanceUrl || defaults.instanceUrl;
  this.urls = {
    soap : {
      login : [ this.loginUrl, "services/Soap/u", this.version ].join('/'),
      service : [ this.instanceUrl, "services/Soap/u", this.version ].join('/')
    },
    rest : {
      base : [ this.instanceUrl, "services/data", "v" + this.version ].join('/')
    }
  };

  this.accessToken = options.sessionId || options.accessToken || this.accessToken;
  this.refreshToken = options.refreshToken || this.refreshToken;
  if (this.refreshToken && !this.oauth2 && !this._refreshDelegate) {
    throw new Error("Refresh token is specified without oauth2 client information");
  }
  
  this.signedRequest = options.signedRequest && parseSignedRequest(options.signedRequest);
  if (this.signedRequest) {
    this.accessToken = this.signedRequest.client.oauthToken;
  }

  if (options.userInfo) {
    this.userInfo = options.userInfo;
  }

  this.limitInfo = {};

  this.sobjects = {};
  this.cache.clear();
  this.cache.get('describeGlobal').on('value', _.bind(function(res) {
    if (res.result) {
      var types = _.map(res.result.sobjects, function(so) { return so.name; });
      _.each(types, this.sobject, this);
    }
  }, this));

  if (this.tooling) {
    this.tooling.initialize();
  }

  this._sessionType = options.sessionId ? "soap" : "oauth2";
  this._initializedAt = Date.now();

};

/** @private **/
function parseSignedRequest(sr) {
  if (_.isString(sr)) {
    if (sr[0] === '{') { // might be JSON
      return JSON.parse(sr);
    } else { // might be original base64-encoded signed request
      var msg = sr.split('.').pop(); // retrieve latter part
      var json = new Buffer(msg, 'base64').toString('utf-8');
      return JSON.parse(json);
    }
    return null;
  }
  return sr;
}


/**
 * @private
 */
Connection.prototype._baseUrl = function() {
  return this.urls.rest.base;
};

/**
 * Sending request using given HTTP request info
 * @private
 */
Connection.prototype._request = function(params, callback, options) {
  options = options || {};
  // if params is simple string, regard it as url in GET method
  if (_.isString(params)) {
    params = { method: 'GET', url: params };
  }
  // if url is given in site root relative path, prepend instance url before.
  if (params.url[0] === '/') {
    params.url = this.instanceUrl + params.url;
  }

  var self = this;
  var logger = this._logger;

  var deferred = Promise.defer();

  var onResume = function(err) {
    if (err) {
      deferred.reject(err);
      return;
    }
    self._request(params, null, options).then(function(response) {
      deferred.resolve(response);
    }, function(err) {
      deferred.reject(err);
    });
  };

  if (self._suspended) {
    self.once('resume', onResume);
    return deferred.promise.thenCall(callback);
  }

  params.headers = params.headers || {};
  if (this.accessToken) {
    params.headers.Authorization = "Bearer " + this.accessToken;
  }

  // hook in sending
  if (options.beforesend) { options.beforesend(this, params); }

  // for connection in canvas with signed request
  if (this.signedRequest) { options.signedRequest = this.signedRequest; }

  self.emit('request', params.method, params.url, params);

  logger.debug("<request> method=" + params.method + ", url=" + params.url);
  var requestTime = Date.now();

  var onFailure = function(err) {
    var responseTime = Date.now();
    logger.debug("elappsed time : " + (responseTime - requestTime) + "msec");

    logger.error(err);
    throw err;
  };

  var onResponse = function(response) {
    var responseTime = Date.now();
    logger.debug("elappsed time : " + (responseTime - requestTime) + "msec");

    logger.debug("<response> status=" + response.statusCode + ", url=" + params.url);

    self.emit('response', response.statusCode, response.body, response);

    // log api usage and its quota
    if (response.headers && response.headers["sforce-limit-info"]) {
      var apiUsage = response.headers["sforce-limit-info"].match(/api\-usage=(\d+)\/(\d+)/)
      if (apiUsage) {
        self.limitInfo = {
          apiUsage: {
            used: parseInt(apiUsage[1], 10),
            limit: parseInt(apiUsage[2], 10)
          }
        };
      }
    }

    // Refresh token if status code requires authentication
    // when oauth2 info and refresh token is available.
    if (response.statusCode === 401 &&
        (self._refreshDelegate || (self.oauth2 && self.refreshToken))) {
      // Access token may be refreshed before the response
      if (self._initializedAt > requestTime) {
        onResume();
      } else {
        self.once('resume', onResume);
        if (!self._suspended) {
          self._suspended = true;
          self._refresh();
        }
      }
      return deferred.promise;
    }

    // check response content type to choose parser
    var contentType = options.responseContentType ||
                      (response.headers && response.headers["content-type"]);
    var parseBody = /^application\/xml(;|$)/.test(contentType) ? parseXML : 
                    /^application\/json(;|$)/.test(contentType) ? parseJSON :
                    /^text\/csv(;|$)/.test(contentType) ? parseCSV :
                    parseText;

    var err;
    if (response.statusCode >= 400) {
      var error;
      try {
        var parseError = options.parseError || function(errs) {
          var err = _.isArray(errs) ? errs[0] : errs;
          if (_.isObject(err) && _.isString(err.message)) { return err; }
        };
        error = parseError(parseBody(response.body));
      } catch(e) {}
      if (!error) {
        error = { message : response.body, errorCode: 'ERROR_HTTP_' + response.statusCode };
      }
      err = new Error(error.message);
      err.name = error.errorCode;
      for (var key in error) { err[key] = error[key]; }
      throw err;
    } else if (response.statusCode === 204) {
      return options.noContentResponse;
    } else {
      var res = parseBody(response.body);
      if (response.statusCode === 300) { // Multiple Choices
        err = new Error('Multiple records found');
        err.name = "MULTIPLE_CHOICES";
        err.content = res;
        throw err;
      }
      return res;
    }
  };

  return this._transport.httpRequest(params, null, options).then(onResponse, onFailure).thenCall(callback);

};

/** @private */
function parseJSON(str) {
  return JSON.parse(str);
}

/** @private */
function parseXML(str) {
  var ret = {};
  require('xml2js').parseString(str, { explicitArray: false }, function(err, result) {
    ret = { error: err, result : result };
  });
  if (ret.error) { throw ret.error; }
  return ret.result;
}

/** @private */
function parseCSV(str) {
  return require('./csv').parseCSV(str);
}

/** @private */
function parseText(str) { return str; }

/** @private */
function formatDate(date) {
  function pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

  return date.getUTCFullYear() +
    '-' + pad(date.getUTCMonth() + 1) +
    '-' + pad(date.getUTCDate()) +
    'T' + pad(date.getUTCHours()) +
    ':' + pad(date.getUTCMinutes()) +
    ':' + pad(date.getUTCSeconds()) +
    '+00:00';
}

/**
 * Refresh access token
 * @private
 */
Connection.prototype._refresh = function() {
  var self = this;
  var logger = this._logger;
  logger.debug("<refresh token>");
  var delegate = this._refreshDelegate || this.oauth2;
  return delegate.refreshToken(this.refreshToken, function(err, res) {
    if (!err) {
      var userInfo = parseIdUrl(res.id);
      self.initialize({
        instanceUrl : res.instance_url,
        accessToken : res.access_token,
        userInfo : userInfo
      });
      logger.debug("token refresh completed. result = " + JSON.stringify(res));
      self.emit("refresh", res.access_token, res);
    }
    self._suspended = false;
    self.emit('resume', err);
  });
};

/** @private **/
function parseIdUrl(idUrl) {
  var idUrls = idUrl.split("/");
  var userId = idUrls.pop(), orgId = idUrls.pop();
  return {
    id: userId,
    organizationId: orgId,
    url: idUrl
  };
}


/**
 * @callback Callback
 * @type {Function}
 * @param {Error} err - Callback error
 * @param {T} response - Callback response
 * @template T
 */

/**
 * @typedef {Object} QueryResult
 * @prop {Boolean} done - Flag if the query is fetched all records or not
 * @prop {String} [nextRecordsUrl] - URL locator for next record set, (available when done = false)
 * @prop {Number} totalSize - Total size for query
 * @prop {Array.<Record>} [records] - Array of records fetched
 */

/**
 * Execute query by using SOQL
 * 
 * @param {String} soql - SOQL string
 * @param {Callback.<QueryResult>} [callback] - Callback function
 * @returns {Query.<QueryResult>}
 */
Connection.prototype.query = function(soql, callback) {
  var query = new Query(this, soql);
  if (callback) {
    query.run(callback);
  }
  return query;
};

/**
 * Execute query by using SOQL, including deleted records
 * 
 * @param {String} soql - SOQL string
 * @param {Callback.<QueryResult>} [callback] - Callback function
 * @returns {Query.<QueryResult>}
 */
Connection.prototype.queryAll = function(soql, callback) {
  var query = new Query(this, soql);
  query.scanAll(true);
  if (callback) {
    query.run(callback);
  }
  return query;
};

/**
 * Query next record set by using query locator
 * 
 * @param {String} locator - Next record set locator
 * @param {Callback.<QueryResult>} [callback] - Callback function
 * @returns {Query.<QueryResult>}
 */
Connection.prototype.queryMore = function(locator, callback) {
  var query = new Query(this, null, locator);
  if (callback) {
    query.run(callback);
  }
  return query;
};

/**
 * Retrieve specified records
 *
 * @param {String} type - SObject Type
 * @param {String|Array.<String>} ids - A record ID or array of record IDs 
 * @param {Object} [options] - Options for rest api.
 * @param {Callback.<Record|Array.<Record>>} [callback] - Callback function
 * @returns {Promise.<Record|Array.<Record>>}
 */
Connection.prototype.retrieve = function(type, ids, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  var self = this;
  var isArray = _.isArray(ids);
  ids = isArray ? ids : [ ids ];
  if (ids.length > self.maxRequest) {
    return Promise.reject(new Error("Exceeded max limit of concurrent call")).thenCall(callback);
  }
  return Promise.all(
    _.map(ids, function(id) {
      var url = [ self._baseUrl(), "sobjects", type, id ].join('/');
      return self._request(url);
    })
  ).then(function(results) {
    return !isArray && _.isArray(results) ? results[0] : results;
  }).thenCall(callback);
};


/**
 * @typedef RecordResult
 * @prop {Boolean} success - The result is succeessful or not
 * @prop {String} [id] - Record ID
 * @prop {Array.<String>} [errors] - Errors (available when success = false)
 */

/**
 * Synonym of Connection#create()
 *
 * @method Connection#insert
 * @param {String} type - SObject Type
 * @param {Object|Array.<Object>} records - A record or array of records to create
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
/**
 * Create records
 *
 * @method Connection#create
 * @param {String} type - SObject Type
 * @param {Record|Array.<Record>} records - A record or array of records to create
 * @param {Object} [options] - Options for rest api.
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
Connection.prototype.insert =
Connection.prototype.create = function(type, records, options, callback) {
  if (!_.isString(type)) {
    // reverse order
    callback = options;
    options = records;
    records = type;
    type = null;
  }
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  var self = this;
  var isArray = _.isArray(records);
  records = isArray ? records : [ records ];
  if (records.length > self.maxRequest) {
    return Promise.reject(new Error("Exceeded max limit of concurrent call")).thenCall(callback);
  }
  return Promise.all(
    _.map(records, function(record) {
      var sobjectType = type || (record.attributes && record.attributes.type) || record.type;
      if (!sobjectType) {
        throw new Error('No SObject Type defined in record');
      }
      record = _.clone(record);
      delete record.Id;
      delete record.type;
      delete record.attributes;

      var url = [ self._baseUrl(), "sobjects", sobjectType ].join('/');
      return self._request({
        method : 'POST',
        url : url,
        body : JSON.stringify(record),
        headers : _.defaults(options.headers || {}, {
          "Content-Type" : "application/json"
        })
      });
    })
  ).then(function(results) {
    return !isArray && _.isArray(results) ? results[0] : results;
  }).thenCall(callback);
};

/**
 * Update records
 *
 * @param {String} type - SObject Type
 * @param {Record|Array.<Record>} records - A record or array of records to update
 * @param {Object} [options] - Options for rest api.
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
Connection.prototype.update = function(type, records, options, callback) {
  if (!_.isString(type)) {
    // reverse order
    callback = options;
    options = records;
    records = type;
    type = null;
  }
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  var self = this;
  var isArray = _.isArray(records);
  records = isArray ? records : [ records ];
  if (records.length > self.maxRequest) {
    return Promise.reject(new Error("Exceeded max limit of concurrent call")).thenCall(callback);
  }
  return Promise.all(
    _.map(records, function(record) {
      var id = record.Id;
      if (!id) {
        throw new Error('Record id is not found in record.');
      }
      var sobjectType = type || (record.attributes && record.attributes.type) || record.type;
      if (!sobjectType) {
        throw new Error('No SObject Type defined in record');
      }
      record = _.clone(record);
      delete record.Id;
      delete record.type;
      delete record.attributes;

      var url = [ self._baseUrl(), "sobjects", sobjectType, id ].join('/');
      return self._request({
        method : 'PATCH',
        url : url,
        body : JSON.stringify(record),
        headers : _.defaults(options.headers || {}, {
          "Content-Type" : "application/json"
        })
      }, null, {
        noContentResponse: { id : id, success : true, errors : [] }
      });
    })
  ).then(function(results) {
    return !isArray && _.isArray(results) ? results[0] : results;
  }).thenCall(callback);
};

/**
 * Upsert records
 *
 * @param {String} type - SObject Type
 * @param {Record|Array.<Record>} records - Record or array of records to upsert
 * @param {String} extIdField - External ID field name
 * @param {Object} [options] - Options for rest api.
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
Connection.prototype.upsert = function(type, records, extIdField, options, callback) {
  // You can omit "type" argument, when the record includes type information.
  if (!_.isString(type)) {
    // reverse order
    callback = options;
    options = extIdField;
    extIdField = records;
    records = type;
    type = null;
  }
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  var self = this;
  var isArray = _.isArray(records);
  records = isArray ? records : [ records ];
  if (records.length > self.maxRequest) {
    return Promise.reject(new Error("Exceeded max limit of concurrent call")).thenCall(callback);
  }
  return Promise.all(
    _.map(records, function(record) {
      var sobjectType = type || (record.attributes && record.attributes.type) || record.type;
      var extId = record[extIdField];
      if (!extId) {
        return Promise.reject(new Error('External ID is not defined in the record'));
      }
      record = _.clone(record);
      delete record[extIdField];
      delete record.type;
      delete record.attributes;

      var url = [ self._baseUrl(), "sobjects", sobjectType, extIdField, extId ].join('/');
      return self._request({
        method : 'PATCH',
        url : url,
        body : JSON.stringify(record),
        headers : _.defaults(options.headers || {}, {
          "Content-Type" : "application/json"
        }) 
      }, null, {
        noContentResponse: { success : true, errors : [] }
      });
    })
  ).then(function(results) {
    return !isArray && _.isArray(results) ? results[0] : results;
  }).thenCall(callback);
};

/**
 * Synonym of Connection#destroy()
 *
 * @method Connection#delete
 * @param {String} type - SObject Type
 * @param {String|Array.<String>} ids - A ID or array of IDs to delete
 * @param {Object} [options] - Options for rest api.
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
/**
 * Synonym of Connection#destroy()
 *
 * @method Connection#del
 * @param {String} type - SObject Type
 * @param {String|Array.<String>} ids - A ID or array of IDs to delete
 * @param {Object} [options] - Options for rest api.
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
/**
 * Delete records
 *
 * @method Connection#destroy
 * @param {String} type - SObject Type
 * @param {String|Array.<String>} ids - A ID or array of IDs to delete
 * @param {Object} [options] - Options for rest api.
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
Connection.prototype["delete"] =
Connection.prototype.del =
Connection.prototype.destroy = function(type, ids, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  var self = this;
  var isArray = _.isArray(ids);
  ids = isArray ? ids : [ ids ];
  if (ids.length > self.maxRequest) {
    return Promise.reject(new Error("Exceeded max limit of concurrent call")).thenCall(callback);
  }
  return Promise.all(
    _.map(ids, function(id) {
      var url = [ self._baseUrl(), "sobjects", type, id ].join('/');
      return self._request({
        method : 'DELETE',
        url : url,
        headers: options.headers || null
      }, null, {
        noContentResponse: { id : id, success : true, errors : [] }
      });
    })
  ).then(function(results) {
    return !isArray && _.isArray(results) ? results[0] : results;
  }).thenCall(callback);
};

/**
 * Execute search by SOSL
 * 
 * @param {String} sosl - SOSL string
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<Array.<RecordResult>>}
 */
Connection.prototype.search = function(sosl, callback) {
  var url = this._baseUrl() + "/search?q=" + encodeURIComponent(sosl);
  return this._request(url).thenCall(callback);
};

/**
 * Result returned by describeSObject call
 *
 * @typedef {Object} DescribeSObjectResult
 */
/**
 * Synonym of Connection#describe()
 *
 * @method Connection#describeSObject
 * @param {String} type - SObject Type
 * @param {Callback.<DescribeSObjectResult>} [callback] - Callback function
 * @returns {Promise.<DescribeSObjectResult>}
 */
/**
 * Describe SObject metadata
 *
 * @method Connection#describe
 * @param {String} type - SObject Type
 * @param {Callback.<DescribeSObjectResult>} [callback] - Callback function
 * @returns {Promise.<DescribeSObjectResult>}
 */
Connection.prototype.describe = 
Connection.prototype.describeSObject = function(type, callback) {
  var url = [ this._baseUrl(), "sobjects", type, "describe" ].join('/');
  return this._request(url).thenCall(callback);
};


/**
 * Result returned by describeGlobal call
 *
 * @typedef {Object} DescribeGlobalResult
 */
/**
 * Describe global SObjects
 *
 * @param {Callback.<DescribeGlobalResult>} [callback] - Callback function
 * @returns {Promise.<DescribeGlobalResult>}
 */
Connection.prototype.describeGlobal = function(callback) {
  var url = this._baseUrl() + "/sobjects";
  return this._request(url).thenCall(callback);
};


/**
 * Get SObject instance
 *
 * @param {String} type - SObject Type
 * @returns {SObject}
 */
Connection.prototype.sobject = function(type) {
  this.sobjects = this.sobjects || {};
  var sobject = this.sobjects[type] = 
    this.sobjects[type] || new SObject(this, type);
  return sobject;
};

/**
 * Get identity information of current user
 *
 * @param {Callback.<IdentityInfo>} [callback] - Callback function
 * @returns {Promise.<IdentityInfo>}
 */
Connection.prototype.identity = function(callback) {
  var self = this;
  var idUrl = this.userInfo && this.userInfo.url;
  return new Promise(
    idUrl ? 
    { identity: idUrl } :
    this._request(this._baseUrl())
  ).then(function(res) {
    var url = res.identity;
    url += '?format=json&oauth_token=' + encodeURIComponent(self.accessToken);
    return self._request(url, null, { jsonp : 'callback' });
  }).then(function(res) {
    self.userInfo = {
      id: res.user_id,
      organizationId: res.organization_id,
      url: res.id
    };
    return res;
  }).thenCall(callback);
};

/**
 * @typedef UserInfo
 * @prop {String} id - User ID
 * @prop {String} organizationId - Organization ID
 * @prop {String} url - Identity URL of the user
 */

/**
 * Authorize (using oauth2 web server flow)
 *
 * @param {String} code - Authorization code
 * @param {Callback.<UserInfo>} [callback] - Callback function
 * @returns {Promise.<UserInfo>}
 */
Connection.prototype.authorize = function(code, callback) {
  var self = this;
  var logger = this._logger;

  return this.oauth2.requestToken(code).then(function(res) {
    logger.debug("OAuth2 token response = " + JSON.stringify(res));
    var userInfo = parseIdUrl(res.id);
    self.initialize({
      instanceUrl : res.instance_url,
      accessToken : res.access_token,
      refreshToken : res.refresh_token,
      userInfo: userInfo
    });
    logger.debug("<login> completed. user id = " + userInfo.id + ", org id = " + userInfo.organizationId);
    return userInfo;

  }).thenCall(callback);

};


/**
 * Login to Salesforce
 * 
 * @param {String} username - Salesforce username
 * @param {String} password - Salesforce password (and security token, if required)
 * @param {Callback.<UserInfo>} [callback] - Callback function
 * @returns {Promise.<UserInfo>}
 */
Connection.prototype.login = function(username, password, callback) {
  if (this.oauth2 && this.oauth2.clientId && this.oauth2.clientSecret) {
    return this.loginByOAuth2(username, password, callback);
  } else {
    return this.loginBySoap(username, password, callback);
  }
};


/**
 * Login by OAuth2 username & password flow
 *
 * @param {String} username - Salesforce username
 * @param {String} password - Salesforce password (and security token, if required)
 * @param {Callback.<UserInfo>} [callback] - Callback function
 * @returns {Promise.<UserInfo>}
 */
Connection.prototype.loginByOAuth2 = function(username, password, callback) {
  var self = this;
  var logger = this._logger;

  return this.oauth2.authenticate(username, password).then(function(res) {
    logger.debug("OAuth2 token response = " + JSON.stringify(res));
    var userInfo = parseIdUrl(res.id);
    self.initialize({
      instanceUrl : res.instance_url,
      accessToken : res.access_token,
      userInfo: userInfo
    });
    logger.debug("<login> completed. user id = " + userInfo.id + ", org id = " + userInfo.organizationId);
    return userInfo;

  }).thenCall(callback);

};

/**
 * @private
 */
function esc(str) {
  return str && String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                           .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * Login by SOAP web service API
 *
 * @param {String} username - Salesforce username
 * @param {String} password - Salesforce password (and security token, if required)
 * @param {Callback.<UserInfo>} [callback] - Callback function
 * @returns {Promise.<UserInfo>}
 */
Connection.prototype.loginBySoap = function(username, password, callback) {
  var self = this;
  var logger = this._logger;
  var body = [
    '<se:Envelope xmlns:se="http://schemas.xmlsoap.org/soap/envelope/">',
      '<se:Header/>',
      '<se:Body>',
        '<login xmlns="urn:partner.soap.sforce.com">',
          '<username>' + esc(username) + '</username>',
          '<password>' + esc(password) + '</password>',
        '</login>',
      '</se:Body>',
    '</se:Envelope>'
  ].join('');

  return this._transport.httpRequest({
    method : 'POST',
    url : this.urls.soap.login,
    body : body,
    headers : {
      "Content-Type" : "text/xml",
      "SOAPAction" : '""'
    }
  }).then(function(response) {
    var m;
    if (response.statusCode >= 400) {
      m = response.body.match(/<faultstring>([^<]+)<\/faultstring>/);
      var faultstring = m && m[1];
      throw new Error(faultstring || response.body);
    }
    logger.debug("SOAP response = " + response.body);
    m = response.body.match(/<serverUrl>([^<]+)<\/serverUrl>/);
    var serverUrl = m && m[1];
    m = response.body.match(/<sessionId>([^<]+)<\/sessionId>/);
    var sessionId = m && m[1];
    m = response.body.match(/<userId>([^<]+)<\/userId>/);
    var userId = m && m[1];
    m = response.body.match(/<organizationId>([^<]+)<\/organizationId>/);
    var orgId = m && m[1];
    var idUrl = self.urls.soap.login.split('/').slice(0, 3).join('/');
    idUrl += "/id/" + orgId + "/" + userId;
    var userInfo = {
      id: userId,
      organizationId: orgId,
      url: idUrl
    };
    self.initialize({ 
      serverUrl: serverUrl.split('/').slice(0, 3).join('/'), 
      sessionId: sessionId,
      userInfo: userInfo
    });
    logger.debug("<login> completed. user id = " + userId + ", org id = " + orgId);
    return userInfo;

  }).thenCall(callback);

};

/**
 * Logout the current session
 *
 * @param {Callback.<undefined>} [callback] - Callback function
 * @returns {Promise.<undefined>}
 */
Connection.prototype.logout = function(callback) {
  if (this._sessionType === "oauth2") {
    return this.logoutByOAuth2(callback);
  } else {
    return this.logoutBySoap(callback);
  }
};

/**
 * Logout the current session by revoking access token via OAuth2 session revoke
 *
 * @param {Callback.<undefined>} [callback] - Callback function
 * @returns {Promise.<undefined>}
 */
Connection.prototype.logoutByOAuth2 = function(callback) {
  var self = this;
  var logger = this._logger;

  return this.oauth2.revokeToken(this.accessToken).then(function() {
    // Destroy the session bound to this connection
    self.accessToken = null;
    self.userInfo = null;
    self.refreshToken = null;
    self.instanceUrl = null;
    self.cache.clear();

    // nothing useful returned by logout API, just return
    return undefined;
  }).thenCall(callback);
};


/**
 * Logout the session by using SOAP web service API
 *
 * @param {Callback.<undefined>} [callback] - Callback function
 * @returns {Promise.<undefined>}
 */
Connection.prototype.logoutBySoap = function(callback) {
  var self = this;
  var logger = this._logger;

  var body = [
    '<se:Envelope xmlns:se="http://schemas.xmlsoap.org/soap/envelope/">',
      '<se:Header>',
        '<SessionHeader xmlns="urn:partner.soap.sforce.com">',
          '<sessionId>' + esc(this.accessToken) + '</sessionId>',
        '</SessionHeader>',
      '</se:Header>',
      '<se:Body>',
        '<logout xmlns="urn:partner.soap.sforce.com"/>',
      '</se:Body>',
    '</se:Envelope>'
  ].join('');

  return this._transport.httpRequest({
    method : 'POST',
    url : this.urls.soap.service,
    body : body,
    headers : {
      "Content-Type" : "text/xml",
      "SOAPAction" : '""'
    }
  }).then(function(response) {
    logger.debug("SOAP statusCode = " + response.statusCode + ", response = " + response.body);
    if (response.statusCode >= 400) {
      var m = response.body.match(/<faultstring>([^<]+)<\/faultstring>/);
      var faultstring = m && m[1];
      throw new Error(faultstring || response.body);
    }

    // Destroy the session bound to this connection
    self.accessToken = null;
    self.userInfo = null;
    self.refreshToken = null;
    self.instanceUrl = null;
    self.cache.clear();

    // nothing useful returned by logout API, just return
    return undefined;

  }).thenCall(callback);
};

/**
 * List recently viewed records
 * 
 * @param {String} [type] - SObject type
 * @param {Number} [limit] - Limit num to fetch
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<Array.<RecordResult>>}
 */
Connection.prototype.recent = function(type, limit, callback) {
  if (!_.isString(type)) {
    callback = limit;
    limit = type;
    type = undefined;
  }
  if (!_.isNumber(limit)) {
    callback = limit;
    limit = undefined;
  }
  var url;
  if (type) {
    url = [ this._baseUrl(), "sobjects", type ].join('/');
    return this._request(url).then(function(res) {
      return limit ? res.recentItems.slice(0, limit) : res.recentItems;
    }).thenCall(callback);
  } else {
    url = this._baseUrl() + "/recent";
    if (limit) { 
      url += "?limit=" + limit;
    }
    return this._request(url).thenCall(callback);
  }

};

/**
 * @typedef {Object} UpdatedRecordsInfo
 * @prop {String} latestDateCovered - The timestamp of the last date covered. 
 * @prop {Array.<String>} ids - Updated record IDs.
 */

/**
 * Retrieve updated records
 *
 * @param {String} type - SObject Type
 * @param {String|Date} start - start date or string representing the start of the interval
 * @param {String|Date} end - start date or string representing the end of the interval must be > start
 * @param {Callback.<UpdatedRecordsInfo>} [callback] - Callback function
 * @returns {Promise.<UpdatedRecordsInfo>}
 */
Connection.prototype.updated = function (type, start, end, callback) {
  var url = [ this._baseUrl(), "sobjects", type, "updated" ].join('/');

  if (typeof start === 'string') {
    start = new Date(start);
  }

  if (start instanceof Date) {
    start = formatDate(start);
  }

  if (start) {
    url += "?start=" + encodeURIComponent(start);
  }

  if (typeof end === 'string') {
    end = new Date(end);
  }

  if (end instanceof Date) {
    end = formatDate(end);
  }

  if (end) {
    url += "&end=" + encodeURIComponent(end);
  }

  return this._request(url).thenCall(callback);
};

/**
 * @typedef {Object} DeletedRecordsInfo
 * @prop {String} earliestDateAvailable - The timestamp of the earliest date available
 * @prop {String} latestDateCovered - The timestamp of the last date covered
 * @prop {Array.<Object>} deletedRecords - Updated records
 * @prop {String} deletedRecords.id - Record ID
 * @prop {String} deletedRecords.deletedDate - The timestamp when this record was deleted
 */

/**
 * Retrieve deleted records
 *
 * @param {String} type - SObject Type
 * @param {String|Date} start - start date or string representing the start of the interval
 * @param {String|Date} end - start date or string representing the end of the interval
 * @param {Callback.<DeletedRecordsInfo>} [callback] - Callback function
 * @returns {Promise.<DeletedRecordsInfo>}
 */
Connection.prototype.deleted = function (type, start, end, callback) {
  var url = [ this._baseUrl(), "sobjects", type, "deleted" ].join('/');

  if (typeof start === 'string') {
    start = new Date(start);
  }

  if (start instanceof Date) {
    start = formatDate(start);
  }

  if (start) {
    url += "?start=" + encodeURIComponent(start);
  }

  if (typeof end === 'string') {
    end = new Date(end);
  }

  if (end instanceof Date) {
    end = formatDate(end);
  }

  if (end) {
    url += "&end=" + encodeURIComponent(end);
  }

  return this._request(url).thenCall(callback);
};

}).call(this,require("buffer").Buffer)
},{"./api/analytics":1,"./api/apex":2,"./api/bulk":3,"./api/chatter":4,"./api/metadata":5,"./api/streaming":6,"./api/tooling":7,"./cache":13,"./csv":16,"./logger":19,"./oauth2":20,"./promise":21,"./query":22,"./sobject":26,"./transport":28,"async":29,"buffer":33,"events":37,"underscore":63,"util":46,"xml2js":66}],15:[function(require,module,exports){
module.exports = function(name) { return require(name); };
require("events");
require("util");
require("underscore");
require("async");
require("./promise");
require("./logger");
require("./oauth2");
require("./query");
require("./sobject");
require("./transport");
require("./cache");
require("xml2js");
require("./csv");
require("./date");
require("./connection");
require("./record-stream");
require("querystring");
require("q");
require("./soql-builder");
require("stream");
require("./record");
require("request");
require("./browser/request");
require("./browser/canvas");
require("./browser/jsonp");
},{"./browser/canvas":8,"./browser/jsonp":11,"./browser/request":12,"./cache":13,"./connection":14,"./csv":16,"./date":17,"./logger":19,"./oauth2":20,"./promise":21,"./query":22,"./record":24,"./record-stream":23,"./sobject":26,"./soql-builder":27,"./transport":28,"async":29,"events":37,"q":48,"querystring":42,"request":31,"stream":43,"underscore":63,"util":46,"xml2js":66}],16:[function(require,module,exports){
var _      = require('underscore'),
    SfDate = require('./date');

/**
 * @private
 */
function toCSV(records, headers, options) {
  options = options || {};
  if (!headers) {
    headers = extractHeaders(records, options);
  }
  var rows = _.map(records, function(record){ return recordToCSV(record, headers, options); });
  return arrayToCSV(headers) + "\n" + rows.join("\n");
}

/**
 * @private
 */
function extractHeaders(records, options) {
  options = options || {};
  var headers = {};
  _.forEach(records, function(record) {
    for (var key in record) {
      var value = record[key];
      if (record.hasOwnProperty(key) && (value === null || typeof value !== 'object')) {
        headers[key] = true;
      }
    }
  });
  return _.keys(headers);
}

/**
 * @private
 */
function recordToCSV(record, headers, options) {
  options = options || {};
  var row = [];
  _.forEach(headers, function(header) {
    var value = record[header];
    if (value === null && typeof options.nullValue !== 'undefined') {
      value = options.nullValue;
    }
    if (typeof value === 'undefined') { value = null; }
    row.push(value);
  });
  return arrayToCSV(row);
}

/**
 * @private
 */
function arrayToCSV(arr) {
  return _.map(arr, escapeCSV).join(',');
}

/**
 * @private
 */
function escapeCSV(str) {
  if (str === null || typeof str === 'undefined') { str = ''; }
  str = String(str);
  if (str.indexOf('"') >= 0 || str.indexOf(',') >= 0 || /[\n\r]/.test(str)) {
    str = '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}



/**
 * @private
 * @class
 * @constructor
 * @param {String} text - CSV string
 */
var CSVParser = function(text) {
  this.text = text;
  this.cursor = 0;
};

CSVParser.prototype = {

  nextToken : function() {
    var cell;
    var dquoted = false;
    var firstChar = this.text.charAt(this.cursor);
    if (firstChar === '' || firstChar === '\r' || firstChar === '\n') {
      return null;
    }
    if (firstChar === '"') {
      dquoted = true;
    }
    if (dquoted) {
      var dq = this.cursor;
      while(true) {
        dq++;
        dq = this.text.indexOf('"', dq);
        if (dq<0 || this.text.charAt(dq+1) !== '"') {
          break;
        } else {
          dq++;
        }
      }
      if (dq>=0) {
        var delim = this.text.charAt(dq+1);
        cell = this.text.substring(this.cursor, dq+1);
        this.cursor = dq + (delim === ',' ? 2 : 1);
      } else {
        cell = this.text.substring(this.cursor);
        this.cursor = this.text.length;
      }
      return cell.replace(/""/g,'"').replace(/^"/,'').replace(/"$/,'');
    } else {
      var comma = this.text.indexOf(',', this.cursor);
      var cr = this.text.indexOf('\r', this.cursor);
      var lf = this.text.indexOf('\n', this.cursor);
      comma = comma<0 ? this.text.length+1 : comma;
      cr = cr<0 ? this.text.length+1 : cr;
      lf = lf<0 ? this.text.length+1 : lf;
      var pivot = Math.min(comma, cr, lf, this.text.length);
      cell = this.text.substring(this.cursor, pivot);
      this.cursor = pivot;
      if (comma === pivot) {
        this.cursor++;
      }
      return cell;
    }
  },

  nextLine : function() {
    for (var c = this.text.charAt(this.cursor);
        c === '\r' || c === '\n';
        c = this.text.charAt(++this.cursor))
      {}
    return this.cursor !== this.text.length;
  }

};

/**
 * @private
 */
function parseCSV(str) {
  var parser = new CSVParser(str);
  var headers = [];
  var token;
  if (parser.nextLine()) {
    token = parser.nextToken();
    while (!_.isUndefined(token) && !_.isNull(token)) {
      headers.push(token);
      token = parser.nextToken();
    }
  }
  var rows = [];
  while (parser.nextLine()) {
    var row = {};
    token = parser.nextToken();
    var i = 0;
    while (!_.isUndefined(token) && !_.isNull(token)) {
      var header = headers[i++];
      row[header] = token;
      token = parser.nextToken();
    }
    rows.push(row);
  }
  return rows;
}


/**
 * @protected
 */
module.exports = {
  toCSV : toCSV,
  extractHeaders : extractHeaders,
  recordToCSV : recordToCSV,
  arrayToCSV : arrayToCSV,
  parseCSV : parseCSV
};
  
},{"./date":17,"underscore":63}],17:[function(require,module,exports){
var _ = require("underscore")._;

/**
 * A date object to keep Salesforce date literal
 *
 * @class
 * @constructor
 * @see http://www.salesforce.com/us/developer/docs/soql_sosl/Content/sforce_api_calls_soql_select_dateformats.htm
 */
var SfDate = module.exports = function(literal) {
  this._literal = literal;
};

/**
 * Returns literal when converted to string
 *
 * @override
 */
SfDate.prototype.toString =
SfDate.prototype.toJSON = function() { return this._literal; };


/** @private **/
function zeropad(n) { return (n<10 ? "0" : "") + n; }

/**
 * Convert JavaScript date object to ISO8601 Date format (e.g. 2012-10-31)
 *
 * @param {String|Number|Date} date - Input date
 * @returns {SfDate} - Salesforce date literal with ISO8601 date format
 */
SfDate.toDateLiteral = function(date) {
  if (_.isNumber(date)) {
    date = new Date(date);
  } else if (_.isString(date)) {
    date = SfDate.parseDate(date);
  }
  var yy = date.getFullYear();
  var mm = date.getMonth()+1;
  var dd = date.getDate();
  var dstr = [ yy, zeropad(mm), zeropad(dd) ].join("-");
  return new SfDate(dstr);
};

/**
 * Convert JavaScript date object to ISO8601 DateTime format
 * (e.g. 2012-10-31T12:34:56Z)
 *
 * @param {String|Number|Date} date - Input date
 * @returns {SfDate} - Salesforce date literal with ISO8601 datetime format
 */
SfDate.toDateTimeLiteral = function(date) {
  if (_.isNumber(date)) {
    date = new Date(date);
  } else if (_.isString(date)) {
    date = SfDate.parseDate(date);
  }
  var yy = date.getUTCFullYear();
  var mm = date.getUTCMonth()+1;
  var dd = date.getUTCDate();
  var hh = date.getUTCHours();
  var mi = date.getUTCMinutes();
  var ss = date.getUTCSeconds();
  var dtstr =
    [ yy, zeropad(mm), zeropad(dd) ].join("-") + "T" +
    [ zeropad(hh), zeropad(mi), zeropad(ss) ].join(":") + "Z";
  return new SfDate(dtstr);
};

/**
 * Parse IS08601 date(time) formatted string and return date instance
 *
 * @param {String} str
 * @returns {Date}
 */
SfDate.parseDate = function(str) {
  var d = new Date();
  var regexp = /^([\d]{4})-?([\d]{2})-?([\d]{2})(T([\d]{2}):?([\d]{2}):?([\d]{2})(.([\d]{3}))?(Z|([\+\-])([\d]{2}):?([\d]{2})))?$/;
  var m = str.match(regexp);
  if (m) {
    d = new Date(0);
    if (!m[4]) {
      d.setFullYear(parseInt(m[1], 10));
      d.setDate(parseInt(m[3], 10));
      d.setMonth(parseInt(m[2], 10) - 1);
      d.setHours(0);
      d.setMinutes(0);
      d.setSeconds(0);
      d.setMilliseconds(0);
    } else {
      d.setUTCFullYear(parseInt(m[1], 10));
      d.setUTCDate(parseInt(m[3], 10));
      d.setUTCMonth(parseInt(m[2], 10) - 1);
      d.setUTCHours(parseInt(m[5], 10));
      d.setUTCMinutes(parseInt(m[6], 10));
      d.setUTCSeconds(parseInt(m[7], 10));
      d.setUTCMilliseconds(parseInt(m[9] || '0', 10));
      if (m[10] && m[10] !== 'Z') {
        var offset = parseInt(m[12],10) * 60 + parseInt(m[13], 10);
        d.setTime((m[11] === '+' ? -1 : 1) * offset * 60 * 1000 +d.getTime());
      }
    }
    return d;
  } else {
    throw new Error("Invalid date format is specified : " + str);
  }
};

/*
 * Pre-defined Salesforce Date Literals
 */
var SfDateLiterals = {
  YESTERDAY: 1,
  TODAY: 1,
  TOMORROW: 1,
  LAST_WEEK: 1,
  THIS_WEEK: 1,
  NEXT_WEEK: 1,
  LAST_MONTH: 1,
  THIS_MONTH: 1,
  NEXT_MONTH: 1,
  LAST_90_DAYS: 1,
  NEXT_90_DAYS: 1,
  LAST_N_DAYS: 2,
  NEXT_N_DAYS: 2,
  NEXT_N_WEEKS: 2,
  LAST_N_WEEKS: 2,
  NEXT_N_MONTHS: 2,
  LAST_N_MONTHS: 2,
  THIS_QUARTER: 1,
  LAST_QUARTER: 1,
  NEXT_QUARTER: 1,
  NEXT_N_QUARTERS: 2,
  LAST_N_QUARTERS: 2,
  THIS_YEAR: 1,
  LAST_YEAR: 1,
  NEXT_YEAR: 1,
  NEXT_N_YEARS: 2,
  LAST_N_YEARS: 2,
  THIS_FISCAL_QUARTER: 1,
  LAST_FISCAL_QUARTER: 1,
  NEXT_FISCAL_QUARTER: 1,
  NEXT_N_FISCAL_QUARTERS:2,
  LAST_N_FISCAL_QUARTERS:2,
  THIS_FISCAL_YEAR:1,
  LAST_FISCAL_YEAR:1,
  NEXT_FISCAL_YEAR:1,
  NEXT_N_FISCAL_YEARS: 2,
  LAST_N_FISCAL_YEARS: 2
};

for (var literal in SfDateLiterals) {
  var type = SfDateLiterals[literal];
  SfDate[literal] =
   type === 1 ? new SfDate(literal) : createLiteralBuilder(literal);
}

/** @private **/
function createLiteralBuilder(literal) {
  return function(num) { return new SfDate(literal + ":" + num); };
}

},{"underscore":63}],18:[function(require,module,exports){
/* global process */
/**
 * @file JSforce API root object
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
exports.Connection = require('./connection');
exports.OAuth2 = require('./oauth2');
exports.Date = exports.SfDate = require("./date");
exports.RecordStream = require('./record-stream');

},{"./connection":14,"./date":17,"./oauth2":20,"./record-stream":23}],19:[function(require,module,exports){
/**
 * @protected
 * @class
 * @constructor
 * @param {String|Number} logLevel - Log level
 */
var Logger = module.exports = function(logLevel) {
  if (typeof logLevel === 'string') {
    logLevel = LogLevels[logLevel];
  }
  if (!logLevel) {
    logLevel = LogLevels.INFO;
  }
  this._logLevel = logLevel;
};

/**
 * @memberof Logger
 */
var LogLevels = Logger.LogLevels = {
  "DEBUG" : 1,
  "INFO" : 2,
  "WARN" : 3,
  "ERROR" : 4,
  "FATAL" : 5
};

/**
 * Output log
 *
 * @param {String} level - Logging target level
 * @param {String} message - Message to log
 */
Logger.prototype.log = function(level, message) {
  if (this._logLevel <= level) {
    if (level < LogLevels.ERROR) {
      console.log(message);
    } else {
      console.error(message);
    }
  }
};

for (var level in LogLevels) {
  Logger.prototype[level.toLowerCase()] = createLoggerFunction(LogLevels[level]);
}

function createLoggerFunction(level) {
  return function(message) { this.log(level, message); };
}

},{}],20:[function(require,module,exports){
/**
 * @file Manages Salesforce OAuth2 operations
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var querystring = require('querystring'),
    _ = require('underscore'),
    Transport = require('./transport');

var defaults = {
  loginUrl : "https://login.salesforce.com"
};

/**
 * OAuth2 class
 *
 * @class
 * @constructor
 * @param {Object} options - OAuth2 config options
 * @param {String} [options.loginUrl] - Salesforce login server URL
 * @param {String} [options.authzServiceUrl] - OAuth2 authorization service URL. If not specified, it generates from default by adding to login server URL.
 * @param {String} [options.tokenServiceUrl] - OAuth2 token service URL. If not specified it generates from default by adding to login server URL.
 * @param {String} options.clientId - OAuth2 client ID.
 * @param {String} options.clientSecret - OAuth2 client secret.
 * @param {String} options.redirectUri - URI to be callbacked from Salesforce OAuth2 authorization service.
 */
var OAuth2 = module.exports = function(options) {
  if (options.authzServiceUrl && options.tokenServiceUrl) {
    this.loginUrl = options.authzServiceUrl.split('/').slice(0, 3).join('/');
    this.authzServiceUrl = options.authzServiceUrl;
    this.tokenServiceUrl = options.tokenServiceUrl;
    this.revokeServiceUrl = options.revokeServiceUrl;
  } else {
    this.loginUrl = options.loginUrl || defaults.loginUrl;
    this.authzServiceUrl = this.loginUrl + "/services/oauth2/authorize";
    this.tokenServiceUrl = this.loginUrl + "/services/oauth2/token";
    this.revokeServiceUrl = this.loginUrl + "/services/oauth2/revoke";
  }
  this.clientId = options.clientId;
  this.clientSecret = options.clientSecret;
  this.redirectUri = options.redirectUri;
  this._transport =
    options.proxyUrl ? new Transport.ProxyTransport(options.proxyUrl) : new Transport();
};



/**
 *
 */
_.extend(OAuth2.prototype, /** @lends OAuth2.prototype **/ {
  
  /**
   * Get Salesforce OAuth2 authorization page URL to redirect user agent.
   *
   * @param {Object} params - Parameters
   * @param {String} params.scope - Scope values in space-separated string
   * @param {String} params.state - State parameter
   * @returns {String} Authorization page URL
   */
  getAuthorizationUrl : function(params) {
    params = _.extend({
      response_type : "code",
      client_id : this.clientId,
      redirect_uri : this.redirectUri
    }, params || {});
    return this.authzServiceUrl + 
      (this.authzServiceUrl.indexOf('?') >= 0 ? "&" : "?") + 
      querystring.stringify(params);
  },

  /**
   * @typedef TokenResponse
   * @type {Object}
   * @property {String} access_token
   * @property {String} refresh_token
   */

  /**
   * OAuth2 Refresh Token Flow
   * 
   * @param {String} refreshToken - Refresh token
   * @param {Callback.<TokenResponse>} [callback] - Callback function
   * @returns {Promise.<TokenResponse>}
   */
  refreshToken : function(refreshToken, callback) {
    return this._postParams({
      grant_type : "refresh_token",
      refresh_token : refreshToken,
      client_id : this.clientId,
      client_secret : this.clientSecret
    }, callback);
  },

  /**
   * OAuth2 Web Server Authentication Flow (Authorization Code)
   * Access Token Request
   *
   * @param {String} code - Authorization code
   * @param {Callback.<TokenResponse>} [callback] - Callback function
   * @returns {Promise.<TokenResponse>}
   */
  requestToken : function(code, callback) {
    return this._postParams({
      grant_type : "authorization_code",
      code : code,
      client_id : this.clientId,
      client_secret : this.clientSecret,
      redirect_uri : this.redirectUri
    }, callback);
  },

  /**
   * OAuth2 Username-Password Flow (Resource Owner Password Credentials)
   *
   * @param {String} username - Salesforce username
   * @param {String} password - Salesforce password 
   * @param {Callback.<TokenResponse>} [callback] - Callback function
   * @returns {Promise.<TokenResponse>}
   */
  authenticate : function(username, password, callback) {
    return this._postParams({
      grant_type : "password",
      username : username,
      password : password,
      client_id : this.clientId,
      client_secret : this.clientSecret,
      redirect_uri : this.redirectUri
    }, callback);
  },

  /**
   * OAuth2 Revoke Session Token
   *
   * @param {String} accessToken - Access token to revoke
   * @param {Callback.<undefined>} [callback] - Callback function
   * @returns {Promise.<undefined>}
   */
  revokeToken : function(accessToken, callback) {
    return this._transport.httpRequest({
      method : 'POST',
      url : this.revokeServiceUrl,
      body: querystring.stringify({ token: accessToken }),
      headers: {
        "content-type" : "application/x-www-form-urlencoded"
      }
    }).then(function(response) {
      if (response.statusCode >= 400) {
        var res = querystring.parse(response.body);
        if (!res || !res.error) {
          res = { error: "ERROR_HTTP_"+response.statusCode, error_description: response.body };
        }
        var err = new Error(res.error_description);
        err.name = res.error;
        throw err;
      }
    }).thenCall(callback);
  },

  /**
   * @private
   */
  _postParams : function(params, callback) {
    return this._transport.httpRequest({
      method : 'POST',
      url : this.tokenServiceUrl,
      body : querystring.stringify(params),
      headers : {
        "content-type" : "application/x-www-form-urlencoded"
      }
    }).then(function(response) {
      var res;
      try {
        res = JSON.parse(response.body);
      } catch(e) {}
      if (response.statusCode >= 400) {
        res = res || { error: "ERROR_HTTP_"+response.statusCode, error_description: response.body };
        var err = new Error(res.error_description);
        err.name = res.error;
        throw err;
      }
      return res;
    }).thenCall(callback);
  }

});

},{"./transport":28,"querystring":42,"underscore":63}],21:[function(require,module,exports){
(function (process){
/*global process*/
var Q = require('q'),
    _ = require('underscore')._;

/**
 * Promises/A+ spec compliant class, with a little extension
 * http://promises-aplus.github.io/promises-spec/
 *
 * @class Promise
 * @constructor
 * @param {Promise.<T>|T} o - Object to wrap with promise
 * @template T
 */
var Promise = function(o) {
  this._promise = Q(o);
};

/**
 * @callback FulfilledCallback
 * @param {T} result - Fulfilled value
 * @returns {S}
 * @template T,S
 */

/**
 * @callback RejectedCallback
 * @param {Error} reason - Rejected reason
 * @returns {S}
 * @template S
 */

/**
 * The "then" method from the Promises/A+ specification
 *
 * @param {FulfilledCallback.<T, S1>} [onFulfilled]
 * @param {RejectedCallback.<S2>} [onRejected]
 * @returns {Promise.<S1|S2>}
 */
Promise.prototype.then = function() {
  // Delegate Q promise implementation and wrap by our Promise instance
  return new Promise(this._promise.then.apply(this._promise, arguments));
};

/**
 * Call "then" using given node-style callback function
 *
 * @param {Callback.<T>} [callback] - Callback function
 * @returns {Promise}
 */
Promise.prototype.thenCall = function(callback) {
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
 * A sugar method, equivalent to promise.then(undefined, onRejected).
 *
 * @param {RejectedCallback.<S>} onRejected
 * @returns {Promise.<S>}
 */
Promise.prototype.fail = function() {
  return new Promise(this._promise.fail.apply(this._promise, arguments));
};

/**
 * Alias for completion
 *
 * @param {FulfilledCallback.<T, S>} [onFulfilled]
 * @returns {Promise.<S>}
 */
Promise.prototype.done = function() {
  return new Promise(this._promise.done.apply(this._promise, arguments));
};

/**
 * @param {...Promise.<*>} p
 */
Promise.when = function() {
  return new Promise(Q.when.apply(Q, arguments));
};

/**
 * Returns rejecting promise with given reason
 *
 * @param {Error} reason - Rejecting reason
 * @returns {Promise}
 */
Promise.reject = function(reason) {
  return new Promise(Q.reject(reason));
};

/**
 * Returns a promise that is fulfilled with an array containing the fulfillment value of each promise, 
 * or is rejected with the same rejection reason as the first promise to be rejected.
 *
 * @param {Array.<Promise.<*>|*>} promises
 * @returns {Promise.<Array.<*>>}
 */
Promise.all = function() {
  return new Promise(Q.all.apply(Q, arguments));
};

/**
 * Returns a deferred object
 *
 * @returns {Deferred}
 */
Promise.defer = function() {
  return new Deferred();
};

/**
 * Deferred object
 *
 * @protected
 * @constructor
 */
var Deferred = function() {
  this._deferred = Q.defer();
  this.promise = new Promise(this._deferred.promise);
};

/**
 * Resolve promise
 * @param {*} result - Resolving result
 */
Deferred.prototype.resolve = function() {
  return this._deferred.resolve.apply(this._promise, arguments);
};

/**
 * Reject promise
 * @param {Error} error - Rejecting reason
 */
Deferred.prototype.reject = function() {
  return this._deferred.reject.apply(this._promise, arguments);
};

/**
 *
 */
module.exports = Promise;

}).call(this,require('_process'))
},{"_process":39,"q":48,"underscore":63}],22:[function(require,module,exports){
(function (process){
/*global process*/
/**
 * @file Manages query for records in Salesforce 
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var util   = require('util'),
    events = require('events'),
    _      = require('underscore')._,
    Q      = require('q'),
    Promise = require('./promise'),
    SfDate = require("./date"),
    SOQLBuilder = require("./soql-builder"),
    RecordStream = require("./record-stream");

/**
 * Query (extends RecordStream implements Receivable)
 *
 * @protected
 * @class
 * @extends RecordStream
 * @implements Promise.<T>
 * @template T
 * @param {Connection} conn - Connection object
 * @param {Object|String} config - Query config object or SOQL string
 * @param {String} [locator] - Locator string to fetch next record set
 */
var Query = module.exports = function(conn, config, locator) {
  Query.super_.apply(this);
  this.receivable = true;

  this._conn = conn;
  if (config) {
    if (_.isString(config)) { // if query config is string, it is given in SOQL.
      this._soql = config;
    } else {
      this._config = config;
      this.select(config.fields);
      if (config.includes) {
        this.include(config.includes);
      }
    }
  }
  if (locator && locator.indexOf("/") >= 0) { // if locator given in url for next records
    locator = locator.split("/").pop();
  }
  this._locator = locator;
  this._buffer = [];
  this._paused = true;
  this._closed = false;

  this._deferred = Q.defer();
};

util.inherits(Query, RecordStream);

/**
 * Select fields to include in the returning result
 * 
 * @param {Object|Array.<String>|String} fields - Fields to fetch. Format can be in JSON object (MongoDB-like), array of field names, or comma-separated field names.
 * @returns {Query.<T>}
 */
Query.prototype.select = function(fields) {
  if (this._soql) {
    throw Error("Cannot set select fields for the query which has already built SOQL.");
  }
  fields = fields || '*';
  if (_.isString(fields)) {
    fields = fields.split(/\s*,\s*/);
  } else if (_.isObject(fields) && !_.isArray(fields)) {
    var _fields =  [];
    for (var k in fields) {
      if (fields[k]) { _fields.push(k); }
    }
    fields = _fields;
  }
  this._config.fields = fields;
  return this;
};

/**
 * Set query conditions to filter the result records
 *
 * @param {Object|String} conditions - Conditions in JSON object (MongoDB-like), or raw SOQL WHERE clause string.
 * @returns {Query.<T>}
 */
Query.prototype.where = function(conditions) {
  if (this._soql) {
    throw Error("Cannot set where conditions for the query which has already built SOQL.");
  }
  this._config.conditions = conditions;
  return this;
};

/**
 * Limit the returning result
 *
 * @param {Number} limit - Maximum number of records the query will return.
 * @returns {Query.<T>}
 */
Query.prototype.limit = function(limit) {
  if (this._soql) {
    throw Error("Cannot set limit for the query which has already built SOQL.");
  }
  this._config.limit = limit;
  return this;
};

/**
 * Synonym of Query#skip()
 *
 * @method Query#offset
 * @param {Number} offset - Offset number where begins returning results.
 * @returns {Query.<T>}
 */
/**
 * Skip records
 *
 * @method Query#offset
 * @param {Number} offset - Offset number where begins returning results.
 * @returns {Query.<T>}
 */
Query.prototype.skip =
Query.prototype.offset = function(offset) {
  if (this._soql) {
    throw Error("Cannot set skip/offset for the query which has already built SOQL.");
  }
  this._config.offset = offset;
  return this;
};

/**
 * Synonym of Query#sort()
 *
 * @memthod Query#orderby
 * @param {String|Object} sort - Sorting field or hash object with field name and sord direction
 * @param {String|Number} [dir] - Sorting direction (ASC|DESC|1|-1)
 * @returns {Query.<T>}
 */
/**
 * Set query sort with direction
 *
 * @method Query#sort
 * @param {String|Object} sort - Sorting field or hash object with field name and sord direction
 * @param {String|Number} [dir] - Sorting direction (ASC|DESC|1|-1)
 * @returns {Query.<T>}
 */
Query.prototype.sort =
Query.prototype.orderby = function(sort, dir) {
  if (this._soql) {
    throw Error("Cannot set sort for the query which has already built SOQL.");
  }
  if (_.isString(sort) && _.isString(dir)) {
    sort = [ [ sort, dir ] ];
  }
  this._config.sort = sort;
  return this;
};

/**
 * Include child relationship query
 *
 * @param {String} childRelName - Child relationship name to include in query result
 * @param {Object|String} [conditions] - Conditions in JSON object (MongoDB-like), or raw SOQL WHERE clause string.
 * @param {Object|Array.<String>|String} [fields] - Fields to fetch. Format can be in JSON object (MongoDB-like), array of field names, or comma-separated field names.
 * @param {Object} [options] - Query options.
 * @param {Number} [options.limit] - Maximum number of records the query will return.
 * @param {Number} [options.offset] - Offset number where begins returning results.
 * @param {Number} [options.skip] - Synonym of options.offset.
 * @returns {Query~SubQuery}
 */
Query.prototype.include = function(childRelName, conditions, fields, options) {
  if (this._soql) {
    throw Error("Cannot include child relationship into the query which has already built SOQL.");
  }
  if (_.isObject(childRelName)) {
    var includes = childRelName;
    for (var crname in includes) {
      var config = includes[crname];
      this.include(crname, config.conditions, config.fields, config);
    }
    return;
  }
  var childConfig = {
    table: childRelName,
    conditions: conditions,
    fields: fields,
    limit: options && options.limit,
    offset: options && (options.offset || options.skip)
  };
  this._config.includes = this._config.includes || [];
  this._config.includes.push(childConfig);
  var childQuery = new SubQuery(this._conn, this, childConfig);
  this._children = this._children || [];
  this._children.push(childQuery);
  return childQuery;
};


/** @private **/
Query.prototype._maxFetch = 10000;
/**
 * Setting maxFetch query option
 *
 * @param {Number} maxFetch - Max fetching records in auto fetch mode
 * @returns {Query.<T>}
 */
Query.prototype.maxFetch = function(maxFetch) {
  this._maxFetch = maxFetch;
  return this;
};

/** @private **/
Query.prototype._autoFetch = false;
/**
 * Switching auto fetch mode
 *
 * @param {Boolean} autoFetch - Using auto fetch mode or not
 * @returns {Query.<T>}
 */
Query.prototype.autoFetch = function(autoFetch) {
  this._autoFetch = autoFetch;
  return this;
};

/** @private **/
Query.prototype._scanAll = false;
/**
 * Set flag to scan all records including deleted and archived.
 *
 * @param {Boolean} scanAll - Flag whether include deleted/archived record or not. Default is false.
 * @returns {Query.<T>}
 */
Query.prototype.scanAll = function(scanAll) {
  this._scanAll = scanAll;
  return this;
};

/**
 * @private
 */
var ResponseTargets = Query.ResponseTargets = {};
[ "QueryResult", "Records", "SingleRecord", "Count" ].forEach(function(f) {
  ResponseTargets[f] = f;
});

/** @private **/
Query.prototype._responseTarget = ResponseTargets.QueryResult;
/**
 * @protected
 * @param {String} responseTarget - Query response target
 * @returns {Query.<S>}
 */
Query.prototype.setResponseTarget = function(responseTarget) {
  if (responseTarget in ResponseTargets) {
    this._responseTarget = responseTarget;
  }
  return this;
};


/**
 * Pause record fetch
 * @override
 */
Query.prototype.pause = function() {
  this._paused = true;
};

/**
 * Resume record fetch and query execution
 * @override
 */
Query.prototype.resume = function() {
  if (this._closed) {
    throw new Error("resuming already closed stream");
  }
  if (!this._paused) { 
    return;
  } // do nothing if not paused
  this._paused = false;
  while (!this._paused && this._buffer.length > 0) {
    if (this.totalFetched >= this._maxFetch) {
      this.close();
      return;
    }
    var record = this._buffer.shift();
    this.emit('record', record, this.totalFetched++, this);
  }
  if (!this._paused) {
    if (this._finished) {
      this.close();
    } else {
      this.execute({ autoFetch : true });
    }
  }
};

/**
 * Closing query. No operation for query is allowed after closing.
 */
Query.prototype.close = function() {
  this.pause();
  this._closed = true;
  this.emit('end', this);
};

/**
 * Synonym of Query#execute()
 *
 * @method Query#run
 * @param {Object} [options] - Query options
 * @param {Boolean} [options.autoFetch] - Using auto fetch mode or not
 * @param {Number} [options.maxFetch] - Max fetching records in auto fetch mode
 * @param {Callback.<T>} [callback] - Callback function
 * @returns {Query.<T>}
 */
Query.prototype.run = 
/**
 * Synonym of Query#execute()
 *
 * @method Query#exec
 * @param {Object} [options] - Query options
 * @param {Boolean} [options.autoFetch] - Using auto fetch mode or not
 * @param {Number} [options.maxFetch] - Max fetching records in auto fetch mode
 * @param {Callback.<T>} [callback] - Callback function
 * @returns {Query.<T>}
 */
Query.prototype.exec = 
/**
 * Execute query and fetch records from server.
 *
 * @method Query#execute
 * @param {Object} [options] - Query options
 * @param {Boolean} [options.autoFetch] - Using auto fetch mode or not
 * @param {Number} [options.maxFetch] - Max fetching records in auto fetch mode
 * @param {Callback.<T>} [callback] - Callback function
 * @returns {Query.<T>}
 */
Query.prototype.execute = function(options, callback) {
  var self = this;
  var logger = this._conn._logger;
  var deferred = this._deferred;

  if (this._closed) {
    deferred.reject(new Error("executing already closed query"));
    return this;
  }
  this._paused = false; // mark pause flag to false

  if (typeof options === "function") {
    callback = options;
    options = {};
  }
  options = options || {};
  options = {
    responseTarget: options.responseTarget || self._responseTarget,
    autoFetch: options.autoFetch || self._autoFetch,
    maxFetch: options.maxFetch || self._maxFetch,
    scanAll: options.scanAll || self._scanAll
  };

  // callback and promise resolution;
  var promiseCallback = function(err, res) {
    if (_.isFunction(callback)) {
      try {
        res = callback(err, res);
        err = null;
      } catch(e) {
        err = e;
      }
    }
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(res);
    }
  };
  this.once('response', function(res) {
    promiseCallback(null, res);
  });
  this.once('error', function(err) {
    promiseCallback(err);
  });

  // collect fetched records in array
  // only when response target is Records and
  // either callback or chaining promises are available to this query.
  this.once('fetch', function() {
    if (options.responseTarget === ResponseTargets.Records && (self._chaining || callback)) {
      logger.debug('--- collecting all fetched records ---');
      var records = [];
      var onRecord = function(record) { records.push(record); };
      self.on('record', onRecord);
      self.once('end', function() {
        self.removeListener('record', onRecord);
        self.emit('response', records, self);
      });
    }
  });

  // start actual query
  logger.debug('>>> Query start >>>');
  this._execute(options).then(function() {
    logger.debug('*** Query finished ***');
  }).fail(function(err) {
    logger.debug('--- Query error ---');
    self.emit('error', err);
  });

  // return Query instance for chaining
  return this;
};

/**
 * @private
 */
Query.prototype._execute = function(options) {
  var self = this;
  var logger = this._conn._logger;
  var responseTarget = options.responseTarget;
  var autoFetch = options.autoFetch;
  var maxFetch = options.maxFetch;
  var scanAll = options.scanAll;

  return new Promise(
    self._locator ?
    self._conn._baseUrl() + "/query/" + self._locator :
    new Promise(self._soql ||
      self._expandFields().then(function() { return SOQLBuilder.createSOQL(self._config); })
    ).then(function(soql) {
      self.totalFetched = 0;
      logger.debug("SOQL = " + soql);
      return self._conn._baseUrl() + "/" + (scanAll ? "queryAll" : "query") + "?q=" + encodeURIComponent(soql);
    })
  ).then(function(url) {
    return self._conn._request(url);
  }).then(function(data) {
    self.emit("fetch");
    self.totalSize = data.totalSize;
    var res;
    switch(responseTarget) {
      case ResponseTargets.SingleRecord:
        res = data.records && data.records.length > 0 ? data.records[0] : null;
        break;
      case ResponseTargets.Records:
        res = data.records;
        break;
      case ResponseTargets.Count:
        res = data.totalSize;
        break;
      default:
        res = data;
    }
    // only fire response event when it should be notified per fetch
    if (responseTarget !== ResponseTargets.Records) {
      self.emit("response", res, self);
    }

    // streaming record instances
    for (var i=0, l=data.records.length; i<l; i++) {
      if (self.totalFetched >= maxFetch) {
        self._finished = true;
        break;
      }
      var record = data.records[i];
      if (self._paused) {
        self._buffer.push(record);
      } else {
        self.emit('record', record, self.totalFetched++, self);
      }
    }
    self._finished = self._finished || data.done;
    if (data.nextRecordsUrl) {
      self._locator = data.nextRecordsUrl.split('/').pop();
    }
    if (autoFetch && !self._finished) {
      if (!self._paused) {
        return self._execute(options);
      }
    } else {
      if (!self._paused) { self.close(); }
    }
    return res;
  });
};

/**
 * @private
 */
Query.prototype._expandFields = function() {
  if (this._soql) {
    return Promise.reject(new Error("Cannot expand fields for the query which has already built SOQL."));
  }
  var self = this;
  var logger = self._conn._logger;
  var conn = this._conn;
  var table = this._config.table;
  var fields = this._config.fields || [];

  logger.debug('_expandFields: table = ' + table + ', fields = ' + fields.join(', '));

  return Promise.all([
    new Promise(self._parent ? findRelationTable(table) : table)
      .then(function(table) {
        return Promise.all(
          _.map(fields, function(field) { return expandAsteriskField(table, field); })
        ).then(function(expandedFields) {
          self._config.fields = _.flatten(expandedFields);
        });
      }),
    Promise.all(
      _.map(self._children || [], function(childQuery) {
        return childQuery._expandFields();
      })
    )
  ])

  function findRelationTable(rname) {
    var ptable = self._parent._config.table;
    logger.debug('finding table for relation "' + rname + '" in "' + ptable + '"...');
    return describeCache(ptable).then(function(sobject) {
      var upperRname = rname.toUpperCase();
      var childRelation = _.find(sobject.childRelationships, function(cr) {
        return (cr.relationshipName || '').toUpperCase() === upperRname;
      });
      return childRelation ? childRelation.childSObject :
        Promise.reject(new Error("No child relationship found: " + rname ));
    });
  }

  function describeCache(table) {
    logger.debug('describe cache: '+table);
    var deferred = Promise.defer();
    conn.describe$(table, function(err, sobject) {
      logger.debug('... done.');
      if (err) { deferred.reject(err); }
      else { deferred.resolve(sobject); }
    });
    return deferred.promise;
  }

  function expandAsteriskField(table, field) {
    logger.debug('expanding field "'+ field + '" in "' + table + '"...');
    var fpath = field.split('.');
    return fpath[fpath.length - 1] === '*' ?
      describeCache(table).then(function(sobject) {
        logger.debug('table '+table+'has been described');
        if (fpath.length > 1) {
          var rname = fpath.shift();
          var rfield = _.find(sobject.fields, function(f) {
            return f.relationshipName &&
                   f.relationshipName.toUpperCase() === rname.toUpperCase();
          });
          if (rfield) {
            var rtable = rfield.referenceTo.length === 1 ? rfield.referenceTo[0] : 'Name';
            return expandAsteriskField(rtable, fpath.join('.')).then(function(fpaths) {
              return _.map(fpaths, function(fpath) { return rname + '.' + fpath; });
            });
          } else {
            return [];
          }
        } else {
          return _.map(sobject.fields, function(f) { return f.name; });
        }
      }) :
      new Promise([ field ]);
  }
};

/**
 * Auto start query when pipe() is called.
 * @override
 */
Query.prototype.pipe = function() {
  var dest = RecordStream.prototype.pipe.apply(this, arguments);
  this.resume();
  return dest;
};

/**
 * Synonym of Query#destroy()
 *
 * @method Query#delete
 * @param {String} [type] - SObject type. Required for SOQL based query object.
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
 * @returns {Bulk~Batch}
 */
/**
 * Synonym of Query#destroy()
 *
 * @method Query#del
 * @param {String} [type] - SObject type. Required for SOQL based query object.
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
 * @returns {Bulk~Batch}
 */
/**
 * Bulk delete queried records
 *
 * @method Query#destroy
 * @param {String} [type] - SObject type. Required for SOQL based query object.
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
 * @returns {Bulk~Batch}
 */
Query.prototype["delete"] =
Query.prototype.del =
Query.prototype.destroy = function(type, callback) {
  if (typeof type === 'function') {
    callback = type;
    type = null;
  }
  type = type || (this._config && this._config.table);
  if (!type) {
    throw new Error("SOQL based query needs SObject type information to bulk delete.");
  }
  return this.pipe(this._conn.sobject(type).deleteBulk(callback));
};

/**
 * Bulk update queried records, using given mapping function/object
 *
 * @param {Record|RecordMapFunction} mapping - Mapping record or record mapping function
 * @param {String} [type] - SObject type. Required for SOQL based query object.
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
 * @returns {Bulk~Batch}
 */
Query.prototype.update = function(mapping, type, callback) {
  if (typeof type === 'function') {
    callback = type;
    type = null;
  }
  type = type || (this._config && this._config.table);
  if (!type) {
    throw new Error("SOQL based query needs SObject type information to bulk update.");
  }
  var updateStream = _.isFunction(mapping) ? RecordStream.map(mapping) : RecordStream.recordMapStream(mapping);
  return this.pipe(updateStream).pipe(this._conn.sobject(type).updateBulk(callback));
};

/**
 * Promise/A+ interface
 * http://promises-aplus.github.io/promises-spec/
 *
 * Delegate to deferred promise, return promise instance for query result
 *
 * @param {FulfilledCallback.<T, S1>} [onFulfilled]
 * @param {RejectedCallback.<S2>} [onRejected]
 * @returns {Promise.<S1|S2>}
 */
Query.prototype.then = function(onResolved, onReject) {
  this._chaining = true;
  if (!this._closed && this._paused) { this.execute(); }
  return this._deferred.promise.then.apply(this._deferred.promise, arguments);
};

/**
 * Promise/A+ extension
 * Call "then" using given node-style callback function
 *
 * @param {Callback.<T>} [callback] - Callback function
 * @returns {Query}
 */
Query.prototype.thenCall = function(callback) {
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

/*--------------------------------------------*/

/**
 * SubQuery object for representing child relationship query
 *
 * @protected
 * @class Query~SubQuery
 * @extends Query
 * @param {Connection} conn - Connection object
 * @param {Query} parent - Parent query object
 * @param {Object} config - Sub query configuration
 */
var SubQuery = function(conn, parent, config) {
  SubQuery.super_.call(this, conn, config);
  this._parent = parent;
};

util.inherits(SubQuery, Query);

/**
 * @method Query~SubQuery#include
 * @override
 */
SubQuery.prototype.include = function() {
  throw new Error("Not allowed to include another subquery in subquery.");
};

/**
 * Back the context to parent query object
 *
 * @method Query~SubQuery#end
 * @returns {Query}
 */
SubQuery.prototype.end = function() {
  return this._parent;
};

/**
 * If execute is called in subquery context, delegate it to parent query object
 *
 * @method Query~SubQuery#execute
 * @override
 */
SubQuery.prototype.run =
SubQuery.prototype.exec =
SubQuery.prototype.execute = function() {
  return this._parent.execute.apply(this._parent, arguments);
};

}).call(this,require('_process'))
},{"./date":17,"./promise":21,"./record-stream":23,"./soql-builder":27,"_process":39,"events":37,"q":48,"underscore":63,"util":46}],23:[function(require,module,exports){
/**
 * @file Represents stream that handles Salesforce record as stream data
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var events = require('events'),
    Stream = require('stream'),
    PassThrough = Stream.PassThrough,
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
    this.receivable = false;
  });
  this.on('end', function() {
    this.receivable = false;
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
var CSVStream = RecordStream.CSVStream = function(config, stream) {
  config = config || {};
  this.headers = config.headers;
  this.nullValue = config.nullValue;
  this.wroteHeaders = false;
  this.sendable = true;
  this.receivable = true;
  this._stream = stream || new PassThrough();
  this._buffer = [];
  var self = this;
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
  this.sendable = false; // ignore incoming CSV data from stream
  if (!this.wroteHeaders) {
    if (!this.headers) {
      this.headers = CSV.extractHeaders([ record ]);
    }
    this._stream.emit("data", CSV.arrayToCSV(this.headers) + "\n");
    this.wroteHeaders = true;
  }
  this._stream.emit("data", CSV.recordToCSV(record, this.headers, { nullValue: this.nullValue }) + "\n");
};

/**
 *
 * @override
 * @method RecordStream.CSVStream#end
 * @param {Record} record - Record object
 */
CSVStream.prototype.end = function(record) {
  if (record) { this.send(record); }
  this.sendable = false;
  this.receivable = false;
  this._stream.emit("end");
};

/**
 * @private
 */
CSVStream.prototype._handleData = function(data, enc) {
  // ignore received CSV input from stream
  if (!this.sendable) { return; }
  this._buffer.push([ data, enc ]);
};

/**
 * @private
 */
CSVStream.prototype._handleEnd = function(data, enc) {
  // ignore received CSV input from stream
  if (!this.sendable || this.listeners('record').length === 0) { return; }
  if (data) {
    this._buffer.push([ data, enc ]);
  }
  data = this._buffer.map(function(d) {
    return d[0].toString(d[1] || 'utf-8');
  }).join('');
  var records = CSV.parseCSV(data);
  records.forEach(function(record) {
    this.emit('record', record);
  }, this);
  this.emit('end');
};

/**
 * Get delegating Node.js stream
 * @override
 * @method RecordStream.CSVStream#stream
 */
CSVStream.prototype.stream = function() {
  return this._stream;
};


},{"./csv":16,"events":37,"stream":43,"underscore":63,"util":46}],24:[function(require,module,exports){
/**
 * @file Represents Salesforce record information
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var _ = require('underscore')._;

/**
 * A simple hash object including record field information
 *
 * @typedef {Object} Record
 */

/**
 * Remote reference to record information
 *
 * @protected
 * @class
 * @constructor
 * @param {Connection} conn - Connection object
 * @param {String} type - SObject type
 * @param {String} id - Record ID
 */
var RecordReference = module.exports = function(conn, type, id) {
  this._conn = conn;
  this.type = type;
  this.id = id;
};

/**
 * Retrieve record field information
 *
 * @param {Object} [options] - Options for rest api.
 * @param {Callback.<Record>} [callback] - Callback function
 * @returns {Promise.<Record>}
 */
RecordReference.prototype.retrieve = function(options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  return this._conn.retrieve(this.type, this.id, options, callback);
};

/**
 * Update record field information
 *
 * @param {Record} record - A Record which includes fields to update
 * @param {Object} [options] - Options for rest api.
 * @param {Callback.<RecordResult>} [callback] - Callback function
 * @returns {Promise.<RecordResult>}
 */
RecordReference.prototype.update = function(record, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  record = _.clone(record);
  record.Id = this.id;
  return this._conn.update(this.type, record, options, callback);
};

/**
 * Synonym of Record#destroy()
 *
 * @method RecordReference#delete
 * @param {Object} [options] - Options for rest api.
 * @param {Callback.<RecordResult>} [callback] - Callback function
 * @returns {Promise.<RecordResult>}
 */
RecordReference.prototype["delete"] =
/**
 * Synonym of Record#destroy()
 *
 * @method RecordReference#del
 * @param {Callback.<RecordResult>} [callback] - Callback function
 * @returns {Promise.<RecordResult>}
 */
RecordReference.prototype.del =
/**
 * Delete record field
 *
 * @method RecordReference#destroy
 * @param {Object} [options] - Options for rest api.
 * @param {Callback.<RecordResult>} [callback] - Callback function
 * @returns {Promise.<RecordResult>}
 */
RecordReference.prototype.destroy = function(options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  return this._conn.destroy(this.type, this.id, options, callback);
};

/**
 * Get blob field as stream
 *
 * @param {String} fieldName - Blob field name
 * @returns {stream.Stream}
 */
RecordReference.prototype.blob = function(fieldName) {
  var url = [ this._conn._baseUrl(), 'sobjects', this.type, this.id, fieldName ].join('/');
  return this._conn._request(url).stream();
};


},{"underscore":63}],25:[function(require,module,exports){
/**
 * @file Manages method call to SOAP endpoint
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var _ = require('underscore'),
    xml2js = require('xml2js'),
    Transport = require('./transport');

/**
 * Class for SOAP endpoint of Salesforce
 *
 * @protected
 * @class
 * @constructor
 * @param {Object} options - SOAP endpoint setting options
 * @param {String} options.serverUrl - SOAP endpoint URL
 * @param {String} options.sessionId - Salesforce session ID
 * @param {String} [options.xmlns] - XML namespace for method call (default is "urn:partner.soap.sforce.com")
 * @param {Transport} [transport] - HTTP request transport instance
 */
var SOAP = module.exports = function(options, transport) {
  this.serverUrl = options.serverUrl;
  this.sessionId = options.sessionId;
  this.xmlns = options.xmlns || 'urn:partner.soap.sforce.com';
  this._transport = transport;
  if (!this._transport) {
    this._transport = options.proxyUrl ? new Transport() : new Transport.ProxyTransport(options.proxyUrl);
  }
};

/**
 * Invoke SOAP call using method and arguments
 * 
 * @param {String} method - Method name
 * @param {Object} args - Arguments for the method call
 * @param {Callback.<Object>} [callback] - Callback function
 * @returns {Promise.<Object>}
 */
SOAP.prototype.invoke = function(method, args, callback) {
  var message = {};
  message[method] = args;
  var soapEnvelope = this._createEnvelope(message);
  return this._transport.httpRequest({
    method: 'POST',
    url: this.serverUrl,
    headers: {
      'Content-Type': 'text/xml',
      'SOAPAction': '""'
    },
    body: soapEnvelope
  }).then(function(res) {
    var ret = null;
    xml2js.parseString(res.body, { explicitArray: false }, function(err, value) { ret = value; });
    if (ret) {
      var error = lookupValue(ret, [ /:Envelope$/, /:Body$/, /:Fault$/, /faultstring$/ ]);
      if (error) {
        throw new Error(error);
      }
      return lookupValue(ret, [ /:Envelope$/, /:Body$/, /.+/ ]);
    }
    throw new Error("invalid response");
  }).thenCall(callback);
};

/**
 * @private
 */
function lookupValue(obj, propRegExps) {
  var regexp = propRegExps.shift();
  if (!regexp) {
    return obj; 
  }
  else {
    for (var prop in obj) {
      if (regexp.test(prop)) {
        return lookupValue(obj[prop], propRegExps);
      }
    }
    return null;
  }
}

/**
 * @private
 */
function toXML(name, value) {
  if (_.isObject(name)) {
    value = name;
    name = null;
  }
  if (_.isArray(value)) {
    return _.map(value, function(v) { return toXML(name, v); }).join('');
  } else {
    var attrs = [];
    var elems = [];
    if (_.isObject(value)) {
      for (var k in value) {
        var v = value[k];
        if (k[0] === '@') {
          k = k.substring(1);
          attrs.push(k + '="' + v + '"');
        } else {
          elems.push(toXML(k, v));
        }
      }
      value = elems.join('');
    } else {
      value = String(value);
    }
    var startTag = name ? '<' + name + (attrs.length > 0 ? ' ' + attrs.join(' ') : '') + '>' : '';
    var endTag = name ? '</' + name + '>' : '';
    return  startTag + value + endTag;
  }
}

/**
 * @private
 */
SOAP.prototype._createEnvelope = function(message) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"',
    ' xmlns:xsd="http://www.w3.org/2001/XMLSchema"',
    ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">',
    '<soapenv:Header xmlns="' + this.xmlns + '">',
      '<SessionHeader>',
      '<sessionId>' + this.sessionId + '</sessionId>',
      '</SessionHeader>',
    '</soapenv:Header>',
    '<soapenv:Body xmlns="' + this.xmlns + '">',
    toXML(message),
    '</soapenv:Body>',
    '</soapenv:Envelope>'
  ].join('');
};

},{"./transport":28,"underscore":63,"xml2js":66}],26:[function(require,module,exports){
/**
 * @file Represents Salesforce SObject
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var _      = require('underscore'),
    Record = require('./record'),
    Query  = require('./query'),
    Cache  = require('./cache');

/**
 * A class for organizing all SObject access
 *
 * @constructor
 */
var SObject = module.exports = function(conn, type) {
  this._conn = conn;
  this.type = type;
  var cacheOptions = { key: "describe." + this.type };
  this.describe$ = conn.cache.makeCacheable(this.describe, this, cacheOptions);
  this.describe = conn.cache.makeResponseCacheable(this.describe, this, cacheOptions);
};

/**
 * Synonym of SObject#create()
 *
 * @method SObject#insert
 * @param {Record|Array.<Record>} records - A record or array of records to create
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
/**
 * Create records
 *
 * @method SObject#create
 * @param {Record|Array.<Record>} records - A record or array of records to create
 * @param {Object} [options] - Options for rest api.
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
SObject.prototype.insert =
SObject.prototype.create = function(records, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  return this._conn.create(this.type, records, options, callback);
};

/**
 * Retrieve specified records
 *
 * @param {String|Array.<String>} ids - A record ID or array of record IDs 
 * @param {Object} [options] - Options for rest api.
 * @param {Callback.<Record|Array.<Record>>} [callback] - Callback function
 * @returns {Promise.<Record|Array.<Record>>}
 */
SObject.prototype.retrieve = function(ids, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  return this._conn.retrieve(this.type, ids, options, callback);
};

/**
 * Update records
 *
 * @param {Record|Array.<Record>} records - A record or array of records to update
 * @param {Object} [options] - Options for rest api.
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
SObject.prototype.update = function(records, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  return this._conn.update(this.type, records, options, callback);
};

/**
 * Upsert records
 *
 * @param {Record|Array.<Record>} records - Record or array of records to upsert
 * @param {String} extIdField - External ID field name
 * @param {Object} [options] - Options for rest api.
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
SObject.prototype.upsert = function(records, extIdField, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  return this._conn.upsert(this.type, records, extIdField, options, callback);
};

/**
 * Synonym of SObject#destroy()
 *
 * @method SObject#delete
 * @param {String|Array.<String>} ids - A ID or array of IDs to delete
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
/**
 * Synonym of SObject#destroy()
 *
 * @method SObject#del
 * @param {String|Array.<String>} ids - A ID or array of IDs to delete
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
/**
 * Delete records
 *
 * @method SObject#destroy
 * @param {String|Array.<String>} ids - A ID or array of IDs to delete
 * @param {Object} [options] - Options for rest api.
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
SObject.prototype["delete"] =
SObject.prototype.del =
SObject.prototype.destroy = function(ids, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  return this._conn.destroy(this.type, ids, options, callback);
};

/**
 * Describe SObject metadata
 *
 * @param {Callback.<DescribeSObjectResult>} [callback] - Callback function
 * @returns {Promise.<DescribeSObjectResult>}
 */
SObject.prototype.describe = function(callback) {
  return this._conn.describe(this.type, callback);
};

/**
 * Get record representation instance by given id
 *
 * @param {String} id - A record ID
 * @returns {RecordReference}
 */
SObject.prototype.record = function(id) {
  return new Record(this._conn, this.type, id);
};

/**
 * Find and fetch records which matches given conditions
 *
 * @param {Object|String} [conditions] - Conditions in JSON object (MongoDB-like), or raw SOQL WHERE clause string.
 * @param {Object|Array.<String>|String} [fields] - Fields to fetch. Format can be in JSON object (MongoDB-like), array of field names, or comma-separated field names.
 * @param {Object} [options] - Query options.
 * @param {Number} [options.limit] - Maximum number of records the query will return.
 * @param {Number} [options.offset] - Offset number where begins returning results.
 * @param {Number} [options.skip] - Synonym of options.offset.
 * @param {Callback.<Array.<Record>>} [callback] - Callback function
 * @returns {Query.<Array.<Record>>}
 */
SObject.prototype.find = function(conditions, fields, options, callback) {
  if (typeof conditions === 'function') {
    callback = conditions;
    conditions = {};
    fields = null;
    options = null;
  } else if (typeof fields === 'function') {
    callback = fields;
    fields = null;
    options = null;
  } else if (typeof options === 'function') {
    callback = options;
    options = null;
  }
  options = options || {};
  var config = {
    fields: fields,
    includes: options.includes,
    table: this.type,
    conditions: conditions,
    limit: options.limit,
    offset: options.offset || options.skip
  };
  var query = new Query(this._conn, config);
  query.setResponseTarget(Query.ResponseTargets.Records);
  if (callback) { query.run(callback); }
  return query;
};

/**
 * Fetch one record which matches given conditions
 *
 * @param {Object|String} [conditions] - Conditions in JSON object (MongoDB-like), or raw SOQL WHERE clause string.
 * @param {Object|Array.<String>|String} [fields] - Fields to fetch. Format can be in JSON object (MongoDB-like), array of field names, or comma-separated field names.
 * @param {Object} [options] - Query options.
 * @param {Number} [options.limit] - Maximum number of records the query will return.
 * @param {Number} [options.offset] - Offset number where begins returning results.
 * @param {Number} [options.skip] - Synonym of options.offset.
 * @param {Callback.<Record>} [callback] - Callback function
 * @returns {Query.<Record>}
 */
SObject.prototype.findOne = function(conditions, fields, options, callback) {
  if (typeof conditions === 'function') {
    callback = conditions;
    conditions = {};
    fields = null;
    options = null;
  } else if (typeof fields === 'function') {
    callback = fields;
    fields = null;
    options = null;
  } else if (typeof options === 'function') {
    callback = options;
    options = null;
  }
  options = _.extend(options || {}, { limit: 1 });
  var query = this.find(conditions, fields, options);
  query.setResponseTarget(Query.ResponseTargets.SingleRecord);
  if (callback) { query.run(callback); }
  return query;
};

/**
 * Find and fetch records only by specifying fields to fetch.
 *
 * @param {Object|Array.<String>|String} [fields] - Fields to fetch. Format can be in JSON object (MongoDB-like), array of field names, or comma-separated field names.
 * @param {Callback.<Array.<Record>>} [callback] - Callback function
 * @returns {Query.<Array.<Record>>}
 */
SObject.prototype.select = function(fields, callback) {
  return this.find(null, fields, null, callback);
};

/**
 * Count num of records which matches given conditions
 *
 * @param {Object|String} [conditions] - Conditions in JSON object (MongoDB-like), or raw SOQL WHERE clause string.
 * @param {Callback.<Number>} [callback] - Callback function
 * @returns {Query.<Number>}
 */
SObject.prototype.count = function(conditions, callback) {
  if (typeof conditions === 'function') {
    callback = conditions;
    conditions = {};
  }
  var query = this.find(conditions, { "count()" : true });
  query.setResponseTarget("Count");
  if (callback) { query.run(callback); }
  return query;
};


/**
 * Call Bulk#load() to execute bulkload, returning batch object
 *
 * @param {String} operation - Bulk load operation ('insert', 'update', 'upsert', 'delete', or 'hardDelete')
 * @param {Object} [options] - Options for bulk loading operation
 * @param {String} [options.extIdField] - External ID field name (used when upsert operation).
 * @param {Array.<Record>|stream.Stream|String} [input] - Input source for bulkload. Accepts array of records, CSv string, and CSV data input stream.
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
 * @returns {Bulk~Batch}
 */
SObject.prototype.bulkload = function(operation, options, input, callback) {
  return this._conn.bulk.load(this.type, operation, options, input, callback);
};

/**
 * Synonym of SObject#createBulk()
 *
 * @method SObject#insertBulk
 * @param {Array.<Record>|stream.Stream|String} [input] - Input source for bulk insert. Accepts array of records, CSv string, and CSV data input stream.
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
 * @returns {Bulk~Batch}
 */
/**
 * Bulkly insert input data using bulk API
 *
 * @method SObject#createBulk
 * @param {Array.<Record>|stream.Stream|String} [input] - Input source for bulk insert. Accepts array of records, CSv string, and CSV data input stream.
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
 * @returns {Bulk~Batch}
 */
SObject.prototype.insertBulk =
SObject.prototype.createBulk = function(input, callback) {
  return this.bulkload("insert", input, callback);
};

/**
 * Bulkly update records by input data using bulk API
 *
 * @param {Array.<Record>|stream.Stream|String} [input] - Input source for bulk update Accepts array of records, CSv string, and CSV data input stream.
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
 * @returns {Bulk~Batch}
 */
SObject.prototype.updateBulk = function(input, callback) {
  return this.bulkload("update", input, callback);
};

/**
 * Bulkly upsert records by input data using bulk API
 *
 * @param {Array.<Record>|stream.Stream|String} [input] - Input source for bulk upsert. Accepts array of records, CSv string, and CSV data input stream.
 * @param {String} [options.extIdField] - External ID field name
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
 * @returns {Bulk~Batch}
 */
SObject.prototype.upsertBulk = function(input, extIdField, callback) {
  return this.bulkload("upsert", { extIdField: extIdField }, input, callback);
};

/**
 * Synonym of SObject#destroyBulk()
 *
 * @method SObject#deleteBulk
 * @param {Array.<Record>|stream.Stream|String} [input] - Input source for bulk delete. Accepts array of records, CSv string, and CSV data input stream.
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
 * @returns {Bulk~Batch}
 */
/**
 * Bulkly delete records specified by input data using bulk API
 *
 * @method SObject#destroyBulk
 * @param {Array.<Record>|stream.Stream|String} [input] - Input source for bulk delete. Accepts array of records, CSv string, and CSV data input stream.
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
 * @returns {Bulk~Batch}
 */
SObject.prototype.deleteBulk =
SObject.prototype.destroyBulk = function(input, callback) {
  return this.bulkload("delete", input, callback);
};

/**
 * Synonym of SObject#destroyHardBulk()
 *
 * @method SObject#deleteHardBulk
 * @param {Array.<Record>|stream.Stream|String} [input] - Input source for bulk delete. Accepts array of records, CSv string, and CSV data input stream.
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
 * @returns {Bulk~Batch}
 */
/**
 * Bulkly hard delete records specified in input data using bulk API
 *
 * @method SObject#destroyHardBulk
 * @param {Array.<Record>|stream.Stream|String} [input] - Input source for bulk delete. Accepts array of records, CSv string, and CSV data input stream.
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
 * @returns {Bulk~Batch}
 */
SObject.prototype.deleteHardBulk =
SObject.prototype.destroyHardBulk = function(input, callback) {
  return this.bulkload("hardDelete", input, callback);
};

/**
 * Retrieve recently accessed records
 *
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<Array.<RecordResult>>}
 */
SObject.prototype.recent = function (callback) {
  return this._conn.recent(this.type, callback);
};

/**
 * Retrieve the updated records
 *
 * @param {String|Date} start - start date or string representing the start of the interval
 * @param {String|Date} end - start date or string representing the end of the interval, must be > start
 * @param {Callback.<UpdatedRecordsInfo>} [callback] - Callback function
 * @returns {Promise.<UpdatedRecordsInfo>}
 */
SObject.prototype.updated = function (start, end, callback) {
  return this._conn.updated(this.type, start, end, callback);
};

/**
 * Retrieve the deleted records
 *
 * @param {String|Date} start - start date or string representing the start of the interval
 * @param {String|Date} end - start date or string representing the end of the interval, must be > start
 * @param {Callback.<DeletedRecordsInfo>} [callback] - Callback function
 * @returns {Promise.<DeletedRecordsInfo>}
 */
SObject.prototype.deleted = function (start, end, callback) {
  return this._conn.deleted(this.type, start, end, callback);
};
},{"./cache":13,"./query":22,"./record":24,"underscore":63}],27:[function(require,module,exports){
/**
 * @file Create and build SOQL string from configuration
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var _      = require("underscore"),
    SfDate = require("./date");


/**
 * Create SOQL
 * @private
 */
function createSOQL(query) {
  var soql = [
    "SELECT ",
    createFieldsClause(query.fields, query.includes),
    " FROM ",
    query.table
  ].join("");
  var cond = createConditionClause(query.conditions);
  if (cond) {
    soql += " WHERE " + cond;
  }
  var orderby = createOrderByClause(query.sort);
  if (orderby) {
    soql += " ORDER BY " + orderby;
  }
  if (query.limit) {
    soql += " LIMIT " + query.limit;
  }
  if (query.offset) {
    soql += " OFFSET " + query.offset;
  }
  return soql;
}

/** @private **/
function createFieldsClause(fields, childQueries) {
  childQueries = _.map(_.values(childQueries || {}), function(cquery) {
    return '(' + createSOQL(cquery) + ')';
  });
  return (fields || [ "Id" ]).concat(childQueries).join(', ');
}

/** @private **/
function createConditionClause(conditions, operator, depth) {
  if (_.isString(conditions)) {
    return conditions;
  }
  conditions = conditions || [];
  operator = operator || "AND";
  depth = depth || 0;
  if (!isArray(conditions)) { // if passed in hash object
    conditions = _.keys(conditions).map(function(key) {
      return {
        key: key,
        value: conditions[key]
      };
    });
  } else {
    conditions = conditions.map(function(cond) {
      var conds = [];
      for (var key in cond) {
        conds.push({
          key: key,
          value: cond[key]
        });
      }
      return conds.length>1 ? conds : conds[0];
    });
  }
  conditions = conditions.map(function(cond) {
    var d = depth+1, op;
    switch (cond.key) {
      case "$or" :
      case "$and" :
      case "$not" :
        if (operator !== "NOT" && conditions.length === 1) {
          d = depth; // not change tree depth
        }
        op = cond.key === "$or" ? "OR" :
             cond.key === "$and" ? "AND" :
             "NOT";
        return createConditionClause(cond.value, op, d);
      default:
        return createFieldExpression(cond.key, cond.value);
    }
  }).filter(function(expr) { return expr; });

  var paren;
  if (operator === 'NOT') {
    paren = depth > 0;
    return (paren ? "(" : "") + "NOT " + conditions[0] + (paren ? ")" : "");
  } else {
    paren = depth > 0 && conditions.length > 1;
    return (paren ? "(" : "") + conditions.join(" "+operator+" ") + (paren ? ")" : "");
  }
}

var opMap = {
  "="     : "=",
  "$eq"   : "=",
  "!="    : "!=",
  "$ne"   : "!=",
  ">"     : ">",
  "$gt"   : ">",
  "<"     : "<",
  "$lt"   : "<",
  ">="    : ">=",
  "$gte"  : ">=",
  "<="    : "<=",
  "$lte"  : "<=",
  "$like" : "LIKE",
  "$nlike" : "NOT LIKE",
  "$in"   : "IN",
  "$nin"  : "NOT IN",
  "$exists" : "EXISTS"
};

/** @private **/
function createFieldExpression(field, value) {
  var op = "$eq";

  // Assume the `$in` operator if value is an array and none was supplied.
  if (_.isArray(value)) { op = "$in"; }
  // Otherwise, if an object was passed then process the supplied ops.
  else if (_.isObject(value)) {
    var _value;
    for (var k in value) {
      if (k[0] === "$") {
        op = k;
        value = value[k];
        break;
      }
    }
  }
  var sfop = opMap[op];
  if (!sfop || _.isUndefined(value)) { return null; }
  var valueExpr = createValueExpression(value);
  if (_.isUndefined(valueExpr)) { return null; }
  switch (sfop) {
    case "NOT LIKE":
      return "(" + [ "NOT", field, 'LIKE', valueExpr ].join(" ") + ")";
    case "EXISTS":
      return [ field, value ? "!=" : "=", "null" ].join(" ");
    default:
      return [ field, sfop, valueExpr ].join(" ");
  }
}

/** @private **/
function createValueExpression(value) {
  if (isArray(value)) {
    return value.length > 0 ?
           "(" + value.map(createValueExpression).join(", ") + ")" :
           undefined;
  }
  if (value instanceof SfDate) {
    return value.toString();
  }
  if (_.isString(value)) {
    return "'" + escapeSOQLString(value) + "'";
  }
  if (_.isNumber(value)) {
    return (value).toString();
  }
  if (_.isNull(value)) {
    return "null";
  }
  return value;
}

/** @private **/
function escapeSOQLString(str) {
  return String(str || '').replace(/'/g, "\\'");
}

/** @private **/
function isArray(a) {
  return _.isObject(a) && _.isFunction(a.pop);
}


/** @private **/
function createOrderByClause(sort) {
  sort = sort || [];
  if (_.isString(sort)) {
    if (/,|\s+(asc|desc)\s*$/.test(sort)) {
      // must be specified in pure "order by" clause. Return raw config.
      return sort;
    }
    // sort order in mongoose-style expression.
    // e.g. "FieldA -FieldB" => "ORDER BY FieldA ASC, FieldB DESC"
    sort = sort.split(/\s+/).map(function(field) {
      var dir = "ASC"; // ascending
      var flag = field[0];
      if (flag === '-') {
        dir = "DESC";
        field = field.substring(1);
      } else if (flag === '+') {
        field = field.substring(1);
      }
      return [ field, dir ];
    });
  } else if (!isArray(sort)) {
    sort = _.keys(sort).map(function(field) {
      var dir = sort[field];
      return [ field, dir ];
    });
  }
  return sort.map(function(s) {
    var field = s[0], dir = s[1];
    switch (String(dir)) {
      case "DESC":
      case "desc":
      case "descending":
      case "-":
      case "-1":
        dir = "DESC";
        break;
      default:
        dir = "ASC";
    }
    return field + " " + dir;
  }).join(", ");
}


exports.createSOQL = createSOQL;


},{"./date":17,"underscore":63}],28:[function(require,module,exports){
(function (process){
/*global process, Sfdc */
var util = require('util'),
    stream = require('stream'),
    Promise = require('./promise');

/* */

var nodeRequest = require('request'),
    xhrRequest = require('./browser/request'),
    canvas = require('./browser/canvas'),
    jsonp = require('./browser/jsonp');

var request, baseUrl;
if (typeof window === 'undefined') {
  var defaults = {
    followAllRedirects: true
  };
  if (process.env.HTTP_PROXY) {
    defaults.proxy = process.env.HTTP_PROXY;
  }
  if (process.env.HTTP_TIMEOUT) {
    defaults.timeout = process.env.HTTP_TIMEOUT;
  }
  request = nodeRequest.defaults(defaults);
  baseUrl = process.env.LOCATION_BASE_URL || "";
} else {
  request = xhrRequest;
  var apiHost = normalizeApiHost(window.location.host);
  baseUrl = apiHost ? "https://" + apiHost : "";
}

/**
 * Add stream() method to promise (and following promise chain), to access original request stream.
 * @private
 */
function streamify(promise, factory) {
  var _then = promise.then;
  promise.then = function() {
    factory();
    var newPromise = _then.apply(promise, arguments);
    return streamify(newPromise, factory);
  };
  promise.stream = factory;
  return promise;
}

/**
 * Normarize Salesforce API host name
 * @private
 */
function normalizeApiHost(apiHost) {
  var m = /(\w+)\.(visual\.force|salesforce)\.com$/.exec(apiHost)
  if (m) {
    apiHost = m[1] + ".salesforce.com";
  }
  return apiHost;
}

/**
 * Class for HTTP request transport
 *
 * @class
 * @protected
 */
var Transport = module.exports = function() {};

/**
 * Make HTTP request, returns promise instead of stream
 *
 * @param {Object} params - HTTP request
 * @param {Callback.<Object>} [callback] - Calback Function
 * @param {Callback.<Object>} [options] - Options
 * @returns {Promise.<Object>}
 */
Transport.prototype.httpRequest = function(params, callback, options) {
  var deferred = Promise.defer();
  var req;
  var httpRequest = request;
  if (options && options.jsonp && jsonp.supported) {
    httpRequest = jsonp.createRequest(options.jsonp);
  } else if (options && options.signedRequest && canvas.supported) {
    httpRequest = canvas.createRequest(options.signedRequest);
  }
  var createRequest = function() {
    if (!req) {
      req = httpRequest(params, function(err, response) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(response);
        }
      });
    }
    return req;
  };
  return streamify(deferred.promise, createRequest).thenCall(callback);
};

/**
 * Class for HTTP request transport using AJAX proxy service
 *
 * @class Transport~ProxyTransport
 * @protected
 * @extends Transport
 * @param {String} proxyUrl - AJAX Proxy server URL
 */
var ProxyTransport = Transport.ProxyTransport = function(proxyUrl) {
  this._proxyUrl = proxyUrl;
};

util.inherits(ProxyTransport, Transport);

/**
 * Make HTTP request via AJAX proxy
 *
 * @method Transport~ProxyTransport#httpRequest
 * @param {Object} params - HTTP request
 * @param {Callback.<Object>} [callback] - Calback Function
 * @returns {Promise.<Object>}
 */
ProxyTransport.prototype.httpRequest = function(params, callback) {
  var url = params.url;
  if (url.indexOf("/") === 0) {
    url = baseUrl + url;
  }
  var proxyParams = {
    method: params.method,
    url: this._proxyUrl + '?' + Date.now() + "." + ("" + Math.random()).substring(2),
    headers: {
      'salesforceproxy-endpoint': url
    }
  };
  if (params.body || params.body === "") {
    proxyParams.body = params.body;
  }
  if (params.headers) {
    for (var name in params.headers) {
      proxyParams.headers[name] = params.headers[name];
    }
  }
  return ProxyTransport.super_.prototype.httpRequest.call(this, proxyParams, callback);
};

}).call(this,require('_process'))
},{"./browser/canvas":8,"./browser/jsonp":11,"./browser/request":12,"./promise":21,"_process":39,"request":31,"stream":43,"util":46}],29:[function(require,module,exports){
// This file is just added for convenience so this repository can be
// directly checked out into a project's deps folder
module.exports = require('./lib/async');

},{"./lib/async":30}],30:[function(require,module,exports){
(function (process){
/*global setTimeout: false, console: false */
(function () {

    var async = {};

    // global on the server, window in the browser
    var root = this,
        previous_async = root.async;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = async;
    }
    else {
        root.async = async;
    }

    async.noConflict = function () {
        root.async = previous_async;
        return async;
    };

    //// cross-browser compatiblity functions ////

    var _forEach = function (arr, iterator) {
        if (arr.forEach) {
            return arr.forEach(iterator);
        }
        for (var i = 0; i < arr.length; i += 1) {
            iterator(arr[i], i, arr);
        }
    };

    var _map = function (arr, iterator) {
        if (arr.map) {
            return arr.map(iterator);
        }
        var results = [];
        _forEach(arr, function (x, i, a) {
            results.push(iterator(x, i, a));
        });
        return results;
    };

    var _reduce = function (arr, iterator, memo) {
        if (arr.reduce) {
            return arr.reduce(iterator, memo);
        }
        _forEach(arr, function (x, i, a) {
            memo = iterator(memo, x, i, a);
        });
        return memo;
    };

    var _keys = function (obj) {
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    //// exported async module functions ////

    //// nextTick implementation with browser-compatible fallback ////
    if (typeof process === 'undefined' || !(process.nextTick)) {
        async.nextTick = function (fn) {
            setTimeout(fn, 0);
        };
    }
    else {
        async.nextTick = process.nextTick;
    }

    async.forEach = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        _forEach(arr, function (x) {
            iterator(x, function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed === arr.length) {
                        callback(null);
                    }
                }
            });
        });
    };

    async.forEachSeries = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        var iterate = function () {
            iterator(arr[completed], function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed === arr.length) {
                        callback(null);
                    }
                    else {
                        iterate();
                    }
                }
            });
        };
        iterate();
    };

    async.forEachLimit = function (arr, limit, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length || limit <= 0) {
            return callback();
        }
        var completed = 0;
        var started = 0;
        var running = 0;

        (function replenish () {
            if (completed === arr.length) {
                return callback();
            }

            while (running < limit && started < arr.length) {
                started += 1;
                running += 1;
                iterator(arr[started - 1], function (err) {
                    if (err) {
                        callback(err);
                        callback = function () {};
                    }
                    else {
                        completed += 1;
                        running -= 1;
                        if (completed === arr.length) {
                            callback();
                        }
                        else {
                            replenish();
                        }
                    }
                });
            }
        })();
    };


    var doParallel = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.forEach].concat(args));
        };
    };
    var doSeries = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.forEachSeries].concat(args));
        };
    };


    var _asyncMap = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (err, v) {
                results[x.index] = v;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    };
    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);


    // reduce only has a series version, as doing reduce in parallel won't
    // work in many situations.
    async.reduce = function (arr, memo, iterator, callback) {
        async.forEachSeries(arr, function (x, callback) {
            iterator(memo, x, function (err, v) {
                memo = v;
                callback(err);
            });
        }, function (err) {
            callback(err, memo);
        });
    };
    // inject alias
    async.inject = async.reduce;
    // foldl alias
    async.foldl = async.reduce;

    async.reduceRight = function (arr, memo, iterator, callback) {
        var reversed = _map(arr, function (x) {
            return x;
        }).reverse();
        async.reduce(reversed, memo, iterator, callback);
    };
    // foldr alias
    async.foldr = async.reduceRight;

    var _filter = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.filter = doParallel(_filter);
    async.filterSeries = doSeries(_filter);
    // select alias
    async.select = async.filter;
    async.selectSeries = async.filterSeries;

    var _reject = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (!v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.reject = doParallel(_reject);
    async.rejectSeries = doSeries(_reject);

    var _detect = function (eachfn, arr, iterator, main_callback) {
        eachfn(arr, function (x, callback) {
            iterator(x, function (result) {
                if (result) {
                    main_callback(x);
                    main_callback = function () {};
                }
                else {
                    callback();
                }
            });
        }, function (err) {
            main_callback();
        });
    };
    async.detect = doParallel(_detect);
    async.detectSeries = doSeries(_detect);

    async.some = function (arr, iterator, main_callback) {
        async.forEach(arr, function (x, callback) {
            iterator(x, function (v) {
                if (v) {
                    main_callback(true);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(false);
        });
    };
    // any alias
    async.any = async.some;

    async.every = function (arr, iterator, main_callback) {
        async.forEach(arr, function (x, callback) {
            iterator(x, function (v) {
                if (!v) {
                    main_callback(false);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(true);
        });
    };
    // all alias
    async.all = async.every;

    async.sortBy = function (arr, iterator, callback) {
        async.map(arr, function (x, callback) {
            iterator(x, function (err, criteria) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, {value: x, criteria: criteria});
                }
            });
        }, function (err, results) {
            if (err) {
                return callback(err);
            }
            else {
                var fn = function (left, right) {
                    var a = left.criteria, b = right.criteria;
                    return a < b ? -1 : a > b ? 1 : 0;
                };
                callback(null, _map(results.sort(fn), function (x) {
                    return x.value;
                }));
            }
        });
    };

    async.auto = function (tasks, callback) {
        callback = callback || function () {};
        var keys = _keys(tasks);
        if (!keys.length) {
            return callback(null);
        }

        var results = {};

        var listeners = [];
        var addListener = function (fn) {
            listeners.unshift(fn);
        };
        var removeListener = function (fn) {
            for (var i = 0; i < listeners.length; i += 1) {
                if (listeners[i] === fn) {
                    listeners.splice(i, 1);
                    return;
                }
            }
        };
        var taskComplete = function () {
            _forEach(listeners.slice(0), function (fn) {
                fn();
            });
        };

        addListener(function () {
            if (_keys(results).length === keys.length) {
                callback(null, results);
                callback = function () {};
            }
        });

        _forEach(keys, function (k) {
            var task = (tasks[k] instanceof Function) ? [tasks[k]]: tasks[k];
            var taskCallback = function (err) {
                if (err) {
                    callback(err);
                    // stop subsequent errors hitting callback multiple times
                    callback = function () {};
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    taskComplete();
                }
            };
            var requires = task.slice(0, Math.abs(task.length - 1)) || [];
            var ready = function () {
                return _reduce(requires, function (a, x) {
                    return (a && results.hasOwnProperty(x));
                }, true) && !results.hasOwnProperty(k);
            };
            if (ready()) {
                task[task.length - 1](taskCallback, results);
            }
            else {
                var listener = function () {
                    if (ready()) {
                        removeListener(listener);
                        task[task.length - 1](taskCallback, results);
                    }
                };
                addListener(listener);
            }
        });
    };

    async.waterfall = function (tasks, callback) {
        callback = callback || function () {};
        if (!tasks.length) {
            return callback();
        }
        var wrapIterator = function (iterator) {
            return function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    var next = iterator.next();
                    if (next) {
                        args.push(wrapIterator(next));
                    }
                    else {
                        args.push(callback);
                    }
                    async.nextTick(function () {
                        iterator.apply(null, args);
                    });
                }
            };
        };
        wrapIterator(async.iterator(tasks))();
    };

    async.parallel = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            async.map(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            async.forEach(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.series = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            async.mapSeries(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            async.forEachSeries(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.iterator = function (tasks) {
        var makeCallback = function (index) {
            var fn = function () {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            };
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
            };
            return fn;
        };
        return makeCallback(0);
    };

    async.apply = function (fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            return fn.apply(
                null, args.concat(Array.prototype.slice.call(arguments))
            );
        };
    };

    var _concat = function (eachfn, arr, fn, callback) {
        var r = [];
        eachfn(arr, function (x, cb) {
            fn(x, function (err, y) {
                r = r.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, r);
        });
    };
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);

    async.whilst = function (test, iterator, callback) {
        if (test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.whilst(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.until = function (test, iterator, callback) {
        if (!test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.until(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.queue = function (worker, concurrency) {
        var workers = 0;
        var q = {
            tasks: [],
            concurrency: concurrency,
            saturated: null,
            empty: null,
            drain: null,
            push: function (data, callback) {
                if(data.constructor !== Array) {
                    data = [data];
                }
                _forEach(data, function(task) {
                    q.tasks.push({
                        data: task,
                        callback: typeof callback === 'function' ? callback : null
                    });
                    if (q.saturated && q.tasks.length == concurrency) {
                        q.saturated();
                    }
                    async.nextTick(q.process);
                });
            },
            process: function () {
                if (workers < q.concurrency && q.tasks.length) {
                    var task = q.tasks.shift();
                    if(q.empty && q.tasks.length == 0) q.empty();
                    workers += 1;
                    worker(task.data, function () {
                        workers -= 1;
                        if (task.callback) {
                            task.callback.apply(task, arguments);
                        }
                        if(q.drain && q.tasks.length + workers == 0) q.drain();
                        q.process();
                    });
                }
            },
            length: function () {
                return q.tasks.length;
            },
            running: function () {
                return workers;
            }
        };
        return q;
    };

    var _console_fn = function (name) {
        return function (fn) {
            var args = Array.prototype.slice.call(arguments, 1);
            fn.apply(null, args.concat([function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (typeof console !== 'undefined') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    }
                    else if (console[name]) {
                        _forEach(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            }]));
        };
    };
    async.log = _console_fn('log');
    async.dir = _console_fn('dir');
    /*async.info = _console_fn('info');
    async.warn = _console_fn('warn');
    async.error = _console_fn('error');*/

    async.memoize = function (fn, hasher) {
        var memo = {};
        var queues = {};
        hasher = hasher || function (x) {
            return x;
        };
        var memoized = function () {
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (key in memo) {
                callback.apply(null, memo[key]);
            }
            else if (key in queues) {
                queues[key].push(callback);
            }
            else {
                queues[key] = [callback];
                fn.apply(null, args.concat([function () {
                    memo[key] = arguments;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                      q[i].apply(null, arguments);
                    }
                }]));
            }
        };
        memoized.unmemoized = fn;
        return memoized;
    };

    async.unmemoize = function (fn) {
      return function () {
        return (fn.unmemoized || fn).apply(null, arguments);
      };
    };

}());

}).call(this,require('_process'))
},{"_process":39}],31:[function(require,module,exports){

},{}],32:[function(require,module,exports){
module.exports=require(31)
},{"/Users/stomita/Work/Salesforce/jsforce.publish/node_modules/browserify/lib/_empty.js":31}],33:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('is-array')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var kMaxLength = 0x3fffffff

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Note:
 *
 * - Implementation must support adding new properties to `Uint8Array` instances.
 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *    incorrect length in some situations.
 *
 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
 * get the Object implementation, which is slower but will work correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = (function () {
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Find the length
  var length
  if (type === 'number')
    length = subject > 0 ? subject >>> 0 : 0
  else if (type === 'string') {
    if (encoding === 'base64')
      subject = base64clean(subject)
    length = Buffer.byteLength(subject, encoding)
  } else if (type === 'object' && subject !== null) { // assume object is array-like
    if (subject.type === 'Buffer' && isArray(subject.data))
      subject = subject.data
    length = +subject.length > 0 ? Math.floor(+subject.length) : 0
  } else
    throw new TypeError('must start with number, buffer, array or string')

  if (this.length > kMaxLength)
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
      'size: 0x' + kMaxLength.toString(16) + ' bytes')

  var buf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    if (Buffer.isBuffer(subject)) {
      for (i = 0; i < length; i++)
        buf[i] = subject.readUInt8(i)
    } else {
      for (i = 0; i < length; i++)
        buf[i] = ((subject[i] % 256) + 256) % 256
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

Buffer.isBuffer = function (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b))
    throw new TypeError('Arguments must be Buffers')

  var x = a.length
  var y = b.length
  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
  if (i !== len) {
    x = a[i]
    y = b[i]
  }
  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function (list, totalLength) {
  if (!isArray(list)) throw new TypeError('Usage: Buffer.concat(list[, length])')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (totalLength === undefined) {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    case 'hex':
      ret = str.length >>> 1
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    default:
      ret = str.length
  }
  return ret
}

// pre-set for values that may exist in the future
Buffer.prototype.length = undefined
Buffer.prototype.parent = undefined

// toString(encoding, start=0, end=buffer.length)
Buffer.prototype.toString = function (encoding, start, end) {
  var loweredCase = false

  start = start >>> 0
  end = end === undefined || end === Infinity ? this.length : end >>> 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase)
          throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.equals = function (b) {
  if(!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max)
      str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  return Buffer.compare(this, b)
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(byte)) throw new Error('Invalid hex string')
    buf[offset + i] = byte
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function asciiWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function utf16leWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = utf16leWrite(this, string, offset, length)
      break
    default:
      throw new TypeError('Unknown encoding: ' + encoding)
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function binarySlice (buf, start, end) {
  return asciiSlice(buf, start, end)
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len;
    if (start < 0)
      start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0)
      end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start)
    end = start

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0)
    throw new RangeError('offset is not uint')
  if (offset + ext > length)
    throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
      ((this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      this[offset + 3])
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80))
    return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16) |
      (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
      (this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      (this[offset + 3])
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  if (!noAssert)
    checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = value
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = value
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = value
  return offset + 1
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else objectWriteUInt16(this, value, offset, true)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else objectWriteUInt16(this, value, offset, false)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else objectWriteUInt32(this, value, offset, true)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert)
    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else objectWriteUInt32(this, value, offset, false)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new TypeError('value is out of bounds')
  if (offset + ext > buf.length) throw new TypeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert)
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  if (end < start) throw new TypeError('sourceEnd < sourceStart')
  if (target_start < 0 || target_start >= target.length)
    throw new TypeError('targetStart out of bounds')
  if (start < 0 || start >= source.length) throw new TypeError('sourceStart out of bounds')
  if (end < 0 || end > source.length) throw new TypeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < len; i++) {
      target[i + target_start] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new TypeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new TypeError('start out of bounds')
  if (end < 0 || end > this.length) throw new TypeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-z]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F) {
      byteArray.push(b)
    } else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++) {
        byteArray.push(parseInt(h[j], 16))
      }
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

},{"base64-js":34,"ieee754":35,"is-array":36}],34:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],35:[function(require,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],36:[function(require,module,exports){

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

},{}],37:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],38:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],39:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

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
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],40:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],41:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],42:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":40,"./encode":41}],43:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":37,"inherits":38,"readable-stream/duplex.js":49,"readable-stream/passthrough.js":59,"readable-stream/readable.js":60,"readable-stream/transform.js":61,"readable-stream/writable.js":62}],44:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = require('buffer').Buffer;

function assertEncoding(encoding) {
  if (encoding && !Buffer.isEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  this.charBuffer = new Buffer(6);
  this.charReceived = 0;
  this.charLength = 0;
};


StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  var offset = 0;

  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var i = (buffer.length >= this.charLength - this.charReceived) ?
                this.charLength - this.charReceived :
                buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, offset, i);
    this.charReceived += (i - offset);
    offset = i;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (i == buffer.length) return charStr;

    // otherwise cut off the characters end from the beginning of this buffer
    buffer = buffer.slice(i, buffer.length);
    break;
  }

  var lenIncomplete = this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - lenIncomplete, end);
    this.charReceived = lenIncomplete;
    end -= lenIncomplete;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    this.charBuffer.write(charStr.charAt(charStr.length - 1), this.encoding);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }

  return i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  var incomplete = this.charReceived = buffer.length % 2;
  this.charLength = incomplete ? 2 : 0;
  return incomplete;
}

function base64DetectIncompleteChar(buffer) {
  var incomplete = this.charReceived = buffer.length % 3;
  this.charLength = incomplete ? 3 : 0;
  return incomplete;
}

},{"buffer":33}],45:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],46:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":45,"_process":39,"inherits":38}],47:[function(require,module,exports){
(function (process,global){
(function() {
'use strict';

var Faye = {
  VERSION:          '1.0.3',

  BAYEUX_VERSION:   '1.0',
  ID_LENGTH:        160,
  JSONP_CALLBACK:   'jsonpcallback',
  CONNECTION_TYPES: ['long-polling', 'cross-origin-long-polling', 'callback-polling', 'websocket', 'eventsource', 'in-process'],

  MANDATORY_CONNECTION_TYPES: ['long-polling', 'callback-polling', 'in-process'],

  ENV: (typeof window !== 'undefined') ? window : global,

  extend: function(dest, source, overwrite) {
    if (!source) return dest;
    for (var key in source) {
      if (!source.hasOwnProperty(key)) continue;
      if (dest.hasOwnProperty(key) && overwrite === false) continue;
      if (dest[key] !== source[key])
        dest[key] = source[key];
    }
    return dest;
  },

  random: function(bitlength) {
    bitlength = bitlength || this.ID_LENGTH;
    return csprng(bitlength, 36);
  },

  clientIdFromMessages: function(messages) {
    var connect = this.filter([].concat(messages), function(message) {
      return message.channel === '/meta/connect';
    });
    return connect[0] && connect[0].clientId;
  },

  copyObject: function(object) {
    var clone, i, key;
    if (object instanceof Array) {
      clone = [];
      i = object.length;
      while (i--) clone[i] = Faye.copyObject(object[i]);
      return clone;
    } else if (typeof object === 'object') {
      clone = (object === null) ? null : {};
      for (key in object) clone[key] = Faye.copyObject(object[key]);
      return clone;
    } else {
      return object;
    }
  },

  commonElement: function(lista, listb) {
    for (var i = 0, n = lista.length; i < n; i++) {
      if (this.indexOf(listb, lista[i]) !== -1)
        return lista[i];
    }
    return null;
  },

  indexOf: function(list, needle) {
    if (list.indexOf) return list.indexOf(needle);

    for (var i = 0, n = list.length; i < n; i++) {
      if (list[i] === needle) return i;
    }
    return -1;
  },

  map: function(object, callback, context) {
    if (object.map) return object.map(callback, context);
    var result = [];

    if (object instanceof Array) {
      for (var i = 0, n = object.length; i < n; i++) {
        result.push(callback.call(context || null, object[i], i));
      }
    } else {
      for (var key in object) {
        if (!object.hasOwnProperty(key)) continue;
        result.push(callback.call(context || null, key, object[key]));
      }
    }
    return result;
  },

  filter: function(array, callback, context) {
    if (array.filter) return array.filter(callback, context);
    var result = [];
    for (var i = 0, n = array.length; i < n; i++) {
      if (callback.call(context || null, array[i], i))
        result.push(array[i]);
    }
    return result;
  },

  asyncEach: function(list, iterator, callback, context) {
    var n       = list.length,
        i       = -1,
        calls   = 0,
        looping = false;

    var iterate = function() {
      calls -= 1;
      i += 1;
      if (i === n) return callback && callback.call(context);
      iterator(list[i], resume);
    };

    var loop = function() {
      if (looping) return;
      looping = true;
      while (calls > 0) iterate();
      looping = false;
    };

    var resume = function() {
      calls += 1;
      loop();
    };
    resume();
  },

  // http://assanka.net/content/tech/2009/09/02/json2-js-vs-prototype/
  toJSON: function(object) {
    if (!this.stringify) return JSON.stringify(object);

    return this.stringify(object, function(key, value) {
      return (this[key] instanceof Array) ? this[key] : value;
    });
  }
};

if (typeof module !== 'undefined')
  module.exports = Faye;
else if (typeof window !== 'undefined')
  window.Faye = Faye;

Faye.Class = function(parent, methods) {
  if (typeof parent !== 'function') {
    methods = parent;
    parent  = Object;
  }

  var klass = function() {
    if (!this.initialize) return this;
    return this.initialize.apply(this, arguments) || this;
  };

  var bridge = function() {};
  bridge.prototype = parent.prototype;

  klass.prototype = new bridge();
  Faye.extend(klass.prototype, methods);

  return klass;
};

(function() {
var EventEmitter = Faye.EventEmitter = function() {};

/*
Copyright Joyent, Inc. and other Node contributors. All rights reserved.
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var isArray = typeof Array.isArray === 'function'
    ? Array.isArray
    : function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]'
    }
;
function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0; i < xs.length; i++) {
        if (x === xs[i]) return i;
    }
    return -1;
}


EventEmitter.prototype.emit = function(type) {
  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events || !this._events.error ||
        (isArray(this._events.error) && !this._events.error.length))
    {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }
  }

  if (!this._events) return false;
  var handler = this._events[type];
  if (!handler) return false;

  if (typeof handler == 'function') {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        var args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
    return true;

  } else if (isArray(handler)) {
    var args = Array.prototype.slice.call(arguments, 1);

    var listeners = handler.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i].apply(this, args);
    }
    return true;

  } else {
    return false;
  }
};

// EventEmitter is defined in src/node_events.cc
// EventEmitter.prototype.emit() is also defined there.
EventEmitter.prototype.addListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('addListener only takes instances of Function');
  }

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type == "newListeners"! Before
  // adding it to the listeners, first emit "newListeners".
  this.emit('newListener', type, listener);

  if (!this._events[type]) {
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  } else if (isArray(this._events[type])) {
    // If we've already got an array, just append.
    this._events[type].push(listener);
  } else {
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  var self = this;
  self.on(type, function g() {
    self.removeListener(type, g);
    listener.apply(this, arguments);
  });

  return this;
};

EventEmitter.prototype.removeListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('removeListener only takes instances of Function');
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (!this._events || !this._events[type]) return this;

  var list = this._events[type];

  if (isArray(list)) {
    var i = indexOf(list, listener);
    if (i < 0) return this;
    list.splice(i, 1);
    if (list.length == 0)
      delete this._events[type];
  } else if (this._events[type] === listener) {
    delete this._events[type];
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  if (arguments.length === 0) {
    this._events = {};
    return this;
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (type && this._events && this._events[type]) this._events[type] = null;
  return this;
};

EventEmitter.prototype.listeners = function(type) {
  if (!this._events) this._events = {};
  if (!this._events[type]) this._events[type] = [];
  if (!isArray(this._events[type])) {
    this._events[type] = [this._events[type]];
  }
  return this._events[type];
};

})();

Faye.Namespace = Faye.Class({
  initialize: function() {
    this._used = {};
  },

  exists: function(id) {
    return this._used.hasOwnProperty(id);
  },

  generate: function() {
    var name = Faye.random();
    while (this._used.hasOwnProperty(name))
      name = Faye.random();
    return this._used[name] = name;
  },

  release: function(id) {
    delete this._used[id];
  }
});

(function() {
'use strict';

var timeout = setTimeout;

var defer;
if (typeof setImmediate === 'function')
  defer = function(fn) { setImmediate(fn) };
else if (typeof process === 'object' && process.nextTick)
  defer = function(fn) { process.nextTick(fn) };
else
  defer = function(fn) { timeout(fn, 0) };

var PENDING   = 0,
    FULFILLED = 1,
    REJECTED  = 2;

var RETURN = function(x) { return x },
    THROW  = function(x) { throw x  };

var Promise = function(task) {
  this._state     = PENDING;
  this._callbacks = [];
  this._errbacks  = [];

  if (typeof task !== 'function') return;
  var self = this;

  task(function(value)  { fulfill(self, value) },
       function(reason) { reject(self, reason) });
};

Promise.prototype.then = function(callback, errback) {
  var next = {}, self = this;

  next.promise = new Promise(function(fulfill, reject) {
    next.fulfill = fulfill;
    next.reject  = reject;

    registerCallback(self, callback, next);
    registerErrback(self, errback, next);
  });
  return next.promise;
};

var registerCallback = function(promise, callback, next) {
  if (typeof callback !== 'function') callback = RETURN;
  var handler = function(value) { invoke(callback, value, next) };
  if (promise._state === PENDING) {
    promise._callbacks.push(handler);
  } else if (promise._state === FULFILLED) {
    handler(promise._value);
  }
};

var registerErrback = function(promise, errback, next) {
  if (typeof errback !== 'function') errback = THROW;
  var handler = function(reason) { invoke(errback, reason, next) };
  if (promise._state === PENDING) {
    promise._errbacks.push(handler);
  } else if (promise._state === REJECTED) {
    handler(promise._reason);
  }
};

var invoke = function(fn, value, next) {
  defer(function() { _invoke(fn, value, next) });
};

var _invoke = function(fn, value, next) {
  var called = false, outcome, type, then;

  try {
    outcome = fn(value);
    type    = typeof outcome;
    then    = outcome !== null && (type === 'function' || type === 'object') && outcome.then;

    if (outcome === next.promise)
      return next.reject(new TypeError('Recursive promise chain detected'));

    if (typeof then !== 'function') return next.fulfill(outcome);

    then.call(outcome, function(v) {
      if (called) return;
      called = true;
      _invoke(RETURN, v, next);
    }, function(r) {
      if (called) return;
      called = true;
      next.reject(r);
    });

  } catch (error) {
    if (called) return;
    called = true;
    next.reject(error);
  }
};

var fulfill = Promise.fulfill = Promise.resolve = function(promise, value) {
  if (promise._state !== PENDING) return;

  promise._state    = FULFILLED;
  promise._value    = value;
  promise._errbacks = [];

  var callbacks = promise._callbacks, cb;
  while (cb = callbacks.shift()) cb(value);
};

var reject = Promise.reject = function(promise, reason) {
  if (promise._state !== PENDING) return;

  promise._state     = REJECTED;
  promise._reason    = reason;
  promise._callbacks = [];

  var errbacks = promise._errbacks, eb;
  while (eb = errbacks.shift()) eb(reason);
};

Promise.defer = defer;

Promise.deferred = Promise.pending = function() {
  var tuple = {};

  tuple.promise = new Promise(function(fulfill, reject) {
    tuple.fulfill = tuple.resolve = fulfill;
    tuple.reject  = reject;
  });
  return tuple;
};

Promise.fulfilled = Promise.resolved = function(value) {
  return new Promise(function(fulfill, reject) { fulfill(value) });
};

Promise.rejected = function(reason) {
  return new Promise(function(fulfill, reject) { reject(reason) });
};

if (typeof Faye === 'undefined')
  module.exports = Promise;
else
  Faye.Promise = Promise;

})();

Faye.Set = Faye.Class({
  initialize: function() {
    this._index = {};
  },

  add: function(item) {
    var key = (item.id !== undefined) ? item.id : item;
    if (this._index.hasOwnProperty(key)) return false;
    this._index[key] = item;
    return true;
  },

  forEach: function(block, context) {
    for (var key in this._index) {
      if (this._index.hasOwnProperty(key))
        block.call(context, this._index[key]);
    }
  },

  isEmpty: function() {
    for (var key in this._index) {
      if (this._index.hasOwnProperty(key)) return false;
    }
    return true;
  },

  member: function(item) {
    for (var key in this._index) {
      if (this._index[key] === item) return true;
    }
    return false;
  },

  remove: function(item) {
    var key = (item.id !== undefined) ? item.id : item;
    var removed = this._index[key];
    delete this._index[key];
    return removed;
  },

  toArray: function() {
    var array = [];
    this.forEach(function(item) { array.push(item) });
    return array;
  }
});

Faye.URI = {
  isURI: function(uri) {
    return uri && uri.protocol && uri.host && uri.path;
  },

  isSameOrigin: function(uri) {
    var location = Faye.ENV.location;
    return uri.protocol === location.protocol &&
           uri.hostname === location.hostname &&
           uri.port     === location.port;
  },

  parse: function(url) {
    if (typeof url !== 'string') return url;
    var uri = {}, parts, query, pairs, i, n, data;

    var consume = function(name, pattern) {
      url = url.replace(pattern, function(match) {
        uri[name] = match;
        return '';
      });
      uri[name] = uri[name] || '';
    };

    consume('protocol', /^[a-z]+\:/i);
    consume('host',     /^\/\/[^\/\?#]+/);

    if (!/^\//.test(url) && !uri.host)
      url = Faye.ENV.location.pathname.replace(/[^\/]*$/, '') + url;

    consume('pathname', /^[^\?#]*/);
    consume('search',   /^\?[^#]*/);
    consume('hash',     /^#.*/);

    uri.protocol = uri.protocol || Faye.ENV.location.protocol;

    if (uri.host) {
      uri.host     = uri.host.substr(2);
      parts        = uri.host.split(':');
      uri.hostname = parts[0];
      uri.port     = parts[1] || '';
    } else {
      uri.host     = Faye.ENV.location.host;
      uri.hostname = Faye.ENV.location.hostname;
      uri.port     = Faye.ENV.location.port;
    }

    uri.pathname = uri.pathname || '/';
    uri.path = uri.pathname + uri.search;

    query = uri.search.replace(/^\?/, '');
    pairs = query ? query.split('&') : [];
    data  = {};

    for (i = 0, n = pairs.length; i < n; i++) {
      parts = pairs[i].split('=');
      data[decodeURIComponent(parts[0] || '')] = decodeURIComponent(parts[1] || '');
    }

    uri.query = data;

    uri.href = this.stringify(uri);
    return uri;
  },

  stringify: function(uri) {
    var string = uri.protocol + '//' + uri.hostname;
    if (uri.port) string += ':' + uri.port;
    string += uri.pathname + this.queryString(uri.query) + (uri.hash || '');
    return string;
  },

  queryString: function(query) {
    var pairs = [];
    for (var key in query) {
      if (!query.hasOwnProperty(key)) continue;
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(query[key]));
    }
    if (pairs.length === 0) return '';
    return '?' + pairs.join('&');
  }
};

Faye.Error = Faye.Class({
  initialize: function(code, params, message) {
    this.code    = code;
    this.params  = Array.prototype.slice.call(params);
    this.message = message;
  },

  toString: function() {
    return this.code + ':' +
           this.params.join(',') + ':' +
           this.message;
  }
});

Faye.Error.parse = function(message) {
  message = message || '';
  if (!Faye.Grammar.ERROR.test(message)) return new this(null, [], message);

  var parts   = message.split(':'),
      code    = parseInt(parts[0]),
      params  = parts[1].split(','),
      message = parts[2];

  return new this(code, params, message);
};




Faye.Error.versionMismatch = function() {
  return new this(300, arguments, 'Version mismatch').toString();
};

Faye.Error.conntypeMismatch = function() {
  return new this(301, arguments, 'Connection types not supported').toString();
};

Faye.Error.extMismatch = function() {
  return new this(302, arguments, 'Extension mismatch').toString();
};

Faye.Error.badRequest = function() {
  return new this(400, arguments, 'Bad request').toString();
};

Faye.Error.clientUnknown = function() {
  return new this(401, arguments, 'Unknown client').toString();
};

Faye.Error.parameterMissing = function() {
  return new this(402, arguments, 'Missing required parameter').toString();
};

Faye.Error.channelForbidden = function() {
  return new this(403, arguments, 'Forbidden channel').toString();
};

Faye.Error.channelUnknown = function() {
  return new this(404, arguments, 'Unknown channel').toString();
};

Faye.Error.channelInvalid = function() {
  return new this(405, arguments, 'Invalid channel').toString();
};

Faye.Error.extUnknown = function() {
  return new this(406, arguments, 'Unknown extension').toString();
};

Faye.Error.publishFailed = function() {
  return new this(407, arguments, 'Failed to publish').toString();
};

Faye.Error.serverError = function() {
  return new this(500, arguments, 'Internal server error').toString();
};


Faye.Deferrable = {
  then: function(callback, errback) {
    var self = this;
    if (!this._promise)
      this._promise = new Faye.Promise(function(fulfill, reject) {
        self._fulfill = fulfill;
        self._reject  = reject;
      });

    if (arguments.length === 0)
      return this._promise;
    else
      return this._promise.then(callback, errback);
  },

  callback: function(callback, context) {
    return this.then(function(value) { callback.call(context, value) });
  },

  errback: function(callback, context) {
    return this.then(null, function(reason) { callback.call(context, reason) });
  },

  timeout: function(seconds, message) {
    this.then();
    var self = this;
    this._timer = Faye.ENV.setTimeout(function() {
      self._reject(message);
    }, seconds * 1000);
  },

  setDeferredStatus: function(status, value) {
    if (this._timer) Faye.ENV.clearTimeout(this._timer);

    var promise = this.then();

    if (status === 'succeeded')
      this._fulfill(value);
    else if (status === 'failed')
      this._reject(value);
    else
      delete this._promise;
  }
};

Faye.Publisher = {
  countListeners: function(eventType) {
    return this.listeners(eventType).length;
  },

  bind: function(eventType, listener, context) {
    var slice   = Array.prototype.slice,
        handler = function() { listener.apply(context, slice.call(arguments)) };

    this._listeners = this._listeners || [];
    this._listeners.push([eventType, listener, context, handler]);
    return this.on(eventType, handler);
  },

  unbind: function(eventType, listener, context) {
    this._listeners = this._listeners || [];
    var n = this._listeners.length, tuple;

    while (n--) {
      tuple = this._listeners[n];
      if (tuple[0] !== eventType) continue;
      if (listener && (tuple[1] !== listener || tuple[2] !== context)) continue;
      this._listeners.splice(n, 1);
      this.removeListener(eventType, tuple[3]);
    }
  }
};

Faye.extend(Faye.Publisher, Faye.EventEmitter.prototype);
Faye.Publisher.trigger = Faye.Publisher.emit;

Faye.Timeouts = {
  addTimeout: function(name, delay, callback, context) {
    this._timeouts = this._timeouts || {};
    if (this._timeouts.hasOwnProperty(name)) return;
    var self = this;
    this._timeouts[name] = Faye.ENV.setTimeout(function() {
      delete self._timeouts[name];
      callback.call(context);
    }, 1000 * delay);
  },

  removeTimeout: function(name) {
    this._timeouts = this._timeouts || {};
    var timeout = this._timeouts[name];
    if (!timeout) return;
    clearTimeout(timeout);
    delete this._timeouts[name];
  },

  removeAllTimeouts: function() {
    this._timeouts = this._timeouts || {};
    for (var name in this._timeouts) this.removeTimeout(name);
  }
};

Faye.Logging = {
  LOG_LEVELS: {
    fatal:  4,
    error:  3,
    warn:   2,
    info:   1,
    debug:  0
  },

  writeLog: function(messageArgs, level) {
    if (!Faye.logger) return;

    var messageArgs = Array.prototype.slice.apply(messageArgs),
        banner      = '[Faye',
        klass       = this.className,

        message = messageArgs.shift().replace(/\?/g, function() {
          try {
            return Faye.toJSON(messageArgs.shift());
          } catch (e) {
            return '[Object]';
          }
        });

    for (var key in Faye) {
      if (klass) continue;
      if (typeof Faye[key] !== 'function') continue;
      if (this instanceof Faye[key]) klass = key;
    }
    if (klass) banner += '.' + klass;
    banner += '] ';

    if (typeof Faye.logger[level] === 'function')
      Faye.logger[level](banner + message);
    else if (typeof Faye.logger === 'function')
      Faye.logger(banner + message);
  }
};

(function() {
  for (var key in Faye.Logging.LOG_LEVELS)
    (function(level, value) {
      Faye.Logging[level] = function() {
        this.writeLog(arguments, level);
      };
    })(key, Faye.Logging.LOG_LEVELS[key]);
})();

Faye.Grammar = {
  CHANNEL_NAME:     /^\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+(\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+)*$/,
  CHANNEL_PATTERN:  /^(\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+)*\/\*{1,2}$/,
  ERROR:            /^([0-9][0-9][0-9]:(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*(,(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*)*:(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*|[0-9][0-9][0-9]::(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*)$/,
  VERSION:          /^([0-9])+(\.(([a-z]|[A-Z])|[0-9])(((([a-z]|[A-Z])|[0-9])|\-|\_))*)*$/
};

Faye.Extensible = {
  addExtension: function(extension) {
    this._extensions = this._extensions || [];
    this._extensions.push(extension);
    if (extension.added) extension.added(this);
  },

  removeExtension: function(extension) {
    if (!this._extensions) return;
    var i = this._extensions.length;
    while (i--) {
      if (this._extensions[i] !== extension) continue;
      this._extensions.splice(i,1);
      if (extension.removed) extension.removed(this);
    }
  },

  pipeThroughExtensions: function(stage, message, request, callback, context) {
    this.debug('Passing through ? extensions: ?', stage, message);

    if (!this._extensions) return callback.call(context, message);
    var extensions = this._extensions.slice();

    var pipe = function(message) {
      if (!message) return callback.call(context, message);

      var extension = extensions.shift();
      if (!extension) return callback.call(context, message);

      var fn = extension[stage];
      if (!fn) return pipe(message);

      if (fn.length >= 3) extension[stage](message, request, pipe);
      else                extension[stage](message, pipe);
    };
    pipe(message);
  }
};

Faye.extend(Faye.Extensible, Faye.Logging);

Faye.Channel = Faye.Class({
  initialize: function(name) {
    this.id = this.name = name;
  },

  push: function(message) {
    this.trigger('message', message);
  },

  isUnused: function() {
    return this.countListeners('message') === 0;
  }
});

Faye.extend(Faye.Channel.prototype, Faye.Publisher);

Faye.extend(Faye.Channel, {
  HANDSHAKE:    '/meta/handshake',
  CONNECT:      '/meta/connect',
  SUBSCRIBE:    '/meta/subscribe',
  UNSUBSCRIBE:  '/meta/unsubscribe',
  DISCONNECT:   '/meta/disconnect',

  META:         'meta',
  SERVICE:      'service',

  expand: function(name) {
    var segments = this.parse(name),
        channels = ['/**', name];

    var copy = segments.slice();
    copy[copy.length - 1] = '*';
    channels.push(this.unparse(copy));

    for (var i = 1, n = segments.length; i < n; i++) {
      copy = segments.slice(0, i);
      copy.push('**');
      channels.push(this.unparse(copy));
    }

    return channels;
  },

  isValid: function(name) {
    return Faye.Grammar.CHANNEL_NAME.test(name) ||
           Faye.Grammar.CHANNEL_PATTERN.test(name);
  },

  parse: function(name) {
    if (!this.isValid(name)) return null;
    return name.split('/').slice(1);
  },

  unparse: function(segments) {
    return '/' + segments.join('/');
  },

  isMeta: function(name) {
    var segments = this.parse(name);
    return segments ? (segments[0] === this.META) : null;
  },

  isService: function(name) {
    var segments = this.parse(name);
    return segments ? (segments[0] === this.SERVICE) : null;
  },

  isSubscribable: function(name) {
    if (!this.isValid(name)) return null;
    return !this.isMeta(name) && !this.isService(name);
  },

  Set: Faye.Class({
    initialize: function() {
      this._channels = {};
    },

    getKeys: function() {
      var keys = [];
      for (var key in this._channels) keys.push(key);
      return keys;
    },

    remove: function(name) {
      delete this._channels[name];
    },

    hasSubscription: function(name) {
      return this._channels.hasOwnProperty(name);
    },

    subscribe: function(names, callback, context) {
      if (!callback) return;
      var name;
      for (var i = 0, n = names.length; i < n; i++) {
        name = names[i];
        var channel = this._channels[name] = this._channels[name] || new Faye.Channel(name);
        channel.bind('message', callback, context);
      }
    },

    unsubscribe: function(name, callback, context) {
      var channel = this._channels[name];
      if (!channel) return false;
      channel.unbind('message', callback, context);

      if (channel.isUnused()) {
        this.remove(name);
        return true;
      } else {
        return false;
      }
    },

    distributeMessage: function(message) {
      var channels = Faye.Channel.expand(message.channel);

      for (var i = 0, n = channels.length; i < n; i++) {
        var channel = this._channels[channels[i]];
        if (channel) channel.trigger('message', message.data);
      }
    }
  })
});

Faye.Envelope = Faye.Class({
  initialize: function(message, timeout) {
    this.id      = message.id;
    this.message = message;

    if (timeout !== undefined) this.timeout(timeout / 1000, false);
  }
});

Faye.extend(Faye.Envelope.prototype, Faye.Deferrable);

Faye.Publication = Faye.Class(Faye.Deferrable);

Faye.Subscription = Faye.Class({
  initialize: function(client, channels, callback, context) {
    this._client    = client;
    this._channels  = channels;
    this._callback  = callback;
    this._context     = context;
    this._cancelled = false;
  },

  cancel: function() {
    if (this._cancelled) return;
    this._client.unsubscribe(this._channels, this._callback, this._context);
    this._cancelled = true;
  },

  unsubscribe: function() {
    this.cancel();
  }
});

Faye.extend(Faye.Subscription.prototype, Faye.Deferrable);

Faye.Client = Faye.Class({
  UNCONNECTED:          1,
  CONNECTING:           2,
  CONNECTED:            3,
  DISCONNECTED:         4,

  HANDSHAKE:            'handshake',
  RETRY:                'retry',
  NONE:                 'none',

  CONNECTION_TIMEOUT:   60,
  DEFAULT_RETRY:        5,
  MAX_REQUEST_SIZE:     2048,

  DEFAULT_ENDPOINT:     '/bayeux',
  INTERVAL:             0,

  initialize: function(endpoint, options) {
    this.info('New client created for ?', endpoint);

    this._options   = options || {};
    this.endpoint   = Faye.URI.parse(endpoint || this.DEFAULT_ENDPOINT);
    this.endpoints  = this._options.endpoints || {};
    this.transports = {};
    this.cookies    = Faye.CookieJar && new Faye.CookieJar();
    this.headers    = {};
    this.ca         = this._options.ca;
    this._disabled  = [];
    this._retry     = this._options.retry || this.DEFAULT_RETRY;

    for (var key in this.endpoints)
      this.endpoints[key] = Faye.URI.parse(this.endpoints[key]);

    this.maxRequestSize = this.MAX_REQUEST_SIZE;

    this._state     = this.UNCONNECTED;
    this._channels  = new Faye.Channel.Set();
    this._messageId = 0;

    this._responseCallbacks = {};

    this._advice = {
      reconnect: this.RETRY,
      interval:  1000 * (this._options.interval || this.INTERVAL),
      timeout:   1000 * (this._options.timeout  || this.CONNECTION_TIMEOUT)
    };

    if (Faye.Event && Faye.ENV.onbeforeunload !== undefined)
      Faye.Event.on(Faye.ENV, 'beforeunload', function() {
        if (Faye.indexOf(this._disabled, 'autodisconnect') < 0)
          this.disconnect();
      }, this);
  },

  disable: function(feature) {
    this._disabled.push(feature);
  },

  setHeader: function(name, value) {
    this.headers[name] = value;
  },

  // Request
  // MUST include:  * channel
  //                * version
  //                * supportedConnectionTypes
  // MAY include:   * minimumVersion
  //                * ext
  //                * id
  //
  // Success Response                             Failed Response
  // MUST include:  * channel                     MUST include:  * channel
  //                * version                                    * successful
  //                * supportedConnectionTypes                   * error
  //                * clientId                    MAY include:   * supportedConnectionTypes
  //                * successful                                 * advice
  // MAY include:   * minimumVersion                             * version
  //                * advice                                     * minimumVersion
  //                * ext                                        * ext
  //                * id                                         * id
  //                * authSuccessful
  handshake: function(callback, context) {
    if (this._advice.reconnect === this.NONE) return;
    if (this._state !== this.UNCONNECTED) return;

    this._state = this.CONNECTING;
    var self = this;

    this.info('Initiating handshake with ?', Faye.URI.stringify(this.endpoint));
    this._selectTransport(Faye.MANDATORY_CONNECTION_TYPES);

    this._send({
      channel:                  Faye.Channel.HANDSHAKE,
      version:                  Faye.BAYEUX_VERSION,
      supportedConnectionTypes: [this._transport.connectionType]

    }, function(response) {

      if (response.successful) {
        this._state     = this.CONNECTED;
        this._clientId  = response.clientId;

        this._selectTransport(response.supportedConnectionTypes);

        this.info('Handshake successful: ?', this._clientId);

        this.subscribe(this._channels.getKeys(), true);
        if (callback) Faye.Promise.defer(function() { callback.call(context) });

      } else {
        this.info('Handshake unsuccessful');
        Faye.ENV.setTimeout(function() { self.handshake(callback, context) }, this._advice.interval);
        this._state = this.UNCONNECTED;
      }
    }, this);
  },

  // Request                              Response
  // MUST include:  * channel             MUST include:  * channel
  //                * clientId                           * successful
  //                * connectionType                     * clientId
  // MAY include:   * ext                 MAY include:   * error
  //                * id                                 * advice
  //                                                     * ext
  //                                                     * id
  //                                                     * timestamp
  connect: function(callback, context) {
    if (this._advice.reconnect === this.NONE) return;
    if (this._state === this.DISCONNECTED) return;

    if (this._state === this.UNCONNECTED)
      return this.handshake(function() { this.connect(callback, context) }, this);

    this.callback(callback, context);
    if (this._state !== this.CONNECTED) return;

    this.info('Calling deferred actions for ?', this._clientId);
    this.setDeferredStatus('succeeded');
    this.setDeferredStatus('unknown');

    if (this._connectRequest) return;
    this._connectRequest = true;

    this.info('Initiating connection for ?', this._clientId);

    this._send({
      channel:        Faye.Channel.CONNECT,
      clientId:       this._clientId,
      connectionType: this._transport.connectionType

    }, this._cycleConnection, this);
  },

  // Request                              Response
  // MUST include:  * channel             MUST include:  * channel
  //                * clientId                           * successful
  // MAY include:   * ext                                * clientId
  //                * id                  MAY include:   * error
  //                                                     * ext
  //                                                     * id
  disconnect: function() {
    if (this._state !== this.CONNECTED) return;
    this._state = this.DISCONNECTED;

    this.info('Disconnecting ?', this._clientId);

    this._send({
      channel:  Faye.Channel.DISCONNECT,
      clientId: this._clientId

    }, function(response) {
      if (!response.successful) return;
      this._transport.close();
      delete this._transport;
    }, this);

    this.info('Clearing channel listeners for ?', this._clientId);
    this._channels = new Faye.Channel.Set();
  },

  // Request                              Response
  // MUST include:  * channel             MUST include:  * channel
  //                * clientId                           * successful
  //                * subscription                       * clientId
  // MAY include:   * ext                                * subscription
  //                * id                  MAY include:   * error
  //                                                     * advice
  //                                                     * ext
  //                                                     * id
  //                                                     * timestamp
  subscribe: function(channel, callback, context) {
    if (channel instanceof Array)
      return Faye.map(channel, function(c) {
        return this.subscribe(c, callback, context);
      }, this);

    var subscription = new Faye.Subscription(this, channel, callback, context),
        force        = (callback === true),
        hasSubscribe = this._channels.hasSubscription(channel);

    if (hasSubscribe && !force) {
      this._channels.subscribe([channel], callback, context);
      subscription.setDeferredStatus('succeeded');
      return subscription;
    }

    this.connect(function() {
      this.info('Client ? attempting to subscribe to ?', this._clientId, channel);
      if (!force) this._channels.subscribe([channel], callback, context);

      this._send({
        channel:      Faye.Channel.SUBSCRIBE,
        clientId:     this._clientId,
        subscription: channel

      }, function(response) {
        if (!response.successful) {
          subscription.setDeferredStatus('failed', Faye.Error.parse(response.error));
          return this._channels.unsubscribe(channel, callback, context);
        }

        var channels = [].concat(response.subscription);
        this.info('Subscription acknowledged for ? to ?', this._clientId, channels);
        subscription.setDeferredStatus('succeeded');
      }, this);
    }, this);

    return subscription;
  },

  // Request                              Response
  // MUST include:  * channel             MUST include:  * channel
  //                * clientId                           * successful
  //                * subscription                       * clientId
  // MAY include:   * ext                                * subscription
  //                * id                  MAY include:   * error
  //                                                     * advice
  //                                                     * ext
  //                                                     * id
  //                                                     * timestamp
  unsubscribe: function(channel, callback, context) {
    if (channel instanceof Array)
      return Faye.map(channel, function(c) {
        return this.unsubscribe(c, callback, context);
      }, this);

    var dead = this._channels.unsubscribe(channel, callback, context);
    if (!dead) return;

    this.connect(function() {
      this.info('Client ? attempting to unsubscribe from ?', this._clientId, channel);

      this._send({
        channel:      Faye.Channel.UNSUBSCRIBE,
        clientId:     this._clientId,
        subscription: channel

      }, function(response) {
        if (!response.successful) return;

        var channels = [].concat(response.subscription);
        this.info('Unsubscription acknowledged for ? from ?', this._clientId, channels);
      }, this);
    }, this);
  },

  // Request                              Response
  // MUST include:  * channel             MUST include:  * channel
  //                * data                               * successful
  // MAY include:   * clientId            MAY include:   * id
  //                * id                                 * error
  //                * ext                                * ext
  publish: function(channel, data) {
    var publication = new Faye.Publication();

    this.connect(function() {
      this.info('Client ? queueing published message to ?: ?', this._clientId, channel, data);

      this._send({
        channel:  channel,
        data:     data,
        clientId: this._clientId

      }, function(response) {
        if (response.successful)
          publication.setDeferredStatus('succeeded');
        else
          publication.setDeferredStatus('failed', Faye.Error.parse(response.error));
      }, this);
    }, this);

    return publication;
  },

  receiveMessage: function(message) {
    var id = message.id, timeout, callback;

    if (message.successful !== undefined) {
      callback = this._responseCallbacks[id];
      delete this._responseCallbacks[id];
    }

    this.pipeThroughExtensions('incoming', message, null, function(message) {
      if (!message) return;

      if (message.advice) this._handleAdvice(message.advice);
      this._deliverMessage(message);

      if (callback) callback[0].call(callback[1], message);
    }, this);

    if (this._transportUp === true) return;
    this._transportUp = true;
    this.trigger('transport:up');
  },

  messageError: function(messages, immediate) {
    var retry = this._retry,
        self  = this,
        id, message, timeout;

    for (var i = 0, n = messages.length; i < n; i++) {
      message = messages[i];
      id      = message.id;

      if (immediate)
        this._transportSend(message);
      else
        Faye.ENV.setTimeout(function() { self._transportSend(message) }, retry * 1000);
    }

    if (immediate || this._transportUp === false) return;
    this._transportUp = false;
    this.trigger('transport:down');
  },

  _selectTransport: function(transportTypes) {
    Faye.Transport.get(this, transportTypes, this._disabled, function(transport) {
      this.debug('Selected ? transport for ?', transport.connectionType, Faye.URI.stringify(transport.endpoint));

      if (transport === this._transport) return;
      if (this._transport) this._transport.close();

      this._transport = transport;
    }, this);
  },

  _send: function(message, callback, context) {
    if (!this._transport) return;
    message.id = message.id || this._generateMessageId();

    this.pipeThroughExtensions('outgoing', message, null, function(message) {
      if (!message) return;
      if (callback) this._responseCallbacks[message.id] = [callback, context];
      this._transportSend(message);
    }, this);
  },

  _transportSend: function(message) {
    if (!this._transport) return;

    var timeout  = 1.2 * (this._advice.timeout || this._retry * 1000),
        envelope = new Faye.Envelope(message, timeout);

    envelope.errback(function(immediate) {
      this.messageError([message], immediate);
    }, this);

    this._transport.send(envelope);
  },

  _generateMessageId: function() {
    this._messageId += 1;
    if (this._messageId >= Math.pow(2,32)) this._messageId = 0;
    return this._messageId.toString(36);
  },

  _handleAdvice: function(advice) {
    Faye.extend(this._advice, advice);

    if (this._advice.reconnect === this.HANDSHAKE && this._state !== this.DISCONNECTED) {
      this._state    = this.UNCONNECTED;
      this._clientId = null;
      this._cycleConnection();
    }
  },

  _deliverMessage: function(message) {
    if (!message.channel || message.data === undefined) return;
    this.info('Client ? calling listeners for ? with ?', this._clientId, message.channel, message.data);
    this._channels.distributeMessage(message);
  },

  _cycleConnection: function() {
    if (this._connectRequest) {
      this._connectRequest = null;
      this.info('Closed connection for ?', this._clientId);
    }
    var self = this;
    Faye.ENV.setTimeout(function() { self.connect() }, this._advice.interval);
  }
});

Faye.extend(Faye.Client.prototype, Faye.Deferrable);
Faye.extend(Faye.Client.prototype, Faye.Publisher);
Faye.extend(Faye.Client.prototype, Faye.Logging);
Faye.extend(Faye.Client.prototype, Faye.Extensible);

Faye.Transport = Faye.extend(Faye.Class({
  MAX_DELAY: 0,
  batching:  true,

  initialize: function(client, endpoint) {
    this._client  = client;
    this.endpoint = endpoint;
    this._outbox  = [];
  },

  close: function() {},

  encode: function(envelopes) {
    return '';
  },

  send: function(envelope) {
    var message = envelope.message;

    this.debug('Client ? sending message to ?: ?',
               this._client._clientId, Faye.URI.stringify(this.endpoint), message);

    if (!this.batching) return this.request([envelope]);

    this._outbox.push(envelope);

    if (message.channel === Faye.Channel.HANDSHAKE)
      return this.addTimeout('publish', 0.01, this.flush, this);

    if (message.channel === Faye.Channel.CONNECT)
      this._connectMessage = message;

    this.flushLargeBatch();
    this.addTimeout('publish', this.MAX_DELAY, this.flush, this);
  },

  flush: function() {
    this.removeTimeout('publish');

    if (this._outbox.length > 1 && this._connectMessage)
      this._connectMessage.advice = {timeout: 0};

    this.request(this._outbox);

    this._connectMessage = null;
    this._outbox = [];
  },

  flushLargeBatch: function() {
    var string = this.encode(this._outbox);
    if (string.length < this._client.maxRequestSize) return;
    var last = this._outbox.pop();
    this.flush();
    if (last) this._outbox.push(last);
  },

  receive: function(envelopes, responses) {
    var n = envelopes.length;
    while (n--) envelopes[n].setDeferredStatus('succeeded');

    responses = [].concat(responses);

    this.debug('Client ? received from ?: ?',
               this._client._clientId, Faye.URI.stringify(this.endpoint), responses);

    for (var i = 0, n = responses.length; i < n; i++)
      this._client.receiveMessage(responses[i]);
  },

  handleError: function(envelopes, immediate) {
    var n = envelopes.length;
    while (n--) envelopes[n].setDeferredStatus('failed', immediate);
  },

  _getCookies: function() {
    var cookies = this._client.cookies;
    if (!cookies) return '';

    return cookies.getCookies({
      domain: this.endpoint.hostname,
      path:   this.endpoint.path,
      secure: this.endpoint.protocol === 'https:'
    }).toValueString();
  },

  _storeCookies: function(setCookie) {
    if (!setCookie || !this._client.cookies) return;
    setCookie = [].concat(setCookie);
    var cookie;

    for (var i = 0, n = setCookie.length; i < n; i++) {
      cookie = this._client.cookies.setCookie(setCookie[i]);
      cookie = cookie[0] || cookie;
      cookie.domain = cookie.domain || this.endpoint.hostname;
    }
  }

}), {
  get: function(client, allowed, disabled, callback, context) {
    var endpoint = client.endpoint;

    Faye.asyncEach(this._transports, function(pair, resume) {
      var connType     = pair[0], klass = pair[1],
          connEndpoint = client.endpoints[connType] || endpoint;

      if (Faye.indexOf(disabled, connType) >= 0)
        return resume();

      if (Faye.indexOf(allowed, connType) < 0) {
        klass.isUsable(client, connEndpoint, function() {});
        return resume();
      }

      klass.isUsable(client, connEndpoint, function(isUsable) {
        if (!isUsable) return resume();
        var transport = klass.hasOwnProperty('create') ? klass.create(client, connEndpoint) : new klass(client, connEndpoint);
        callback.call(context, transport);
      });
    }, function() {
      throw new Error('Could not find a usable connection type for ' + Faye.URI.stringify(endpoint));
    });
  },

  register: function(type, klass) {
    this._transports.push([type, klass]);
    klass.prototype.connectionType = type;
  },

  _transports: []
});

Faye.extend(Faye.Transport.prototype, Faye.Logging);
Faye.extend(Faye.Transport.prototype, Faye.Timeouts);

Faye.Event = {
  _registry: [],

  on: function(element, eventName, callback, context) {
    var wrapped = function() { callback.call(context) };

    if (element.addEventListener)
      element.addEventListener(eventName, wrapped, false);
    else
      element.attachEvent('on' + eventName, wrapped);

    this._registry.push({
      _element:   element,
      _type:      eventName,
      _callback:  callback,
      _context:     context,
      _handler:   wrapped
    });
  },

  detach: function(element, eventName, callback, context) {
    var i = this._registry.length, register;
    while (i--) {
      register = this._registry[i];

      if ((element    && element    !== register._element)   ||
          (eventName  && eventName  !== register._type)      ||
          (callback   && callback   !== register._callback)  ||
          (context      && context      !== register._context))
        continue;

      if (register._element.removeEventListener)
        register._element.removeEventListener(register._type, register._handler, false);
      else
        register._element.detachEvent('on' + register._type, register._handler);

      this._registry.splice(i,1);
      register = null;
    }
  }
};

if (Faye.ENV.onunload !== undefined) Faye.Event.on(Faye.ENV, 'unload', Faye.Event.detach, Faye.Event);

/*
    json2.js
    2013-05-26

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function () {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    Faye.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

        var i;
        gap = '';
        indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

        if (typeof space === 'number') {
            for (i = 0; i < space; i += 1) {
                indent += ' ';
            }

// If the space parameter is a string, it will be used as the indent string.

        } else if (typeof space === 'string') {
            indent = space;
        }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

        rep = replacer;
        if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                typeof replacer.length !== 'number')) {
            throw new Error('JSON.stringify');
        }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

        return str('', {'': value});
    };

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = Faye.stringify;
    }

// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

Faye.Transport.WebSocket = Faye.extend(Faye.Class(Faye.Transport, {
  UNCONNECTED:  1,
  CONNECTING:   2,
  CONNECTED:    3,

  batching:     false,

  isUsable: function(callback, context) {
    this.callback(function() { callback.call(context, true) });
    this.errback(function() { callback.call(context, false) });
    this.connect();
  },

  request: function(envelopes) {
    this._pending = this._pending || new Faye.Set();
    for (var i = 0, n = envelopes.length; i < n; i++) this._pending.add(envelopes[i]);

    this.callback(function(socket) {
      if (!socket) return;
      var messages = Faye.map(envelopes, function(e) { return e.message });
      socket.send(Faye.toJSON(messages));
    }, this);
    this.connect();
  },

  connect: function() {
    if (Faye.Transport.WebSocket._unloaded) return;

    this._state = this._state || this.UNCONNECTED;
    if (this._state !== this.UNCONNECTED) return;
    this._state = this.CONNECTING;

    var socket = this._createSocket();
    if (!socket) return this.setDeferredStatus('failed');

    var self = this;

    socket.onopen = function() {
      if (socket.headers) self._storeCookies(socket.headers['set-cookie']);
      self._socket = socket;
      self._state = self.CONNECTED;
      self._everConnected = true;
      self._ping();
      self.setDeferredStatus('succeeded', socket);
    };

    var closed = false;
    socket.onclose = socket.onerror = function() {
      if (closed) return;
      closed = true;

      var wasConnected = (self._state === self.CONNECTED);
      socket.onopen = socket.onclose = socket.onerror = socket.onmessage = null;

      delete self._socket;
      self._state = self.UNCONNECTED;
      self.removeTimeout('ping');
      self.setDeferredStatus('unknown');

      var pending = self._pending ? self._pending.toArray() : [];
      delete self._pending;

      if (wasConnected) {
        self.handleError(pending, true);
      } else if (self._everConnected) {
        self.handleError(pending);
      } else {
        self.setDeferredStatus('failed');
      }
    };

    socket.onmessage = function(event) {
      var messages  = JSON.parse(event.data),
          envelopes = [],
          envelope;

      if (!messages) return;
      messages = [].concat(messages);

      for (var i = 0, n = messages.length; i < n; i++) {
        if (messages[i].successful === undefined) continue;
        envelope = self._pending.remove(messages[i]);
        if (envelope) envelopes.push(envelope);
      }
      self.receive(envelopes, messages);
    };
  },

  close: function() {
    if (!this._socket) return;
    this._socket.close();
  },

  _createSocket: function() {
    var url     = Faye.Transport.WebSocket.getSocketUrl(this.endpoint),
        options = {headers: Faye.copyObject(this._client.headers), ca: this._client.ca};

    options.headers['Cookie'] = this._getCookies();

    if (Faye.WebSocket)        return new Faye.WebSocket.Client(url, [], options);
    if (Faye.ENV.MozWebSocket) return new MozWebSocket(url);
    if (Faye.ENV.WebSocket)    return new WebSocket(url);
  },

  _ping: function() {
    if (!this._socket) return;
    this._socket.send('[]');
    this.addTimeout('ping', this._client._advice.timeout/2000, this._ping, this);
  }

}), {
  PROTOCOLS: {
    'http:':  'ws:',
    'https:': 'wss:'
  },

  create: function(client, endpoint) {
    var sockets = client.transports.websocket = client.transports.websocket || {};
    sockets[endpoint.href] = sockets[endpoint.href] || new this(client, endpoint);
    return sockets[endpoint.href];
  },

  getSocketUrl: function(endpoint) {
    endpoint = Faye.copyObject(endpoint);
    endpoint.protocol = this.PROTOCOLS[endpoint.protocol];
    return Faye.URI.stringify(endpoint);
  },

  isUsable: function(client, endpoint, callback, context) {
    this.create(client, endpoint).isUsable(callback, context);
  }
});

Faye.extend(Faye.Transport.WebSocket.prototype, Faye.Deferrable);
Faye.Transport.register('websocket', Faye.Transport.WebSocket);

if (Faye.Event)
  Faye.Event.on(Faye.ENV, 'beforeunload', function() {
    Faye.Transport.WebSocket._unloaded = true;
  });

Faye.Transport.EventSource = Faye.extend(Faye.Class(Faye.Transport, {
  initialize: function(client, endpoint) {
    Faye.Transport.prototype.initialize.call(this, client, endpoint);
    if (!Faye.ENV.EventSource) return this.setDeferredStatus('failed');

    this._xhr = new Faye.Transport.XHR(client, endpoint);

    endpoint = Faye.copyObject(endpoint);
    endpoint.pathname += '/' + client._clientId;

    var socket = new EventSource(Faye.URI.stringify(endpoint)),
        self   = this;

    socket.onopen = function() {
      self._everConnected = true;
      self.setDeferredStatus('succeeded');
    };

    socket.onerror = function() {
      if (self._everConnected) {
        self._client.messageError([]);
      } else {
        self.setDeferredStatus('failed');
        socket.close();
      }
    };

    socket.onmessage = function(event) {
      self.receive([], JSON.parse(event.data));
    };

    this._socket = socket;
  },

  close: function() {
    if (!this._socket) return;
    this._socket.onopen = this._socket.onerror = this._socket.onmessage = null;
    this._socket.close();
    delete this._socket;
  },

  isUsable: function(callback, context) {
    this.callback(function() { callback.call(context, true) });
    this.errback(function() { callback.call(context, false) });
  },

  encode: function(envelopes) {
    return this._xhr.encode(envelopes);
  },

  request: function(envelopes) {
    this._xhr.request(envelopes);
  }

}), {
  isUsable: function(client, endpoint, callback, context) {
    var id = client._clientId;
    if (!id) return callback.call(context, false);

    Faye.Transport.XHR.isUsable(client, endpoint, function(usable) {
      if (!usable) return callback.call(context, false);
      this.create(client, endpoint).isUsable(callback, context);
    }, this);
  },

  create: function(client, endpoint) {
    var sockets = client.transports.eventsource = client.transports.eventsource || {},
        id      = client._clientId;

    endpoint = Faye.copyObject(endpoint);
    endpoint.pathname += '/' + (id || '');
    var url = Faye.URI.stringify(endpoint);

    sockets[url] = sockets[url] || new this(client, endpoint);
    return sockets[url];
  }
});

Faye.extend(Faye.Transport.EventSource.prototype, Faye.Deferrable);
Faye.Transport.register('eventsource', Faye.Transport.EventSource);

Faye.Transport.XHR = Faye.extend(Faye.Class(Faye.Transport, {
  encode: function(envelopes) {
    var messages = Faye.map(envelopes, function(e) { return e.message });
    return Faye.toJSON(messages);
  },

  request: function(envelopes) {
    var path = this.endpoint.path,
        xhr  = Faye.ENV.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest(),
        self = this;

    xhr.open('POST', path, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Pragma', 'no-cache');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    var headers = this._client.headers;
    for (var key in headers) {
      if (!headers.hasOwnProperty(key)) continue;
      xhr.setRequestHeader(key, headers[key]);
    }

    var abort = function() { xhr.abort() };
    Faye.Event.on(Faye.ENV, 'beforeunload', abort);

    xhr.onreadystatechange = function() {
      if (!xhr || xhr.readyState !== 4) return;

      var parsedMessage = null,
          status        = xhr.status,
          text          = xhr.responseText,
          successful    = (status >= 200 && status < 300) || status === 304 || status === 1223;

      Faye.Event.detach(Faye.ENV, 'beforeunload', abort);
      xhr.onreadystatechange = function() {};
      xhr = null;

      if (!successful) return self.handleError(envelopes);

      try {
        parsedMessage = JSON.parse(text);
      } catch (e) {}

      if (parsedMessage)
        self.receive(envelopes, parsedMessage);
      else
        self.handleError(envelopes);
    };

    xhr.send(this.encode(envelopes));
  }
}), {
  isUsable: function(client, endpoint, callback, context) {
    callback.call(context, Faye.URI.isSameOrigin(endpoint));
  }
});

Faye.Transport.register('long-polling', Faye.Transport.XHR);

Faye.Transport.CORS = Faye.extend(Faye.Class(Faye.Transport, {
  encode: function(envelopes) {
    var messages = Faye.map(envelopes, function(e) { return e.message });
    return 'message=' + encodeURIComponent(Faye.toJSON(messages));
  },

  request: function(envelopes) {
    var xhrClass = Faye.ENV.XDomainRequest ? XDomainRequest : XMLHttpRequest,
        xhr      = new xhrClass(),
        headers  = this._client.headers,
        self     = this,
        key;

    xhr.open('POST', Faye.URI.stringify(this.endpoint), true);

    if (xhr.setRequestHeader) {
      xhr.setRequestHeader('Pragma', 'no-cache');
      for (key in headers) {
        if (!headers.hasOwnProperty(key)) continue;
        xhr.setRequestHeader(key, headers[key]);
      }
    }

    var cleanUp = function() {
      if (!xhr) return false;
      xhr.onload = xhr.onerror = xhr.ontimeout = xhr.onprogress = null;
      xhr = null;
    };

    xhr.onload = function() {
      var parsedMessage = null;
      try {
        parsedMessage = JSON.parse(xhr.responseText);
      } catch (e) {}

      cleanUp();

      if (parsedMessage)
        self.receive(envelopes, parsedMessage);
      else
        self.handleError(envelopes);
    };

    xhr.onerror = xhr.ontimeout = function() {
      cleanUp();
      self.handleError(envelopes);
    };

    xhr.onprogress = function() {};
    xhr.send(this.encode(envelopes));
  }
}), {
  isUsable: function(client, endpoint, callback, context) {
    if (Faye.URI.isSameOrigin(endpoint))
      return callback.call(context, false);

    if (Faye.ENV.XDomainRequest)
      return callback.call(context, endpoint.protocol === Faye.ENV.location.protocol);

    if (Faye.ENV.XMLHttpRequest) {
      var xhr = new Faye.ENV.XMLHttpRequest();
      return callback.call(context, xhr.withCredentials !== undefined);
    }
    return callback.call(context, false);
  }
});

Faye.Transport.register('cross-origin-long-polling', Faye.Transport.CORS);

Faye.Transport.JSONP = Faye.extend(Faye.Class(Faye.Transport, {
 encode: function(envelopes) {
    var messages = Faye.map(envelopes, function(e) { return e.message });
    var url = Faye.copyObject(this.endpoint);
    url.query.message = Faye.toJSON(messages);
    url.query.jsonp   = '__jsonp' + Faye.Transport.JSONP._cbCount + '__';
    return Faye.URI.stringify(url);
  },

  request: function(envelopes) {
    var messages     = Faye.map(envelopes, function(e) { return e.message }),
        head         = document.getElementsByTagName('head')[0],
        script       = document.createElement('script'),
        callbackName = Faye.Transport.JSONP.getCallbackName(),
        endpoint     = Faye.copyObject(this.endpoint),
        self         = this;

    endpoint.query.message = Faye.toJSON(messages);
    endpoint.query.jsonp   = callbackName;

    Faye.ENV[callbackName] = function(data) {
      if (!Faye.ENV[callbackName]) return false;
      Faye.ENV[callbackName] = undefined;
      try { delete Faye.ENV[callbackName] } catch (e) {}
      script.parentNode.removeChild(script);
      self.receive(envelopes, data);
    };

    script.type = 'text/javascript';
    script.src  = Faye.URI.stringify(endpoint);
    head.appendChild(script);
  }
}), {
  _cbCount: 0,

  getCallbackName: function() {
    this._cbCount += 1;
    return '__jsonp' + this._cbCount + '__';
  },

  isUsable: function(client, endpoint, callback, context) {
    callback.call(context, true);
  }
});

Faye.Transport.register('callback-polling', Faye.Transport.JSONP);

})();
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":39}],48:[function(require,module,exports){
(function (process){
// vim:ts=4:sts=4:sw=4:
/*!
 *
 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (definition) {
    // Turn off strict mode for this function so we can assign to global.Q
    /* jshint strict: false */

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else if (typeof exports === "object") {
        module.exports = definition();

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeQ = definition;
        }

    // <script>
    } else {
        Q = definition();
    }

})(function () {
"use strict";

var hasStacks = false;
try {
    throw new Error();
} catch (e) {
    hasStacks = !!e.stack;
}

// All code after this point will be filtered from stack traces reported
// by Q.
var qStartingLine = captureLine();
var qFileName;

// shims

// used for fallback in "allResolved"
var noop = function () {};

// Use the fastest possible means to execute a task in a future turn
// of the event loop.
var nextTick =(function () {
    // linked list of tasks (single, with head node)
    var head = {task: void 0, next: null};
    var tail = head;
    var flushing = false;
    var requestTick = void 0;
    var isNodeJS = false;

    function flush() {
        /* jshint loopfunc: true */

        while (head.next) {
            head = head.next;
            var task = head.task;
            head.task = void 0;
            var domain = head.domain;

            if (domain) {
                head.domain = void 0;
                domain.enter();
            }

            try {
                task();

            } catch (e) {
                if (isNodeJS) {
                    // In node, uncaught exceptions are considered fatal errors.
                    // Re-throw them synchronously to interrupt flushing!

                    // Ensure continuation if the uncaught exception is suppressed
                    // listening "uncaughtException" events (as domains does).
                    // Continue in next event to avoid tick recursion.
                    if (domain) {
                        domain.exit();
                    }
                    setTimeout(flush, 0);
                    if (domain) {
                        domain.enter();
                    }

                    throw e;

                } else {
                    // In browsers, uncaught exceptions are not fatal.
                    // Re-throw them asynchronously to avoid slow-downs.
                    setTimeout(function() {
                       throw e;
                    }, 0);
                }
            }

            if (domain) {
                domain.exit();
            }
        }

        flushing = false;
    }

    nextTick = function (task) {
        tail = tail.next = {
            task: task,
            domain: isNodeJS && process.domain,
            next: null
        };

        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };

    if (typeof process !== "undefined" && process.nextTick) {
        // Node.js before 0.9. Note that some fake-Node environments, like the
        // Mocha test runner, introduce a `process` global without a `nextTick`.
        isNodeJS = true;

        requestTick = function () {
            process.nextTick(flush);
        };

    } else if (typeof setImmediate === "function") {
        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
        if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
        } else {
            requestTick = function () {
                setImmediate(flush);
            };
        }

    } else if (typeof MessageChannel !== "undefined") {
        // modern browsers
        // http://www.nonblocking.io/2011/06/windownexttick.html
        var channel = new MessageChannel();
        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
        // working message ports the first time a page loads.
        channel.port1.onmessage = function () {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
        };
        var requestPortTick = function () {
            // Opera requires us to provide a message payload, regardless of
            // whether we use it.
            channel.port2.postMessage(0);
        };
        requestTick = function () {
            setTimeout(flush, 0);
            requestPortTick();
        };

    } else {
        // old browsers
        requestTick = function () {
            setTimeout(flush, 0);
        };
    }

    return nextTick;
})();

// Attempt to make generics safe in the face of downstream
// modifications.
// There is no situation where this is necessary.
// If you need a security guarantee, these primordials need to be
// deeply frozen anyway, and if you don’t need a security guarantee,
// this is just plain paranoid.
// However, this does have the nice side-effect of reducing the size
// of the code by reducing x.call() to merely x(), eliminating many
// hard-to-minify characters.
// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
var call = Function.call;
function uncurryThis(f) {
    return function () {
        return call.apply(f, arguments);
    };
}
// This is equivalent, but slower:
// uncurryThis = Function_bind.bind(Function_bind.call);
// http://jsperf.com/uncurrythis

var array_slice = uncurryThis(Array.prototype.slice);

var array_reduce = uncurryThis(
    Array.prototype.reduce || function (callback, basis) {
        var index = 0,
            length = this.length;
        // concerning the initial value, if one is not provided
        if (arguments.length === 1) {
            // seek to the first value in the array, accounting
            // for the possibility that is is a sparse array
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        // reduce
        for (; index < length; index++) {
            // account for the possibility that the array is sparse
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    }
);

var array_indexOf = uncurryThis(
    Array.prototype.indexOf || function (value) {
        // not a very good shim, but good enough for our one use of it
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    }
);

var array_map = uncurryThis(
    Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    }
);

var object_create = Object.create || function (prototype) {
    function Type() { }
    Type.prototype = prototype;
    return new Type();
};

var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

var object_keys = Object.keys || function (object) {
    var keys = [];
    for (var key in object) {
        if (object_hasOwnProperty(object, key)) {
            keys.push(key);
        }
    }
    return keys;
};

var object_toString = uncurryThis(Object.prototype.toString);

function isObject(value) {
    return value === Object(value);
}

// generator related shims

// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
function isStopIteration(exception) {
    return (
        object_toString(exception) === "[object StopIteration]" ||
        exception instanceof QReturnValue
    );
}

// FIXME: Remove this helper and Q.return once ES6 generators are in
// SpiderMonkey.
var QReturnValue;
if (typeof ReturnValue !== "undefined") {
    QReturnValue = ReturnValue;
} else {
    QReturnValue = function (value) {
        this.value = value;
    };
}

// Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
// engine that has a deployed base of browsers that support generators.
// However, SM's generators use the Python-inspired semantics of
// outdated ES6 drafts.  We would like to support ES6, but we'd also
// like to make it possible to use generators in deployed browsers, so
// we also support Python-style generators.  At some point we can remove
// this block.
var hasES6Generators;
try {
    /* jshint evil: true, nonew: false */
    new Function("(function* (){ yield 1; })");
    hasES6Generators = true;
} catch (e) {
    hasES6Generators = false;
}

// long stack traces

var STACK_JUMP_SEPARATOR = "From previous event:";

function makeStackTraceLong(error, promise) {
    // If possible, transform the error stack trace by removing Node and Q
    // cruft, then concatenating with the stack trace of `promise`. See #57.
    if (hasStacks &&
        promise.stack &&
        typeof error === "object" &&
        error !== null &&
        error.stack &&
        error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
    ) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack) {
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        error.stack = filterStackString(concatedStacks);
    }
}

function filterStackString(stackString) {
    var lines = stackString.split("\n");
    var desiredLines = [];
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];

        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}

function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
}

function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
        return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];

    return fileName === qFileName &&
        lineNumber >= qStartingLine &&
        lineNumber <= qEndingLine;
}

// discover own file name and line number range for filtering stack
// traces
function captureLine() {
    if (!hasStacks) {
        return;
    }

    try {
        throw new Error();
    } catch (e) {
        var lines = e.stack.split("\n");
        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
            return;
        }

        qFileName = fileNameAndLineNumber[0];
        return fileNameAndLineNumber[1];
    }
}

function deprecate(callback, name, alternative) {
    return function () {
        if (typeof console !== "undefined" &&
            typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative +
                         " instead.", new Error("").stack);
        }
        return callback.apply(callback, arguments);
    };
}

// end of shims
// beginning of real work

/**
 * Constructs a promise for an immediate reference, passes promises through, or
 * coerces promises from different systems.
 * @param value immediate reference or promise
 */
function Q(value) {
    // If the object is already a Promise, return it directly.  This enables
    // the resolve function to both be used to created references from objects,
    // but to tolerably coerce non-promises to promises.
    if (isPromise(value)) {
        return value;
    }

    // assimilate thenables
    if (isPromiseAlike(value)) {
        return coerce(value);
    } else {
        return fulfill(value);
    }
}
Q.resolve = Q;

/**
 * Performs a task in a future turn of the event loop.
 * @param {Function} task
 */
Q.nextTick = nextTick;

/**
 * Controls whether or not long stack traces will be on
 */
Q.longStackSupport = false;

/**
 * Constructs a {promise, resolve, reject} object.
 *
 * `resolve` is a callback to invoke with a more resolved value for the
 * promise. To fulfill the promise, invoke `resolve` with any value that is
 * not a thenable. To reject the promise, invoke `resolve` with a rejected
 * thenable, or invoke `reject` with the reason directly. To resolve the
 * promise to another thenable, thus putting it in the same state, invoke
 * `resolve` with that other thenable.
 */
Q.defer = defer;
function defer() {
    // if "messages" is an "Array", that indicates that the promise has not yet
    // been resolved.  If it is "undefined", it has been resolved.  Each
    // element of the messages array is itself an array of complete arguments to
    // forward to the resolved promise.  We coerce the resolution value to a
    // promise using the `resolve` function because it handles both fully
    // non-thenable values and other thenables gracefully.
    var messages = [], progressListeners = [], resolvedPromise;

    var deferred = object_create(defer.prototype);
    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, operands) {
        var args = array_slice(arguments);
        if (messages) {
            messages.push(args);
            if (op === "when" && operands[1]) { // progress operand
                progressListeners.push(operands[1]);
            }
        } else {
            nextTick(function () {
                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
            });
        }
    };

    // XXX deprecated
    promise.valueOf = deprecate(function () {
        if (messages) {
            return promise;
        }
        var nearerValue = nearer(resolvedPromise);
        if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue; // shorten chain
        }
        return nearerValue;
    }, "valueOf", "inspect");

    promise.inspect = function () {
        if (!resolvedPromise) {
            return { state: "pending" };
        }
        return resolvedPromise.inspect();
    };

    if (Q.longStackSupport && hasStacks) {
        try {
            throw new Error();
        } catch (e) {
            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
            // accessor around; that causes memory leaks as per GH-111. Just
            // reify the stack trace as a string ASAP.
            //
            // At the same time, cut off the first line; it's always just
            // "[object Promise]\n", as per the `toString`.
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
        }
    }

    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
    // consolidating them into `become`, since otherwise we'd create new
    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

    function become(newPromise) {
        resolvedPromise = newPromise;
        promise.source = newPromise;

        array_reduce(messages, function (undefined, message) {
            nextTick(function () {
                newPromise.promiseDispatch.apply(newPromise, message);
            });
        }, void 0);

        messages = void 0;
        progressListeners = void 0;
    }

    deferred.promise = promise;
    deferred.resolve = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(Q(value));
    };

    deferred.fulfill = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(fulfill(value));
    };
    deferred.reject = function (reason) {
        if (resolvedPromise) {
            return;
        }

        become(reject(reason));
    };
    deferred.notify = function (progress) {
        if (resolvedPromise) {
            return;
        }

        array_reduce(progressListeners, function (undefined, progressListener) {
            nextTick(function () {
                progressListener(progress);
            });
        }, void 0);
    };

    return deferred;
}

/**
 * Creates a Node-style callback that will resolve or reject the deferred
 * promise.
 * @returns a nodeback
 */
defer.prototype.makeNodeResolver = function () {
    var self = this;
    return function (error, value) {
        if (error) {
            self.reject(error);
        } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    };
};

/**
 * @param resolver {Function} a function that returns nothing and accepts
 * the resolve, reject, and notify functions for a deferred.
 * @returns a promise that may be resolved with the given resolve and reject
 * functions, or rejected by a thrown exception in resolver
 */
Q.promise = promise;
function promise(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("resolver must be a function.");
    }
    var deferred = defer();
    try {
        resolver(deferred.resolve, deferred.reject, deferred.notify);
    } catch (reason) {
        deferred.reject(reason);
    }
    return deferred.promise;
}

// XXX experimental.  This method is a way to denote that a local value is
// serializable and should be immediately dispatched to a remote upon request,
// instead of passing a reference.
Q.passByCopy = function (object) {
    //freeze(object);
    //passByCopies.set(object, true);
    return object;
};

Promise.prototype.passByCopy = function () {
    //freeze(object);
    //passByCopies.set(object, true);
    return this;
};

/**
 * If two promises eventually fulfill to the same value, promises that value,
 * but otherwise rejects.
 * @param x {Any*}
 * @param y {Any*}
 * @returns {Any*} a promise for x and y if they are the same, but a rejection
 * otherwise.
 *
 */
Q.join = function (x, y) {
    return Q(x).join(y);
};

Promise.prototype.join = function (that) {
    return Q([this, that]).spread(function (x, y) {
        if (x === y) {
            // TODO: "===" should be Object.is or equiv
            return x;
        } else {
            throw new Error("Can't join: not the same: " + x + " " + y);
        }
    });
};

/**
 * Returns a promise for the first of an array of promises to become fulfilled.
 * @param answers {Array[Any*]} promises to race
 * @returns {Any*} the first promise to be fulfilled
 */
Q.race = race;
function race(answerPs) {
    return promise(function(resolve, reject) {
        // Switch to this once we can assume at least ES5
        // answerPs.forEach(function(answerP) {
        //     Q(answerP).then(resolve, reject);
        // });
        // Use this in the meantime
        for (var i = 0, len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject);
        }
    });
}

Promise.prototype.race = function () {
    return this.then(Q.race);
};

/**
 * Constructs a Promise with a promise descriptor object and optional fallback
 * function.  The descriptor contains methods like when(rejected), get(name),
 * set(name, value), post(name, args), and delete(name), which all
 * return either a value, a promise for a value, or a rejection.  The fallback
 * accepts the operation name, a resolver, and any further arguments that would
 * have been forwarded to the appropriate method above had a method been
 * provided with the proper name.  The API makes no guarantees about the nature
 * of the returned object, apart from that it is usable whereever promises are
 * bought and sold.
 */
Q.makePromise = Promise;
function Promise(descriptor, fallback, inspect) {
    if (fallback === void 0) {
        fallback = function (op) {
            return reject(new Error(
                "Promise does not support operation: " + op
            ));
        };
    }
    if (inspect === void 0) {
        inspect = function () {
            return {state: "unknown"};
        };
    }

    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, args) {
        var result;
        try {
            if (descriptor[op]) {
                result = descriptor[op].apply(promise, args);
            } else {
                result = fallback.call(promise, op, args);
            }
        } catch (exception) {
            result = reject(exception);
        }
        if (resolve) {
            resolve(result);
        }
    };

    promise.inspect = inspect;

    // XXX deprecated `valueOf` and `exception` support
    if (inspect) {
        var inspected = inspect();
        if (inspected.state === "rejected") {
            promise.exception = inspected.reason;
        }

        promise.valueOf = deprecate(function () {
            var inspected = inspect();
            if (inspected.state === "pending" ||
                inspected.state === "rejected") {
                return promise;
            }
            return inspected.value;
        });
    }

    return promise;
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.then = function (fulfilled, rejected, progressed) {
    var self = this;
    var deferred = defer();
    var done = false;   // ensure the untrusted promise makes at most a
                        // single call to one of the callbacks

    function _fulfilled(value) {
        try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
        } catch (exception) {
            return reject(exception);
        }
    }

    function _rejected(exception) {
        if (typeof rejected === "function") {
            makeStackTraceLong(exception, self);
            try {
                return rejected(exception);
            } catch (newException) {
                return reject(newException);
            }
        }
        return reject(exception);
    }

    function _progressed(value) {
        return typeof progressed === "function" ? progressed(value) : value;
    }

    nextTick(function () {
        self.promiseDispatch(function (value) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_fulfilled(value));
        }, "when", [function (exception) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_rejected(exception));
        }]);
    });

    // Progress propagator need to be attached in the current tick.
    self.promiseDispatch(void 0, "when", [void 0, function (value) {
        var newValue;
        var threw = false;
        try {
            newValue = _progressed(value);
        } catch (e) {
            threw = true;
            if (Q.onerror) {
                Q.onerror(e);
            } else {
                throw e;
            }
        }

        if (!threw) {
            deferred.notify(newValue);
        }
    }]);

    return deferred.promise;
};

/**
 * Registers an observer on a promise.
 *
 * Guarantees:
 *
 * 1. that fulfilled and rejected will be called only once.
 * 2. that either the fulfilled callback or the rejected callback will be
 *    called, but not both.
 * 3. that fulfilled and rejected will not be called in this turn.
 *
 * @param value      promise or immediate reference to observe
 * @param fulfilled  function to be called with the fulfilled value
 * @param rejected   function to be called with the rejection exception
 * @param progressed function to be called on any progress notifications
 * @return promise for the return value from the invoked callback
 */
Q.when = when;
function when(value, fulfilled, rejected, progressed) {
    return Q(value).then(fulfilled, rejected, progressed);
}

Promise.prototype.thenResolve = function (value) {
    return this.then(function () { return value; });
};

Q.thenResolve = function (promise, value) {
    return Q(promise).thenResolve(value);
};

Promise.prototype.thenReject = function (reason) {
    return this.then(function () { throw reason; });
};

Q.thenReject = function (promise, reason) {
    return Q(promise).thenReject(reason);
};

/**
 * If an object is not a promise, it is as "near" as possible.
 * If a promise is rejected, it is as "near" as possible too.
 * If it’s a fulfilled promise, the fulfillment value is nearer.
 * If it’s a deferred promise and the deferred has been resolved, the
 * resolution is "nearer".
 * @param object
 * @returns most resolved (nearest) form of the object
 */

// XXX should we re-do this?
Q.nearer = nearer;
function nearer(value) {
    if (isPromise(value)) {
        var inspected = value.inspect();
        if (inspected.state === "fulfilled") {
            return inspected.value;
        }
    }
    return value;
}

/**
 * @returns whether the given object is a promise.
 * Otherwise it is a fulfilled value.
 */
Q.isPromise = isPromise;
function isPromise(object) {
    return isObject(object) &&
        typeof object.promiseDispatch === "function" &&
        typeof object.inspect === "function";
}

Q.isPromiseAlike = isPromiseAlike;
function isPromiseAlike(object) {
    return isObject(object) && typeof object.then === "function";
}

/**
 * @returns whether the given object is a pending promise, meaning not
 * fulfilled or rejected.
 */
Q.isPending = isPending;
function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
}

Promise.prototype.isPending = function () {
    return this.inspect().state === "pending";
};

/**
 * @returns whether the given object is a value or fulfilled
 * promise.
 */
Q.isFulfilled = isFulfilled;
function isFulfilled(object) {
    return !isPromise(object) || object.inspect().state === "fulfilled";
}

Promise.prototype.isFulfilled = function () {
    return this.inspect().state === "fulfilled";
};

/**
 * @returns whether the given object is a rejected promise.
 */
Q.isRejected = isRejected;
function isRejected(object) {
    return isPromise(object) && object.inspect().state === "rejected";
}

Promise.prototype.isRejected = function () {
    return this.inspect().state === "rejected";
};

//// BEGIN UNHANDLED REJECTION TRACKING

// This promise library consumes exceptions thrown in handlers so they can be
// handled by a subsequent promise.  The exceptions get added to this array when
// they are created, and removed when they are handled.  Note that in ES6 or
// shimmed environments, this would naturally be a `Set`.
var unhandledReasons = [];
var unhandledRejections = [];
var unhandledReasonsDisplayed = false;
var trackUnhandledRejections = true;
function displayUnhandledReasons() {
    if (
        !unhandledReasonsDisplayed &&
        typeof window !== "undefined" &&
        !window.Touch &&
        window.console
    ) {
        console.warn("[Q] Unhandled rejection reasons (should be empty):",
                     unhandledReasons);
    }

    unhandledReasonsDisplayed = true;
}

function logUnhandledReasons() {
    for (var i = 0; i < unhandledReasons.length; i++) {
        var reason = unhandledReasons[i];
        console.warn("Unhandled rejection reason:", reason);
    }
}

function resetUnhandledRejections() {
    unhandledReasons.length = 0;
    unhandledRejections.length = 0;
    unhandledReasonsDisplayed = false;

    if (!trackUnhandledRejections) {
        trackUnhandledRejections = true;

        // Show unhandled rejection reasons if Node exits without handling an
        // outstanding rejection.  (Note that Browserify presently produces a
        // `process` global without the `EventEmitter` `on` method.)
        if (typeof process !== "undefined" && process.on) {
            process.on("exit", logUnhandledReasons);
        }
    }
}

function trackRejection(promise, reason) {
    if (!trackUnhandledRejections) {
        return;
    }

    unhandledRejections.push(promise);
    if (reason && typeof reason.stack !== "undefined") {
        unhandledReasons.push(reason.stack);
    } else {
        unhandledReasons.push("(no stack) " + reason);
    }
    displayUnhandledReasons();
}

function untrackRejection(promise) {
    if (!trackUnhandledRejections) {
        return;
    }

    var at = array_indexOf(unhandledRejections, promise);
    if (at !== -1) {
        unhandledRejections.splice(at, 1);
        unhandledReasons.splice(at, 1);
    }
}

Q.resetUnhandledRejections = resetUnhandledRejections;

Q.getUnhandledReasons = function () {
    // Make a copy so that consumers can't interfere with our internal state.
    return unhandledReasons.slice();
};

Q.stopUnhandledRejectionTracking = function () {
    resetUnhandledRejections();
    if (typeof process !== "undefined" && process.on) {
        process.removeListener("exit", logUnhandledReasons);
    }
    trackUnhandledRejections = false;
};

resetUnhandledRejections();

//// END UNHANDLED REJECTION TRACKING

/**
 * Constructs a rejected promise.
 * @param reason value describing the failure
 */
Q.reject = reject;
function reject(reason) {
    var rejection = Promise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
        }
    }, function fallback() {
        return this;
    }, function inspect() {
        return { state: "rejected", reason: reason };
    });

    // Note that the reason has not been handled.
    trackRejection(rejection, reason);

    return rejection;
}

/**
 * Constructs a fulfilled promise for an immediate reference.
 * @param value immediate reference
 */
Q.fulfill = fulfill;
function fulfill(value) {
    return Promise({
        "when": function () {
            return value;
        },
        "get": function (name) {
            return value[name];
        },
        "set": function (name, rhs) {
            value[name] = rhs;
        },
        "delete": function (name) {
            delete value[name];
        },
        "post": function (name, args) {
            // Mark Miller proposes that post with no name should apply a
            // promised function.
            if (name === null || name === void 0) {
                return value.apply(void 0, args);
            } else {
                return value[name].apply(value, args);
            }
        },
        "apply": function (thisp, args) {
            return value.apply(thisp, args);
        },
        "keys": function () {
            return object_keys(value);
        }
    }, void 0, function inspect() {
        return { state: "fulfilled", value: value };
    });
}

/**
 * Converts thenables to Q promises.
 * @param promise thenable promise
 * @returns a Q promise
 */
function coerce(promise) {
    var deferred = defer();
    nextTick(function () {
        try {
            promise.then(deferred.resolve, deferred.reject, deferred.notify);
        } catch (exception) {
            deferred.reject(exception);
        }
    });
    return deferred.promise;
}

/**
 * Annotates an object such that it will never be
 * transferred away from this process over any promise
 * communication channel.
 * @param object
 * @returns promise a wrapping of that object that
 * additionally responds to the "isDef" message
 * without a rejection.
 */
Q.master = master;
function master(object) {
    return Promise({
        "isDef": function () {}
    }, function fallback(op, args) {
        return dispatch(object, op, args);
    }, function () {
        return Q(object).inspect();
    });
}

/**
 * Spreads the values of a promised array of arguments into the
 * fulfillment callback.
 * @param fulfilled callback that receives variadic arguments from the
 * promised array
 * @param rejected callback that receives the exception if the promise
 * is rejected.
 * @returns a promise for the return value or thrown exception of
 * either callback.
 */
Q.spread = spread;
function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
}

Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
        return fulfilled.apply(void 0, array);
    }, rejected);
};

/**
 * The async function is a decorator for generator functions, turning
 * them into asynchronous generators.  Although generators are only part
 * of the newest ECMAScript 6 drafts, this code does not cause syntax
 * errors in older engines.  This code should continue to work and will
 * in fact improve over time as the language improves.
 *
 * ES6 generators are currently part of V8 version 3.19 with the
 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
 * for longer, but under an older Python-inspired form.  This function
 * works on both kinds of generators.
 *
 * Decorates a generator function such that:
 *  - it may yield promises
 *  - execution will continue when that promise is fulfilled
 *  - the value of the yield expression will be the fulfilled value
 *  - it returns a promise for the return value (when the generator
 *    stops iterating)
 *  - the decorated function returns a promise for the return value
 *    of the generator or the first rejected promise among those
 *    yielded.
 *  - if an error is thrown in the generator, it propagates through
 *    every following yield until it is caught, or until it escapes
 *    the generator function altogether, and is translated into a
 *    rejection for the promise returned by the decorated generator.
 */
Q.async = async;
function async(makeGenerator) {
    return function () {
        // when verb is "send", arg is a value
        // when verb is "throw", arg is an exception
        function continuer(verb, arg) {
            var result;
            if (hasES6Generators) {
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    return reject(exception);
                }
                if (result.done) {
                    return result.value;
                } else {
                    return when(result.value, callback, errback);
                }
            } else {
                // FIXME: Remove this case when SM does ES6 generators.
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    if (isStopIteration(exception)) {
                        return exception.value;
                    } else {
                        return reject(exception);
                    }
                }
                return when(result, callback, errback);
            }
        }
        var generator = makeGenerator.apply(this, arguments);
        var callback = continuer.bind(continuer, "next");
        var errback = continuer.bind(continuer, "throw");
        return callback();
    };
}

/**
 * The spawn function is a small wrapper around async that immediately
 * calls the generator and also ends the promise chain, so that any
 * unhandled errors are thrown instead of forwarded to the error
 * handler. This is useful because it's extremely common to run
 * generators at the top-level to work with libraries.
 */
Q.spawn = spawn;
function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
}

// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
/**
 * Throws a ReturnValue exception to stop an asynchronous generator.
 *
 * This interface is a stop-gap measure to support generator return
 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
 * generators like Chromium 29, just use "return" in your generator
 * functions.
 *
 * @param value the return value for the surrounding generator
 * @throws ReturnValue exception with the value.
 * @example
 * // ES6 style
 * Q.async(function* () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      return foo + bar;
 * })
 * // Older SpiderMonkey style
 * Q.async(function () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      Q.return(foo + bar);
 * })
 */
Q["return"] = _return;
function _return(value) {
    throw new QReturnValue(value);
}

/**
 * The promised function decorator ensures that any promise arguments
 * are settled and passed as values (`this` is also settled and passed
 * as a value).  It will also ensure that the result of a function is
 * always a promise.
 *
 * @example
 * var add = Q.promised(function (a, b) {
 *     return a + b;
 * });
 * add(Q(a), Q(B));
 *
 * @param {function} callback The function to decorate
 * @returns {function} a function that has been decorated.
 */
Q.promised = promised;
function promised(callback) {
    return function () {
        return spread([this, all(arguments)], function (self, args) {
            return callback.apply(self, args);
        });
    };
}

/**
 * sends a message to a value in a future turn
 * @param object* the recipient
 * @param op the name of the message operation, e.g., "when",
 * @param args further arguments to be forwarded to the operation
 * @returns result {Promise} a promise for the result of the operation
 */
Q.dispatch = dispatch;
function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
}

Promise.prototype.dispatch = function (op, args) {
    var self = this;
    var deferred = defer();
    nextTick(function () {
        self.promiseDispatch(deferred.resolve, op, args);
    });
    return deferred.promise;
};

/**
 * Gets the value of a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to get
 * @return promise for the property value
 */
Q.get = function (object, key) {
    return Q(object).dispatch("get", [key]);
};

Promise.prototype.get = function (key) {
    return this.dispatch("get", [key]);
};

/**
 * Sets the value of a property in a future turn.
 * @param object    promise or immediate reference for object object
 * @param name      name of property to set
 * @param value     new value of property
 * @return promise for the return value
 */
Q.set = function (object, key, value) {
    return Q(object).dispatch("set", [key, value]);
};

Promise.prototype.set = function (key, value) {
    return this.dispatch("set", [key, value]);
};

/**
 * Deletes a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to delete
 * @return promise for the return value
 */
Q.del = // XXX legacy
Q["delete"] = function (object, key) {
    return Q(object).dispatch("delete", [key]);
};

Promise.prototype.del = // XXX legacy
Promise.prototype["delete"] = function (key) {
    return this.dispatch("delete", [key]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param value     a value to post, typically an array of
 *                  invocation arguments for promises that
 *                  are ultimately backed with `resolve` values,
 *                  as opposed to those backed with URLs
 *                  wherein the posted value can be any
 *                  JSON serializable object.
 * @return promise for the return value
 */
// bound locally because it is used by other methods
Q.mapply = // XXX As proposed by "Redsandro"
Q.post = function (object, name, args) {
    return Q(object).dispatch("post", [name, args]);
};

Promise.prototype.mapply = // XXX As proposed by "Redsandro"
Promise.prototype.post = function (name, args) {
    return this.dispatch("post", [name, args]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param ...args   array of invocation arguments
 * @return promise for the return value
 */
Q.send = // XXX Mark Miller's proposed parlance
Q.mcall = // XXX As proposed by "Redsandro"
Q.invoke = function (object, name /*...args*/) {
    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
};

Promise.prototype.send = // XXX Mark Miller's proposed parlance
Promise.prototype.mcall = // XXX As proposed by "Redsandro"
Promise.prototype.invoke = function (name /*...args*/) {
    return this.dispatch("post", [name, array_slice(arguments, 1)]);
};

/**
 * Applies the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param args      array of application arguments
 */
Q.fapply = function (object, args) {
    return Q(object).dispatch("apply", [void 0, args]);
};

Promise.prototype.fapply = function (args) {
    return this.dispatch("apply", [void 0, args]);
};

/**
 * Calls the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q["try"] =
Q.fcall = function (object /* ...args*/) {
    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
};

Promise.prototype.fcall = function (/*...args*/) {
    return this.dispatch("apply", [void 0, array_slice(arguments)]);
};

/**
 * Binds the promised function, transforming return values into a fulfilled
 * promise and thrown errors into a rejected one.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q.fbind = function (object /*...args*/) {
    var promise = Q(object);
    var args = array_slice(arguments, 1);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};
Promise.prototype.fbind = function (/*...args*/) {
    var promise = this;
    var args = array_slice(arguments);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};

/**
 * Requests the names of the owned properties of a promised
 * object in a future turn.
 * @param object    promise or immediate reference for target object
 * @return promise for the keys of the eventually settled object
 */
Q.keys = function (object) {
    return Q(object).dispatch("keys", []);
};

Promise.prototype.keys = function () {
    return this.dispatch("keys", []);
};

/**
 * Turns an array of promises into a promise for an array.  If any of
 * the promises gets rejected, the whole array is rejected immediately.
 * @param {Array*} an array (or promise for an array) of values (or
 * promises for values)
 * @returns a promise for an array of the corresponding values
 */
// By Mark Miller
// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
Q.all = all;
function all(promises) {
    return when(promises, function (promises) {
        var countDown = 0;
        var deferred = defer();
        array_reduce(promises, function (undefined, promise, index) {
            var snapshot;
            if (
                isPromise(promise) &&
                (snapshot = promise.inspect()).state === "fulfilled"
            ) {
                promises[index] = snapshot.value;
            } else {
                ++countDown;
                when(
                    promise,
                    function (value) {
                        promises[index] = value;
                        if (--countDown === 0) {
                            deferred.resolve(promises);
                        }
                    },
                    deferred.reject,
                    function (progress) {
                        deferred.notify({ index: index, value: progress });
                    }
                );
            }
        }, void 0);
        if (countDown === 0) {
            deferred.resolve(promises);
        }
        return deferred.promise;
    });
}

Promise.prototype.all = function () {
    return all(this);
};

/**
 * Waits for all promises to be settled, either fulfilled or
 * rejected.  This is distinct from `all` since that would stop
 * waiting at the first rejection.  The promise returned by
 * `allResolved` will never be rejected.
 * @param promises a promise for an array (or an array) of promises
 * (or values)
 * @return a promise for an array of promises
 */
Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
function allResolved(promises) {
    return when(promises, function (promises) {
        promises = array_map(promises, Q);
        return when(all(array_map(promises, function (promise) {
            return when(promise, noop, noop);
        })), function () {
            return promises;
        });
    });
}

Promise.prototype.allResolved = function () {
    return allResolved(this);
};

/**
 * @see Promise#allSettled
 */
Q.allSettled = allSettled;
function allSettled(promises) {
    return Q(promises).allSettled();
}

/**
 * Turns an array of promises into a promise for an array of their states (as
 * returned by `inspect`) when they have all settled.
 * @param {Array[Any*]} values an array (or promise for an array) of values (or
 * promises for values)
 * @returns {Array[State]} an array of states for the respective values.
 */
Promise.prototype.allSettled = function () {
    return this.then(function (promises) {
        return all(array_map(promises, function (promise) {
            promise = Q(promise);
            function regardless() {
                return promise.inspect();
            }
            return promise.then(regardless, regardless);
        }));
    });
};

/**
 * Captures the failure of a promise, giving an oportunity to recover
 * with a callback.  If the given promise is fulfilled, the returned
 * promise is fulfilled.
 * @param {Any*} promise for something
 * @param {Function} callback to fulfill the returned promise if the
 * given promise is rejected
 * @returns a promise for the return value of the callback
 */
Q.fail = // XXX legacy
Q["catch"] = function (object, rejected) {
    return Q(object).then(void 0, rejected);
};

Promise.prototype.fail = // XXX legacy
Promise.prototype["catch"] = function (rejected) {
    return this.then(void 0, rejected);
};

/**
 * Attaches a listener that can respond to progress notifications from a
 * promise's originating deferred. This listener receives the exact arguments
 * passed to ``deferred.notify``.
 * @param {Any*} promise for something
 * @param {Function} callback to receive any progress notifications
 * @returns the given promise, unchanged
 */
Q.progress = progress;
function progress(object, progressed) {
    return Q(object).then(void 0, void 0, progressed);
}

Promise.prototype.progress = function (progressed) {
    return this.then(void 0, void 0, progressed);
};

/**
 * Provides an opportunity to observe the settling of a promise,
 * regardless of whether the promise is fulfilled or rejected.  Forwards
 * the resolution to the returned promise when the callback is done.
 * The callback can return a promise to defer completion.
 * @param {Any*} promise
 * @param {Function} callback to observe the resolution of the given
 * promise, takes no arguments.
 * @returns a promise for the resolution of the given promise when
 * ``fin`` is done.
 */
Q.fin = // XXX legacy
Q["finally"] = function (object, callback) {
    return Q(object)["finally"](callback);
};

Promise.prototype.fin = // XXX legacy
Promise.prototype["finally"] = function (callback) {
    callback = Q(callback);
    return this.then(function (value) {
        return callback.fcall().then(function () {
            return value;
        });
    }, function (reason) {
        // TODO attempt to recycle the rejection with "this".
        return callback.fcall().then(function () {
            throw reason;
        });
    });
};

/**
 * Terminates a chain of promises, forcing rejections to be
 * thrown as exceptions.
 * @param {Any*} promise at the end of a chain of promises
 * @returns nothing
 */
Q.done = function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
};

Promise.prototype.done = function (fulfilled, rejected, progress) {
    var onUnhandledError = function (error) {
        // forward to a future turn so that ``when``
        // does not catch it and turn it into a rejection.
        nextTick(function () {
            makeStackTraceLong(error, promise);
            if (Q.onerror) {
                Q.onerror(error);
            } else {
                throw error;
            }
        });
    };

    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
    var promise = fulfilled || rejected || progress ?
        this.then(fulfilled, rejected, progress) :
        this;

    if (typeof process === "object" && process && process.domain) {
        onUnhandledError = process.domain.bind(onUnhandledError);
    }

    promise.then(void 0, onUnhandledError);
};

/**
 * Causes a promise to be rejected if it does not get fulfilled before
 * some milliseconds time out.
 * @param {Any*} promise
 * @param {Number} milliseconds timeout
 * @param {String} custom error message (optional)
 * @returns a promise for the resolution of the given promise if it is
 * fulfilled before the timeout, otherwise rejected.
 */
Q.timeout = function (object, ms, message) {
    return Q(object).timeout(ms, message);
};

Promise.prototype.timeout = function (ms, message) {
    var deferred = defer();
    var timeoutId = setTimeout(function () {
        deferred.reject(new Error(message || "Timed out after " + ms + " ms"));
    }, ms);

    this.then(function (value) {
        clearTimeout(timeoutId);
        deferred.resolve(value);
    }, function (exception) {
        clearTimeout(timeoutId);
        deferred.reject(exception);
    }, deferred.notify);

    return deferred.promise;
};

/**
 * Returns a promise for the given value (or promised value), some
 * milliseconds after it resolved. Passes rejections immediately.
 * @param {Any*} promise
 * @param {Number} milliseconds
 * @returns a promise for the resolution of the given promise after milliseconds
 * time has elapsed since the resolution of the given promise.
 * If the given promise rejects, that is passed immediately.
 */
Q.delay = function (object, timeout) {
    if (timeout === void 0) {
        timeout = object;
        object = void 0;
    }
    return Q(object).delay(timeout);
};

Promise.prototype.delay = function (timeout) {
    return this.then(function (value) {
        var deferred = defer();
        setTimeout(function () {
            deferred.resolve(value);
        }, timeout);
        return deferred.promise;
    });
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided as an array, and returns a promise.
 *
 *      Q.nfapply(FS.readFile, [__filename])
 *      .then(function (content) {
 *      })
 *
 */
Q.nfapply = function (callback, args) {
    return Q(callback).nfapply(args);
};

Promise.prototype.nfapply = function (args) {
    var deferred = defer();
    var nodeArgs = array_slice(args);
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided individually, and returns a promise.
 * @example
 * Q.nfcall(FS.readFile, __filename)
 * .then(function (content) {
 * })
 *
 */
Q.nfcall = function (callback /*...args*/) {
    var args = array_slice(arguments, 1);
    return Q(callback).nfapply(args);
};

Promise.prototype.nfcall = function (/*...args*/) {
    var nodeArgs = array_slice(arguments);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Wraps a NodeJS continuation passing function and returns an equivalent
 * version that returns a promise.
 * @example
 * Q.nfbind(FS.readFile, __filename)("utf-8")
 * .then(console.log)
 * .done()
 */
Q.nfbind =
Q.denodeify = function (callback /*...args*/) {
    var baseArgs = array_slice(arguments, 1);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(callback).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nfbind =
Promise.prototype.denodeify = function (/*...args*/) {
    var args = array_slice(arguments);
    args.unshift(this);
    return Q.denodeify.apply(void 0, args);
};

Q.nbind = function (callback, thisp /*...args*/) {
    var baseArgs = array_slice(arguments, 2);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        function bound() {
            return callback.apply(thisp, arguments);
        }
        Q(bound).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nbind = function (/*thisp, ...args*/) {
    var args = array_slice(arguments, 0);
    args.unshift(this);
    return Q.nbind.apply(void 0, args);
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback with a given array of arguments, plus a provided callback.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param {Array} args arguments to pass to the method; the callback
 * will be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nmapply = // XXX As proposed by "Redsandro"
Q.npost = function (object, name, args) {
    return Q(object).npost(name, args);
};

Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
Promise.prototype.npost = function (name, args) {
    var nodeArgs = array_slice(args || []);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback, forwarding the given variadic arguments, plus a provided
 * callback argument.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param ...args arguments to pass to the method; the callback will
 * be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nsend = // XXX Based on Mark Miller's proposed "send"
Q.nmcall = // XXX Based on "Redsandro's" proposal
Q.ninvoke = function (object, name /*...args*/) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
Promise.prototype.ninvoke = function (name /*...args*/) {
    var nodeArgs = array_slice(arguments, 1);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * If a function would like to support both Node continuation-passing-style and
 * promise-returning-style, it can end its internal promise chain with
 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
 * elects to use a nodeback, the result will be sent there.  If they do not
 * pass a nodeback, they will receive the result promise.
 * @param object a result (or a promise for a result)
 * @param {Function} nodeback a Node.js-style callback
 * @returns either the promise or nothing
 */
Q.nodeify = nodeify;
function nodeify(object, nodeback) {
    return Q(object).nodeify(nodeback);
}

Promise.prototype.nodeify = function (nodeback) {
    if (nodeback) {
        this.then(function (value) {
            nextTick(function () {
                nodeback(null, value);
            });
        }, function (error) {
            nextTick(function () {
                nodeback(error);
            });
        });
    } else {
        return this;
    }
};

// All code before this point will be filtered from stack traces.
var qEndingLine = captureLine();

return Q;

});

}).call(this,require('_process'))
},{"_process":39}],49:[function(require,module,exports){
module.exports = require("./lib/_stream_duplex.js")

},{"./lib/_stream_duplex.js":50}],50:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

module.exports = Duplex;

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}
/*</replacement>*/


/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

forEach(objectKeys(Writable.prototype), function(method) {
  if (!Duplex.prototype[method])
    Duplex.prototype[method] = Writable.prototype[method];
});

function Duplex(options) {
  if (!(this instanceof Duplex))
    return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false)
    this.readable = false;

  if (options && options.writable === false)
    this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false)
    this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended)
    return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  process.nextTick(this.end.bind(this));
}

function forEach (xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

}).call(this,require('_process'))
},{"./_stream_readable":52,"./_stream_writable":54,"_process":39,"core-util-is":55,"inherits":56}],51:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough))
    return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function(chunk, encoding, cb) {
  cb(null, chunk);
};

},{"./_stream_transform":53,"core-util-is":55,"inherits":56}],52:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Readable;

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/


/*<replacement>*/
var Buffer = require('buffer').Buffer;
/*</replacement>*/

Readable.ReadableState = ReadableState;

var EE = require('events').EventEmitter;

/*<replacement>*/
if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

var Stream = require('stream');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var StringDecoder;


/*<replacement>*/
var debug = require('util');
if (debug && debug.debuglog) {
  debug = debug.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/


util.inherits(Readable, Stream);

function ReadableState(options, stream) {
  var Duplex = require('./_stream_duplex');

  options = options || {};

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.buffer = [];
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;


  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex)
    this.objectMode = this.objectMode || !!options.readableObjectMode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder)
      StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  var Duplex = require('./_stream_duplex');

  if (!(this instanceof Readable))
    return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function(chunk, encoding) {
  var state = this._readableState;

  if (util.isString(chunk) && !state.objectMode) {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = new Buffer(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function(chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (util.isNullOrUndefined(chunk)) {
    state.reading = false;
    if (!state.ended)
      onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var e = new Error('stream.unshift() after end event');
      stream.emit('error', e);
    } else {
      if (state.decoder && !addToFront && !encoding)
        chunk = state.decoder.write(chunk);

      if (!addToFront)
        state.reading = false;

      // if we want the data now, just emit it.
      if (state.flowing && state.length === 0 && !state.sync) {
        stream.emit('data', chunk);
        stream.read(0);
      } else {
        // update the buffer info.
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront)
          state.buffer.unshift(chunk);
        else
          state.buffer.push(chunk);

        if (state.needReadable)
          emitReadable(stream);
      }

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}



// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended &&
         (state.needReadable ||
          state.length < state.highWaterMark ||
          state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function(enc) {
  if (!StringDecoder)
    StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 128MB
var MAX_HWM = 0x800000;
function roundUpToNextPowerOf2(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2
    n--;
    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
    n++;
  }
  return n;
}

function howMuchToRead(n, state) {
  if (state.length === 0 && state.ended)
    return 0;

  if (state.objectMode)
    return n === 0 ? 0 : 1;

  if (isNaN(n) || util.isNull(n)) {
    // only flow one buffer at a time
    if (state.flowing && state.buffer.length)
      return state.buffer[0].length;
    else
      return state.length;
  }

  if (n <= 0)
    return 0;

  // If we're asking for more than the target buffer level,
  // then raise the water mark.  Bump up to the next highest
  // power of 2, to prevent increasing it excessively in tiny
  // amounts.
  if (n > state.highWaterMark)
    state.highWaterMark = roundUpToNextPowerOf2(n);

  // don't have that much.  return null, unless we've ended.
  if (n > state.length) {
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    } else
      return state.length;
  }

  return n;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function(n) {
  debug('read', n);
  var state = this._readableState;
  var nOrig = n;

  if (!util.isNumber(n) || n > 0)
    state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 &&
      state.needReadable &&
      (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended)
      endReadable(this);
    else
      emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0)
      endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  }

  if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0)
      state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
  }

  // If _read pushed data synchronously, then `reading` will be false,
  // and we need to re-evaluate how much data we can return to the user.
  if (doRead && !state.reading)
    n = howMuchToRead(nOrig, state);

  var ret;
  if (n > 0)
    ret = fromList(n, state);
  else
    ret = null;

  if (util.isNull(ret)) {
    state.needReadable = true;
    n = 0;
  }

  state.length -= n;

  // If we have nothing in the buffer, then we want to know
  // as soon as we *do* get something into the buffer.
  if (state.length === 0 && !state.ended)
    state.needReadable = true;

  // If we tried to read() past the EOF, then emit end on the next tick.
  if (nOrig !== n && state.ended && state.length === 0)
    endReadable(this);

  if (!util.isNull(ret))
    this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!util.isBuffer(chunk) &&
      !util.isString(chunk) &&
      !util.isNullOrUndefined(chunk) &&
      !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}


function onEofChunk(stream, state) {
  if (state.decoder && !state.ended) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync)
      process.nextTick(function() {
        emitReadable_(stream);
      });
    else
      emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}


// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(function() {
      maybeReadMore_(stream, state);
    });
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended &&
         state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;
    else
      len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function(n) {
  this.emit('error', new Error('not implemented'));
};

Readable.prototype.pipe = function(dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
              dest !== process.stdout &&
              dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted)
    process.nextTick(endFn);
  else
    src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain &&
        (!dest._writableState || dest._writableState.needDrain))
      ondrain();
  }

  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    if (false === ret) {
      debug('false write response, pause',
            src._readableState.awaitDrain);
      src._readableState.awaitDrain++;
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EE.listenerCount(dest, 'error') === 0)
      dest.emit('error', er);
  }
  // This is a brutally ugly hack to make sure that our error handler
  // is attached before any userland ones.  NEVER DO THIS.
  if (!dest._events || !dest._events.error)
    dest.on('error', onerror);
  else if (isArray(dest._events.error))
    dest._events.error.unshift(onerror);
  else
    dest._events.error = [onerror, dest._events.error];



  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain)
      state.awaitDrain--;
    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}


Readable.prototype.unpipe = function(dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0)
    return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes)
      return this;

    if (!dest)
      dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest)
      dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++)
      dests[i].emit('unpipe', this);
    return this;
  }

  // try to find the right one.
  var i = indexOf(state.pipes, dest);
  if (i === -1)
    return this;

  state.pipes.splice(i, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1)
    state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function(ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  // If listening to data, and it has not explicitly been paused,
  // then call resume to start the flow of data on the next tick.
  if (ev === 'data' && false !== this._readableState.flowing) {
    this.resume();
  }

  if (ev === 'readable' && this.readable) {
    var state = this._readableState;
    if (!state.readableListening) {
      state.readableListening = true;
      state.emittedReadable = false;
      state.needReadable = true;
      if (!state.reading) {
        var self = this;
        process.nextTick(function() {
          debug('readable nexttick read 0');
          self.read(0);
        });
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function() {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    if (!state.reading) {
      debug('resume read 0');
      this.read(0);
    }
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(function() {
      resume_(stream, state);
    });
  }
}

function resume_(stream, state) {
  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading)
    stream.read(0);
}

Readable.prototype.pause = function() {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  if (state.flowing) {
    do {
      var chunk = stream.read();
    } while (null !== chunk && state.flowing);
  }
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function(stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function() {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length)
        self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function(chunk) {
    debug('wrapped data');
    if (state.decoder)
      chunk = state.decoder.write(chunk);
    if (!chunk || !state.objectMode && !chunk.length)
      return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
      this[i] = function(method) { return function() {
        return stream[method].apply(stream, arguments);
      }}(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function(ev) {
    stream.on(ev, self.emit.bind(self, ev));
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function(n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};



// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
function fromList(n, state) {
  var list = state.buffer;
  var length = state.length;
  var stringMode = !!state.decoder;
  var objectMode = !!state.objectMode;
  var ret;

  // nothing in the list, definitely empty.
  if (list.length === 0)
    return null;

  if (length === 0)
    ret = null;
  else if (objectMode)
    ret = list.shift();
  else if (!n || n >= length) {
    // read it all, truncate the array.
    if (stringMode)
      ret = list.join('');
    else
      ret = Buffer.concat(list, length);
    list.length = 0;
  } else {
    // read just some of it.
    if (n < list[0].length) {
      // just take a part of the first list item.
      // slice is the same for buffers and strings.
      var buf = list[0];
      ret = buf.slice(0, n);
      list[0] = buf.slice(n);
    } else if (n === list[0].length) {
      // first list is a perfect match
      ret = list.shift();
    } else {
      // complex case.
      // we have enough to cover it, but it spans past the first buffer.
      if (stringMode)
        ret = '';
      else
        ret = new Buffer(n);

      var c = 0;
      for (var i = 0, l = list.length; i < l && c < n; i++) {
        var buf = list[0];
        var cpy = Math.min(n - c, buf.length);

        if (stringMode)
          ret += buf.slice(0, cpy);
        else
          buf.copy(ret, c, 0, cpy);

        if (cpy < buf.length)
          list[0] = buf.slice(cpy);
        else
          list.shift();

        c += cpy;
      }
    }
  }

  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0)
    throw new Error('endReadable called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(function() {
      // Check that we didn't get one last unshift.
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit('end');
      }
    });
  }
}

function forEach (xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf (xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

}).call(this,require('_process'))
},{"./_stream_duplex":50,"_process":39,"buffer":33,"core-util-is":55,"events":37,"inherits":56,"isarray":57,"stream":43,"string_decoder/":58,"util":32}],53:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);


function TransformState(options, stream) {
  this.afterTransform = function(er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb)
    return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (!util.isNullOrUndefined(data))
    stream.push(data);

  if (cb)
    cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}


function Transform(options) {
  if (!(this instanceof Transform))
    return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(options, this);

  // when the writable side finishes, then flush out anything remaining.
  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  this.once('prefinish', function() {
    if (util.isFunction(this._flush))
      this._flush(function(er) {
        done(stream, er);
      });
    else
      done(stream);
  });
}

Transform.prototype.push = function(chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function(chunk, encoding, cb) {
  throw new Error('not implemented');
};

Transform.prototype._write = function(chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform ||
        rs.needReadable ||
        rs.length < rs.highWaterMark)
      this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function(n) {
  var ts = this._transformState;

  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};


function done(stream, er) {
  if (er)
    return stream.emit('error', er);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length)
    throw new Error('calling transform done when ws.length != 0');

  if (ts.transforming)
    throw new Error('calling transform done when still transforming');

  return stream.push(null);
}

},{"./_stream_duplex":50,"core-util-is":55,"inherits":56}],54:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, cb), and it'll handle all
// the drain event emission and buffering.

module.exports = Writable;

/*<replacement>*/
var Buffer = require('buffer').Buffer;
/*</replacement>*/

Writable.WritableState = WritableState;


/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Stream = require('stream');

util.inherits(Writable, Stream);

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
}

function WritableState(options, stream) {
  var Duplex = require('./_stream_duplex');

  options = options || {};

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex)
    this.objectMode = this.objectMode || !!options.writableObjectMode;

  // cast to ints.
  this.highWaterMark = ~~this.highWaterMark;

  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function(er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.buffer = [];

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;
}

function Writable(options) {
  var Duplex = require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, though they're not
  // instanceof Writable, they're instanceof Readable.
  if (!(this instanceof Writable) && !(this instanceof Duplex))
    return new Writable(options);

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function() {
  this.emit('error', new Error('Cannot pipe. Not readable.'));
};


function writeAfterEnd(stream, state, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  process.nextTick(function() {
    cb(er);
  });
}

// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  if (!util.isBuffer(chunk) &&
      !util.isString(chunk) &&
      !util.isNullOrUndefined(chunk) &&
      !state.objectMode) {
    var er = new TypeError('Invalid non-string/buffer chunk');
    stream.emit('error', er);
    process.nextTick(function() {
      cb(er);
    });
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function(chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  if (util.isFunction(encoding)) {
    cb = encoding;
    encoding = null;
  }

  if (util.isBuffer(chunk))
    encoding = 'buffer';
  else if (!encoding)
    encoding = state.defaultEncoding;

  if (!util.isFunction(cb))
    cb = function() {};

  if (state.ended)
    writeAfterEnd(this, state, cb);
  else if (validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function() {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function() {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing &&
        !state.corked &&
        !state.finished &&
        !state.bufferProcessing &&
        state.buffer.length)
      clearBuffer(this, state);
  }
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode &&
      state.decodeStrings !== false &&
      util.isString(chunk)) {
    chunk = new Buffer(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);
  if (util.isBuffer(chunk))
    encoding = 'buffer';
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret)
    state.needDrain = true;

  if (state.writing || state.corked)
    state.buffer.push(new WriteReq(chunk, encoding, cb));
  else
    doWrite(stream, state, false, len, chunk, encoding, cb);

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev)
    stream._writev(chunk, state.onwrite);
  else
    stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  if (sync)
    process.nextTick(function() {
      state.pendingcb--;
      cb(er);
    });
  else {
    state.pendingcb--;
    cb(er);
  }

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er)
    onwriteError(stream, state, sync, er, cb);
  else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(stream, state);

    if (!finished &&
        !state.corked &&
        !state.bufferProcessing &&
        state.buffer.length) {
      clearBuffer(stream, state);
    }

    if (sync) {
      process.nextTick(function() {
        afterWrite(stream, state, finished, cb);
      });
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished)
    onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}


// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;

  if (stream._writev && state.buffer.length > 1) {
    // Fast case, write everything using _writev()
    var cbs = [];
    for (var c = 0; c < state.buffer.length; c++)
      cbs.push(state.buffer[c].callback);

    // count the one we are adding, as well.
    // TODO(isaacs) clean this up
    state.pendingcb++;
    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
      for (var i = 0; i < cbs.length; i++) {
        state.pendingcb--;
        cbs[i](err);
      }
    });

    // Clear buffer
    state.buffer = [];
  } else {
    // Slow case, write chunks one-by-one
    for (var c = 0; c < state.buffer.length; c++) {
      var entry = state.buffer[c];
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);

      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        c++;
        break;
      }
    }

    if (c < state.buffer.length)
      state.buffer = state.buffer.slice(c);
    else
      state.buffer.length = 0;
  }

  state.bufferProcessing = false;
}

Writable.prototype._write = function(chunk, encoding, cb) {
  cb(new Error('not implemented'));

};

Writable.prototype._writev = null;

Writable.prototype.end = function(chunk, encoding, cb) {
  var state = this._writableState;

  if (util.isFunction(chunk)) {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (util.isFunction(encoding)) {
    cb = encoding;
    encoding = null;
  }

  if (!util.isNullOrUndefined(chunk))
    this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished)
    endWritable(this, state, cb);
};


function needFinish(stream, state) {
  return (state.ending &&
          state.length === 0 &&
          !state.finished &&
          !state.writing);
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(stream, state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else
      prefinish(stream, state);
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished)
      process.nextTick(cb);
    else
      stream.once('finish', cb);
  }
  state.ended = true;
}

}).call(this,require('_process'))
},{"./_stream_duplex":50,"_process":39,"buffer":33,"core-util-is":55,"inherits":56,"stream":43}],55:[function(require,module,exports){
(function (Buffer){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

function isBuffer(arg) {
  return Buffer.isBuffer(arg);
}
exports.isBuffer = isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}
}).call(this,require("buffer").Buffer)
},{"buffer":33}],56:[function(require,module,exports){
module.exports=require(38)
},{"/Users/stomita/Work/Salesforce/jsforce.publish/node_modules/browserify/node_modules/inherits/inherits_browser.js":38}],57:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],58:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = require('buffer').Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}

},{"buffer":33}],59:[function(require,module,exports){
module.exports = require("./lib/_stream_passthrough.js")

},{"./lib/_stream_passthrough.js":51}],60:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = require('stream');
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":50,"./lib/_stream_passthrough.js":51,"./lib/_stream_readable.js":52,"./lib/_stream_transform.js":53,"./lib/_stream_writable.js":54,"stream":43}],61:[function(require,module,exports){
module.exports = require("./lib/_stream_transform.js")

},{"./lib/_stream_transform.js":53}],62:[function(require,module,exports){
module.exports = require("./lib/_stream_writable.js")

},{"./lib/_stream_writable.js":54}],63:[function(require,module,exports){
//     Underscore.js 1.4.4
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.4.4';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? null : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value || _.identity);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(concat.apply(ArrayProto, arguments));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(context, args.concat(slice.call(arguments)));
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] == null) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(n);
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

},{}],64:[function(require,module,exports){
// Generated by CoffeeScript 1.7.1
(function() {
  var xml2js;

  xml2js = require('../lib/xml2js');

  exports.stripBOM = function(str) {
    if (str[0] === '\uFEFF') {
      return str.substring(1);
    } else {
      return str;
    }
  };

}).call(this);

},{"../lib/xml2js":66}],65:[function(require,module,exports){
// Generated by CoffeeScript 1.7.1
(function() {
  var prefixMatch;

  prefixMatch = new RegExp(/(?!xmlns)^.*:/);

  exports.normalize = function(str) {
    return str.toLowerCase();
  };

  exports.firstCharLowerCase = function(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  };

  exports.stripPrefix = function(str) {
    return str.replace(prefixMatch, '');
  };

}).call(this);

},{}],66:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.7.1
(function() {
  var bom, builder, events, isEmpty, processName, processors, sax,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  sax = require('sax');

  events = require('events');

  builder = require('xmlbuilder');

  bom = require('./bom');

  processors = require('./processors');

  isEmpty = function(thing) {
    return typeof thing === "object" && (thing != null) && Object.keys(thing).length === 0;
  };

  processName = function(processors, processedName) {
    var process, _i, _len;
    for (_i = 0, _len = processors.length; _i < _len; _i++) {
      process = processors[_i];
      processedName = process(processedName);
    }
    return processedName;
  };

  exports.processors = processors;

  exports.defaults = {
    "0.1": {
      explicitCharkey: false,
      trim: true,
      normalize: true,
      normalizeTags: false,
      attrkey: "@",
      charkey: "#",
      explicitArray: false,
      ignoreAttrs: false,
      mergeAttrs: false,
      explicitRoot: false,
      validator: null,
      xmlns: false,
      explicitChildren: false,
      childkey: '@@',
      charsAsChildren: false,
      async: false,
      strict: true,
      attrNameProcessors: null,
      tagNameProcessors: null
    },
    "0.2": {
      explicitCharkey: false,
      trim: false,
      normalize: false,
      normalizeTags: false,
      attrkey: "$",
      charkey: "_",
      explicitArray: true,
      ignoreAttrs: false,
      mergeAttrs: false,
      explicitRoot: true,
      validator: null,
      xmlns: false,
      explicitChildren: false,
      childkey: '$$',
      charsAsChildren: false,
      async: false,
      strict: true,
      attrNameProcessors: null,
      tagNameProcessors: null,
      rootName: 'root',
      xmldec: {
        'version': '1.0',
        'encoding': 'UTF-8',
        'standalone': true
      },
      doctype: null,
      renderOpts: {
        'pretty': true,
        'indent': '  ',
        'newline': '\n'
      },
      headless: false
    }
  };

  exports.ValidationError = (function(_super) {
    __extends(ValidationError, _super);

    function ValidationError(message) {
      this.message = message;
    }

    return ValidationError;

  })(Error);

  exports.Builder = (function() {
    function Builder(opts) {
      var key, value, _ref;
      this.options = {};
      _ref = exports.defaults["0.2"];
      for (key in _ref) {
        if (!__hasProp.call(_ref, key)) continue;
        value = _ref[key];
        this.options[key] = value;
      }
      for (key in opts) {
        if (!__hasProp.call(opts, key)) continue;
        value = opts[key];
        this.options[key] = value;
      }
    }

    Builder.prototype.buildObject = function(rootObj) {
      var attrkey, charkey, render, rootElement, rootName;
      attrkey = this.options.attrkey;
      charkey = this.options.charkey;
      if ((Object.keys(rootObj).length === 1) && (this.options.rootName === exports.defaults['0.2'].rootName)) {
        rootName = Object.keys(rootObj)[0];
        rootObj = rootObj[rootName];
      } else {
        rootName = this.options.rootName;
      }
      render = function(element, obj) {
        var attr, child, entry, index, key, value, _ref, _ref1;
        if (typeof obj !== 'object') {
          element.txt(obj);
        } else {
          for (key in obj) {
            if (!__hasProp.call(obj, key)) continue;
            child = obj[key];
            if (key === attrkey) {
              if (typeof child === "object") {
                for (attr in child) {
                  value = child[attr];
                  element = element.att(attr, value);
                }
              }
            } else if (key === charkey) {
              element = element.txt(child);
            } else if (typeof child === 'object' && ((child != null ? child.constructor : void 0) != null) && ((child != null ? (_ref = child.constructor) != null ? _ref.name : void 0 : void 0) != null) && (child != null ? (_ref1 = child.constructor) != null ? _ref1.name : void 0 : void 0) === 'Array') {
              for (index in child) {
                if (!__hasProp.call(child, index)) continue;
                entry = child[index];
                if (typeof entry === 'string') {
                  element = element.ele(key, entry).up();
                } else {
                  element = arguments.callee(element.ele(key), entry).up();
                }
              }
            } else if (typeof child === "object") {
              element = arguments.callee(element.ele(key), child).up();
            } else {
              element = element.ele(key, child.toString()).up();
            }
          }
        }
        return element;
      };
      rootElement = builder.create(rootName, this.options.xmldec, this.options.doctype, {
        headless: this.options.headless
      });
      return render(rootElement, rootObj).end(this.options.renderOpts);
    };

    return Builder;

  })();

  exports.Parser = (function(_super) {
    __extends(Parser, _super);

    function Parser(opts) {
      this.parseString = __bind(this.parseString, this);
      this.reset = __bind(this.reset, this);
      this.assignOrPush = __bind(this.assignOrPush, this);
      var key, value, _ref;
      if (!(this instanceof exports.Parser)) {
        return new exports.Parser(opts);
      }
      this.options = {};
      _ref = exports.defaults["0.2"];
      for (key in _ref) {
        if (!__hasProp.call(_ref, key)) continue;
        value = _ref[key];
        this.options[key] = value;
      }
      for (key in opts) {
        if (!__hasProp.call(opts, key)) continue;
        value = opts[key];
        this.options[key] = value;
      }
      if (this.options.xmlns) {
        this.options.xmlnskey = this.options.attrkey + "ns";
      }
      if (this.options.normalizeTags) {
        if (!this.options.tagNameProcessors) {
          this.options.tagNameProcessors = [];
        }
        this.options.tagNameProcessors.unshift(processors.normalize);
      }
      this.reset();
    }

    Parser.prototype.assignOrPush = function(obj, key, newValue) {
      if (!(key in obj)) {
        if (!this.options.explicitArray) {
          return obj[key] = newValue;
        } else {
          return obj[key] = [newValue];
        }
      } else {
        if (!(obj[key] instanceof Array)) {
          obj[key] = [obj[key]];
        }
        return obj[key].push(newValue);
      }
    };

    Parser.prototype.reset = function() {
      var attrkey, charkey, ontext, stack;
      this.removeAllListeners();
      this.saxParser = sax.parser(this.options.strict, {
        trim: false,
        normalize: false,
        xmlns: this.options.xmlns
      });
      this.saxParser.errThrown = false;
      this.saxParser.onerror = (function(_this) {
        return function(error) {
          _this.saxParser.resume();
          if (!_this.saxParser.errThrown) {
            _this.saxParser.errThrown = true;
            return _this.emit("error", error);
          }
        };
      })(this);
      this.saxParser.ended = false;
      this.EXPLICIT_CHARKEY = this.options.explicitCharkey;
      this.resultObject = null;
      stack = [];
      attrkey = this.options.attrkey;
      charkey = this.options.charkey;
      this.saxParser.onopentag = (function(_this) {
        return function(node) {
          var key, newValue, obj, processedKey, _ref;
          obj = {};
          obj[charkey] = "";
          if (!_this.options.ignoreAttrs) {
            _ref = node.attributes;
            for (key in _ref) {
              if (!__hasProp.call(_ref, key)) continue;
              if (!(attrkey in obj) && !_this.options.mergeAttrs) {
                obj[attrkey] = {};
              }
              newValue = node.attributes[key];
              processedKey = _this.options.attrNameProcessors ? processName(_this.options.attrNameProcessors, key) : key;
              if (_this.options.mergeAttrs) {
                _this.assignOrPush(obj, processedKey, newValue);
              } else {
                obj[attrkey][processedKey] = newValue;
              }
            }
          }
          obj["#name"] = _this.options.tagNameProcessors ? processName(_this.options.tagNameProcessors, node.name) : node.name;
          if (_this.options.xmlns) {
            obj[_this.options.xmlnskey] = {
              uri: node.uri,
              local: node.local
            };
          }
          return stack.push(obj);
        };
      })(this);
      this.saxParser.onclosetag = (function(_this) {
        return function() {
          var cdata, emptyStr, err, node, nodeName, obj, old, s, xpath;
          obj = stack.pop();
          nodeName = obj["#name"];
          delete obj["#name"];
          cdata = obj.cdata;
          delete obj.cdata;
          s = stack[stack.length - 1];
          if (obj[charkey].match(/^\s*$/) && !cdata) {
            emptyStr = obj[charkey];
            delete obj[charkey];
          } else {
            if (_this.options.trim) {
              obj[charkey] = obj[charkey].trim();
            }
            if (_this.options.normalize) {
              obj[charkey] = obj[charkey].replace(/\s{2,}/g, " ").trim();
            }
            if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
              obj = obj[charkey];
            }
          }
          if (isEmpty(obj)) {
            obj = _this.options.emptyTag !== void 0 ? _this.options.emptyTag : emptyStr;
          }
          if (_this.options.validator != null) {
            xpath = "/" + ((function() {
              var _i, _len, _results;
              _results = [];
              for (_i = 0, _len = stack.length; _i < _len; _i++) {
                node = stack[_i];
                _results.push(node["#name"]);
              }
              return _results;
            })()).concat(nodeName).join("/");
            try {
              obj = _this.options.validator(xpath, s && s[nodeName], obj);
            } catch (_error) {
              err = _error;
              _this.emit("error", err);
            }
          }
          if (_this.options.explicitChildren && !_this.options.mergeAttrs && typeof obj === 'object') {
            node = {};
            if (_this.options.attrkey in obj) {
              node[_this.options.attrkey] = obj[_this.options.attrkey];
              delete obj[_this.options.attrkey];
            }
            if (!_this.options.charsAsChildren && _this.options.charkey in obj) {
              node[_this.options.charkey] = obj[_this.options.charkey];
              delete obj[_this.options.charkey];
            }
            if (Object.getOwnPropertyNames(obj).length > 0) {
              node[_this.options.childkey] = obj;
            }
            obj = node;
          }
          if (stack.length > 0) {
            return _this.assignOrPush(s, nodeName, obj);
          } else {
            if (_this.options.explicitRoot) {
              old = obj;
              obj = {};
              obj[nodeName] = old;
            }
            _this.resultObject = obj;
            _this.saxParser.ended = true;
            return _this.emit("end", _this.resultObject);
          }
        };
      })(this);
      ontext = (function(_this) {
        return function(text) {
          var s;
          s = stack[stack.length - 1];
          if (s) {
            s[charkey] += text;
            return s;
          }
        };
      })(this);
      this.saxParser.ontext = ontext;
      return this.saxParser.oncdata = (function(_this) {
        return function(text) {
          var s;
          s = ontext(text);
          if (s) {
            return s.cdata = true;
          }
        };
      })(this);
    };

    Parser.prototype.parseString = function(str, cb) {
      var err;
      if ((cb != null) && typeof cb === "function") {
        this.on("end", function(result) {
          this.reset();
          if (this.options.async) {
            return process.nextTick(function() {
              return cb(null, result);
            });
          } else {
            return cb(null, result);
          }
        });
        this.on("error", function(err) {
          this.reset();
          if (this.options.async) {
            return process.nextTick(function() {
              return cb(err);
            });
          } else {
            return cb(err);
          }
        });
      }
      if (str.toString().trim() === '') {
        this.emit("end", null);
        return true;
      }
      try {
        return this.saxParser.write(bom.stripBOM(str.toString())).close();
      } catch (_error) {
        err = _error;
        if (!(this.saxParser.errThrown || this.saxParser.ended)) {
          this.emit('error', err);
          return this.saxParser.errThrown = true;
        }
      }
    };

    return Parser;

  })(events.EventEmitter);

  exports.parseString = function(str, a, b) {
    var cb, options, parser;
    if (b != null) {
      if (typeof b === 'function') {
        cb = b;
      }
      if (typeof a === 'object') {
        options = a;
      }
    } else {
      if (typeof a === 'function') {
        cb = a;
      }
      options = {};
    }
    parser = new exports.Parser(options);
    return parser.parseString(str, cb);
  };

}).call(this);

}).call(this,require('_process'))
},{"./bom":64,"./processors":65,"_process":39,"events":37,"sax":67,"xmlbuilder":84}],67:[function(require,module,exports){
(function (Buffer){
// wrapper for non-node envs
;(function (sax) {

sax.parser = function (strict, opt) { return new SAXParser(strict, opt) }
sax.SAXParser = SAXParser
sax.SAXStream = SAXStream
sax.createStream = createStream

// When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
// When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
// since that's the earliest that a buffer overrun could occur.  This way, checks are
// as rare as required, but as often as necessary to ensure never crossing this bound.
// Furthermore, buffers are only tested at most once per write(), so passing a very
// large string into write() might have undesirable effects, but this is manageable by
// the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
// edge case, result in creating at most one complete copy of the string passed in.
// Set to Infinity to have unlimited buffers.
sax.MAX_BUFFER_LENGTH = 64 * 1024

var buffers = [
  "comment", "sgmlDecl", "textNode", "tagName", "doctype",
  "procInstName", "procInstBody", "entity", "attribName",
  "attribValue", "cdata", "script"
]

sax.EVENTS = // for discoverability.
  [ "text"
  , "processinginstruction"
  , "sgmldeclaration"
  , "doctype"
  , "comment"
  , "attribute"
  , "opentag"
  , "closetag"
  , "opencdata"
  , "cdata"
  , "closecdata"
  , "error"
  , "end"
  , "ready"
  , "script"
  , "opennamespace"
  , "closenamespace"
  ]

function SAXParser (strict, opt) {
  if (!(this instanceof SAXParser)) return new SAXParser(strict, opt)

  var parser = this
  clearBuffers(parser)
  parser.q = parser.c = ""
  parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH
  parser.opt = opt || {}
  parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags
  parser.looseCase = parser.opt.lowercase ? "toLowerCase" : "toUpperCase"
  parser.tags = []
  parser.closed = parser.closedRoot = parser.sawRoot = false
  parser.tag = parser.error = null
  parser.strict = !!strict
  parser.noscript = !!(strict || parser.opt.noscript)
  parser.state = S.BEGIN
  parser.ENTITIES = Object.create(sax.ENTITIES)
  parser.attribList = []

  // namespaces form a prototype chain.
  // it always points at the current tag,
  // which protos to its parent tag.
  if (parser.opt.xmlns) parser.ns = Object.create(rootNS)

  // mostly just for error reporting
  parser.trackPosition = parser.opt.position !== false
  if (parser.trackPosition) {
    parser.position = parser.line = parser.column = 0
  }
  emit(parser, "onready")
}

if (!Object.create) Object.create = function (o) {
  function f () { this.__proto__ = o }
  f.prototype = o
  return new f
}

if (!Object.getPrototypeOf) Object.getPrototypeOf = function (o) {
  return o.__proto__
}

if (!Object.keys) Object.keys = function (o) {
  var a = []
  for (var i in o) if (o.hasOwnProperty(i)) a.push(i)
  return a
}

function checkBufferLength (parser) {
  var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10)
    , maxActual = 0
  for (var i = 0, l = buffers.length; i < l; i ++) {
    var len = parser[buffers[i]].length
    if (len > maxAllowed) {
      // Text/cdata nodes can get big, and since they're buffered,
      // we can get here under normal conditions.
      // Avoid issues by emitting the text node now,
      // so at least it won't get any bigger.
      switch (buffers[i]) {
        case "textNode":
          closeText(parser)
        break

        case "cdata":
          emitNode(parser, "oncdata", parser.cdata)
          parser.cdata = ""
        break

        case "script":
          emitNode(parser, "onscript", parser.script)
          parser.script = ""
        break

        default:
          error(parser, "Max buffer length exceeded: "+buffers[i])
      }
    }
    maxActual = Math.max(maxActual, len)
  }
  // schedule the next check for the earliest possible buffer overrun.
  parser.bufferCheckPosition = (sax.MAX_BUFFER_LENGTH - maxActual)
                             + parser.position
}

function clearBuffers (parser) {
  for (var i = 0, l = buffers.length; i < l; i ++) {
    parser[buffers[i]] = ""
  }
}

function flushBuffers (parser) {
  closeText(parser)
  if (parser.cdata !== "") {
    emitNode(parser, "oncdata", parser.cdata)
    parser.cdata = ""
  }
  if (parser.script !== "") {
    emitNode(parser, "onscript", parser.script)
    parser.script = ""
  }
}

SAXParser.prototype =
  { end: function () { end(this) }
  , write: write
  , resume: function () { this.error = null; return this }
  , close: function () { return this.write(null) }
  , flush: function () { flushBuffers(this) }
  }

try {
  var Stream = require("stream").Stream
} catch (ex) {
  var Stream = function () {}
}


var streamWraps = sax.EVENTS.filter(function (ev) {
  return ev !== "error" && ev !== "end"
})

function createStream (strict, opt) {
  return new SAXStream(strict, opt)
}

function SAXStream (strict, opt) {
  if (!(this instanceof SAXStream)) return new SAXStream(strict, opt)

  Stream.apply(this)

  this._parser = new SAXParser(strict, opt)
  this.writable = true
  this.readable = true


  var me = this

  this._parser.onend = function () {
    me.emit("end")
  }

  this._parser.onerror = function (er) {
    me.emit("error", er)

    // if didn't throw, then means error was handled.
    // go ahead and clear error, so we can write again.
    me._parser.error = null
  }

  this._decoder = null;

  streamWraps.forEach(function (ev) {
    Object.defineProperty(me, "on" + ev, {
      get: function () { return me._parser["on" + ev] },
      set: function (h) {
        if (!h) {
          me.removeAllListeners(ev)
          return me._parser["on"+ev] = h
        }
        me.on(ev, h)
      },
      enumerable: true,
      configurable: false
    })
  })
}

SAXStream.prototype = Object.create(Stream.prototype,
  { constructor: { value: SAXStream } })

SAXStream.prototype.write = function (data) {
  if (typeof Buffer === 'function' &&
      typeof Buffer.isBuffer === 'function' &&
      Buffer.isBuffer(data)) {
    if (!this._decoder) {
      var SD = require('string_decoder').StringDecoder
      this._decoder = new SD('utf8')
    }
    data = this._decoder.write(data);
  }

  this._parser.write(data.toString())
  this.emit("data", data)
  return true
}

SAXStream.prototype.end = function (chunk) {
  if (chunk && chunk.length) this.write(chunk)
  this._parser.end()
  return true
}

SAXStream.prototype.on = function (ev, handler) {
  var me = this
  if (!me._parser["on"+ev] && streamWraps.indexOf(ev) !== -1) {
    me._parser["on"+ev] = function () {
      var args = arguments.length === 1 ? [arguments[0]]
               : Array.apply(null, arguments)
      args.splice(0, 0, ev)
      me.emit.apply(me, args)
    }
  }

  return Stream.prototype.on.call(me, ev, handler)
}



// character classes and tokens
var whitespace = "\r\n\t "
  // this really needs to be replaced with character classes.
  // XML allows all manner of ridiculous numbers and digits.
  , number = "0124356789"
  , letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  // (Letter | "_" | ":")
  , quote = "'\""
  , entity = number+letter+"#"
  , attribEnd = whitespace + ">"
  , CDATA = "[CDATA["
  , DOCTYPE = "DOCTYPE"
  , XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace"
  , XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/"
  , rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE }

// turn all the string character sets into character class objects.
whitespace = charClass(whitespace)
number = charClass(number)
letter = charClass(letter)

// http://www.w3.org/TR/REC-xml/#NT-NameStartChar
// This implementation works on strings, a single character at a time
// as such, it cannot ever support astral-plane characters (10000-EFFFF)
// without a significant breaking change to either this  parser, or the
// JavaScript language.  Implementation of an emoji-capable xml parser
// is left as an exercise for the reader.
var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/

var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040\.\d-]/

quote = charClass(quote)
entity = charClass(entity)
attribEnd = charClass(attribEnd)

function charClass (str) {
  return str.split("").reduce(function (s, c) {
    s[c] = true
    return s
  }, {})
}

function isRegExp (c) {
  return Object.prototype.toString.call(c) === '[object RegExp]'
}

function is (charclass, c) {
  return isRegExp(charclass) ? !!c.match(charclass) : charclass[c]
}

function not (charclass, c) {
  return !is(charclass, c)
}

var S = 0
sax.STATE =
{ BEGIN                     : S++
, TEXT                      : S++ // general stuff
, TEXT_ENTITY               : S++ // &amp and such.
, OPEN_WAKA                 : S++ // <
, SGML_DECL                 : S++ // <!BLARG
, SGML_DECL_QUOTED          : S++ // <!BLARG foo "bar
, DOCTYPE                   : S++ // <!DOCTYPE
, DOCTYPE_QUOTED            : S++ // <!DOCTYPE "//blah
, DOCTYPE_DTD               : S++ // <!DOCTYPE "//blah" [ ...
, DOCTYPE_DTD_QUOTED        : S++ // <!DOCTYPE "//blah" [ "foo
, COMMENT_STARTING          : S++ // <!-
, COMMENT                   : S++ // <!--
, COMMENT_ENDING            : S++ // <!-- blah -
, COMMENT_ENDED             : S++ // <!-- blah --
, CDATA                     : S++ // <![CDATA[ something
, CDATA_ENDING              : S++ // ]
, CDATA_ENDING_2            : S++ // ]]
, PROC_INST                 : S++ // <?hi
, PROC_INST_BODY            : S++ // <?hi there
, PROC_INST_ENDING          : S++ // <?hi "there" ?
, OPEN_TAG                  : S++ // <strong
, OPEN_TAG_SLASH            : S++ // <strong /
, ATTRIB                    : S++ // <a
, ATTRIB_NAME               : S++ // <a foo
, ATTRIB_NAME_SAW_WHITE     : S++ // <a foo _
, ATTRIB_VALUE              : S++ // <a foo=
, ATTRIB_VALUE_QUOTED       : S++ // <a foo="bar
, ATTRIB_VALUE_CLOSED       : S++ // <a foo="bar"
, ATTRIB_VALUE_UNQUOTED     : S++ // <a foo=bar
, ATTRIB_VALUE_ENTITY_Q     : S++ // <foo bar="&quot;"
, ATTRIB_VALUE_ENTITY_U     : S++ // <foo bar=&quot;
, CLOSE_TAG                 : S++ // </a
, CLOSE_TAG_SAW_WHITE       : S++ // </a   >
, SCRIPT                    : S++ // <script> ...
, SCRIPT_ENDING             : S++ // <script> ... <
}

sax.ENTITIES =
{ "amp" : "&"
, "gt" : ">"
, "lt" : "<"
, "quot" : "\""
, "apos" : "'"
, "AElig" : 198
, "Aacute" : 193
, "Acirc" : 194
, "Agrave" : 192
, "Aring" : 197
, "Atilde" : 195
, "Auml" : 196
, "Ccedil" : 199
, "ETH" : 208
, "Eacute" : 201
, "Ecirc" : 202
, "Egrave" : 200
, "Euml" : 203
, "Iacute" : 205
, "Icirc" : 206
, "Igrave" : 204
, "Iuml" : 207
, "Ntilde" : 209
, "Oacute" : 211
, "Ocirc" : 212
, "Ograve" : 210
, "Oslash" : 216
, "Otilde" : 213
, "Ouml" : 214
, "THORN" : 222
, "Uacute" : 218
, "Ucirc" : 219
, "Ugrave" : 217
, "Uuml" : 220
, "Yacute" : 221
, "aacute" : 225
, "acirc" : 226
, "aelig" : 230
, "agrave" : 224
, "aring" : 229
, "atilde" : 227
, "auml" : 228
, "ccedil" : 231
, "eacute" : 233
, "ecirc" : 234
, "egrave" : 232
, "eth" : 240
, "euml" : 235
, "iacute" : 237
, "icirc" : 238
, "igrave" : 236
, "iuml" : 239
, "ntilde" : 241
, "oacute" : 243
, "ocirc" : 244
, "ograve" : 242
, "oslash" : 248
, "otilde" : 245
, "ouml" : 246
, "szlig" : 223
, "thorn" : 254
, "uacute" : 250
, "ucirc" : 251
, "ugrave" : 249
, "uuml" : 252
, "yacute" : 253
, "yuml" : 255
, "copy" : 169
, "reg" : 174
, "nbsp" : 160
, "iexcl" : 161
, "cent" : 162
, "pound" : 163
, "curren" : 164
, "yen" : 165
, "brvbar" : 166
, "sect" : 167
, "uml" : 168
, "ordf" : 170
, "laquo" : 171
, "not" : 172
, "shy" : 173
, "macr" : 175
, "deg" : 176
, "plusmn" : 177
, "sup1" : 185
, "sup2" : 178
, "sup3" : 179
, "acute" : 180
, "micro" : 181
, "para" : 182
, "middot" : 183
, "cedil" : 184
, "ordm" : 186
, "raquo" : 187
, "frac14" : 188
, "frac12" : 189
, "frac34" : 190
, "iquest" : 191
, "times" : 215
, "divide" : 247
, "OElig" : 338
, "oelig" : 339
, "Scaron" : 352
, "scaron" : 353
, "Yuml" : 376
, "fnof" : 402
, "circ" : 710
, "tilde" : 732
, "Alpha" : 913
, "Beta" : 914
, "Gamma" : 915
, "Delta" : 916
, "Epsilon" : 917
, "Zeta" : 918
, "Eta" : 919
, "Theta" : 920
, "Iota" : 921
, "Kappa" : 922
, "Lambda" : 923
, "Mu" : 924
, "Nu" : 925
, "Xi" : 926
, "Omicron" : 927
, "Pi" : 928
, "Rho" : 929
, "Sigma" : 931
, "Tau" : 932
, "Upsilon" : 933
, "Phi" : 934
, "Chi" : 935
, "Psi" : 936
, "Omega" : 937
, "alpha" : 945
, "beta" : 946
, "gamma" : 947
, "delta" : 948
, "epsilon" : 949
, "zeta" : 950
, "eta" : 951
, "theta" : 952
, "iota" : 953
, "kappa" : 954
, "lambda" : 955
, "mu" : 956
, "nu" : 957
, "xi" : 958
, "omicron" : 959
, "pi" : 960
, "rho" : 961
, "sigmaf" : 962
, "sigma" : 963
, "tau" : 964
, "upsilon" : 965
, "phi" : 966
, "chi" : 967
, "psi" : 968
, "omega" : 969
, "thetasym" : 977
, "upsih" : 978
, "piv" : 982
, "ensp" : 8194
, "emsp" : 8195
, "thinsp" : 8201
, "zwnj" : 8204
, "zwj" : 8205
, "lrm" : 8206
, "rlm" : 8207
, "ndash" : 8211
, "mdash" : 8212
, "lsquo" : 8216
, "rsquo" : 8217
, "sbquo" : 8218
, "ldquo" : 8220
, "rdquo" : 8221
, "bdquo" : 8222
, "dagger" : 8224
, "Dagger" : 8225
, "bull" : 8226
, "hellip" : 8230
, "permil" : 8240
, "prime" : 8242
, "Prime" : 8243
, "lsaquo" : 8249
, "rsaquo" : 8250
, "oline" : 8254
, "frasl" : 8260
, "euro" : 8364
, "image" : 8465
, "weierp" : 8472
, "real" : 8476
, "trade" : 8482
, "alefsym" : 8501
, "larr" : 8592
, "uarr" : 8593
, "rarr" : 8594
, "darr" : 8595
, "harr" : 8596
, "crarr" : 8629
, "lArr" : 8656
, "uArr" : 8657
, "rArr" : 8658
, "dArr" : 8659
, "hArr" : 8660
, "forall" : 8704
, "part" : 8706
, "exist" : 8707
, "empty" : 8709
, "nabla" : 8711
, "isin" : 8712
, "notin" : 8713
, "ni" : 8715
, "prod" : 8719
, "sum" : 8721
, "minus" : 8722
, "lowast" : 8727
, "radic" : 8730
, "prop" : 8733
, "infin" : 8734
, "ang" : 8736
, "and" : 8743
, "or" : 8744
, "cap" : 8745
, "cup" : 8746
, "int" : 8747
, "there4" : 8756
, "sim" : 8764
, "cong" : 8773
, "asymp" : 8776
, "ne" : 8800
, "equiv" : 8801
, "le" : 8804
, "ge" : 8805
, "sub" : 8834
, "sup" : 8835
, "nsub" : 8836
, "sube" : 8838
, "supe" : 8839
, "oplus" : 8853
, "otimes" : 8855
, "perp" : 8869
, "sdot" : 8901
, "lceil" : 8968
, "rceil" : 8969
, "lfloor" : 8970
, "rfloor" : 8971
, "lang" : 9001
, "rang" : 9002
, "loz" : 9674
, "spades" : 9824
, "clubs" : 9827
, "hearts" : 9829
, "diams" : 9830
}

Object.keys(sax.ENTITIES).forEach(function (key) {
    var e = sax.ENTITIES[key]
    var s = typeof e === 'number' ? String.fromCharCode(e) : e
    sax.ENTITIES[key] = s
})

for (var S in sax.STATE) sax.STATE[sax.STATE[S]] = S

// shorthand
S = sax.STATE

function emit (parser, event, data) {
  parser[event] && parser[event](data)
}

function emitNode (parser, nodeType, data) {
  if (parser.textNode) closeText(parser)
  emit(parser, nodeType, data)
}

function closeText (parser) {
  parser.textNode = textopts(parser.opt, parser.textNode)
  if (parser.textNode) emit(parser, "ontext", parser.textNode)
  parser.textNode = ""
}

function textopts (opt, text) {
  if (opt.trim) text = text.trim()
  if (opt.normalize) text = text.replace(/\s+/g, " ")
  return text
}

function error (parser, er) {
  closeText(parser)
  if (parser.trackPosition) {
    er += "\nLine: "+parser.line+
          "\nColumn: "+parser.column+
          "\nChar: "+parser.c
  }
  er = new Error(er)
  parser.error = er
  emit(parser, "onerror", er)
  return parser
}

function end (parser) {
  if (!parser.closedRoot) strictFail(parser, "Unclosed root tag")
  if ((parser.state !== S.BEGIN) && (parser.state !== S.TEXT)) error(parser, "Unexpected end")
  closeText(parser)
  parser.c = ""
  parser.closed = true
  emit(parser, "onend")
  SAXParser.call(parser, parser.strict, parser.opt)
  return parser
}

function strictFail (parser, message) {
  if (typeof parser !== 'object' || !(parser instanceof SAXParser))
    throw new Error('bad call to strictFail');
  if (parser.strict) error(parser, message)
}

function newTag (parser) {
  if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]()
  var parent = parser.tags[parser.tags.length - 1] || parser
    , tag = parser.tag = { name : parser.tagName, attributes : {} }

  // will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
  if (parser.opt.xmlns) tag.ns = parent.ns
  parser.attribList.length = 0
}

function qname (name, attribute) {
  var i = name.indexOf(":")
    , qualName = i < 0 ? [ "", name ] : name.split(":")
    , prefix = qualName[0]
    , local = qualName[1]

  // <x "xmlns"="http://foo">
  if (attribute && name === "xmlns") {
    prefix = "xmlns"
    local = ""
  }

  return { prefix: prefix, local: local }
}

function attrib (parser) {
  if (!parser.strict) parser.attribName = parser.attribName[parser.looseCase]()

  if (parser.attribList.indexOf(parser.attribName) !== -1 ||
      parser.tag.attributes.hasOwnProperty(parser.attribName)) {
    return parser.attribName = parser.attribValue = ""
  }

  if (parser.opt.xmlns) {
    var qn = qname(parser.attribName, true)
      , prefix = qn.prefix
      , local = qn.local

    if (prefix === "xmlns") {
      // namespace binding attribute; push the binding into scope
      if (local === "xml" && parser.attribValue !== XML_NAMESPACE) {
        strictFail( parser
                  , "xml: prefix must be bound to " + XML_NAMESPACE + "\n"
                  + "Actual: " + parser.attribValue )
      } else if (local === "xmlns" && parser.attribValue !== XMLNS_NAMESPACE) {
        strictFail( parser
                  , "xmlns: prefix must be bound to " + XMLNS_NAMESPACE + "\n"
                  + "Actual: " + parser.attribValue )
      } else {
        var tag = parser.tag
          , parent = parser.tags[parser.tags.length - 1] || parser
        if (tag.ns === parent.ns) {
          tag.ns = Object.create(parent.ns)
        }
        tag.ns[local] = parser.attribValue
      }
    }

    // defer onattribute events until all attributes have been seen
    // so any new bindings can take effect; preserve attribute order
    // so deferred events can be emitted in document order
    parser.attribList.push([parser.attribName, parser.attribValue])
  } else {
    // in non-xmlns mode, we can emit the event right away
    parser.tag.attributes[parser.attribName] = parser.attribValue
    emitNode( parser
            , "onattribute"
            , { name: parser.attribName
              , value: parser.attribValue } )
  }

  parser.attribName = parser.attribValue = ""
}

function openTag (parser, selfClosing) {
  if (parser.opt.xmlns) {
    // emit namespace binding events
    var tag = parser.tag

    // add namespace info to tag
    var qn = qname(parser.tagName)
    tag.prefix = qn.prefix
    tag.local = qn.local
    tag.uri = tag.ns[qn.prefix] || ""

    if (tag.prefix && !tag.uri) {
      strictFail(parser, "Unbound namespace prefix: "
                       + JSON.stringify(parser.tagName))
      tag.uri = qn.prefix
    }

    var parent = parser.tags[parser.tags.length - 1] || parser
    if (tag.ns && parent.ns !== tag.ns) {
      Object.keys(tag.ns).forEach(function (p) {
        emitNode( parser
                , "onopennamespace"
                , { prefix: p , uri: tag.ns[p] } )
      })
    }

    // handle deferred onattribute events
    // Note: do not apply default ns to attributes:
    //   http://www.w3.org/TR/REC-xml-names/#defaulting
    for (var i = 0, l = parser.attribList.length; i < l; i ++) {
      var nv = parser.attribList[i]
      var name = nv[0]
        , value = nv[1]
        , qualName = qname(name, true)
        , prefix = qualName.prefix
        , local = qualName.local
        , uri = prefix == "" ? "" : (tag.ns[prefix] || "")
        , a = { name: name
              , value: value
              , prefix: prefix
              , local: local
              , uri: uri
              }

      // if there's any attributes with an undefined namespace,
      // then fail on them now.
      if (prefix && prefix != "xmlns" && !uri) {
        strictFail(parser, "Unbound namespace prefix: "
                         + JSON.stringify(prefix))
        a.uri = prefix
      }
      parser.tag.attributes[name] = a
      emitNode(parser, "onattribute", a)
    }
    parser.attribList.length = 0
  }

  parser.tag.isSelfClosing = !!selfClosing

  // process the tag
  parser.sawRoot = true
  parser.tags.push(parser.tag)
  emitNode(parser, "onopentag", parser.tag)
  if (!selfClosing) {
    // special case for <script> in non-strict mode.
    if (!parser.noscript && parser.tagName.toLowerCase() === "script") {
      parser.state = S.SCRIPT
    } else {
      parser.state = S.TEXT
    }
    parser.tag = null
    parser.tagName = ""
  }
  parser.attribName = parser.attribValue = ""
  parser.attribList.length = 0
}

function closeTag (parser) {
  if (!parser.tagName) {
    strictFail(parser, "Weird empty close tag.")
    parser.textNode += "</>"
    parser.state = S.TEXT
    return
  }

  if (parser.script) {
    if (parser.tagName !== "script") {
      parser.script += "</" + parser.tagName + ">"
      parser.tagName = ""
      parser.state = S.SCRIPT
      return
    }
    emitNode(parser, "onscript", parser.script)
    parser.script = ""
  }

  // first make sure that the closing tag actually exists.
  // <a><b></c></b></a> will close everything, otherwise.
  var t = parser.tags.length
  var tagName = parser.tagName
  if (!parser.strict) tagName = tagName[parser.looseCase]()
  var closeTo = tagName
  while (t --) {
    var close = parser.tags[t]
    if (close.name !== closeTo) {
      // fail the first time in strict mode
      strictFail(parser, "Unexpected close tag")
    } else break
  }

  // didn't find it.  we already failed for strict, so just abort.
  if (t < 0) {
    strictFail(parser, "Unmatched closing tag: "+parser.tagName)
    parser.textNode += "</" + parser.tagName + ">"
    parser.state = S.TEXT
    return
  }
  parser.tagName = tagName
  var s = parser.tags.length
  while (s --> t) {
    var tag = parser.tag = parser.tags.pop()
    parser.tagName = parser.tag.name
    emitNode(parser, "onclosetag", parser.tagName)

    var x = {}
    for (var i in tag.ns) x[i] = tag.ns[i]

    var parent = parser.tags[parser.tags.length - 1] || parser
    if (parser.opt.xmlns && tag.ns !== parent.ns) {
      // remove namespace bindings introduced by tag
      Object.keys(tag.ns).forEach(function (p) {
        var n = tag.ns[p]
        emitNode(parser, "onclosenamespace", { prefix: p, uri: n })
      })
    }
  }
  if (t === 0) parser.closedRoot = true
  parser.tagName = parser.attribValue = parser.attribName = ""
  parser.attribList.length = 0
  parser.state = S.TEXT
}

function parseEntity (parser) {
  var entity = parser.entity
    , entityLC = entity.toLowerCase()
    , num
    , numStr = ""
  if (parser.ENTITIES[entity])
    return parser.ENTITIES[entity]
  if (parser.ENTITIES[entityLC])
    return parser.ENTITIES[entityLC]
  entity = entityLC
  if (entity.charAt(0) === "#") {
    if (entity.charAt(1) === "x") {
      entity = entity.slice(2)
      num = parseInt(entity, 16)
      numStr = num.toString(16)
    } else {
      entity = entity.slice(1)
      num = parseInt(entity, 10)
      numStr = num.toString(10)
    }
  }
  entity = entity.replace(/^0+/, "")
  if (numStr.toLowerCase() !== entity) {
    strictFail(parser, "Invalid character entity")
    return "&"+parser.entity + ";"
  }

  return String.fromCodePoint(num)
}

function write (chunk) {
  var parser = this
  if (this.error) throw this.error
  if (parser.closed) return error(parser,
    "Cannot write after close. Assign an onready handler.")
  if (chunk === null) return end(parser)
  var i = 0, c = ""
  while (parser.c = c = chunk.charAt(i++)) {
    if (parser.trackPosition) {
      parser.position ++
      if (c === "\n") {
        parser.line ++
        parser.column = 0
      } else parser.column ++
    }
    switch (parser.state) {

      case S.BEGIN:
        if (c === "<") {
          parser.state = S.OPEN_WAKA
          parser.startTagPosition = parser.position
        } else if (not(whitespace,c)) {
          // have to process this as a text node.
          // weird, but happens.
          strictFail(parser, "Non-whitespace before first tag.")
          parser.textNode = c
          parser.state = S.TEXT
        }
      continue

      case S.TEXT:
        if (parser.sawRoot && !parser.closedRoot) {
          var starti = i-1
          while (c && c!=="<" && c!=="&") {
            c = chunk.charAt(i++)
            if (c && parser.trackPosition) {
              parser.position ++
              if (c === "\n") {
                parser.line ++
                parser.column = 0
              } else parser.column ++
            }
          }
          parser.textNode += chunk.substring(starti, i-1)
        }
        if (c === "<") {
          parser.state = S.OPEN_WAKA
          parser.startTagPosition = parser.position
        } else {
          if (not(whitespace, c) && (!parser.sawRoot || parser.closedRoot))
            strictFail(parser, "Text data outside of root node.")
          if (c === "&") parser.state = S.TEXT_ENTITY
          else parser.textNode += c
        }
      continue

      case S.SCRIPT:
        // only non-strict
        if (c === "<") {
          parser.state = S.SCRIPT_ENDING
        } else parser.script += c
      continue

      case S.SCRIPT_ENDING:
        if (c === "/") {
          parser.state = S.CLOSE_TAG
        } else {
          parser.script += "<" + c
          parser.state = S.SCRIPT
        }
      continue

      case S.OPEN_WAKA:
        // either a /, ?, !, or text is coming next.
        if (c === "!") {
          parser.state = S.SGML_DECL
          parser.sgmlDecl = ""
        } else if (is(whitespace, c)) {
          // wait for it...
        } else if (is(nameStart,c)) {
          parser.state = S.OPEN_TAG
          parser.tagName = c
        } else if (c === "/") {
          parser.state = S.CLOSE_TAG
          parser.tagName = ""
        } else if (c === "?") {
          parser.state = S.PROC_INST
          parser.procInstName = parser.procInstBody = ""
        } else {
          strictFail(parser, "Unencoded <")
          // if there was some whitespace, then add that in.
          if (parser.startTagPosition + 1 < parser.position) {
            var pad = parser.position - parser.startTagPosition
            c = new Array(pad).join(" ") + c
          }
          parser.textNode += "<" + c
          parser.state = S.TEXT
        }
      continue

      case S.SGML_DECL:
        if ((parser.sgmlDecl+c).toUpperCase() === CDATA) {
          emitNode(parser, "onopencdata")
          parser.state = S.CDATA
          parser.sgmlDecl = ""
          parser.cdata = ""
        } else if (parser.sgmlDecl+c === "--") {
          parser.state = S.COMMENT
          parser.comment = ""
          parser.sgmlDecl = ""
        } else if ((parser.sgmlDecl+c).toUpperCase() === DOCTYPE) {
          parser.state = S.DOCTYPE
          if (parser.doctype || parser.sawRoot) strictFail(parser,
            "Inappropriately located doctype declaration")
          parser.doctype = ""
          parser.sgmlDecl = ""
        } else if (c === ">") {
          emitNode(parser, "onsgmldeclaration", parser.sgmlDecl)
          parser.sgmlDecl = ""
          parser.state = S.TEXT
        } else if (is(quote, c)) {
          parser.state = S.SGML_DECL_QUOTED
          parser.sgmlDecl += c
        } else parser.sgmlDecl += c
      continue

      case S.SGML_DECL_QUOTED:
        if (c === parser.q) {
          parser.state = S.SGML_DECL
          parser.q = ""
        }
        parser.sgmlDecl += c
      continue

      case S.DOCTYPE:
        if (c === ">") {
          parser.state = S.TEXT
          emitNode(parser, "ondoctype", parser.doctype)
          parser.doctype = true // just remember that we saw it.
        } else {
          parser.doctype += c
          if (c === "[") parser.state = S.DOCTYPE_DTD
          else if (is(quote, c)) {
            parser.state = S.DOCTYPE_QUOTED
            parser.q = c
          }
        }
      continue

      case S.DOCTYPE_QUOTED:
        parser.doctype += c
        if (c === parser.q) {
          parser.q = ""
          parser.state = S.DOCTYPE
        }
      continue

      case S.DOCTYPE_DTD:
        parser.doctype += c
        if (c === "]") parser.state = S.DOCTYPE
        else if (is(quote,c)) {
          parser.state = S.DOCTYPE_DTD_QUOTED
          parser.q = c
        }
      continue

      case S.DOCTYPE_DTD_QUOTED:
        parser.doctype += c
        if (c === parser.q) {
          parser.state = S.DOCTYPE_DTD
          parser.q = ""
        }
      continue

      case S.COMMENT:
        if (c === "-") parser.state = S.COMMENT_ENDING
        else parser.comment += c
      continue

      case S.COMMENT_ENDING:
        if (c === "-") {
          parser.state = S.COMMENT_ENDED
          parser.comment = textopts(parser.opt, parser.comment)
          if (parser.comment) emitNode(parser, "oncomment", parser.comment)
          parser.comment = ""
        } else {
          parser.comment += "-" + c
          parser.state = S.COMMENT
        }
      continue

      case S.COMMENT_ENDED:
        if (c !== ">") {
          strictFail(parser, "Malformed comment")
          // allow <!-- blah -- bloo --> in non-strict mode,
          // which is a comment of " blah -- bloo "
          parser.comment += "--" + c
          parser.state = S.COMMENT
        } else parser.state = S.TEXT
      continue

      case S.CDATA:
        if (c === "]") parser.state = S.CDATA_ENDING
        else parser.cdata += c
      continue

      case S.CDATA_ENDING:
        if (c === "]") parser.state = S.CDATA_ENDING_2
        else {
          parser.cdata += "]" + c
          parser.state = S.CDATA
        }
      continue

      case S.CDATA_ENDING_2:
        if (c === ">") {
          if (parser.cdata) emitNode(parser, "oncdata", parser.cdata)
          emitNode(parser, "onclosecdata")
          parser.cdata = ""
          parser.state = S.TEXT
        } else if (c === "]") {
          parser.cdata += "]"
        } else {
          parser.cdata += "]]" + c
          parser.state = S.CDATA
        }
      continue

      case S.PROC_INST:
        if (c === "?") parser.state = S.PROC_INST_ENDING
        else if (is(whitespace, c)) parser.state = S.PROC_INST_BODY
        else parser.procInstName += c
      continue

      case S.PROC_INST_BODY:
        if (!parser.procInstBody && is(whitespace, c)) continue
        else if (c === "?") parser.state = S.PROC_INST_ENDING
        else parser.procInstBody += c
      continue

      case S.PROC_INST_ENDING:
        if (c === ">") {
          emitNode(parser, "onprocessinginstruction", {
            name : parser.procInstName,
            body : parser.procInstBody
          })
          parser.procInstName = parser.procInstBody = ""
          parser.state = S.TEXT
        } else {
          parser.procInstBody += "?" + c
          parser.state = S.PROC_INST_BODY
        }
      continue

      case S.OPEN_TAG:
        if (is(nameBody, c)) parser.tagName += c
        else {
          newTag(parser)
          if (c === ">") openTag(parser)
          else if (c === "/") parser.state = S.OPEN_TAG_SLASH
          else {
            if (not(whitespace, c)) strictFail(
              parser, "Invalid character in tag name")
            parser.state = S.ATTRIB
          }
        }
      continue

      case S.OPEN_TAG_SLASH:
        if (c === ">") {
          openTag(parser, true)
          closeTag(parser)
        } else {
          strictFail(parser, "Forward-slash in opening tag not followed by >")
          parser.state = S.ATTRIB
        }
      continue

      case S.ATTRIB:
        // haven't read the attribute name yet.
        if (is(whitespace, c)) continue
        else if (c === ">") openTag(parser)
        else if (c === "/") parser.state = S.OPEN_TAG_SLASH
        else if (is(nameStart, c)) {
          parser.attribName = c
          parser.attribValue = ""
          parser.state = S.ATTRIB_NAME
        } else strictFail(parser, "Invalid attribute name")
      continue

      case S.ATTRIB_NAME:
        if (c === "=") parser.state = S.ATTRIB_VALUE
        else if (c === ">") {
          strictFail(parser, "Attribute without value")
          parser.attribValue = parser.attribName
          attrib(parser)
          openTag(parser)
        }
        else if (is(whitespace, c)) parser.state = S.ATTRIB_NAME_SAW_WHITE
        else if (is(nameBody, c)) parser.attribName += c
        else strictFail(parser, "Invalid attribute name")
      continue

      case S.ATTRIB_NAME_SAW_WHITE:
        if (c === "=") parser.state = S.ATTRIB_VALUE
        else if (is(whitespace, c)) continue
        else {
          strictFail(parser, "Attribute without value")
          parser.tag.attributes[parser.attribName] = ""
          parser.attribValue = ""
          emitNode(parser, "onattribute",
                   { name : parser.attribName, value : "" })
          parser.attribName = ""
          if (c === ">") openTag(parser)
          else if (is(nameStart, c)) {
            parser.attribName = c
            parser.state = S.ATTRIB_NAME
          } else {
            strictFail(parser, "Invalid attribute name")
            parser.state = S.ATTRIB
          }
        }
      continue

      case S.ATTRIB_VALUE:
        if (is(whitespace, c)) continue
        else if (is(quote, c)) {
          parser.q = c
          parser.state = S.ATTRIB_VALUE_QUOTED
        } else {
          strictFail(parser, "Unquoted attribute value")
          parser.state = S.ATTRIB_VALUE_UNQUOTED
          parser.attribValue = c
        }
      continue

      case S.ATTRIB_VALUE_QUOTED:
        if (c !== parser.q) {
          if (c === "&") parser.state = S.ATTRIB_VALUE_ENTITY_Q
          else parser.attribValue += c
          continue
        }
        attrib(parser)
        parser.q = ""
        parser.state = S.ATTRIB_VALUE_CLOSED
      continue

      case S.ATTRIB_VALUE_CLOSED:
        if (is(whitespace, c)) {
          parser.state = S.ATTRIB
        } else if (c === ">") openTag(parser)
        else if (c === "/") parser.state = S.OPEN_TAG_SLASH
        else if (is(nameStart, c)) {
          strictFail(parser, "No whitespace between attributes")
          parser.attribName = c
          parser.attribValue = ""
          parser.state = S.ATTRIB_NAME
        } else strictFail(parser, "Invalid attribute name")
      continue

      case S.ATTRIB_VALUE_UNQUOTED:
        if (not(attribEnd,c)) {
          if (c === "&") parser.state = S.ATTRIB_VALUE_ENTITY_U
          else parser.attribValue += c
          continue
        }
        attrib(parser)
        if (c === ">") openTag(parser)
        else parser.state = S.ATTRIB
      continue

      case S.CLOSE_TAG:
        if (!parser.tagName) {
          if (is(whitespace, c)) continue
          else if (not(nameStart, c)) {
            if (parser.script) {
              parser.script += "</" + c
              parser.state = S.SCRIPT
            } else {
              strictFail(parser, "Invalid tagname in closing tag.")
            }
          } else parser.tagName = c
        }
        else if (c === ">") closeTag(parser)
        else if (is(nameBody, c)) parser.tagName += c
        else if (parser.script) {
          parser.script += "</" + parser.tagName
          parser.tagName = ""
          parser.state = S.SCRIPT
        } else {
          if (not(whitespace, c)) strictFail(parser,
            "Invalid tagname in closing tag")
          parser.state = S.CLOSE_TAG_SAW_WHITE
        }
      continue

      case S.CLOSE_TAG_SAW_WHITE:
        if (is(whitespace, c)) continue
        if (c === ">") closeTag(parser)
        else strictFail(parser, "Invalid characters in closing tag")
      continue

      case S.TEXT_ENTITY:
      case S.ATTRIB_VALUE_ENTITY_Q:
      case S.ATTRIB_VALUE_ENTITY_U:
        switch(parser.state) {
          case S.TEXT_ENTITY:
            var returnState = S.TEXT, buffer = "textNode"
          break

          case S.ATTRIB_VALUE_ENTITY_Q:
            var returnState = S.ATTRIB_VALUE_QUOTED, buffer = "attribValue"
          break

          case S.ATTRIB_VALUE_ENTITY_U:
            var returnState = S.ATTRIB_VALUE_UNQUOTED, buffer = "attribValue"
          break
        }
        if (c === ";") {
          parser[buffer] += parseEntity(parser)
          parser.entity = ""
          parser.state = returnState
        }
        else if (is(entity, c)) parser.entity += c
        else {
          strictFail(parser, "Invalid character entity")
          parser[buffer] += "&" + parser.entity + c
          parser.entity = ""
          parser.state = returnState
        }
      continue

      default:
        throw new Error(parser, "Unknown state: " + parser.state)
    }
  } // while
  // cdata blocks can get very big under normal conditions. emit and move on.
  // if (parser.state === S.CDATA && parser.cdata) {
  //   emitNode(parser, "oncdata", parser.cdata)
  //   parser.cdata = ""
  // }
  if (parser.position >= parser.bufferCheckPosition) checkBufferLength(parser)
  return parser
}

/*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
if (!String.fromCodePoint) {
        (function() {
                var stringFromCharCode = String.fromCharCode;
                var floor = Math.floor;
                var fromCodePoint = function() {
                        var MAX_SIZE = 0x4000;
                        var codeUnits = [];
                        var highSurrogate;
                        var lowSurrogate;
                        var index = -1;
                        var length = arguments.length;
                        if (!length) {
                                return '';
                        }
                        var result = '';
                        while (++index < length) {
                                var codePoint = Number(arguments[index]);
                                if (
                                        !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
                                        codePoint < 0 || // not a valid Unicode code point
                                        codePoint > 0x10FFFF || // not a valid Unicode code point
                                        floor(codePoint) != codePoint // not an integer
                                ) {
                                        throw RangeError('Invalid code point: ' + codePoint);
                                }
                                if (codePoint <= 0xFFFF) { // BMP code point
                                        codeUnits.push(codePoint);
                                } else { // Astral code point; split in surrogate halves
                                        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                                        codePoint -= 0x10000;
                                        highSurrogate = (codePoint >> 10) + 0xD800;
                                        lowSurrogate = (codePoint % 0x400) + 0xDC00;
                                        codeUnits.push(highSurrogate, lowSurrogate);
                                }
                                if (index + 1 == length || codeUnits.length > MAX_SIZE) {
                                        result += stringFromCharCode.apply(null, codeUnits);
                                        codeUnits.length = 0;
                                }
                        }
                        return result;
                };
                if (Object.defineProperty) {
                        Object.defineProperty(String, 'fromCodePoint', {
                                'value': fromCodePoint,
                                'configurable': true,
                                'writable': true
                        });
                } else {
                        String.fromCodePoint = fromCodePoint;
                }
        }());
}

})(typeof exports === "undefined" ? sax = {} : exports)

}).call(this,require("buffer").Buffer)
},{"buffer":33,"stream":43,"string_decoder":44}],68:[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
(function() {
  var XMLAttribute, create;

  create = require('lodash-node/modern/objects/create');

  module.exports = XMLAttribute = (function() {
    function XMLAttribute(parent, name, value) {
      this.stringify = parent.stringify;
      if (name == null) {
        throw new Error("Missing attribute name");
      }
      if (value == null) {
        throw new Error("Missing attribute value");
      }
      this.name = this.stringify.attName(name);
      this.value = this.stringify.attValue(value);
    }

    XMLAttribute.prototype.clone = function() {
      return create(XMLAttribute.prototype, this);
    };

    XMLAttribute.prototype.toString = function(options, level) {
      return ' ' + this.name + '="' + this.value + '"';
    };

    return XMLAttribute;

  })();

}).call(this);

},{"lodash-node/modern/objects/create":97}],69:[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
(function() {
  var XMLBuilder, XMLDeclaration, XMLDocType, XMLElement, XMLStringifier;

  XMLStringifier = require('./XMLStringifier');

  XMLDeclaration = require('./XMLDeclaration');

  XMLDocType = require('./XMLDocType');

  XMLElement = require('./XMLElement');

  module.exports = XMLBuilder = (function() {
    function XMLBuilder(name, options) {
      var root, temp;
      if (name == null) {
        throw new Error("Root element needs a name");
      }
      if (options == null) {
        options = {};
      }
      this.options = options;
      this.stringify = new XMLStringifier(options);
      temp = new XMLElement(this, 'doc');
      root = temp.element(name);
      root.isRoot = true;
      root.documentObject = this;
      this.rootObject = root;
      if (!options.headless) {
        root.declaration(options);
        if ((options.pubID != null) || (options.sysID != null)) {
          root.doctype(options);
        }
      }
    }

    XMLBuilder.prototype.root = function() {
      return this.rootObject;
    };

    XMLBuilder.prototype.end = function(options) {
      return this.toString(options);
    };

    XMLBuilder.prototype.toString = function(options) {
      var indent, newline, pretty, r, _ref, _ref1;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
      newline = (_ref1 = options != null ? options.newline : void 0) != null ? _ref1 : '\n';
      r = '';
      if (this.xmldec != null) {
        r += this.xmldec.toString(options);
      }
      if (this.doctype != null) {
        r += this.doctype.toString(options);
      }
      r += this.rootObject.toString(options);
      if (pretty && r.slice(-newline.length) === newline) {
        r = r.slice(0, -newline.length);
      }
      return r;
    };

    return XMLBuilder;

  })();

}).call(this);

},{"./XMLDeclaration":76,"./XMLDocType":77,"./XMLElement":78,"./XMLStringifier":82}],70:[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
(function() {
  var XMLCData, XMLNode, create,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  create = require('lodash-node/modern/objects/create');

  XMLNode = require('./XMLNode');

  module.exports = XMLCData = (function(_super) {
    __extends(XMLCData, _super);

    function XMLCData(parent, text) {
      XMLCData.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing CDATA text");
      }
      this.text = this.stringify.cdata(text);
    }

    XMLCData.prototype.clone = function() {
      return create(XMLCData.prototype, this);
    };

    XMLCData.prototype.toString = function(options, level) {
      var indent, newline, pretty, r, space, _ref, _ref1;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
      newline = (_ref1 = options != null ? options.newline : void 0) != null ? _ref1 : '\n';
      level || (level = 0);
      space = new Array(level + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += '<![CDATA[' + this.text + ']]>';
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLCData;

  })(XMLNode);

}).call(this);

},{"./XMLNode":79,"lodash-node/modern/objects/create":97}],71:[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
(function() {
  var XMLComment, XMLNode, create,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  create = require('lodash-node/modern/objects/create');

  XMLNode = require('./XMLNode');

  module.exports = XMLComment = (function(_super) {
    __extends(XMLComment, _super);

    function XMLComment(parent, text) {
      XMLComment.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing comment text");
      }
      this.text = this.stringify.comment(text);
    }

    XMLComment.prototype.clone = function() {
      return create(XMLComment.prototype, this);
    };

    XMLComment.prototype.toString = function(options, level) {
      var indent, newline, pretty, r, space, _ref, _ref1;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
      newline = (_ref1 = options != null ? options.newline : void 0) != null ? _ref1 : '\n';
      level || (level = 0);
      space = new Array(level + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += '<!-- ' + this.text + ' -->';
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLComment;

  })(XMLNode);

}).call(this);

},{"./XMLNode":79,"lodash-node/modern/objects/create":97}],72:[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
(function() {
  var XMLDTDAttList, create;

  create = require('lodash-node/modern/objects/create');

  module.exports = XMLDTDAttList = (function() {
    function XMLDTDAttList(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      this.stringify = parent.stringify;
      if (elementName == null) {
        throw new Error("Missing DTD element name");
      }
      if (attributeName == null) {
        throw new Error("Missing DTD attribute name");
      }
      if (!attributeType) {
        throw new Error("Missing DTD attribute type");
      }
      if (!defaultValueType) {
        throw new Error("Missing DTD attribute default");
      }
      if (defaultValueType.indexOf('#') !== 0) {
        defaultValueType = '#' + defaultValueType;
      }
      if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
        throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT");
      }
      if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
        throw new Error("Default value only applies to #FIXED or #DEFAULT");
      }
      this.elementName = this.stringify.eleName(elementName);
      this.attributeName = this.stringify.attName(attributeName);
      this.attributeType = this.stringify.dtdAttType(attributeType);
      this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
      this.defaultValueType = defaultValueType;
    }

    XMLDTDAttList.prototype.clone = function() {
      return create(XMLDTDAttList.prototype, this);
    };

    XMLDTDAttList.prototype.toString = function(options, level) {
      var indent, newline, pretty, r, space, _ref, _ref1;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
      newline = (_ref1 = options != null ? options.newline : void 0) != null ? _ref1 : '\n';
      level || (level = 0);
      space = new Array(level + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += '<!ATTLIST ' + this.elementName + ' ' + this.attributeName + ' ' + this.attributeType;
      if (this.defaultValueType !== '#DEFAULT') {
        r += ' ' + this.defaultValueType;
      }
      if (this.defaultValue) {
        r += ' "' + this.defaultValue + '"';
      }
      r += '>';
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLDTDAttList;

  })();

}).call(this);

},{"lodash-node/modern/objects/create":97}],73:[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
(function() {
  var XMLDTDElement, create, isArray;

  create = require('lodash-node/modern/objects/create');

  isArray = require('lodash-node/modern/objects/isArray');

  module.exports = XMLDTDElement = (function() {
    function XMLDTDElement(parent, name, value) {
      this.stringify = parent.stringify;
      if (name == null) {
        throw new Error("Missing DTD element name");
      }
      if (!value) {
        value = '(#PCDATA)';
      }
      if (isArray(value)) {
        value = '(' + value.join(',') + ')';
      }
      this.name = this.stringify.eleName(name);
      this.value = this.stringify.dtdElementValue(value);
    }

    XMLDTDElement.prototype.clone = function() {
      return create(XMLDTDElement.prototype, this);
    };

    XMLDTDElement.prototype.toString = function(options, level) {
      var indent, newline, pretty, r, space, _ref, _ref1;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
      newline = (_ref1 = options != null ? options.newline : void 0) != null ? _ref1 : '\n';
      level || (level = 0);
      space = new Array(level + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += '<!ELEMENT ' + this.name + ' ' + this.value + '>';
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLDTDElement;

  })();

}).call(this);

},{"lodash-node/modern/objects/create":97,"lodash-node/modern/objects/isArray":99}],74:[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
(function() {
  var XMLDTDEntity, create, isObject;

  create = require('lodash-node/modern/objects/create');

  isObject = require('lodash-node/modern/objects/isObject');

  module.exports = XMLDTDEntity = (function() {
    function XMLDTDEntity(parent, pe, name, value) {
      this.stringify = parent.stringify;
      if (name == null) {
        throw new Error("Missing entity name");
      }
      if (value == null) {
        throw new Error("Missing entity value");
      }
      this.pe = !!pe;
      this.name = this.stringify.eleName(name);
      if (!isObject(value)) {
        this.value = this.stringify.dtdEntityValue(value);
      } else {
        if (!value.pubID && !value.sysID) {
          throw new Error("Public and/or system identifiers are required for an external entity");
        }
        if (value.pubID && !value.sysID) {
          throw new Error("System identifier is required for a public external entity");
        }
        if (value.pubID != null) {
          this.pubID = this.stringify.dtdPubID(value.pubID);
        }
        if (value.sysID != null) {
          this.sysID = this.stringify.dtdSysID(value.sysID);
        }
        if (value.nData != null) {
          this.nData = this.stringify.dtdNData(value.nData);
        }
        if (this.pe && this.nData) {
          throw new Error("Notation declaration is not allowed in a parameter entity");
        }
      }
    }

    XMLDTDEntity.prototype.clone = function() {
      return create(XMLDTDEntity.prototype, this);
    };

    XMLDTDEntity.prototype.toString = function(options, level) {
      var indent, newline, pretty, r, space, _ref, _ref1;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
      newline = (_ref1 = options != null ? options.newline : void 0) != null ? _ref1 : '\n';
      level || (level = 0);
      space = new Array(level + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += '<!ENTITY';
      if (this.pe) {
        r += ' %';
      }
      r += ' ' + this.name;
      if (this.value) {
        r += ' "' + this.value + '"';
      } else {
        if (this.pubID && this.sysID) {
          r += ' PUBLIC "' + this.pubID + '" "' + this.sysID + '"';
        } else if (this.sysID) {
          r += ' SYSTEM "' + this.sysID + '"';
        }
        if (this.nData) {
          r += ' NDATA ' + this.nData;
        }
      }
      r += '>';
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLDTDEntity;

  })();

}).call(this);

},{"lodash-node/modern/objects/create":97,"lodash-node/modern/objects/isObject":102}],75:[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
(function() {
  var XMLDTDNotation, create;

  create = require('lodash-node/modern/objects/create');

  module.exports = XMLDTDNotation = (function() {
    function XMLDTDNotation(parent, name, value) {
      this.stringify = parent.stringify;
      if (name == null) {
        throw new Error("Missing notation name");
      }
      if (!value.pubID && !value.sysID) {
        throw new Error("Public or system identifiers are required for an external entity");
      }
      this.name = this.stringify.eleName(name);
      if (value.pubID != null) {
        this.pubID = this.stringify.dtdPubID(value.pubID);
      }
      if (value.sysID != null) {
        this.sysID = this.stringify.dtdSysID(value.sysID);
      }
    }

    XMLDTDNotation.prototype.clone = function() {
      return create(XMLDTDNotation.prototype, this);
    };

    XMLDTDNotation.prototype.toString = function(options, level) {
      var indent, newline, pretty, r, space, _ref, _ref1;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
      newline = (_ref1 = options != null ? options.newline : void 0) != null ? _ref1 : '\n';
      level || (level = 0);
      space = new Array(level + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += '<!NOTATION ' + this.name;
      if (this.pubID && this.sysID) {
        r += ' PUBLIC "' + this.pubID + '" "' + this.sysID + '"';
      } else if (this.pubID) {
        r += ' PUBLIC "' + this.pubID + '"';
      } else if (this.sysID) {
        r += ' SYSTEM "' + this.sysID + '"';
      }
      r += '>';
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLDTDNotation;

  })();

}).call(this);

},{"lodash-node/modern/objects/create":97}],76:[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
(function() {
  var XMLDeclaration, XMLNode, create, isObject,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  create = require('lodash-node/modern/objects/create');

  isObject = require('lodash-node/modern/objects/isObject');

  XMLNode = require('./XMLNode');

  module.exports = XMLDeclaration = (function(_super) {
    __extends(XMLDeclaration, _super);

    function XMLDeclaration(parent, version, encoding, standalone) {
      var _ref;
      XMLDeclaration.__super__.constructor.call(this, parent);
      if (isObject(version)) {
        _ref = version, version = _ref.version, encoding = _ref.encoding, standalone = _ref.standalone;
      }
      if (!version) {
        version = '1.0';
      }
      if (version != null) {
        this.version = this.stringify.xmlVersion(version);
      }
      if (encoding != null) {
        this.encoding = this.stringify.xmlEncoding(encoding);
      }
      if (standalone != null) {
        this.standalone = this.stringify.xmlStandalone(standalone);
      }
    }

    XMLDeclaration.prototype.clone = function() {
      return create(XMLDeclaration.prototype, this);
    };

    XMLDeclaration.prototype.toString = function(options, level) {
      var indent, newline, pretty, r, space, _ref, _ref1;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
      newline = (_ref1 = options != null ? options.newline : void 0) != null ? _ref1 : '\n';
      level || (level = 0);
      space = new Array(level + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += '<?xml';
      if (this.version != null) {
        r += ' version="' + this.version + '"';
      }
      if (this.encoding != null) {
        r += ' encoding="' + this.encoding + '"';
      }
      if (this.standalone != null) {
        r += ' standalone="' + this.standalone + '"';
      }
      r += '?>';
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLDeclaration;

  })(XMLNode);

}).call(this);

},{"./XMLNode":79,"lodash-node/modern/objects/create":97,"lodash-node/modern/objects/isObject":102}],77:[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
(function() {
  var XMLDocType, create, isObject;

  create = require('lodash-node/modern/objects/create');

  isObject = require('lodash-node/modern/objects/isObject');

  module.exports = XMLDocType = (function() {
    function XMLDocType(parent, pubID, sysID) {
      var _ref, _ref1;
      this.documentObject = parent;
      this.stringify = this.documentObject.stringify;
      this.children = [];
      if (isObject(pubID)) {
        _ref = pubID, pubID = _ref.pubID, sysID = _ref.sysID;
      }
      if (sysID == null) {
        _ref1 = [pubID, sysID], sysID = _ref1[0], pubID = _ref1[1];
      }
      if (pubID != null) {
        this.pubID = this.stringify.dtdPubID(pubID);
      }
      if (sysID != null) {
        this.sysID = this.stringify.dtdSysID(sysID);
      }
    }

    XMLDocType.prototype.clone = function() {
      return create(XMLDocType.prototype, this);
    };

    XMLDocType.prototype.element = function(name, value) {
      var XMLDTDElement, child;
      XMLDTDElement = require('./XMLDTDElement');
      child = new XMLDTDElement(this, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      var XMLDTDAttList, child;
      XMLDTDAttList = require('./XMLDTDAttList');
      child = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.entity = function(name, value) {
      var XMLDTDEntity, child;
      XMLDTDEntity = require('./XMLDTDEntity');
      child = new XMLDTDEntity(this, false, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.pEntity = function(name, value) {
      var XMLDTDEntity, child;
      XMLDTDEntity = require('./XMLDTDEntity');
      child = new XMLDTDEntity(this, true, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.notation = function(name, value) {
      var XMLDTDNotation, child;
      XMLDTDNotation = require('./XMLDTDNotation');
      child = new XMLDTDNotation(this, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.cdata = function(value) {
      var XMLCData, child;
      XMLCData = require('./XMLCData');
      child = new XMLCData(this, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.comment = function(value) {
      var XMLComment, child;
      XMLComment = require('./XMLComment');
      child = new XMLComment(this, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.instruction = function(target, value) {
      var XMLProcessingInstruction, child;
      XMLProcessingInstruction = require('./XMLProcessingInstruction');
      child = new XMLProcessingInstruction(this, target, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.root = function() {
      return this.documentObject.root();
    };

    XMLDocType.prototype.document = function() {
      return this.documentObject;
    };

    XMLDocType.prototype.toString = function(options, level) {
      var child, indent, newline, pretty, r, space, _i, _len, _ref, _ref1, _ref2;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
      newline = (_ref1 = options != null ? options.newline : void 0) != null ? _ref1 : '\n';
      level || (level = 0);
      space = new Array(level + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += '<!DOCTYPE ' + this.root().name;
      if (this.pubID && this.sysID) {
        r += ' PUBLIC "' + this.pubID + '" "' + this.sysID + '"';
      } else if (this.sysID) {
        r += ' SYSTEM "' + this.sysID + '"';
      }
      if (this.children.length > 0) {
        r += ' [';
        if (pretty) {
          r += newline;
        }
        _ref2 = this.children;
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          child = _ref2[_i];
          r += child.toString(options, level + 1);
        }
        r += ']';
      }
      r += '>';
      if (pretty) {
        r += newline;
      }
      return r;
    };

    XMLDocType.prototype.ele = function(name, value) {
      return this.element(name, value);
    };

    XMLDocType.prototype.att = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
    };

    XMLDocType.prototype.ent = function(name, value) {
      return this.entity(name, value);
    };

    XMLDocType.prototype.pent = function(name, value) {
      return this.pEntity(name, value);
    };

    XMLDocType.prototype.not = function(name, value) {
      return this.notation(name, value);
    };

    XMLDocType.prototype.dat = function(value) {
      return this.cdata(value);
    };

    XMLDocType.prototype.com = function(value) {
      return this.comment(value);
    };

    XMLDocType.prototype.ins = function(target, value) {
      return this.instruction(target, value);
    };

    XMLDocType.prototype.up = function() {
      return this.root();
    };

    XMLDocType.prototype.doc = function() {
      return this.document();
    };

    return XMLDocType;

  })();

}).call(this);

},{"./XMLCData":70,"./XMLComment":71,"./XMLDTDAttList":72,"./XMLDTDElement":73,"./XMLDTDEntity":74,"./XMLDTDNotation":75,"./XMLProcessingInstruction":80,"lodash-node/modern/objects/create":97,"lodash-node/modern/objects/isObject":102}],78:[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
(function() {
  var XMLAttribute, XMLElement, XMLNode, XMLProcessingInstruction, create, isArray, isFunction, isObject,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  create = require('lodash-node/modern/objects/create');

  isObject = require('lodash-node/modern/objects/isObject');

  isArray = require('lodash-node/modern/objects/isArray');

  isFunction = require('lodash-node/modern/objects/isFunction');

  XMLNode = require('./XMLNode');

  XMLAttribute = require('./XMLAttribute');

  XMLProcessingInstruction = require('./XMLProcessingInstruction');

  module.exports = XMLElement = (function(_super) {
    __extends(XMLElement, _super);

    function XMLElement(parent, name, attributes) {
      XMLElement.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing element name");
      }
      this.name = this.stringify.eleName(name);
      this.children = [];
      this.instructions = [];
      this.attributes = {};
      if (attributes != null) {
        this.attribute(attributes);
      }
    }

    XMLElement.prototype.clone = function() {
      var att, attName, clonedSelf, pi, _i, _len, _ref, _ref1;
      clonedSelf = create(XMLElement.prototype, this);
      clonedSelf.attributes = {};
      _ref = this.attributes;
      for (attName in _ref) {
        if (!__hasProp.call(_ref, attName)) continue;
        att = _ref[attName];
        clonedSelf.attributes[attName] = att.clone();
      }
      clonedSelf.instructions = [];
      _ref1 = this.instructions;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        pi = _ref1[_i];
        clonedSelf.instructions.push(pi.clone());
      }
      clonedSelf.children = [];
      this.children.forEach(function(child) {
        var clonedChild;
        clonedChild = child.clone();
        clonedChild.parent = clonedSelf;
        return clonedSelf.children.push(clonedChild);
      });
      return clonedSelf;
    };

    XMLElement.prototype.attribute = function(name, value) {
      var attName, attValue;
      if (name != null) {
        name = name.valueOf();
      }
      if (isObject(name)) {
        for (attName in name) {
          if (!__hasProp.call(name, attName)) continue;
          attValue = name[attName];
          this.attribute(attName, attValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        if (!this.options.skipNullAttributes || (value != null)) {
          this.attributes[name] = new XMLAttribute(this, name, value);
        }
      }
      return this;
    };

    XMLElement.prototype.removeAttribute = function(name) {
      var attName, _i, _len;
      if (name == null) {
        throw new Error("Missing attribute name");
      }
      name = name.valueOf();
      if (isArray(name)) {
        for (_i = 0, _len = name.length; _i < _len; _i++) {
          attName = name[_i];
          delete this.attributes[attName];
        }
      } else {
        delete this.attributes[name];
      }
      return this;
    };

    XMLElement.prototype.instruction = function(target, value) {
      var insTarget, insValue, instruction, _i, _len;
      if (target != null) {
        target = target.valueOf();
      }
      if (value != null) {
        value = value.valueOf();
      }
      if (isArray(target)) {
        for (_i = 0, _len = target.length; _i < _len; _i++) {
          insTarget = target[_i];
          this.instruction(insTarget);
        }
      } else if (isObject(target)) {
        for (insTarget in target) {
          if (!__hasProp.call(target, insTarget)) continue;
          insValue = target[insTarget];
          this.instruction(insTarget, insValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        instruction = new XMLProcessingInstruction(this, target, value);
        this.instructions.push(instruction);
      }
      return this;
    };

    XMLElement.prototype.toString = function(options, level) {
      var att, child, indent, instruction, name, newline, pretty, r, space, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3, _ref4;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
      newline = (_ref1 = options != null ? options.newline : void 0) != null ? _ref1 : '\n';
      level || (level = 0);
      space = new Array(level + 1).join(indent);
      r = '';
      _ref2 = this.instructions;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        instruction = _ref2[_i];
        r += instruction.toString(options, level + 1);
      }
      if (pretty) {
        r += space;
      }
      r += '<' + this.name;
      _ref3 = this.attributes;
      for (name in _ref3) {
        if (!__hasProp.call(_ref3, name)) continue;
        att = _ref3[name];
        r += att.toString(options);
      }
      if (this.children.length === 0) {
        r += '/>';
        if (pretty) {
          r += newline;
        }
      } else if (pretty && this.children.length === 1 && (this.children[0].value != null)) {
        r += '>';
        r += this.children[0].value;
        r += '</' + this.name + '>';
        r += newline;
      } else {
        r += '>';
        if (pretty) {
          r += newline;
        }
        _ref4 = this.children;
        for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
          child = _ref4[_j];
          r += child.toString(options, level + 1);
        }
        if (pretty) {
          r += space;
        }
        r += '</' + this.name + '>';
        if (pretty) {
          r += newline;
        }
      }
      return r;
    };

    XMLElement.prototype.att = function(name, value) {
      return this.attribute(name, value);
    };

    XMLElement.prototype.ins = function(target, value) {
      return this.instruction(target, value);
    };

    XMLElement.prototype.a = function(name, value) {
      return this.attribute(name, value);
    };

    XMLElement.prototype.i = function(target, value) {
      return this.instruction(target, value);
    };

    return XMLElement;

  })(XMLNode);

}).call(this);

},{"./XMLAttribute":68,"./XMLNode":79,"./XMLProcessingInstruction":80,"lodash-node/modern/objects/create":97,"lodash-node/modern/objects/isArray":99,"lodash-node/modern/objects/isFunction":101,"lodash-node/modern/objects/isObject":102}],79:[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
(function() {
  var XMLNode, isArray, isEmpty, isFunction, isObject,
    __hasProp = {}.hasOwnProperty;

  isObject = require('lodash-node/modern/objects/isObject');

  isArray = require('lodash-node/modern/objects/isArray');

  isFunction = require('lodash-node/modern/objects/isFunction');

  isEmpty = require('lodash-node/modern/objects/isEmpty');

  module.exports = XMLNode = (function() {
    function XMLNode(parent) {
      this.parent = parent;
      this.options = this.parent.options;
      this.stringify = this.parent.stringify;
    }

    XMLNode.prototype.clone = function() {
      throw new Error("Cannot clone generic XMLNode");
    };

    XMLNode.prototype.element = function(name, attributes, text) {
      var item, key, lastChild, val, _i, _len, _ref;
      lastChild = null;
      if (attributes == null) {
        attributes = {};
      }
      attributes = attributes.valueOf();
      if (!isObject(attributes)) {
        _ref = [attributes, text], text = _ref[0], attributes = _ref[1];
      }
      if (name != null) {
        name = name.valueOf();
      }
      if (isArray(name)) {
        for (_i = 0, _len = name.length; _i < _len; _i++) {
          item = name[_i];
          lastChild = this.element(item);
        }
      } else if (isFunction(name)) {
        lastChild = this.element(name.apply());
      } else if (isObject(name)) {
        for (key in name) {
          if (!__hasProp.call(name, key)) continue;
          val = name[key];
          if (isFunction(val)) {
            val = val.apply();
          }
          if ((isObject(val)) && (isEmpty(val))) {
            val = null;
          }
          if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
            lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
          } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && key.indexOf(this.stringify.convertPIKey) === 0) {
            lastChild = this.instruction(key.substr(this.stringify.convertPIKey.length), val);
          } else if (isObject(val)) {
            if (!this.options.ignoreDecorators && this.stringify.convertListKey && key.indexOf(this.stringify.convertListKey) === 0 && isArray(val)) {
              lastChild = this.element(val);
            } else {
              lastChild = this.element(key);
              lastChild.element(val);
            }
          } else {
            lastChild = this.element(key, val);
          }
        }
      } else {
        if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
          lastChild = this.text(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
          lastChild = this.cdata(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
          lastChild = this.comment(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
          lastChild = this.raw(text);
        } else {
          lastChild = this.node(name, attributes, text);
        }
      }
      if (lastChild == null) {
        throw new Error("Could not create any elements with: " + name);
      }
      return lastChild;
    };

    XMLNode.prototype.insertBefore = function(name, attributes, text) {
      var child, i, removed;
      if (this.isRoot) {
        throw new Error("Cannot insert elements at root level");
      }
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i);
      child = this.parent.element(name, attributes, text);
      Array.prototype.push.apply(this.parent.children, removed);
      return child;
    };

    XMLNode.prototype.insertAfter = function(name, attributes, text) {
      var child, i, removed;
      if (this.isRoot) {
        throw new Error("Cannot insert elements at root level");
      }
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.element(name, attributes, text);
      Array.prototype.push.apply(this.parent.children, removed);
      return child;
    };

    XMLNode.prototype.remove = function() {
      var i, _ref;
      if (this.isRoot) {
        throw new Error("Cannot remove the root element");
      }
      i = this.parent.children.indexOf(this);
      [].splice.apply(this.parent.children, [i, i - i + 1].concat(_ref = [])), _ref;
      return this.parent;
    };

    XMLNode.prototype.node = function(name, attributes, text) {
      var XMLElement, child, _ref;
      if (name != null) {
        name = name.valueOf();
      }
      if (attributes == null) {
        attributes = {};
      }
      attributes = attributes.valueOf();
      if (!isObject(attributes)) {
        _ref = [attributes, text], text = _ref[0], attributes = _ref[1];
      }
      XMLElement = require('./XMLElement');
      child = new XMLElement(this, name, attributes);
      if (text != null) {
        child.text(text);
      }
      this.children.push(child);
      return child;
    };

    XMLNode.prototype.text = function(value) {
      var XMLText, child;
      XMLText = require('./XMLText');
      child = new XMLText(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.cdata = function(value) {
      var XMLCData, child;
      XMLCData = require('./XMLCData');
      child = new XMLCData(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.comment = function(value) {
      var XMLComment, child;
      XMLComment = require('./XMLComment');
      child = new XMLComment(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.raw = function(value) {
      var XMLRaw, child;
      XMLRaw = require('./XMLRaw');
      child = new XMLRaw(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.declaration = function(version, encoding, standalone) {
      var XMLDeclaration, doc, xmldec;
      doc = this.document();
      XMLDeclaration = require('./XMLDeclaration');
      xmldec = new XMLDeclaration(doc, version, encoding, standalone);
      doc.xmldec = xmldec;
      return doc.root();
    };

    XMLNode.prototype.doctype = function(pubID, sysID) {
      var XMLDocType, doc, doctype;
      doc = this.document();
      XMLDocType = require('./XMLDocType');
      doctype = new XMLDocType(doc, pubID, sysID);
      doc.doctype = doctype;
      return doctype;
    };

    XMLNode.prototype.up = function() {
      if (this.isRoot) {
        throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
      }
      return this.parent;
    };

    XMLNode.prototype.root = function() {
      var child;
      if (this.isRoot) {
        return this;
      }
      child = this.parent;
      while (!child.isRoot) {
        child = child.parent;
      }
      return child;
    };

    XMLNode.prototype.document = function() {
      return this.root().documentObject;
    };

    XMLNode.prototype.end = function(options) {
      return this.document().toString(options);
    };

    XMLNode.prototype.prev = function() {
      var i;
      if (this.isRoot) {
        throw new Error("Root node has no siblings");
      }
      i = this.parent.children.indexOf(this);
      if (i < 1) {
        throw new Error("Already at the first node");
      }
      return this.parent.children[i - 1];
    };

    XMLNode.prototype.next = function() {
      var i;
      if (this.isRoot) {
        throw new Error("Root node has no siblings");
      }
      i = this.parent.children.indexOf(this);
      if (i === -1 || i === this.parent.children.length - 1) {
        throw new Error("Already at the last node");
      }
      return this.parent.children[i + 1];
    };

    XMLNode.prototype.importXMLBuilder = function(xmlbuilder) {
      var clonedRoot;
      clonedRoot = xmlbuilder.root().clone();
      clonedRoot.parent = this;
      clonedRoot.isRoot = false;
      this.children.push(clonedRoot);
      return this;
    };

    XMLNode.prototype.ele = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLNode.prototype.nod = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLNode.prototype.txt = function(value) {
      return this.text(value);
    };

    XMLNode.prototype.dat = function(value) {
      return this.cdata(value);
    };

    XMLNode.prototype.com = function(value) {
      return this.comment(value);
    };

    XMLNode.prototype.doc = function() {
      return this.document();
    };

    XMLNode.prototype.dec = function(version, encoding, standalone) {
      return this.declaration(version, encoding, standalone);
    };

    XMLNode.prototype.dtd = function(pubID, sysID) {
      return this.doctype(pubID, sysID);
    };

    XMLNode.prototype.e = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLNode.prototype.n = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLNode.prototype.t = function(value) {
      return this.text(value);
    };

    XMLNode.prototype.d = function(value) {
      return this.cdata(value);
    };

    XMLNode.prototype.c = function(value) {
      return this.comment(value);
    };

    XMLNode.prototype.r = function(value) {
      return this.raw(value);
    };

    XMLNode.prototype.u = function() {
      return this.up();
    };

    return XMLNode;

  })();

}).call(this);

},{"./XMLCData":70,"./XMLComment":71,"./XMLDeclaration":76,"./XMLDocType":77,"./XMLElement":78,"./XMLRaw":81,"./XMLText":83,"lodash-node/modern/objects/isArray":99,"lodash-node/modern/objects/isEmpty":100,"lodash-node/modern/objects/isFunction":101,"lodash-node/modern/objects/isObject":102}],80:[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
(function() {
  var XMLProcessingInstruction, create;

  create = require('lodash-node/modern/objects/create');

  module.exports = XMLProcessingInstruction = (function() {
    function XMLProcessingInstruction(parent, target, value) {
      this.stringify = parent.stringify;
      if (target == null) {
        throw new Error("Missing instruction target");
      }
      this.target = this.stringify.insTarget(target);
      if (value) {
        this.value = this.stringify.insValue(value);
      }
    }

    XMLProcessingInstruction.prototype.clone = function() {
      return create(XMLProcessingInstruction.prototype, this);
    };

    XMLProcessingInstruction.prototype.toString = function(options, level) {
      var indent, newline, pretty, r, space, _ref, _ref1;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
      newline = (_ref1 = options != null ? options.newline : void 0) != null ? _ref1 : '\n';
      level || (level = 0);
      space = new Array(level + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += '<?';
      r += this.target;
      if (this.value) {
        r += ' ' + this.value;
      }
      r += '?>';
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLProcessingInstruction;

  })();

}).call(this);

},{"lodash-node/modern/objects/create":97}],81:[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
(function() {
  var XMLNode, XMLRaw, create,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  create = require('lodash-node/modern/objects/create');

  XMLNode = require('./XMLNode');

  module.exports = XMLRaw = (function(_super) {
    __extends(XMLRaw, _super);

    function XMLRaw(parent, text) {
      XMLRaw.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing raw text");
      }
      this.value = this.stringify.raw(text);
    }

    XMLRaw.prototype.clone = function() {
      return create(XMLRaw.prototype, this);
    };

    XMLRaw.prototype.toString = function(options, level) {
      var indent, newline, pretty, r, space, _ref, _ref1;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
      newline = (_ref1 = options != null ? options.newline : void 0) != null ? _ref1 : '\n';
      level || (level = 0);
      space = new Array(level + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += this.value;
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLRaw;

  })(XMLNode);

}).call(this);

},{"./XMLNode":79,"lodash-node/modern/objects/create":97}],82:[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
(function() {
  var XMLStringifier,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty;

  module.exports = XMLStringifier = (function() {
    function XMLStringifier(options) {
      this.assertLegalChar = __bind(this.assertLegalChar, this);
      var key, value, _ref;
      this.allowSurrogateChars = options != null ? options.allowSurrogateChars : void 0;
      _ref = (options != null ? options.stringify : void 0) || {};
      for (key in _ref) {
        if (!__hasProp.call(_ref, key)) continue;
        value = _ref[key];
        this[key] = value;
      }
    }

    XMLStringifier.prototype.eleName = function(val) {
      val = '' + val || '';
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.eleText = function(val) {
      val = '' + val || '';
      return this.assertLegalChar(this.elEscape(val));
    };

    XMLStringifier.prototype.cdata = function(val) {
      val = '' + val || '';
      if (val.match(/]]>/)) {
        throw new Error("Invalid CDATA text: " + val);
      }
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.comment = function(val) {
      val = '' + val || '';
      if (val.match(/--/)) {
        throw new Error("Comment text cannot contain double-hypen: " + val);
      }
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.raw = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.attName = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.attValue = function(val) {
      val = '' + val || '';
      return this.attEscape(val);
    };

    XMLStringifier.prototype.insTarget = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.insValue = function(val) {
      val = '' + val || '';
      if (val.match(/\?>/)) {
        throw new Error("Invalid processing instruction value: " + val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlVersion = function(val) {
      val = '' + val || '';
      if (!val.match(/1\.[0-9]+/)) {
        throw new Error("Invalid version number: " + val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlEncoding = function(val) {
      val = '' + val || '';
      if (!val.match(/[A-Za-z](?:[A-Za-z0-9._-]|-)*/)) {
        throw new Error("Invalid encoding: " + options.val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlStandalone = function(val) {
      if (val) {
        return "yes";
      } else {
        return "no";
      }
    };

    XMLStringifier.prototype.dtdPubID = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdSysID = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdElementValue = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdAttType = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdAttDefault = function(val) {
      if (val != null) {
        return '' + val || '';
      } else {
        return val;
      }
    };

    XMLStringifier.prototype.dtdEntityValue = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdNData = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.convertAttKey = '@';

    XMLStringifier.prototype.convertPIKey = '?';

    XMLStringifier.prototype.convertTextKey = '#text';

    XMLStringifier.prototype.convertCDataKey = '#cdata';

    XMLStringifier.prototype.convertCommentKey = '#comment';

    XMLStringifier.prototype.convertRawKey = '#raw';

    XMLStringifier.prototype.convertListKey = '#list';

    XMLStringifier.prototype.assertLegalChar = function(str) {
      var chars, chr;
      if (this.allowSurrogateChars) {
        chars = /[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uFFFE-\uFFFF]/;
      } else {
        chars = /[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uD800-\uDFFF\uFFFE-\uFFFF]/;
      }
      chr = str.match(chars);
      if (chr) {
        throw new Error("Invalid character (" + chr + ") in string: " + str + " at index " + chr.index);
      }
      return str;
    };

    XMLStringifier.prototype.elEscape = function(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r/g, '&#xD;');
    };

    XMLStringifier.prototype.attEscape = function(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/\t/g, '&#x9;').replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;');
    };

    return XMLStringifier;

  })();

}).call(this);

},{}],83:[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
(function() {
  var XMLNode, XMLText, create,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  create = require('lodash-node/modern/objects/create');

  XMLNode = require('./XMLNode');

  module.exports = XMLText = (function(_super) {
    __extends(XMLText, _super);

    function XMLText(parent, text) {
      this.parent = parent;
      XMLText.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing element text");
      }
      this.value = this.stringify.eleText(text);
    }

    XMLText.prototype.clone = function() {
      return create(XMLText.prototype, this);
    };

    XMLText.prototype.toString = function(options, level) {
      var indent, newline, pretty, r, space, _ref, _ref1;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (_ref = options != null ? options.indent : void 0) != null ? _ref : '  ';
      newline = (_ref1 = options != null ? options.newline : void 0) != null ? _ref1 : '\n';
      level || (level = 0);
      space = new Array(level + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += this.value;
      if (pretty) {
        r += newline;
      }
      return r;
    };

    return XMLText;

  })(XMLNode);

}).call(this);

},{"./XMLNode":79,"lodash-node/modern/objects/create":97}],84:[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
(function() {
  var XMLBuilder, assign;

  assign = require('lodash-node/modern/objects/assign');

  XMLBuilder = require('./XMLBuilder');

  module.exports.create = function(name, xmldec, doctype, options) {
    options = assign({}, xmldec, doctype, options);
    return new XMLBuilder(name, options).root();
  };

}).call(this);

},{"./XMLBuilder":69,"lodash-node/modern/objects/assign":96}],85:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createWrapper = require('../internals/createWrapper'),
    slice = require('../internals/slice');

/**
 * Creates a function that, when called, invokes `func` with the `this`
 * binding of `thisArg` and prepends any additional `bind` arguments to those
 * provided to the bound function.
 *
 * @static
 * @memberOf _
 * @category Functions
 * @param {Function} func The function to bind.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {...*} [arg] Arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * var func = function(greeting) {
 *   return greeting + ' ' + this.name;
 * };
 *
 * func = _.bind(func, { 'name': 'fred' }, 'hi');
 * func();
 * // => 'hi fred'
 */
function bind(func, thisArg) {
  return arguments.length > 2
    ? createWrapper(func, 17, slice(arguments, 2), null, thisArg)
    : createWrapper(func, 1, null, null, thisArg);
}

module.exports = bind;

},{"../internals/createWrapper":90,"../internals/slice":95}],86:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreate = require('./baseCreate'),
    isObject = require('../objects/isObject'),
    setBindData = require('./setBindData'),
    slice = require('./slice');

/**
 * Used for `Array` method references.
 *
 * Normally `Array.prototype` would suffice, however, using an array literal
 * avoids issues in Narwhal.
 */
var arrayRef = [];

/** Native method shortcuts */
var push = arrayRef.push;

/**
 * The base implementation of `_.bind` that creates the bound function and
 * sets its meta data.
 *
 * @private
 * @param {Array} bindData The bind data array.
 * @returns {Function} Returns the new bound function.
 */
function baseBind(bindData) {
  var func = bindData[0],
      partialArgs = bindData[2],
      thisArg = bindData[4];

  function bound() {
    // `Function#bind` spec
    // http://es5.github.io/#x15.3.4.5
    if (partialArgs) {
      // avoid `arguments` object deoptimizations by using `slice` instead
      // of `Array.prototype.slice.call` and not assigning `arguments` to a
      // variable as a ternary expression
      var args = slice(partialArgs);
      push.apply(args, arguments);
    }
    // mimic the constructor's `return` behavior
    // http://es5.github.io/#x13.2.2
    if (this instanceof bound) {
      // ensure `new bound` is an instance of `func`
      var thisBinding = baseCreate(func.prototype),
          result = func.apply(thisBinding, args || arguments);
      return isObject(result) ? result : thisBinding;
    }
    return func.apply(thisArg, args || arguments);
  }
  setBindData(bound, bindData);
  return bound;
}

module.exports = baseBind;

},{"../objects/isObject":102,"./baseCreate":87,"./setBindData":93,"./slice":95}],87:[function(require,module,exports){
(function (global){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('./isNative'),
    isObject = require('../objects/isObject'),
    noop = require('../utilities/noop');

/* Native method shortcuts for methods with the same name as other `lodash` methods */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(prototype, properties) {
  return isObject(prototype) ? nativeCreate(prototype) : {};
}
// fallback for browsers without `Object.create`
if (!nativeCreate) {
  baseCreate = (function() {
    function Object() {}
    return function(prototype) {
      if (isObject(prototype)) {
        Object.prototype = prototype;
        var result = new Object;
        Object.prototype = null;
      }
      return result || global.Object();
    };
  }());
}

module.exports = baseCreate;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../objects/isObject":102,"../utilities/noop":106,"./isNative":91}],88:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var bind = require('../functions/bind'),
    identity = require('../utilities/identity'),
    setBindData = require('./setBindData'),
    support = require('../support');

/** Used to detected named functions */
var reFuncName = /^\s*function[ \n\r\t]+\w/;

/** Used to detect functions containing a `this` reference */
var reThis = /\bthis\b/;

/** Native method shortcuts */
var fnToString = Function.prototype.toString;

/**
 * The base implementation of `_.createCallback` without support for creating
 * "_.pluck" or "_.where" style callbacks.
 *
 * @private
 * @param {*} [func=identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of the created callback.
 * @param {number} [argCount] The number of arguments the callback accepts.
 * @returns {Function} Returns a callback function.
 */
function baseCreateCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  // exit early for no `thisArg` or already bound by `Function#bind`
  if (typeof thisArg == 'undefined' || !('prototype' in func)) {
    return func;
  }
  var bindData = func.__bindData__;
  if (typeof bindData == 'undefined') {
    if (support.funcNames) {
      bindData = !func.name;
    }
    bindData = bindData || !support.funcDecomp;
    if (!bindData) {
      var source = fnToString.call(func);
      if (!support.funcNames) {
        bindData = !reFuncName.test(source);
      }
      if (!bindData) {
        // checks if `func` references the `this` keyword and stores the result
        bindData = reThis.test(source);
        setBindData(func, bindData);
      }
    }
  }
  // exit early if there are no `this` references or `func` is bound
  if (bindData === false || (bindData !== true && bindData[1] & 1)) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 2: return function(a, b) {
      return func.call(thisArg, a, b);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
  }
  return bind(func, thisArg);
}

module.exports = baseCreateCallback;

},{"../functions/bind":85,"../support":104,"../utilities/identity":105,"./setBindData":93}],89:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreate = require('./baseCreate'),
    isObject = require('../objects/isObject'),
    setBindData = require('./setBindData'),
    slice = require('./slice');

/**
 * Used for `Array` method references.
 *
 * Normally `Array.prototype` would suffice, however, using an array literal
 * avoids issues in Narwhal.
 */
var arrayRef = [];

/** Native method shortcuts */
var push = arrayRef.push;

/**
 * The base implementation of `createWrapper` that creates the wrapper and
 * sets its meta data.
 *
 * @private
 * @param {Array} bindData The bind data array.
 * @returns {Function} Returns the new function.
 */
function baseCreateWrapper(bindData) {
  var func = bindData[0],
      bitmask = bindData[1],
      partialArgs = bindData[2],
      partialRightArgs = bindData[3],
      thisArg = bindData[4],
      arity = bindData[5];

  var isBind = bitmask & 1,
      isBindKey = bitmask & 2,
      isCurry = bitmask & 4,
      isCurryBound = bitmask & 8,
      key = func;

  function bound() {
    var thisBinding = isBind ? thisArg : this;
    if (partialArgs) {
      var args = slice(partialArgs);
      push.apply(args, arguments);
    }
    if (partialRightArgs || isCurry) {
      args || (args = slice(arguments));
      if (partialRightArgs) {
        push.apply(args, partialRightArgs);
      }
      if (isCurry && args.length < arity) {
        bitmask |= 16 & ~32;
        return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);
      }
    }
    args || (args = arguments);
    if (isBindKey) {
      func = thisBinding[key];
    }
    if (this instanceof bound) {
      thisBinding = baseCreate(func.prototype);
      var result = func.apply(thisBinding, args);
      return isObject(result) ? result : thisBinding;
    }
    return func.apply(thisBinding, args);
  }
  setBindData(bound, bindData);
  return bound;
}

module.exports = baseCreateWrapper;

},{"../objects/isObject":102,"./baseCreate":87,"./setBindData":93,"./slice":95}],90:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseBind = require('./baseBind'),
    baseCreateWrapper = require('./baseCreateWrapper'),
    isFunction = require('../objects/isFunction'),
    slice = require('./slice');

/**
 * Used for `Array` method references.
 *
 * Normally `Array.prototype` would suffice, however, using an array literal
 * avoids issues in Narwhal.
 */
var arrayRef = [];

/** Native method shortcuts */
var push = arrayRef.push,
    unshift = arrayRef.unshift;

/**
 * Creates a function that, when called, either curries or invokes `func`
 * with an optional `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of method flags to compose.
 *  The bitmask may be composed of the following flags:
 *  1 - `_.bind`
 *  2 - `_.bindKey`
 *  4 - `_.curry`
 *  8 - `_.curry` (bound)
 *  16 - `_.partial`
 *  32 - `_.partialRight`
 * @param {Array} [partialArgs] An array of arguments to prepend to those
 *  provided to the new function.
 * @param {Array} [partialRightArgs] An array of arguments to append to those
 *  provided to the new function.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new function.
 */
function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
  var isBind = bitmask & 1,
      isBindKey = bitmask & 2,
      isCurry = bitmask & 4,
      isCurryBound = bitmask & 8,
      isPartial = bitmask & 16,
      isPartialRight = bitmask & 32;

  if (!isBindKey && !isFunction(func)) {
    throw new TypeError;
  }
  if (isPartial && !partialArgs.length) {
    bitmask &= ~16;
    isPartial = partialArgs = false;
  }
  if (isPartialRight && !partialRightArgs.length) {
    bitmask &= ~32;
    isPartialRight = partialRightArgs = false;
  }
  var bindData = func && func.__bindData__;
  if (bindData && bindData !== true) {
    // clone `bindData`
    bindData = slice(bindData);
    if (bindData[2]) {
      bindData[2] = slice(bindData[2]);
    }
    if (bindData[3]) {
      bindData[3] = slice(bindData[3]);
    }
    // set `thisBinding` is not previously bound
    if (isBind && !(bindData[1] & 1)) {
      bindData[4] = thisArg;
    }
    // set if previously bound but not currently (subsequent curried functions)
    if (!isBind && bindData[1] & 1) {
      bitmask |= 8;
    }
    // set curried arity if not yet set
    if (isCurry && !(bindData[1] & 4)) {
      bindData[5] = arity;
    }
    // append partial left arguments
    if (isPartial) {
      push.apply(bindData[2] || (bindData[2] = []), partialArgs);
    }
    // append partial right arguments
    if (isPartialRight) {
      unshift.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
    }
    // merge flags
    bindData[1] |= bitmask;
    return createWrapper.apply(null, bindData);
  }
  // fast path for `_.bind`
  var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;
  return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
}

module.exports = createWrapper;

},{"../objects/isFunction":101,"./baseBind":86,"./baseCreateWrapper":89,"./slice":95}],91:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Used to detect if a method is native */
var reNative = RegExp('^' +
  String(toString)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/toString| for [^\]]+/g, '.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
 */
function isNative(value) {
  return typeof value == 'function' && reNative.test(value);
}

module.exports = isNative;

},{}],92:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to determine if values are of the language type Object */
var objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false
};

module.exports = objectTypes;

},{}],93:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('./isNative'),
    noop = require('../utilities/noop');

/** Used as the property descriptor for `__bindData__` */
var descriptor = {
  'configurable': false,
  'enumerable': false,
  'value': null,
  'writable': false
};

/** Used to set meta data on functions */
var defineProperty = (function() {
  // IE 8 only accepts DOM elements
  try {
    var o = {},
        func = isNative(func = Object.defineProperty) && func,
        result = func(o, o, o) && func;
  } catch(e) { }
  return result;
}());

/**
 * Sets `this` binding data on a given function.
 *
 * @private
 * @param {Function} func The function to set data on.
 * @param {Array} value The data array to set.
 */
var setBindData = !defineProperty ? noop : function(func, value) {
  descriptor.value = value;
  defineProperty(func, '__bindData__', descriptor);
};

module.exports = setBindData;

},{"../utilities/noop":106,"./isNative":91}],94:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var objectTypes = require('./objectTypes');

/** Used for native method references */
var objectProto = Object.prototype;

/** Native method shortcuts */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which produces an array of the
 * given object's own enumerable property names.
 *
 * @private
 * @type Function
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns an array of property names.
 */
var shimKeys = function(object) {
  var index, iterable = object, result = [];
  if (!iterable) return result;
  if (!(objectTypes[typeof object])) return result;
    for (index in iterable) {
      if (hasOwnProperty.call(iterable, index)) {
        result.push(index);
      }
    }
  return result
};

module.exports = shimKeys;

},{"./objectTypes":92}],95:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Slices the `collection` from the `start` index up to, but not including,
 * the `end` index.
 *
 * Note: This function is used instead of `Array#slice` to support node lists
 * in IE < 9 and to ensure dense arrays are returned.
 *
 * @private
 * @param {Array|Object|string} collection The collection to slice.
 * @param {number} start The start index.
 * @param {number} end The end index.
 * @returns {Array} Returns the new array.
 */
function slice(array, start, end) {
  start || (start = 0);
  if (typeof end == 'undefined') {
    end = array ? array.length : 0;
  }
  var index = -1,
      length = end - start || 0,
      result = Array(length < 0 ? 0 : length);

  while (++index < length) {
    result[index] = array[start + index];
  }
  return result;
}

module.exports = slice;

},{}],96:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreateCallback = require('../internals/baseCreateCallback'),
    keys = require('./keys'),
    objectTypes = require('../internals/objectTypes');

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object. Subsequent sources will overwrite property assignments of previous
 * sources. If a callback is provided it will be executed to produce the
 * assigned values. The callback is bound to `thisArg` and invoked with two
 * arguments; (objectValue, sourceValue).
 *
 * @static
 * @memberOf _
 * @type Function
 * @alias extend
 * @category Objects
 * @param {Object} object The destination object.
 * @param {...Object} [source] The source objects.
 * @param {Function} [callback] The function to customize assigning values.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Object} Returns the destination object.
 * @example
 *
 * _.assign({ 'name': 'fred' }, { 'employer': 'slate' });
 * // => { 'name': 'fred', 'employer': 'slate' }
 *
 * var defaults = _.partialRight(_.assign, function(a, b) {
 *   return typeof a == 'undefined' ? b : a;
 * });
 *
 * var object = { 'name': 'barney' };
 * defaults(object, { 'name': 'fred', 'employer': 'slate' });
 * // => { 'name': 'barney', 'employer': 'slate' }
 */
var assign = function(object, source, guard) {
  var index, iterable = object, result = iterable;
  if (!iterable) return result;
  var args = arguments,
      argsIndex = 0,
      argsLength = typeof guard == 'number' ? 2 : args.length;
  if (argsLength > 3 && typeof args[argsLength - 2] == 'function') {
    var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);
  } else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {
    callback = args[--argsLength];
  }
  while (++argsIndex < argsLength) {
    iterable = args[argsIndex];
    if (iterable && objectTypes[typeof iterable]) {
    var ownIndex = -1,
        ownProps = objectTypes[typeof iterable] && keys(iterable),
        length = ownProps ? ownProps.length : 0;

    while (++ownIndex < length) {
      index = ownProps[ownIndex];
      result[index] = callback ? callback(result[index], iterable[index]) : iterable[index];
    }
    }
  }
  return result
};

module.exports = assign;

},{"../internals/baseCreateCallback":88,"../internals/objectTypes":92,"./keys":103}],97:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var assign = require('./assign'),
    baseCreate = require('../internals/baseCreate');

/**
 * Creates an object that inherits from the given `prototype` object. If a
 * `properties` object is provided its own enumerable properties are assigned
 * to the created object.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {Object} prototype The object to inherit from.
 * @param {Object} [properties] The properties to assign to the object.
 * @returns {Object} Returns the new object.
 * @example
 *
 * function Shape() {
 *   this.x = 0;
 *   this.y = 0;
 * }
 *
 * function Circle() {
 *   Shape.call(this);
 * }
 *
 * Circle.prototype = _.create(Shape.prototype, { 'constructor': Circle });
 *
 * var circle = new Circle;
 * circle instanceof Circle;
 * // => true
 *
 * circle instanceof Shape;
 * // => true
 */
function create(prototype, properties) {
  var result = baseCreate(prototype);
  return properties ? assign(result, properties) : result;
}

module.exports = create;

},{"../internals/baseCreate":87,"./assign":96}],98:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreateCallback = require('../internals/baseCreateCallback'),
    keys = require('./keys'),
    objectTypes = require('../internals/objectTypes');

/**
 * Iterates over own enumerable properties of an object, executing the callback
 * for each property. The callback is bound to `thisArg` and invoked with three
 * arguments; (value, key, object). Callbacks may exit iteration early by
 * explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Objects
 * @param {Object} object The object to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
 *   console.log(key);
 * });
 * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
 */
var forOwn = function(collection, callback, thisArg) {
  var index, iterable = collection, result = iterable;
  if (!iterable) return result;
  if (!objectTypes[typeof iterable]) return result;
  callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
    var ownIndex = -1,
        ownProps = objectTypes[typeof iterable] && keys(iterable),
        length = ownProps ? ownProps.length : 0;

    while (++ownIndex < length) {
      index = ownProps[ownIndex];
      if (callback(iterable[index], index, collection) === false) return result;
    }
  return result
};

module.exports = forOwn;

},{"../internals/baseCreateCallback":88,"../internals/objectTypes":92,"./keys":103}],99:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('../internals/isNative');

/** `Object#toString` result shortcuts */
var arrayClass = '[object Array]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/* Native method shortcuts for methods with the same name as other `lodash` methods */
var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

/**
 * Checks if `value` is an array.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is an array, else `false`.
 * @example
 *
 * (function() { return _.isArray(arguments); })();
 * // => false
 *
 * _.isArray([1, 2, 3]);
 * // => true
 */
var isArray = nativeIsArray || function(value) {
  return value && typeof value == 'object' && typeof value.length == 'number' &&
    toString.call(value) == arrayClass || false;
};

module.exports = isArray;

},{"../internals/isNative":91}],100:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var forOwn = require('./forOwn'),
    isFunction = require('./isFunction');

/** `Object#toString` result shortcuts */
var argsClass = '[object Arguments]',
    arrayClass = '[object Array]',
    objectClass = '[object Object]',
    stringClass = '[object String]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/**
 * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
 * length of `0` and objects with no own enumerable properties are considered
 * "empty".
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {Array|Object|string} value The value to inspect.
 * @returns {boolean} Returns `true` if the `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({});
 * // => true
 *
 * _.isEmpty('');
 * // => true
 */
function isEmpty(value) {
  var result = true;
  if (!value) {
    return result;
  }
  var className = toString.call(value),
      length = value.length;

  if ((className == arrayClass || className == stringClass || className == argsClass ) ||
      (className == objectClass && typeof length == 'number' && isFunction(value.splice))) {
    return !length;
  }
  forOwn(value, function() {
    return (result = false);
  });
  return result;
}

module.exports = isEmpty;

},{"./forOwn":98,"./isFunction":101}],101:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Checks if `value` is a function.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 */
function isFunction(value) {
  return typeof value == 'function';
}

module.exports = isFunction;

},{}],102:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var objectTypes = require('../internals/objectTypes');

/**
 * Checks if `value` is the language type of Object.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // check if the value is the ECMAScript language type of Object
  // http://es5.github.io/#x8
  // and avoid a V8 bug
  // http://code.google.com/p/v8/issues/detail?id=2291
  return !!(value && objectTypes[typeof value]);
}

module.exports = isObject;

},{"../internals/objectTypes":92}],103:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('../internals/isNative'),
    isObject = require('./isObject'),
    shimKeys = require('../internals/shimKeys');

/* Native method shortcuts for methods with the same name as other `lodash` methods */
var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

/**
 * Creates an array composed of the own enumerable property names of an object.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns an array of property names.
 * @example
 *
 * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
 * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  if (!isObject(object)) {
    return [];
  }
  return nativeKeys(object);
};

module.exports = keys;

},{"../internals/isNative":91,"../internals/shimKeys":94,"./isObject":102}],104:[function(require,module,exports){
(function (global){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('./internals/isNative');

/** Used to detect functions containing a `this` reference */
var reThis = /\bthis\b/;

/**
 * An object used to flag environments features.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

/**
 * Detect if functions can be decompiled by `Function#toString`
 * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
 *
 * @memberOf _.support
 * @type boolean
 */
support.funcDecomp = !isNative(global.WinRTError) && reThis.test(function() { return this; });

/**
 * Detect if `Function#name` is supported (all but IE).
 *
 * @memberOf _.support
 * @type boolean
 */
support.funcNames = typeof Function.name == 'string';

module.exports = support;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./internals/isNative":91}],105:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'name': 'fred' };
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],106:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="node" -o ./modern/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * A no-operation function.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @example
 *
 * var object = { 'name': 'fred' };
 * _.noop(object) === undefined;
 * // => true
 */
function noop() {
  // no operation performed
}

module.exports = noop;

},{}]},{},[10])(10)
});