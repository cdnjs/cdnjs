!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jsforce=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * @file Manages Salesforce Analytics API
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

var _       = _dereq_('underscore')._,
    Promise = _dereq_('./promise');

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

},{"./promise":14,"underscore":50}],2:[function(_dereq_,module,exports){
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

},{}],3:[function(_dereq_,module,exports){
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
},{}],4:[function(_dereq_,module,exports){
var stream = _dereq_('stream');

module.exports = function(params, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(params.method, params.url);
  if (params.headers) {
    for (var header in params.headers) {
      xhr.setRequestHeader(header, params.headers[header]);
    }
  }
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


},{"stream":40}],5:[function(_dereq_,module,exports){
/**
 * @file Manages Salesforce Bulk API related operations
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

var util         = _dereq_('util'),
    stream       = _dereq_('stream'),
    Stream       = stream.Stream,
    events       = _dereq_('events'),
    _            = _dereq_('underscore')._,
    Connection   = _dereq_('./connection'),
    RecordStream = _dereq_('./record-stream'),
    CSV          = _dereq_('./csv'),
    Promise      = _dereq_('./promise');


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

  return this.open().then(function() {
    return bulk._request({
      method : 'GET',
      path : "/job/" + self.id,
      responseType: "application/xml"
    });
  }).then(function(res) {
    logger.debug(res.jobInfo);
    self.state = res.jobInfo.state;
    return res.jobInfo;
  }).thenCall(callback);

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

  return this.open().then(function() {
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
    self.state = "Aborted";
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

  return this.open().then(function() {
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
  }).thenCall(callback);

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
  this._csvStream = new RecordStream.CSVStream();
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
  this._result.thenCall(callback).then(function(res) {
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
  return this;
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
  return _.isFunction(callback) ? this.then(function(res) {
    return callback(null, res);
  }, function(err) {
    return callback(err);
  }) : this;
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
 * @returns {Promise.<Array.<RecordResult>>}
 */
Batch.prototype.retrieve = function(callback) {
  var self = this;
  var bulk = this._bulk;
  var jobId = this.job.id;
  var batchId = this.id;

  if (!jobId || !batchId) {
    throw new Error("Batch not started.");
  }
  return bulk._request({
    method : 'GET',
    path : "/job/" + jobId + "/batch/" + batchId + "/result"
  }).then(function(results) {
    results = _.map(results, function(ret) {
      return {
        id: ret.Id || null,
        success: ret.Success === "true",
        errors: ret.Error ? [ ret.Error ] : []
      };
    });
    self.emit('response', results);
    return results;
  }, function(err) {
    self.emit('error', err);
    throw err;
  }).thenCall(callback);
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
},{"./connection":8,"./csv":9,"./promise":14,"./record-stream":16,"events":29,"stream":40,"underscore":50,"util":48}],6:[function(_dereq_,module,exports){
/**
 * @file Manages asynchronous method response cache
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var events = _dereq_('events'),
    util   = _dereq_('util'),
    _      = _dereq_('underscore')._;

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

},{"events":29,"underscore":50,"util":48}],7:[function(_dereq_,module,exports){
/**
 * @file Manages Salesforce Chatter REST API calls
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

var util = _dereq_('util'),
    _ = _dereq_('underscore'),
    Promise = _dereq_('./promise');

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

},{"./promise":14,"underscore":50,"util":48}],8:[function(_dereq_,module,exports){
/**
 * @file Connection class to keep the API session information and manage requests
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var events  = _dereq_('events'),
    util    = _dereq_('util'),
    async   = _dereq_('async'),
    _       = _dereq_('underscore')._,
    Promise = _dereq_('./promise'),
    Logger  = _dereq_('./logger'),
    OAuth2  = _dereq_('./oauth2'),
    Query   = _dereq_('./query'),
    SObject = _dereq_('./sobject'),
    Transport = _dereq_('./transport'),
    Bulk    = _dereq_('./bulk'),
    Streaming = _dereq_('./streaming'),
    Tooling = _dereq_('./tooling'),
    Analytics = _dereq_('./analytics'),
    Chatter = _dereq_('./chatter'),
    Apex    = _dereq_('./apex'),
    Metadata = _dereq_('./metadata'),
    Cache   = _dereq_('./cache');

var defaults = {
  loginUrl: "https://login.salesforce.com",
  instanceUrl: "",
  version: "29.0"
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
 * @param {String} [options.proxyUrl] - Cross-domain proxy server URL, used in browser client, non Visualforce app.
 */
var Connection = module.exports = function(options) {
  options = options || {};

  this._logger = new Logger(options.logLevel);

  var oauth2 = options.oauth2;
  if (!oauth2 && options.clientId) { // if oauth2 client config is written in flat (for compatibility)
    oauth2 = {
      loginUrl : options.loginUrl,
      clientId : options.clientId,
      clientSecret : options.clientSecret,
      redirectUri : options.redirectUri
    };
  }


  if (oauth2) {
    /**
     * OAuth2 object
     * @member {OAuth2} Connection#oauth2
     */
    this.oauth2 = oauth2 instanceof OAuth2 ? oauth2 : new OAuth2(oauth2);
  }

  this.loginUrl = options.loginUrl || (oauth2 && oauth2.loginUrl) || defaults.loginUrl;
  this.version = options.version || defaults.version;
  this.maxRequest = options.maxRequest || this.maxRequest || 10;

  /** @private */
  this._transport =
    options.proxyUrl ? new Transport.ProxyTransport(options.proxyUrl) : new Transport();

  /**
   * Streaming API object
   * @member {Streaming} Connection#streaming
   */
  this.streaming = new Streaming(this);
  /**
   * Bulk API object
   * @member {Bulk} Connection#bulk
   */
  this.bulk = new Bulk(this);
  /**
   * Tooling API object
   * @member {Tooling} Connection#tooling
   */
  this.tooling = new Tooling(this);
  /**
   * Analytics API object
   * @member {Analytics} Connection#analytics
   */
  this.analytics = new Analytics(this);
  /**
   * Chatter API object
   * @member {Chatter} Connection#chatter
   */
  this.chatter = new Chatter(this);
  /**
   * Metadata API object
   * @member {Metadata} Connection#metadata 
   */
  this.metadata = new Metadata(this);
  /**
   * Apex REST API object
   * @member {Apex} Connection#apex
   */
  this.apex = new Apex(this);
  /**
   * Cache object for result
   * @member {Cache} Connection#cache
   */
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
  if (this.refreshToken && !this.oauth2) {
    throw new Error("Refersh token is specified without oauth2 client information");
  }
  this.userInfo = options.userInfo;

  this.sobjects = {};
  this.cache.clear();
  this.cache.get('describeGlobal').on('value', _.bind(function(res) {
    if (res.result) {
      var types = _.map(res.result.sobjects, function(so) { return so.name; });
      _.each(types, this.sobject, this);
    }
  }, this));

  this.tooling.initialize();

  this._initializedAt = Date.now();

};


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
    self._request(params, callback, options).then(function(response) {
      deferred.resolve(response);
    }, function(err) {
      deferred.reject(err);
    });
  };

  if (self._suspended) {
    self.once('resume', onResume);
    return deferred.promise;
  }

  params.headers = params.headers || {};
  if (this.accessToken) {
    params.headers.Authorization = "Bearer " + this.accessToken;
  }

  // hook in sending
  if (options.beforesend) { options.beforesend(this, params); }

  self.emit('request', params.method, params.url, params);

  logger.debug("<request> method=" + params.method + ", url=" + params.url);
  var requestTime = Date.now();

  var onResponse = function(err, response) {

    var responseTime = Date.now();
    logger.debug("elappsed time : " + (responseTime - requestTime) + "msec");

    if (err) {
      logger.error(err);
      throw err;
    }

    logger.debug("<response> status=" + response.statusCode + ", url=" + params.url);

    self.emit('response', response.statusCode, response.body, response);
    // Refresh token if status code requires authentication
    // when oauth2 info and refresh token is available.
    if (response.statusCode === 401 && self.oauth2 && self.refreshToken) {
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

    if (response.statusCode >= 400) {
      var error;
      try {
        var parseError = options.parseError || function(errs) { return errs[0]; };
        error = parseError(parseBody(response.body));
      } catch(e) {
        error = { message : response.body };
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

  return this._transport.httpRequest(params, onResponse, options).thenCall(callback);

};

/** @private */
function parseJSON(str) {
  return JSON.parse(str);
}

/** @private */
function parseXML(str) {
  var ret = {};
  _dereq_('xml2js').parseString(str, { explicitArray: false }, function(err, result) {
    ret = { error: err, result : result };
  });
  if (ret.error) { throw ret.error; }
  return ret.result;
}

/** @private */
function parseCSV(str) {
  return _dereq_('./csv').parseCSV(str);
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
  return this.oauth2.refreshToken(this.refreshToken, function(err, res) {
    if (!err) {
      self.initialize({
        instanceUrl : res.instance_url,
        accessToken : res.access_token
      });
      logger.debug("token refresh completed. result = " + JSON.stringify(res));
      self.emit("refresh", res.access_token, res);
    }
    self._suspended = false;
    self.emit('resume', err);
  });
};


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
 * @param {Callback.<Record|Array.<Record>>} [callback] - Callback function
 * @returns {Promise.<Record|Array.<Record>>}
 */
Connection.prototype.retrieve = function(type, ids, callback) {
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
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
Connection.prototype.insert =
Connection.prototype.create = function(type, records, callback) {
  if (arguments.length === 2) {
    type = null;
    records = type;
    callback = records;
  }
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
        headers : {
          "Content-Type" : "application/json"
        }
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
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
Connection.prototype.update = function(type, records, callback) {
  if (arguments.length === 2) {
    type = null;
    records = type;
    callback = records;
  }
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
        headers : {
          "Content-Type" : "application/json"
        }
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
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
Connection.prototype.upsert = function(type, records, extIdField, callback) {
  // You can omit "type" argument, when the record includes type information.
  if (arguments.length === 3) {
    type = null;
    records = type;
    extIdField = records;
    callback = extIdField;
  }
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
        headers : {
          "Content-Type" : "application/json"
        }
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
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
/**
 * Synonym of Connection#destroy()
 *
 * @method Connection#del
 * @param {String} type - SObject Type
 * @param {String|Array.<String>} ids - A ID or array of IDs to delete
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
/**
 * Delete records
 *
 * @method Connection#destroy
 * @param {String} type - SObject Type
 * @param {String|Array.<String>} ids - A ID or array of IDs to delete
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
Connection.prototype["delete"] =
Connection.prototype.del =
Connection.prototype.destroy = function(type, ids, callback) {
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
        url : url
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
 * List recently viewed records
 * 
 * @param {Number} [limit] - Callback function
 * @param {Callback.<Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<Array.<RecordResult>>}
 */
Connection.prototype.recent = function(limit, callback) {
  if (!_.isNumber(limit)) {
    callback = limit;
    limit = undefined;
  }
  var url = this._baseUrl() + "/recent";
  if (limit) { 
    url += "?limit=" + limit;
  }
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
    var idUrls = res.id.split("/");
    var userId = idUrls.pop(), orgId = idUrls.pop();
    var userInfo = {
      id: userId,
      organizationId: orgId,
      url: res.id
    };
    self.initialize({
      instanceUrl : res.instance_url,
      accessToken : res.access_token,
      refreshToken : res.refresh_token,
      userInfo : userInfo
    });
    logger.debug("<login> completed. user id = " + userId + ", org id = " + orgId);
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
  if (this.oauth2) {
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

    var idUrls = res.id.split("/");
    var userId = idUrls.pop(), orgId = idUrls.pop();
    var userInfo = {
      id: userId,
      organizationId: orgId,
      url: res.id
    };
    self.initialize({
      instanceUrl : res.instance_url,
      accessToken : res.access_token,
      userInfo : userInfo
    });
    logger.debug("<login> completed. user id = " + userId + ", org id = " + orgId);
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
 * Logout the session by using SOAP web service API
 *
 * @param {Callback.<undefined>} [callback] - Callback function
 * @returns {Promise.<undefined>}
 */
Connection.prototype.logout = function(callback) {
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

},{"./analytics":1,"./apex":2,"./bulk":5,"./cache":6,"./chatter":7,"./csv":9,"./logger":11,"./metadata":12,"./oauth2":13,"./promise":14,"./query":15,"./sobject":20,"./streaming":22,"./tooling":23,"./transport":24,"async":25,"events":29,"underscore":50,"util":48,"xml2js":53}],9:[function(_dereq_,module,exports){
var _      = _dereq_('underscore'),
    SfDate = _dereq_('./date');

/**
 * @private
 */
function toCSV(records, headers, options) {
  options = options || {};
  if (!headers) {
    headers = extractHeaders(records, options);
  }
  var rows = _.map(records, function(record){ return recordToCSV(record, headers); });
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
function recordToCSV(record, headers) {
  var row = [];
  _.forEach(headers, function(header) { 
    var value = record[header];
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
  
},{"./date":10,"underscore":50}],10:[function(_dereq_,module,exports){
var _ = _dereq_("underscore")._;

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

},{"underscore":50}],11:[function(_dereq_,module,exports){
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

},{}],12:[function(_dereq_,module,exports){
var Buffer=_dereq_("__browserify_Buffer");/*global Buffer */
/**
 * @file Manages Salesforce Metadata API
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

var util = _dereq_('util'),
    events = _dereq_('events'),
    stream = _dereq_('stream'),
    Stream = stream.Stream,
    _    = _dereq_('underscore'),
    Promise = _dereq_('./promise'),
    SOAP = _dereq_('./soap');


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
 * Adds one or more new metadata components to your organization's data.
 *
 * @param {String} type - The type of metadata to create
 * @param {Metadata~MetadataInfo|Array.<Metadata~MetadataInfo>} metadata - Metadata to create
 * @param {Callback.<Metadata~AsyncResult|Array.<Metadata~AsyncResult>>} [callback] - Callback function
 * @returns {Metadata~AsyncResultLocator}
 */
Metadata.prototype.create = function(type, metadata, callback) {
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
 * @typedef {Object} Metadata~UpdateMetadataInfo
 * @prop {String} currentName - The API name of the component or field before the update
 * @prop {Metadata~MetadataInfo} metadata - Full specification of the component or field you wish to update
 */

/**
 * Updates one or more components in your organization's data. 
 *
 * @param {String} type - The type of metadata to update
 * @param {Metadata~UpdateMetadataInfo|Array.<Metadata~UpdateMetadataInfo>} updateMetadata - Updating metadata
 * @param {Callback.<Metadata~AsyncResult|Array.<Metadata~AsyncResult>>} [callback] - Callback function
 * @returns {Metadata~AsyncResultLocator}
 */
Metadata.prototype.update = function(type, updateMetadata, callback) {
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
 * Synonym of Metadata#delete().
 *
 * @method Metadata#del
 * @param {String} [type] - The type of metadata to delete
 * @param {String|Metadata~MetadataInfo|Array.<String>|Array.<Metadata~MetadataInfo>} metadata - The fullName of metadata or metadata info to delete. If it is passed in fullName, the type parameter should not be empty.
 * @param {Callback.<Metadata~AsyncResult|Array.<Metadata~AsyncResult>>} [callback] - Callback function
 * @returns {Metadata~AsyncResultLocator}
 */
/**
 * Deletes one or more components from your organization's data.
 *
 * @method Metadata#delete
 * @param {String} type - The type of metadata to delete
 * @param {String|Metadata~MetadataInfo|Array.<String>|Array.<Metadata~MetadataInfo>} metadata - The fullName of metadata or metadata info to delete. If it is passed in fullName, the type parameter should not be empty.
 * @param {Callback.<Metadata~AsyncResult|Array.<Metadata~AsyncResult>>} [callback] - Callback function
 * @returns {Metadata~AsyncResultLocator}
 */
Metadata.prototype.del =
Metadata.prototype["delete"] = function(type, metadata, callback) {
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
  });
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
    return callback(null, res);
  }, function(err) {
    return callback(err);
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

},{"./promise":14,"./soap":19,"__browserify_Buffer":31,"events":29,"stream":40,"underscore":50,"util":48}],13:[function(_dereq_,module,exports){
/**
 * @file Manages Salesforce OAuth2 operations
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var querystring = _dereq_('querystring'),
    _ = _dereq_('underscore'),
    Transport = _dereq_('./transport');

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
  } else {
    this.loginUrl = options.loginUrl || defaults.loginUrl;
    this.authzServiceUrl = this.loginUrl + "/services/oauth2/authorize";
    this.tokenServiceUrl = this.loginUrl + "/services/oauth2/token";
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
      var res = JSON.parse(response.body);
      if (response.statusCode >= 400) {
        var err = new Error(res.error + ": " + res.error_description);
        err.name = res.error;
        throw err;
      }
      return res;
    }).thenCall(callback);
  }

});

},{"./transport":24,"querystring":38,"underscore":50}],14:[function(_dereq_,module,exports){
var Q = _dereq_('q'),
    _ = _dereq_('underscore')._;

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
 * @returns {Promise.<T>}
 */
Promise.prototype.thenCall = function(callback) {
  return _.isFunction(callback) ? this.then(function(res) {
    return callback(null, res);
  }, function(err) {
    return callback(err);
  }) : this;
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

},{"q":49,"underscore":50}],15:[function(_dereq_,module,exports){
/**
 * @file Manages query for records in Salesforce 
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var util   = _dereq_('util'),
    events = _dereq_('events'),
    _      = _dereq_('underscore')._,
    async  = _dereq_('async'),
    Q      = _dereq_('q'),
    SfDate = _dereq_("./date"),
    SOQLBuilder = _dereq_("./soql-builder"),
    RecordStream = _dereq_("./record-stream");

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

  options = options || {};
  if (typeof options === "function") {
    callback = options;
    options = {};
  }

  var responseTarget = options.responseTarget || self._responseTarget;
  var autoFetch = options.autoFetch || self._autoFetch;
  var maxFetch = options.maxFetch || self._maxFetch;
  var scanAll = options.scanAll || self._scanAll;

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

  async.waterfall([
    function(next) {
      if (self._locator) {
        var url = self._conn._baseUrl() + "/query/" + self._locator;
        next(null, url);
      } else {
        self.totalFetched = 0;
        async.waterfall([
          function(next) {
            if (self._soql) {
              next();
            } else {
              self._expandFields(next);
            }
          },
          function(next) {
            var soql = self._soql || SOQLBuilder.createSOQL(self._config);
            logger.debug("SOQL = " + soql);
            var url = self._conn._baseUrl() + "/" + (scanAll ? "queryAll" : "query") + "?q=" + encodeURIComponent(soql);
            next(null, url);
          }
        ], next);
      }
    },
    function(url, next) {
      // SOQL query request
      self._conn._request(url, next);
    }
  ], function(err, data) {
    if (err) {
      self.emit("error", err);
      return;
    }
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
    self.emit("response", res, self);

    // streaming record instances
    for (var i=0, l=data.records.length; i<l; i++) {
      if (self.totalFetched >= maxFetch) { break; }
      var record = data.records[i];
      if (self._paused) { 
        self._buffer.push(record);
      } else {
        self.emit('record', record, self.totalFetched++, self);
      }
    }
    self._finished = data.done;
    if (data.nextRecordsUrl) {
      self._locator = data.nextRecordsUrl.split('/').pop();
    }
    if (autoFetch && !self._finished) {
      if (!self._paused) { self.execute(options); }
    } else {
      if (!self._paused) { self.close(); }
    }
  });

  // return Query instance for chaining
  return this;
};

/**
 * @private
 */
Query.prototype._expandFields = function(callback) {
  if (this._soql) {
    callback({ message: 'Cannot expand fields for the query which has already built SOQL.' });
  }
  var self = this;
  var conn = this._conn;
  var table = this._config.table;
  var fields = this._config.fields || [];
  async.parallel([
    function(cb) {
      async.waterfall([
        function(next) {
          if (self._parent) {
            findRelationTable(table, next);
          } else {
            next(null, table);
          }
        },
        function(table, next) {
          async.map(fields, function(field, cb) {
            expandAsteriskField(table, field, cb);
          }, next);
        },
        function(expandedFields, next) {
          self._config.fields = _.flatten(expandedFields);
          next();
        }
      ], cb);
    },
    function(cb) {
      async.forEach(self._children || [], function(childQuery, cb) {
        childQuery._expandFields(cb);
      }, cb);
    }
  ], function(err) {
    callback(err);
  });

  function findRelationTable(rname, callback) {
    var ptable = self._parent._config.table;
    async.waterfall([
      function(next) {
        self._conn.describe$(ptable, next);
      },
      function(sobject, next) {
        var childRelation = _.find(sobject.childRelationships, function(cr) {
          return (cr.relationshipName || '').toUpperCase() === rname.toUpperCase();
        });
        if (childRelation) {
          next(null, childRelation.childSObject);
        } else {
          next({ message: 'No child relationship found: ' + rname });
        }
      }
    ], callback);
  }

  function expandAsteriskField(table, field, callback) {
    var fpath = field.split('.');
    if (fpath[fpath.length - 1] === '*') {
      async.waterfall([
        function(next) {
          conn.describe$(table, next);
        },
        function(sobject, next) {
          if (fpath.length > 1) {
            var rname = fpath.shift();
            var rfield = _.find(sobject.fields, function(f) {
              return f.relationshipName &&
                     f.relationshipName.toUpperCase() === rname.toUpperCase();
            });
            if (rfield) {
              var rtable = rfield.referenceTo.length === 1 ? rfield.referenceTo[0] : 'Name';
              async.waterfall([
                function(next) {
                  expandAsteriskField(rtable, fpath.join('.'), next);
                },
                function(fpaths, next) {
                  next(null, _.map(fpaths, function(fpath) { return rname + '.' + fpath; }));
                }
              ], next);
            } else {
              next(null, []);
            }
          } else {
            var fields = _.map(sobject.fields, function(f) { return f.name; });
            next(null, fields);
          }
        }
      ], callback);
    } else {
      callback(null, [ field ]);
    }
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
  if (!this._closed && this._paused) { this.execute(); }
  return this._deferred.promise.then.apply(this._deferred.promise, arguments);
};

/**
 * Promise/A+ extension
 * Call "then" using given node-style callback function
 *
 * @param {Callback.<T>} [callback] - Callback function
 * @returns {Promise.<T>}
 */
Query.prototype.thenCall = function(callback) {
  return _.isFunction(callback) ? this.then(function(res) {
    return callback(null, res);
  }, function(err) {
    return callback(err);
  }) : this;
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

},{"./date":10,"./record-stream":16,"./soql-builder":21,"async":25,"events":29,"q":49,"underscore":50,"util":48}],16:[function(_dereq_,module,exports){
/**
 * @file Represents stream that handles Salesforce record as stream data
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var events = _dereq_('events'),
    stream = _dereq_('stream'),
    Stream = stream.Stream,
    util   = _dereq_('util'),
    _      = _dereq_('underscore'),
    CSV    = _dereq_('./csv');

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


},{"./csv":9,"events":29,"stream":40,"underscore":50,"util":48}],17:[function(_dereq_,module,exports){
/**
 * @file Represents Salesforce record information
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var _ = _dereq_('underscore')._;

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
 * @param {Callback.<Record>} [callback] - Callback function
 * @returns {Promise.<Record>}
 */
RecordReference.prototype.retrieve = function(callback) {
  return this._conn.retrieve(this.type, this.id, callback);
};

/**
 * Update record field information
 *
 * @param {Record} record - A Record which includes fields to update
 * @param {Callback.<RecordResult>} [callback] - Callback function
 * @returns {Promise.<RecordResult>}
 */
RecordReference.prototype.update = function(record, callback) {
  record = _.clone(record);
  record.Id = this.id;
  return this._conn.update(this.type, record, callback);
};

/**
 * Synonym of Record#destroy()
 *
 * @method RecordReference#delete
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
 * @param {Callback.<RecordResult>} [callback] - Callback function
 * @returns {Promise.<RecordResult>}
 */
RecordReference.prototype.destroy = function(callback) {
  return this._conn.destroy(this.type, this.id, callback);
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


},{"underscore":50}],18:[function(_dereq_,module,exports){
/**
 * @file Node-salesforce API root object
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
exports.Connection = _dereq_('./connection');
exports.OAuth2 = _dereq_('./oauth2');
exports.Date = exports.SfDate = _dereq_("./date");
exports.RecordStream = _dereq_('./record-stream');

},{"./connection":8,"./date":10,"./oauth2":13,"./record-stream":16}],19:[function(_dereq_,module,exports){
/**
 * @file Manages method call to SOAP endpoint
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var _ = _dereq_('underscore'),
    xml2js = _dereq_('xml2js'),
    Transport = _dereq_('./transport');

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

},{"./transport":24,"underscore":50,"xml2js":53}],20:[function(_dereq_,module,exports){
/**
 * @file Represents Salesforce SObject
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var _      = _dereq_('underscore'),
    Record = _dereq_('./record'),
    Query  = _dereq_('./query'),
    Cache  = _dereq_('./cache');

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
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
SObject.prototype.insert =
SObject.prototype.create = function(records, callback) {
  return this._conn.create(this.type, records, callback);
};

/**
 * Retrieve specified records
 *
 * @param {String|Array.<String>} ids - A record ID or array of record IDs 
 * @param {Callback.<Record|Array.<Record>>} [callback] - Callback function
 * @returns {Promise.<Record|Array.<Record>>}
 */
SObject.prototype.retrieve = function(ids, callback) {
  return this._conn.retrieve(this.type, ids, callback);
};

/**
 * Update records
 *
 * @param {Record|Array.<Record>} records - A record or array of records to update
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
SObject.prototype.update = function(records, callback) {
  return this._conn.update(this.type, records, callback);
};

/**
 * Upsert records
 *
 * @param {Record|Array.<Record>} records - Record or array of records to upsert
 * @param {String} extIdField - External ID field name
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
SObject.prototype.upsert = function(records, extIdField, callback) {
  return this._conn.upsert(this.type, records, extIdField, callback);
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
 * @param {Callback.<RecordResult|Array.<RecordResult>>} [callback] - Callback function
 * @returns {Promise.<RecordResult|Array.<RecordResult>>}
 */
SObject.prototype["delete"] =
SObject.prototype.del =
SObject.prototype.destroy = function(ids, callback) {
  return this._conn.destroy(this.type, ids, callback);
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
},{"./cache":6,"./query":15,"./record":17,"underscore":50}],21:[function(_dereq_,module,exports){
/**
 * @file Create and build SOQL string from configuration
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */
var _      = _dereq_("underscore"),
    SfDate = _dereq_("./date");


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
  if (_.isObject(value)) {
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


},{"./date":10,"underscore":50}],22:[function(_dereq_,module,exports){
/**
 * @file Manages Streaming APIs
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

var events     = _dereq_('events'),
    util       = _dereq_('util'),
    Faye       = _dereq_('faye');

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

},{"events":29,"faye":27,"util":48}],23:[function(_dereq_,module,exports){
/**
 * @file Manages Tooling APIs
 * @author Shinichi Tomita <shinichi.tomita@gmail.com>
 */

var util = _dereq_('util'),
    _    = _dereq_('underscore')._,
    Cache = _dereq_('./cache');

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

},{"./cache":6,"underscore":50,"util":48}],24:[function(_dereq_,module,exports){
/*global process */
var util = _dereq_('util'),
    stream = _dereq_('stream'),
    Promise = _dereq_('./promise');

/**
 *
 */
var nodeRequest = _dereq_('request'),
    xhrRequest = _dereq_('./browser/request'),
    jsonp = _dereq_('./browser/jsonp');

var request = typeof window === 'undefined' ? nodeRequest : xhrRequest;

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
 * Class for HTTP request transport
 *
 * @class
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
 * @class
 * @param {String} proxyUrl - AJAX Proxy server URL
 */
var ProxyTransport = Transport.ProxyTransport = function(proxyUrl) {
  this._proxyUrl = proxyUrl;
};

util.inherits(ProxyTransport, Transport);

/**
 * Make HTTP request via AJAX proxy 
 *
 * @param {Object} params - HTTP request
 * @param {Callback.<Object>} [callback] - Calback Function
 * @returns {Promise.<Object>}
 */
ProxyTransport.prototype.httpRequest = function(params, callback) {
  var proxyParams = {
    method: params.method,
    url: this._proxyUrl + '?' + Date.now() + "." + ("" + Math.random()).substring(2),
    headers: {
      'salesforceproxy-endpoint': params.url,
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

},{"./browser/jsonp":3,"./browser/request":4,"./promise":14,"request":28,"stream":40,"util":48}],25:[function(_dereq_,module,exports){
// This file is just added for convenience so this repository can be
// directly checked out into a project's deps folder
module.exports = _dereq_('./lib/async');

},{"./lib/async":26}],26:[function(_dereq_,module,exports){
var process=_dereq_("__browserify_process");/*global setTimeout: false, console: false */
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
                