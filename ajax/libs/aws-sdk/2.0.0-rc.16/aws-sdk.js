// AWS SDK for JavaScript v2.0.0-rc.16
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// License at https://sdk.amazonaws.com/js/BUNDLE_LICENSE.txt
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.AWS = module.exports = require('./core');

require('./xml/browser_parser');

require('./http/xhr');

},{"./core":3,"./http/xhr":11,"./xml/browser_parser":32}],2:[function(require,module,exports){
var AWS = require('./core');
require('./credentials');
require('./credentials/credential_provider_chain');


AWS.Config = AWS.util.inherit({


  constructor: function Config(options) {
    if (options === undefined) options = {};
    options = this.extractCredentials(options);

    AWS.util.each.call(this, this.keys, function (key, value) {
      this.set(key, options[key], value);
    });
  },


  update: function update(options, allowUnknownKeys) {
    allowUnknownKeys = allowUnknownKeys || false;
    options = this.extractCredentials(options);
    AWS.util.each.call(this, options, function (key, value) {
      if (allowUnknownKeys || this.keys.hasOwnProperty(key)) this[key] = value;
    });
  },


  getCredentials: function getCredentials(callback) {
    var self = this;

    function finish(err) {
      callback(err, err ? null : self.credentials);
    }

    function credError(msg, err) {
      return new AWS.util.error(err || new Error(), {
        code: 'CredentialsError', message: msg
      });
    }

    function getAsyncCredentials() {
      self.credentials.get(function(err) {
        if (err) {
          var msg = 'Could not load credentials from ' +
            self.credentials.constructor.name;
          err = credError(msg, err);
        }
        finish(err);
      });
    }

    function getStaticCredentials() {
      var err = null;
      if (!self.credentials.accessKeyId || !self.credentials.secretAccessKey) {
        err = credError('Missing credentials');
      }
      finish(err);
    }

    if (self.credentials) {
      if (typeof self.credentials.get === 'function') {
        getAsyncCredentials();
      } else { // static credentials
        getStaticCredentials();
      }
    } else if (self.credentialProvider) {
      self.credentialProvider.resolve(function(err, creds) {
        if (err) {
          err = credError('Could not load credentials from any providers', err);
        }
        self.credentials = creds;
        finish(err);
      });
    } else {
      finish(credError('No credentials to load'));
    }
  },


  loadFromPath: function loadFromPath(path) {
    this.clear();

    var options = JSON.parse(AWS.util.readFileSync(path));
    var fileSystemCreds = new AWS.FileSystemCredentials(path);
    var chain = new AWS.CredentialProviderChain();
    chain.providers.unshift(fileSystemCreds);
    chain.resolve(function (err, creds) {
      if (err) throw err;
      else options.credentials = creds;
    });

    this.constructor(options);

    return this;
  },


  clear: function clear() {

    AWS.util.each.call(this, this.keys, function (key) {
      delete this[key];
    });

    this.set('credentials', undefined);
    this.set('credentialProvider', undefined);
  },


  set: function set(property, value, defaultValue) {
    if (value === undefined) {
      if (defaultValue === undefined) {
        defaultValue = this.keys[property];
      }
      if (typeof defaultValue === 'function') {
        this[property] = defaultValue.call(this);
      } else {
        this[property] = defaultValue;
      }
    } else {
      this[property] = value;
    }
  },


  keys: {
    credentials: null,
    credentialProvider: null,
    region: null,
    logger: null,
    apiVersions: {},
    apiVersion: null,
    endpoint: undefined,
    httpOptions: {},
    maxRetries: undefined,
    maxRedirects: 10,
    paramValidation: true,
    sslEnabled: true,
    s3ForcePathStyle: false,
    computeChecksums: true,
    dynamoDbCrc32: true
  },


  extractCredentials: function extractCredentials(options) {
    if (options.accessKeyId && options.secretAccessKey) {
      options = AWS.util.copy(options);
      options.credentials = new AWS.Credentials(options);
    }
    return options;
  }
});


AWS.config = new AWS.Config();

},{"./core":3,"./credentials":4,"./credentials/credential_provider_chain":5}],3:[function(require,module,exports){

var AWS = {};


var _hidden = {}; _hidden = {}; // hack to parse macro

module.exports = AWS;
require('./util');

AWS.util.update(AWS, {


  VERSION: '2.0.0-rc.16',


  ServiceInterface: {},


  Signers: {},


  XML: {}

});

require('./service');

require('./credentials');
require('./credentials/credential_provider_chain');
require('./credentials/temporary_credentials');
require('./credentials/web_identity_credentials');
require('./credentials/saml_credentials');

require('./config');
require('./http');
require('./sequential_executor');
require('./event_listeners');
require('./request');
require('./response');
require('./resource_waiter');
require('./signers/request_signer');
require('./param_validator');


AWS.events = new AWS.SequentialExecutor();

if (typeof window !== 'undefined') window.AWS = AWS;

},{"./config":2,"./credentials":4,"./credentials/credential_provider_chain":5,"./credentials/saml_credentials":6,"./credentials/temporary_credentials":7,"./credentials/web_identity_credentials":8,"./event_listeners":9,"./http":10,"./param_validator":13,"./request":14,"./resource_waiter":15,"./response":16,"./sequential_executor":17,"./service":18,"./signers/request_signer":24,"./util":31}],4:[function(require,module,exports){
var AWS = require('./core');


AWS.Credentials = AWS.util.inherit({

  constructor: function Credentials() {
    AWS.util.hideProperties(this, ['secretAccessKey']);

    this.expired = false;
    this.expireTime = null;
    if (arguments.length === 1 && typeof arguments[0] === 'object') {
      var creds = arguments[0].credentials || arguments[0];
      this.accessKeyId = creds.accessKeyId;
      this.secretAccessKey = creds.secretAccessKey;
      this.sessionToken = creds.sessionToken;
    } else {
      this.accessKeyId = arguments[0];
      this.secretAccessKey = arguments[1];
      this.sessionToken = arguments[2];
    }
  },


  expiryWindow: 15,


  needsRefresh: function needsRefresh() {
    var currentTime = AWS.util.date.getDate().getTime();
    var adjustedTime = new Date(currentTime + this.expiryWindow * 1000);

    if (this.expireTime && adjustedTime > this.expireTime) {
      return true;
    } else {
      return this.expired || !this.accessKeyId || !this.secretAccessKey;
    }
  },


  get: function get(callback) {
    var self = this;
    if (this.needsRefresh()) {
      this.refresh(function(err) {
        if (!err) self.expired = false; // reset expired flag
        if (callback) callback(err);
      });
    } else if (callback) {
      callback();
    }
  },


  refresh: function refresh(callback) {
    this.expired = false;
    callback();
  }
});

},{"./core":3}],5:[function(require,module,exports){
var AWS = require('../core');


AWS.CredentialProviderChain = AWS.util.inherit(AWS.Credentials, {


  constructor: function CredentialProviderChain(providers) {
    if (providers) {
      this.providers = providers;
    } else {
      this.providers = AWS.CredentialProviderChain.defaultProviders.slice(0);
    }
  },


  resolve: function resolve(callback) {
    if (this.providers.length === 0) {
      callback(new Error('No providers'));
      return this;
    }

    var index = 0;
    var providers = this.providers.slice(0);

    function resolveNext(err, creds) {
      if ((!err && creds) || index === providers.length) {
        callback(err, creds);
        return;
      }

      var provider = providers[index++];
      if (typeof provider === 'function') {
        creds = provider.call();
      } else {
        creds = provider;
      }

      if (creds.get) {
        creds.get(function(err) {
          resolveNext(err, err ? null : creds);
        });
      } else {
        resolveNext(null, creds);
      }
    }

    resolveNext();
    return this;
  }

});


AWS.CredentialProviderChain.defaultProviders = [];

},{"../core":3}],6:[function(require,module,exports){
var AWS = require('../core');


AWS.SAMLCredentials = AWS.util.inherit(AWS.Credentials, {

  constructor: function SAMLCredentials(params) {
    AWS.Credentials.call(this);
    this.expired = true;
    this.service = new AWS.STS();
    this.params = params;
  },


  refresh: function refresh(callback) {
    var self = this;
    if (!callback) callback = function(err) { if (err) throw err; };

    self.service.assumeRoleWithSAML(self.params, function (err, data) {
      if (!err) {
        self.service.credentialsFrom(data, self);
      }
      callback(err);
    });
  }
});

},{"../core":3}],7:[function(require,module,exports){
var AWS = require('../core');


AWS.TemporaryCredentials = AWS.util.inherit(AWS.Credentials, {

  constructor: function TemporaryCredentials(params) {
    AWS.Credentials.call(this);
    this.loadMasterCredentials();
    this.service = new AWS.STS();
    this.expired = true;

    this.params = params || {};
    if (this.params.RoleArn) {
      this.params.RoleSessionName =
        this.params.RoleSessionName || 'temporary-credentials';
    }
  },


  refresh: function refresh(callback) {
    var self = this;
    if (!callback) callback = function(err) { if (err) throw err; };

    self.service.config.credentials = self.masterCredentials;
    var operation = self.params.RoleArn ?
      self.service.assumeRole : self.service.getSessionToken;
    operation.call(self.service, self.params, function (err, data) {
      if (!err) {
        self.service.credentialsFrom(data, self);
      }
      callback(err);
    });
  },


  loadMasterCredentials: function loadMasterCredentials() {
    this.masterCredentials = AWS.config.credentials;
    while (this.masterCredentials.masterCredentials) {
      this.masterCredentials = this.masterCredentials.masterCredentials;
    }
  }
});

},{"../core":3}],8:[function(require,module,exports){
var AWS = require('../core');


AWS.WebIdentityCredentials = AWS.util.inherit(AWS.Credentials, {

  constructor: function WebIdentityCredentials(params) {
    AWS.Credentials.call(this);
    this.expired = true;
    this.service = new AWS.STS();
    this.params = params;
    this.data = null;
    this.params.RoleSessionName = this.params.RoleSessionName || 'web-identity';
  },


  refresh: function refresh(callback) {
    var self = this;
    if (!callback) callback = function(err) { if (err) throw err; };

    self.service.assumeRoleWithWebIdentity(self.params, function (err, data) {
      self.data = null;
      if (!err) {
        self.data = data;
        self.service.credentialsFrom(data, self);
      }
      callback(err);
    });
  }
});

},{"../core":3}],9:[function(require,module,exports){
var AWS = require('./core');
require('./sequential_executor');
require('./service_interface/json');
require('./service_interface/query');
require('./service_interface/rest');
require('./service_interface/rest_json');
require('./service_interface/rest_xml');


AWS.EventListeners = {

  Core: {} /* doc hack */
};

AWS.EventListeners = {
  Core: new AWS.SequentialExecutor().addNamedListeners(function(add, addAsync) {
    addAsync('VALIDATE_CREDENTIALS', 'validate',
        function VALIDATE_CREDENTIALS(req, done) {
      req.service.config.getCredentials(function(err) {
        if (err) {
          req.response.err = AWS.util.error(err,
            {code: 'SigningError', message: 'Missing credentials in config'});
        }
        done();
      });
    });

    add('VALIDATE_REGION', 'validate', function VALIDATE_REGION(req) {
      if (!req.service.config.region && !req.service.hasGlobalEndpoint()) {
        req.response.error = AWS.util.error(new Error(),
          {code: 'SigningError', message: 'Missing region in config'});
      }
    });

    add('VALIDATE_PARAMETERS', 'validate', function VALIDATE_PARAMETERS(req) {
      var rules = req.service.api.operations[req.operation].input;
      new AWS.ParamValidator().validate(rules, req.params);
    });

    add('SET_CONTENT_LENGTH', 'afterBuild', function SET_CONTENT_LENGTH(req) {
      if (req.httpRequest.headers['Content-Length'] === undefined) {
        var length = AWS.util.string.byteLength(req.httpRequest.body);
        req.httpRequest.headers['Content-Length'] = length;
      }
    });

    add('SET_HTTP_HOST', 'afterBuild', function SET_HTTP_HOST(req) {
      req.httpRequest.headers['Host'] = req.httpRequest.endpoint.host;
    });

    addAsync('SIGN', 'sign', function SIGN(req, done) {
      if (!req.service.api.signatureVersion) return done(); // none

      req.service.config.getCredentials(function (err, credentials) {
        if (err) {
          req.response.error = err;
          return done();
        }

        try {
          var date = AWS.util.date.getDate();
          var SignerClass = req.service.getSignerClass(req);
          var signer = new SignerClass(req.httpRequest,
            req.service.api.signingName || req.service.api.endpointPrefix);

          delete req.httpRequest.headers['Authorization'];
          delete req.httpRequest.headers['Date'];
          delete req.httpRequest.headers['X-Amz-Date'];

          signer.addAuthorization(credentials, date);
          req.signedAt = date;
        } catch (e) {
          req.response.error = e;
        }
        done();
      });
    });

    add('VALIDATE_RESPONSE', 'validateResponse', function VALIDATE_RESPONSE(resp) {
      if (this.service.successfulResponse(resp, this)) {
        resp.data = {};
        resp.error = null;
      } else {
        resp.data = null;
        resp.error = AWS.util.error(new Error(),
          {code: 'UnknownError', message: 'An unknown error occurred.'});
      }
    });

    addAsync('SEND', 'send', function SEND(resp, done) {
      resp.httpResponse._abortCallback = done;
      resp.error = null;
      resp.data = null;

      function callback(httpResp) {
        resp.httpResponse.stream = httpResp;

        httpResp.on('headers', function onHeaders(statusCode, headers) {
          resp.request.emit('httpHeaders', [statusCode, headers, resp]);

          if (!resp.request.httpRequest._streaming) {
            if (AWS.HttpClient.streamsApiVersion === 2) { // streams2 API check
              httpResp.on('readable', function onReadable() {
                var data = httpResp.read();
                if (data !== null) {
                  resp.request.emit('httpData', [data, resp]);
                }
              });
            } else { // legacy streams API
              httpResp.on('data', function onData(data) {
                resp.request.emit('httpData', [data, resp]);
              });
            }
          }
        });

        httpResp.on('end', function onEnd() {
          resp.request.emit('httpDone');
          done();
        });
      }

      function progress(httpResp) {
        httpResp.on('sendProgress', function onSendProgress(progress) {
          resp.request.emit('httpUploadProgress', [progress, resp]);
        });

        httpResp.on('receiveProgress', function onReceiveProgress(progress) {
          resp.request.emit('httpDownloadProgress', [progress, resp]);
        });
      }

      function error(err) {
        resp.error = AWS.util.error(err, {
          code: 'NetworkingError',
          region: resp.request.httpRequest.region,
          hostname: resp.request.httpRequest.endpoint.hostname,
          retryable: true
        });
        resp.request.emit('httpError', [resp.error, resp], function() {
          done();
        });
      }

      function executeSend() {
        var http = AWS.HttpClient.getInstance();
        var httpOptions = resp.request.service.config.httpOptions || {};
        var stream = http.handleRequest(resp.request.httpRequest, httpOptions,
                                        callback, error);
        progress(stream);
      }

      var timeDiff = (AWS.util.date.getDate() - this.signedAt) / 1000;
      if (timeDiff >= 60 * 10) { // if we signed 10min ago, re-sign
        this.emit('sign', [this], function(err) {
          if (err) done(err);
          else executeSend();
        });
      } else {
        executeSend();
      }
    });

    add('HTTP_HEADERS', 'httpHeaders',
        function HTTP_HEADERS(statusCode, headers, resp) {
      resp.httpResponse.statusCode = statusCode;
      resp.httpResponse.headers = headers;
      resp.httpResponse.body = new AWS.util.Buffer('');
      resp.httpResponse.buffers = [];
      resp.httpResponse.numBytes = 0;
    });

    add('HTTP_DATA', 'httpData', function HTTP_DATA(chunk, resp) {
      if (chunk) {
        if (AWS.util.isNode()) {
          resp.httpResponse.numBytes += chunk.length;

          var total = resp.httpResponse.headers['content-length'];
          var progress = { loaded: resp.httpResponse.numBytes, total: total };
          resp.request.emit('httpDownloadProgress', [progress, resp]);
        }

        resp.httpResponse.buffers.push(new AWS.util.Buffer(chunk));
      }
    });

    add('HTTP_DONE', 'httpDone', function HTTP_DONE(resp) {
      if (resp.httpResponse.buffers && resp.httpResponse.buffers.length > 0) {
        var body = AWS.util.buffer.concat(resp.httpResponse.buffers);
        resp.httpResponse.body = body;
      }
      delete resp.httpResponse.numBytes;
      delete resp.httpResponse.buffers;
    });

    add('FINALIZE_ERROR', 'retry', function FINALIZE_ERROR(resp) {
      if (resp.httpResponse.statusCode) {
        resp.error.statusCode = resp.httpResponse.statusCode;
        if (resp.error.retryable === undefined) {
          resp.error.retryable = this.service.retryableError(resp.error, this);
        }
      }
    });

    add('INVALIDATE_CREDENTIALS', 'retry', function INVALIDATE_CREDENTIALS(resp) {
      switch (resp.error.code) {
        case 'RequestExpired': // EC2 only
        case 'ExpiredTokenException':
        case 'ExpiredToken':
          resp.error.retryable = true;
          resp.request.service.config.credentials.expired = true;
      }
    });

    add('REDIRECT', 'retry', function REDIRECT(resp) {
      if (resp.error && resp.error.statusCode >= 300 &&
          resp.error.statusCode < 400 && resp.httpResponse.headers['location']) {
        this.httpRequest.endpoint =
          new AWS.Endpoint(resp.httpResponse.headers['location']);
        resp.error.redirect = true;
        resp.error.retryable = true;
      }
    });

    add('RETRY_CHECK', 'retry', function RETRY_CHECK(resp) {
      if (resp.error) {
        if (resp.error.redirect && resp.redirectCount < resp.maxRedirects) {
          resp.error.retryDelay = 0;
          resp.redirectCount++;
          resp.error._willRetry = true;
        } else if (resp.error.retryable && resp.retryCount < resp.maxRetries) {
          var delays = this.service.retryDelays();
          resp.error.retryDelay = delays[resp.retryCount] || 0;
          resp.retryCount++;
          resp.error._willRetry = true;
        } else {
          resp.error._willRetry = false;
        }
      }
    });

    addAsync('RESET_RETRY_STATE', 'afterRetry', function RESET_RETRY_STATE(resp, done) {
      if (resp.error && resp.error._willRetry) {
        var delay = resp.error.retryDelay || 0;
        resp.error = null;
        setTimeout(done, delay);
      } else {
        done();
      }
    });

  }),

  CorePost: new AWS.SequentialExecutor().addNamedListeners(function(add) {
    add('EXTRACT_REQUEST_ID', 'extractData', function EXTRACT_REQUEST_ID(resp) {
      resp.requestId = resp.httpResponse.headers['x-amz-request-id'] ||
                       resp.httpResponse.headers['x-amzn-requestid'];
    });
  }),

  Logger: new AWS.SequentialExecutor().addNamedListeners(function(add) {
    add('LOG_REQUEST', 'complete', function LOG_REQUEST(resp) {
      var req = resp.request;
      var logger = req.service.config.logger;
      if (!logger) return;

      function buildMessage() {
        var time = AWS.util.date.getDate().getTime();
        var delta = (time - req.startTime.getTime()) / 1000;
        var ansi = logger.isTTY ? true : false;
        var status = resp.httpResponse.statusCode;
        var params = require('util').inspect(req.params, true, true);

        var message = '';
        if (ansi) message += '\x1B[33m';
        message += '[AWS ' + req.service.serviceIdentifier + ' ' + status;
        message += ' ' + delta.toString() + 's ' + resp.retryCount + ' retries]';
        if (ansi) message += '\x1B[0;1m';
        message += ' ' + req.operation + '(' + params + ')';
        if (ansi) message += '\x1B[0m';
        return message;
      }

      var line = buildMessage();
      if (typeof logger.log === 'function') {
        logger.log(line);
      } else if (typeof logger.write === 'function') {
        logger.write(line + '\n');
      }
    });
  }),

  Json: new AWS.SequentialExecutor().addNamedListeners(function(add) {
    var svc = AWS.ServiceInterface.Json;
    add('BUILD', 'build', svc.buildRequest);
    add('EXTRACT_DATA', 'extractData', svc.extractData);
    add('EXTRACT_ERROR', 'extractError', svc.extractError);
  }),

  Rest: new AWS.SequentialExecutor().addNamedListeners(function(add) {
    var svc = AWS.ServiceInterface.Rest;
    add('BUILD', 'build', svc.buildRequest);
    add('EXTRACT_DATA', 'extractData', svc.extractData);
    add('EXTRACT_ERROR', 'extractError', svc.extractError);
  }),

  RestJson: new AWS.SequentialExecutor().addNamedListeners(function(add) {
    var svc = AWS.ServiceInterface.RestJson;
    add('BUILD', 'build', svc.buildRequest);
    add('EXTRACT_DATA', 'extractData', svc.extractData);
    add('EXTRACT_ERROR', 'extractError', svc.extractError);
  }),

  RestXml: new AWS.SequentialExecutor().addNamedListeners(function(add) {
    var svc = AWS.ServiceInterface.RestXml;
    add('BUILD', 'build', svc.buildRequest);
    add('EXTRACT_DATA', 'extractData', svc.extractData);
    add('EXTRACT_ERROR', 'extractError', svc.extractError);
  }),

  Query: new AWS.SequentialExecutor().addNamedListeners(function(add) {
    var svc = AWS.ServiceInterface.Query;
    add('BUILD', 'build', svc.buildRequest);
    add('EXTRACT_DATA', 'extractData', svc.extractData);
    add('EXTRACT_ERROR', 'extractError', svc.extractError);
  })
};

},{"./core":3,"./sequential_executor":17,"./service_interface/json":19,"./service_interface/query":20,"./service_interface/rest":21,"./service_interface/rest_json":22,"./service_interface/rest_xml":23,"util":56}],10:[function(require,module,exports){
var AWS = require('./core');
var inherit = AWS.util.inherit;


AWS.Endpoint = inherit({


  constructor: function Endpoint(endpoint, config) {
    AWS.util.hideProperties(this, ['slashes', 'auth', 'hash', 'search', 'query']);

    if (typeof endpoint === 'undefined' || endpoint === null) {
      throw new Error('Invalid endpoint: ' + endpoint);
    } else if (typeof endpoint !== 'string') {
      return AWS.util.copy(endpoint);
    }

    if (!endpoint.match(/^http/)) {
      var useSSL = config && config.sslEnabled !== undefined ?
        config.sslEnabled : AWS.config.sslEnabled;
      endpoint = (useSSL ? 'https' : 'http') + '://' + endpoint;
    }

    AWS.util.update(this, AWS.util.urlParse(endpoint));

    if (this.port) {
      this.port = parseInt(this.port, 10);
    } else {
      this.port = this.protocol === 'https:' ? 443 : 80;
    }
  }

});


AWS.HttpRequest = inherit({


  constructor: function HttpRequest(endpoint, region) {
    endpoint = new AWS.Endpoint(endpoint);
    this.method = 'POST';
    this.path = endpoint.path || '/';
    this.headers = {};
    this.body = '';
    this.endpoint = endpoint;
    this.region = region;
    this.setUserAgent();
  },


  setUserAgent: function setUserAgent() {
    var prefix = AWS.util.isBrowser() ? 'X-Amz-' : '';
    this.headers[prefix + 'User-Agent'] = AWS.util.userAgent();
  },


  pathname: function pathname() {
    return this.path.split('?', 1)[0];
  },


  search: function search() {
    return this.path.split('?', 2)[1] || '';
  }

});


AWS.HttpResponse = inherit({


  constructor: function HttpResponse() {
    this.statusCode = undefined;
    this.headers = {};
    this.body = undefined;
  }
});


AWS.HttpClient = inherit({});


AWS.HttpClient.getInstance = function getInstance() {
  if (this.singleton === undefined) {
    this.singleton = new this();
  }
  return this.singleton;
};

},{"./core":3}],11:[function(require,module,exports){
var AWS = require('../core');
var EventEmitter = require('events').EventEmitter;
require('../http');


AWS.XHRClient = AWS.util.inherit({
  handleRequest: function handleRequest(httpRequest, httpOptions, callback, errCallback) {
    var self = this;
    var endpoint = httpRequest.endpoint;
    var emitter = new EventEmitter();
    var href = endpoint.protocol + '//' + endpoint.hostname;
    if (endpoint.port !== 80 && endpoint.port !== 443) {
      href += ':' + endpoint.port;
    }
    href += httpRequest.path;

    var xhr = new XMLHttpRequest();
    httpRequest.stream = xhr;

    if (httpOptions.timeout) {
      xhr.timeout = httpOptions.timeout;
    }

    xhr.addEventListener('readystatechange', function() {
      try {
        if (xhr.status === 0) return; // 0 code is invalid
      } catch (e) { return; }

      if (this.readyState === this.HEADERS_RECEIVED) {
        try { xhr.responseType = 'arraybuffer'; } catch (e) {}
        emitter.statusCode = xhr.status;
        emitter.headers = self.parseHeaders(xhr.getAllResponseHeaders());
        emitter.emit('headers', emitter.statusCode, emitter.headers);
      } else if (this.readyState === this.DONE) {
        self.finishRequest(xhr, emitter);
      }
    }, false);
    xhr.upload.addEventListener('progress', function (evt) {
      emitter.emit('sendProgress', evt);
    });
    xhr.addEventListener('progress', function (evt) {
      emitter.emit('receiveProgress', evt);
    }, false);
    xhr.addEventListener('timeout', function () {
      errCallback(AWS.util.error(new Error('Timeout'), {code: 'TimeoutError'}));
    }, false);
    xhr.addEventListener('error', function () {
      errCallback(AWS.util.error(new Error('Network Failure'), {
        code: 'NetworkingError'
      }));
    }, false);

    callback(emitter);
    xhr.open(httpRequest.method, href, true);
    AWS.util.each(httpRequest.headers, function (key, value) {
      if (key !== 'Content-Length' && key !== 'User-Agent' && key !== 'Host') {
        xhr.setRequestHeader(key, value);
      }
    });

    if (httpRequest.body && typeof httpRequest.body.buffer === 'object') {
      xhr.send(httpRequest.body.buffer); // typed arrays sent as ArrayBuffer
    } else {
      xhr.send(httpRequest.body);
    }

    return emitter;
  },

  parseHeaders: function parseHeaders(rawHeaders) {
    var headers = {};
    AWS.util.arrayEach(rawHeaders.split(/\r?\n/), function (line) {
      var key = line.split(':', 1)[0];
      var value = line.substring(key.length + 2);
      if (key.length > 0) headers[key] = value;
    });
    return headers;
  },

  finishRequest: function finishRequest(xhr, emitter) {
    var buffer;
    if (xhr.responseType === 'arraybuffer' && xhr.response) {
      var ab = xhr.response;
      buffer = new AWS.util.Buffer(ab.byteLength);
      var view = new Uint8Array(ab);
      for (var i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
      }
    }

    try {
      if (!buffer && typeof xhr.responseText === 'string') {
        buffer = new AWS.util.Buffer(xhr.responseText);
      }
    } catch (e) {}

    if (buffer) emitter.emit('data', buffer);
    emitter.emit('end');
  }
});


AWS.HttpClient.prototype = AWS.XHRClient.prototype;


AWS.HttpClient.streamsApiVersion = 1;

},{"../core":3,"../http":10,"events":48}],12:[function(require,module,exports){
var AWS = require('../core');
var inherit = AWS.util.inherit;


AWS.JSON = {};


AWS.JSON.Builder = inherit({

  constructor: function JSONBuilder(rules, options) {
    this.rules = rules;
    this.timestampFormat = options.timestampFormat;
  },

  build: function build(params) {
    return JSON.stringify(this.translate(this.rules, params));
  },

  translate: function translate(rules, value) {
    if (value === null || value === undefined) return undefined;

    if (rules.type === 'structure') {

      var struct = {};
      AWS.util.each.call(this, value, function (memberName, memberValue) {
        var memberRules = rules.members[memberName] || {};
        var result = this.translate(memberRules, memberValue);
        if (result !== undefined) struct[memberName] = result;
      });
      return struct;

    } else if (rules.type === 'list') {

      var list = [];
      AWS.util.arrayEach.call(this, value, function (memberValue) {
        var memberRules = rules.members || {};
        var result = this.translate(memberRules, memberValue);
        if (result !== undefined) list.push(result);
      });
      return list;

    } else if (rules.type === 'map') {

      var map = {};
      AWS.util.each.call(this, value, function (memberName, memberValue) {
        var memberRules = rules.members || {};
        var result = this.translate(memberRules, memberValue);
        if (result !== undefined) map[memberName] = result;
      });
      return map;

    } else if (rules.type === 'timestamp') {

      var timestampFormat = rules.format || this.timestampFormat;
      return AWS.util.date.format(value, timestampFormat);

    } else if (rules.type === 'integer') {
      return parseInt(value, 10);
    } else if (rules.type === 'float') {
      return parseFloat(value);
    } else {

      return value;

    }
  }

});

},{"../core":3}],13:[function(require,module,exports){
var AWS = require('./core');


AWS.ParamValidator = AWS.util.inherit({
  validate: function validate(rules, params, context) {
    var cRules = (rules || {}).members || {};
    var payload = rules ? rules.xml : null;
    if (payload) {
      cRules = AWS.util.merge(cRules, (cRules[payload] || {}).members || {});
      delete cRules[payload];
    }

    return this.validateStructure(cRules, params || {}, context || 'params');
  },

  validateStructure: function validateStructure(rules, params, context) {
    this.validateType(context, params, ['object'], 'structure');

    for (var paramName in rules) {
      if (!rules.hasOwnProperty(paramName)) continue;
      var value = params[paramName];
      var notSet = value === undefined || value === null;
      if (rules[paramName].required && notSet) {
        this.fail('MissingRequiredParameter',
          'Missing required key \'' + paramName + '\' in ' + context);
      }
    }

    for (paramName in params) {
      if (!params.hasOwnProperty(paramName)) continue;

      var paramValue = params[paramName],
          paramRules = rules[paramName];

      if (paramRules !== undefined) {
        var memberContext = [context, paramName].join('.');
        this.validateMember(paramRules, paramValue, memberContext);
      } else {
        this.fail('UnexpectedParameter',
          'Unexpected key \'' + paramName + '\' found in ' + context);
      }
    }

    return true;
  },

  validateMember: function validateMember(rules, param, context) {
    var memberRules = rules.members || {};
    switch(rules.type) {
      case 'structure':
        return this.validateStructure(memberRules, param, context);
      case 'list':
        return this.validateList(memberRules, param, context);
      case 'map':
        return this.validateMap(memberRules, param, context);
      default:
        return this.validateScalar(rules, param, context);
    }
  },

  validateList: function validateList(rules, params, context) {
    this.validateType(context, params, [Array]);

    for (var i = 0; i < params.length; i++) {
      this.validateMember(rules, params[i], context + '[' + i + ']');
    }
  },

  validateMap: function validateMap(rules, params, context) {
    this.validateType(context, params, ['object'], 'map');

    for (var param in params) {
      if (!params.hasOwnProperty(param)) continue;
      this.validateMember(rules, params[param],
                          context + '[\'' +  param + '\']');
    }
  },

  validateScalar: function validateScalar(rules, value, context) {
    switch (rules.type) {
      case null:
      case undefined:
      case 'string':
        return this.validateType(context, value, ['string']);
      case 'base64':
      case 'binary':
        return this.validatePayload(context, value);
      case 'integer':
      case 'float':
        return this.validateNumber(context, value);
      case 'boolean':
        return this.validateType(context, value, ['boolean']);
      case 'timestamp':
        return this.validateType(context, value, [Date,
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/, 'number'],
          'Date object, ISO-8601 string, or a UNIX timestamp');
      default:
        return this.fail('UnkownType', 'Unhandled type ' +
                         rules.type + ' for ' + context);
    }
  },

  fail: function fail(code, message) {
    throw AWS.util.error(new Error(message), {code: code});
  },

  validateType: function validateType(context, value, acceptedTypes, type) {
    if (value === null || value === undefined) return;

    var foundInvalidType = false;
    for (var i = 0; i < acceptedTypes.length; i++) {
      if (typeof acceptedTypes[i] === 'string') {
        if (typeof value === acceptedTypes[i]) return;
      } else if (acceptedTypes[i] instanceof RegExp) {
        if ((value || '').toString().match(acceptedTypes[i])) return;
      } else {
        if (value instanceof acceptedTypes[i]) return;
        if (AWS.util.isType(value, acceptedTypes[i])) return;
        if (!type && !foundInvalidType) acceptedTypes = acceptedTypes.slice();
        acceptedTypes[i] = AWS.util.typeName(acceptedTypes[i]);
      }
      foundInvalidType = true;
    }

    var acceptedType = type;
    if (!acceptedType) {
      acceptedType = acceptedTypes.join(', ').replace(/,([^,]+)$/, ', or$1');
    }

    var vowel = acceptedType.match(/^[aeiou]/i) ? 'n' : '';
    this.fail('InvalidParameterType', 'Expected ' + context + ' to be a' +
              vowel + ' ' + acceptedType);
  },

  validateNumber: function validateNumber(context, value) {
    if (value === null || value === undefined) return;
    if (typeof value === 'string') {
      var castedValue = parseFloat(value);
      if (castedValue.toString() === value) value = castedValue;
    }
    this.validateType(context, value, ['number']);
  },

  validatePayload: function validatePayload(context, value) {
    if (value === null || value === undefined) return;
    if (typeof value === 'string') return;
    if (value && typeof value.byteLength === 'number') return; // typed arrays
    if (AWS.util.isNode()) { // special check for buffer/stream in Node.js
      var Stream = AWS.util.nodeRequire('stream').Stream;
      if (AWS.util.Buffer.isBuffer(value) || value instanceof Stream) return;
    }

    var types = ['Buffer', 'Stream', 'File', 'Blob', 'ArrayBuffer', 'DataView'];
    if (value) {
      for (var i = 0; i < types.length; i++) {
        if (AWS.util.isType(value, types[i])) return;
        if (AWS.util.typeName(value.constructor) === types[i]) return;
      }
    }

    this.fail('InvalidParameterType', 'Expected ' + context + ' to be a ' +
      'string, Buffer, Stream, Blob, or typed array object');
  }
});

},{"./core":3}],14:[function(require,module,exports){
(function (process){
var AWS = require('./core');
var AcceptorStateMachine = require('./state_machine');
var inherit = AWS.util.inherit;

var fsm = new AcceptorStateMachine();
fsm.setupStates = function() {
  var hardErrorStates = {success:1, error:1, complete:1};
  var transition = function transition(err, done) {
    try {
      var self = this, origError = err; // assign err for eslint
      origError = self.response.error;  // re-assign because err is not used.
      self.emit(self._asm.currentState, function() {
        function isTerminalState() {
          return hardErrorStates[self._asm.currentState] === 1;
        }

        var nextError = self.response.error;
        if (self.response.error && origError !== self.response.error) {
          if (isTerminalState()) self._hardError = true;
        }

        if (self.response.error && !self._hardError && isTerminalState()) {
          nextError = null;
        }

        done(nextError);
      });

    } catch (e) {
      this.response.error = e;
      if (this._hardError) {
        throw e;
      }
      else if (hardErrorStates.indexOf(this._asm.currentState) >= 0) {
        this._hardError = true;
      }
      done(e);
    }
  };

  this.addState('validate', 'build', 'error', transition);
  this.addState('restart', 'build', 'error', function(err, done) {
    err = this.response.error;
    if (!err) return done();
    if (!err.retryable) return done(err);

    if (this.response.retryCount < this.service.config.maxRetries) {
      this.response.retryCount++;
      done();
    } else {
      done(err);
    }
  });
  this.addState('build', 'afterBuild', 'restart', transition);
  this.addState('afterBuild', 'sign', 'restart', transition);
  this.addState('sign', 'send', 'retry', transition);
  this.addState('retry', 'afterRetry', 'afterRetry', transition);
  this.addState('afterRetry', 'sign', 'error', transition);
  this.addState('send', 'validateResponse', 'retry', transition);
  this.addState('validateResponse', 'extractData', 'extractError', transition);
  this.addState('extractError', 'extractData', 'retry', transition);
  this.addState('extractData', 'success', 'retry', transition);
  this.addState('success', 'complete', 'complete', transition);
  this.addState('error', 'complete', 'complete', transition);
  this.addState('complete', null, 'uncaughtException', transition);
  this.addState('uncaughtException', function(err, done) {
    try {
      AWS.SequentialExecutor.prototype.unhandledErrorCallback.call(this, err);
    } catch (e) {
      if (this._hardError) {
        e._hardError = true;
        throw e;
      }
    }
    done(err);
  });
};
fsm.setupStates();


AWS.Request = inherit({


  constructor: function Request(service, operation, params) {
    var endpoint = service.endpoint;
    var region = service.config.region;

    if (service.hasGlobalEndpoint()) region = 'us-east-1';

    this.service = service;
    this.operation = operation;
    this.params = params || {};
    this.httpRequest = new AWS.HttpRequest(endpoint, region);
    this.startTime = AWS.util.date.getDate();

    this.response = new AWS.Response(this);
    this.restartCount = 0;
    this._asm = new AcceptorStateMachine(fsm.states, 'validate');

    AWS.SequentialExecutor.call(this);
    this.emit = this.emitEvent;
  },




  send: function send(callback) {
    if (callback) {
      this.on('complete', function (resp) {
        try {
          callback.call(resp, resp.error, resp.data);
        } catch (e) {
          resp.request._hardError = true;
          throw e;
        }
      });
    }
    this.runTo();

    return this.response;
  },

  build: function build(callback) {
    this._hardError = callback ? false : true;
    return this.runTo('send', callback);
  },

  runTo: function runTo(state, done) {
    this._asm.runTo(state, done, this);
    return this;
  },


  abort: function abort() {
    this.removeAllListeners('validateResponse');
    this.removeAllListeners('extractError');
    this.on('validateResponse', function addAbortedError(resp) {
      resp.error = AWS.util.error(new Error('Request aborted by user'), {
         code: 'RequestAbortedError', retryable: false
      });
    });

    if (this.httpRequest.stream) { // abort HTTP stream
      this.httpRequest.stream.abort();
      if (this.httpRequest._abortCallback) {
         this.httpRequest._abortCallback();
      } else {
        this.removeAllListeners('send'); // haven't sent yet, so let's not
      }
    }

    return this;
  },


  eachPage: function eachPage(callback) {
    function wrappedCallback(response) {
      var result = callback.call(response, response.error, response.data);
      if (result === false) return;

      if (response.hasNextPage()) {
        response.nextPage().on('complete', wrappedCallback).send();
      } else {
        callback.call(response, null, null);
      }
    }

    this.on('complete', wrappedCallback).send();
  },


  eachItem: function eachItem(callback) {
    function wrappedCallback(err, data) {
      if (err) return callback(err, null);
      if (data === null) return callback(null, null);

      var config = this.request.service.paginationConfig(this.request.operation);
      var resultKey = config.resultKey;
      if (Array.isArray(resultKey)) resultKey = resultKey[0];
      var results = AWS.util.jamespath.query(resultKey, data);
      AWS.util.arrayEach(results, function(result) {
        AWS.util.arrayEach(result, function(item) { callback(null, item); });
      });
    }

    this.eachPage(wrappedCallback);
  },


  isPageable: function isPageable() {
    return this.service.paginationConfig(this.operation) ? true : false;
  },


  createReadStream: function createReadStream() {
    var streams = AWS.util.nodeRequire('stream');
    var req = this;
    var stream = null;
    var legacyStreams = false;

    if (AWS.HttpClient.streamsApiVersion === 2) {
      stream = new streams.Readable();
      stream._read = function() { stream.push(''); };
    } else {
      stream = new streams.Stream();
      stream.readable = true;
    }

    stream.sent = false;
    stream.on('newListener', function(event) {
      if (!stream.sent && (event === 'data' || event === 'readable')) {
        if (event === 'data') legacyStreams = true;
        stream.sent = true;
        process.nextTick(function() { req.send(function() { }); });
      }
    });

    this.on('httpHeaders', function streamHeaders(statusCode, headers, resp) {
      if (statusCode < 300) {
        this.httpRequest._streaming = true;

        req.removeListener('httpData', AWS.EventListeners.Core.HTTP_DATA);
        req.removeListener('httpError', AWS.EventListeners.Core.HTTP_ERROR);
        req.on('httpError', function streamHttpError(error, resp) {
          resp.error = error;
          resp.error.retryable = false;
        });

        var httpStream = resp.httpResponse.stream;
        stream.response = resp;
        stream._read = function() {
          var data;
          do {
            data = httpStream.read();
            if (data) stream.push(data);
          } while (data);
          stream.push('');
        };

        var events = ['end', 'error', (legacyStreams ? 'data' : 'readable')];
        AWS.util.arrayEach(events, function(event) {
          httpStream.on(event, function(arg) {
            stream.emit(event, arg);
          });
        });
      }
    });

    this.on('error', function(err) {
      stream.emit('error', err);
    });

    return stream;
  },


  emitEvent: function emit(eventName, args, done) {
    if (typeof args === 'function') { done = args; args = null; }
    if (!done) done = this.unhandledErrorCallback;
    if (!args) args = this.eventParameters(eventName, this.response);

    var origEmit = AWS.SequentialExecutor.prototype.emit;
    origEmit.call(this, eventName, args, function (err) {
      if (err) this.response.error = err;
      done.call(this, err);
    });
  },


  eventParameters: function eventParameters(eventName) {
    switch (eventName) {
      case 'validate':
      case 'sign':
      case 'build':
      case 'afterBuild':
        return [this];
      case 'error':
        return [this.response.error, this.response];
      default:
        return [this.response];
    }
  }
});

AWS.util.mixin(AWS.Request, AWS.SequentialExecutor);

}).call(this,{browser:true})
},{"./core":3,"./state_machine":30}],15:[function(require,module,exports){


var AWS = require('./core');
var inherit = AWS.util.inherit;


AWS.ResourceWaiter = inherit({

  constructor: function constructor(service, state) {
    this.service = service;
    this.state = state;
    this.config = {};

    if (typeof this.state === 'object') {
      AWS.util.each.call(this, this.state, function (key, value) {
        this.state = key;
        this.expectedValue = value;
      });
    }

    this.loadWaiterConfig(this.state);
    if (!this.expectedValue) {
      this.expectedValue = this.config.successValue;
    }
    this.config.operation = AWS.util.string.lowerFirst(this.config.operation);
  },

  service: null,

  state: null,

  expectedValue: null,

  config: null,

  waitDone: false,

  Listeners: {
    retry: new AWS.SequentialExecutor().addNamedListeners(function(add) {
      add('RETRY_CHECK', 'retry', function(resp) {
        var waiter = resp.request._waiter;
        if (resp.error && resp.error.code === 'ResourceNotReady') {
          resp.error.retryDelay = waiter.config.interval * 1000;
        }
      });
    }),

    output: new AWS.SequentialExecutor().addNamedListeners(function(add) {
      add('CHECK_OUT_ERROR', 'extractError', function CHECK_OUT_ERROR(resp) {
        if (resp.error) {
          resp.request._waiter.setError(resp, true);
        }
      });

      add('CHECK_OUTPUT', 'extractData', function CHECK_OUTPUT(resp) {
        var waiter = resp.request._waiter;
        var success = waiter.checkSuccess(resp);
        if (!success) {
          waiter.setError(resp, success === null ? false : true);
        } else {
          resp.error = null;
        }
      });
    }),

    error: new AWS.SequentialExecutor().addNamedListeners(function(add) {
      add('CHECK_ERROR', 'extractError', function CHECK_ERROR(resp) {
        var waiter = resp.request._waiter;
        var success = waiter.checkError(resp);
        if (!success) {
          waiter.setError(resp, success === null ? false : true);
        } else {
          resp.error = null;
          resp.request.removeAllListeners('extractData');
        }
      });

      add('CHECK_ERR_OUTPUT', 'extractData', function CHECK_ERR_OUTPUT(resp) {
        resp.request._waiter.setError(resp, true);
      });
    })
  },


  wait: function wait(params, callback) {
    if (typeof params === 'function') {
      callback = params; params = undefined;
    }

    var request = this.service.makeRequest(this.config.operation, params);
    var listeners = this.Listeners[this.config.successType];
    request._waiter = this;
    request.response.maxRetries = this.config.maxAttempts;
    request.addListeners(this.Listeners.retry);
    if (listeners) request.addListeners(listeners);

    if (callback) request.send(callback);
    return request;
  },

  setError: function setError(resp, retryable) {
    resp.data = null;
    resp.error = AWS.util.error(resp.error || new Error(), {
      code: 'ResourceNotReady',
      message: 'Resource is not in the state ' + this.state,
      retryable: retryable
    });
  },


  checkSuccess: function checkSuccess(resp) {
    if (!this.config.successPath) {
      return resp.httpResponse.statusCode < 300;
    }

    var r = AWS.util.jamespath.find(this.config.successPath, resp.data);

    if (this.config.failureValue &&
        this.config.failureValue.indexOf(r) >= 0) {
      return null; // fast fail
    }

    if (this.expectedValue) {
      return r === this.expectedValue;
    } else {
      return r ? true : false;
    }
  },


  checkError: function checkError(resp) {
    return resp.httpResponse.statusCode === this.config.successValue;
  },


  loadWaiterConfig: function loadWaiterConfig(state, noException) {
    if (!this.service.api.waiters[state]) {
      if (noException) return;
      throw new AWS.util.error(new Error(), {
        code: 'StateNotFoundError',
        message: 'State ' + state + ' not found.'
      });
    }

    if (state !== '__default__') {
      var superState = this.service.api.waiters[state]['extends'];
      superState = superState || '__default__';
      this.loadWaiterConfig(superState, true);
    }

    var config = this.config;
    AWS.util.update(config, this.service.api.waiters[state]);

    (function () { // anonymous function to avoid max complexity count
      config.successType = config.successType || config.acceptorType;
      config.successPath = config.successPath || config.acceptorPath;
      config.successValue = config.successValue || config.acceptorValue;
      config.failureType = config.failureType || config.acceptorType;
      config.failurePath = config.failurePath || config.acceptorPath;
      config.failureValue = config.failureValue || config.acceptorValue;
    })();
  }
});

},{"./core":3}],16:[function(require,module,exports){
var AWS = require('./core');
var inherit = AWS.util.inherit;


AWS.Response = inherit({


  constructor: function Response(request) {
    this.request = request;
    this.data = null;
    this.error = null;
    this.retryCount = 0;
    this.redirectCount = 0;
    this.httpResponse = new AWS.HttpResponse();
    if (request) {
      this.maxRetries = request.service.numRetries();
      this.maxRedirects = request.service.config.maxRedirects;
    }
  },


  nextPage: function nextPage(callback) {
    var config;
    var service = this.request.service;
    var operation = this.request.operation;
    try {
      config = service.paginationConfig(operation, true);
    } catch (e) { this.error = e; }

    if (!this.hasNextPage()) {
      if (callback) callback(this.error, null);
      else if (this.error) throw this.error;
      return null;
    }

    var params = AWS.util.copy(this.request.params);
    if (!this.nextPageTokens) {
      return callback ? callback(null, null) : null;
    } else {
      var inputTokens = config.inputToken;
      if (typeof inputTokens === 'string') inputTokens = [inputTokens];
      for (var i = 0; i < inputTokens.length; i++) {
        params[inputTokens[i]] = this.nextPageTokens[i];
      }
      return service.makeRequest(this.request.operation, params, callback);
    }
  },


  hasNextPage: function hasNextPage() {
    this.cacheNextPageTokens();
    if (this.nextPageTokens) return true;
    if (this.nextPageTokens === undefined) return undefined;
    else return false;
  },


  cacheNextPageTokens: function cacheNextPageTokens() {
    if (this.hasOwnProperty('nextPageTokens')) return this.nextPageTokens;
    this.nextPageTokens = undefined;

    var config = this.request.service.paginationConfig(this.request.operation);
    if (!config) return this.nextPageTokens;

    this.nextPageTokens = null;
    if (config.moreResults) {
      if (!AWS.util.jamespath.find(config.moreResults, this.data)) {
        return this.nextPageTokens;
      }
    }

    var exprs = config.outputToken;
    if (typeof exprs === 'string') exprs = [exprs];
    AWS.util.arrayEach.call(this, exprs, function (expr) {
      var output = AWS.util.jamespath.find(expr, this.data);
      if (output) {
        this.nextPageTokens = this.nextPageTokens || [];
        this.nextPageTokens.push(output);
      }
    });

    return this.nextPageTokens;
  }

});

},{"./core":3}],17:[function(require,module,exports){
var AWS = require('./core');
var domain = AWS.util.nodeRequire('domain');


AWS.SequentialExecutor = AWS.util.inherit({

  constructor: function SequentialExecutor() {
    this.domain = domain && domain.active;
    this._events = {};
  },


  listeners: function listeners(eventName) {
    return this._events[eventName] ? this._events[eventName].slice(0) : [];
  },

  on: function on(eventName, listener) {
    if (this._events[eventName]) {
      this._events[eventName].push(listener);
    } else {
      this._events[eventName] = [listener];
    }
    return this;
  },


  onAsync: function onAsync(eventName, listener) {
    listener._isAsync = true;
    return this.on(eventName, listener);
  },

  removeListener: function removeListener(eventName, listener) {
    var listeners = this._events[eventName];
    if (listeners) {
      var length = listeners.length;
      var position = -1;
      for (var i = 0; i < length; ++i) {
        if (listeners[i] === listener) {
          position = i;
        }
      }
      if (position > -1) {
        listeners.splice(position, 1);
      }
    }
    return this;
  },

  removeAllListeners: function removeAllListeners(eventName) {
    if (eventName) {
      delete this._events[eventName];
    } else {
      this._events = {};
    }
    return this;
  },


  emit: function emit(eventName, eventArgs, doneCallback) {
    if (!doneCallback) doneCallback = this.unhandledErrorCallback;
    if (domain && this.domain instanceof domain.Domain)
      this.domain.enter();

    var listeners = this.listeners(eventName);
    var count = listeners.length;
    this.callListeners(listeners, eventArgs, doneCallback);
    return count > 0;
  },


  callListeners: function callListeners(listeners, args, doneCallback) {
    if (listeners.length === 0) {
      doneCallback.call(this);
      if (domain && this.domain instanceof domain.Domain)
        this.domain.exit();
    } else {
      var listener = listeners.shift();
      if (listener._isAsync) {

        var self = this;
        var callNextListener = function(err) {
          if (err) {
            doneCallback.call(self, err);
            if (domain && self.domain instanceof domain.Domain)
              self.domain.exit();
          } else {
            self.callListeners(listeners, args, doneCallback);
          }
        };
        listener.apply(this, args.concat([callNextListener]));

      } else {

        try {
          listener.apply(this, args);
          this.callListeners(listeners, args, doneCallback);
        } catch (err) {
          if (err._hardError) throw err;

          doneCallback.call(this, err);
          if (domain && this.domain instanceof domain.Domain)
            this.domain.exit();
        }

      }
    }
  },


  addListeners: function addListeners(listeners) {
    var self = this;

    if (listeners._events) listeners = listeners._events;

    AWS.util.each(listeners, function(event, callbacks) {
      if (typeof callbacks === 'function') callbacks = [callbacks];
      AWS.util.arrayEach(callbacks, function(callback) {
        self.on(event, callback);
      });
    });

    return self;
  },


  addNamedListener: function addNamedListener(name, eventName, callback) {
    this[name] = callback;
    this.addListener(eventName, callback);
    return this;
  },


  addNamedAsyncListener: function addNamedAsyncListener(name, eventName, callback) {
    callback._isAsync = true;
    return this.addNamedListener(name, eventName, callback);
  },


  addNamedListeners: function addNamedListeners(callback) {
    var self = this;
    callback(
      function() {
        self.addNamedListener.apply(self, arguments);
      },
      function() {
        self.addNamedAsyncListener.apply(self, arguments);
      }
    );
    return this;
  },


  unhandledErrorCallback: function unhandledErrorCallback(err) {
    if (err) {
      if (domain && this.domain instanceof domain.Domain) {
        err.domainEmitter = this;
        err.domain = this.domain;
        err.domainThrown = false;
        this.domain.emit('error', err);
      } else {
        throw err;
      }
    }
  }
});


AWS.SequentialExecutor.prototype.addListener = AWS.SequentialExecutor.prototype.on;

},{"./core":3}],18:[function(require,module,exports){
var AWS = require('./core');
var Translator = require('aws-sdk-apis/lib/translator');
var inherit = AWS.util.inherit;


AWS.Service = inherit({

  constructor: function Service(config) {
    if (!this.loadServiceClass) {
      throw AWS.util.error(new Error(),
        'Service must be constructed with `new\' operator');
    }
    var ServiceClass = this.loadServiceClass(config || {});
    if (ServiceClass) return new ServiceClass(config);
    this.initialize(config);
  },


  initialize: function initialize(config) {
    AWS.util.hideProperties(this, ['client']);
    this.client = this; // backward compatibility with client property
    this.config = new AWS.Config(AWS.config);
    if (config) this.config.update(config, true);
    this.setEndpoint(this.config.endpoint);
  },


  loadServiceClass: function loadServiceClass(serviceConfig) {
    var config = serviceConfig;
    if (!AWS.util.isEmpty(this.api)) {
      return null;
    } else if (config.apiConfig) {
      return AWS.Service.defineServiceApi(this.constructor, config.apiConfig);
    } else if (!this.constructor.services) {
      return null;
    } else {
      config = new AWS.Config(AWS.config);
      config.update(serviceConfig, true);
      var version = config.apiVersions[this.constructor.serviceIdentifier];
      version = version || config.apiVersion;
      return this.getLatestServiceClass(version);
    }
  },


  getLatestServiceClass: function getLatestServiceClass(version) {
    version = this.getLatestServiceVersion(version);
    if (this.constructor.services[version] === null) {
      AWS.Service.defineServiceApi(this.constructor, version);
    }

    return this.constructor.services[version];
  },


  getLatestServiceVersion: function getLatestServiceVersion(version) {
    if (!this.constructor.services || this.constructor.services.length === 0) {
      throw new Error('No services defined on ' +
                      this.constructor.serviceIdentifier);
    }

    if (!version) {
      version = 'latest';
    } else if (AWS.util.isType(version, Date)) {
      version = AWS.util.date.iso8601(version).split('T')[0];
    }

    if (Object.hasOwnProperty(this.constructor.services, version)) {
      return version;
    }

    var keys = Object.keys(this.constructor.services).sort();
    var selectedVersion = null;
    for (var i = keys.length - 1; i >= 0; i--) {
      if (keys[i][keys[i].length - 1] !== '*') {
        selectedVersion = keys[i];
      }
      if (keys[i].substr(0, 10) <= version) {
        return selectedVersion;
      }
    }

    throw new Error('Could not find ' + this.constructor.serviceIdentifier +
                    ' API to satisfy version constraint `' + version + '\'');
  },


  api: {},


  defaultRetryCount: 3,


  makeRequest: function makeRequest(operation, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = null;
    }

    params = params || {};
    if (this.config.params) { // copy only toplevel bound params
      var rules = this.api.operations[operation];
      if (rules) {
        params = AWS.util.copy(params);
        AWS.util.each(this.config.params, function(key, value) {
          if (rules.input.members[key]) {
            if (params[key] === undefined || params[key] === null) {
              params[key] = value;
            }
          }
        });
      }
    }

    var request = new AWS.Request(this, operation, params);
    this.addAllRequestListeners(request);

    if (callback) request.send(callback);
    return request;
  },


  makeUnauthenticatedRequest: function makeUnauthenticatedRequest(operation, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = {};
    }

    var request = this.makeRequest(operation, params);
    request.removeListener('validate', AWS.EventListeners.Core.VALIDATE_CREDENTIALS);
    request.removeListener('sign', AWS.EventListeners.Core.SIGN);
    if (this.api.format === 'query') { // query services turn into GET requests
      request.addListener('build', function convertToGET(request) {
        request.httpRequest.method = 'GET';
        request.httpRequest.path = '/?' + request.httpRequest.body;
        request.httpRequest.body = '';

        delete request.httpRequest.headers['Content-Length'];
        delete request.httpRequest.headers['Content-Type'];
      });
    }

    return callback ? request.send(callback) : request;
  },


  waitFor: function waitFor(state, params, callback) {
    var waiter = new AWS.ResourceWaiter(this, state);
    return waiter.wait(params, callback);
  },


  addAllRequestListeners: function addAllRequestListeners(request) {
    var list = [AWS.events, AWS.EventListeners.Core, this.serviceInterface(),
                AWS.EventListeners.CorePost];
    for (var i = 0; i < list.length; i++) {
      if (list[i]) request.addListeners(list[i]);
    }

    if (!this.config.paramValidation) {
      request.removeListener('validate',
        AWS.EventListeners.Core.VALIDATE_PARAMETERS);
    }

    if (this.config.logger) { // add logging events
      request.addListeners(AWS.EventListeners.Logger);
    }

    this.setupRequestListeners(request);
  },


  setupRequestListeners: function setupRequestListeners() {
  },


  getSignerClass: function getSignerClass() {
    var version = this.api.signatureVersion;
    if (this.config.signatureVersion) version = this.config.signatureVersion;
    else if (this.isRegionV4()) version = 'v4';
    return AWS.Signers.RequestSigner.getVersion(version);
  },


  serviceInterface: function serviceInterface() {
    switch (this.api.format) {
      case 'query': return AWS.EventListeners.Query;
      case 'json': return AWS.EventListeners.Json;
      case 'rest-json': return AWS.EventListeners.RestJson;
      case 'rest-xml': return AWS.EventListeners.RestXml;
    }
    if (this.api.format) {
      throw new Error('Invalid service `format\' ' +
        this.api.format + ' in API config');
    }
  },


  successfulResponse: function successfulResponse(resp) {
    return resp.httpResponse.statusCode < 300;
  },


  numRetries: function numRetries() {
    if (this.config.maxRetries !== undefined) {
      return this.config.maxRetries;
    } else {
      return this.defaultRetryCount;
    }
  },


  retryDelays: function retryDelays() {
    var retryCount = this.numRetries();
    var delays = [];
    for (var i = 0; i < retryCount; ++i) {
      delays[i] = Math.pow(2, i) * 30;
    }
    return delays;
  },


  retryableError: function retryableError(error) {
    if (this.networkingError(error)) return true;
    if (this.expiredCredentialsError(error)) return true;
    if (this.throttledError(error)) return true;
    if (error.statusCode >= 500) return true;
    return false;
  },


  networkingError: function networkingError(error) {
    return error.code === 'NetworkingError';
  },


  expiredCredentialsError: function expiredCredentialsError(error) {
    return (error.code === 'ExpiredTokenException');
  },


  throttledError: function throttledError(error) {
    return (error.code === 'ProvisionedThroughputExceededException');
  },


  setEndpoint: function setEndpoint(endpoint) {
    if (endpoint) {
      this.endpoint = new AWS.Endpoint(endpoint, this.config);
    } else if (this.hasGlobalEndpoint()) {
      this.endpoint = new AWS.Endpoint(this.api.globalEndpoint, this.config);
    } else {
      var host = this.api.endpointPrefix + '.' + this.config.region +
                 this.endpointSuffix();
      this.endpoint = new AWS.Endpoint(host, this.config);
    }
  },


  hasGlobalEndpoint: function hasGlobalEndpoint() {
    if (this.isRegionV4()) return false;
    return this.api.globalEndpoint;
  },


  endpointSuffix: function endpointSuffix() {
    var suffix = '.amazonaws.com';
    if (this.isRegionCN()) return suffix + '.cn';
    else return suffix;
  },


  isRegionCN: function isRegionCN() {
    if (!this.config.region) return false;
    return this.config.region.match(/^cn-/) ? true : false;
  },


  isRegionV4: function isRegionV4() {
    return this.isRegionCN();
  },


  paginationConfig: function paginationConfig(operation, throwException) {
    function fail(name) {
      if (throwException) {
        var e = new Error();
        throw AWS.util.error(e, 'No pagination configuration for ' + name);
      }
      return null;
    }

    if (!this.api.pagination) return fail('service');
    if (!this.api.pagination[operation]) return fail(operation);
    return this.api.pagination[operation];
  }
});

AWS.util.update(AWS.Service, {


  defineMethods: function defineMethods(svc) {
    AWS.util.each(svc.prototype.api.operations, function iterator(method) {
      if (svc.prototype[method]) return;
      svc.prototype[method] = function (params, callback) {
        return this.makeRequest(method, params, callback);
      };
    });
  },


  defineService: function defineService(serviceIdentifier, versions, features) {
    if (!Array.isArray(versions)) {
      features = versions;
      versions = [];
    }

    var svc = inherit(AWS.Service, features || {});

    if (typeof serviceIdentifier === 'string') {
      AWS.Service.addVersions(svc, versions);

      var identifier = svc.serviceIdentifier || serviceIdentifier;
      svc.serviceIdentifier = identifier;
    } else { // defineService called with an API
      svc.prototype.api = serviceIdentifier;
      AWS.Service.defineMethods(svc);
    }

    return svc;
  },


  addVersions: function addVersions(svc, versions) {
    if (!Array.isArray(versions)) versions = [versions];

    svc.services = svc.services || {};
    for (var i = 0; i < versions.length; i++) {
      if (svc.services[versions[i]] === undefined) {
        svc.services[versions[i]] = null;
      }
    }

    svc.apiVersions = Object.keys(svc.services).sort();
  },


  defineServiceApi: function defineServiceApi(superclass, version, apiConfig) {
    var svc = inherit(superclass, {
      serviceIdentifier: superclass.serviceIdentifier
    });

    function setApi(api) {
      if (api.type && api.api_version) {
        svc.prototype.api = new Translator(api, {documentation: false});
      } else {
        svc.prototype.api = api;
      }
    }

    if (typeof version === 'string') {
      if (apiConfig) {
        setApi(apiConfig);
      } else {
        var fs = AWS.util.nodeRequire('fs');
        var path = AWS.util.nodeRequire('path');
        var apis = AWS.util.nodeRequire('aws-sdk-apis');

        try {
          var name = null;
          if (apis) name = apis.serviceName(superclass.serviceIdentifier);
          var file = (name || superclass.serviceIdentifier) + '-' + version;
          var fullPath = path.dirname(require.resolve('aws-sdk-apis')) +
                         '/apis/' + file + '.json';
          setApi(JSON.parse(fs.readFileSync(fullPath)));
        } catch (err) {
          throw AWS.util.error(err, {
            message: 'Could not find API configuration ' + file
          });
        }
      }
      if (!superclass.services.hasOwnProperty(version)) {
        superclass.apiVersions = superclass.apiVersions.concat(version).sort();
      }
      superclass.services[version] = svc;
    } else {
      setApi(version);
    }

    AWS.Service.defineMethods(svc);
    return svc;
  }
});

},{"./core":3,"aws-sdk-apis/lib/translator":34}],19:[function(require,module,exports){
var AWS = require('../core');
require('../json/builder');


AWS.ServiceInterface.Json = {
  buildRequest: function buildRequest(req) {
    var httpRequest = req.httpRequest;
    var api = req.service.api;
    var target = api.targetPrefix + '.' + api.operations[req.operation].name;
    var version = api.jsonVersion || '1.0';

    var rules = api.operations[req.operation].input;
    var builder = new AWS.JSON.Builder(rules, api);

    httpRequest.body = builder.build(req.params || {});
    httpRequest.headers['Content-Type'] = 'application/x-amz-json-' + version;
    httpRequest.headers['X-Amz-Target'] = target;
  },

  extractError: function extractError(resp) {
    var error = {};
    var httpResponse = resp.httpResponse;

    if (httpResponse.body.length > 0) {
      var e = JSON.parse(httpResponse.body.toString());
      if (e.__type || e.code) {
        error.code = (e.__type || e.code).split('#').pop();
      } else {
        error.code = 'UnknownError';
      }
      if (error.code === 'RequestEntityTooLarge') {
        error.message = 'Request body must be less than 1 MB';
      } else {
        error.message = (e.message || e.Message || null);
      }
    } else {
      error.code = httpResponse.statusCode;
      error.message = null;
    }

    resp.error = AWS.util.error(new Error(), error);
  },

  extractData: function extractData(resp) {
    resp.data = JSON.parse(resp.httpResponse.body.toString() || '{}');
  }

};

},{"../core":3,"../json/builder":12}],20:[function(require,module,exports){
var AWS = require('../core');
var inherit = AWS.util.inherit;


AWS.ServiceInterface.Query = {
  buildRequest: function buildRequest(req) {
    var operation = req.service.api.operations[req.operation];
    var httpRequest = req.httpRequest;
    httpRequest.headers['Content-Type'] =
      'application/x-www-form-urlencoded; charset=utf-8';
    httpRequest.params = {
      Version: req.service.api.apiVersion,
      Action: operation.name
    };

    var rules = operation.input;
    if (rules) rules = rules.members;
    var builder = new AWS.QueryParamSerializer(rules, req.service.api);
    builder.serialize(req.params, function(name, value) {
      httpRequest.params[name] = value;
    });
    httpRequest.body = AWS.util.queryParamsToString(httpRequest.params);
  },

  extractError: function extractError(resp) {
    var data, body = resp.httpResponse.body.toString();
    if (body.match('<UnknownOperationException')) {
      data = {
        Code: 'UnknownOperation',
        Message: 'Unknown operation ' + resp.request.operation
      };
    } else {
      data = new AWS.XML.Parser({}).parse(body);
    }

    if (data.Errors) data = data.Errors;
    if (data.Error) data = data.Error;
    if (data.Code) {
      resp.error = AWS.util.error(new Error(), {
        code: data.Code,
        message: data.Message
      });
    } else {
      resp.error = AWS.util.error(new Error(), {
        code: resp.httpResponse.statusCode,
        message: null
      });
    }
  },

  extractData: function extractData(resp) {
    var req = resp.request;
    var operation = req.service.api.operations[req.operation];
    var wrapperKey = operation.name + 'Result';
    var rules = operation.output || {};

    if (req.service.api.resultWrapped) {
      var tmp = {
        type: 'structure',
        members: {}
      };
      tmp.members[wrapperKey] = rules;
      rules = tmp;
    }

    var parser = new AWS.XML.Parser(rules);
    var data = parser.parse(resp.httpResponse.body.toString());

    if (req.service.api.resultWrapped) {
      if (data[wrapperKey]) {
        AWS.util.update(data, data[wrapperKey]);
        delete data[wrapperKey];
      }
    }

    resp.data = data;
  }
};


AWS.QueryParamSerializer = inherit({

  constructor: function QueryParamSerializer(rules, options) {
    this.rules = rules;
    this.timestampFormat = options ? options.timestampFormat : 'iso8601';
  },

  serialize: function serialize(params, fn) {
    this.serializeStructure('', params, this.rules, fn);
  },

  serializeStructure: function serializeStructure(prefix, struct, rules, fn) {
    var that = this;
    AWS.util.each(struct, function (name, member) {
      var n = rules[name].name || name;
      var memberName = prefix ? prefix + '.' + n : n;
      that.serializeMember(memberName, member, rules[name], fn);
    });
  },

  serializeMap: function serialzeMap(name, map, rules, fn) {
    var i = 1;
    var that = this;
    AWS.util.each(map, function (key, value) {
      var prefix = rules.flattened ? '.' : '.entry.';
      var position = prefix + (i++) + '.';
      var keyName = position + (rules.keys.name || 'key');
      var valueName = position + (rules.members.name || 'value');
      that.serializeMember(name + keyName, key, rules.keys, fn);
      that.serializeMember(name + valueName, value, rules.members, fn);
    });
  },

  serializeList: function serializeList(name, list, rules, fn) {
    var that = this;
    var memberRules = rules.members || {};

    if (list.length === 0) {
      fn.call(this, name, null);
      return;
    }

    AWS.util.arrayEach(list, function (v, n) {
      var suffix = '.' + (n + 1);
      if (rules.flattened) {
        if (memberRules.name) {
          var parts = name.split('.');
          parts.pop();
          parts.push(memberRules.name);
          name = parts.join('.');
        }
      } else {
        suffix = '.member' + suffix;
      }
      that.serializeMember(name + suffix, v, memberRules, fn);
    });
  },

  serializeMember: function serializeMember(name, value, rules, fn) {
    if (value === null || value === undefined) return;
    if (rules.type === 'structure') {
      this.serializeStructure(name, value, rules.members, fn);
    } else if (rules.type === 'list') {
      this.serializeList(name, value, rules, fn);
    } else if (rules.type === 'map') {
      this.serializeMap(name, value, rules, fn);
    } else if (rules.type === 'timestamp') {
      var timestampFormat = rules.format || this.timestampFormat;
      fn.call(this, name, AWS.util.date.format(value, timestampFormat));
    } else {
      fn.call(this, name, String(value));
    }
  }

});

},{"../core":3}],21:[function(require,module,exports){
var AWS = require('../core');


AWS.ServiceInterface.Rest = {
  buildRequest: function buildRequest(req) {
    AWS.ServiceInterface.Rest.populateMethod(req);
    AWS.ServiceInterface.Rest.populateURI(req);
    AWS.ServiceInterface.Rest.populateHeaders(req);
  },

  extractError: function extractError() {
  },

  extractData: function extractData(resp) {
    var req = resp.request;
    var data = {};
    var r = resp.httpResponse;
    var operation = req.service.api.operations[req.operation];
    var rules = (operation.output || {}).members || {};

    var headers = {};
    AWS.util.each(r.headers, function (k, v) {
      headers[k.toLowerCase()] = v;
    });

    AWS.util.each(rules, function (name, rule) {
      if (rule.location === 'header') {
        var header = (rule.name || name).toLowerCase();
        if (rule.type === 'map') {
          data[name] = {};
          AWS.util.each(r.headers, function (k, v) {
            var result = k.match(new RegExp('^' + rule.name + '(.+)', 'i'));
            if (result !== null) {
              data[name][result[1]] = v;
            }
          });
        }
        if (headers[header] !== undefined) {
          data[name] = headers[header];
        }
      }
      if (rule.location === 'status') {
        data[name] = parseInt(r.statusCode, 10);
      }
    });

    resp.data = data;
  },

  populateMethod: function populateMethod(req) {
    req.httpRequest.method = req.service.api.operations[req.operation].http.method;
  },

  populateURI: function populateURI(req) {
    var operation = req.service.api.operations[req.operation];
    var uri = [req.httpRequest.endpoint.path, operation.http.uri].join('/');
    uri = uri.replace(/\/+/g, '/');
    var pathPattern = uri.split(/\?/)[0];
    var rules = (operation.input || {}).members || {};

    var escapePathParam = req.service.escapePathParam ||
      AWS.ServiceInterface.Rest.escapePathParam;
    var escapeQuerystringParam = req.service.escapeQuerystringParam ||
      AWS.ServiceInterface.Rest.escapeQuerystringParam;

    AWS.util.each.call(this, rules, function (name, rule) {
      if (rule.location === 'uri') {
        var paramValue = req.params[name];
        if (paramValue === null || paramValue === undefined) return;

        var value = pathPattern.match('{' + name + '}') ?
          escapePathParam(paramValue) :
          escapeQuerystringParam(paramValue);

        uri = uri.replace('{' + name + '}', value);
      }
    });

    var path = uri.split('?')[0];
    var querystring = uri.split('?')[1];

    if (querystring) {
      var parts = [];
      AWS.util.arrayEach(querystring.split('&'), function (part) {
        if (!part.match('{\\w+}')) parts.push(part);
      });
      uri = (parts.length > 0 ? path + '?' + parts.join('&') : path);
    } else {
      uri = path;
    }

    req.httpRequest.path = uri;
  },

  escapePathParam: function escapePathParam(value) {
    return AWS.util.uriEscape(String(value));
  },

  escapeQuerystringParam: function escapeQuerystringParam(value) {
    return AWS.util.uriEscape(String(value));
  },

  populateHeaders: function populateHeaders(req) {
    var operation = req.service.api.operations[req.operation];
    var rules = (operation.input || {}).members || {};

    AWS.util.each.call(this, rules, function (name, rule) {
      if (rule.location === 'header' && req.params[name]) {
        if (rule.type === 'map') {
          AWS.util.each(req.params[name], function (key, value) {
            req.httpRequest.headers[rule.name + key] = value;
          });
        } else {
          var value = req.params[name];
          if (rule.type === 'timestamp') {
            var timestampFormat = rule.format || req.service.api.timestampFormat;
            value = AWS.util.date.format(value, timestampFormat);
          }
          req.httpRequest.headers[rule.name || name] = value;
        }
      }
    });

  }
};

},{"../core":3}],22:[function(require,module,exports){
var AWS = require('../core');
require('./rest');
require('./json');


AWS.ServiceInterface.RestJson = {
  buildRequest: function buildRequest(req) {
    AWS.ServiceInterface.Rest.buildRequest(req);
    AWS.ServiceInterface.RestJson.populateBody(req);
  },

  extractError: function extractError(resp) {
    AWS.ServiceInterface.Json.extractError(resp);
  },

  extractData: function extractData(resp) {
    AWS.ServiceInterface.Rest.extractData(resp);

    var req = resp.request;
    var rules = req.service.api.operations[req.operation].output || {};
    if (rules.payload && rules.members[rules.payload]) {
      if (rules.members[rules.payload].streaming) {
        resp.data[rules.payload] = resp.httpResponse.body;
      } else {
        resp.data[rules.payload] = resp.httpResponse.body.toString();
      }
    } else {
      var data = resp.data;
      AWS.ServiceInterface.Json.extractData(resp);
      resp.data = AWS.util.merge(data, resp.data);
    }
  },

  populateBody: function populateBody(req) {
    var input = req.service.api.operations[req.operation].input;
    var payload = input.payload;
    var params = {};

    if (typeof payload === 'string') {

      var rules = input.members[payload];
      params = req.params[payload];

      if (params === undefined) return;

      if (rules.type === 'structure') {
        req.httpRequest.body = this.buildJSON(params, input, req.service.api);
      } else {
        req.httpRequest.body = params;
      }

    } else if (payload) {

      AWS.util.arrayEach(payload, function (param) {
        if (req.params[param] !== undefined) {
          params[param] = req.params[param];
        }
      });
      req.httpRequest.body = this.buildJSON(params, input, req.service.api);

    }
  },

  buildJSON: function buildJSON(params, rules, api) {
    var builder = new AWS.JSON.Builder(rules, api);
    return builder.build(params);
  }

};

},{"../core":3,"./json":19,"./rest":21}],23:[function(require,module,exports){
var AWS = require('../core');
require('../xml/builder');
require('./rest');


AWS.ServiceInterface.RestXml = {
  buildRequest: function buildRequest(req) {
    AWS.ServiceInterface.Rest.buildRequest(req);
    AWS.ServiceInterface.RestXml.populateBody(req);
  },

  extractError: function extractError(resp) {
    AWS.ServiceInterface.Rest.extractError(resp);

    var data = new AWS.XML.Parser({}).parse(resp.httpResponse.body.toString());
    if (data.Errors) data = data.Errors;
    if (data.Error) data = data.Error;
    if (data.Code) {
      resp.error = AWS.util.error(new Error(), {
        code: data.Code,
        message: data.Message
      });
    } else {
      resp.error = AWS.util.error(new Error(), {
        code: resp.httpResponse.statusCode,
        message: null
      });
    }
  },

  extractData: function extractData(resp) {
    AWS.ServiceInterface.Rest.extractData(resp);

    var req = resp.request;
    var httpResponse = resp.httpResponse;
    var operation = req.service.api.operations[req.operation];
    var rules = operation.output.members;

    var output = operation.output;
    var payload = output.payload;

    if (payload) {
      if (rules[payload].streaming) {
        resp.data[payload] = httpResponse.body;
      } else {
        resp.data[payload] = httpResponse.body.toString();
      }
    } else if (httpResponse.body.length > 0) {
      var parser = new AWS.XML.Parser(operation.output || {});
      AWS.util.update(resp.data, parser.parse(httpResponse.body.toString()));
    }
  },

  populateBody: function populateBody(req) {
    var input = req.service.api.operations[req.operation].input;
    var payload = input.payload;
    var rules = {};
    var builder = null;
    var params = req.params;

    if (typeof payload === 'string') {

      rules = input.members[payload];
      params = params[payload];

      if (params === undefined) return;

      if (rules.type === 'structure') {
        builder = new AWS.XML.Builder(payload, rules.members, req.service.api);
        req.httpRequest.body = builder.toXML(params);
      } else {
        req.httpRequest.body = params;
      }

    } else if (payload) {

      AWS.util.arrayEach(payload, function (member) {
        rules[member] = input.members[member];
      });

      builder = new AWS.XML.Builder(input.wrapper, rules, req.service.api);
      req.httpRequest.body = builder.toXML(params);

    }

  }
};

},{"../core":3,"../xml/builder":33,"./rest":21}],24:[function(require,module,exports){
var AWS = require('../core');
var inherit = AWS.util.inherit;


AWS.Signers.RequestSigner = inherit({
  constructor: function RequestSigner(request) {
    this.request = request;
  }
});

AWS.Signers.RequestSigner.getVersion = function getVersion(version) {
  switch (version) {
    case 'v2': return AWS.Signers.V2;
    case 'v3': return AWS.Signers.V3;
    case 'v4': return AWS.Signers.V4;
    case 's3': return AWS.Signers.S3;
    case 'v3https': return AWS.Signers.V3Https;
  }
  throw new Error('Unknown signing version ' + version);
};

require('./v2');
require('./v3');
require('./v3https');
require('./v4');
require('./s3');

},{"../core":3,"./s3":25,"./v2":26,"./v3":27,"./v3https":28,"./v4":29}],25:[function(require,module,exports){
var AWS = require('../core');
var inherit = AWS.util.inherit;


AWS.Signers.S3 = inherit(AWS.Signers.RequestSigner, {

  subResources: {
    'acl': 1,
    'cors': 1,
    'lifecycle': 1,
    'delete': 1,
    'location': 1,
    'logging': 1,
    'notification': 1,
    'partNumber': 1,
    'policy': 1,
    'requestPayment': 1,
    'restore': 1,
    'tagging': 1,
    'torrent': 1,
    'uploadId': 1,
    'uploads': 1,
    'versionId': 1,
    'versioning': 1,
    'versions': 1,
    'website': 1
  },

  responseHeaders: {
    'response-content-type': 1,
    'response-content-language': 1,
    'response-expires': 1,
    'response-cache-control': 1,
    'response-content-disposition': 1,
    'response-content-encoding': 1
  },

  addAuthorization: function addAuthorization(credentials, date) {
    if (!this.request.headers['presigned-expires']) {
      this.request.headers['X-Amz-Date'] = AWS.util.date.rfc822(date);
    }

    if (credentials.sessionToken) {
      this.request.headers['x-amz-security-token'] = credentials.sessionToken;
    }

    var signature = this.sign(credentials.secretAccessKey, this.stringToSign());
    var auth = 'AWS ' + credentials.accessKeyId + ':' + signature;

    this.request.headers['Authorization'] = auth;
  },

  stringToSign: function stringToSign() {
    var r = this.request;

    var parts = [];
    parts.push(r.method);
    parts.push(r.headers['Content-MD5'] || '');
    parts.push(r.headers['Content-Type'] || '');

    parts.push(r.headers['presigned-expires'] || '');

    var headers = this.canonicalizedAmzHeaders();
    if (headers) parts.push(headers);
    parts.push(this.canonicalizedResource());

    return parts.join('\n');

  },

  canonicalizedAmzHeaders: function canonicalizedAmzHeaders() {

    var amzHeaders = [];

    AWS.util.each(this.request.headers, function (name) {
      if (name.match(/^x-amz-/i))
        amzHeaders.push(name);
    });

    amzHeaders.sort(function (a, b) {
      return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
    });

    var parts = [];
    AWS.util.arrayEach.call(this, amzHeaders, function (name) {
      parts.push(name.toLowerCase() + ':' + String(this.request.headers[name]));
    });

    return parts.join('\n');

  },

  canonicalizedResource: function canonicalizedResource() {

    var r = this.request;

    var parts = r.path.split('?');
    var path = parts[0];
    var querystring = parts[1];

    var resource = '';

    if (r.virtualHostedBucket)
      resource += '/' + r.virtualHostedBucket;

    resource += path;

    if (querystring) {

      var resources = [];

      AWS.util.arrayEach.call(this, querystring.split('&'), function (param) {
        var name = param.split('=')[0];
        var value = param.split('=')[1];
        if (this.subResources[name] || this.responseHeaders[name]) {
          var subresource = { name: name };
          if (value !== undefined) {
            if (this.subResources[name]) {
              subresource.value = value;
            } else {
              subresource.value = decodeURIComponent(value);
            }
          }
          resources.push(subresource);
        }
      });

      resources.sort(function (a, b) { return a.name < b.name ? -1 : 1; });

      if (resources.length) {

        querystring = [];
        AWS.util.arrayEach(resources, function (resource) {
          if (resource.value === undefined)
            querystring.push(resource.name);
          else
            querystring.push(resource.name + '=' + resource.value);
        });

        resource += '?' + querystring.join('&');
      }

    }

    return resource;

  },

  sign: function sign(secret, string) {
    return AWS.util.crypto.hmac(secret, string, 'base64', 'sha1');
  }
});

module.exports = AWS.Signers.S3;

},{"../core":3}],26:[function(require,module,exports){
var AWS = require('../core');
var inherit = AWS.util.inherit;


AWS.Signers.V2 = inherit(AWS.Signers.RequestSigner, {
  addAuthorization: function addAuthorization(credentials, date) {

    if (!date) date = AWS.util.date.getDate();

    var r = this.request;

    r.params.Timestamp = AWS.util.date.iso8601(date);
    r.params.SignatureVersion = '2';
    r.params.SignatureMethod = 'HmacSHA256';
    r.params.AWSAccessKeyId = credentials.accessKeyId;

    if (credentials.sessionToken) {
      r.params.SecurityToken = credentials.sessionToken;
    }

    delete r.params.Signature; // delete old Signature for re-signing
    r.params.Signature = this.signature(credentials);

    r.body = AWS.util.queryParamsToString(r.params);
    r.headers['Content-Length'] = r.body.length;
  },

  signature: function signature(credentials) {
    return AWS.util.crypto.hmac(credentials.secretAccessKey, this.stringToSign(), 'base64');
  },

  stringToSign: function stringToSign() {
    var parts = [];
    parts.push(this.request.method);
    parts.push(this.request.endpoint.host.toLowerCase());
    parts.push(this.request.pathname());
    parts.push(AWS.util.queryParamsToString(this.request.params));
    return parts.join('\n');
  }

});

module.exports = AWS.Signers.V2;

},{"../core":3}],27:[function(require,module,exports){
var AWS = require('../core');
var inherit = AWS.util.inherit;


AWS.Signers.V3 = inherit(AWS.Signers.RequestSigner, {
  addAuthorization: function addAuthorization(credentials, date) {

    var datetime = AWS.util.date.rfc822(date);

    this.request.headers['X-Amz-Date'] = datetime;

    if (credentials.sessionToken) {
      this.request.headers['x-amz-security-token'] = credentials.sessionToken;
    }

    this.request.headers['X-Amzn-Authorization'] =
      this.authorization(credentials, datetime);

  },

  authorization: function authorization(credentials) {
    return 'AWS3 ' +
      'AWSAccessKeyId=' + credentials.accessKeyId + ',' +
      'Algorithm=HmacSHA256,' +
      'SignedHeaders=' + this.signedHeaders() + ',' +
      'Signature=' + this.signature(credentials);
  },

  signedHeaders: function signedHeaders() {
    var headers = [];
    AWS.util.arrayEach(this.headersToSign(), function iterator(h) {
      headers.push(h.toLowerCase());
    });
    return headers.sort().join(';');
  },

  canonicalHeaders: function canonicalHeaders() {
    var headers = this.request.headers;
    var parts = [];
    AWS.util.arrayEach(this.headersToSign(), function iterator(h) {
      parts.push(h.toLowerCase().trim() + ':' + String(headers[h]).trim());
    });
    return parts.sort().join('\n') + '\n';
  },

  headersToSign: function headersToSign() {
    var headers = [];
    AWS.util.each(this.request.headers, function iterator(k) {
      if (k === 'Host' || k === 'Content-Encoding' || k.match(/^X-Amz/i)) {
        headers.push(k);
      }
    });
    return headers;
  },

  signature: function signature(credentials) {
    return AWS.util.crypto.hmac(credentials.secretAccessKey, this.stringToSign(), 'base64');
  },

  stringToSign: function stringToSign() {
    var parts = [];
    parts.push(this.request.method);
    parts.push('/');
    parts.push('');
    parts.push(this.canonicalHeaders());
    parts.push(this.request.body);
    return AWS.util.crypto.sha256(parts.join('\n'));
  }

});

module.exports = AWS.Signers.V3;

},{"../core":3}],28:[function(require,module,exports){
var AWS = require('../core');
var inherit = AWS.util.inherit;

require('./v3');


AWS.Signers.V3Https = inherit(AWS.Signers.V3, {
  authorization: function authorization(credentials) {
    return 'AWS3-HTTPS ' +
      'AWSAccessKeyId=' + credentials.accessKeyId + ',' +
      'Algorithm=HmacSHA256,' +
      'Signature=' + this.signature(credentials);
  },

  stringToSign: function stringToSign() {
    return this.request.headers['X-Amz-Date'];
  }
});

module.exports = AWS.Signers.V3Https;

},{"../core":3,"./v3":27}],29:[function(require,module,exports){
var AWS = require('../core');
var inherit = AWS.util.inherit;


var cachedSecret = {};


var expiresHeader = 'presigned-expires';


AWS.Signers.V4 = inherit(AWS.Signers.RequestSigner, {
  constructor: function V4(request, serviceName) {
    AWS.Signers.RequestSigner.call(this, request);
    this.serviceName = serviceName;
  },

  algorithm: 'AWS4-HMAC-SHA256',

  addAuthorization: function addAuthorization(credentials, date) {
    var datetime = AWS.util.date.iso8601(date).replace(/[:\-]|\.\d{3}/g, '');

    if (this.isPresigned()) {
      this.updateForPresigned(credentials, datetime);
    } else {
      this.addHeaders(credentials, datetime);
      this.updateBody(credentials);
    }

    this.request.headers['Authorization'] =
      this.authorization(credentials, datetime);
  },

  addHeaders: function addHeaders(credentials, datetime) {
    this.request.headers['X-Amz-Date'] = datetime;
    if (credentials.sessionToken) {
      this.request.headers['x-amz-security-token'] = credentials.sessionToken;
    }
  },

  updateBody: function updateBody(credentials) {
    if (this.request.params) {
      this.request.params.AWSAccessKeyId = credentials.accessKeyId;

      if (credentials.sessionToken) {
        this.request.params.SecurityToken = credentials.sessionToken;
      }

      this.request.body = AWS.util.queryParamsToString(this.request.params);
      this.request.headers['Content-Length'] = this.request.body.length;
    }
  },

  updateForPresigned: function updateForPresigned(credentials, datetime) {
    var credString = this.credentialString(datetime);
    var qs = {
      'X-Amz-Date': datetime,
      'X-Amz-Algorithm': this.algorithm,
      'X-Amz-Credential': credentials.accessKeyId + '/' + credString,
      'X-Amz-Expires': this.request.headers[expiresHeader],
      'X-Amz-SignedHeaders': this.signedHeaders()
    };

    if (credentials.sessionToken) {
      qs['X-Amz-Security-Token'] = credentials.sessionToken;
    }

    var sep = this.request.path.indexOf('?') >= 0 ? '&' : '?';
    this.request.path += sep + AWS.util.queryParamsToString(qs);
  },

  authorization: function authorization(credentials, datetime) {
    var parts = [];
    var credString = this.credentialString(datetime);
    parts.push(this.algorithm + ' Credential=' +
      credentials.accessKeyId + '/' + credString);
    parts.push('SignedHeaders=' + this.signedHeaders());
    parts.push('Signature=' + this.signature(credentials, datetime));
    return parts.join(', ');
  },

  signature: function signature(credentials, datetime) {
    var cache = cachedSecret[this.serviceName];
    var date = datetime.substr(0, 8);
    if (!cache ||
        cache.akid !== credentials.accessKeyId ||
        cache.region !== this.request.region ||
        cache.date !== date) {
      var kSecret = credentials.secretAccessKey;
      var kDate = AWS.util.crypto.hmac('AWS4' + kSecret, date, 'buffer');
      var kRegion = AWS.util.crypto.hmac(kDate, this.request.region, 'buffer');
      var kService = AWS.util.crypto.hmac(kRegion, this.serviceName, 'buffer');
      var kCredentials = AWS.util.crypto.hmac(kService, 'aws4_request', 'buffer');
      cachedSecret[this.serviceName] = {
        region: this.request.region, date: date,
        key: kCredentials, akid: credentials.accessKeyId
      };
    }

    var key = cachedSecret[this.serviceName].key;
    return AWS.util.crypto.hmac(key, this.stringToSign(datetime), 'hex');
  },

  stringToSign: function stringToSign(datetime) {
    var parts = [];
    parts.push('AWS4-HMAC-SHA256');
    parts.push(datetime);
    parts.push(this.credentialString(datetime));
    parts.push(this.hexEncodedHash(this.canonicalString()));
    return parts.join('\n');
  },

  canonicalString: function canonicalString() {
    var parts = [];
    parts.push(this.request.method);
    parts.push(this.request.pathname());
    parts.push(this.request.search());
    parts.push(this.canonicalHeaders() + '\n');
    parts.push(this.signedHeaders());
    parts.push(this.hexEncodedBodyHash());
    return parts.join('\n');
  },

  canonicalHeaders: function canonicalHeaders() {
    var headers = [];
    AWS.util.each.call(this, this.request.headers, function (key, item) {
      headers.push([key, item]);
    });
    headers.sort(function (a, b) {
      return a[0].toLowerCase() < b[0].toLowerCase() ? -1 : 1;
    });
    var parts = [];
    AWS.util.arrayEach.call(this, headers, function (item) {
      var key = item[0].toLowerCase();
      if (this.isSignableHeader(key)) {
        parts.push(key + ':' +
          this.canonicalHeaderValues(item[1].toString()));
      }
    });
    return parts.join('\n');
  },

  canonicalHeaderValues: function canonicalHeaderValues(values) {
    return values.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
  },

  signedHeaders: function signedHeaders() {
    var keys = [];
    AWS.util.each.call(this, this.request.headers, function (key) {
      key = key.toLowerCase();
      if (this.isSignableHeader(key)) keys.push(key);
    });
    return keys.sort().join(';');
  },

  credentialString: function credentialString(datetime) {
    var parts = [];
    parts.push(datetime.substr(0, 8));
    parts.push(this.request.region);
    parts.push(this.serviceName);
    parts.push('aws4_request');
    return parts.join('/');
  },

  hexEncodedHash: function hash(string) {
    return AWS.util.crypto.sha256(string, 'hex');
  },

  hexEncodedBodyHash: function hexEncodedBodyHash() {
    if (this.isPresigned()) {
      return 'UNSIGNED-PAYLOAD';
    } else if (this.request.headers['X-Amz-Content-Sha256']) {
      return this.request.headers['X-Amz-Content-Sha256'];
    } else {
      return this.hexEncodedHash(this.request.body || '');
    }
  },

  unsignableHeaders: ['authorization', 'content-type',
    'user-agent', expiresHeader, 'x-amz-user-agent', 'x-amz-content-sha256'],

  isSignableHeader: function isSignableHeader(key) {
    return this.unsignableHeaders.indexOf(key) < 0;
  },

  isPresigned: function isPresigned() {
    return this.request.headers[expiresHeader] ? true : false;
  }

});

module.exports = AWS.Signers.V4;

},{"../core":3}],30:[function(require,module,exports){
function AcceptorStateMachine(states, state) {
  this.currentState = state || null;
  this.states = states || {};
}

AcceptorStateMachine.prototype.runTo = function runTo(finalState, done, bindObject, inputError) {
  if (typeof finalState === 'function') {
    inputError = bindObject; bindObject = done;
    done = finalState; finalState = null;
  }

  var self = this;
  var state = self.states[self.currentState];
  state.fn.call(bindObject || self, inputError, function(err) {
    if (err) {
      if (bindObject.logger) bindObject.logger.log(self.currentState, '->', state.fail, err);
      if (state.fail) self.currentState = state.fail;
      else return done ? done(err) : null;
    } else {
      if (bindObject.logger) bindObject.logger.log(self.currentState, '->', state.accept);
      if (state.accept) self.currentState = state.accept;
      else return done ? done() : null;
    }
    if (self.currentState === finalState) return done ? done(err) : null;

    self.runTo(finalState, done, bindObject, err);
  });
};

AcceptorStateMachine.prototype.addState = function addState(name, acceptState, failState, fn) {
  if (typeof acceptState === 'function') {
    fn = acceptState; acceptState = null; failState = null;
  } else if (typeof failState === 'function') {
    fn = failState; failState = null;
  }

  if (!this.currentState) this.currentState = name;
  this.states[name] = { accept: acceptState, fail: failState, fn: fn };
  return this;
};

module.exports = AcceptorStateMachine;

},{}],31:[function(require,module,exports){
(function (process){


var AWS = require('./core');
var cryptoLib = require('crypto');

var Buffer = require('buffer').Buffer;


AWS.util = {
  engine: function engine() {
    if (AWS.util.isBrowser() && typeof navigator !== 'undefined') {
      return navigator.userAgent;
    } else {
      return process.platform + '/' + process.version;
    }
  },

  userAgent: function userAgent() {
    var name = AWS.util.isBrowser() ? 'js' : 'nodejs';
    var agent = 'aws-sdk-' + name + '/' + AWS.VERSION;
    if (name === 'nodejs') agent += ' ' + AWS.util.engine();
    return agent;
  },

  isBrowser: function isBrowser() { return process && process.browser; },
  isNode: function isNode() { return !AWS.util.isBrowser(); },
  nodeRequire: function nodeRequire(module) {
    if (AWS.util.isNode()) return require(module);
  },

  uriEscape: function uriEscape(string) {
    var output = encodeURIComponent(string);
    output = output.replace(/[^A-Za-z0-9_.~\-%]+/g, escape);

    output = output.replace(/[*]/g, function(ch) {
      return '%' + ch.charCodeAt(0).toString(16).toUpperCase();
    });

    return output;
  },

  uriEscapePath: function uriEscapePath(string) {
    var parts = [];
    AWS.util.arrayEach(string.split('/'), function (part) {
      parts.push(AWS.util.uriEscape(part));
    });
    return parts.join('/');
  },

  urlParse: function urlParse(url) {
    return require('url').parse(url);
  },

  urlFormat: function urlFormat(url) {
    return require('url').format(url);
  },

  queryParamsToString: function queryParamsToString(params) {
    var items = [];
    var escape = AWS.util.uriEscape;
    var sortedKeys = Object.keys(params).sort();

    AWS.util.arrayEach(sortedKeys, function(name) {
      var value = params[name];
      var ename = escape(name);
      var result = ename;
      if (Array.isArray(value)) {
        var vals = [];
        AWS.util.arrayEach(value, function(item) { vals.push(escape(item)); });
        result = ename + '=' + vals.sort().join('&' + ename + '=');
      } else if (value !== undefined && value !== null) {
        result = ename + '=' + escape(value);
      }
      items.push(result);
    });

    return items.join('&');
  },

  readFileSync: function readFileSync(path) {
    if (typeof window !== 'undefined') return null;
    return require('fs').readFileSync(path, 'utf-8');
  },

  base64: {

    encode: function encode64(string) {
      return new Buffer(string).toString('base64');
    },

    decode: function decode64(string) {
      return new Buffer(string, 'base64').toString();
    }

  },

  Buffer: Buffer,

  buffer: {

    concat: function(buffers) {
      var length = 0,
          offset = 0,
          buffer = null, i;

      for (i = 0; i < buffers.length; i++) {
        length += buffers[i].length;
      }

      buffer = new Buffer(length);

      for (i = 0; i < buffers.length; i++) {
        buffers[i].copy(buffer, offset);
        offset += buffers[i].length;
      }

      return buffer;
    }
  },

  string: {
    byteLength: function byteLength(string) {
      if (string === null || string === undefined) return 0;
      if (typeof string === 'string') string = new Buffer(string);

      if (typeof string.byteLength === 'number') {
        return string.byteLength;
      } else if (typeof string.length === 'number') {
        return string.length;
      } else if (typeof string.size === 'number') {
        return string.size;
      } else if (typeof string.path === 'string') {
        return require('fs').lstatSync(string.path).size;
      } else {
        throw AWS.util.error(new Error('Cannot determine length of ' + string),
          { object: string });
      }
    },

    upperFirst: function upperFirst(string) {
      return string[0].toUpperCase() + string.substr(1);
    },

    lowerFirst: function lowerFirst(string) {
      return string[0].toLowerCase() + string.substr(1);
    }
  },

  ini: {
    parse: function string(ini) {
      var currentSection, map = {};
      AWS.util.arrayEach(ini.split(/\r?\n/), function(line) {
        line = line.split(/(^|\s);/)[0]; // remove comments
        var section = line.match(/^\s*\[([^\[\]]+)\]\s*$/);
        if (section) {
          currentSection = section[1];
        } else if (currentSection) {
          var item = line.match(/^\s*(.+?)\s*=\s*(.+)\s*$/);
          if (item) {
            map[currentSection] = map[currentSection] || {};
            map[currentSection][item[1]] = item[2];
          }
        }
      });

      return map;
    }
  },

  jamespath: {
    query: function query(expression, data) {
      if (!data) return [];

      var results = [];
      var expressions = expression.split(/\s+or\s+/);
      AWS.util.arrayEach.call(this, expressions, function (expr) {
        var objects = [data];
        var tokens = expr.split('.');
        AWS.util.arrayEach.call(this, tokens, function (token) {
          var match = token.match('^(.+?)(?:\\[(-?\\d+|\\*|)\\])?$');
          var newObjects = [];
          AWS.util.arrayEach.call(this, objects, function (obj) {
            if (match[1] === '*') {
              AWS.util.arrayEach.call(this, obj, function (value) {
                newObjects.push(value);
              });
            } else if (obj.hasOwnProperty(match[1])) {
              newObjects.push(obj[match[1]]);
            }
          });
          objects = newObjects;

          if (match[2] !== undefined) {
            newObjects = [];
            AWS.util.arrayEach.call(this, objects, function (obj) {
              if (Array.isArray(obj)) {
                if (match[2] === '*' || match[2] === '') {
                  newObjects = newObjects.concat(obj);
                } else {
                  var idx = parseInt(match[2], 10);
                  if (idx < 0) idx = obj.length + idx; // negative indexing
                  newObjects.push(obj[idx]);
                }
              }
            });
            objects = newObjects;
          }

          if (objects.length === 0) return AWS.util.abort;
        });

        if (objects.length > 0) {
          results = objects;
          return AWS.util.abort;
        }
      });

      return results;
    },

    find: function find(expression, data) {
      return AWS.util.jamespath.query(expression, data)[0];
    }
  },


  date: {


    getDate: function getDate() { return new Date(); },


    iso8601: function iso8601(date) {
      if (date === undefined) { date = AWS.util.date.getDate(); }
      return date.toISOString();
    },


    rfc822: function rfc822(date) {
      if (date === undefined) { date = AWS.util.date.getDate(); }
      return date.toUTCString();
    },


    unixTimestamp: function unixTimestamp(date) {
      if (date === undefined) { date = AWS.util.date.getDate(); }
      return date.getTime() / 1000;
    },


    from: function format(date) {
      if (typeof date === 'number') {
        return new Date(date * 1000); // unix timestamp
      } else {
        return new Date(date);
      }
    },


    format: function format(date, formatter) {
      if (!formatter) formatter = 'iso8601';
      return AWS.util.date[formatter](AWS.util.date.from(date));
    },

    parseTimestamp: function parseTimestamp(value) {
      if (value.match(/^\d+$/)) { // unix timestamp
        return new Date(value * 1000);
      } else if (value.match(/^\d{4}/)) { // iso8601
        return new Date(value);
      } else if (value.match(/^\w{3},/)) { // rfc822
        return new Date(value);
      } else {
        throw AWS.util.error(
          new Error('unhandled timestamp format: ' + value),
          {code: 'TimestampParserError'});
      }
    }

  },

  crypto: {
    crc32Table: [
     0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419,
     0x706AF48F, 0xE963A535, 0x9E6495A3, 0x0EDB8832, 0x79DCB8A4,
     0xE0D5E91E, 0x97D2D988, 0x09B64C2B, 0x7EB17CBD, 0xE7B82D07,
     0x90BF1D91, 0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE,
     0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7, 0x136C9856,
     0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9,
     0xFA0F3D63, 0x8D080DF5, 0x3B6E20C8, 0x4C69105E, 0xD56041E4,
     0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B,
     0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3,
     0x45DF5C75, 0xDCD60DCF, 0xABD13D59, 0x26D930AC, 0x51DE003A,
     0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599,
     0xB8BDA50F, 0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924,
     0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D, 0x76DC4190,
     0x01DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F,
     0x9FBFE4A5, 0xE8B8D433, 0x7807C9A2, 0x0F00F934, 0x9609A88E,
     0xE10E9818, 0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01,
     0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED,
     0x1B01A57B, 0x8208F4C1, 0xF50FC457, 0x65B0D9C6, 0x12B7E950,
     0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3,
     0xFBD44C65, 0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2,
     0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB, 0x4369E96A,
     0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5,
     0xAA0A4C5F, 0xDD0D7CC9, 0x5005713C, 0x270241AA, 0xBE0B1010,
     0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F,
     0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17,
     0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD, 0xEDB88320, 0x9ABFB3B6,
     0x03B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x04DB2615,
     0x73DC1683, 0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8,
     0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1, 0xF00F9344,
     0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB,
     0x196C3671, 0x6E6B06E7, 0xFED41B76, 0x89D32BE0, 0x10DA7A5A,
     0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5,
     0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1,
     0xA6BC5767, 0x3FB506DD, 0x48B2364B, 0xD80D2BDA, 0xAF0A1B4C,
     0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF,
     0x4669BE79, 0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236,
     0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F, 0xC5BA3BBE,
     0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31,
     0x2CD99E8B, 0x5BDEAE1D, 0x9B64C2B0, 0xEC63F226, 0x756AA39C,
     0x026D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713,
     0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38, 0x92D28E9B,
     0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21, 0x86D3D2D4, 0xF1D4E242,
     0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1,
     0x18B74777, 0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C,
     0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45, 0xA00AE278,
     0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7,
     0x4969474D, 0x3E6E77DB, 0xAED16A4A, 0xD9D65ADC, 0x40DF0B66,
     0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9,
     0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605,
     0xCDD70693, 0x54DE5729, 0x23D967BF, 0xB3667A2E, 0xC4614AB8,
     0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B,
     0x2D02EF8D],

    crc32: function crc32(data) {
      var tbl = AWS.util.crypto.crc32Table;
      var crc = 0 ^ -1;

      if (typeof data === 'string') {
        data = new Buffer(data);
      }

      for (var i = 0; i < data.length; i++) {
        var code = data.readUInt8(i);
        crc = (crc >>> 8) ^ tbl[(crc ^ code) & 0xFF];
      }
      return (crc ^ -1) >>> 0;
    },

    hmac: function hmac(key, string, digest, fn) {
      if (!digest) digest = 'binary';
      if (digest === 'buffer') { digest = undefined; }
      if (!fn) fn = 'sha256';
      if (typeof string === 'string') string = new Buffer(string);
      return cryptoLib.createHmac(fn, key).update(string).digest(digest);
    },

    md5: function md5(data, digest) {
      if (!digest) { digest = 'binary'; }
      if (digest === 'buffer') { digest = undefined; }
      if (typeof data === 'string') data = new Buffer(data);
      return AWS.util.crypto.createHash('md5').update(data).digest(digest);
    },

    sha256: function sha256(string, digest) {
      if (!digest) { digest = 'binary'; }
      if (digest === 'buffer') { digest = undefined; }
      if (typeof string === 'string') string = new Buffer(string);
      return AWS.util.crypto.createHash('sha256').update(string).digest(digest);
    },

    toHex: function toHex(data) {
      var out = [];
      for (var i = 0; i < data.length; i++) {
        out.push(('0' + data.charCodeAt(i).toString(16)).substr(-2, 2));
      }
      return out.join('');
    },

    createHash: function createHash(algorithm) {
      return cryptoLib.createHash(algorithm);
    }

  },




  abort: {},

  each: function each(object, iterFunction) {
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        var ret = iterFunction.call(this, key, object[key]);
        if (ret === AWS.util.abort) break;
      }
    }
  },

  arrayEach: function arrayEach(array, iterFunction) {
    for (var idx in array) {
      if (array.hasOwnProperty(idx)) {
        var ret = iterFunction.call(this, array[idx], parseInt(idx, 10));
        if (ret === AWS.util.abort) break;
      }
    }
  },

  update: function update(obj1, obj2) {
    AWS.util.each(obj2, function iterator(key, item) {
      obj1[key] = item;
    });
    return obj1;
  },

  merge: function merge(obj1, obj2) {
    return AWS.util.update(AWS.util.copy(obj1), obj2);
  },

  copy: function copy(object) {
    if (object === null || object === undefined) return object;
    var dupe = {};
    for (var key in object) {
      dupe[key] = object[key];
    }
    return dupe;
  },

  isEmpty: function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return true;
  },

  isType: function isType(obj, type) {
    if (typeof type === 'function') type = AWS.util.typeName(type);
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  },

  typeName: function typeName(type) {
    if (type.hasOwnProperty('name')) return type.name;
    var str = type.toString();
    var match = str.match(/^\s*function (.+)\(/);
    return match ? match[1] : str;
  },

  error: function error(err, options) {
    var originalError = null;
    if (typeof err.message === 'string' && err.message !== '') {
      if (typeof options === 'string' || (options && options.message)) {
        originalError = AWS.util.copy(err);
        originalError.message = err.message;
      }
    }
    err.message = err.message || null;

    if (typeof options === 'string') {
      err.message = options;
    } else {
      AWS.util.update(err, options);
    }

    if (typeof Object.defineProperty === 'function') {
      Object.defineProperty(err, 'name', {writable: true, enumerable: false});
      Object.defineProperty(err, 'message', {enumerable: true});
    }

    err.name = err.name || err.code || 'Error';
    err.time = new Date();

    if (originalError) err.originalError = originalError;

    return err;
  },


  inherit: function inherit(klass, features) {
    var newObject = null;
    if (features === undefined) {
      features = klass;
      klass = Object;
      newObject = {};
    } else {
      var ctor = function ConstructorWrapper() {};
      ctor.prototype = klass.prototype;
      newObject = new ctor();
    }

    if (features.constructor === Object) {
      features.constructor = function() {
        if (klass !== Object) {
          return klass.apply(this, arguments);
        }
      };
    }

    features.constructor.prototype = newObject;
    AWS.util.update(features.constructor.prototype, features);
    features.constructor.__super__ = klass;
    return features.constructor;
  },


  mixin: function mixin() {
    var klass = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      for (var prop in arguments[i].prototype) {
        var fn = arguments[i].prototype[prop];
        if (prop !== 'constructor') {
          klass.prototype[prop] = fn;
        }
      }
    }
    return klass;
  },


  hideProperties: function hideProperties(obj, props) {
    if (typeof Object.defineProperty !== 'function') return;

    AWS.util.arrayEach(props, function (key) {
      Object.defineProperty(obj, key, {
        enumerable: false, writable: true, configurable: true });
    });
  }
};

module.exports = AWS.util;

}).call(this,{browser:true})
},{"./core":3,"buffer":39,"crypto":43,"fs":38,"url":54}],32:[function(require,module,exports){
var AWS = require('../core');
var inherit = AWS.util.inherit;


AWS.XML.Parser = inherit({
  constructor: function XMLParser(rules) {
    this.rules = (rules || {}).members || {};
  },

  parse: function parse(xml) {
    if (xml.replace(/^\s+/, '') === '') return {};

    var result, error;
    try {
      if (window.DOMParser) {
        var parser = new DOMParser();
        result = parser.parseFromString(xml, 'text/xml');

        if (result.documentElement === null) {
          throw new Error('Cannot parse empty document.');
        }

        var isError = result.getElementsByTagName('parsererror')[0];
        if (isError && (isError.parentNode === result ||
            isError.parentNode.nodeName === 'body')) {
          throw new Error(isError.getElementsByTagName('div')[0].textContent);
        }
      } else if (window.ActiveXObject) {
        result = new window.ActiveXObject('Microsoft.XMLDOM');
        result.async = false;
 
        if (!result.loadXML(xml)) {
          throw new Error('Parse error in document');
        }
      } else {
        throw new Error('Cannot load XML parser');
      }
    } catch (e) {
      error = e;
    }

    if (result && result.documentElement && !error) {
      return this.parseStructure(result.documentElement, this.rules);
    } else if (error) {
      throw AWS.util.error(error || new Error(), {code: 'XMLParserError'});
    } else { // empty xml document
      return {};
    }
  },

  parseStructure: function parseStructure(structure, rules) {
    var data = {};

    AWS.util.each.call(this, rules, function(memberName, memberRules) {
      if (memberRules.type === 'list') {
        data[memberRules.name || memberName] = [];
      }
    });

    for (var j = 0; j < structure.attributes.length; j++) {
      var attr = structure.attributes[j];
      var attrRule = rules[attr.name];
      if (attrRule) {
        var value = this.parseMember({ textContent: attr.value }, attrRule);
        data[attrRule.name || attr.name] = value;
      }
    }

    var child = structure.firstElementChild;
    while (child) {
      var rule = rules[child.nodeName] || {};
      var key = rule.name || child.nodeName;
      var inData = rule.flattened ? data[key] : null;
      data[key] = this.parseMember(child, rule, inData);
      child = child.nextElementSibling;
    }

    return data;
  },

  parseMap: function parseMap(map, rules, data) {
    data = data || {};
    var keyRules = rules.keys || {};
    var valueRules = rules.members || {};
    var keyName = keyRules.name || 'key';
    var valueName = valueRules.name || 'value';

    function run(item) {
      var key = item.getElementsByTagName(keyName)[0].textContent;
      var value = item.getElementsByTagName(valueName)[0];
      value = this.parseMember(value, valueRules);
      data[key] = value;
    }

    if (rules.flattened) {
      run.call(this, map);
    } else {
      var child = map.firstElementChild;
      while (child) {
        run.call(this, child);
        child = child.nextElementSibling;
      }
    }
    return data;
  },

  parseList: function parseList(list, rules, data) {
    data = data || [];
    var memberRules = rules.members || {};
    var memberName = memberRules.name || 'member';
    if (rules.flattened) {
      data.push(this.parseMember(list, memberRules));
    } else {
      var child = list.firstElementChild;
      while (child) {
        if (child.nodeName === memberName) {
          data.push(this.parseMember(child, memberRules));
        }
        child = child.nextElementSibling;
      }
    }
    return data;
  },

  parseMember: function parseMember(member, rules, data) {
    if (!rules.type) {
      if (member.childElementCount > 0) {
        rules.type = 'structure';
      } else {
        rules.type = 'string';
      }
    }

    if (rules.type === 'structure') {
      return this.parseStructure(member, rules.members || {}, data);
    } else if (rules.type === 'list') {
      return this.parseList(member, rules, data);
    } else if (rules.type === 'map') {
      return this.parseMap(member, rules, data);
    }

    if (rules.type === 'string') {
      if (member.attributes && member.attributes.encoding &&
          member.attributes.encoding.value === 'base64') {
        return AWS.util.base64.decode(member.textContent);
      } else {
        return member.textContent;
      }
    }

    if (member.textContent === '') return null;

    if (rules.type === 'integer') {
      return parseInt(member.textContent, 10);
    } else if (rules.type === 'float') {
      return parseFloat(member.textContent);
    } else if (rules.type === 'timestamp') {
      return AWS.util.date.parseTimestamp(member.textContent);
    } else if (rules.type === 'boolean') {
      return member.textContent === 'true';
    } else {
      var msg = 'unhandled type: ' + rules.type;
      throw AWS.util.error(new Error(msg), {code: 'XMLParserError'});
    }
  }
});

},{"../core":3}],33:[function(require,module,exports){
var AWS = require('../core');
var builder = require('xmlbuilder');
var inherit = AWS.util.inherit;


AWS.XML.Builder = inherit({

  constructor: function XMLBuilder(root, rules, options) {
    this.root = root;
    this.rules = rules;
    this.xmlns = options.xmlnamespace;
    this.timestampFormat = options.timestampFormat;
  },

  toXML: function toXML(params) {
    var xml = builder.create(this.root);
    if (this.xmlns) xml.att('xmlns', this.xmlns);
    this.serializeStructure(this.rules, params, xml);
    return xml.root().toString();
  },

  serializeStructure: function serializeStructure(rules, params, xml) {
    AWS.util.each.call(this, rules || {}, function (memberName, memberRules) {
      var value = params[memberName];
      if (value !== undefined) {
        if (memberRules.attribute) {
          xml.att(memberRules.name, value);
        } else {
          this.serializeMember(memberName, memberRules, value, xml);
        }
      }
    });
  },

  serializeList: function serializeList(name, rules, list, xml) {
    if (rules.flattened) {
      AWS.util.arrayEach.call(this, list, function (value) {
        this.serializeMember(rules.name || name, rules.members, value, xml);
      });
    } else {
      xml = xml.ele(rules.name || name);
      AWS.util.arrayEach.call(this, list, function (value) {
        var memberName = rules.members.name || 'member';
        this.serializeMember(memberName, rules.members, value, xml);
      });
    }
  },

  serializeMember: function serializeMember(memberName, rules, params, xml) {
    if (params === null || params === undefined) return;

    var name = memberName;
    if (rules.type === 'structure') {
      xml = xml.ele(name);
      this.serializeStructure(rules.members, params, xml);
    } else if (rules.type === 'list') {
      this.serializeList(name, rules, params, xml);
    } else if (rules.type === 'timestamp') {
      var timestampFormat = rules.format || this.timestampFormat;
      var date = AWS.util.date.format(params, timestampFormat);
      xml = xml.ele(name, String(date));
    } else {
      xml = xml.ele(name, String(params));
    }
    this.applyNamespaces(xml, rules);
  },

  applyNamespaces: function applyNamespaces(xml, rules) {
    if (rules.xmlns) {
      var attr = 'xmlns';
      if (rules.xmlns.prefix) attr += ':' + rules.xmlns.prefix;
      xml.att(attr, rules.xmlns.uri);
    }
  }


});

},{"../core":3,"xmlbuilder":37}],34:[function(require,module,exports){



var Buffer = require('buffer').Buffer;



var abort = {};

function each(obj, iter) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var ret = iter(key, obj[key]);
      if (ret === abort) break;
    }
  }
}

function copy(object) {
  if (object === null || object === undefined) return object;
  var dupe = {};
  for (var key in object) {
    dupe[key] = object[key];
  }
  return dupe;
}

function update(a, b) {
  each(b, function iterator(key, value) { a[key] = value; });
  return a;
}

function merge(a, b) {
  return update(copy(a), b);
}



function Shape(rules, options) {
  if (!rules) {
    this.rules = { type: 'structure', members: {} };
    return;
  }

  this.options = options;
  this.rules = {};
  this.set_type(rules.type);
  each(rules, function(key, value) {
    if (key !== 'type') this['set_' + key](value);
  }.bind(this));

  if (this.rules.type === 'blob') {
    if (this.rules.payload || this.rules.streaming) {
      this.rules.type = 'binary';
    } else {
      this.rules.type = 'base64';
    }
  }
}

function InputShape(rules, options) {
  Shape.call(this, rules, options);
}

function OutputShape(rules, options) {
  Shape.call(this, rules, options);
}


Shape.prototype = {
  shapeClass: function() {
    if (this instanceof InputShape) return InputShape;
    if (this instanceof OutputShape) return OutputShape;
  },

  xmlname: function() {
    if (this.rules.flattened) {
      return this._xmlname || (this.rules.members || {}).name;
    } else {
      return this._xmlname;
    }
  },

  set_type: function(name) {
    var types = {
      structure: 'structure',
      list: 'list',
      map: 'map',
      boolean: 'boolean',
      timestamp: 'timestamp',
      character: 'string',
      double: 'float',
      float: 'float',
      integer: 'integer',
      long: 'integer',
      short: 'integer',
      string: 'string',
      blob: 'blob',
      biginteger: 'integer',
      bigdecimal: 'float'
    };
    if (name === 'string') { // omit string to reduce size
      return;
    } else if (types[name]) {
      this.rules.type = types[name];
    } else {
      throw new Error('unhandled shape type ' + name);
    }
  },

  set_members: function(members) {
    var type = this.rules.type;
    var ShapeClass = this.shapeClass();
    if (type === 'structure') {
      this.rules.members = {};
      each(members, function(memberName, memberRules) {
        var shape = new ShapeClass(memberRules, this.options);
        if (this.swapNames(shape)) {
          shape.rules.name = memberName;
          memberName = shape.xmlname();
        }
        this.rules.members[memberName] = shape.rules;
      }.bind(this));
    } else if (type === 'list') {
      this.rules.members = new ShapeClass(members, this.options).rules;
    } else if (type === 'map') {
      this.rules.members = new ShapeClass(members, this.options).rules;
    } else if (type === 'blob') {
      this.rules.members = {};
    } else {
      throw new Error('unhandled complex shape `' + type + '\'');
    }
  },

  set_keys: function(rules) {
    var ShapeClass = this.shapeClass();
    this.rules.keys = new ShapeClass(rules, this.options).rules;
  },

  set_timestamp_format: function(format) {
    this.rules.format = format;
  },

  set_xmlname: function(name) {
    this._xmlname = name;
    this.rules.name = name;
  },

  set_location: function (location) {
    this.rules.location = (location === 'http_status' ? 'status' : location);
  },

  set_location_name: function(header_name) {
    this.rules.name = header_name;
  },

  set_payload: function(state) {
    if (state) this.rules.payload = true;
  },

  set_flattened: function(state) {
    if (state) this.rules.flattened = true;
  },

  set_streaming: function(state) {
    if (state) this.rules.streaming = true;
  },

  set_xmlattribute: function(state) {
    if (state) this.rules.attribute = true;
  },

  set_xmlnamespace: function(ns) {
    this.rules.xmlns = ns;
  },

  set_documentation: function(docs) {
    if (this.options.documentation) this.rules.documentation = docs;
  },

  set_enum: function(values) {
    if (this.options.documentation) this.rules['enum'] = values;
  },

  set_wrapper: function() {},
  set_shape_name: function() {},
  set_box: function() {},
  set_sensitive: function() {}
};

InputShape.prototype = merge(Shape.prototype, {
  swapNames: function() { return false; },

  set_required: function() { this.rules.required = true; },
  set_member_order: function(order) { this.rules.order = order; },

  set_min_length: function(min) {
    if (this.options.documentation) this.rules.min_length = min;
  },

  set_max_length: function(max) {
    if (this.options.documentation) this.rules.max_length = max;
  },

  set_pattern: function(pattern) {
    if (this.options.documentation) this.rules.pattern = pattern;
  }
});

OutputShape.prototype = merge(Shape.prototype, {
  swapNames: function(shape) {
    if (this.options.documentation) return false;
    return shape.xmlname() && ['query', 'rest-xml'].indexOf(this.options.type) >= 0;
  },

  set_required: function() {},
  set_member_order: function() {},
  set_min_length: function() {},
  set_max_length: function() {},
  set_pattern: function() {}
});

function Operation(rules, options) {
  var origRules = rules;

  function normalizeInputs() {
    if (options.type.indexOf('rest') < 0) return;

    var xml = options.type.indexOf('xml') >= 0;
    var payload = false;
    var wrapper = false;

    var hasPayload = false;
    each(rules.input.members, function(name, rule) {
      if (rule.payload) {
        hasPayload = true;
        payload = name;
        delete rule.payload;
        return abort;
      }
    });

    if (!hasPayload) {
      var list = [];
      each(rules.input.members, function(name, rule) {
        if (!rule.location) { list.push(name); }
      });

      if (list.length > 0) {
        payload = list;
        if (xml) wrapper = origRules.input.shape_name;
      }
    }

    if (wrapper) rules.input = merge({wrapper: wrapper}, rules.input);
    if (payload) rules.input = merge({payload: payload}, rules.input);
  }

  function normalizeOutputs() {
    var moveUp = null;

    each(rules.output.members, function(memberName, rule) {
      if (rule.payload && rule.type === 'structure') {
        delete rule.payload;
        moveUp = memberName;
      }
      else if (rule.payload || rule.streaming) {
        delete rule.payload;
        rules.output.payload = memberName;
      }
    });

    if (moveUp) {
      var rule = rules.output.members[moveUp];
      delete rules.output.members[moveUp];
      update(rules.output.members, rule.members);
    }
  }

  rules = copy(rules);

  rules.input = new InputShape(rules.input, options).rules;
  rules.output = new OutputShape(rules.output, options).rules;
  rules.input.members = rules.input.members || {};
  rules.output.members = rules.output.members || {};

  normalizeInputs();
  normalizeOutputs();

  if (rules.http) delete rules.http.response_code;
  if (options.documentation) {
    rules.errors = rules.errors.map(function(e) { return e.shape_name; });
  } else {
    delete rules.errors;
    delete rules.documentation;
    delete rules.documentation_url;
    delete rules.response_code;
  }

  return rules;
}

function Translator(api, options) {
  var translate = {};

  function inflect(key) {
    return key.replace(/_(\w)/g, function (_, m) { return m.toUpperCase(); });
  }

  function setTranslatedKeys() {
    var list = Object.keys(api);
    list.push('timestamp_format');
    list.sort().forEach(function (key) { translate[inflect(key)] = api[key]; });
    translate.timestampFormat = translate.timestampFormat || 'iso8601';
    if (translate.jsonVersion) translate.jsonVersion = translate.jsonVersion.toString();
    if (translate.jsonVersion === '1') translate.jsonVersion = '1.0';
    if (!options.documentation) delete translate.documentation;
    if (!translate.resultWrapped) delete translate.resultWrapped;
    if (!api.type.match(/xml/)) delete translate.xmlnamespace;
    delete translate.operations;
    delete translate.pagination;
    delete translate.waiters;
    delete translate.type;
  }

  function setOperations() {
    translate.operations = {};
    each(api.operations, function (key, value) {
      var methodName = key[0].toLowerCase() + key.substr(1);
      methodName = methodName.replace(/\d{4}_\d{2}_\d{2}$/, '');
      var operation = new Operation(value, options);
      translate.operations[methodName] = operation;
    });
  }

  function setPagination() {
    if (api.pagination) {
      translate.pagination = {};
      each(api.pagination, function (key, value) {
        var object = {};
        each(value, function (k2, v2) { object[inflect(k2)] = v2; });
        translate.pagination[key[0].toLowerCase() + key.substr(1)] = object;
      });
    }
  }

  function setWaiters() {
    if (api.waiters) {
      translate.waiters = {};
      each(api.waiters, function (key, value) {
        var object = {};
        each(value, function (k2, v2) { object[inflect(k2)] = v2; });
        translate.waiters[key[0].toLowerCase() + key.substr(1)] = object;
      });
    }
  }

  if (typeof api === 'string' || Buffer.isBuffer(api)) {
    api = JSON.parse(api);
  }

  options = options || {};
  options.type = api.type;

  translate.format = api.type;

  setTranslatedKeys();
  setOperations();
  setPagination();
  setWaiters();

  return translate;
}

module.exports = Translator;

},{"buffer":39}],35:[function(require,module,exports){
(function() {
  var XMLBuilder, XMLFragment;

  XMLFragment = require('./XMLFragment');

  XMLBuilder = (function() {

    function XMLBuilder(name, xmldec, doctype) {
      var att, child, _ref;
      this.children = [];
      this.rootObject = null;
      if (this.is(name, 'Object')) {
        _ref = [name, xmldec], xmldec = _ref[0], doctype = _ref[1];
        name = null;
      }
      if (name != null) {
        name = '' + name || '';
        if (xmldec == null) {
          xmldec = {
            'version': '1.0'
          };
        }
      }
      if ((xmldec != null) && !(xmldec.version != null)) {
        throw new Error("Version number is required");
      }
      if (xmldec != null) {
        xmldec.version = '' + xmldec.version || '';
        if (!xmldec.version.match(/1\.[0-9]+/)) {
          throw new Error("Invalid version number: " + xmldec.version);
        }
        att = {
          version: xmldec.version
        };
        if (xmldec.encoding != null) {
          xmldec.encoding = '' + xmldec.encoding || '';
          if (!xmldec.encoding.match(/[A-Za-z](?:[A-Za-z0-9._-]|-)*/)) {
            throw new Error("Invalid encoding: " + xmldec.encoding);
          }
          att.encoding = xmldec.encoding;
        }
        if (xmldec.standalone != null) {
          att.standalone = xmldec.standalone ? "yes" : "no";
        }
        child = new XMLFragment(this, '?xml', att);
        this.children.push(child);
      }
      if (doctype != null) {
        att = {};
        if (name != null) {
          att.name = name;
        }
        if (doctype.ext != null) {
          doctype.ext = '' + doctype.ext || '';
          att.ext = doctype.ext;
        }
        child = new XMLFragment(this, '!DOCTYPE', att);
        this.children.push(child);
      }
      if (name != null) {
        this.begin(name);
      }
    }

    XMLBuilder.prototype.begin = function(name, xmldec, doctype) {
      var doc, root;
      if (!(name != null)) {
        throw new Error("Root element needs a name");
      }
      if (this.rootObject) {
        this.children = [];
        this.rootObject = null;
      }
      if (xmldec != null) {
        doc = new XMLBuilder(name, xmldec, doctype);
        return doc.root();
      }
      name = '' + name || '';
      root = new XMLFragment(this, name, {});
      root.isRoot = true;
      root.documentObject = this;
      this.children.push(root);
      this.rootObject = root;
      return root;
    };

    XMLBuilder.prototype.root = function() {
      return this.rootObject;
    };

    XMLBuilder.prototype.end = function(options) {
      return toString(options);
    };

    XMLBuilder.prototype.toString = function(options) {
      var child, r, _i, _len, _ref;
      r = '';
      _ref = this.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        r += child.toString(options);
      }
      return r;
    };

    XMLBuilder.prototype.is = function(obj, type) {
      var clas;
      clas = Object.prototype.toString.call(obj).slice(8, -1);
      return (obj != null) && clas === type;
    };

    return XMLBuilder;

  })();

  module.exports = XMLBuilder;

}).call(this);

},{"./XMLFragment":36}],36:[function(require,module,exports){
(function() {
  var XMLFragment,
    __hasProp = {}.hasOwnProperty;

  XMLFragment = (function() {

    function XMLFragment(parent, name, attributes, text) {
      this.isRoot = false;
      this.documentObject = null;
      this.parent = parent;
      this.name = name;
      this.attributes = attributes;
      this.value = text;
      this.children = [];
    }

    XMLFragment.prototype.element = function(name, attributes, text) {
      var child, key, val, _ref, _ref1;
      if (!(name != null)) {
        throw new Error("Missing element name");
      }
      name = '' + name || '';
      this.assertLegalChar(name);
      if (attributes == null) {
        attributes = {};
      }
      if (this.is(attributes, 'String') && this.is(text, 'Object')) {
        _ref = [text, attributes], attributes = _ref[0], text = _ref[1];
      } else if (this.is(attributes, 'String')) {
        _ref1 = [{}, attributes], attributes = _ref1[0], text = _ref1[1];
      }
      for (key in attributes) {
        if (!__hasProp.call(attributes, key)) continue;
        val = attributes[key];
        val = '' + val || '';
        attributes[key] = this.escape(val);
      }
      child = new XMLFragment(this, name, attributes);
      if (text != null) {
        text = '' + text || '';
        text = this.escape(text);
        this.assertLegalChar(text);
        child.raw(text);
      }
      this.children.push(child);
      return child;
    };

    XMLFragment.prototype.insertBefore = function(name, attributes, text) {
      var child, i, key, val, _ref, _ref1;
      if (this.isRoot) {
        throw new Error("Cannot insert elements at root level");
      }
      if (!(name != null)) {
        throw new Error("Missing element name");
      }
      name = '' + name || '';
      this.assertLegalChar(name);
      if (attributes == null) {
        attributes = {};
      }
      if (this.is(attributes, 'String') && this.is(text, 'Object')) {
        _ref = [text, attributes], attributes = _ref[0], text = _ref[1];
      } else if (this.is(attributes, 'String')) {
        _ref1 = [{}, attributes], attributes = _ref1[0], text = _ref1[1];
      }
      for (key in attributes) {
        if (!__hasProp.call(attributes, key)) continue;
        val = attributes[key];
        val = '' + val || '';
        attributes[key] = this.escape(val);
      }
      child = new XMLFragment(this.parent, name, attributes);
      if (text != null) {
        text = '' + text || '';
        text = this.escape(text);
        this.assertLegalChar(text);
        child.raw(text);
      }
      i = this.parent.children.indexOf(this);
      this.parent.children.splice(i, 0, child);
      return child;
    };

    XMLFragment.prototype.insertAfter = function(name, attributes, text) {
      var child, i, key, val, _ref, _ref1;
      if (this.isRoot) {
        throw new Error("Cannot insert elements at root level");
      }
      if (!(name != null)) {
        throw new Error("Missing element name");
      }
      name = '' + name || '';
      this.assertLegalChar(name);
      if (attributes == null) {
        attributes = {};
      }
      if (this.is(attributes, 'String') && this.is(text, 'Object')) {
        _ref = [text, attributes], attributes = _ref[0], text = _ref[1];
      } else if (this.is(attributes, 'String')) {
        _ref1 = [{}, attributes], attributes = _ref1[0], text = _ref1[1];
      }
      for (key in attributes) {
        if (!__hasProp.call(attributes, key)) continue;
        val = attributes[key];
        val = '' + val || '';
        attributes[key] = this.escape(val);
      }
      child = new XMLFragment(this.parent, name, attributes);
      if (text != null) {
        text = '' + text || '';
        text = this.escape(text);
        this.assertLegalChar(text);
        child.raw(text);
      }
      i = this.parent.children.indexOf(this);
      this.parent.children.splice(i + 1, 0, child);
      return child;
    };

    XMLFragment.prototype.remove = function() {
      var i, _ref;
      if (this.isRoot) {
        throw new Error("Cannot remove the root element");
      }
      i = this.parent.children.indexOf(this);
      [].splice.apply(this.parent.children, [i, i - i + 1].concat(_ref = [])), _ref;
      return this.parent;
    };

    XMLFragment.prototype.text = function(value) {
      var child;
      if (!(value != null)) {
        throw new Error("Missing element text");
      }
      value = '' + value || '';
      value = this.escape(value);
      this.assertLegalChar(value);
      child = new XMLFragment(this, '', {}, value);
      this.children.push(child);
      return this;
    };

    XMLFragment.prototype.cdata = function(value) {
      var child;
      if (!(value != null)) {
        throw new Error("Missing CDATA text");
      }
      value = '' + value || '';
      this.assertLegalChar(value);
      if (value.match(/]]>/)) {
        throw new Error("Invalid CDATA text: " + value);
      }
      child = new XMLFragment(this, '', {}, '<![CDATA[' + value + ']]>');
      this.children.push(child);
      return this;
    };

    XMLFragment.prototype.comment = function(value) {
      var child;
      if (!(value != null)) {
        throw new Error("Missing comment text");
      }
      value = '' + value || '';
      value = this.escape(value);
      this.assertLegalChar(value);
      if (value.match(/--/)) {
        throw new Error("Comment text cannot contain double-hypen: " + value);
      }
      child = new XMLFragment(this, '', {}, '<!-- ' + value + ' -->');
      this.children.push(child);
      return this;
    };

    XMLFragment.prototype.raw = function(value) {
      var child;
      if (!(value != null)) {
        throw new Error("Missing raw text");
      }
      value = '' + value || '';
      child = new XMLFragment(this, '', {}, value);
      this.children.push(child);
      return this;
    };

    XMLFragment.prototype.up = function() {
      if (this.isRoot) {
        throw new Error("This node has no parent. Use doc() if you need to get the document object.");
      }
      return this.parent;
    };

    XMLFragment.prototype.root = function() {
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

    XMLFragment.prototype.document = function() {
      return this.root().documentObject;
    };

    XMLFragment.prototype.end = function(options) {
      return this.document().toString(options);
    };

    XMLFragment.prototype.prev = function() {
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

    XMLFragment.prototype.next = function() {
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

    XMLFragment.prototype.clone = function(deep) {
      var clonedSelf;
      clonedSelf = new XMLFragment(this.parent, this.name, this.attributes, this.value);
      if (deep) {
        this.children.forEach(function(child) {
          var clonedChild;
          clonedChild = child.clone(deep);
          clonedChild.parent = clonedSelf;
          return clonedSelf.children.push(clonedChild);
        });
      }
      return clonedSelf;
    };

    XMLFragment.prototype.importXMLBuilder = function(xmlbuilder) {
      var clonedRoot;
      clonedRoot = xmlbuilder.root().clone(true);
      clonedRoot.parent = this;
      this.children.push(clonedRoot);
      clonedRoot.isRoot = false;
      return this;
    };

    XMLFragment.prototype.attribute = function(name, value) {
      var _ref;
      if (!(name != null)) {
        throw new Error("Missing attribute name");
      }
      if (!(value != null)) {
        throw new Error("Missing attribute value");
      }
      name = '' + name || '';
      value = '' + value || '';
      if ((_ref = this.attributes) == null) {
        this.attributes = {};
      }
      this.attributes[name] = this.escape(value);
      return this;
    };

    XMLFragment.prototype.removeAttribute = function(name) {
      if (!(name != null)) {
        throw new Error("Missing attribute name");
      }
      name = '' + name || '';
      delete this.attributes[name];
      return this;
    };

    XMLFragment.prototype.toString = function(options, level) {
      var attName, attValue, child, indent, newline, pretty, r, space, _i, _len, _ref, _ref1;
      pretty = (options != null) && options.pretty || false;
      indent = (options != null) && options.indent || '  ';
      newline = (options != null) && options.newline || '\n';
      level || (level = 0);
      space = new Array(level + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      if (!(this.value != null)) {
        r += '<' + this.name;
      } else {
        r += '' + this.value;
      }
      _ref = this.attributes;
      for (attName in _ref) {
        attValue = _ref[attName];
        if (this.name === '!DOCTYPE') {
          r += ' ' + attValue;
        } else {
          r += ' ' + attName + '="' + attValue + '"';
        }
      }
      if (this.children.length === 0) {
        if (!(this.value != null)) {
          r += this.name === '?xml' ? '?>' : this.name === '!DOCTYPE' ? '>' : '/>';
        }
        if (pretty) {
          r += newline;
        }
      } else if (pretty && this.children.length === 1 && this.children[0].value) {
        r += '>';
        r += this.children[0].value;
        r += '</' + this.name + '>';
        r += newline;
      } else {
        r += '>';
        if (pretty) {
          r += newline;
        }
        _ref1 = this.children;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          child = _ref1[_i];
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

    XMLFragment.prototype.escape = function(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&apos;').replace(/"/g, '&quot;');
    };

    XMLFragment.prototype.assertLegalChar = function(str) {
      var chars, chr;
      chars = /[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uD800-\uDFFF\uFFFE-\uFFFF]/;
      chr = str.match(chars);
      if (chr) {
        throw new Error("Invalid character (" + chr + ") in string: " + str);
      }
    };

    XMLFragment.prototype.is = function(obj, type) {
      var clas;
      clas = Object.prototype.toString.call(obj).slice(8, -1);
      return (obj != null) && clas === type;
    };

    XMLFragment.prototype.ele = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLFragment.prototype.txt = function(value) {
      return this.text(value);
    };

    XMLFragment.prototype.dat = function(value) {
      return this.cdata(value);
    };

    XMLFragment.prototype.att = function(name, value) {
      return this.attribute(name, value);
    };

    XMLFragment.prototype.com = function(value) {
      return this.comment(value);
    };

    XMLFragment.prototype.doc = function() {
      return this.document();
    };

    XMLFragment.prototype.e = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLFragment.prototype.t = function(value) {
      return this.text(value);
    };

    XMLFragment.prototype.d = function(value) {
      return this.cdata(value);
    };

    XMLFragment.prototype.a = function(name, value) {
      return this.attribute(name, value);
    };

    XMLFragment.prototype.c = function(value) {
      return this.comment(value);
    };

    XMLFragment.prototype.r = function(value) {
      return this.raw(value);
    };

    XMLFragment.prototype.u = function() {
      return this.up();
    };

    return XMLFragment;

  })();

  module.exports = XMLFragment;

}).call(this);

},{}],37:[function(require,module,exports){
(function() {
  var XMLBuilder;

  XMLBuilder = require('./XMLBuilder');

  module.exports.create = function(name, xmldec, doctype) {
    if (name != null) {
      return new XMLBuilder(name, xmldec, doctype).root();
    } else {
      return new XMLBuilder();
    }
  };

}).call(this);

},{"./XMLBuilder":35}],38:[function(require,module,exports){

},{}],39:[function(require,module,exports){


var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192


Buffer._useTypedArrays = (function () {
  if (typeof Uint8Array !== 'function' || typeof ArrayBuffer !== 'function')
    return false

  try {
    var arr = new Uint8Array(0)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()


function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // Assume object is an array
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    buf = augment(new Uint8Array(length))
  } else {
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof Uint8Array === 'function' &&
      subject instanceof Uint8Array) {
    buf._set(subject)
  } else if (isArrayish(subject)) {
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
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

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
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


function _hexWrite (buf, string, offset, length) {
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

  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
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
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  for (var i = 0; i < end - start; i++)
    target[i + target_start] = this[i + start]
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
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

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}


Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array === 'function') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}


function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype


function augment (arr) {
  arr._isBuffer = true

  arr._get = arr.get
  arr._set = arr.set

  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
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

function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
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
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
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
  var pos
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


function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

},{"base64-js":40,"ieee754":41}],40:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var ZERO   = '0'.charCodeAt(0)
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

		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		arr = new Arr(b64.length * 3 / 4 - placeHolders)

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

		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

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

	module.exports.toByteArray = b64ToByteArray
	module.exports.fromByteArray = uint8ToBase64
}())

},{}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
var Buffer = require('buffer').Buffer;
var intSize = 4;
var zeroBuffer = new Buffer(intSize); zeroBuffer.fill(0);
var chrsz = 8;

function toArray(buf, bigEndian) {
  if ((buf.length % intSize) !== 0) {
    var len = buf.length + (intSize - (buf.length % intSize));
    buf = Buffer.concat([buf, zeroBuffer], len);
  }

  var arr = [];
  var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
  for (var i = 0; i < buf.length; i += intSize) {
    arr.push(fn.call(buf, i));
  }
  return arr;
}

function toBuffer(arr, size, bigEndian) {
  var buf = new Buffer(size);
  var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
  for (var i = 0; i < arr.length; i++) {
    fn.call(buf, arr[i], i * 4, true);
  }
  return buf;
}

function hash(buf, fn, hashSize, bigEndian) {
  if (!Buffer.isBuffer(buf)) buf = new Buffer(buf);
  var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
  return toBuffer(arr, hashSize, bigEndian);
}

module.exports = { hash: hash };

},{"buffer":39}],43:[function(require,module,exports){
var Buffer = require('buffer').Buffer
var sha = require('./sha')
var sha256 = require('./sha256')
var rng = require('./rng')
var md5 = require('./md5')

var algorithms = {
  sha1: sha,
  sha256: sha256,
  md5: md5
}

var blocksize = 64
var zeroBuffer = new Buffer(blocksize); zeroBuffer.fill(0)
function hmac(fn, key, data) {
  if(!Buffer.isBuffer(key)) key = new Buffer(key)
  if(!Buffer.isBuffer(data)) data = new Buffer(data)

  if(key.length > blocksize) {
    key = fn(key)
  } else if(key.length < blocksize) {
    key = Buffer.concat([key, zeroBuffer], blocksize)
  }

  var ipad = new Buffer(blocksize), opad = new Buffer(blocksize)
  for(var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }

  var hash = fn(Buffer.concat([ipad, data]))
  return fn(Buffer.concat([opad, hash]))
}

function hash(alg, key) {
  alg = alg || 'sha1'
  var fn = algorithms[alg]
  var bufs = []
  var length = 0
  if(!fn) error('algorithm:', alg, 'is not yet supported')
  return {
    update: function (data) {
      if(!Buffer.isBuffer(data)) data = new Buffer(data)
        
      bufs.push(data)
      length += data.length
      return this
    },
    digest: function (enc) {
      var buf = Buffer.concat(bufs)
      var r = key ? hmac(fn, key, buf) : fn(buf)
      bufs = null
      return enc ? r.toString(enc) : r
    }
  }
}

function error () {
  var m = [].slice.call(arguments).join(' ')
  throw new Error([
    m,
    'we accept pull requests',
    'http://github.com/dominictarr/crypto-browserify'
    ].join('\n'))
}

exports.createHash = function (alg) { return hash(alg) }
exports.createHmac = function (alg, key) { return hash(alg, key) }
exports.randomBytes = function(size, callback) {
  if (callback && callback.call) {
    try {
      callback.call(this, undefined, new Buffer(rng(size)))
    } catch (err) { callback(err) }
  } else {
    return new Buffer(rng(size))
  }
}

function each(a, f) {
  for(var i in a)
    f(a[i], i)
}

each(['createCredentials'
, 'createCipher'
, 'createCipheriv'
, 'createDecipher'
, 'createDecipheriv'
, 'createSign'
, 'createVerify'
, 'createDiffieHellman'
, 'pbkdf2'], function (name) {
  exports[name] = function () {
    error('sorry,', name, 'is not implemented yet')
  }
})

},{"./md5":44,"./rng":45,"./sha":46,"./sha256":47,"buffer":39}],44:[function(require,module,exports){


var helpers = require('./helpers');


function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}


function core_md5(x, len)
{

  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}


function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}


function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}


function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

module.exports = function md5(buf) {
  return helpers.hash(buf, core_md5, 16);
};

},{"./helpers":42}],45:[function(require,module,exports){
(function() {
  var _global = this;

  var mathRNG, whatwgRNG;

  mathRNG = function(size) {
    var bytes = new Array(size);
    var r;

    for (var i = 0, r; i < size; i++) {
      if ((i & 0x03) == 0) r = Math.random() * 0x100000000;
      bytes[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return bytes;
  }

  if (_global.crypto && crypto.getRandomValues) {
    whatwgRNG = function(size) {
      var bytes = new Uint8Array(size);
      crypto.getRandomValues(bytes);
      return bytes;
    }
  }

  module.exports = whatwgRNG || mathRNG;

}())

},{}],46:[function(require,module,exports){


var helpers = require('./helpers');


function core_sha1(x, len)
{

  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}


function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}


function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}


function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}


function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

module.exports = function sha1(buf) {
  return helpers.hash(buf, core_sha1, 20, true);
};

},{"./helpers":42}],47:[function(require,module,exports){



var helpers = require('./helpers');

var safe_add = function(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
};

var S = function(X, n) {
  return (X >>> n) | (X << (32 - n));
};

var R = function(X, n) {
  return (X >>> n);
};

var Ch = function(x, y, z) {
  return ((x & y) ^ ((~x) & z));
};

var Maj = function(x, y, z) {
  return ((x & y) ^ (x & z) ^ (y & z));
};

var Sigma0256 = function(x) {
  return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
};

var Sigma1256 = function(x) {
  return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
};

var Gamma0256 = function(x) {
  return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
};

var Gamma1256 = function(x) {
  return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
};

var core_sha256 = function(m, l) {
  var K = new Array(0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0xFC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x6CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2);
  var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;

  m[l >> 5] |= 0x80 << (24 - l % 32);
  m[((l + 64 >> 9) << 4) + 15] = l;
  for (var i = 0; i < m.length; i += 16) {
    a = HASH[0]; b = HASH[1]; c = HASH[2]; d = HASH[3]; e = HASH[4]; f = HASH[5]; g = HASH[6]; h = HASH[7];
    for (var j = 0; j < 64; j++) {
      if (j < 16) {
        W[j] = m[j + i];
      } else {
        W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
      }
      T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
      T2 = safe_add(Sigma0256(a), Maj(a, b, c));
      h = g; g = f; f = e; e = safe_add(d, T1); d = c; c = b; b = a; a = safe_add(T1, T2);
    }
    HASH[0] = safe_add(a, HASH[0]); HASH[1] = safe_add(b, HASH[1]); HASH[2] = safe_add(c, HASH[2]); HASH[3] = safe_add(d, HASH[3]);
    HASH[4] = safe_add(e, HASH[4]); HASH[5] = safe_add(f, HASH[5]); HASH[6] = safe_add(g, HASH[6]); HASH[7] = safe_add(h, HASH[7]);
  }
  return HASH;
};

module.exports = function sha256(buf) {
  return helpers.hash(buf, core_sha256, 32, true);
};

},{"./helpers":42}],48:[function(require,module,exports){

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

EventEmitter.defaultMaxListeners = 10;

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

  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        throw TypeError('Uncaught, unspecified "error" event.');
      }
      return false;
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
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

  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    this._events[type].push(listener);
  else
    this._events[type] = [this._events[type], listener];

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
      console.trace();
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

  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

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

},{}],49:[function(require,module,exports){
if (typeof Object.create === 'function') {
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
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],50:[function(require,module,exports){
(function (global){

;(function(root) {


	var freeExports = typeof exports == 'object' && exports;
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}


	var punycode,


	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1


	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'


	regexPunycode = /^xn--/,
	regexNonASCII = /[^ -~]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g, // RFC 3490 separators


	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},


	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,


	key;




	function error(type) {
		throw RangeError(errors[type]);
	}


	function map(array, fn) {
		var length = array.length;
		while (length--) {
			array[length] = fn(array[length]);
		}
		return array;
	}


	function mapDomain(string, fn) {
		return map(string.split(regexSeparators), fn).join('.');
	}


	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}


	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}


	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}


	function digitToBasic(digit, flag) {
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}


	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}


	function decode(input) {
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,

		    baseMinusT;


		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}


		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}


	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],

		    inputLength,

		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		input = ucs2decode(input);

		inputLength = input.length;

		n = initialN;
		delta = 0;
		bias = initialBias;

		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;


		if (basicLength) {
			output.push(delimiter);
		}

		while (handledCPCount < inputLength) {

			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}


	function toUnicode(domain) {
		return mapDomain(domain, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}


	function toASCII(domain) {
		return mapDomain(domain, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}




	punycode = {

		'version': '1.2.4',

		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};


	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],51:[function(require,module,exports){

'use strict';

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

},{}],52:[function(require,module,exports){

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
        return obj[k].map(function(v) {
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

},{}],53:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":51,"./encode":52}],54:[function(require,module,exports){

(function () {
  "use strict";


var punycode = require('punycode');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;


var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    unwise = ['{', '}', '|', '\\', '^', '~', '`'].concat(delims),

    autoEscape = ['\''].concat(delims),
    nonHostChars = ['%', '/', '?', ';', '#']
      .concat(unwise).concat(autoEscape),
    nonAuthChars = ['/', '@', '?', '#'].concat(delims),
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[a-zA-Z0-9][a-z0-9A-Z_-]{0,62}$/,
    hostnamePartStart = /^([a-zA-Z0-9][a-z0-9A-Z_-]{0,62})(.*)$/,
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    pathedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && typeof(url) === 'object' && url.href) return url;

  if (typeof url !== 'string') {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  var out = {},
      rest = url;

  rest = rest.trim();

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    out.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      out.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    var atSign = rest.indexOf('@');
    if (atSign !== -1) {
      var auth = rest.slice(0, atSign);

      var hasAuth = true;
      for (var i = 0, l = nonAuthChars.length; i < l; i++) {
        if (auth.indexOf(nonAuthChars[i]) !== -1) {
          hasAuth = false;
          break;
        }
      }

      if (hasAuth) {
        out.auth = decodeURIComponent(auth);
        rest = rest.substr(atSign + 1);
      }
    }

    var firstNonHost = -1;
    for (var i = 0, l = nonHostChars.length; i < l; i++) {
      var index = rest.indexOf(nonHostChars[i]);
      if (index !== -1 &&
          (firstNonHost < 0 || index < firstNonHost)) firstNonHost = index;
    }

    if (firstNonHost !== -1) {
      out.host = rest.substr(0, firstNonHost);
      rest = rest.substr(firstNonHost);
    } else {
      out.host = rest;
      rest = '';
    }

    var p = parseHost(out.host);
    var keys = Object.keys(p);
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      out[key] = p[key];
    }

    out.hostname = out.hostname || '';

    var ipv6Hostname = out.hostname[0] === '[' &&
        out.hostname[out.hostname.length - 1] === ']';

    if (out.hostname.length > hostnameMaxLen) {
      out.hostname = '';
    } else if (!ipv6Hostname) {
      var hostparts = out.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            out.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    out.hostname = out.hostname.toLowerCase();

    if (!ipv6Hostname) {
      var domainArray = out.hostname.split('.');
      var newOut = [];
      for (var i = 0; i < domainArray.length; ++i) {
        var s = domainArray[i];
        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
            'xn--' + punycode.encode(s) : s);
      }
      out.hostname = newOut.join('.');
    }

    out.host = (out.hostname || '') +
        ((out.port) ? ':' + out.port : '');
    out.href += out.host;

    if (ipv6Hostname) {
      out.hostname = out.hostname.substr(1, out.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  if (!unsafeProtocol[lowerProto]) {

    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  var hash = rest.indexOf('#');
  if (hash !== -1) {
    out.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    out.search = rest.substr(qm);
    out.query = rest.substr(qm + 1);
    if (parseQueryString) {
      out.query = querystring.parse(out.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    out.search = '';
    out.query = {};
  }
  if (rest) out.pathname = rest;
  if (slashedProtocol[proto] &&
      out.hostname && !out.pathname) {
    out.pathname = '/';
  }

  if (out.pathname || out.search) {
    out.path = (out.pathname ? out.pathname : '') +
               (out.search ? out.search : '');
  }

  out.href = urlFormat(out);
  return out;
}

function urlFormat(obj) {
  if (typeof(obj) === 'string') obj = urlParse(obj);

  var auth = obj.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = obj.protocol || '',
      pathname = obj.pathname || '',
      hash = obj.hash || '',
      host = false,
      query = '';

  if (obj.host !== undefined) {
    host = auth + obj.host;
  } else if (obj.hostname !== undefined) {
    host = auth + (obj.hostname.indexOf(':') === -1 ?
        obj.hostname :
        '[' + obj.hostname + ']');
    if (obj.port) {
      host += ':' + obj.port;
    }
  }

  if (obj.query && typeof obj.query === 'object' &&
      Object.keys(obj.query).length) {
    query = querystring.stringify(obj.query);
  }

  var search = obj.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  if (obj.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  return protocol + host + pathname + search + hash;
}

function urlResolve(source, relative) {
  return urlFormat(urlResolveObject(source, relative));
}

function urlResolveObject(source, relative) {
  if (!source) return relative;

  source = urlParse(urlFormat(source), false, true);
  relative = urlParse(urlFormat(relative), false, true);

  source.hash = relative.hash;

  if (relative.href === '') {
    source.href = urlFormat(source);
    return source;
  }

  if (relative.slashes && !relative.protocol) {
    relative.protocol = source.protocol;
    if (slashedProtocol[relative.protocol] &&
        relative.hostname && !relative.pathname) {
      relative.path = relative.pathname = '/';
    }
    relative.href = urlFormat(relative);
    return relative;
  }

  if (relative.protocol && relative.protocol !== source.protocol) {
    if (!slashedProtocol[relative.protocol]) {
      relative.href = urlFormat(relative);
      return relative;
    }
    source.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      relative.pathname = relPath.join('/');
    }
    source.pathname = relative.pathname;
    source.search = relative.search;
    source.query = relative.query;
    source.host = relative.host || '';
    source.auth = relative.auth;
    source.hostname = relative.hostname || relative.host;
    source.port = relative.port;
    if (source.pathname !== undefined || source.search !== undefined) {
      source.path = (source.pathname ? source.pathname : '') +
                    (source.search ? source.search : '');
    }
    source.slashes = source.slashes || relative.slashes;
    source.href = urlFormat(source);
    return source;
  }

  var isSourceAbs = (source.pathname && source.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host !== undefined ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (source.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = source.pathname && source.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = source.protocol &&
          !slashedProtocol[source.protocol];

  if (psychotic) {

    delete source.hostname;
    delete source.port;
    if (source.host) {
      if (srcPath[0] === '') srcPath[0] = source.host;
      else srcPath.unshift(source.host);
    }
    delete source.host;
    if (relative.protocol) {
      delete relative.hostname;
      delete relative.port;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      delete relative.host;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    source.host = (relative.host || relative.host === '') ?
                      relative.host : source.host;
    source.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : source.hostname;
    source.search = relative.search;
    source.query = relative.query;
    srcPath = relPath;
  } else if (relPath.length) {
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    source.search = relative.search;
    source.query = relative.query;
  } else if ('search' in relative) {
    if (psychotic) {
      source.hostname = source.host = srcPath.shift();
      var authInHost = source.host && source.host.indexOf('@') > 0 ?
                       source.host.split('@') : false;
      if (authInHost) {
        source.auth = authInHost.shift();
        source.host = source.hostname = authInHost.shift();
      }
    }
    source.search = relative.search;
    source.query = relative.query;
    if (source.pathname !== undefined || source.search !== undefined) {
      source.path = (source.pathname ? source.pathname : '') +
                    (source.search ? source.search : '');
    }
    source.href = urlFormat(source);
    return source;
  }
  if (!srcPath.length) {
    delete source.pathname;
    if (!source.search) {
      source.path = '/' + source.search;
    } else {
      delete source.path;
    }
    source.href = urlFormat(source);
    return source;
  }
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (source.host || relative.host) && (last === '.' || last === '..') ||
      last === '');

  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last == '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  if (psychotic) {
    source.hostname = source.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    var authInHost = source.host && source.host.indexOf('@') > 0 ?
                     source.host.split('@') : false;
    if (authInHost) {
      source.auth = authInHost.shift();
      source.host = source.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (source.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  source.pathname = srcPath.join('/');
  if (source.pathname !== undefined || source.search !== undefined) {
    source.path = (source.pathname ? source.pathname : '') +
                  (source.search ? source.search : '');
  }
  source.auth = relative.auth || source.auth;
  source.slashes = source.slashes || relative.slashes;
  source.href = urlFormat(source);
  return source;
}

function parseHost(host) {
  var out = {};
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      out.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) out.hostname = host;
  return out;
}

}());

},{"punycode":50,"querystring":53}],55:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],56:[function(require,module,exports){
(function (process,global){

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
    if (x === '%') return '%';
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


exports.deprecate = function(fn, msg) {
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




function inspect(obj, opts) {
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    ctx.showHidden = opts;
  } else if (opts) {
    exports._extend(ctx, opts);
  }
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


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

inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
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
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      value.inspect !== exports.inspect &&
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

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

  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

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

function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};



exports.inherits = require('inherits');

exports._extend = function(origin, add) {
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

}).call(this,{browser:true},typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":55,"inherits":49}]},{},[1]);window.AWS.CloudWatch = window.AWS.Service.defineService('cloudwatch');

window.AWS.Service.defineServiceApi(window.AWS.CloudWatch, "2010-08-01", {"format":"query","apiVersion":"2010-08-01","endpointPrefix":"monitoring","resultWrapped":true,"serviceAbbreviation":"CloudWatch","serviceFullName":"Amazon CloudWatch","signatureVersion":"v4","timestampFormat":"iso8601","operations":{"deleteAlarms":{"name":"DeleteAlarms","input":{"type":"structure","members":{"AlarmNames":{"type":"list","members":{},"required":true}}},"output":{"type":"structure","members":{}}},"describeAlarmHistory":{"name":"DescribeAlarmHistory","input":{"type":"structure","members":{"AlarmName":{},"HistoryItemType":{},"StartDate":{"type":"timestamp"},"EndDate":{"type":"timestamp"},"MaxRecords":{"type":"integer"},"NextToken":{}}},"output":{"type":"structure","members":{"AlarmHistoryItems":{"type":"list","members":{"type":"structure","members":{"AlarmName":{},"Timestamp":{"type":"timestamp"},"HistoryItemType":{},"HistorySummary":{},"HistoryData":{}}}},"NextToken":{}}}},"describeAlarms":{"name":"DescribeAlarms","input":{"type":"structure","members":{"AlarmNames":{"type":"list","members":{}},"AlarmNamePrefix":{},"StateValue":{},"ActionPrefix":{},"MaxRecords":{"type":"integer"},"NextToken":{}}},"output":{"type":"structure","members":{"MetricAlarms":{"type":"list","members":{"type":"structure","members":{"AlarmName":{},"AlarmArn":{},"AlarmDescription":{},"AlarmConfigurationUpdatedTimestamp":{"type":"timestamp"},"ActionsEnabled":{"type":"boolean"},"OKActions":{"type":"list","members":{}},"AlarmActions":{"type":"list","members":{}},"InsufficientDataActions":{"type":"list","members":{}},"StateValue":{},"StateReason":{},"StateReasonData":{},"StateUpdatedTimestamp":{"type":"timestamp"},"MetricName":{},"Namespace":{},"Statistic":{},"Dimensions":{"type":"list","members":{"type":"structure","members":{"Name":{},"Value":{}}}},"Period":{"type":"integer"},"Unit":{},"EvaluationPeriods":{"type":"integer"},"Threshold":{"type":"float"},"ComparisonOperator":{}}}},"NextToken":{}}}},"describeAlarmsForMetric":{"name":"DescribeAlarmsForMetric","input":{"type":"structure","members":{"MetricName":{"required":true},"Namespace":{"required":true},"Statistic":{},"Dimensions":{"type":"list","members":{"type":"structure","members":{"Name":{"required":true},"Value":{"required":true}},"order":["Name","Value"]}},"Period":{"type":"integer"},"Unit":{}}},"output":{"type":"structure","members":{"MetricAlarms":{"type":"list","members":{"type":"structure","members":{"AlarmName":{},"AlarmArn":{},"AlarmDescription":{},"AlarmConfigurationUpdatedTimestamp":{"type":"timestamp"},"ActionsEnabled":{"type":"boolean"},"OKActions":{"type":"list","members":{}},"AlarmActions":{"type":"list","members":{}},"InsufficientDataActions":{"type":"list","members":{}},"StateValue":{},"StateReason":{},"StateReasonData":{},"StateUpdatedTimestamp":{"type":"timestamp"},"MetricName":{},"Namespace":{},"Statistic":{},"Dimensions":{"type":"list","members":{"type":"structure","members":{"Name":{},"Value":{}}}},"Period":{"type":"integer"},"Unit":{},"EvaluationPeriods":{"type":"integer"},"Threshold":{"type":"float"},"ComparisonOperator":{}}}}}}},"disableAlarmActions":{"name":"DisableAlarmActions","input":{"type":"structure","members":{"AlarmNames":{"type":"list","members":{},"required":true}}},"output":{"type":"structure","members":{}}},"enableAlarmActions":{"name":"EnableAlarmActions","input":{"type":"structure","members":{"AlarmNames":{"type":"list","members":{},"required":true}}},"output":{"type":"structure","members":{}}},"getMetricStatistics":{"name":"GetMetricStatistics","input":{"type":"structure","members":{"Namespace":{"required":true},"MetricName":{"required":true},"Dimensions":{"type":"list","members":{"type":"structure","members":{"Name":{"required":true},"Value":{"required":true}},"order":["Name","Value"]}},"StartTime":{"type":"timestamp","required":true},"EndTime":{"type":"timestamp","required":true},"Period":{"type":"integer","required":true},"Statistics":{"type":"list","members":{},"required":true},"Unit":{}}},"output":{"type":"structure","members":{"Label":{},"Datapoints":{"type":"list","members":{"type":"structure","members":{"Timestamp":{"type":"timestamp"},"SampleCount":{"type":"float"},"Average":{"type":"float"},"Sum":{"type":"float"},"Minimum":{"type":"float"},"Maximum":{"type":"float"},"Unit":{}}}}}}},"listMetrics":{"name":"ListMetrics","input":{"type":"structure","members":{"Namespace":{},"MetricName":{},"Dimensions":{"type":"list","members":{"type":"structure","members":{"Name":{"required":true},"Value":{}}}},"NextToken":{}}},"output":{"type":"structure","members":{"Metrics":{"type":"list","members":{"type":"structure","members":{"Namespace":{},"MetricName":{},"Dimensions":{"type":"list","members":{"type":"structure","members":{"Name":{},"Value":{}}}}}}},"NextToken":{}}}},"putMetricAlarm":{"name":"PutMetricAlarm","input":{"type":"structure","members":{"AlarmName":{"required":true},"AlarmDescription":{},"ActionsEnabled":{"type":"boolean"},"OKActions":{"type":"list","members":{}},"AlarmActions":{"type":"list","members":{}},"InsufficientDataActions":{"type":"list","members":{}},"MetricName":{"required":true},"Namespace":{"required":true},"Statistic":{"required":true},"Dimensions":{"type":"list","members":{"type":"structure","members":{"Name":{"required":true},"Value":{"required":true}},"order":["Name","Value"]}},"Period":{"type":"integer","required":true},"Unit":{},"EvaluationPeriods":{"type":"integer","required":true},"Threshold":{"type":"float","required":true},"ComparisonOperator":{"required":true}}},"output":{"type":"structure","members":{}}},"putMetricData":{"name":"PutMetricData","input":{"type":"structure","members":{"Namespace":{"required":true},"MetricData":{"type":"list","members":{"type":"structure","members":{"MetricName":{"required":true},"Dimensions":{"type":"list","members":{"type":"structure","members":{"Name":{"required":true},"Value":{"required":true}},"order":["Name","Value"]}},"Timestamp":{"type":"timestamp"},"Value":{"type":"float"},"StatisticValues":{"type":"structure","members":{"SampleCount":{"type":"float","required":true},"Sum":{"type":"float","required":true},"Minimum":{"type":"float","required":true},"Maximum":{"type":"float","required":true}}},"Unit":{}}},"required":true}}},"output":{"type":"structure","members":{}}},"setAlarmState":{"name":"SetAlarmState","input":{"type":"structure","members":{"AlarmName":{"required":true},"StateValue":{"required":true},"StateReason":{"required":true},"StateReasonData":{}}},"output":{"type":"structure","members":{}}}},"pagination":{"describeAlarmHistory":{"inputToken":"NextToken","outputToken":"NextToken","limitKey":"MaxRecords","resultKey":"AlarmHistoryItems"},"describeAlarms":{"inputToken":"NextToken","outputToken":"NextToken","limitKey":"MaxRecords","resultKey":"MetricAlarms"},"describeAlarmsForMetric":{"resultKey":"MetricAlarms"},"listMetrics":{"inputToken":"NextToken","outputToken":"NextToken","resultKey":"Metrics"}}});
window.AWS.DynamoDB = window.AWS.Service.defineService('dynamodb');


window.AWS.util.update(window.AWS.DynamoDB.prototype, {
  setupRequestListeners: function setupRequestListeners(request) {
    if (request.service.config.dynamoDbCrc32) {
      request.addListener('extractData', this.checkCrc32);
    }
  },


  checkCrc32: function checkCrc32(resp) {
    if (!resp.request.service.crc32IsValid(resp)) {
      resp.error = window.AWS.util.error(new Error(), {
        code: 'CRC32CheckFailed',
        message: 'CRC32 integrity check failed',
        retryable: true
      });
    }
  },


  crc32IsValid: function crc32IsValid(resp) {
    var crc = resp.httpResponse.headers['x-amz-crc32'];
    if (!crc) return true; // no (valid) CRC32 header
    return parseInt(crc, 10) === window.AWS.util.crypto.crc32(resp.httpResponse.body);
  },


  defaultRetryCount: 10,


  retryDelays: function retryDelays() {
    var retryCount = this.numRetries();
    var delays = [];
    for (var i = 0; i < retryCount; ++i) {
      if (i === 0) {
        delays.push(0);
      } else {
        delays.push(50 * Math.pow(2, i - 1));
      }
    }
    return delays;
  }
});

window.AWS.Service.defineServiceApi(window.AWS.DynamoDB, "2012-08-10", {"format":"json","apiVersion":"2012-08-10","endpointPrefix":"dynamodb","jsonVersion":"1.0","serviceAbbreviation":"DynamoDB","serviceFullName":"Amazon DynamoDB","signatureVersion":"v4","targetPrefix":"DynamoDB_20120810","timestampFormat":"iso8601","operations":{"batchGetItem":{"name":"BatchGetItem","input":{"type":"structure","members":{"RequestItems":{"type":"map","keys":{},"members":{"type":"structure","members":{"Keys":{"type":"list","members":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}},"required":true},"AttributesToGet":{"type":"list","members":{}},"ConsistentRead":{"type":"boolean"}}},"required":true},"ReturnConsumedCapacity":{}}},"output":{"type":"structure","members":{"Responses":{"type":"map","keys":{},"members":{"type":"list","members":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}}}},"UnprocessedKeys":{"type":"map","keys":{},"members":{"type":"structure","members":{"Keys":{"type":"list","members":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}}},"AttributesToGet":{"type":"list","members":{}},"ConsistentRead":{"type":"boolean"}}}},"ConsumedCapacity":{"type":"list","members":{"type":"structure","members":{"TableName":{},"CapacityUnits":{"type":"float"},"Table":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}},"LocalSecondaryIndexes":{"type":"map","keys":{},"members":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}}},"GlobalSecondaryIndexes":{"type":"map","keys":{},"members":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}}}}}}}}},"batchWriteItem":{"name":"BatchWriteItem","input":{"type":"structure","members":{"RequestItems":{"type":"map","keys":{},"members":{"type":"list","members":{"type":"structure","members":{"PutRequest":{"type":"structure","members":{"Item":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}},"required":true}}},"DeleteRequest":{"type":"structure","members":{"Key":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}},"required":true}}}}}},"required":true},"ReturnConsumedCapacity":{},"ReturnItemCollectionMetrics":{}}},"output":{"type":"structure","members":{"UnprocessedItems":{"type":"map","keys":{},"members":{"type":"list","members":{"type":"structure","members":{"PutRequest":{"type":"structure","members":{"Item":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}}}},"DeleteRequest":{"type":"structure","members":{"Key":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}}}}}}}},"ItemCollectionMetrics":{"type":"map","keys":{},"members":{"type":"list","members":{"type":"structure","members":{"ItemCollectionKey":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}},"SizeEstimateRangeGB":{"type":"list","members":{"type":"float"}}}}}},"ConsumedCapacity":{"type":"list","members":{"type":"structure","members":{"TableName":{},"CapacityUnits":{"type":"float"},"Table":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}},"LocalSecondaryIndexes":{"type":"map","keys":{},"members":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}}},"GlobalSecondaryIndexes":{"type":"map","keys":{},"members":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}}}}}}}}},"createTable":{"name":"CreateTable","input":{"type":"structure","members":{"AttributeDefinitions":{"type":"list","members":{"type":"structure","members":{"AttributeName":{"required":true},"AttributeType":{"required":true}}},"required":true},"TableName":{"required":true},"KeySchema":{"type":"list","members":{"type":"structure","members":{"AttributeName":{"required":true},"KeyType":{"required":true}}},"required":true},"LocalSecondaryIndexes":{"type":"list","members":{"type":"structure","members":{"IndexName":{"required":true},"KeySchema":{"type":"list","members":{"type":"structure","members":{"AttributeName":{"required":true},"KeyType":{"required":true}}},"required":true},"Projection":{"type":"structure","members":{"ProjectionType":{},"NonKeyAttributes":{"type":"list","members":{}}},"required":true}}}},"GlobalSecondaryIndexes":{"type":"list","members":{"type":"structure","members":{"IndexName":{"required":true},"KeySchema":{"type":"list","members":{"type":"structure","members":{"AttributeName":{"required":true},"KeyType":{"required":true}}},"required":true},"Projection":{"type":"structure","members":{"ProjectionType":{},"NonKeyAttributes":{"type":"list","members":{}}},"required":true},"ProvisionedThroughput":{"type":"structure","members":{"ReadCapacityUnits":{"type":"integer","required":true},"WriteCapacityUnits":{"type":"integer","required":true}},"required":true}}}},"ProvisionedThroughput":{"type":"structure","members":{"ReadCapacityUnits":{"type":"integer","required":true},"WriteCapacityUnits":{"type":"integer","required":true}},"required":true}}},"output":{"type":"structure","members":{"TableDescription":{"type":"structure","members":{"AttributeDefinitions":{"type":"list","members":{"type":"structure","members":{"AttributeName":{},"AttributeType":{}}}},"TableName":{},"KeySchema":{"type":"list","members":{"type":"structure","members":{"AttributeName":{},"KeyType":{}}}},"TableStatus":{},"CreationDateTime":{"type":"timestamp"},"ProvisionedThroughput":{"type":"structure","members":{"LastIncreaseDateTime":{"type":"timestamp"},"LastDecreaseDateTime":{"type":"timestamp"},"NumberOfDecreasesToday":{"type":"integer"},"ReadCapacityUnits":{"type":"integer"},"WriteCapacityUnits":{"type":"integer"}}},"TableSizeBytes":{"type":"integer"},"ItemCount":{"type":"integer"},"LocalSecondaryIndexes":{"type":"list","members":{"type":"structure","members":{"IndexName":{},"KeySchema":{"type":"list","members":{"type":"structure","members":{"AttributeName":{},"KeyType":{}}}},"Projection":{"type":"structure","members":{"ProjectionType":{},"NonKeyAttributes":{"type":"list","members":{}}}},"IndexSizeBytes":{"type":"integer"},"ItemCount":{"type":"integer"}}}},"GlobalSecondaryIndexes":{"type":"list","members":{"type":"structure","members":{"IndexName":{},"KeySchema":{"type":"list","members":{"type":"structure","members":{"AttributeName":{},"KeyType":{}}}},"Projection":{"type":"structure","members":{"ProjectionType":{},"NonKeyAttributes":{"type":"list","members":{}}}},"IndexStatus":{},"ProvisionedThroughput":{"type":"structure","members":{"LastIncreaseDateTime":{"type":"timestamp"},"LastDecreaseDateTime":{"type":"timestamp"},"NumberOfDecreasesToday":{"type":"integer"},"ReadCapacityUnits":{"type":"integer"},"WriteCapacityUnits":{"type":"integer"}}},"IndexSizeBytes":{"type":"integer"},"ItemCount":{"type":"integer"}}}}}}}}},"deleteItem":{"name":"DeleteItem","input":{"type":"structure","members":{"TableName":{"required":true},"Key":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}},"required":true},"Expected":{"type":"map","keys":{},"members":{"type":"structure","members":{"Value":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}},"Exists":{"type":"boolean"},"ComparisonOperator":{},"AttributeValueList":{"type":"list","members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}}}}},"ConditionalOperator":{},"ReturnValues":{},"ReturnConsumedCapacity":{},"ReturnItemCollectionMetrics":{}}},"output":{"type":"structure","members":{"Attributes":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}},"ConsumedCapacity":{"type":"structure","members":{"TableName":{},"CapacityUnits":{"type":"float"},"Table":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}},"LocalSecondaryIndexes":{"type":"map","keys":{},"members":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}}},"GlobalSecondaryIndexes":{"type":"map","keys":{},"members":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}}}}},"ItemCollectionMetrics":{"type":"structure","members":{"ItemCollectionKey":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}},"SizeEstimateRangeGB":{"type":"list","members":{"type":"float"}}}}}}},"deleteTable":{"name":"DeleteTable","input":{"type":"structure","members":{"TableName":{"required":true}}},"output":{"type":"structure","members":{"TableDescription":{"type":"structure","members":{"AttributeDefinitions":{"type":"list","members":{"type":"structure","members":{"AttributeName":{},"AttributeType":{}}}},"TableName":{},"KeySchema":{"type":"list","members":{"type":"structure","members":{"AttributeName":{},"KeyType":{}}}},"TableStatus":{},"CreationDateTime":{"type":"timestamp"},"ProvisionedThroughput":{"type":"structure","members":{"LastIncreaseDateTime":{"type":"timestamp"},"LastDecreaseDateTime":{"type":"timestamp"},"NumberOfDecreasesToday":{"type":"integer"},"ReadCapacityUnits":{"type":"integer"},"WriteCapacityUnits":{"type":"integer"}}},"TableSizeBytes":{"type":"integer"},"ItemCount":{"type":"integer"},"LocalSecondaryIndexes":{"type":"list","members":{"type":"structure","members":{"IndexName":{},"KeySchema":{"type":"list","members":{"type":"structure","members":{"AttributeName":{},"KeyType":{}}}},"Projection":{"type":"structure","members":{"ProjectionType":{},"NonKeyAttributes":{"type":"list","members":{}}}},"IndexSizeBytes":{"type":"integer"},"ItemCount":{"type":"integer"}}}},"GlobalSecondaryIndexes":{"type":"list","members":{"type":"structure","members":{"IndexName":{},"KeySchema":{"type":"list","members":{"type":"structure","members":{"AttributeName":{},"KeyType":{}}}},"Projection":{"type":"structure","members":{"ProjectionType":{},"NonKeyAttributes":{"type":"list","members":{}}}},"IndexStatus":{},"ProvisionedThroughput":{"type":"structure","members":{"LastIncreaseDateTime":{"type":"timestamp"},"LastDecreaseDateTime":{"type":"timestamp"},"NumberOfDecreasesToday":{"type":"integer"},"ReadCapacityUnits":{"type":"integer"},"WriteCapacityUnits":{"type":"integer"}}},"IndexSizeBytes":{"type":"integer"},"ItemCount":{"type":"integer"}}}}}}}}},"describeTable":{"name":"DescribeTable","input":{"type":"structure","members":{"TableName":{"required":true}}},"output":{"type":"structure","members":{"Table":{"type":"structure","members":{"AttributeDefinitions":{"type":"list","members":{"type":"structure","members":{"AttributeName":{},"AttributeType":{}}}},"TableName":{},"KeySchema":{"type":"list","members":{"type":"structure","members":{"AttributeName":{},"KeyType":{}}}},"TableStatus":{},"CreationDateTime":{"type":"timestamp"},"ProvisionedThroughput":{"type":"structure","members":{"LastIncreaseDateTime":{"type":"timestamp"},"LastDecreaseDateTime":{"type":"timestamp"},"NumberOfDecreasesToday":{"type":"integer"},"ReadCapacityUnits":{"type":"integer"},"WriteCapacityUnits":{"type":"integer"}}},"TableSizeBytes":{"type":"integer"},"ItemCount":{"type":"integer"},"LocalSecondaryIndexes":{"type":"list","members":{"type":"structure","members":{"IndexName":{},"KeySchema":{"type":"list","members":{"type":"structure","members":{"AttributeName":{},"KeyType":{}}}},"Projection":{"type":"structure","members":{"ProjectionType":{},"NonKeyAttributes":{"type":"list","members":{}}}},"IndexSizeBytes":{"type":"integer"},"ItemCount":{"type":"integer"}}}},"GlobalSecondaryIndexes":{"type":"list","members":{"type":"structure","members":{"IndexName":{},"KeySchema":{"type":"list","members":{"type":"structure","members":{"AttributeName":{},"KeyType":{}}}},"Projection":{"type":"structure","members":{"ProjectionType":{},"NonKeyAttributes":{"type":"list","members":{}}}},"IndexStatus":{},"ProvisionedThroughput":{"type":"structure","members":{"LastIncreaseDateTime":{"type":"timestamp"},"LastDecreaseDateTime":{"type":"timestamp"},"NumberOfDecreasesToday":{"type":"integer"},"ReadCapacityUnits":{"type":"integer"},"WriteCapacityUnits":{"type":"integer"}}},"IndexSizeBytes":{"type":"integer"},"ItemCount":{"type":"integer"}}}}}}}}},"getItem":{"name":"GetItem","input":{"type":"structure","members":{"TableName":{"required":true},"Key":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}},"required":true},"AttributesToGet":{"type":"list","members":{}},"ConsistentRead":{"type":"boolean"},"ReturnConsumedCapacity":{}}},"output":{"type":"structure","members":{"Item":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}},"ConsumedCapacity":{"type":"structure","members":{"TableName":{},"CapacityUnits":{"type":"float"},"Table":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}},"LocalSecondaryIndexes":{"type":"map","keys":{},"members":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}}},"GlobalSecondaryIndexes":{"type":"map","keys":{},"members":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}}}}}}}},"listTables":{"name":"ListTables","input":{"type":"structure","members":{"ExclusiveStartTableName":{},"Limit":{"type":"integer"}}},"output":{"type":"structure","members":{"TableNames":{"type":"list","members":{}},"LastEvaluatedTableName":{}}}},"putItem":{"name":"PutItem","input":{"type":"structure","members":{"TableName":{"required":true},"Item":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}},"required":true},"Expected":{"type":"map","keys":{},"members":{"type":"structure","members":{"Value":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}},"Exists":{"type":"boolean"},"ComparisonOperator":{},"AttributeValueList":{"type":"list","members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}}}}},"ReturnValues":{},"ReturnConsumedCapacity":{},"ReturnItemCollectionMetrics":{},"ConditionalOperator":{}}},"output":{"type":"structure","members":{"Attributes":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}},"ConsumedCapacity":{"type":"structure","members":{"TableName":{},"CapacityUnits":{"type":"float"},"Table":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}},"LocalSecondaryIndexes":{"type":"map","keys":{},"members":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}}},"GlobalSecondaryIndexes":{"type":"map","keys":{},"members":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}}}}},"ItemCollectionMetrics":{"type":"structure","members":{"ItemCollectionKey":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}},"SizeEstimateRangeGB":{"type":"list","members":{"type":"float"}}}}}}},"query":{"name":"Query","input":{"type":"structure","members":{"TableName":{"required":true},"IndexName":{},"Select":{},"AttributesToGet":{"type":"list","members":{}},"Limit":{"type":"integer"},"ConsistentRead":{"type":"boolean"},"KeyConditions":{"type":"map","keys":{},"members":{"type":"structure","members":{"AttributeValueList":{"type":"list","members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}},"ComparisonOperator":{"required":true}}},"required":true},"QueryFilter":{"type":"map","keys":{},"members":{"type":"structure","members":{"AttributeValueList":{"type":"list","members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}},"ComparisonOperator":{"required":true}}}},"ConditionalOperator":{},"ScanIndexForward":{"type":"boolean"},"ExclusiveStartKey":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}},"ReturnConsumedCapacity":{}}},"output":{"type":"structure","members":{"Items":{"type":"list","members":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}}},"Count":{"type":"integer"},"ScannedCount":{"type":"integer"},"LastEvaluatedKey":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}},"ConsumedCapacity":{"type":"structure","members":{"TableName":{},"CapacityUnits":{"type":"float"},"Table":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}},"LocalSecondaryIndexes":{"type":"map","keys":{},"members":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}}},"GlobalSecondaryIndexes":{"type":"map","keys":{},"members":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}}}}}}}},"scan":{"name":"Scan","input":{"type":"structure","members":{"TableName":{"required":true},"AttributesToGet":{"type":"list","members":{}},"Limit":{"type":"integer"},"Select":{},"ScanFilter":{"type":"map","keys":{},"members":{"type":"structure","members":{"AttributeValueList":{"type":"list","members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}},"ComparisonOperator":{"required":true}}}},"ConditionalOperator":{},"ExclusiveStartKey":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}},"ReturnConsumedCapacity":{},"TotalSegments":{"type":"integer"},"Segment":{"type":"integer"}}},"output":{"type":"structure","members":{"Items":{"type":"list","members":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}}},"Count":{"type":"integer"},"ScannedCount":{"type":"integer"},"LastEvaluatedKey":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}},"ConsumedCapacity":{"type":"structure","members":{"TableName":{},"CapacityUnits":{"type":"float"},"Table":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}},"LocalSecondaryIndexes":{"type":"map","keys":{},"members":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}}},"GlobalSecondaryIndexes":{"type":"map","keys":{},"members":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}}}}}}}},"updateItem":{"name":"UpdateItem","input":{"type":"structure","members":{"TableName":{"required":true},"Key":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}},"required":true},"AttributeUpdates":{"type":"map","keys":{},"members":{"type":"structure","members":{"Value":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}},"Action":{}}}},"Expected":{"type":"map","keys":{},"members":{"type":"structure","members":{"Value":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}},"Exists":{"type":"boolean"},"ComparisonOperator":{},"AttributeValueList":{"type":"list","members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}}}}},"ConditionalOperator":{},"ReturnValues":{},"ReturnConsumedCapacity":{},"ReturnItemCollectionMetrics":{}}},"output":{"type":"structure","members":{"Attributes":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}},"ConsumedCapacity":{"type":"structure","members":{"TableName":{},"CapacityUnits":{"type":"float"},"Table":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}},"LocalSecondaryIndexes":{"type":"map","keys":{},"members":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}}},"GlobalSecondaryIndexes":{"type":"map","keys":{},"members":{"type":"structure","members":{"CapacityUnits":{"type":"float"}}}}}},"ItemCollectionMetrics":{"type":"structure","members":{"ItemCollectionKey":{"type":"map","keys":{},"members":{"type":"structure","members":{"S":{},"N":{},"B":{"type":"base64"},"SS":{"type":"list","members":{}},"NS":{"type":"list","members":{}},"BS":{"type":"list","members":{"type":"base64"}}}}},"SizeEstimateRangeGB":{"type":"list","members":{"type":"float"}}}}}}},"updateTable":{"name":"UpdateTable","input":{"type":"structure","members":{"TableName":{"required":true},"ProvisionedThroughput":{"type":"structure","members":{"ReadCapacityUnits":{"type":"integer","required":true},"WriteCapacityUnits":{"type":"integer","required":true}}},"GlobalSecondaryIndexUpdates":{"type":"list","members":{"type":"structure","members":{"Update":{"type":"structure","members":{"IndexName":{"required":true},"ProvisionedThroughput":{"type":"structure","members":{"ReadCapacityUnits":{"type":"integer","required":true},"WriteCapacityUnits":{"type":"integer","required":true}},"required":true}}}}}}}},"output":{"type":"structure","members":{"TableDescription":{"type":"structure","members":{"AttributeDefinitions":{"type":"list","members":{"type":"structure","members":{"AttributeName":{},"AttributeType":{}}}},"TableName":{},"KeySchema":{"type":"list","members":{"type":"structure","members":{"AttributeName":{},"KeyType":{}}}},"TableStatus":{},"CreationDateTime":{"type":"timestamp"},"ProvisionedThroughput":{"type":"structure","members":{"LastIncreaseDateTime":{"type":"timestamp"},"LastDecreaseDateTime":{"type":"timestamp"},"NumberOfDecreasesToday":{"type":"integer"},"ReadCapacityUnits":{"type":"integer"},"WriteCapacityUnits":{"type":"integer"}}},"TableSizeBytes":{"type":"integer"},"ItemCount":{"type":"integer"},"LocalSecondaryIndexes":{"type":"list","members":{"type":"structure","members":{"IndexName":{},"KeySchema":{"type":"list","members":{"type":"structure","members":{"AttributeName":{},"KeyType":{}}}},"Projection":{"type":"structure","members":{"ProjectionType":{},"NonKeyAttributes":{"type":"list","members":{}}}},"IndexSizeBytes":{"type":"integer"},"ItemCount":{"type":"integer"}}}},"GlobalSecondaryIndexes":{"type":"list","members":{"type":"structure","members":{"IndexName":{},"KeySchema":{"type":"list","members":{"type":"structure","members":{"AttributeName":{},"KeyType":{}}}},"Projection":{"type":"structure","members":{"ProjectionType":{},"NonKeyAttributes":{"type":"list","members":{}}}},"IndexStatus":{},"ProvisionedThroughput":{"type":"structure","members":{"LastIncreaseDateTime":{"type":"timestamp"},"LastDecreaseDateTime":{"type":"timestamp"},"NumberOfDecreasesToday":{"type":"integer"},"ReadCapacityUnits":{"type":"integer"},"WriteCapacityUnits":{"type":"integer"}}},"IndexSizeBytes":{"type":"integer"},"ItemCount":{"type":"integer"}}}}}}}}}},"pagination":{"batchGetItem":{"inputToken":"RequestItems","outputToken":"UnprocessedKeys","resultKey":"Responses[]"},"listTables":{"inputToken":"ExclusiveStartTableName","outputToken":"LastEvaluatedTableName","limitKey":"Limit","resultKey":"TableNames"},"query":{"inputToken":"ExclusiveStartKey","outputToken":"LastEvaluatedKey","limitKey":"Limit","resultKey":"Items"},"scan":{"inputToken":"ExclusiveStartKey","outputToken":"LastEvaluatedKey","limitKey":"Limit","resultKey":"Items"}},"waiters":{"__default__":{"interval":20,"maxAttempts":25},"__TableState":{"operation":"DescribeTable"},"tableExists":{"extends":"__TableState","ignoreErrors":["ResourceNotFoundException"],"successType":"output","successPath":"Table.TableStatus","successValue":"ACTIVE"},"tableNotExists":{"extends":"__TableState","successType":"error","successValue":"ResourceNotFoundException"}}});
window.AWS.Kinesis = window.AWS.Service.defineService('kinesis');

window.AWS.Service.defineServiceApi(window.AWS.Kinesis, "2013-12-02", {"format":"json","apiVersion":"2013-12-02","endpointPrefix":"kinesis","jsonVersion":"1.1","serviceAbbreviation":"Kinesis","serviceFullName":"Amazon Kinesis","signatureVersion":"v4","targetPrefix":"Kinesis_20131202","timestampFormat":"iso8601","operations":{"createStream":{"name":"CreateStream","input":{"type":"structure","members":{"StreamName":{"required":true},"ShardCount":{"type":"integer","required":true}}},"output":{"type":"structure","members":{}}},"deleteStream":{"name":"DeleteStream","input":{"type":"structure","members":{"StreamName":{"required":true}}},"output":{"type":"structure","members":{}}},"describeStream":{"name":"DescribeStream","input":{"type":"structure","members":{"StreamName":{"required":true},"Limit":{"type":"integer"},"ExclusiveStartShardId":{}}},"output":{"type":"structure","members":{"StreamDescription":{"type":"structure","members":{"StreamName":{},"StreamARN":{},"StreamStatus":{},"Shards":{"type":"list","members":{"type":"structure","members":{"ShardId":{},"ParentShardId":{},"AdjacentParentShardId":{},"HashKeyRange":{"type":"structure","members":{"StartingHashKey":{},"EndingHashKey":{}}},"SequenceNumberRange":{"type":"structure","members":{"StartingSequenceNumber":{},"EndingSequenceNumber":{}}}}}},"HasMoreShards":{"type":"boolean"}}}}}},"getRecords":{"name":"GetRecords","input":{"type":"structure","members":{"ShardIterator":{"required":true},"Limit":{"type":"integer"}}},"output":{"type":"structure","members":{"Records":{"type":"list","members":{"type":"structure","members":{"SequenceNumber":{},"Data":{"type":"base64"},"PartitionKey":{}}}},"NextShardIterator":{}}}},"getShardIterator":{"name":"GetShardIterator","input":{"type":"structure","members":{"StreamName":{"required":true},"ShardId":{"required":true},"ShardIteratorType":{"required":true},"StartingSequenceNumber":{}}},"output":{"type":"structure","members":{"ShardIterator":{}}}},"listStreams":{"name":"ListStreams","input":{"type":"structure","members":{"Limit":{"type":"integer"},"ExclusiveStartStreamName":{}}},"output":{"type":"structure","members":{"StreamNames":{"type":"list","members":{}},"HasMoreStreams":{"type":"boolean"}}}},"mergeShards":{"name":"MergeShards","input":{"type":"structure","members":{"StreamName":{"required":true},"ShardToMerge":{"required":true},"AdjacentShardToMerge":{"required":true}}},"output":{"type":"structure","members":{}}},"putRecord":{"name":"PutRecord","input":{"type":"structure","members":{"StreamName":{"required":true},"Data":{"type":"base64","required":true},"PartitionKey":{"required":true},"ExplicitHashKey":{},"SequenceNumberForOrdering":{}}},"output":{"type":"structure","members":{"ShardId":{},"SequenceNumber":{}}}},"splitShard":{"name":"SplitShard","input":{"type":"structure","members":{"StreamName":{"required":true},"ShardToSplit":{"required":true},"NewStartingHashKey":{"required":true}}},"output":{"type":"structure","members":{}}}},"pagination":{"describeStream":{"inputToken":"ExclusiveStartShardId","limitKey":"Limit","moreResults":"StreamDescription.HasMoreShards","outputToken":"StreamDescription.Shards[-1].ShardId","resultKey":"StreamDescription.Shards"},"getRecords":{"inputToken":"ShardIterator","limitKey":"Limit","outputToken":"NextShardIterator","resultKey":"Records"},"listStreams":{"inputToken":"ExclusiveStartStreamName","limitKey":"Limit","moreResults":"HasMoreStreams","outputToken":"StreamNames[-1]","resultKey":"StreamNames"}}});
window.AWS.S3 = window.AWS.Service.defineService('s3');


window.AWS.util.update(window.AWS.S3.prototype, {

  initialize: function initialize(options) {
    window.AWS.Service.prototype.initialize.call(this, options);
    this.setEndpoint((options || {}).endpoint, options);
  },


  setupRequestListeners: function setupRequestListeners(request) {
    request.addListener('build', this.addContentType);
    request.addListener('build', this.populateURI);
    request.addListener('build', this.computeContentMd5);
    request.addListener('build', this.computeSha256);
    request.removeListener('validate',
      window.AWS.EventListeners.Core.VALIDATE_REGION);
    request.addListener('extractError', this.extractError);
    request.addListener('extractData', this.extractData);
  },


  populateURI: function populateURI(req) {
    var httpRequest = req.httpRequest;
    var b = req.params.Bucket;

    if (b) {
      if (!req.service.pathStyleBucketName(b)) {
        httpRequest.endpoint.hostname = b + '.' + httpRequest.endpoint.hostname;

        var port = httpRequest.endpoint.port;
        if (port !== 80 && port !== 443) {
          httpRequest.endpoint.host = httpRequest.endpoint.hostname + ':' +
            httpRequest.endpoint.port;
        } else {
          httpRequest.endpoint.host = httpRequest.endpoint.hostname;
        }

        httpRequest.virtualHostedBucket = b; // needed for signing the request
        httpRequest.path = httpRequest.path.replace(new RegExp('/' + b), '');
        if (httpRequest.path[0] !== '/') {
          httpRequest.path = '/' + httpRequest.path;
        }
      }
    }
  },


  addContentType: function addContentType(req) {
    var httpRequest = req.httpRequest;
    if (!httpRequest.headers['Content-Type']) { // always have a Content-Type
      httpRequest.headers['Content-Type'] = 'application/octet-stream';
    }

    var contentType = httpRequest.headers['Content-Type'];
    if (window.AWS.util.isBrowser()) {
      if (typeof httpRequest.body === 'string' && !contentType.match(/;\s*charset=/)) {
        var charset = '; charset=UTF-8';
        httpRequest.headers['Content-Type'] += charset;
      } else {
        var replaceFn = function(_, prefix, charset) {
          return prefix + charset.toUpperCase();
        };

        httpRequest.headers['Content-Type'] =
          contentType.replace(/(;\s*charset=)(.+)$/, replaceFn);
      }
    }
  },


  computableChecksumOperations: {
    putBucketCors: true,
    putBucketLifecycle: true,
    putBucketTagging: true,
    deleteObjects: true
  },


  willComputeChecksums: function willComputeChecksums(req) {
    if (this.computableChecksumOperations[req.operation]) return true;
    if (!this.config.computeChecksums) return false;

    if (!window.AWS.util.Buffer.isBuffer(req.httpRequest.body) &&
        typeof req.httpRequest.body !== 'string') {
      return false;
    }

    var rules = req.service.api.operations[req.operation].input.members;

    if (req.service.getSignerClass(req) === window.AWS.Signers.V4) {
      if (rules.ContentMD5 && !rules.ContentMD5.required) return false;
    }

    if (rules.ContentMD5 && !req.params.ContentMD5) return true;
  },


  computeContentMd5: function computeContentMd5(req) {
    if (req.service.willComputeChecksums(req)) {
      var md5 = window.AWS.util.crypto.md5(req.httpRequest.body, 'base64');
      req.httpRequest.headers['Content-MD5'] = md5;
    }
  },


  computeSha256: function computeSha256(req) {
    if (req.service.getSignerClass(req) === window.AWS.Signers.V4) {
      req.httpRequest.headers['X-Amz-Content-Sha256'] =
        window.AWS.util.crypto.sha256(req.httpRequest.body || '', 'hex');
    }
  },


  pathStyleBucketName: function pathStyleBucketName(bucketName) {
    if (this.config.s3ForcePathStyle) return true;

    if (this.dnsCompatibleBucketName(bucketName)) {
      return (this.config.sslEnabled && bucketName.match(/\./)) ? true : false;
    } else {
      return true; // not dns compatible names must always use path style
    }
  },


  dnsCompatibleBucketName: function dnsCompatibleBucketName(bucketName) {
    var b = bucketName;
    var domain = new RegExp(/^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/);
    var ipAddress = new RegExp(/(\d+\.){3}\d+/);
    var dots = new RegExp(/\.\./);
    return (b.match(domain) && !b.match(ipAddress) && !b.match(dots)) ? true : false;
  },


  escapePathParam: function escapePathParam(value) {
    return window.AWS.util.uriEscapePath(String(value));
  },


  successfulResponse: function successfulResponse(resp) {
    var req = resp.request;
    var httpResponse = resp.httpResponse;
    if (req.operation === 'completeMultipartUpload' &&
        httpResponse.body.toString().match('<Error>'))
      return false;
    else
      return httpResponse.statusCode < 300;
  },


  retryableError: function retryableError(error, request) {
    if (request.operation === 'completeMultipartUpload' &&
        error.statusCode === 200) {
      return true;
    } else {
      var _super = window.AWS.Service.prototype.retryableError;
      return _super.call(this, error, request);
    }
  },


  extractData: function extractData(resp) {
    var req = resp.request;
    if (req.operation === 'getBucketLocation') {
      var match = resp.httpResponse.body.toString().match(/>(.+)<\/Location/);
      if (match) {
        delete resp.data['_'];
        resp.data.LocationConstraint = match[1];
      }
    }
  },


  extractError: function extractError(resp) {
    var codes = {
      304: 'NotModified',
      403: 'Forbidden',
      400: 'BadRequest',
      404: 'NotFound'
    };

    var code = resp.httpResponse.statusCode;
    var body = resp.httpResponse.body;
    if (codes[code] && body.length === 0) {
      resp.error = window.AWS.util.error(new Error(), {
        code: codes[resp.httpResponse.statusCode],
        message: null
      });
    } else {
      var data = new window.AWS.XML.Parser({}).parse(body.toString());
      resp.error = window.AWS.util.error(new Error(), {
        code: data.Code || code,
        message: data.Message || null
      });
    }
  },


  setEndpoint: function setEndpoint(endpoint) {
    if (endpoint) {
      this.endpoint = new window.AWS.Endpoint(endpoint, this.config);
    } else if (this.config.region && this.config.region !== 'us-east-1') {
      var sep = '-';
      if (this.isRegionV4()) sep = '.';
      var hostname = 's3' + sep + this.config.region + this.endpointSuffix();
      this.endpoint = new window.AWS.Endpoint(hostname);
    } else {
      this.endpoint = new window.AWS.Endpoint(this.api.globalEndpoint, this.config);
    }
  },


  getSignedUrl: function getSignedUrl(operation, params, callback) {
    params = window.AWS.util.copy(params || {});
    var expires = params.Expires || 900;
    delete params.Expires; // we can't validate this
    var request = this.makeRequest(operation, params);

    var expiresHeader = 'presigned-expires';

    function signedUrlBuilder() {
      delete request.httpRequest.headers['User-Agent'];
      delete request.httpRequest.headers['X-Amz-User-Agent'];

      if (request.service.getSignerClass() === window.AWS.Signers.V4) {
        if (expires > 604800) { // one week expiry is invalid
          var message = 'getSignedUrl() does not support expiry time greater ' +
                        'than a week with SigV4 signing.';
          throw window.AWS.util.error(new Error(), {
            code: 'InvalidExpiryTime', message: message, retryable: false
          });
        }
        request.httpRequest.headers[expiresHeader] = expires;
      } else {
        request.httpRequest.headers[expiresHeader] = parseInt(
          window.AWS.util.date.unixTimestamp() + expires, 10).toString();
      }
    }

    function signedUrlSigner() {
      var queryParams = {};

      window.AWS.util.each(request.httpRequest.headers, function (key, value) {
        if (key === expiresHeader) key = 'Expires';
        queryParams[key] = value;
      });
      delete request.httpRequest.headers[expiresHeader];

      var auth = queryParams['Authorization'].split(' ');
      if (auth[0] === 'AWS') {
        auth = auth[1].split(':');
        queryParams['AWSAccessKeyId'] = auth[0];
        queryParams['Signature'] = auth[1];
      } else if (auth[0] === 'AWS4-HMAC-SHA256') { // SigV4 signing
        auth.shift();
        var rest = auth.join(' ');
        var signature = rest.match(/Signature=(.*?)(?:,|\s|\r?\n|$)/)[1];
        queryParams['X-Amz-Signature'] = signature;
        delete queryParams['Expires'];
      }
      delete queryParams['Authorization'];
      delete queryParams['Host'];

      var endpoint = request.httpRequest.endpoint;
      var parsedUrl = window.AWS.util.urlParse(request.httpRequest.path);
      var querystring = window.AWS.util.queryParamsToString(queryParams);
      endpoint.pathname = parsedUrl.pathname;
      endpoint.search = !parsedUrl.search ? querystring :
                        parsedUrl.search + '&' + querystring;
    }

    request.on('build', signedUrlBuilder);
    request.on('sign', signedUrlSigner);
    request.removeListener('build', this.addContentType);
    request.removeListener('afterBuild',
      window.AWS.EventListeners.Core.SET_CONTENT_LENGTH);
    if (!params.Body) { // no Content-MD5/SHA-256 if body is not provided
      request.removeListener('build', this.computeContentMd5);
      request.removeListener('build', this.computeSha256);
    }

    if (callback) {
      request.build(function() {
        if (request.response.error) callback(request.response.error, null);
        else callback(null, window.AWS.util.urlFormat(request.httpRequest.endpoint));
      });
    } else {
      request.build();
      return window.AWS.util.urlFormat(request.httpRequest.endpoint);
    }
  },

  createBucket: function createBucket(params, callback) {
    if (!params) params = {};
    var hostname = this.endpoint.hostname;
    if (hostname !== this.api.globalEndpoint && !params.CreateBucketConfiguration) {
      params.CreateBucketConfiguration = { LocationConstraint: this.config.region };
    }
    return this.makeRequest('createBucket', params, callback);
  }
});

window.AWS.Service.defineServiceApi(window.AWS.S3, "2006-03-01", {"format":"rest-xml","apiVersion":"2006-03-01","checksumFormat":"md5","endpointPrefix":"s3","globalEndpoint":"s3.amazonaws.com","serviceAbbreviation":"Amazon S3","serviceFullName":"Amazon Simple Storage Service","signatureVersion":"s3","timestampFormat":"rfc822","xmlnamespace":"http://s3.amazonaws.com/doc/2006-03-01/","operations":{"abortMultipartUpload":{"name":"AbortMultipartUpload","http":{"method":"DELETE","uri":"/{Bucket}/{Key}?uploadId={UploadId}"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"Key":{"required":true,"location":"uri"},"UploadId":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{}}},"completeMultipartUpload":{"name":"CompleteMultipartUpload","http":{"method":"POST","uri":"/{Bucket}/{Key}?uploadId={UploadId}"},"input":{"payload":"MultipartUpload","type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"Key":{"required":true,"location":"uri"},"MultipartUpload":{"type":"structure","members":{"Parts":{"type":"list","members":{"type":"structure","members":{"ETag":{},"PartNumber":{"type":"integer"}}},"flattened":true,"name":"Part"}},"name":"CompleteMultipartUpload"},"UploadId":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{"Location":{},"Bucket":{},"Key":{},"Expiration":{"type":"timestamp","location":"header","name":"x-amz-expiration"},"ETag":{},"ServerSideEncryption":{"location":"header","name":"x-amz-server-side-encryption"},"VersionId":{"location":"header","name":"x-amz-version-id"}}}},"copyObject":{"name":"CopyObject","http":{"method":"PUT","uri":"/{Bucket}/{Key}"},"input":{"type":"structure","members":{"ACL":{"location":"header","name":"x-amz-acl"},"Bucket":{"required":true,"location":"uri"},"CacheControl":{"location":"header","name":"Cache-Control"},"ContentDisposition":{"location":"header","name":"Content-Disposition"},"ContentEncoding":{"location":"header","name":"Content-Encoding"},"ContentLanguage":{"location":"header","name":"Content-Language"},"ContentType":{"location":"header","name":"Content-Type"},"CopySource":{"required":true,"location":"header","name":"x-amz-copy-source"},"CopySourceIfMatch":{"type":"timestamp","location":"header","name":"x-amz-copy-source-if-match"},"CopySourceIfModifiedSince":{"type":"timestamp","location":"header","name":"x-amz-copy-source-if-modified-since"},"CopySourceIfNoneMatch":{"type":"timestamp","location":"header","name":"x-amz-copy-source-if-none-match"},"CopySourceIfUnmodifiedSince":{"type":"timestamp","location":"header","name":"x-amz-copy-source-if-unmodified-since"},"Expires":{"type":"timestamp","location":"header","name":"Expires"},"GrantFullControl":{"location":"header","name":"x-amz-grant-full-control"},"GrantRead":{"location":"header","name":"x-amz-grant-read"},"GrantReadACP":{"location":"header","name":"x-amz-grant-read-acp"},"GrantWriteACP":{"location":"header","name":"x-amz-grant-write-acp"},"Key":{"required":true,"location":"uri"},"Metadata":{"type":"map","location":"header","name":"x-amz-meta-","keys":{},"members":{}},"MetadataDirective":{"location":"header","name":"x-amz-metadata-directive"},"ServerSideEncryption":{"location":"header","name":"x-amz-server-side-encryption"},"StorageClass":{"location":"header","name":"x-amz-storage-class"},"WebsiteRedirectLocation":{"location":"header","name":"x-amz-website-redirect-location"}}},"output":{"type":"structure","members":{"Expiration":{"type":"timestamp","location":"header","name":"x-amz-expiration"},"CopySourceVersionId":{"location":"header","name":"x-amz-copy-source-version-id"},"ServerSideEncryption":{"location":"header","name":"x-amz-server-side-encryption"},"ETag":{},"LastModified":{"type":"timestamp"}}},"alias":"PutObjectCopy"},"createBucket":{"name":"CreateBucket","http":{"method":"PUT","uri":"/{Bucket}"},"input":{"payload":"CreateBucketConfiguration","type":"structure","members":{"ACL":{"location":"header","name":"x-amz-acl"},"Bucket":{"required":true,"location":"uri"},"CreateBucketConfiguration":{"type":"structure","members":{"LocationConstraint":{}}},"GrantFullControl":{"location":"header","name":"x-amz-grant-full-control"},"GrantRead":{"location":"header","name":"x-amz-grant-read"},"GrantReadACP":{"location":"header","name":"x-amz-grant-read-acp"},"GrantWrite":{"location":"header","name":"x-amz-grant-write"},"GrantWriteACP":{"location":"header","name":"x-amz-grant-write-acp"}}},"output":{"type":"structure","members":{"Location":{"location":"header","name":"Location"}}},"alias":"PutBucket"},"createMultipartUpload":{"name":"CreateMultipartUpload","http":{"method":"POST","uri":"/{Bucket}/{Key}?uploads"},"input":{"type":"structure","members":{"ACL":{"location":"header","name":"x-amz-acl"},"Bucket":{"required":true,"location":"uri"},"CacheControl":{"location":"header","name":"Cache-Control"},"ContentDisposition":{"location":"header","name":"Content-Disposition"},"ContentEncoding":{"location":"header","name":"Content-Encoding"},"ContentLanguage":{"location":"header","name":"Content-Language"},"ContentType":{"location":"header","name":"Content-Type"},"Expires":{"type":"timestamp","location":"header","name":"Expires"},"GrantFullControl":{"location":"header","name":"x-amz-grant-full-control"},"GrantRead":{"location":"header","name":"x-amz-grant-read"},"GrantReadACP":{"location":"header","name":"x-amz-grant-read-acp"},"GrantWriteACP":{"location":"header","name":"x-amz-grant-write-acp"},"Key":{"required":true,"location":"uri"},"Metadata":{"type":"map","location":"header","name":"x-amz-meta-","keys":{},"members":{}},"ServerSideEncryption":{"location":"header","name":"x-amz-server-side-encryption"},"StorageClass":{"location":"header","name":"x-amz-storage-class"},"WebsiteRedirectLocation":{"location":"header","name":"x-amz-website-redirect-location"}}},"output":{"type":"structure","members":{"Bucket":{"name":"Bucket"},"Key":{},"UploadId":{},"ServerSideEncryption":{"location":"header","name":"x-amz-server-side-encryption"}}},"alias":"InitiateMultipartUpload"},"deleteBucket":{"name":"DeleteBucket","http":{"method":"DELETE","uri":"/{Bucket}"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{}}},"deleteBucketCors":{"name":"DeleteBucketCors","http":{"method":"DELETE","uri":"/{Bucket}?cors"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{}}},"deleteBucketLifecycle":{"name":"DeleteBucketLifecycle","http":{"method":"DELETE","uri":"/{Bucket}?lifecycle"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{}}},"deleteBucketPolicy":{"name":"DeleteBucketPolicy","http":{"method":"DELETE","uri":"/{Bucket}?policy"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{}}},"deleteBucketTagging":{"name":"DeleteBucketTagging","http":{"method":"DELETE","uri":"/{Bucket}?tagging"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{}}},"deleteBucketWebsite":{"name":"DeleteBucketWebsite","http":{"method":"DELETE","uri":"/{Bucket}?website"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{}}},"deleteObject":{"name":"DeleteObject","http":{"method":"DELETE","uri":"/{Bucket}/{Key}?versionId={VersionId}"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"Key":{"required":true,"location":"uri"},"MFA":{"location":"header","name":"x-amz-mfa"},"VersionId":{"location":"uri"}}},"output":{"type":"structure","members":{"DeleteMarker":{"type":"boolean","location":"header","name":"x-amz-delete-marker"},"VersionId":{"location":"header","name":"x-amz-version-id"}}}},"deleteObjects":{"name":"DeleteObjects","http":{"method":"POST","uri":"/{Bucket}?delete"},"input":{"payload":"Delete","type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"Delete":{"type":"structure","members":{"Objects":{"type":"list","members":{"type":"structure","members":{"Key":{"required":true},"VersionId":{}}},"flattened":true,"required":true,"name":"Object"},"Quiet":{"type":"boolean"}},"required":true},"MFA":{"location":"header","name":"x-amz-mfa"}}},"output":{"type":"structure","members":{"Deleted":{"type":"list","members":{"type":"structure","members":{"Key":{},"VersionId":{},"DeleteMarker":{"type":"boolean"},"DeleteMarkerVersionId":{}}},"flattened":true},"Error":{"type":"list","members":{"type":"structure","members":{"Key":{},"VersionId":{},"Code":{},"Message":{}}},"flattened":true,"name":"Errors"}}},"alias":"DeleteMultipleObjects"},"getBucketAcl":{"name":"GetBucketAcl","http":{"method":"GET","uri":"/{Bucket}?acl"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{"Owner":{"type":"structure","members":{"DisplayName":{},"ID":{}}},"AccessControlList":{"type":"list","members":{"type":"structure","members":{"Grantee":{"type":"structure","members":{"DisplayName":{},"EmailAddress":{},"ID":{},"xsi:type":{"attribute":true,"name":"Type"},"URI":{}},"xmlns":{"prefix":"xsi","uri":"http://www.w3.org/2001/XMLSchema-instance"}},"Permission":{}},"name":"Grant"},"name":"Grants"}}}},"getBucketCors":{"name":"GetBucketCors","http":{"method":"GET","uri":"/{Bucket}?cors"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{"CORSRule":{"type":"list","members":{"type":"structure","members":{"AllowedHeader":{"type":"list","members":{},"flattened":true,"name":"AllowedHeaders"},"AllowedMethod":{"type":"list","members":{},"flattened":true,"name":"AllowedMethods"},"AllowedOrigin":{"type":"list","members":{},"flattened":true,"name":"AllowedOrigins"},"ExposeHeader":{"type":"list","members":{},"flattened":true,"name":"ExposeHeaders"},"MaxAgeSeconds":{"type":"integer"}}},"flattened":true,"name":"CORSRules"}}}},"getBucketLifecycle":{"name":"GetBucketLifecycle","http":{"method":"GET","uri":"/{Bucket}?lifecycle"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{"Rule":{"type":"list","members":{"type":"structure","members":{"Expiration":{"type":"structure","members":{"Date":{"type":"timestamp","format":"iso8601"},"Days":{"type":"integer"}}},"ID":{},"Prefix":{},"Status":{},"Transition":{"type":"structure","members":{"Date":{"type":"timestamp","format":"iso8601"},"Days":{"type":"integer"},"StorageClass":{}}}}},"flattened":true,"name":"Rules"}}}},"getBucketLocation":{"name":"GetBucketLocation","http":{"method":"GET","uri":"/{Bucket}?location"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{"LocationConstraint":{}}}},"getBucketLogging":{"name":"GetBucketLogging","http":{"method":"GET","uri":"/{Bucket}?logging"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{"LoggingEnabled":{"type":"structure","members":{"TargetBucket":{},"TargetGrants":{"type":"list","members":{"type":"structure","members":{"Grantee":{"type":"structure","members":{"DisplayName":{},"EmailAddress":{},"ID":{},"xsi:type":{"attribute":true,"name":"Type"},"URI":{}},"xmlns":{"prefix":"xsi","uri":"http://www.w3.org/2001/XMLSchema-instance"}},"Permission":{}},"name":"Grant"}},"TargetPrefix":{}}}}}},"getBucketNotification":{"name":"GetBucketNotification","http":{"method":"GET","uri":"/{Bucket}?notification"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{"TopicConfiguration":{"type":"structure","members":{"Event":{},"Topic":{}}}}}},"getBucketPolicy":{"name":"GetBucketPolicy","http":{"method":"GET","uri":"/{Bucket}?policy"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{"Policy":{}},"payload":"Policy"}},"getBucketRequestPayment":{"name":"GetBucketRequestPayment","http":{"method":"GET","uri":"/{Bucket}?requestPayment"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{"Payer":{}}}},"getBucketTagging":{"name":"GetBucketTagging","http":{"method":"GET","uri":"/{Bucket}?tagging"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{"TagSet":{"type":"list","members":{"type":"structure","members":{"Key":{},"Value":{}},"name":"Tag"}}}}},"getBucketVersioning":{"name":"GetBucketVersioning","http":{"method":"GET","uri":"/{Bucket}?versioning"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{"Status":{},"MFADelete":{}}}},"getBucketWebsite":{"name":"GetBucketWebsite","http":{"method":"GET","uri":"/{Bucket}?website"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{"RedirectAllRequestsTo":{"type":"structure","members":{"HostName":{},"Protocol":{}}},"IndexDocument":{"type":"structure","members":{"Suffix":{}}},"ErrorDocument":{"type":"structure","members":{"Key":{}}},"RoutingRules":{"type":"list","members":{"type":"structure","members":{"Condition":{"type":"structure","members":{"HttpErrorCodeReturnedEquals":{},"KeyPrefixEquals":{}}},"Redirect":{"type":"structure","members":{"HostName":{},"HttpRedirectCode":{},"Protocol":{},"ReplaceKeyPrefixWith":{},"ReplaceKeyWith":{}}}},"name":"RoutingRule"}}}}},"getObject":{"name":"GetObject","http":{"method":"GET","uri":"/{Bucket}/{Key}?versionId={VersionId}&response-content-type={ResponseContentType}&response-content-language={ResponseContentLanguage}&response-expires={ResponseExpires}&response-cache-control={ResponseCacheControl}&response-content-disposition={ResponseContentDisposition}&response-content-encoding={ResponseContentEncoding}"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"IfMatch":{"location":"header","name":"If-Match"},"IfModifiedSince":{"type":"timestamp","location":"header","name":"If-Modified-Since"},"IfNoneMatch":{"location":"header","name":"If-None-Match"},"IfUnmodifiedSince":{"type":"timestamp","location":"header","name":"If-Unmodified-Since"},"Key":{"required":true,"location":"uri"},"Range":{"location":"header","name":"Range"},"ResponseCacheControl":{"location":"uri"},"ResponseContentDisposition":{"location":"uri"},"ResponseContentEncoding":{"location":"uri"},"ResponseContentLanguage":{"location":"uri"},"ResponseContentType":{"location":"uri"},"ResponseExpires":{"type":"timestamp","location":"uri"},"VersionId":{"location":"uri"}}},"output":{"type":"structure","members":{"Body":{"type":"binary","streaming":true},"DeleteMarker":{"type":"boolean","location":"header","name":"x-amz-delete-marker"},"AcceptRanges":{"location":"header","name":"accept-ranges"},"Expiration":{"type":"timestamp","location":"header","name":"x-amz-expiration"},"Restore":{"location":"header","name":"x-amz-restore"},"LastModified":{"type":"timestamp","location":"header","name":"Last-Modified"},"ContentLength":{"type":"integer","location":"header","name":"Content-Length"},"ETag":{"location":"header","name":"ETag"},"MissingMeta":{"type":"integer","location":"header","name":"x-amz-missing-meta"},"VersionId":{"location":"header","name":"x-amz-version-id"},"CacheControl":{"location":"header","name":"Cache-Control"},"ContentDisposition":{"location":"header","name":"Content-Disposition"},"ContentEncoding":{"location":"header","name":"Content-Encoding"},"ContentLanguage":{"location":"header","name":"Content-Language"},"ContentType":{"location":"header","name":"Content-Type"},"Expires":{"type":"timestamp","location":"header","name":"Expires"},"WebsiteRedirectLocation":{"location":"header","name":"x-amz-website-redirect-location"},"ServerSideEncryption":{"location":"header","name":"x-amz-server-side-encryption"},"Metadata":{"type":"map","location":"header","name":"x-amz-meta-","keys":{},"members":{}}},"payload":"Body"}},"getObjectAcl":{"name":"GetObjectAcl","http":{"method":"GET","uri":"/{Bucket}/{Key}?acl&versionId={VersionId}"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"Key":{"required":true,"location":"uri"},"VersionId":{"location":"uri"}}},"output":{"type":"structure","members":{"Owner":{"type":"structure","members":{"DisplayName":{},"ID":{}}},"AccessControlList":{"type":"list","members":{"type":"structure","members":{"Grantee":{"type":"structure","members":{"DisplayName":{},"EmailAddress":{},"ID":{},"xsi:type":{"attribute":true,"name":"Type"},"URI":{}},"xmlns":{"prefix":"xsi","uri":"http://www.w3.org/2001/XMLSchema-instance"}},"Permission":{}},"name":"Grant"},"name":"Grants"}}}},"getObjectTorrent":{"name":"GetObjectTorrent","http":{"method":"GET","uri":"/{Bucket}/{Key}?torrent"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"Key":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{"Body":{"type":"binary","streaming":true}},"payload":"Body"}},"headBucket":{"name":"HeadBucket","http":{"method":"HEAD","uri":"/{Bucket}"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{}}},"headObject":{"name":"HeadObject","http":{"method":"HEAD","uri":"/{Bucket}/{Key}?versionId={VersionId}"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"IfMatch":{"location":"header","name":"If-Match"},"IfModifiedSince":{"type":"timestamp","location":"header","name":"If-Modified-Since"},"IfNoneMatch":{"location":"header","name":"If-None-Match"},"IfUnmodifiedSince":{"type":"timestamp","location":"header","name":"If-Unmodified-Since"},"Key":{"required":true,"location":"uri"},"Range":{"location":"header","name":"Range"},"VersionId":{"location":"uri"}}},"output":{"type":"structure","members":{"DeleteMarker":{"type":"boolean","location":"header","name":"x-amz-delete-marker"},"AcceptRanges":{"location":"header","name":"accept-ranges"},"Expiration":{"type":"timestamp","location":"header","name":"x-amz-expiration"},"Restore":{"location":"header","name":"x-amz-restore"},"LastModified":{"type":"timestamp","location":"header","name":"Last-Modified"},"ContentLength":{"type":"integer","location":"header","name":"Content-Length"},"ETag":{"location":"header","name":"ETag"},"MissingMeta":{"type":"integer","location":"header","name":"x-amz-missing-meta"},"VersionId":{"location":"header","name":"x-amz-version-id"},"CacheControl":{"location":"header","name":"Cache-Control"},"ContentDisposition":{"location":"header","name":"Content-Disposition"},"ContentEncoding":{"location":"header","name":"Content-Encoding"},"ContentLanguage":{"location":"header","name":"Content-Language"},"ContentType":{"location":"header","name":"Content-Type"},"Expires":{"type":"timestamp","location":"header","name":"Expires"},"WebsiteRedirectLocation":{"location":"header","name":"x-amz-website-redirect-location"},"ServerSideEncryption":{"location":"header","name":"x-amz-server-side-encryption"},"Metadata":{"type":"map","location":"header","name":"x-amz-meta-","keys":{},"members":{}}}}},"listBuckets":{"name":"ListBuckets","http":{"method":"GET","uri":"/"},"input":{"type":"structure","members":{}},"output":{"type":"structure","members":{"Buckets":{"type":"list","members":{"type":"structure","members":{"Name":{},"CreationDate":{"type":"timestamp"}},"name":"Bucket"}},"Owner":{"type":"structure","members":{"DisplayName":{},"ID":{}}}}},"alias":"GetService"},"listMultipartUploads":{"name":"ListMultipartUploads","http":{"method":"GET","uri":"/{Bucket}?uploads&prefix={Prefix}&delimiter={Delimiter}&max-uploads={MaxUploads}&key-marker={KeyMarker}&upload-id-marker={UploadIdMarker}&encoding-type={EncodingType}"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"Delimiter":{"location":"uri"},"EncodingType":{"location":"uri"},"KeyMarker":{"location":"uri"},"MaxUploads":{"type":"integer","location":"uri"},"Prefix":{"location":"uri"},"UploadIdMarker":{"location":"uri"}}},"output":{"type":"structure","members":{"Bucket":{},"KeyMarker":{},"UploadIdMarker":{},"NextKeyMarker":{},"Prefix":{},"NextUploadIdMarker":{},"MaxUploads":{"type":"integer"},"IsTruncated":{"type":"boolean"},"Upload":{"type":"list","members":{"type":"structure","members":{"UploadId":{},"Key":{},"Initiated":{"type":"timestamp"},"StorageClass":{},"Owner":{"type":"structure","members":{"DisplayName":{},"ID":{}}},"Initiator":{"type":"structure","members":{"ID":{},"DisplayName":{}}}}},"flattened":true,"name":"Uploads"},"CommonPrefixes":{"type":"list","members":{"type":"structure","members":{"Prefix":{}}},"flattened":true},"EncodingType":{}}}},"listObjectVersions":{"name":"ListObjectVersions","http":{"method":"GET","uri":"/{Bucket}?versions&delimiter={Delimiter}&key-marker={KeyMarker}&max-keys={MaxKeys}&prefix={Prefix}&version-id-marker={VersionIdMarker}&encoding-type={EncodingType}"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"Delimiter":{"location":"uri"},"EncodingType":{"location":"uri"},"KeyMarker":{"location":"uri"},"MaxKeys":{"type":"integer","location":"uri"},"Prefix":{"location":"uri"},"VersionIdMarker":{"location":"uri"}}},"output":{"type":"structure","members":{"IsTruncated":{"type":"boolean"},"KeyMarker":{},"VersionIdMarker":{},"NextKeyMarker":{},"NextVersionIdMarker":{},"Version":{"type":"list","members":{"type":"structure","members":{"ETag":{},"Size":{"type":"integer"},"StorageClass":{},"Key":{},"VersionId":{},"IsLatest":{"type":"boolean"},"LastModified":{"type":"timestamp"},"Owner":{"type":"structure","members":{"DisplayName":{},"ID":{}}}}},"flattened":true,"name":"Versions"},"DeleteMarker":{"type":"list","members":{"type":"structure","members":{"Owner":{"type":"structure","members":{"DisplayName":{},"ID":{}}},"Key":{},"VersionId":{},"IsLatest":{"type":"boolean"},"LastModified":{"type":"timestamp"}}},"flattened":true,"name":"DeleteMarkers"},"Name":{},"Prefix":{},"MaxKeys":{"type":"integer"},"CommonPrefixes":{"type":"list","members":{"type":"structure","members":{"Prefix":{}}},"flattened":true},"EncodingType":{}}},"alias":"GetBucketObjectVersions"},"listObjects":{"name":"ListObjects","http":{"method":"GET","uri":"/{Bucket}?delimiter={Delimiter}&marker={Marker}&max-keys={MaxKeys}&prefix={Prefix}&encoding-type={EncodingType}"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"Delimiter":{"location":"uri"},"EncodingType":{"location":"uri"},"Marker":{"location":"uri"},"MaxKeys":{"type":"integer","location":"uri"},"Prefix":{"location":"uri"}}},"output":{"type":"structure","members":{"IsTruncated":{"type":"boolean"},"Marker":{},"NextMarker":{},"Contents":{"type":"list","members":{"type":"structure","members":{"Key":{},"LastModified":{"type":"timestamp"},"ETag":{},"Size":{"type":"integer"},"StorageClass":{},"Owner":{"type":"structure","members":{"DisplayName":{},"ID":{}}}}},"flattened":true},"Name":{},"Prefix":{},"MaxKeys":{"type":"integer"},"CommonPrefixes":{"type":"list","members":{"type":"structure","members":{"Prefix":{}}},"flattened":true},"EncodingType":{}}},"alias":"GetBucket"},"listParts":{"name":"ListParts","http":{"method":"GET","uri":"/{Bucket}/{Key}?uploadId={UploadId}&max-parts={MaxParts}&part-number-marker={PartNumberMarker}"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"Key":{"required":true,"location":"uri"},"MaxParts":{"type":"integer","location":"uri"},"PartNumberMarker":{"type":"integer","location":"uri"},"UploadId":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{"Bucket":{},"Key":{},"UploadId":{},"PartNumberMarker":{"type":"integer"},"NextPartNumberMarker":{"type":"integer"},"MaxParts":{"type":"integer"},"IsTruncated":{"type":"boolean"},"Part":{"type":"list","members":{"type":"structure","members":{"PartNumber":{"type":"integer"},"LastModified":{"type":"timestamp"},"ETag":{},"Size":{"type":"integer"}}},"flattened":true,"name":"Parts"},"Initiator":{"type":"structure","members":{"ID":{},"DisplayName":{}}},"Owner":{"type":"structure","members":{"DisplayName":{},"ID":{}}},"StorageClass":{}}}},"putBucketAcl":{"name":"PutBucketAcl","http":{"method":"PUT","uri":"/{Bucket}?acl"},"input":{"payload":"AccessControlPolicy","type":"structure","members":{"ACL":{"location":"header","name":"x-amz-acl"},"AccessControlPolicy":{"type":"structure","members":{"Grants":{"type":"list","members":{"type":"structure","members":{"Grantee":{"type":"structure","members":{"DisplayName":{},"EmailAddress":{},"ID":{},"Type":{"required":true,"attribute":true,"name":"xsi:type"},"URI":{}},"xmlns":{"prefix":"xsi","uri":"http://www.w3.org/2001/XMLSchema-instance"}},"Permission":{}},"name":"Grant"},"name":"AccessControlList"},"Owner":{"type":"structure","members":{"DisplayName":{},"ID":{}}}}},"Bucket":{"required":true,"location":"uri"},"ContentMD5":{"location":"header","name":"Content-MD5"},"GrantFullControl":{"location":"header","name":"x-amz-grant-full-control"},"GrantRead":{"location":"header","name":"x-amz-grant-read"},"GrantReadACP":{"location":"header","name":"x-amz-grant-read-acp"},"GrantWrite":{"location":"header","name":"x-amz-grant-write"},"GrantWriteACP":{"location":"header","name":"x-amz-grant-write-acp"}}},"output":{"type":"structure","members":{}}},"putBucketCors":{"name":"PutBucketCors","http":{"method":"PUT","uri":"/{Bucket}?cors"},"input":{"payload":"CORSConfiguration","type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"CORSConfiguration":{"type":"structure","members":{"CORSRules":{"type":"list","members":{"type":"structure","members":{"AllowedHeaders":{"type":"list","members":{},"flattened":true,"name":"AllowedHeader"},"AllowedMethods":{"type":"list","members":{},"flattened":true,"name":"AllowedMethod"},"AllowedOrigins":{"type":"list","members":{},"flattened":true,"name":"AllowedOrigin"},"ExposeHeaders":{"type":"list","members":{},"flattened":true,"name":"ExposeHeader"},"MaxAgeSeconds":{"type":"integer"}}},"flattened":true,"name":"CORSRule"}}},"ContentMD5":{"location":"header","name":"Content-MD5"}}},"output":{"type":"structure","members":{}}},"putBucketLifecycle":{"name":"PutBucketLifecycle","http":{"method":"PUT","uri":"/{Bucket}?lifecycle"},"input":{"payload":"LifecycleConfiguration","type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"ContentMD5":{"location":"header","name":"Content-MD5"},"LifecycleConfiguration":{"type":"structure","members":{"Rules":{"type":"list","members":{"type":"structure","members":{"Expiration":{"type":"structure","members":{"Date":{"type":"timestamp","format":"iso8601"},"Days":{"type":"integer"}}},"ID":{},"Prefix":{"required":true},"Status":{"required":true},"Transition":{"type":"structure","members":{"Date":{"type":"timestamp","format":"iso8601"},"Days":{"type":"integer"},"StorageClass":{}}}}},"flattened":true,"required":true,"name":"Rule"}}}}},"output":{"type":"structure","members":{}}},"putBucketLogging":{"name":"PutBucketLogging","http":{"method":"PUT","uri":"/{Bucket}?logging"},"input":{"payload":"BucketLoggingStatus","type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"BucketLoggingStatus":{"type":"structure","members":{"LoggingEnabled":{"type":"structure","members":{"TargetBucket":{},"TargetGrants":{"type":"list","members":{"type":"structure","members":{"Grantee":{"type":"structure","members":{"DisplayName":{},"EmailAddress":{},"ID":{},"Type":{"required":true,"attribute":true,"name":"xsi:type"},"URI":{}},"xmlns":{"prefix":"xsi","uri":"http://www.w3.org/2001/XMLSchema-instance"}},"Permission":{}},"name":"Grant"}},"TargetPrefix":{}}}},"required":true},"ContentMD5":{"location":"header","name":"Content-MD5"}}},"output":{"type":"structure","members":{}}},"putBucketNotification":{"name":"PutBucketNotification","http":{"method":"PUT","uri":"/{Bucket}?notification"},"input":{"payload":"NotificationConfiguration","type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"ContentMD5":{"location":"header","name":"Content-MD5"},"NotificationConfiguration":{"type":"structure","members":{"TopicConfiguration":{"type":"structure","members":{"Event":{},"Topic":{}},"required":true}},"required":true}}},"output":{"type":"structure","members":{}}},"putBucketPolicy":{"name":"PutBucketPolicy","http":{"method":"PUT","uri":"/{Bucket}?policy"},"input":{"payload":"Policy","type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"ContentMD5":{"location":"header","name":"Content-MD5"},"Policy":{"required":true}}},"output":{"type":"structure","members":{}}},"putBucketRequestPayment":{"name":"PutBucketRequestPayment","http":{"method":"PUT","uri":"/{Bucket}?requestPayment"},"input":{"payload":"RequestPaymentConfiguration","type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"ContentMD5":{"location":"header","name":"Content-MD5"},"RequestPaymentConfiguration":{"type":"structure","members":{"Payer":{"required":true}},"required":true}}},"output":{"type":"structure","members":{}}},"putBucketTagging":{"name":"PutBucketTagging","http":{"method":"PUT","uri":"/{Bucket}?tagging"},"input":{"payload":"Tagging","type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"ContentMD5":{"location":"header","name":"Content-MD5"},"Tagging":{"type":"structure","members":{"TagSet":{"type":"list","members":{"type":"structure","members":{"Key":{"required":true},"Value":{"required":true}},"name":"Tag"},"required":true}},"required":true}}},"output":{"type":"structure","members":{}}},"putBucketVersioning":{"name":"PutBucketVersioning","http":{"method":"PUT","uri":"/{Bucket}?versioning"},"input":{"payload":"VersioningConfiguration","type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"ContentMD5":{"location":"header","name":"Content-MD5"},"MFA":{"location":"header","name":"x-amz-mfa"},"VersioningConfiguration":{"type":"structure","members":{"MFADelete":{},"Status":{}},"required":true}}},"output":{"type":"structure","members":{}}},"putBucketWebsite":{"name":"PutBucketWebsite","http":{"method":"PUT","uri":"/{Bucket}?website"},"input":{"payload":"WebsiteConfiguration","type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"ContentMD5":{"location":"header","name":"Content-MD5"},"WebsiteConfiguration":{"type":"structure","members":{"ErrorDocument":{"type":"structure","members":{"Key":{"required":true}}},"IndexDocument":{"type":"structure","members":{"Suffix":{"required":true}}},"RedirectAllRequestsTo":{"type":"structure","members":{"HostName":{"required":true},"Protocol":{}}},"RoutingRules":{"type":"list","members":{"type":"structure","members":{"Condition":{"type":"structure","members":{"HttpErrorCodeReturnedEquals":{},"KeyPrefixEquals":{}}},"Redirect":{"type":"structure","members":{"HostName":{},"HttpRedirectCode":{},"Protocol":{},"ReplaceKeyPrefixWith":{},"ReplaceKeyWith":{}},"required":true}},"name":"RoutingRule"}}},"required":true}}},"output":{"type":"structure","members":{}}},"putObject":{"name":"PutObject","http":{"method":"PUT","uri":"/{Bucket}/{Key}"},"input":{"payload":"Body","type":"structure","members":{"ACL":{"location":"header","name":"x-amz-acl"},"Body":{"type":"binary","streaming":true},"Bucket":{"required":true,"location":"uri"},"CacheControl":{"location":"header","name":"Cache-Control"},"ContentDisposition":{"location":"header","name":"Content-Disposition"},"ContentEncoding":{"location":"header","name":"Content-Encoding"},"ContentLanguage":{"location":"header","name":"Content-Language"},"ContentLength":{"type":"integer","location":"header","name":"Content-Length"},"ContentMD5":{"location":"header","name":"Content-MD5"},"ContentType":{"location":"header","name":"Content-Type"},"Expires":{"type":"timestamp","location":"header","name":"Expires"},"GrantFullControl":{"location":"header","name":"x-amz-grant-full-control"},"GrantRead":{"location":"header","name":"x-amz-grant-read"},"GrantReadACP":{"location":"header","name":"x-amz-grant-read-acp"},"GrantWriteACP":{"location":"header","name":"x-amz-grant-write-acp"},"Key":{"required":true,"location":"uri"},"Metadata":{"type":"map","location":"header","name":"x-amz-meta-","keys":{},"members":{}},"ServerSideEncryption":{"location":"header","name":"x-amz-server-side-encryption"},"StorageClass":{"location":"header","name":"x-amz-storage-class"},"WebsiteRedirectLocation":{"location":"header","name":"x-amz-website-redirect-location"}}},"output":{"type":"structure","members":{"Expiration":{"type":"timestamp","location":"header","name":"x-amz-expiration"},"ETag":{"location":"header","name":"ETag"},"ServerSideEncryption":{"location":"header","name":"x-amz-server-side-encryption"},"VersionId":{"location":"header","name":"x-amz-version-id"}}}},"putObjectAcl":{"name":"PutObjectAcl","http":{"method":"PUT","uri":"/{Bucket}/{Key}?acl"},"input":{"payload":"AccessControlPolicy","type":"structure","members":{"ACL":{"location":"header","name":"x-amz-acl"},"AccessControlPolicy":{"type":"structure","members":{"Grants":{"type":"list","members":{"type":"structure","members":{"Grantee":{"type":"structure","members":{"DisplayName":{},"EmailAddress":{},"ID":{},"Type":{"required":true,"attribute":true,"name":"xsi:type"},"URI":{}},"xmlns":{"prefix":"xsi","uri":"http://www.w3.org/2001/XMLSchema-instance"}},"Permission":{}},"name":"Grant"},"name":"AccessControlList"},"Owner":{"type":"structure","members":{"DisplayName":{},"ID":{}}}}},"Bucket":{"required":true,"location":"uri"},"ContentMD5":{"location":"header","name":"Content-MD5"},"GrantFullControl":{"location":"header","name":"x-amz-grant-full-control"},"GrantRead":{"location":"header","name":"x-amz-grant-read"},"GrantReadACP":{"location":"header","name":"x-amz-grant-read-acp"},"GrantWrite":{"location":"header","name":"x-amz-grant-write"},"GrantWriteACP":{"location":"header","name":"x-amz-grant-write-acp"},"Key":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{}}},"restoreObject":{"name":"RestoreObject","http":{"method":"POST","uri":"/{Bucket}/{Key}?restore"},"input":{"payload":"RestoreRequest","type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"Key":{"required":true,"location":"uri"},"RestoreRequest":{"type":"structure","members":{"Days":{"type":"integer","required":true}}}}},"output":{"type":"structure","members":{}},"alias":"PostObjectRestore"},"uploadPart":{"name":"UploadPart","http":{"method":"PUT","uri":"/{Bucket}/{Key}?partNumber={PartNumber}&uploadId={UploadId}"},"input":{"payload":"Body","type":"structure","members":{"Body":{"type":"binary","streaming":true},"Bucket":{"required":true,"location":"uri"},"ContentLength":{"type":"integer","location":"header","name":"Content-Length"},"ContentMD5":{"location":"header","name":"Content-MD5"},"Key":{"required":true,"location":"uri"},"PartNumber":{"type":"integer","required":true,"location":"uri"},"UploadId":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{"ServerSideEncryption":{"location":"header","name":"x-amz-server-side-encryption"},"ETag":{"location":"header","name":"ETag"}}}},"uploadPartCopy":{"name":"UploadPartCopy","http":{"method":"PUT","uri":"/{Bucket}/{Key}?partNumber={PartNumber}&uploadId={UploadId}"},"input":{"type":"structure","members":{"Bucket":{"required":true,"location":"uri"},"CopySource":{"required":true,"location":"header","name":"x-amz-copy-source"},"CopySourceIfMatch":{"type":"timestamp","location":"header","name":"x-amz-copy-source-if-match"},"CopySourceIfModifiedSince":{"type":"timestamp","location":"header","name":"x-amz-copy-source-if-modified-since"},"CopySourceIfNoneMatch":{"type":"timestamp","location":"header","name":"x-amz-copy-source-if-none-match"},"CopySourceIfUnmodifiedSince":{"type":"timestamp","location":"header","name":"x-amz-copy-source-if-unmodified-since"},"CopySourceRange":{"location":"header","name":"x-amz-copy-source-range"},"Key":{"required":true,"location":"uri"},"PartNumber":{"type":"integer","required":true,"location":"uri"},"UploadId":{"required":true,"location":"uri"}}},"output":{"type":"structure","members":{"CopySourceVersionId":{"location":"header","name":"x-amz-copy-source-version-id"},"ServerSideEncryption":{"location":"header","name":"x-amz-server-side-encryption"},"ETag":{},"LastModified":{"type":"timestamp"}}}}},"pagination":{"listBuckets":{"resultKey":"Buckets"},"listMultipartUploads":{"limitKey":"MaxUploads","moreResults":"IsTruncated","outputToken":["NextKeyMarker","NextUploadIdMarker"],"inputToken":["KeyMarker","UploadIdMarker"],"resultKey":"Uploads"},"listObjectVersions":{"moreResults":"IsTruncated","limitKey":"MaxKeys","outputToken":["NextKeyMarker","NextVersionIdMarker"],"inputToken":["KeyMarker","VersionIdMarker"],"resultKey":"Versions"},"listObjects":{"moreResults":"IsTruncated","limitKey":"MaxKeys","outputToken":"NextMarker or Contents[-1].Key","inputToken":"Marker","resultKey":["Contents","CommonPrefixes"]},"listParts":{"moreResults":"IsTruncated","limitKey":"MaxParts","outputToken":"NextPartNumberMarker","inputToken":"PartNumberMarker","resultKey":"Parts"}},"waiters":{"__default__":{"interval":5,"maxAttempts":20},"bucketExists":{"operation":"HeadBucket","ignoreErrors":["NoSuchBucket"],"successType":"output"},"bucketNotExists":{"operation":"HeadBucket","successType":"error","successValue":404},"objectExists":{"operation":"HeadObject","ignoreErrors":["NoSuchKey"],"successType":"output"},"objectNotExists":{"operation":"HeadObject","successType":"error","successValue":404}}});
window.AWS.SNS = window.AWS.Service.defineService('sns');

window.AWS.Service.defineServiceApi(window.AWS.SNS, "2010-03-31", {"format":"query","apiVersion":"2010-03-31","endpointPrefix":"sns","resultWrapped":true,"serviceAbbreviation":"Amazon SNS","serviceFullName":"Amazon Simple Notification Service","signatureVersion":"v4","timestampFormat":"iso8601","operations":{"addPermission":{"name":"AddPermission","input":{"type":"structure","members":{"TopicArn":{"required":true},"Label":{"required":true},"AWSAccountId":{"type":"list","members":{},"required":true},"ActionName":{"type":"list","members":{},"required":true}}},"output":{"type":"structure","members":{}}},"confirmSubscription":{"name":"ConfirmSubscription","input":{"type":"structure","members":{"TopicArn":{"required":true},"Token":{"required":true},"AuthenticateOnUnsubscribe":{}}},"output":{"type":"structure","members":{"SubscriptionArn":{}}}},"createPlatformApplication":{"name":"CreatePlatformApplication","input":{"type":"structure","members":{"Name":{"required":true},"Platform":{"required":true},"Attributes":{"type":"map","keys":{},"members":{},"required":true}}},"output":{"type":"structure","members":{"PlatformApplicationArn":{}}}},"createPlatformEndpoint":{"name":"CreatePlatformEndpoint","input":{"type":"structure","members":{"PlatformApplicationArn":{"required":true},"Token":{"required":true},"CustomUserData":{},"Attributes":{"type":"map","keys":{},"members":{}}}},"output":{"type":"structure","members":{"EndpointArn":{}}}},"createTopic":{"name":"CreateTopic","input":{"type":"structure","members":{"Name":{"required":true}}},"output":{"type":"structure","members":{"TopicArn":{}}}},"deleteEndpoint":{"name":"DeleteEndpoint","input":{"type":"structure","members":{"EndpointArn":{"required":true}}},"output":{"type":"structure","members":{}}},"deletePlatformApplication":{"name":"DeletePlatformApplication","input":{"type":"structure","members":{"PlatformApplicationArn":{"required":true}}},"output":{"type":"structure","members":{}}},"deleteTopic":{"name":"DeleteTopic","input":{"type":"structure","members":{"TopicArn":{"required":true}}},"output":{"type":"structure","members":{}}},"getEndpointAttributes":{"name":"GetEndpointAttributes","input":{"type":"structure","members":{"EndpointArn":{"required":true}}},"output":{"type":"structure","members":{"Attributes":{"type":"map","keys":{},"members":{}}}}},"getPlatformApplicationAttributes":{"name":"GetPlatformApplicationAttributes","input":{"type":"structure","members":{"PlatformApplicationArn":{"required":true}}},"output":{"type":"structure","members":{"Attributes":{"type":"map","keys":{},"members":{}}}}},"getSubscriptionAttributes":{"name":"GetSubscriptionAttributes","input":{"type":"structure","members":{"SubscriptionArn":{"required":true}}},"output":{"type":"structure","members":{"Attributes":{"type":"map","keys":{},"members":{}}}}},"getTopicAttributes":{"name":"GetTopicAttributes","input":{"type":"structure","members":{"TopicArn":{"required":true}}},"output":{"type":"structure","members":{"Attributes":{"type":"map","keys":{},"members":{}}}}},"listEndpointsByPlatformApplication":{"name":"ListEndpointsByPlatformApplication","input":{"type":"structure","members":{"PlatformApplicationArn":{"required":true},"NextToken":{}}},"output":{"type":"structure","members":{"Endpoints":{"type":"list","members":{"type":"structure","members":{"EndpointArn":{},"Attributes":{"type":"map","keys":{},"members":{}}}}},"NextToken":{}}}},"listPlatformApplications":{"name":"ListPlatformApplications","input":{"type":"structure","members":{"NextToken":{}}},"output":{"type":"structure","members":{"PlatformApplications":{"type":"list","members":{"type":"structure","members":{"PlatformApplicationArn":{},"Attributes":{"type":"map","keys":{},"members":{}}}}},"NextToken":{}}}},"listSubscriptions":{"name":"ListSubscriptions","input":{"type":"structure","members":{"NextToken":{}}},"output":{"type":"structure","members":{"Subscriptions":{"type":"list","members":{"type":"structure","members":{"SubscriptionArn":{},"Owner":{},"Protocol":{},"Endpoint":{},"TopicArn":{}}}},"NextToken":{}}}},"listSubscriptionsByTopic":{"name":"ListSubscriptionsByTopic","input":{"type":"structure","members":{"TopicArn":{"required":true},"NextToken":{}}},"output":{"type":"structure","members":{"Subscriptions":{"type":"list","members":{"type":"structure","members":{"SubscriptionArn":{},"Owner":{},"Protocol":{},"Endpoint":{},"TopicArn":{}}}},"NextToken":{}}}},"listTopics":{"name":"ListTopics","input":{"type":"structure","members":{"NextToken":{}}},"output":{"type":"structure","members":{"Topics":{"type":"list","members":{"type":"structure","members":{"TopicArn":{}}}},"NextToken":{}}}},"publish":{"name":"Publish","input":{"type":"structure","members":{"TopicArn":{},"TargetArn":{},"Message":{"required":true},"Subject":{},"MessageStructure":{}}},"output":{"type":"structure","members":{"MessageId":{}}}},"removePermission":{"name":"RemovePermission","input":{"type":"structure","members":{"TopicArn":{"required":true},"Label":{"required":true}}},"output":{"type":"structure","members":{}}},"setEndpointAttributes":{"name":"SetEndpointAttributes","input":{"type":"structure","members":{"EndpointArn":{"required":true},"Attributes":{"type":"map","keys":{},"members":{},"required":true}}},"output":{"type":"structure","members":{}}},"setPlatformApplicationAttributes":{"name":"SetPlatformApplicationAttributes","input":{"type":"structure","members":{"PlatformApplicationArn":{"required":true},"Attributes":{"type":"map","keys":{},"members":{},"required":true}}},"output":{"type":"structure","members":{}}},"setSubscriptionAttributes":{"name":"SetSubscriptionAttributes","input":{"type":"structure","members":{"SubscriptionArn":{"required":true},"AttributeName":{"required":true},"AttributeValue":{}}},"output":{"type":"structure","members":{}}},"setTopicAttributes":{"name":"SetTopicAttributes","input":{"type":"structure","members":{"TopicArn":{"required":true},"AttributeName":{"required":true},"AttributeValue":{}}},"output":{"type":"structure","members":{}}},"subscribe":{"name":"Subscribe","input":{"type":"structure","members":{"TopicArn":{"required":true},"Protocol":{"required":true},"Endpoint":{}}},"output":{"type":"structure","members":{"SubscriptionArn":{}}}},"unsubscribe":{"name":"Unsubscribe","input":{"type":"structure","members":{"SubscriptionArn":{"required":true}}},"output":{"type":"structure","members":{}}}},"pagination":{"listEndpointsByPlatformApplication":{"inputToken":"NextToken","outputToken":"NextToken","resultKey":"Endpoints"},"listPlatformApplications":{"inputToken":"NextToken","outputToken":"NextToken","resultKey":"PlatformApplications"},"listSubscriptions":{"inputToken":"NextToken","outputToken":"NextToken","resultKey":"Subscriptions"},"listSubscriptionsByTopic":{"inputToken":"NextToken","outputToken":"NextToken","resultKey":"Subscriptions"},"listTopics":{"inputToken":"NextToken","outputToken":"NextToken","resultKey":"Topics"}}});
window.AWS.SQS = window.AWS.Service.defineService('sqs');


window.AWS.util.update(window.AWS.SQS.prototype, {
  setupRequestListeners: function setupRequestListeners(request) {
    request.addListener('build', this.buildEndpoint);

    if (request.service.config.computeChecksums) {
      if (request.operation === 'sendMessage') {
        request.addListener('extractData', this.verifySendMessageChecksum);
      } else if (request.operation === 'sendMessageBatch') {
        request.addListener('extractData', this.verifySendMessageBatchChecksum);
      } else if (request.operation === 'receiveMessage') {
        request.addListener('extractData', this.verifyReceiveMessageChecksum);
      }
    }
  },

  verifySendMessageChecksum: function verifySendMessageChecksum(response) {
    if (!response.data) return;

    var md5 = response.data.MD5OfMessageBody;
    var body = this.params.MessageBody;
    var calculatedMd5 = this.service.calculateChecksum(body);
    if (calculatedMd5 !== md5) {
      var msg = 'Got "' + response.data.MD5OfMessageBody +
        '", expecting "' + calculatedMd5 + '".';
      this.service.throwInvalidChecksumError(response,
        [response.data.MessageId], msg);
    }
  },

  verifySendMessageBatchChecksum: function verifySendMessageBatchChecksum(response) {
    if (!response.data) return;

    var service = this.service;
    var entries = {};
    var errors = [];
    var messageIds = [];
    window.AWS.util.arrayEach(response.data.Successful, function (entry) {
      entries[entry.Id] = entry;
    });
    window.AWS.util.arrayEach(this.params.Entries, function (entry) {
      if (entries[entry.Id]) {
        var md5 = entries[entry.Id].MD5OfMessageBody;
        var body = entry.MessageBody;
        if (!service.isChecksumValid(md5, body)) {
          errors.push(entry.Id);
          messageIds.push(entries[entry.Id].MessageId);
        }
      }
    });

    if (errors.length > 0) {
      service.throwInvalidChecksumError(response, messageIds,
        'Invalid messages: ' + errors.join(', '));
    }
  },

  verifyReceiveMessageChecksum: function verifyReceiveMessageChecksum(response) {
    if (!response.data) return;

    var service = this.service;
    var messageIds = [];
    window.AWS.util.arrayEach(response.data.Messages, function(message) {
      var md5 = message.MD5OfBody;
      var body = message.Body;
      if (!service.isChecksumValid(md5, body)) {
        messageIds.push(message.MessageId);
      }
    });

    if (messageIds.length > 0) {
      service.throwInvalidChecksumError(response, messageIds,
        'Invalid messages: ' + messageIds.join(', '));
    }
  },

  throwInvalidChecksumError: function throwInvalidChecksumError(response, ids, message) {
    response.error = window.AWS.util.error(new Error(), {
      retryable: true,
      code: 'InvalidChecksum',
      messageIds: ids,
      message: response.request.operation +
               ' returned an invalid MD5 response. ' + message
    });
  },

  isChecksumValid: function isChecksumValid(checksum, data) {
    return this.calculateChecksum(data) === checksum;
  },

  calculateChecksum: function calculateChecksum(data) {
    return window.AWS.util.crypto.md5(data, 'hex');
  },

  buildEndpoint: function buildEndpoint(request) {
    var url = request.httpRequest.params.QueueUrl;
    if (url) {
      request.httpRequest.endpoint = new window.AWS.Endpoint(url);

      var matches = request.httpRequest.endpoint.host.match(/^sqs\.(.+?)\./);
      if (matches) request.httpRequest.region = matches[1];
    }
  }
});

window.AWS.Service.defineServiceApi(window.AWS.SQS, "2012-11-05", {"format":"query","apiVersion":"2012-11-05","endpointPrefix":"sqs","resultWrapped":true,"serviceAbbreviation":"Amazon SQS","serviceFullName":"Amazon Simple Queue Service","signatureVersion":"v4","timestampFormat":"iso8601","operations":{"addPermission":{"name":"AddPermission","input":{"type":"structure","members":{"QueueUrl":{"required":true},"Label":{"required":true},"AWSAccountIds":{"type":"list","members":{"name":"AWSAccountId"},"flattened":true,"required":true},"Actions":{"type":"list","members":{"name":"ActionName"},"flattened":true,"required":true}}},"output":{"type":"structure","members":{}}},"changeMessageVisibility":{"name":"ChangeMessageVisibility","input":{"type":"structure","members":{"QueueUrl":{"required":true},"ReceiptHandle":{"required":true},"VisibilityTimeout":{"type":"integer","required":true}}},"output":{"type":"structure","members":{}}},"changeMessageVisibilityBatch":{"name":"ChangeMessageVisibilityBatch","input":{"type":"structure","members":{"QueueUrl":{"required":true},"Entries":{"type":"list","members":{"type":"structure","members":{"Id":{"required":true},"ReceiptHandle":{"required":true},"VisibilityTimeout":{"type":"integer"}},"name":"ChangeMessageVisibilityBatchRequestEntry"},"flattened":true,"required":true}}},"output":{"type":"structure","members":{"ChangeMessageVisibilityBatchResultEntry":{"type":"list","members":{"type":"structure","members":{"Id":{}},"name":"ChangeMessageVisibilityBatchResultEntry"},"flattened":true,"name":"Successful"},"BatchResultErrorEntry":{"type":"list","members":{"type":"structure","members":{"Id":{},"SenderFault":{"type":"boolean"},"Code":{},"Message":{}},"name":"BatchResultErrorEntry"},"flattened":true,"name":"Failed"}}}},"createQueue":{"name":"CreateQueue","input":{"type":"structure","members":{"QueueName":{"required":true},"Attributes":{"type":"map","keys":{"name":"Name"},"members":{"name":"Value"},"flattened":true,"name":"Attribute"}}},"output":{"type":"structure","members":{"QueueUrl":{}}}},"deleteMessage":{"name":"DeleteMessage","input":{"type":"structure","members":{"QueueUrl":{"required":true},"ReceiptHandle":{"required":true}}},"output":{"type":"structure","members":{}}},"deleteMessageBatch":{"name":"DeleteMessageBatch","input":{"type":"structure","members":{"QueueUrl":{"required":true},"Entries":{"type":"list","members":{"type":"structure","members":{"Id":{"required":true},"ReceiptHandle":{"required":true}},"name":"DeleteMessageBatchRequestEntry"},"flattened":true,"required":true}}},"output":{"type":"structure","members":{"DeleteMessageBatchResultEntry":{"type":"list","members":{"type":"structure","members":{"Id":{}},"name":"DeleteMessageBatchResultEntry"},"flattened":true,"name":"Successful"},"BatchResultErrorEntry":{"type":"list","members":{"type":"structure","members":{"Id":{},"SenderFault":{"type":"boolean"},"Code":{},"Message":{}},"name":"BatchResultErrorEntry"},"flattened":true,"name":"Failed"}}}},"deleteQueue":{"name":"DeleteQueue","input":{"type":"structure","members":{"QueueUrl":{"required":true}}},"output":{"type":"structure","members":{}}},"getQueueAttributes":{"name":"GetQueueAttributes","input":{"type":"structure","members":{"QueueUrl":{"required":true},"AttributeNames":{"type":"list","members":{"name":"AttributeName"},"flattened":true}}},"output":{"type":"structure","members":{"Attribute":{"type":"map","keys":{"name":"Name"},"members":{"name":"Value"},"flattened":true,"name":"Attributes"}}}},"getQueueUrl":{"name":"GetQueueUrl","input":{"type":"structure","members":{"QueueName":{"required":true},"QueueOwnerAWSAccountId":{}}},"output":{"type":"structure","members":{"QueueUrl":{}}}},"listDeadLetterSourceQueues":{"name":"ListDeadLetterSourceQueues","input":{"type":"structure","members":{"QueueUrl":{"required":true}}},"output":{"type":"structure","members":{"QueueUrl":{"type":"list","members":{"name":"QueueUrl"},"flattened":true,"name":"queueUrls"}}}},"listQueues":{"name":"ListQueues","input":{"type":"structure","members":{"QueueNamePrefix":{}}},"output":{"type":"structure","members":{"QueueUrl":{"type":"list","members":{"name":"QueueUrl"},"flattened":true,"name":"QueueUrls"}}}},"receiveMessage":{"name":"ReceiveMessage","input":{"type":"structure","members":{"QueueUrl":{"required":true},"AttributeNames":{"type":"list","members":{"name":"AttributeName"},"flattened":true},"MessageAttributeNames":{"type":"list","members":{"name":"MessageAttributeName"},"flattened":true},"MaxNumberOfMessages":{"type":"integer"},"VisibilityTimeout":{"type":"integer"},"WaitTimeSeconds":{"type":"integer"}}},"output":{"type":"structure","members":{"Message":{"type":"list","members":{"type":"structure","members":{"MessageId":{},"ReceiptHandle":{},"MD5OfBody":{},"Body":{},"Attribute":{"type":"map","keys":{"name":"Name"},"members":{"name":"Value"},"flattened":true,"name":"Attributes"},"MD5OfMessageAttributes":{},"MessageAttribute":{"type":"map","keys":{"name":"Name"},"members":{"type":"structure","members":{"StringValue":{},"BinaryValue":{"type":"base64"},"StringListValue":{"type":"list","members":{"name":"StringListValue"},"flattened":true,"name":"StringListValues"},"BinaryListValue":{"type":"list","members":{"type":"base64","name":"BinaryListValue"},"flattened":true,"name":"BinaryListValues"},"DataType":{}},"name":"Value"},"flattened":true,"name":"MessageAttributes"}},"name":"Message"},"flattened":true,"name":"Messages"}}}},"removePermission":{"name":"RemovePermission","input":{"type":"structure","members":{"QueueUrl":{"required":true},"Label":{"required":true}}},"output":{"type":"structure","members":{}}},"sendMessage":{"name":"SendMessage","input":{"type":"structure","members":{"QueueUrl":{"required":true},"MessageBody":{"required":true},"DelaySeconds":{"type":"integer"},"MessageAttributes":{"type":"map","keys":{"name":"Name"},"members":{"type":"structure","members":{"StringValue":{},"BinaryValue":{"type":"base64"},"StringListValues":{"type":"list","members":{"name":"StringListValue"},"flattened":true,"name":"StringListValue"},"BinaryListValues":{"type":"list","members":{"type":"base64","name":"BinaryListValue"},"flattened":true,"name":"BinaryListValue"},"DataType":{"required":true}},"name":"Value"},"flattened":true,"name":"MessageAttribute"}}},"output":{"type":"structure","members":{"MD5OfMessageBody":{},"MD5OfMessageAttributes":{},"MessageId":{}}}},"sendMessageBatch":{"name":"SendMessageBatch","input":{"type":"structure","members":{"QueueUrl":{"required":true},"Entries":{"type":"list","members":{"type":"structure","members":{"Id":{"required":true},"MessageBody":{"required":true},"DelaySeconds":{"type":"integer"},"MessageAttributes":{"type":"map","keys":{"name":"Name"},"members":{"type":"structure","members":{"StringValue":{},"BinaryValue":{"type":"base64"},"StringListValues":{"type":"list","members":{"name":"StringListValue"},"flattened":true,"name":"StringListValue"},"BinaryListValues":{"type":"list","members":{"type":"base64","name":"BinaryListValue"},"flattened":true,"name":"BinaryListValue"},"DataType":{"required":true}},"name":"Value"},"flattened":true,"name":"MessageAttribute"}},"name":"SendMessageBatchRequestEntry"},"flattened":true,"required":true}}},"output":{"type":"structure","members":{"SendMessageBatchResultEntry":{"type":"list","members":{"type":"structure","members":{"Id":{},"MessageId":{},"MD5OfMessageBody":{},"MD5OfMessageAttributes":{}},"name":"SendMessageBatchResultEntry"},"flattened":true,"name":"Successful"},"BatchResultErrorEntry":{"type":"list","members":{"type":"structure","members":{"Id":{},"SenderFault":{"type":"boolean"},"Code":{},"Message":{}},"name":"BatchResultErrorEntry"},"flattened":true,"name":"Failed"}}}},"setQueueAttributes":{"name":"SetQueueAttributes","input":{"type":"structure","members":{"QueueUrl":{"required":true},"Attributes":{"type":"map","keys":{"name":"Name"},"members":{"name":"Value"},"flattened":true,"name":"Attribute","required":true}}},"output":{"type":"structure","members":{}}}},"pagination":{"listQueues":{"resultKey":"QueueUrls"}}});
window.AWS.STS = window.AWS.Service.defineService('sts');


window.AWS.util.update(window.AWS.STS.prototype, {

  credentialsFrom: function credentialsFrom(data, credentials) {
    if (!data) return null;
    if (!credentials) credentials = new window.AWS.TemporaryCredentials();
    credentials.expired = false;
    credentials.accessKeyId = data.Credentials.AccessKeyId;
    credentials.secretAccessKey = data.Credentials.SecretAccessKey;
    credentials.sessionToken = data.Credentials.SessionToken;
    credentials.expireTime = data.Credentials.Expiration;
    return credentials;
  },

  assumeRoleWithWebIdentity: function assumeRoleWithWebIdentity(params, callback) {
    return this.makeUnauthenticatedRequest('assumeRoleWithWebIdentity', params, callback);
  },

  assumeRoleWithSAML: function assumeRoleWithSAML(params, callback) {
    return this.makeUnauthenticatedRequest('assumeRoleWithSAML', params, callback);
  }
});

window.AWS.Service.defineServiceApi(window.AWS.STS, "2011-06-15", {"format":"query","apiVersion":"2011-06-15","endpointPrefix":"sts","globalEndpoint":"sts.amazonaws.com","resultWrapped":true,"serviceAbbreviation":"AWS STS","serviceFullName":"AWS Security Token Service","signatureVersion":"v4","timestampFormat":"iso8601","operations":{"assumeRole":{"name":"AssumeRole","input":{"type":"structure","members":{"RoleArn":{"required":true},"RoleSessionName":{"required":true},"Policy":{},"DurationSeconds":{"type":"integer"},"ExternalId":{},"SerialNumber":{},"TokenCode":{}}},"output":{"type":"structure","members":{"Credentials":{"type":"structure","members":{"AccessKeyId":{},"SecretAccessKey":{},"SessionToken":{},"Expiration":{"type":"timestamp"}}},"AssumedRoleUser":{"type":"structure","members":{"AssumedRoleId":{},"Arn":{}}},"PackedPolicySize":{"type":"integer"}}}},"assumeRoleWithSAML":{"name":"AssumeRoleWithSAML","input":{"type":"structure","members":{"RoleArn":{"required":true},"PrincipalArn":{"required":true},"SAMLAssertion":{"required":true},"Policy":{},"DurationSeconds":{"type":"integer"}}},"output":{"type":"structure","members":{"Credentials":{"type":"structure","members":{"AccessKeyId":{},"SecretAccessKey":{},"SessionToken":{},"Expiration":{"type":"timestamp"}}},"AssumedRoleUser":{"type":"structure","members":{"AssumedRoleId":{},"Arn":{}}},"PackedPolicySize":{"type":"integer"}}}},"assumeRoleWithWebIdentity":{"name":"AssumeRoleWithWebIdentity","input":{"type":"structure","members":{"RoleArn":{"required":true},"RoleSessionName":{"required":true},"WebIdentityToken":{"required":true},"ProviderId":{},"Policy":{},"DurationSeconds":{"type":"integer"}}},"output":{"type":"structure","members":{"Credentials":{"type":"structure","members":{"AccessKeyId":{},"SecretAccessKey":{},"SessionToken":{},"Expiration":{"type":"timestamp"}}},"SubjectFromWebIdentityToken":{},"AssumedRoleUser":{"type":"structure","members":{"AssumedRoleId":{},"Arn":{}}},"PackedPolicySize":{"type":"integer"}}}},"decodeAuthorizationMessage":{"name":"DecodeAuthorizationMessage","input":{"type":"structure","members":{"EncodedMessage":{"required":true}}},"output":{"type":"structure","members":{"DecodedMessage":{}}}},"getFederationToken":{"name":"GetFederationToken","input":{"type":"structure","members":{"Name":{"required":true},"Policy":{},"DurationSeconds":{"type":"integer"}}},"output":{"type":"structure","members":{"Credentials":{"type":"structure","members":{"AccessKeyId":{},"SecretAccessKey":{},"SessionToken":{},"Expiration":{"type":"timestamp"}}},"FederatedUser":{"type":"structure","members":{"FederatedUserId":{},"Arn":{}}},"PackedPolicySize":{"type":"integer"}}}},"getSessionToken":{"name":"GetSessionToken","input":{"type":"structure","members":{"DurationSeconds":{"type":"integer"},"SerialNumber":{},"TokenCode":{}}},"output":{"type":"structure","members":{"Credentials":{"type":"structure","members":{"AccessKeyId":{},"SecretAccessKey":{},"SessionToken":{},"Expiration":{"type":"timestamp"}}}}}}}});
