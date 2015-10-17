(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * AuthProxy JavaScript SDK
 *
 * Authentication Module
 *
 */

// Browerify exports and dependencies
module.exports = AuthProxy;
var utils = require('./qbUtils');
var config = require('./qbConfig');
var Proxy = require('./qbProxy');
var crypto = require('crypto-js/hmac-sha1');

var sessionUrl = config.urls.base + config.urls.session + config.urls.type;
var loginUrl = config.urls.base + config.urls.login + config.urls.type;

function AuthProxy(service) {
  this.service = service;
}

AuthProxy.prototype.createSession = function createSession(params, callback) {
  var message, _this = this;

  if (typeof params === 'function' && typeof callback === 'undefined'){
    callback = params;
    params = {};
  }

  // Sign message with SHA-1 using secret key and add to payload
  message = generateAuthMsg(params);
  message = signMessage(message,  params.authSecret || config.creds.authSecret);

  this.service.ajax({url: sessionUrl, data: message, type: 'POST', processData: false},
                    function handleProxy(err,data){
                      if (config.debug) { console.debug('AuthProxy.createSession callback', err, data); }
                      if (data && data.session) {
                        _this.service.setSession(data.session);
                        callback(err,data.session);
                      } else {
                        callback(err, null);
                      }
                    });
};

// Currently fails due a CORS issue
AuthProxy.prototype.destroySession = function(callback){
  var _this = this, message;
  message = {
    token: this.service.getSession().token
  };
  this.service.ajax({url: sessionUrl, type: 'DELETE', dataType: 'text'},
                    function(err,data){
                      if (config.debug) {console.debug('AuthProxy.destroySession callback', err, data);}
                      if (err === null){
                        _this.service.setSession(null);
                      }
                      callback(err,true);
                    });
};

AuthProxy.prototype.login = function(params, callback){
  var _this = this;
  if (this.service.getSession() !== null) {
    params.token = this.service.getSession().token;
    this.service.ajax({url: loginUrl, type: 'POST', data: params},
                      function(err, data) {
                        if (err) { callback(err, data);}
                        else { callback(err,data.user);}
                      });
  } else {
    this.createSession(function(err,session){
      params.token = session.token;
      _this.service.ajax({url: loginUrl, type: 'POST', data: params},
                      function(err, data) {
                        if (err) { callback(err, data);}
                        else { callback(err,data.user);}
                      });
    });
  }
};

AuthProxy.prototype.logout = function(callback){
  var _this = this, message;
  message = {
    token: this.service.getSession().token
  };
  this.service.ajax({url: loginUrl, dataType:'text', data:message, type: 'DELETE'}, callback);
};

AuthProxy.prototype.nonce = function nonce(){
  return this._nonce++;
};

function signMessage(message, secret){
  signature =  crypto(message, secret).toString();
  //if (config.debug) { console.debug ('AuthProxy signature of', message, 'is', signature); }
  return message + '&signature=' + signature;
}

function generateAuthMsg(params){
   // Allow params to override config
  var message = {
    application_id : params.appId || config.creds.appId,
    auth_key : params.authKey || config.creds.authKey,
    nonce: Math.floor(Math.random() * 10000),
    timestamp: utils.unixTime()
  };
  // Optionally permit a user session to be created
  if (params.login && params.password) {
    message.user = {login : params.login, password: params.password};
  } else if (params.email && params.password) {
    message.user = {email: params.email, password: params.password};
  } else if (params.provider) {
    // With social networking (eg. facebook, twitter etc) provider
    message.provider = params.provider;
    if (params.scope) {message.scope = params.scope;}
    message.keys = { token: params.keys.token };
    if (params.keys.secret) { messages.keys.secret = params.keys.secret; }
  }

  var sessionMsg = 'application_id=' + message.application_id + '&auth_key=' + message.auth_key;
  if (message.keys && message.keys.token) {sessionMsg+= '&keys[token]=' + message.keys.token;}
  sessionMsg += '&nonce=' + message.nonce;
  if (message.provider) { sessionMsg += '&provider=' + message.provider;}
  sessionMsg += '&timestamp=' + message.timestamp;
  if (message.user) {
    if (message.user.login) { sessionMsg += '&user[login]=' + message.user.login; }
    if (message.user.email) { sessionMsg += '&user[email]=' + message.user.email; }
    if (message.user.password) { sessionMsg += '&user[password]=' + message.user.password; }
  }
  //if (config.debug) { console.debug ('AuthProxy authMsg', sessionMsg); }
  return sessionMsg;
}


},{"./qbConfig":2,"./qbProxy":7,"./qbUtils":9,"crypto-js/hmac-sha1":12}],2:[function(require,module,exports){
/* 
 * QuickBlox JavaScript SDK
 *
 * Configuration Module
 *
 */

// Browserify exports

var config = {
  creds:{
    appId: '',
    authKey: '',
    authSecret: ''
  },
  urls:{
    base: 'https://api.quickblox.com/',
    find: 'find',
    session: 'session',
    login: 'login',
    users: 'users',
    pushtokens: 'push_tokens',
    subscriptions: 'subscriptions',
    events: 'events',
    pullevents: 'pull_events',
    geo: 'geodata',
    places: 'places',
    data: 'data',
    content: 'blobs',
    chat: 'chat',
    type: '.json'
    },
  debug: false
};

module.exports = config;

},{}],3:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Content module
 *
 * For an overview of this module and what it can be used for
 * see http://quickblox.com/modules/content
 *
 * The API itself is described at http://quickblox.com/developers/Content
 *
 */

// Browserify exports and dependencies
module.exports = ContentProxy;
var config = require('./qbConfig');
var utils = require('./qbUtils');

var contentUrl = config.urls.base + config.urls.content;
var taggedForUserUrl = contentUrl + '/tagged';

function contentIdUrl(id) {
  return contentUrl + '/' + id;
}

function ContentProxy(service) {
  this.service = service;
}

ContentProxy.prototype.create = function(params, callback){
 if (config.debug) { console.debug('ContentProxy.create', params);}
  this.service.ajax({url: contentUrl + config.urls.type, data: {blob:params}, type: 'POST'}, function(err,result){
    if (err){ callback(err, null); }
    else { callback (err, result.blob); }
  });
};

ContentProxy.prototype.list = function(params, callback){
  if (typeof params === 'function' && typeof callback ==='undefined') {
    callback = params;
    params = null;
  }
  this.service.ajax({url: contentUrl + config.urls.type}, function(err,result){
    if (err){ callback(err, null); }
    else { callback (err, result); }
  });
};

ContentProxy.prototype.delete = function(id, callback){
  this.service.ajax({url: contentIdUrl(id) + config.urls.type, type: 'DELETE', dataType: 'text'}, function(err, result) {
    if (err) { callback(err,null); }
    else { callback(null, true); }
  });
};

ContentProxy.prototype.createAndUpload = function(params, callback){
  var createParams= {}, file, name, type, size, fileId, _this = this;
  if (config.debug) { console.debug('ContentProxy.createAndUpload', params);}
  file = params.file;
  name = params.name || file.name;
  type = params.type || file.type;
  size = file.size;
  createParams.name = name;
  createParams.content_type = type;
  if (params.public) { createParams.public = params.public; }
  if (params.tag_list) { createParams.tag_list = params.tag_list; }
  this.create(createParams, function(err,createResult){
    if (err){ callback(err, null); }
    else {
      var uri = parseUri(createResult.blob_object_access.params), uploadParams = { url: uri.protocol + '://' + uri.host }, data = new FormData();
      fileId = createResult.id;
      data.append('key', uri.queryKey.key);
      data.append('acl', uri.queryKey.acl);
      data.append('success_action_status', uri.queryKey.success_action_status);
      data.append('AWSAccessKeyId', uri.queryKey.AWSAccessKeyId);
      data.append('Policy', decodeURIComponent(uri.queryKey.Policy));
      data.append('Signature', decodeURIComponent(uri.queryKey.Signature));
      data.append('Content-Type', uri.queryKey['Content-Type']);
      data.append('file', file, createResult.name);
      uploadParams.data = data;
      _this.upload(uploadParams, function(err, result) {
        if (err) { callback(err, null); }
        else {
          _this.markUploaded({id: fileId, size: size}, function(err, result){
            if (err) { callback(err, null);}
            else {
              callback(null, createResult);
            }
          });
        }
      });
    }
  });
};


ContentProxy.prototype.upload = function(params, callback){
  this.service.ajax({url: params.url, data: params.data, dataType: 'xml',
                     contentType: false, processData: false, type: 'POST'}, function(err,xmlDoc){
    if (err) { callback (err, null); }
    else {
      // AWS S3 doesn't respond with a JSON structure
      // so parse the xml and return a JSON structure ourselves
      var result = {}, rootElement = xmlDoc.documentElement, children = rootElement.childNodes, i, m;
      for (i = 0, m = children.length; i < m ; i++){
        result[children[i].nodeName] = children[i].childNodes[0].nodeValue;
      } 
      if (config.debug) { console.debug('result', result); }
      callback (null, result);
    }
  });
};

ContentProxy.prototype.taggedForCurrentUser = function(callback) {
  this.service.ajax({url: taggedForUserUrl + config.urls.type}, function(err, result) {
    if (err) { callback(err, null); }
    else { callback(null, result); }
  });
};

ContentProxy.prototype.markUploaded = function (params, callback) {
  this.service.ajax({url: contentIdUrl(params.id) + '/complete' + config.urls.type, type: 'PUT', data: {size: params.size}, dataType: 'text' }, function(err, res){
    if (err) { callback (err, null); }
    else { callback (null, res); }
  });
};

ContentProxy.prototype.getInfo = function (id, callback) {
  this.service.ajax({url: contentIdUrl(id) + config.urls.type}, function (err, res) {
    if (err) { callback (err, null); }
    else { callback (null, res); }
  });
};

ContentProxy.prototype.getFile = function (uid, callback) {
 this.service.ajax({url: contentIdUrl(id) + config.urls.type}, function (err, res) {
    if (err) { callback (err, null); }
    else { callback (null, res); }
  });
};

ContentProxy.prototype.getFileUrl = function (id, callback) {
 this.service.ajax({url: contentIdUrl(id) + '/getblobobjectbyid' + config.urls.type, type: 'POST'}, function (err, res) {
    if (err) { callback (err, null); }
    else { callback (null, res.blob_object_access.params); }
  });
};

ContentProxy.prototype.update = function (params, callback) {
  var data = {};
  data.blob = {};
  if (typeof params.name !== 'undefined') { data.blob.name = params.name; }
  this.service.ajax({url: contentIdUrl(param.id), data: data}, function(err, res) {
    if (err) { callback (err, null); }
    else { callback (null, res); } 
  });
}


// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
// http://blog.stevenlevithan.com/archives/parseuri

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) {uri[o.key[i]] = m[i] || "";}

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) {uri[o.q.name][$1] = $2;}
	});

	return uri;
}

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

},{"./qbConfig":2,"./qbUtils":9}],4:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Custom Objects module
 *
 */

// Browserify exports and dependencies
module.exports = DataProxy;
var config = require('./qbConfig');
var utils = require('./qbUtils');

var dataUrl = config.urls.base + config.urls.data;


function DataProxy(service){
  this.service = service;
  if (config.debug) { console.debug("LocationProxy", service); }
}

DataProxy.prototype.create = function(className, data, callback){
  if (config.debug) { console.debug('DataProxy.create', className, data);}
  this.service.ajax({url: utils.resourceUrl(dataUrl, className), data: data, type: 'POST'}, function(err,res){
    if (err){ callback(err, null); }
    else { callback (err, res); }
  });
};

DataProxy.prototype.list= function(className, filters, callback) {
  // make filters an optional parameter
  if (typeof callback === 'undefined' && typeof filters === 'function') {
    callback = filters;
    filters = null;
  }
  if (config.debug) { console.debug('DataProxy.list', className, filters);}
  this.service.ajax({url: utils.resourceUrl(dataUrl, className), data: filters}, function(err,result){
    if (err){ callback(err, null); }
    else { callback (err, result); }
  });
};

DataProxy.prototype.update= function(className, data, callback) {
  if (config.debug) { console.debug('DataProxy.update', className, data);}
  this.service.ajax({url: utils.resourceUrl(dataUrl, className + '/' + data._id), data: data, type: 'PUT'}, function(err,result){
    if (err){ callback(err, null); }
    else { callback (err, result); }
  });
};

DataProxy.prototype.delete= function(className, id, callback) {
  if (config.debug) { console.debug('DataProxy.delete', className, id);}
  this.service.ajax({url: utils.resourceUrl(dataUrl, className + '/' + id), type: 'DELETE', dataType: 'text'},
                    function(err,result){
                      if (err){ callback(err, null); }
                      else { callback (err, true); }
                    });
};

DataProxy.prototype.uploadFile= function(className, params, callback){
  var formData;
  if (config.debug) { console.debug('DataProxy.uploadFile', className, params);}
  formData = new FormData();
  formData.append('field_name', params.field_name);
  formData.append('file', params.file);
  this.service.ajax({url: utils.resourceUrl(dataUrl, className + '/' + params.id + '/file'), data: formData,
                    contentType: false, processData: false, type:'POST'}, function(err, result){
                      if (err) { callback(err, null);}
                      else { callback (err, result); }
                    });
};

DataProxy.prototype.updateFile= function(className, params, callback){
  var formData;
  if (config.debug) { console.debug('DataProxy.updateFile', className, params);}
  formData = new FormData();
  formData.append('field_name', params.field_name);
  formData.append('file', params.file);
  this.service.ajax({url: utils.resourceUrl(dataUrl, className + '/' + params.id + '/file'), data: formData,
                    contentType: false, processData: false, type: 'POST'}, function(err, result) {
                      if (err) { callback (err, null); }
                      else { callback (err, result); }
                    });
};

DataProxy.prototype.downloadFile= function(className, params, callback){
  if (config.debug) { console.debug('DataProxy.downloadFile', className, params);}
  this.service.ajax({url: utils.resourceUrl(dataUrl, className + '/' + params.id + '/file'), data: 'field_name=' + params.field_name,
                    type:'GET', contentType: false, processData:false, mimeType: 'text/plain; charset=x-user-defined', dataType: 'binary'},
                    function(err, result) {
                      if (err) { callback (err, null); }
                      else { callback (err, result); }
                    });
};

DataProxy.prototype.deleteFile= function(className, params, callback){
  if (config.debug) { console.debug('DataProxy.deleteFile', className, params);}
  this.service.ajax({url: utils.resourceUrl(dataUrl, className + '/' + params.id + '/file'), data: {field_name: params.field_name},
                    dataType: 'text', type: 'DELETE'}, function(err, result) {
                      if (err) { callback (err, null); }
                      else { callback (err, true); }
                    });
};



},{"./qbConfig":2,"./qbUtils":9}],5:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Location module
 *
 */

// Browserify exports and dependencies
module.exports = LocationProxy;
var config = require('./qbConfig');
var utils = require('./qbUtils');

var geoUrl = config.urls.base + config.urls.geo;
var geoFindUrl = geoUrl + '/' + config.urls.find + config.urls.type;
var placesUrl = config.urls.base + config.urls.places;


function LocationProxy(service){
  this.service = service;
  this.geodata = new GeoProxy(service);
  this.places = new PlacesProxy(service);
  if (config.debug) { console.debug("LocationProxy", service); }
}


function GeoProxy(service){
  this.service = service;
}

GeoProxy.prototype.create = function(params, callback){
  if (config.debug) { console.debug('GeoProxy.create', {geo_data: params});}
  this.service.ajax({url: geoUrl + config.urls.type, data: {geo_data: params}, type: 'POST'}, function(err,result){
    if (err){ callback(err, null); }
    else { callback (err, result.geo_datum); }
  });
};

GeoProxy.prototype.update = function(params, callback){
  var allowedProps = ['longitude', 'latitude', 'status'], prop, msg = {};
  for (prop in params) {
    if (params.hasOwnProperty(prop)) {
      if (allowedProps.indexOf(prop)>0) {
        msg[prop] = params[prop];
      } 
    }
  }
  if (config.debug) { console.debug('GeoProxy.create', params);}
  this.service.ajax({url: utils.resourceUrl(geoUrl, params.id), data: {geo_data:msg}, type: 'PUT'},
                   function(err,res){
                    if (err) { callback(err,null);}
                    else { callback(err, res.geo_datum);}
                   });
};

GeoProxy.prototype.get = function(id, callback){
  if (config.debug) { console.debug('GeoProxy.get', id);}
  this.service.ajax({url: utils.resourceUrl(geoUrl, id)}, function(err,result){
     if (err) { callback (err, null); }
     else { callback(null, result.geo_datum); }
  });
};

GeoProxy.prototype.list = function(params, callback){
  if (typeof params === 'function') {
    callback = params;
    params = undefined;
  }
  if (config.debug) { console.debug('GeoProxy.find', params);}
  this.service.ajax({url: geoFindUrl, data: params}, callback);
};

GeoProxy.prototype.delete = function(id, callback){
  if (config.debug) { console.debug('GeoProxy.delete', id); }
  this.service.ajax({url: utils.resourceUrl(geoUrl, id), type: 'DELETE', dataType: 'text'},
                   function(err,res){
                    if (err) { callback(err, null);}
                    else { callback(null, true);}
                   });
};

GeoProxy.prototype.purge = function(days, callback){
  if (config.debug) { console.debug('GeoProxy.purge', days); }
  this.service.ajax({url: geoUrl + config.urls.type, data: {days: days}, type: 'DELETE', dataType: 'text'},
                   function(err, res){
                    if (err) { callback(err, null);}
                    else { callback(null, true);}
                   });
};

function PlacesProxy(service) {
  this.service = service;
}

PlacesProxy.prototype.list = function(params, callback){
  if (config.debug) { console.debug('PlacesProxy.list', params);}
  this.service.ajax({url: placesUrl + config.urls.type}, callback);
};

PlacesProxy.prototype.create = function(params, callback){
  if (config.debug) { console.debug('PlacesProxy.create', params);}
  this.service.ajax({url: placesUrl + config.urls.type, data: {place:params}, type: 'POST'}, callback);
};

PlacesProxy.prototype.get = function(id, callback){
  if (config.debug) { console.debug('PlacesProxy.get', params);}
  this.service.ajax({url: utils.resourceUrl(placesUrl, id)}, callback);
};

PlacesProxy.prototype.update = function(place, callback){
  if (config.debug) { console.debug('PlacesProxy.update', place);}
  this.service.ajax({url: utils.resourceUrl(placesUrl, id), data: {place: place}, type: 'PUT'} , callback);
};

PlacesProxy.prototype.delete = function(id, callback){
  if (config.debug) { console.debug('PlacesProxy.delete', params);}
  this.service.ajax({url: utils.resourceUrl(placesUrl, id), type: 'DELETE'}, callback);
};

},{"./qbConfig":2,"./qbUtils":9}],6:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Messages Module
 *
 */

// broserify export and dependencies

// Browserify exports and dependencies
module.exports = MessagesProxy;
var config = require('./qbConfig');
var Proxy = require('./qbProxy');

// Url variables
var tokenUrl = config.urls.base + config.urls.pushtokens;
var subsUrl = config.urls.base + config.urls.subscriptions;
var eventUrl = config.urls.base + config.urls.events;
var pullUrl = config.urls.base + config.urls.pullevents;

function MessagesProxy(service) {
  this.service = service;
  this.tokens = new TokensProxy(service);
  this.subscriptions = new SubscriptionsProxy(service);
  this.events = new EventsProxy(service);
}

// Push Tokens

function TokensProxy(service){
  this.service = service;
}

TokensProxy.prototype.create = function(params, callback){
  var message = {
    push_token: {
      environment: params.environment,
      client_identification_sequence: params.client_identification_sequence
    },
    device: { platform: params.platform, udid: params.udid}
  };
  if (config.debug) { console.debug('TokensProxy.create', message);}
  this.service.ajax({url: tokenUrl + config.urls.type, type: 'POST', data: message},
                    function(err, data){
                      if (err) { callback(err, null);}
                      else { callback(null, data.push_token); }
                    });
};

TokensProxy.prototype.delete = function(id, callback) {
  var url = tokenUrl + '/' + id + config.urls.type;
  if (config.debug) { console.debug('MessageProxy.deletePushToken', id); }
  this.service.ajax({url: url, type: 'DELETE', dataType:'text'}, 
                    function (err, res) {
                      if (err) {callback(err, null);}
                      else {callback(null, true);}
                      });
};

// Subscriptions

function SubscriptionsProxy(service){
  this.service = service;
}

SubscriptionsProxy.prototype.create = function (params, callback){
  if (config.debug) { console.debug('MessageProxy.createSubscription', params); }
  this.service.ajax({url: subsUrl + config.urls.type, type: 'POST', data : params}, callback);
};

SubscriptionsProxy.prototype.list = function (callback) {
  if (config.debug) { console.debug('MessageProxy.listSubscription', params); }
  this.service.ajax({url: subsUrl + config.urls.type}, callback);
};

SubscriptionsProxy.prototype.delete = function(id, callback) {
  var url = subsUrl + '/'+ id + config.urls.type;
  if (config.debug) { console.debug('MessageProxy.deleteSubscription', id); }
  this.service.ajax({url: url, type: 'DELETE', dataType:'text'}, 
                    function(err, res){
                      if (err) { callback(err, null);}
                      else { callback(null, true);}
                    });
};

// Events
function EventsProxy(service){
  this.service = service;
}

EventsProxy.prototype.create = function(params, callback) {
  if (config.debug) { console.debug('MessageProxy.createEvent', params); }
  var message = {event: params};
  this.service.ajax({url: eventUrl + config.urls.type, type: 'POST', data: message}, callback);
};

EventsProxy.prototype.list = function(callback) {
 if (config.debug) { console.debug('MessageProxy.listEvents'); }
  this.service.ajax({url: eventUrl + config.urls.type}, callback);
};

EventsProxy.prototype.get = function(id, callback) {
  var url = eventUrl + '/' + params.id + config.urls.type;
  if (config.debug) { console.debug('MessageProxy.getEvents', id); }
  this.service.ajax({url: url}, callback);
};

EventsProxy.prototype.update = function(params, callback) {
  var url = eventUrl + '/' + params.id + config.urls.type;
  if (config.debug) { console.debug('MessageProxy.createEvent', params); }
  var message = {event: params};
  this.service.ajax({url: url, type: 'PUT', data: message}, callback);
};

EventsProxy.prototype.delete = function(id, callback) {
  var url = eventUrl + '/' + params.id + config.urls.type;
 if (config.debug) { console.debug('MessageProxy.deleteEvent', id); }
  this.service.ajax({url: url, type: 'DELETE'}, callback);
};

EventsProxy.prototype.pullEvents = function(callback) {
  if (config.debug) { console.debug('MessageProxy.getPullEvents', params); }
  this.service.ajax({url: pullUrl + config.urls.type}, callback);
};



},{"./qbConfig":2,"./qbProxy":7}],7:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Proxy module
 *
 */

// Browserify exports and dependencies
module.exports = ServiceProxy;
var config = require('./qbConfig');
// For server-side applications through using npm module 'quickblox' you should include follow string
//var jQuery = require('jquery/dist/jquery.min');

function ServiceProxy(qb){
  this.qbInst = qb;
  jQuery.support.cors = true;
  jQuery.ajaxSetup({
    accepts: {
      binary: "text/plain; charset=x-user-defined"
    },
    contents: {
    },
    converters: {
      "text binary": true // Nothing to convert
    }
  });
  if (config.debug) { console.debug("ServiceProxy", qb); }
}

ServiceProxy.prototype.setSession= function(session){
  this.qbInst.session = session;
};

ServiceProxy.prototype.getSession = function(){
  return this.qbInst.session;
};

ServiceProxy.prototype.ajax = function(params, callback) {
  var _this = this;
  //if (this.qbInst.session && this.qbInst.session.token){
    //if (params.data) {
      //if (params.data instanceof FormData) {
        //params.data.append('token', this.qbInst.session.token);
      //} else {
        //params.data.token = this.qbInst.session.token;
      //}
    //} else { 
      //params.data = {token: this.qbInst.session.token}; 
    //}
  //}
  if (config.debug) { console.debug('ServiceProxy',  params.type || 'GET', params); }
  var ajaxCall =   {
    url: params.url,
    type: params.type || 'GET',
    dataType: params.dataType || 'json',
    data: params.data,
    beforeSend: function(jqXHR, settings){
      if (config.debug) {console.debug('ServiceProxy.ajax beforeSend', jqXHR, settings);}
      if (settings.url.indexOf('://qbprod.s3.amazonaws.com') === -1) {
        console.debug('setting headers on request to ' + settings.url);
        jqXHR.setRequestHeader('QuickBlox-REST-API-Version', '0.1.1');
        if (_this.qbInst.session && _this.qbInst.session.token) {
          jqXHR.setRequestHeader('QB-Token', _this.qbInst.session.token);
        }
      }
    },
    success: function (data, status, jqHXR) {
      if (config.debug) {console.debug('ServiceProxy.ajax success', status, data);}
      callback(null,data);
    },
    error: function(jqHXR, status, error) {
      if (config.debug) {console.debug('ServiceProxy.ajax error', jqHXR, status, error);}
      var errorMsg = {code: jqHXR.status, status: status, message:error};
      if (jqHXR && jqHXR.responseText){ errorMsg.detail = jqHXR.responseText || jqHXR.responseXML; }
      if (config.debug) {console.debug("ServiceProxy.ajax error", error);}
      callback(errorMsg, null);
    }
  };
  // Optional - for example 'multipart/form-data' when sending a file.
  // Default is 'application/x-www-form-urlencoded; charset=UTF-8'
  if (typeof params.contentType === 'boolean' || typeof params.contentType === 'string') { ajaxCall.contentType = params.contentType; }
  if (typeof params.processData === 'boolean') { ajaxCall.processData = params.processData; }
  if (typeof params.crossDomain === 'boolean') { ajaxCall.crossDomain = params.crossDomain; }
  if (typeof params.async === 'boolean') { ajaxCall.async = params.async; }
  if (typeof params.cache === 'boolean') { ajaxCall.cache = params.cache; }
  if (typeof params.crossDomain === 'boolean') { ajaxCall.crossDomain = params.crossDomain; }
  if (typeof params.mimeType === 'string') { ajaxCall.mimeType = params.mimeType; }
  jQuery.ajax( ajaxCall );
}

},{"./qbConfig":2}],8:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Users Resource Module
 *
 */

// Browserify exports and dependencies
module.exports = UsersProxy;
var config = require('./qbConfig');
var Proxy = require('./qbProxy');

var baseUrl = config.urls.base+ config.urls.users;

function UsersProxy(service) {
  this.service = service;
}

UsersProxy.prototype.listUsers = function(params, callback){
  var _this = this, url, message = {}, filter;
  url = config.urls.base + config.urls.users + config.urls.type;
  if (typeof params === 'function') {
    callback = params;
    params = undefined;
  }
  if (params && params.filter) {
    switch (params.filter.type){
      case 'id':
        filter = 'number id in';
        break;
      case 'email':
        filter = 'string email in';
        break;
      case 'login':
        filter = 'string login in';
        break;
      case 'facebook_id':
        filter = 'number facebook_id in';
        break;
      case 'twitter_id':
        filter = 'number twitter_id in';
        break;
      case 'phone':
        filter = 'string phone in';
        break;
    }
    filter = filter + ' ' + params.filter.value;
    message['filter[]'] = filter;
  }
  if (params && params.perPage) { message.per_page = params.perPage;}
  if (params && params.pageNo) {message.page = params.pageNo;}
  if (config.debug) {console.debug('UsersProxy.list', message);}
  this.service.ajax({url: url, data: message}, callback);
};

UsersProxy.prototype.create = function(params, callback){
  var url = baseUrl + config.urls.type;
  if (config.debug) { console.debug('UsersProxy.create', params);}
  this.service.ajax({url: url, type: 'POST', data: {user: params}}, 
                    function(err, data){
                      if (err) { callback(err, null);}
                      else { callback(null, data.user); }
                    });
};

UsersProxy.prototype.delete = function(id, callback){
  var url = baseUrl + '/' + id + config.urls.type;
  if (config.debug) { console.debug('UsersProxy.delete', url); }
  this.service.ajax({url: url, type: 'DELETE', dataType: 'text' },
                    function(err,data){
                      if (err) { callback(err, null);}
                      else { callback(null, true); }
                     });
};

UsersProxy.prototype.update = function(user, callback){
  var allowedProps = ['login', 'blob_id', 'email', 'external_user_id', 'facebook_id', 'twitter_id', 'full_name',
      'phone', 'website', 'tag_list', 'password', 'old_password'];
  var url = baseUrl + '/' + user.id + config.urls.type, msg = {}, prop;
  for (prop in user) {
    if (user.hasOwnProperty(prop)) {
      if (allowedProps.indexOf(prop)>0) {
        msg[prop] = user[prop];
      } 
    }
  }
  if (config.debug) { console.debug('UsersProxy.update', url, user); }
  this.service.ajax({url: url, type: 'PUT', data: {user: msg}}, 
                    function(err,data){
                      if (err) {callback(err, null);}
                      else { 
                        console.debug (data.user);
                        callback (null, data.user);
                      }
                    });
};

UsersProxy.prototype.get = function(params, callback){
  var _this = this, url = baseUrl;
  if (typeof params === 'function') {
    callback = params;
    params = {};
  }
  if (typeof params === 'number'){
    url += '/' + params + config.urls.type;
  } else if (typeof params === 'object') {
    if (params.id) {
      url += '/' + params.id + config.urls.type;
    } else if (params.facebookId) {
      url += '/by_facebook_id' + config.urls.type + '?facebook_id=' + params.facebookId;
    } else if (params.login) {
      url += '/by_login' + config.urls.type + '?login=' + params.login;
    } else if (params.fullName) {
      url += '/by_full_name' + config.urls.type + '?full_name=' + params.fullName;
    } else if (params.twitterId) {
      url += '/by_twitter_id' + config.urls.type + '?twitter_id=' + params.twitterId;
    } else if (params.email) {
      url += '/by_email' + config.urls.type + '?email=' + params.email;
    } else if (params.tags) {
      url += '/by_tags' + config.urls.type + '?tag=' + params.tags;
    }
  }
  if (config.debug) {console.debug('UsersProxy.get', url);}
  this.service.ajax({url:url},
                    function(err,data){
                      var user;
                      if (data && data.user) {
                        user = data.user;
                      }
                      if (config.debug) { console.debug('UserProxy.get', user); }
                        callback(err,user);
                    });
}

},{"./qbConfig":2,"./qbProxy":7}],9:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * qbUtils.js - QuickBlox utilities
 *
 *
 */

var config = require('./qbConfig');

function shims() {
  // Shim for Date.now function (IE < 9)
  if (!Date.now) {
    Date.now = function now() {
      return new Date().getTime();
      };
  }
  // Shim for console log on IE
  // (http://stackoverflow.com/questions/1423267/are-there-any-logging-frameworks-for-javascript#answer-10816237)
  if (typeof console === 'undefined' || !console.log) {
    window.console = {
      debug: function() {},
      trace: function() {},
      log: function() {},
      info: function() {},
      warn: function() {},
      error: function() {}
    };
  }
}


exports.shims = function() {shims();};
exports.unixTime = function() { return Math.floor(Date.now() / 1000).toString(); };
exports.resourceUrl = function(base, id, type) { return base + '/' + id + (typeof type === 'undefined'? config.urls.type : type); };

},{"./qbConfig":2}],10:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Main SDK module
 *
 * Provides a window scoped variable (QB) for use in browsers.
 * Also exports QuickBlox for using with node.js, browserify, etc. 
 *
 */

// Browserify exports and dependencies
module.exports = QuickBlox;
var config = require('./qbConfig');
var utils = require('./qbUtils');
var Proxy = require('./qbProxy');
var Auth = require('./qbAuth');
var Users = require('./qbUsers');
var Messages = require('./qbMessages');
var Location = require('./qbLocation');
var Data = require('./qbData');
var Content = require('./qbContent');

// IIEF to create a window scoped QB instance
var QB = (function(QB, window){
  utils.shims();
  if (typeof QB.config === 'undefined') {
    QB = new QuickBlox();
  }
  if (window && typeof window.QB === 'undefined'){
    window.QB= QB;
  }
  return QB;
}(QB || {}, window));


// Actual QuickBlox API starts here
function QuickBlox() {
  if (config.debug) {console.debug('Quickblox instantiated', this);}
}

QuickBlox.prototype.init = function init(appId, authKey, authSecret, debug) {
  this.session =  null;
  this.service = new Proxy(this);
  this.auth = new Auth(this.service);
  this.users = new Users(this.service);
  this.messages = new Messages(this.service);
  this.location = new Location(this.service);
  this.data = new Data(this.service);
  this.content = new Content(this.service);
  if (typeof appId === 'object') {
    debug = appId.debug;
    authSecret = appId.authSecret;
    authKey = appId.authKey;
    appId = appId.appId;
  } else if (typeof appId === 'string' && typeof authKey === 'undefined' && typeof authSecret === 'undefined') {
    this.session = { token: appId };
    appId = null;
    debug = true;
  }
  config.creds.appId = appId;
  config.creds.authKey = authKey;
  config.creds.authSecret = authSecret;
  if (debug) {
    config.debug = debug;
    console.debug('QuickBlox.init', this);
  }
};

QuickBlox.prototype.config = config;

QuickBlox.prototype.createSession = function (params, callback){
  this.auth.createSession(params, callback);
};

QuickBlox.prototype.destroySession = function(callback){
  if (this.session) {
    this.auth.destroySession(callback);
  }
};

QuickBlox.prototype.login = function (params, callback){
  this.auth.login(params, callback);
};

QuickBlox.prototype.logout = function(callback){
  if (this.session) {
    this.auth.logout(callback);
  }
};


},{"./qbAuth":1,"./qbConfig":2,"./qbContent":3,"./qbData":4,"./qbLocation":5,"./qbMessages":6,"./qbProxy":7,"./qbUsers":8,"./qbUtils":9}],11:[function(require,module,exports){
(function(e,r){"object"==typeof exports?module.exports=exports=r():"function"==typeof define&&define.amd?define([],r):e.CryptoJS=r()})(this,function(){var e=e||function(e,r){var t={},i=t.lib={},n=i.Base=function(){function e(){}return{extend:function(r){e.prototype=this;var t=new e;return r&&t.mixIn(r),t.hasOwnProperty("init")||(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var r in e)e.hasOwnProperty(r)&&(this[r]=e[r]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),o=i.WordArray=n.extend({init:function(e,t){e=this.words=e||[],this.sigBytes=t!=r?t:4*e.length},toString:function(e){return(e||s).stringify(this)},concat:function(e){var r=this.words,t=e.words,i=this.sigBytes,n=e.sigBytes;if(this.clamp(),i%4)for(var o=0;n>o;o++){var c=255&t[o>>>2]>>>24-8*(o%4);r[i+o>>>2]|=c<<24-8*((i+o)%4)}else if(t.length>65535)for(var o=0;n>o;o+=4)r[i+o>>>2]=t[o>>>2];else r.push.apply(r,t);return this.sigBytes+=n,this},clamp:function(){var r=this.words,t=this.sigBytes;r[t>>>2]&=4294967295<<32-8*(t%4),r.length=e.ceil(t/4)},clone:function(){var e=n.clone.call(this);return e.words=this.words.slice(0),e},random:function(r){for(var t=[],i=0;r>i;i+=4)t.push(0|4294967296*e.random());return new o.init(t,r)}}),c=t.enc={},s=c.Hex={stringify:function(e){for(var r=e.words,t=e.sigBytes,i=[],n=0;t>n;n++){var o=255&r[n>>>2]>>>24-8*(n%4);i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(e){for(var r=e.length,t=[],i=0;r>i;i+=2)t[i>>>3]|=parseInt(e.substr(i,2),16)<<24-4*(i%8);return new o.init(t,r/2)}},u=c.Latin1={stringify:function(e){for(var r=e.words,t=e.sigBytes,i=[],n=0;t>n;n++){var o=255&r[n>>>2]>>>24-8*(n%4);i.push(String.fromCharCode(o))}return i.join("")},parse:function(e){for(var r=e.length,t=[],i=0;r>i;i++)t[i>>>2]|=(255&e.charCodeAt(i))<<24-8*(i%4);return new o.init(t,r)}},f=c.Utf8={stringify:function(e){try{return decodeURIComponent(escape(u.stringify(e)))}catch(r){throw Error("Malformed UTF-8 data")}},parse:function(e){return u.parse(unescape(encodeURIComponent(e)))}},a=i.BufferedBlockAlgorithm=n.extend({reset:function(){this._data=new o.init,this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=f.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(r){var t=this._data,i=t.words,n=t.sigBytes,c=this.blockSize,s=4*c,u=n/s;u=r?e.ceil(u):e.max((0|u)-this._minBufferSize,0);var f=u*c,a=e.min(4*f,n);if(f){for(var p=0;f>p;p+=c)this._doProcessBlock(i,p);var d=i.splice(0,f);t.sigBytes-=a}return new o.init(d,a)},clone:function(){var e=n.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0});i.Hasher=a.extend({cfg:n.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){a.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){e&&this._append(e);var r=this._doFinalize();return r},blockSize:16,_createHelper:function(e){return function(r,t){return new e.init(t).finalize(r)}},_createHmacHelper:function(e){return function(r,t){return new p.HMAC.init(e,t).finalize(r)}}});var p=t.algo={};return t}(Math);return e});
},{}],12:[function(require,module,exports){
(function(e,r){"object"==typeof exports?module.exports=exports=r(require("./core"),require("./sha1"),require("./hmac")):"function"==typeof define&&define.amd?define(["./core","./sha1","./hmac"],r):r(e.CryptoJS)})(this,function(e){return e.HmacSHA1});
},{"./core":11,"./hmac":13,"./sha1":14}],13:[function(require,module,exports){
(function(e,r){"object"==typeof exports?module.exports=exports=r(require("./core")):"function"==typeof define&&define.amd?define(["./core"],r):r(e.CryptoJS)})(this,function(e){(function(){var r=e,t=r.lib,n=t.Base,i=r.enc,o=i.Utf8,s=r.algo;s.HMAC=n.extend({init:function(e,r){e=this._hasher=new e.init,"string"==typeof r&&(r=o.parse(r));var t=e.blockSize,n=4*t;r.sigBytes>n&&(r=e.finalize(r)),r.clamp();for(var i=this._oKey=r.clone(),s=this._iKey=r.clone(),a=i.words,c=s.words,f=0;t>f;f++)a[f]^=1549556828,c[f]^=909522486;i.sigBytes=s.sigBytes=n,this.reset()},reset:function(){var e=this._hasher;e.reset(),e.update(this._iKey)},update:function(e){return this._hasher.update(e),this},finalize:function(e){var r=this._hasher,t=r.finalize(e);r.reset();var n=r.finalize(this._oKey.clone().concat(t));return n}})})()});
},{"./core":11}],14:[function(require,module,exports){
(function(e,r){"object"==typeof exports?module.exports=exports=r(require("./core")):"function"==typeof define&&define.amd?define(["./core"],r):r(e.CryptoJS)})(this,function(e){return function(){var r=e,t=r.lib,n=t.WordArray,i=t.Hasher,o=r.algo,s=[],c=o.SHA1=i.extend({_doReset:function(){this._hash=new n.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(e,r){for(var t=this._hash.words,n=t[0],i=t[1],o=t[2],c=t[3],a=t[4],f=0;80>f;f++){if(16>f)s[f]=0|e[r+f];else{var u=s[f-3]^s[f-8]^s[f-14]^s[f-16];s[f]=u<<1|u>>>31}var d=(n<<5|n>>>27)+a+s[f];d+=20>f?(i&o|~i&c)+1518500249:40>f?(i^o^c)+1859775393:60>f?(i&o|i&c|o&c)-1894007588:(i^o^c)-899497514,a=c,c=o,o=i<<30|i>>>2,i=n,n=d}t[0]=0|t[0]+n,t[1]=0|t[1]+i,t[2]=0|t[2]+o,t[3]=0|t[3]+c,t[4]=0|t[4]+a},_doFinalize:function(){var e=this._data,r=e.words,t=8*this._nDataBytes,n=8*e.sigBytes;return r[n>>>5]|=128<<24-n%32,r[(n+64>>>9<<4)+14]=Math.floor(t/4294967296),r[(n+64>>>9<<4)+15]=t,e.sigBytes=4*r.length,this._process(),this._hash},clone:function(){var e=i.clone.call(this);return e._hash=this._hash.clone(),e}});r.SHA1=i._createHelper(c),r.HmacSHA1=i._createHmacHelper(c)}(),e.SHA1});
},{"./core":11}]},{},[10])