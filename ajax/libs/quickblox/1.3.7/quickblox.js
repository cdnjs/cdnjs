(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Authentication Module
 *
 */

// Browserify exports and dependencies
module.exports = AuthProxy;
var config = require('../qbConfig');
var Utils = require('../qbUtils');
var crypto = require('crypto-js/hmac-sha1');

function AuthProxy(service) {
  this.service = service;
}

AuthProxy.prototype.createSession = function(params, callback) {
  var _this = this, message;

  if (typeof params === 'function' && typeof callback === 'undefined') {
    callback = params;
    params = {};
  }

  // Signature of message with SHA-1 using secret key
  message = generateAuthMsg(params);
  message.signature = signMessage(message, config.creds.authSecret);
  
  if (config.debug) { console.log('AuthProxy.createSession', message); }
  this.service.ajax({url: Utils.getUrl(config.urls.session), type: 'POST', data: message},
                    function(err, res) {
                      if (err) {
                        callback(err, null);
                      } else {
                        _this.service.setSession(res.session);
                        callback(null, res.session);
                      }
                    });
};

AuthProxy.prototype.destroySession = function(callback) {
  var _this = this;
  if (config.debug) { console.log('AuthProxy.destroySession'); }
  this.service.ajax({url: Utils.getUrl(config.urls.session), type: 'DELETE', dataType: 'text'},
                    function(err, res) {
                      if (err) {
                        callback(err, null);
                      } else {
                        _this.service.setSession(null);
                        callback(null, res);
                      }
                    });
};

AuthProxy.prototype.login = function(params, callback) {
  if (config.debug) { console.log('AuthProxy.login', params); }
  this.service.ajax({url: Utils.getUrl(config.urls.login), type: 'POST', data: params},
                    function(err, res) {
                      if (err) { callback(err, null); }
                      else { callback(null, res.user); }
                    });
};

AuthProxy.prototype.logout = function(callback) {
  if (config.debug) { console.log('AuthProxy.logout'); }
  this.service.ajax({url: Utils.getUrl(config.urls.login), type: 'DELETE', dataType:'text'}, callback);
};


/* Private
---------------------------------------------------------------------- */
function generateAuthMsg(params) {
  var message = {
    application_id: config.creds.appId,
    auth_key: config.creds.authKey,
    nonce: Utils.randomNonce(),
    timestamp: Utils.unixTime()
  };
  
  // With user authorization
  if (params.login && params.password) {
    message.user = {login: params.login, password: params.password};
  } else if (params.email && params.password) {
    message.user = {email: params.email, password: params.password};
  } else if (params.provider) {
    // Via social networking provider (e.g. facebook, twitter etc.)
    message.provider = params.provider;
    if (params.scope) {
      message.scope = params.scope;
    }
    if (params.keys && params.keys.token) {
      message.keys = {token: params.keys.token};
    }
    if (params.keys && params.keys.secret) {
      messages.keys.secret = params.keys.secret;
    }
  }
  
  return message;
}

function signMessage(message, secret) {
  var sessionMsg = Object.keys(message).map(function(val) {
    if (typeof message[val] === 'object') {
      return Object.keys(message[val]).map(function(val1) {
        return val + '[' + val1 + ']=' + message[val][val1];
      }).sort().join('&');
    } else {
      return val + '=' + message[val];
    }
  }).sort().join('&');
  
  return crypto(sessionMsg, secret).toString();
}

},{"../qbConfig":8,"../qbUtils":10,"crypto-js/hmac-sha1":14}],2:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Chat 2.0 Module
 *
 */

/*
 * User's callbacks (listener-functions):
 * - onMessageListener
 * - onContactListListener
 * - onSubscribeListener
 * - onConfirmSubscribeListener
 * - onRejectSubscribeListener
 * - onDisconnectingListener
 * - onReconnectListener
 */

// Browserify exports and dependencies
require('../../lib/strophe/strophe.min');
var config = require('../qbConfig');
var Utils = require('../qbUtils');
module.exports = ChatProxy;

var dialogUrl = config.urls.chat + '/Dialog';
var messageUrl = config.urls.chat + '/Message';

var roster = {},
    joinedRooms = {};

// The object for type MongoDB.Bson.ObjectId
// http://docs.mongodb.org/manual/reference/object-id/
var ObjectId = {
  machine: Math.floor(Math.random() * 16777216).toString(16),
  pid: Math.floor(Math.random() * 32767).toString(16),
  increment: 0
};

// add extra namespaces for Strophe
Strophe.addNamespace('CARBONS', 'urn:xmpp:carbons:2');

// create Strophe Connection object
var protocol = config.chatProtocol.active === 1 ? config.chatProtocol.bosh : config.chatProtocol.websocket;
var connection = new Strophe.Connection(protocol);
// if (config.debug) {
  if (config.chatProtocol.active === 1) {
    connection.xmlInput = function(data) { if (data.childNodes[0]) {for (var i = 0, len = data.childNodes.length; i < len; i++) { console.log('[QBChat RECV]:', data.childNodes[i]); }} };
    connection.xmlOutput = function(data) { if (data.childNodes[0]) {for (var i = 0, len = data.childNodes.length; i < len; i++) { console.log('[QBChat SENT]:', data.childNodes[i]); }} };
  } else {
    connection.xmlInput = function(data) { console.log('[QBChat RECV]:', data); };
    connection.xmlOutput = function(data) { console.log('[QBChat SENT]:', data); };
  }
// }

function ChatProxy(service) {
  var self = this;

  this.service = service;
  this.roster = new RosterProxy(service);
  this.muc = new MucProxy(service);
  this.dialog = new DialogProxy(service);
  this.message = new MessageProxy(service);
  this.helpers = new Helpers;

  // reconnect to chat if it wasn't the logout method
  this._isLogout = false;

  // stanza callbacks (Message, Presence, IQ)

  this._onMessage = function(stanza) {
    var from = stanza.getAttribute('from'),
        to = stanza.getAttribute('to'),
        type = stanza.getAttribute('type'),
        body = stanza.querySelector('body'),
        invite = stanza.querySelector('invite'),
        extraParams = stanza.querySelector('extraParams'),        
        delay = stanza.querySelector('delay'),
        userId = type === 'groupchat' ? self.helpers.getIdFromResource(from) : self.helpers.getIdFromNode(from),
        message, extension, attachments, attach, attributes;

    if (invite) return true;

    // custom parameters
    if (extraParams) {
      extension = {};
      attachments = [];
      for (var i = 0, len = extraParams.childNodes.length; i < len; i++) {
        if (extraParams.childNodes[i].tagName === 'attachment') {
          
          // attachments
          attach = {};
          attributes = extraParams.childNodes[i].attributes;
          for (var j = 0, len2 = attributes.length; j < len2; j++) {
            if (attributes[j].name === 'id' || attributes[j].name === 'size')
              attach[attributes[j].name] = parseInt(attributes[j].value);
            else
              attach[attributes[j].name] = attributes[j].value;
          }
          attachments.push(attach);

        } else {
          extension[extraParams.childNodes[i].tagName] = extraParams.childNodes[i].textContent;
        }
      }

      if (attachments.length > 0)
        extension.attachments = attachments;
    }

    message = {
      type: type,
      body: (body && body.textContent) || null,
      extension: extension || null
    };

    // !delay - this needed to don't duplicate messages from chat 2.0 API history
    // with typical XMPP behavior of history messages in group chat
    if (typeof self.onMessageListener === 'function' && (type === 'chat' || !delay))
      self.onMessageListener(userId, message, to, delay);

    // we must return true to keep the handler alive
    // returning false would remove it after it finishes
    return true;
  };

  this._onPresence = function(stanza) {
    var from = stanza.getAttribute('from'),
        type = stanza.getAttribute('type'),
        userId = self.helpers.getIdFromNode(from);

    if (!type) {
      if (typeof self.onContactListListener === 'function' && roster[userId] && roster[userId].subscription !== 'none')
        self.onContactListListener(userId);
    } else {

      // subscriptions callbacks
      switch (type) {
      case 'subscribe':
        if (roster[userId] && roster[userId].subscription === 'to') {
          roster[userId] = {
            subscription: 'both',
            ask: null
          };
          self.roster._sendSubscriptionPresence({
            jid: from,
            type: 'subscribed'
          });
        } else {
          if (typeof self.onSubscribeListener === 'function')
            self.onSubscribeListener(userId);
        }
        break;
      case 'subscribed':
        if (roster[userId] && roster[userId].subscription === 'from') {
          roster[userId] = {
            subscription: 'both',
            ask: null
          };          
        } else {
          roster[userId] = {
            subscription: 'to',
            ask: null
          };
          if (typeof self.onConfirmSubscribeListener === 'function')
            self.onConfirmSubscribeListener(userId);
        }
        break;
      case 'unsubscribed':
        roster[userId] = {
          subscription: 'none',
          ask: null
        };
        if (typeof self.onRejectSubscribeListener === 'function')
          self.onRejectSubscribeListener(userId);
        break;
      case 'unsubscribe':
        roster[userId] = {
          subscription: 'to',
          ask: null
        };
        // if (typeof self.onRejectSubscribeListener === 'function')
        //   self.onRejectSubscribeListener(userId);
        break;
      case 'unavailable':
        if (typeof self.onContactListListener === 'function' && roster[userId] && roster[userId].subscription !== 'none')
          self.onContactListListener(userId, type);
        break;
      }

    }

    // we must return true to keep the handler alive
    // returning false would remove it after it finishes
    return true;
  };

  this._onIQ = function(stanza) {

    // we must return true to keep the handler alive
    // returning false would remove it after it finishes
    return true;
  };
}

/* Chat module: Core
---------------------------------------------------------------------- */
ChatProxy.prototype._autoSendPresence = function() {
  connection.send($pres().tree());
  // we must return true to keep the handler alive
  // returning false would remove it after it finishes
  return true;
};

ChatProxy.prototype.connect = function(params, callback) {
  if (config.debug) { console.log('ChatProxy.connect', params); }
  var self = this,
      err, rooms;

  connection.connect(params.jid, params.password, function(status) {
    switch (status) {
    case Strophe.Status.ERROR:
      err = getError(422, 'Status.ERROR - An error has occurred');
      if (typeof callback === 'function') callback(err, null);
      break;
    case Strophe.Status.CONNECTING:
      trace('Status.CONNECTING');
      trace('Chat Protocol - ' + (config.chatProtocol.active === 1 ? 'BOSH' : 'WebSocket'));
      break;
    case Strophe.Status.CONNFAIL:
      err = getError(422, 'Status.CONNFAIL - The connection attempt failed');
      if (typeof callback === 'function') callback(err, null);
      break;
    case Strophe.Status.AUTHENTICATING:
      trace('Status.AUTHENTICATING');
      break;
    case Strophe.Status.AUTHFAIL:
      err = getError(401, 'Status.AUTHFAIL - The authentication attempt failed');
      if (typeof callback === 'function') callback(err, null);
      break;
    case Strophe.Status.CONNECTED:
      trace('Status.CONNECTED at ' + getLocalTime());

      connection.addHandler(self._onMessage, null, 'message');
      connection.addHandler(self._onPresence, null, 'presence');
      connection.addHandler(self._onIQ, null, 'iq');

      // enable carbons
      self._enableCarbons(function() {
        // get the roster
        self.roster.get(function(contacts) {
          roster = contacts;

          // chat server will close your connection if you are not active in chat during one minute
          // initial presence and an automatic reminder of it each 55 seconds
          connection.send($pres().tree());
          connection.addTimedHandler(55 * 1000, self._autoSendPresence);

          if (typeof callback === 'function') {
            callback(null, roster);
          } else {
            self._isLogout = false;

            // recover the joined rooms
            rooms = Object.keys(joinedRooms);
            for (var i = 0, len = rooms.length; i < len; i++) {
              self.muc.join(rooms[i]);
            }

            if (typeof self.onReconnectListener === 'function')
              self.onReconnectListener();
          }
        });
      });

      break;
    case Strophe.Status.DISCONNECTING:
      trace('Status.DISCONNECTING');
      break;
    case Strophe.Status.DISCONNECTED:
      trace('Status.DISCONNECTED at ' + getLocalTime());
      connection.reset();

      if (typeof self.onDisconnectingListener === 'function')
        self.onDisconnectingListener();

      // reconnect to chat
      if (!self._isLogout) self.connect(params);
      break;
    case Strophe.Status.ATTACHED:
      trace('Status.ATTACHED');
      break;
    }
  });
};

ChatProxy.prototype.send = function(jid, message) {
  var self = this,
      msg = $msg({
        from: connection.jid,
        to: jid,
        type: message.type,
        id: message.id || self.helpers.getBsonObjectId()
      });
  
  if (message.body) {
    msg.c('body', {
      xmlns: Strophe.NS.CLIENT
    }).t(message.body).up();
  }
  
  // custom parameters
  if (message.extension) {
    msg.c('extraParams', {
      xmlns: Strophe.NS.CLIENT
    });
    
    Object.keys(message.extension).forEach(function(field) {
      if (field === 'attachments') {

        // attachments
        message.extension[field].forEach(function(attach) {
          msg.c('attachment', attach).up();
        });

      } else {
        msg.c(field).t(message.extension[field]).up();
      }
    });
  }
  
  connection.send(msg);
};

// helper function for ChatProxy.send()
ChatProxy.prototype.sendPres = function(type) {
  connection.send($pres({ 
    from: connection.jid,
    type: type
  }));
};

ChatProxy.prototype.disconnect = function() {
  joinedRooms = {};
  this._isLogout = true;
  connection.flush();
  connection.disconnect();
};

ChatProxy.prototype.addListener = function(params, callback) {
  return connection.addHandler(handler, null, params.name || null, params.type || null, params.id || null, params.from || null);

  function handler() {
    callback();
    // if 'false' - a handler will be performed only once
    return params.live !== false;
  }
};

ChatProxy.prototype.deleteListener = function(ref) {
  connection.deleteHandler(ref);
};

// Carbons XEP
// http://
ChatProxy.prototype._enableCarbons = function(callback) {
  var iq;

  iq = $iq({
    from: connection.jid,
    type: 'set',
    id: connection.getUniqueId('enableCarbons')
  }).c('enable', {
    xmlns: Strophe.NS.CARBONS
  });

  connection.sendIQ(iq, function(stanza) {
    callback();
  });
};

/* Chat module: Roster
 *
 * Integration of Roster Items and Presence Subscriptions
 * http://xmpp.org/rfcs/rfc3921.html#int
 * default - Mutual Subscription
 *
---------------------------------------------------------------------- */
function RosterProxy(service) {
  this.service = service;
  this.helpers = new Helpers;
}

RosterProxy.prototype.get = function(callback) {
  var iq, self = this,
      items, userId, contacts = {};

  iq = $iq({
    from: connection.jid,
    type: 'get',
    id: connection.getUniqueId('getRoster')
  }).c('query', {
    xmlns: Strophe.NS.ROSTER
  });

  connection.sendIQ(iq, function(stanza) {
    items = stanza.getElementsByTagName('item');
    for (var i = 0, len = items.length; i < len; i++) {
      userId = self.helpers.getIdFromNode(items[i].getAttribute('jid')).toString();
      contacts[userId] = {
        subscription: items[i].getAttribute('subscription'),
        ask: items[i].getAttribute('ask') || null
      };
    }
    callback(contacts);
  });
};

RosterProxy.prototype.add = function(jid, callback) {
  var self = this,
      userId = self.helpers.getIdFromNode(jid).toString();

  roster[userId] = {
    subscription: 'none',
    ask: 'subscribe'
  };

  self._sendSubscriptionPresence({
    jid: jid,
    type: 'subscribe'
  });

  if (typeof callback === 'function') callback();
};

RosterProxy.prototype.confirm = function(jid, callback) {
  var self = this,
      userId = self.helpers.getIdFromNode(jid).toString();

  roster[userId] = {
    subscription: 'from',
    ask: 'subscribe'
  };

  self._sendSubscriptionPresence({
    jid: jid,
    type: 'subscribed'
  });

  self._sendSubscriptionPresence({
    jid: jid,
    type: 'subscribe'
  });

  if (typeof callback === 'function') callback();
};

RosterProxy.prototype.reject = function(jid, callback) {
  var self = this,
      userId = self.helpers.getIdFromNode(jid).toString();

  roster[userId] = {
    subscription: 'none',
    ask: null
  };

  self._sendSubscriptionPresence({
    jid: jid,
    type: 'unsubscribed'
  });

  if (typeof callback === 'function') callback();
};

RosterProxy.prototype.remove = function(jid, callback) {
  var iq, userId, self = this;

  iq = $iq({
    from: connection.jid,
    type: 'set',
    id: connection.getUniqueId('removeRosterItem')
  }).c('query', {
    xmlns: Strophe.NS.ROSTER
  }).c('item', {
    jid: jid,
    subscription: 'remove'
  });

  userId = self.helpers.getIdFromNode(jid).toString();

  connection.sendIQ(iq, function() {
    delete roster[userId];
    if (typeof callback === 'function') callback();
  });
};

RosterProxy.prototype._sendSubscriptionPresence = function(params) {
  var pres;

  pres = $pres({
    to: params.jid,
    type: params.type
  });

  connection.send(pres);
};

/* Chat module: Group Chat
 *
 * Multi-User Chat
 * http://xmpp.org/extensions/xep-0045.html
 *
---------------------------------------------------------------------- */
function MucProxy(service) {
  this.service = service;
  this.helpers = new Helpers;
}

MucProxy.prototype.join = function(jid, callback) {
  var pres, self = this,
      id = connection.getUniqueId('join');

  joinedRooms[jid] = true;

  pres = $pres({
    from: connection.jid,
    to: self.helpers.getRoomJid(jid),
    id: id
  }).c("x", {
    xmlns: Strophe.NS.MUC
  }).c("history", {
    maxstanzas: 0
  });

  if (typeof callback === 'function') connection.addHandler(callback, null, 'presence', null, id);
  connection.send(pres);
};

MucProxy.prototype.leave = function(jid, callback) {
  var pres, self = this,
      roomJid = self.helpers.getRoomJid(jid);

  delete joinedRooms[jid];

  pres = $pres({
    from: connection.jid,
    to: roomJid,
    type: 'unavailable'
  });

  if (typeof callback === 'function') connection.addHandler(callback, null, 'presence', 'unavailable', null, roomJid);
  connection.send(pres);
};

/* Chat module: History
---------------------------------------------------------------------- */

// Dialogs

function DialogProxy(service) {
  this.service = service;
  this.helpers = new Helpers;
}

DialogProxy.prototype.list = function(params, callback) {
  if (typeof params === 'function' && typeof callback === 'undefined') {
    callback = params;
    params = {};
  }

  if (config.debug) { console.log('DialogProxy.list', params); }
  this.service.ajax({url: Utils.getUrl(dialogUrl), data: params}, callback);
};

DialogProxy.prototype.create = function(params, callback) {
  if (config.debug) { console.log('DialogProxy.create', params); }
  this.service.ajax({url: Utils.getUrl(dialogUrl), type: 'POST', data: params}, callback);
};

DialogProxy.prototype.update = function(id, params, callback) {
  if (config.debug) { console.log('DialogProxy.update', id, params); }
  this.service.ajax({url: Utils.getUrl(dialogUrl, id), type: 'PUT', data: params}, callback);
};

DialogProxy.prototype.delete = function(id, callback) {
  if (config.debug) { console.log('DialogProxy.delete', id); }
  this.service.ajax({url: Utils.getUrl(dialogUrl, id), type: 'DELETE', dataType: 'text'}, callback);
};

// Messages

function MessageProxy(service) {
  this.service = service;
  this.helpers = new Helpers;
}

MessageProxy.prototype.list = function(params, callback) {
  if (config.debug) { console.log('MessageProxy.list', params); }
  this.service.ajax({url: Utils.getUrl(messageUrl), data: params}, callback);
};

MessageProxy.prototype.create = function(params, callback) {
  if (config.debug) { console.log('MessageProxy.create', params); }
  this.service.ajax({url: Utils.getUrl(messageUrl), type: 'POST', data: params}, callback);
};

MessageProxy.prototype.update = function(id, params, callback) {
  if (config.debug) { console.log('MessageProxy.update', id, params); }
  this.service.ajax({url: Utils.getUrl(messageUrl, id), type: 'PUT', data: params}, callback);
};

MessageProxy.prototype.delete = function(id, callback) {
  if (config.debug) { console.log('MessageProxy.delete', id); }
  this.service.ajax({url: Utils.getUrl(messageUrl, id), type: 'DELETE', dataType: 'text'}, callback);
};

/* Helpers
---------------------------------------------------------------------- */
function Helpers() {}

Helpers.prototype = {

  getUserJid: function(id, appId) {
    return id + '-' + appId + '@' + config.endpoints.chat;
  },

  getIdFromNode: function(jid) {
    return parseInt(Strophe.getNodeFromJid(jid).split('-')[0]);
  },

  getRoomJid: function(jid) {
    return jid + '/' + this.getIdFromNode(connection.jid);
  },  

  getIdFromResource: function(jid) {
    return parseInt(Strophe.getResourceFromJid(jid));
  },

  getUniqueId: function(suffix) {
    return connection.getUniqueId(suffix);
  },

  // Generating BSON ObjectId and converting it to a 24 character string representation
  // Changed from https://github.com/justaprogrammer/ObjectId.js/blob/master/src/main/javascript/Objectid.js
  getBsonObjectId: function() {
    var timestamp = Utils.unixTime().toString(16),
        increment = (ObjectId.increment++).toString(16);

    if (increment > 0xffffff) ObjectId.increment = 0;

    return '00000000'.substr(0, 8 - timestamp.length) + timestamp +
           '000000'.substr(0, 6 - ObjectId.machine.length) + ObjectId.machine +
           '0000'.substr(0, 4 - ObjectId.pid.length) + ObjectId.pid +
           '000000'.substr(0, 6 - increment.length) + increment;
  }

};

/* Private
---------------------------------------------------------------------- */
function trace(text) {
  // if (config.debug) {
    console.log('[QBChat]:', text);
  // }
}

function getError(code, detail) {
  var errorMsg = {
    code: code,
    status: 'error',
    message: code === 401 ? 'Unauthorized' : 'Unprocessable Entity',
    detail: detail
  };

  trace(detail);
  return errorMsg;
}

function getLocalTime() {
  return (new Date).toTimeString().split(' ')[0];
}

},{"../../lib/strophe/strophe.min":12,"../qbConfig":8,"../qbUtils":10}],3:[function(require,module,exports){
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
var config = require('../qbConfig');
var Utils = require('../qbUtils');

var taggedForUserUrl = config.urls.blobs + '/tagged';

function ContentProxy(service) {
  this.service = service;
}

ContentProxy.prototype.create = function(params, callback){
 if (config.debug) { console.log('ContentProxy.create', params);}
  this.service.ajax({url: Utils.getUrl(config.urls.blobs), data: {blob:params}, type: 'POST'}, function(err,result){
    if (err){ callback(err, null); }
    else { callback (err, result.blob); }
  });
};

ContentProxy.prototype.list = function(params, callback){
  if (typeof params === 'function' && typeof callback ==='undefined') {
    callback = params;
    params = null;
  }
  this.service.ajax({url: Utils.getUrl(config.urls.blobs)}, function(err,result){
    if (err){ callback(err, null); }
    else { callback (err, result); }
  });
};

ContentProxy.prototype.delete = function(id, callback){
  this.service.ajax({url: Utils.getUrl(config.urls.blobs, id), type: 'DELETE', dataType: 'text'}, function(err, result) {
    if (err) { callback(err,null); }
    else { callback(null, true); }
  });
};

ContentProxy.prototype.createAndUpload = function(params, callback){
  var createParams= {}, file, name, type, size, fileId, _this = this;
  if (config.debug) { console.log('ContentProxy.createAndUpload', params);}
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
      var uri = parseUri(createResult.blob_object_access.params), uploadParams = { url: (config.ssl ? 'https://' : 'http://') + uri.host }, data = new FormData();
      fileId = createResult.id;
      
      Object.keys(uri.queryKey).forEach(function(val) {
        data.append(val, decodeURIComponent(uri.queryKey[val]));
      });
      data.append('file', file, createResult.name);
      
      uploadParams.data = data;
      _this.upload(uploadParams, function(err, result) {
        if (err) { callback(err, null); }
        else {
          createResult.path = config.ssl ? result.Location.replace('http://', 'https://') : result.Location;
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
      if (config.debug) { console.log('result', result); }
      callback (null, result);
    }
  });
};

ContentProxy.prototype.taggedForCurrentUser = function(callback) {
  this.service.ajax({url: Utils.getUrl(taggedForUserUrl)}, function(err, result) {
    if (err) { callback(err, null); }
    else { callback(null, result); }
  });
};

ContentProxy.prototype.markUploaded = function (params, callback) {
  this.service.ajax({url: Utils.getUrl(config.urls.blobs, params.id + '/complete'), type: 'PUT', data: {size: params.size}, dataType: 'text' }, function(err, res){
    if (err) { callback (err, null); }
    else { callback (null, res); }
  });
};

ContentProxy.prototype.getInfo = function (id, callback) {
  this.service.ajax({url: Utils.getUrl(config.urls.blobs, id)}, function (err, res) {
    if (err) { callback (err, null); }
    else { callback (null, res); }
  });
};

ContentProxy.prototype.getFile = function (uid, callback) {
 this.service.ajax({url: Utils.getUrl(config.urls.blobs, uid)}, function (err, res) {
    if (err) { callback (err, null); }
    else { callback (null, res); }
  });
};

ContentProxy.prototype.getFileUrl = function (id, callback) {
 this.service.ajax({url: Utils.getUrl(config.urls.blobs, id + '/getblobobjectbyid'), type: 'POST'}, function (err, res) {
    if (err) { callback (err, null); }
    else { callback (null, res.blob_object_access.params); }
  });
};

ContentProxy.prototype.update = function (params, callback) {
  var data = {};
  data.blob = {};
  if (typeof params.name !== 'undefined') { data.blob.name = params.name; }
  this.service.ajax({url: Utils.getUrl(config.urls.blobs, params.id), data: data}, function(err, res) {
    if (err) { callback (err, null); }
    else { callback (null, res); } 
  });
}


// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
// http://blog.stevenlevithan.com/archives/parseuri

function parseUri (str) {
  var o   = parseUri.options,
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

},{"../qbConfig":8,"../qbUtils":10}],4:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Custom Objects module
 *
 */

// Browserify exports and dependencies
module.exports = DataProxy;
var config = require('../qbConfig');
var Utils = require('../qbUtils');

function DataProxy(service){
  this.service = service;
  if (config.debug) { console.log("LocationProxy", service); }
}

DataProxy.prototype.create = function(className, data, callback) {
  if (config.debug) { console.log('DataProxy.create', className, data);}
  this.service.ajax({url: Utils.getUrl(config.urls.data, className), data: data, type: 'POST'}, function(err,res){
    if (err){ callback(err, null); }
    else { callback (err, res); }
  });
};

DataProxy.prototype.list = function(className, filters, callback) {
  // make filters an optional parameter
  if (typeof callback === 'undefined' && typeof filters === 'function') {
    callback = filters;
    filters = null;
  }
  if (config.debug) { console.log('DataProxy.list', className, filters);}
  this.service.ajax({url: Utils.getUrl(config.urls.data, className), data: filters}, function(err,result){
    if (err){ callback(err, null); }
    else { callback (err, result); }
  });
};

DataProxy.prototype.update = function(className, data, callback) {
  if (config.debug) { console.log('DataProxy.update', className, data);}
  this.service.ajax({url: Utils.getUrl(config.urls.data, className + '/' + data._id), data: data, type: 'PUT'}, function(err,result){
    if (err){ callback(err, null); }
    else { callback (err, result); }
  });
};

DataProxy.prototype.delete = function(className, id, callback) {
  if (config.debug) { console.log('DataProxy.delete', className, id);}
  this.service.ajax({url: Utils.getUrl(config.urls.data, className + '/' + id), type: 'DELETE', dataType: 'text'},
                    function(err,result){
                      if (err){ callback(err, null); }
                      else { callback (err, true); }
                    });
};

DataProxy.prototype.uploadFile = function(className, params, callback) {
  var formData;
  if (config.debug) { console.log('DataProxy.uploadFile', className, params);}
  formData = new FormData();
  formData.append('field_name', params.field_name);
  formData.append('file', params.file);
  this.service.ajax({url: Utils.getUrl(config.urls.data, className + '/' + params.id + '/file'), data: formData,
                    contentType: false, processData: false, type:'POST'}, function(err, result){
                      if (err) { callback(err, null);}
                      else { callback (err, result); }
                    });
};

DataProxy.prototype.updateFile = function(className, params, callback) {
  var formData;
  if (config.debug) { console.log('DataProxy.updateFile', className, params);}
  formData = new FormData();
  formData.append('field_name', params.field_name);
  formData.append('file', params.file);
  this.service.ajax({url: Utils.getUrl(config.urls.data, className + '/' + params.id + '/file'), data: formData,
                    contentType: false, processData: false, type: 'POST'}, function(err, result) {
                      if (err) { callback (err, null); }
                      else { callback (err, result); }
                    });
};

DataProxy.prototype.downloadFile = function(className, params, callback) {
  if (config.debug) { console.log('DataProxy.downloadFile', className, params); }
  var result = Utils.getUrl(config.urls.data, className + '/' + params.id + '/file');
  result += '?field_name=' + params.field_name + '&token=' + this.service.getSession().token;
  callback(null, result);
};

DataProxy.prototype.deleteFile = function(className, params, callback) {
  if (config.debug) { console.log('DataProxy.deleteFile', className, params);}
  this.service.ajax({url: Utils.getUrl(config.urls.data, className + '/' + params.id + '/file'), data: {field_name: params.field_name},
                    dataType: 'text', type: 'DELETE'}, function(err, result) {
                      if (err) { callback (err, null); }
                      else { callback (err, true); }
                    });
};

},{"../qbConfig":8,"../qbUtils":10}],5:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Location module
 *
 */

// Browserify exports and dependencies
module.exports = LocationProxy;
var config = require('../qbConfig');
var Utils = require('../qbUtils');

var geoFindUrl = config.urls.geodata + '/find';

function LocationProxy(service){
  this.service = service;
  this.geodata = new GeoProxy(service);
  this.places = new PlacesProxy(service);
  if (config.debug) { console.log("LocationProxy", service); }
}

function GeoProxy(service){
  this.service = service;
}

GeoProxy.prototype.create = function(params, callback){
  if (config.debug) { console.log('GeoProxy.create', {geo_data: params});}
  this.service.ajax({url: Utils.getUrl(config.urls.geodata), data: {geo_data: params}, type: 'POST'}, function(err,result){
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
  if (config.debug) { console.log('GeoProxy.create', params);}
  this.service.ajax({url: Utils.getUrl(config.urls.geodata, params.id), data: {geo_data:msg}, type: 'PUT'},
                   function(err,res){
                    if (err) { callback(err,null);}
                    else { callback(err, res.geo_datum);}
                   });
};

GeoProxy.prototype.get = function(id, callback){
  if (config.debug) { console.log('GeoProxy.get', id);}
  this.service.ajax({url: Utils.getUrl(config.urls.geodata, id)}, function(err,result){
     if (err) { callback (err, null); }
     else { callback(null, result.geo_datum); }
  });
};

GeoProxy.prototype.list = function(params, callback){
  if (typeof params === 'function') {
    callback = params;
    params = undefined;
  }
  if (config.debug) { console.log('GeoProxy.find', params);}
  this.service.ajax({url: Utils.getUrl(geoFindUrl), data: params}, callback);
};

GeoProxy.prototype.delete = function(id, callback){
  if (config.debug) { console.log('GeoProxy.delete', id); }
  this.service.ajax({url: Utils.getUrl(config.urls.geodata, id), type: 'DELETE', dataType: 'text'},
                   function(err,res){
                    if (err) { callback(err, null);}
                    else { callback(null, true);}
                   });
};

GeoProxy.prototype.purge = function(days, callback){
  if (config.debug) { console.log('GeoProxy.purge', days); }
  this.service.ajax({url: Utils.getUrl(config.urls.geodata), data: {days: days}, type: 'DELETE', dataType: 'text'},
                   function(err, res){
                    if (err) { callback(err, null);}
                    else { callback(null, true);}
                   });
};

function PlacesProxy(service) {
  this.service = service;
}

PlacesProxy.prototype.list = function(params, callback){
  if (config.debug) { console.log('PlacesProxy.list', params);}
  this.service.ajax({url: Utils.getUrl(config.urls.places)}, callback);
};

PlacesProxy.prototype.create = function(params, callback){
  if (config.debug) { console.log('PlacesProxy.create', params);}
  this.service.ajax({url: Utils.getUrl(config.urls.places), data: {place:params}, type: 'POST'}, callback);
};

PlacesProxy.prototype.get = function(id, callback){
  if (config.debug) { console.log('PlacesProxy.get', id);}
  this.service.ajax({url: Utils.getUrl(config.urls.places, id)}, callback);
};

PlacesProxy.prototype.update = function(place, callback){
  if (config.debug) { console.log('PlacesProxy.update', place);}
  this.service.ajax({url: Utils.getUrl(config.urls.places, place.id), data: {place: place}, type: 'PUT'} , callback);
};

PlacesProxy.prototype.delete = function(id, callback){
  if (config.debug) { console.log('PlacesProxy.delete', id);}
  this.service.ajax({url: Utils.getUrl(config.urls.places, id), type: 'DELETE', dataType: 'text'}, callback);
};

},{"../qbConfig":8,"../qbUtils":10}],6:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Messages Module
 *
 */

// broserify export and dependencies

// Browserify exports and dependencies
module.exports = MessagesProxy;
var config = require('../qbConfig');
var Utils = require('../qbUtils');

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
  if (config.debug) { console.log('TokensProxy.create', message);}
  this.service.ajax({url: Utils.getUrl(config.urls.pushtokens), type: 'POST', data: message},
                    function(err, data){
                      if (err) { callback(err, null);}
                      else { callback(null, data.push_token); }
                    });
};

TokensProxy.prototype.delete = function(id, callback) {
  if (config.debug) { console.log('MessageProxy.deletePushToken', id); }
  this.service.ajax({url: Utils.getUrl(config.urls.pushtokens, id), type: 'DELETE', dataType:'text'}, 
                    function (err, res) {
                      if (err) {callback(err, null);}
                      else {callback(null, true);}
                      });
};

// Subscriptions

function SubscriptionsProxy(service){
  this.service = service;
}

SubscriptionsProxy.prototype.create = function(params, callback) {
  if (config.debug) { console.log('MessageProxy.createSubscription', params); }
  this.service.ajax({url: Utils.getUrl(config.urls.subscriptions), type: 'POST', data: params}, callback);
};

SubscriptionsProxy.prototype.list = function(callback) {
  if (config.debug) { console.log('MessageProxy.listSubscription'); }
  this.service.ajax({url: Utils.getUrl(config.urls.subscriptions)}, callback);
};

SubscriptionsProxy.prototype.delete = function(id, callback) {
  if (config.debug) { console.log('MessageProxy.deleteSubscription', id); }
  this.service.ajax({url: Utils.getUrl(config.urls.subscriptions, id), type: 'DELETE', dataType:'text'}, 
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
  if (config.debug) { console.log('MessageProxy.createEvent', params); }
  var message = {event: params};
  this.service.ajax({url: Utils.getUrl(config.urls.events), type: 'POST', data: message}, callback);
};

EventsProxy.prototype.list = function(callback) {
 if (config.debug) { console.log('MessageProxy.listEvents'); }
  this.service.ajax({url: Utils.getUrl(config.urls.events)}, callback);
};

EventsProxy.prototype.get = function(id, callback) {
  if (config.debug) { console.log('MessageProxy.getEvents', id); }
  this.service.ajax({url: Utils.getUrl(config.urls.events, id)}, callback);
};

EventsProxy.prototype.update = function(params, callback) {
  if (config.debug) { console.log('MessageProxy.createEvent', params); }
  var message = {event: params};
  this.service.ajax({url: Utils.getUrl(config.urls.events, params.id), type: 'PUT', data: message}, callback);
};

EventsProxy.prototype.delete = function(id, callback) {
  if (config.debug) { console.log('MessageProxy.deleteEvent', id); }
  this.service.ajax({url: Utils.getUrl(config.urls.events, id), type: 'DELETE'}, callback);
};

},{"../qbConfig":8,"../qbUtils":10}],7:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Users Module
 *
 */

// Browserify exports and dependencies
module.exports = UsersProxy;
var config = require('../qbConfig');
var Utils = require('../qbUtils');

var DATE_FIELDS = ['created_at', 'updated_at', 'last_request_at'];
var NUMBER_FIELDS = ['id', 'external_user_id'];

var resetPasswordUrl = config.urls.users + '/password/reset';

function UsersProxy(service) {
  this.service = service;
}

UsersProxy.prototype.listUsers = function(params, callback) {
  var message = {}, filters = [], item;
  
  if (typeof params === 'function' && typeof callback === 'undefined') {
    callback = params;
    params = {};
  }
  
  if (params.filter) {
    if (params.filter instanceof Array) {
      params.filter.forEach(function(el) {
        item = generateFilter(el);
        filters.push(item);
      });
    } else {
      item = generateFilter(params.filter);
      filters.push(item);
    }
    message.filter = filters;
  }
  if (params.order) {
    message.order = generateOrder(params.order);
  }
  if (params.page) {
    message.page = params.page;
  }
  if (params.per_page) {
    message.per_page = params.per_page;
  }
  
  if (config.debug) { console.log('UsersProxy.listUsers', message); }
  this.service.ajax({url: Utils.getUrl(config.urls.users), data: message}, callback);
};

UsersProxy.prototype.get = function(params, callback) {
  var url;
  
  if (typeof params === 'number') {
    url = params;
    params = {};
  } else {
    if (params.login) {
      url = 'by_login';
    } else if (params.full_name) {
      url = 'by_full_name';
    } else if (params.facebook_id) {
      url = 'by_facebook_id';
    } else if (params.twitter_id) {
      url = 'by_twitter_id';
    } else if (params.email) {
      url = 'by_email';
    } else if (params.tags) {
      url = 'by_tags';
    } else if (params.external) {
      url = 'external/' + params.external;
      params = {};
    }
  }
  
  if (config.debug) { console.log('UsersProxy.get', params); }
  this.service.ajax({url: Utils.getUrl(config.urls.users, url), data: params},
                    function(err, res) {
                      if (err) { callback(err, null); }
                      else { callback(null, res.user || res); }
                    });
};

UsersProxy.prototype.create = function(params, callback) {
  if (config.debug) { console.log('UsersProxy.create', params); }
  this.service.ajax({url: Utils.getUrl(config.urls.users), type: 'POST', data: {user: params}},
                    function(err, res) {
                      if (err) { callback(err, null); }
                      else { callback(null, res.user); }
                    });
};

UsersProxy.prototype.update = function(id, params, callback) {
  if (config.debug) { console.log('UsersProxy.update', id, params); }
  this.service.ajax({url: Utils.getUrl(config.urls.users, id), type: 'PUT', data: {user: params}},
                    function(err, res) {
                      if (err) { callback(err, null); }
                      else { callback(null, res.user); }
                    });
};

UsersProxy.prototype.delete = function(params, callback) {
  var url;
  
  if (typeof params === 'number') {
    url = params;
  } else {
    if (params.external) {
      url = 'external/' + params.external;
    }
  }
  
  if (config.debug) { console.log('UsersProxy.delete', url); }
  this.service.ajax({url: Utils.getUrl(config.urls.users, url), type: 'DELETE', dataType: 'text'}, callback);
};

UsersProxy.prototype.resetPassword = function(email, callback) {
  if (config.debug) { console.log('UsersProxy.resetPassword', email); }
  this.service.ajax({url: Utils.getUrl(resetPasswordUrl), data: {email: email}}, callback);
};


/* Private
---------------------------------------------------------------------- */
function generateFilter(obj) {
  var type = obj.field in DATE_FIELDS ? 'date' : typeof obj.value;
  
  if (obj.value instanceof Array) {
    if (type == 'object') {
      type = typeof obj.value[0];
    }
    obj.value = obj.value.toString();
  }
  
  return [type, obj.field, obj.param, obj.value].join(' ');
}

function generateOrder(obj) {
  var type = obj.field in DATE_FIELDS ? 'date' : obj.field in NUMBER_FIELDS ? 'number' : 'string';
  return [obj.sort, type, obj.field].join(' ');
}

},{"../qbConfig":8,"../qbUtils":10}],8:[function(require,module,exports){
/* 
 * QuickBlox JavaScript SDK
 *
 * Configuration Module
 *
 */

var config = {
  version: '1.3.7',
  creds: {
    appId: '',
    authKey: '',
    authSecret: ''
  },
  endpoints: {
    api: 'api.quickblox.com',
    chat: 'chat.quickblox.com',
    muc: 'muc.chat.quickblox.com',
    turn: 'turnserver.quickblox.com',
    s3Bucket: 'qbprod'
  },
  chatProtocol: {
    //bosh: 'http://chat.quickblox.com:8080',
    bosh: 'https://chat.quickblox.com:8081', // With SSL
    websocket: 'ws://chat.quickblox.com:5290',
    active: 1
  },
  urls: {
    session: 'session',
    login: 'login',
    users: 'users',
    chat: 'chat',
    blobs: 'blobs',
    geodata: 'geodata',
    places: 'places',
    pushtokens: 'push_tokens',
    subscriptions: 'subscriptions',
    events: 'events',
    data: 'data',
    type: '.json'
  },
  ssl: true,
  debug: false
};

// Browserify exports
module.exports = config;

},{}],9:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Proxy Module
 *
 */

// Browserify exports and dependencies
module.exports = ServiceProxy;
var config = require('./qbConfig');

// For server-side applications through using npm package 'quickblox' you should include the following block
/*var jsdom = require('jsdom');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var jQuery = require('jquery/dist/jquery.min')(jsdom.jsdom().createWindow());
jQuery.support.cors = true;
jQuery.ajaxSettings.xhr = function() {
  return new XMLHttpRequest;
};*/

function ServiceProxy() {
  this.qbInst = {
    config: config,
    session: null
  };
  if (config.debug) { console.log("ServiceProxy", this.qbInst); }
}

ServiceProxy.prototype.setSession = function(session) {
  this.qbInst.session = session;
};

ServiceProxy.prototype.getSession = function() {
  return this.qbInst.session;
};

ServiceProxy.prototype.ajax = function(params, callback) {
  if (config.debug) { console.log('ServiceProxy', params.type || 'GET', params); }
  var _this = this;
  var ajaxCall = {
    url: params.url,
    type: params.type || 'GET',
    dataType: params.dataType || 'json',
    data: params.data || ' ',
    beforeSend: function(jqXHR, settings) {
      if (config.debug) { console.log('ServiceProxy.ajax beforeSend', jqXHR, settings); }
      if (settings.url.indexOf('://' + config.endpoints.s3Bucket) === -1) {
        console.log('setting headers on request to ' + settings.url);
        if (_this.qbInst.session && _this.qbInst.session.token) {
          jqXHR.setRequestHeader('QB-Token', _this.qbInst.session.token);
        }
      }
    },
    success: function(data, status, jqHXR) {
      if (config.debug) { console.log('ServiceProxy.ajax success', data); }
      callback(null, data);
    },
    error: function(jqHXR, status, error) {
      if (config.debug) { console.log('ServiceProxy.ajax error', jqHXR.status, error, jqHXR.responseText); }
      var errorMsg = {
        code: jqHXR.status,
        status: status,
        message: error,
        detail: jqHXR.responseText
      };
      callback(errorMsg, null);
    }
  };
  
  // Optional - for example 'multipart/form-data' when sending a file.
  // Default is 'application/x-www-form-urlencoded; charset=UTF-8'
  if (typeof params.contentType === 'boolean' || typeof params.contentType === 'string') { ajaxCall.contentType = params.contentType; }
  if (typeof params.processData === 'boolean') { ajaxCall.processData = params.processData; }

  jQuery.ajax( ajaxCall );
};

},{"./qbConfig":8}],10:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * QuickBlox Utilities
 *
 */

// Browserify exports and dependencies
var config = require('./qbConfig');

exports.randomNonce = function() {
  return Math.floor(Math.random() * 10000);
};

exports.unixTime = function() {
  return Math.floor(Date.now() / 1000);
};

exports.getUrl = function(base, id) {
  var protocol = config.ssl ? 'https://' : 'http://';
  var resource = id ? '/' + id : '';
  return protocol + config.endpoints.api + '/' + base + resource + config.urls.type;
};

},{"./qbConfig":8}],11:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Main SDK Module
 *
 * Provides a window scoped variable (QB) for use in browsers.
 * Also exports QuickBlox for using with node.js, browserify, etc. 
 *
 */

// Browserify dependencies
var config = require('./qbConfig');
var Proxy = require('./qbProxy');

var Auth = require('./modules/qbAuth');
var Users = require('./modules/qbUsers');
var Chat = require('./modules/qbChat');
var Content = require('./modules/qbContent');
var Location = require('./modules/qbLocation');
var Messages = require('./modules/qbMessages');
var Data = require('./modules/qbData');

// Creating a window scoped QB instance
if (typeof window !== 'undefined' && typeof window.QB === 'undefined') {
  window.QB = new QuickBlox();
}

// Actual QuickBlox API starts here
function QuickBlox() {}

QuickBlox.prototype.init = function(appId, authKey, authSecret, debug) {
  this.service = new Proxy();
  this.auth = new Auth(this.service);
  this.users = new Users(this.service);
  this.chat = new Chat(this.service);
  this.content = new Content(this.service);
  this.location = new Location(this.service);
  this.messages = new Messages(this.service);
  this.data = new Data(this.service);
  
  // Initialization by outside token
  if (typeof appId === 'string' && !authKey && !authSecret) {
    this.service.setSession({ token: appId });
    appId = '';
  }
  
  config.creds.appId = appId;
  config.creds.authKey = authKey;
  config.creds.authSecret = authSecret;
  if (debug) {
    config.debug = debug;
    console.log('QuickBlox.init', this);
  }
};

QuickBlox.prototype.createSession = function(params, callback) {
  this.auth.createSession(params, callback);
};

QuickBlox.prototype.destroySession = function(callback) {
  this.auth.destroySession(callback);
};

QuickBlox.prototype.login = function(params, callback) {
  this.auth.login(params, callback);
};

QuickBlox.prototype.logout = function(callback) {
  this.auth.logout(callback);
};

// Browserify exports
module.exports = (typeof window === 'undefined') ? new QuickBlox() : QuickBlox;

},{"./modules/qbAuth":1,"./modules/qbChat":2,"./modules/qbContent":3,"./modules/qbData":4,"./modules/qbLocation":5,"./modules/qbMessages":6,"./modules/qbUsers":7,"./qbConfig":8,"./qbProxy":9}],12:[function(require,module,exports){
// Browserify exports start
module.exports=function(){function b(a){return n(f(l(a),a.length*8))}function c(a){return m(f(l(a),a.length*8))}function d(a,b){return n(i(a,b))}function e(a,b){return m(i(a,b))}function f(a,b){a[b>>5]|=128<<24-b%32,a[(b+64>>9<<4)+15]=b;var c=new Array(80),d=1732584193,e=-271733879,f=-1732584194,i=271733878,l=-1009589776,m,n,o,p,q,r,s,t;for(m=0;m<a.length;m+=16){p=d,q=e,r=f,s=i,t=l;for(n=0;n<80;n++)n<16?c[n]=a[m+n]:c[n]=k(c[n-3]^c[n-8]^c[n-14]^c[n-16],1),o=j(j(k(d,5),g(n,e,f,i)),j(j(l,c[n]),h(n))),l=i,i=f,f=k(e,30),e=d,d=o;d=j(d,p),e=j(e,q),f=j(f,r),i=j(i,s),l=j(l,t)}return[d,e,f,i,l]}function g(a,b,c,d){return a<20?b&c|~b&d:a<40?b^c^d:a<60?b&c|b&d|c&d:b^c^d}function h(a){return a<20?1518500249:a<40?1859775393:a<60?-1894007588:-899497514}function i(a,b){var c=l(a);c.length>16&&(c=f(c,a.length*8));var d=new Array(16),e=new Array(16);for(var g=0;g<16;g++)d[g]=c[g]^909522486,e[g]=c[g]^1549556828;var h=f(d.concat(l(b)),512+b.length*8);return f(e.concat(h),672)}function j(a,b){var c=(a&65535)+(b&65535),d=(a>>16)+(b>>16)+(c>>16);return d<<16|c&65535}function k(a,b){return a<<b|a>>>32-b}function l(a){var b=[],c=255;for(var d=0;d<a.length*8;d+=8)b[d>>5]|=(a.charCodeAt(d/8)&c)<<24-d%32;return b}function m(a){var b="",c=255;for(var d=0;d<a.length*32;d+=8)b+=String.fromCharCode(a[d>>5]>>>24-d%32&c);return b}function n(a){var b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",c="",d,e;for(var f=0;f<a.length*4;f+=3){d=(a[f>>2]>>8*(3-f%4)&255)<<16|(a[f+1>>2]>>8*(3-(f+1)%4)&255)<<8|a[f+2>>2]>>8*(3-(f+2)%4)&255;for(e=0;e<4;e++)f*8+e*6>a.length*32?c+="=":c+=b.charAt(d>>6*(3-e)&63)}return c}var a=function(){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",b={encode:function(b){var c="",d,e,f,g,h,i,j,k=0;do d=b.charCodeAt(k++),e=b.charCodeAt(k++),f=b.charCodeAt(k++),g=d>>2,h=(d&3)<<4|e>>4,i=(e&15)<<2|f>>6,j=f&63,isNaN(e)?i=j=64:isNaN(f)&&(j=64),c=c+a.charAt(g)+a.charAt(h)+a.charAt(i)+a.charAt(j);while(k<b.length);return c},decode:function(b){var c="",d,e,f,g,h,i,j,k=0;b=b.replace(/[^A-Za-z0-9\+\/\=]/g,"");do g=a.indexOf(b.charAt(k++)),h=a.indexOf(b.charAt(k++)),i=a.indexOf(b.charAt(k++)),j=a.indexOf(b.charAt(k++)),d=g<<2|h>>4,e=(h&15)<<4|i>>2,f=(i&3)<<6|j,c+=String.fromCharCode(d),i!=64&&(c+=String.fromCharCode(e)),j!=64&&(c+=String.fromCharCode(f));while(k<b.length);return c}};return b}(),o=function(){var a=function(a,b){var c=(a&65535)+(b&65535),d=(a>>16)+(b>>16)+(c>>16);return d<<16|c&65535},b=function(a,b){return a<<b|a>>>32-b},c=function(a){var b=[];for(var c=0;c<a.length*8;c+=8)b[c>>5]|=(a.charCodeAt(c/8)&255)<<c%32;return b},d=function(a){var b="";for(var c=0;c<a.length*32;c+=8)b+=String.fromCharCode(a[c>>5]>>>c%32&255);return b},e=function(a){var b="0123456789abcdef",c="";for(var d=0;d<a.length*4;d++)c+=b.charAt(a[d>>2]>>d%4*8+4&15)+b.charAt(a[d>>2]>>d%4*8&15);return c},f=function(c,d,e,f,g,h){return a(b(a(a(d,c),a(f,h)),g),e)},g=function(a,b,c,d,e,g,h){return f(b&c|~b&d,a,b,e,g,h)},h=function(a,b,c,d,e,g,h){return f(b&d|c&~d,a,b,e,g,h)},i=function(a,b,c,d,e,g,h){return f(b^c^d,a,b,e,g,h)},j=function(a,b,c,d,e,g,h){return f(c^(b|~d),a,b,e,g,h)},k=function(b,c){b[c>>5]|=128<<c%32,b[(c+64>>>9<<4)+14]=c;var d=1732584193,e=-271733879,f=-1732584194,k=271733878,l,m,n,o;for(var p=0;p<b.length;p+=16)l=d,m=e,n=f,o=k,d=g(d,e,f,k,b[p+0],7,-680876936),k=g(k,d,e,f,b[p+1],12,-389564586),f=g(f,k,d,e,b[p+2],17,606105819),e=g(e,f,k,d,b[p+3],22,-1044525330),d=g(d,e,f,k,b[p+4],7,-176418897),k=g(k,d,e,f,b[p+5],12,1200080426),f=g(f,k,d,e,b[p+6],17,-1473231341),e=g(e,f,k,d,b[p+7],22,-45705983),d=g(d,e,f,k,b[p+8],7,1770035416),k=g(k,d,e,f,b[p+9],12,-1958414417),f=g(f,k,d,e,b[p+10],17,-42063),e=g(e,f,k,d,b[p+11],22,-1990404162),d=g(d,e,f,k,b[p+12],7,1804603682),k=g(k,d,e,f,b[p+13],12,-40341101),f=g(f,k,d,e,b[p+14],17,-1502002290),e=g(e,f,k,d,b[p+15],22,1236535329),d=h(d,e,f,k,b[p+1],5,-165796510),k=h(k,d,e,f,b[p+6],9,-1069501632),f=h(f,k,d,e,b[p+11],14,643717713),e=h(e,f,k,d,b[p+0],20,-373897302),d=h(d,e,f,k,b[p+5],5,-701558691),k=h(k,d,e,f,b[p+10],9,38016083),f=h(f,k,d,e,b[p+15],14,-660478335),e=h(e,f,k,d,b[p+4],20,-405537848),d=h(d,e,f,k,b[p+9],5,568446438),k=h(k,d,e,f,b[p+14],9,-1019803690),f=h(f,k,d,e,b[p+3],14,-187363961),e=h(e,f,k,d,b[p+8],20,1163531501),d=h(d,e,f,k,b[p+13],5,-1444681467),k=h(k,d,e,f,b[p+2],9,-51403784),f=h(f,k,d,e,b[p+7],14,1735328473),e=h(e,f,k,d,b[p+12],20,-1926607734),d=i(d,e,f,k,b[p+5],4,-378558),k=i(k,d,e,f,b[p+8],11,-2022574463),f=i(f,k,d,e,b[p+11],16,1839030562),e=i(e,f,k,d,b[p+14],23,-35309556),d=i(d,e,f,k,b[p+1],4,-1530992060),k=i(k,d,e,f,b[p+4],11,1272893353),f=i(f,k,d,e,b[p+7],16,-155497632),e=i(e,f,k,d,b[p+10],23,-1094730640),d=i(d,e,f,k,b[p+13],4,681279174),k=i(k,d,e,f,b[p+0],11,-358537222),f=i(f,k,d,e,b[p+3],16,-722521979),e=i(e,f,k,d,b[p+6],23,76029189),d=i(d,e,f,k,b[p+9],4,-640364487),k=i(k,d,e,f,b[p+12],11,-421815835),f=i(f,k,d,e,b[p+15],16,530742520),e=i(e,f,k,d,b[p+2],23,-995338651),d=j(d,e,f,k,b[p+0],6,-198630844),k=j(k,d,e,f,b[p+7],10,1126891415),f=j(f,k,d,e,b[p+14],15,-1416354905),e=j(e,f,k,d,b[p+5],21,-57434055),d=j(d,e,f,k,b[p+12],6,1700485571),k=j(k,d,e,f,b[p+3],10,-1894986606),f=j(f,k,d,e,b[p+10],15,-1051523),e=j(e,f,k,d,b[p+1],21,-2054922799),d=j(d,e,f,k,b[p+8],6,1873313359),k=j(k,d,e,f,b[p+15],10,-30611744),f=j(f,k,d,e,b[p+6],15,-1560198380),e=j(e,f,k,d,b[p+13],21,1309151649),d=j(d,e,f,k,b[p+4],6,-145523070),k=j(k,d,e,f,b[p+11],10,-1120210379),f=j(f,k,d,e,b[p+2],15,718787259),e=j(e,f,k,d,b[p+9],21,-343485551),d=a(d,l),e=a(e,m),f=a(f,n),k=a(k,o);return[d,e,f,k]},l={hexdigest:function(a){return e(k(c(a),a.length*8))},hash:function(a){return d(k(c(a),a.length*8))}};return l}();Function.prototype.bind||(Function.prototype.bind=function(a){var b=this,c=Array.prototype.slice,d=Array.prototype.concat,e=c.call(arguments,1);return function(){return b.apply(a?a:this,d.call(e,c.call(arguments,0)))}}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a){var b=this.length,c=Number(arguments[1])||0;c=c<0?Math.ceil(c):Math.floor(c),c<0&&(c+=b);for(;c<b;c++)if(c in this&&this[c]===a)return c;return-1}),function(b){function g(a,b){return new f.Builder(a,b)}function h(a){return new f.Builder("message",a)}function j(a){return new f.Builder("iq",a)}function k(a){return new f.Builder("presence",a)}var f;f={VERSION:"1.1.3",NS:{HTTPBIND:"http://jabber.org/protocol/httpbind",BOSH:"urn:xmpp:xbosh",CLIENT:"jabber:client",AUTH:"jabber:iq:auth",ROSTER:"jabber:iq:roster",PROFILE:"jabber:iq:profile",DISCO_INFO:"http://jabber.org/protocol/disco#info",DISCO_ITEMS:"http://jabber.org/protocol/disco#items",MUC:"http://jabber.org/protocol/muc",SASL:"urn:ietf:params:xml:ns:xmpp-sasl",STREAM:"http://etherx.jabber.org/streams",BIND:"urn:ietf:params:xml:ns:xmpp-bind",SESSION:"urn:ietf:params:xml:ns:xmpp-session",VERSION:"jabber:iq:version",STANZAS:"urn:ietf:params:xml:ns:xmpp-stanzas",XHTML_IM:"http://jabber.org/protocol/xhtml-im",XHTML:"http://www.w3.org/1999/xhtml"},XHTML:{tags:["a","blockquote","br","cite","em","img","li","ol","p","span","strong","ul","body"],attributes:{a:["href"],blockquote:["style"],br:[],cite:["style"],em:[],img:["src","alt","style","height","width"],li:["style"],ol:["style"],p:["style"],span:["style"],strong:[],ul:["style"],body:[]},css:["background-color","color","font-family","font-size","font-style","font-weight","margin-left","margin-right","text-align","text-decoration"],validTag:function(a){for(var b=0;b<f.XHTML.tags.length;b++)if(a==f.XHTML.tags[b])return!0;return!1},validAttribute:function(a,b){if(typeof f.XHTML.attributes[a]!="undefined"&&f.XHTML.attributes[a].length>0)for(var c=0;c<f.XHTML.attributes[a].length;c++)if(b==f.XHTML.attributes[a][c])return!0;return!1},validCSS:function(a){for(var b=0;b<f.XHTML.css.length;b++)if(a==f.XHTML.css[b])return!0;return!1}},Status:{ERROR:0,CONNECTING:1,CONNFAIL:2,AUTHENTICATING:3,AUTHFAIL:4,CONNECTED:5,DISCONNECTED:6,DISCONNECTING:7,ATTACHED:8},LogLevel:{DEBUG:0,INFO:1,WARN:2,ERROR:3,FATAL:4},ElementType:{NORMAL:1,TEXT:3,CDATA:4,FRAGMENT:11},TIMEOUT:1.1,SECONDARY_TIMEOUT:.1,addNamespace:function(a,b){f.NS[a]=b},forEachChild:function(a,b,c){var d,e;for(d=0;d<a.childNodes.length;d++)e=a.childNodes[d],e.nodeType==f.ElementType.NORMAL&&(!b||this.isTagEqual(e,b))&&c(e)},isTagEqual:function(a,b){return a.tagName.toLowerCase()==b.toLowerCase()},_xmlGenerator:null,_makeGenerator:function(){var a;return document.implementation.createDocument===undefined||document.implementation.createDocument&&document.documentMode&&document.documentMode<10?(a=this._getIEXmlDom(),a.appendChild(a.createElement("strophe"))):a=document.implementation.createDocument("jabber:client","strophe",null),a},xmlGenerator:function(){return f._xmlGenerator||(f._xmlGenerator=f._makeGenerator()),f._xmlGenerator},_getIEXmlDom:function(){var a=null,b=["Msxml2.DOMDocument.6.0","Msxml2.DOMDocument.5.0","Msxml2.DOMDocument.4.0","MSXML2.DOMDocument.3.0","MSXML2.DOMDocument","MSXML.DOMDocument","Microsoft.XMLDOM"];for(var c=0;c<b.length;c++){if(a!==null)break;try{a=new ActiveXObject(b[c])}catch(d){a=null}}return a},xmlElement:function(a){if(!a)return null;var b=f.xmlGenerator().createElement(a),c,d,e;for(c=1;c<arguments.length;c++){if(!arguments[c])continue;if(typeof arguments[c]=="string"||typeof arguments[c]=="number")b.appendChild(f.xmlTextNode(arguments[c]));else if(typeof arguments[c]=="object"&&typeof arguments[c].sort=="function")for(d=0;d<arguments[c].length;d++)typeof arguments[c][d]=="object"&&typeof arguments[c][d].sort=="function"&&b.setAttribute(arguments[c][d][0],arguments[c][d][1]);else if(typeof arguments[c]=="object")for(e in arguments[c])arguments[c].hasOwnProperty(e)&&b.setAttribute(e,arguments[c][e])}return b},xmlescape:function(a){return a=a.replace(/\&/g,"&amp;"),a=a.replace(/</g,"&lt;"),a=a.replace(/>/g,"&gt;"),a=a.replace(/'/g,"&apos;"),a=a.replace(/"/g,"&quot;"),a},xmlunescape:function(a){return a=a.replace(/\&amp;/g,"&"),a=a.replace(/&lt;/g,"<"),a=a.replace(/&gt;/g,">"),a=a.replace(/&apos;/g,"'"),a=a.replace(/&quot;/g,'"'),a},xmlTextNode:function(a){return f.xmlGenerator().createTextNode(a)},xmlHtmlNode:function(a){var b;if(window.DOMParser){var c=new DOMParser;b=c.parseFromString(a,"text/xml")}else b=new ActiveXObject("Microsoft.XMLDOM"),b.async="false",b.loadXML(a);return b},getText:function(a){if(!a)return null;var b="";a.childNodes.length===0&&a.nodeType==f.ElementType.TEXT&&(b+=a.nodeValue);for(var c=0;c<a.childNodes.length;c++)a.childNodes[c].nodeType==f.ElementType.TEXT&&(b+=a.childNodes[c].nodeValue);return f.xmlescape(b)},copyElement:function(a){var b,c;if(a.nodeType==f.ElementType.NORMAL){c=f.xmlElement(a.tagName);for(b=0;b<a.attributes.length;b++)c.setAttribute(a.attributes[b].nodeName.toLowerCase(),a.attributes[b].value);for(b=0;b<a.childNodes.length;b++)c.appendChild(f.copyElement(a.childNodes[b]))}else a.nodeType==f.ElementType.TEXT&&(c=f.xmlGenerator().createTextNode(a.nodeValue));return c},createHtml:function(a){var b,c,d,e,g,h,i,j,k,l,m;if(a.nodeType==f.ElementType.NORMAL){e=a.nodeName.toLowerCase();if(f.XHTML.validTag(e))try{c=f.xmlElement(e);for(b=0;b<f.XHTML.attributes[e].length;b++){g=f.XHTML.attributes[e][b],h=a.getAttribute(g);if(typeof h=="undefined"||h===null||h===""||h===!1||h===0)continue;g=="style"&&typeof h=="object"&&typeof h.cssText!="undefined"&&(h=h.cssText);if(g=="style"){i=[],j=h.split(";");for(d=0;d<j.length;d++)k=j[d].split(":"),l=k[0].replace(/^\s*/,"").replace(/\s*$/,"").toLowerCase(),f.XHTML.validCSS(l)&&(m=k[1].replace(/^\s*/,"").replace(/\s*$/,""),i.push(l+": "+m));i.length>0&&(h=i.join("; "),c.setAttribute(g,h))}else c.setAttribute(g,h)}for(b=0;b<a.childNodes.length;b++)c.appendChild(f.createHtml(a.childNodes[b]))}catch(n){c=f.xmlTextNode("")}else{c=f.xmlGenerator().createDocumentFragment();for(b=0;b<a.childNodes.length;b++)c.appendChild(f.createHtml(a.childNodes[b]))}}else if(a.nodeType==f.ElementType.FRAGMENT){c=f.xmlGenerator().createDocumentFragment();for(b=0;b<a.childNodes.length;b++)c.appendChild(f.createHtml(a.childNodes[b]))}else a.nodeType==f.ElementType.TEXT&&(c=f.xmlTextNode(a.nodeValue));return c},escapeNode:function(a){return a.replace(/^\s+|\s+$/g,"").replace(/\\/g,"\\5c").replace(/ /g,"\\20").replace(/\"/g,"\\22").replace(/\&/g,"\\26").replace(/\'/g,"\\27").replace(/\//g,"\\2f").replace(/:/g,"\\3a").replace(/</g,"\\3c").replace(/>/g,"\\3e").replace(/@/g,"\\40")},unescapeNode:function(a){return a.replace(/\\20/g," ").replace(/\\22/g,'"').replace(/\\26/g,"&").replace(/\\27/g,"'").replace(/\\2f/g,"/").replace(/\\3a/g,":").replace(/\\3c/g,"<").replace(/\\3e/g,">").replace(/\\40/g,"@").replace(/\\5c/g,"\\")},getNodeFromJid:function(a){return a.indexOf("@")<0?null:a.split("@")[0]},getDomainFromJid:function(a){var b=f.getBareJidFromJid(a);if(b.indexOf("@")<0)return b;var c=b.split("@");return c.splice(0,1),c.join("@")},getResourceFromJid:function(a){var b=a.split("/");return b.length<2?null:(b.splice(0,1),b.join("/"))},getBareJidFromJid:function(a){return a?a.split("/")[0]:null},log:function(a,b){return},debug:function(a){this.log(this.LogLevel.DEBUG,a)},info:function(a){this.log(this.LogLevel.INFO,a)},warn:function(a){this.log(this.LogLevel.WARN,a)},error:function(a){this.log(this.LogLevel.ERROR,a)},fatal:function(a){this.log(this.LogLevel.FATAL,a)},serialize:function(a){var b;if(!a)return null;typeof a.tree=="function"&&(a=a.tree());var c=a.nodeName,d,e;a.getAttribute("_realname")&&(c=a.getAttribute("_realname")),b="<"+c;for(d=0;d<a.attributes.length;d++)a.attributes[d].nodeName!="_realname"&&(b+=" "+a.attributes[d].nodeName.toLowerCase()+"='"+a.attributes[d].value.replace(/&/g,"&amp;").replace(/\'/g,"&apos;").replace(/>/g,"&gt;").replace(/</g,"&lt;")+"'");if(a.childNodes.length>0){b+=">";for(d=0;d<a.childNodes.length;d++){e=a.childNodes[d];switch(e.nodeType){case f.ElementType.NORMAL:b+=f.serialize(e);break;case f.ElementType.TEXT:b+=f.xmlescape(e.nodeValue);break;case f.ElementType.CDATA:b+="<![CDATA["+e.nodeValue+"]]>"}}b+="</"+c+">"}else b+="/>";return b},_requestId:0,_connectionPlugins:{},addConnectionPlugin:function(a,b){f._connectionPlugins[a]=b}},f.Builder=function(a,b){if(a=="presence"||a=="message"||a=="iq")b&&!b.xmlns?b.xmlns=f.NS.CLIENT:b||(b={xmlns:f.NS.CLIENT});this.nodeTree=f.xmlElement(a,b),this.node=this.nodeTree},f.Builder.prototype={tree:function(){return this.nodeTree},toString:function(){return f.serialize(this.nodeTree)},up:function(){return this.node=this.node.parentNode,this},attrs:function(a){for(var b in a)a.hasOwnProperty(b)&&this.node.setAttribute(b,a[b]);return this},c:function(a,b,c){var d=f.xmlElement(a,b,c);return this.node.appendChild(d),c||(this.node=d),this},cnode:function(a){var b,c=f.xmlGenerator();try{b=c.importNode!==undefined}catch(d){b=!1}var e=b?c.importNode(a,!0):f.copyElement(a);return this.node.appendChild(e),this.node=e,this},t:function(a){var b=f.xmlTextNode(a);return this.node.appendChild(b),this},h:function(a){var b=document.createElement("body");b.innerHTML=a;var c=f.createHtml(b);while(c.childNodes.length>0)this.node.appendChild(c.childNodes[0]);return this}},f.Handler=function(a,b,c,d,e,g,h){this.handler=a,this.ns=b,this.name=c,this.type=d,this.id=e,this.options=h||{matchBare:!1},this.options.matchBare||(this.options.matchBare=!1),this.options.matchBare?this.from=g?f.getBareJidFromJid(g):null:this.from=g,this.user=!0},f.Handler.prototype={isMatch:function(a){var b,c=null;this.options.matchBare?c=f.getBareJidFromJid(a.getAttribute("from")):c=a.getAttribute("from"),b=!1;if(!this.ns)b=!0;else{var d=this;f.forEachChild(a,null,function(a){a.getAttribute("xmlns")==d.ns&&(b=!0)}),b=b||a.getAttribute("xmlns")==this.ns}return!b||!!this.name&&!f.isTagEqual(a,this.name)||!!this.type&&a.getAttribute("type")!=this.type||!!this.id&&a.getAttribute("id")!=this.id||!!this.from&&c!=this.from?!1:!0},run:function(a){var b=null;try{b=this.handler(a)}catch(c){throw c.sourceURL?f.fatal("error: "+this.handler+" "+c.sourceURL+":"+c.line+" - "+c.name+": "+c.message):c.fileName?(typeof console!="undefined"&&(console.trace(),console.error(this.handler," - error - ",c,c.message)),f.fatal("error: "+this.handler+" "+c.fileName+":"+c.lineNumber+" - "+c.name+": "+c.message)):f.fatal("error: "+c.message+"\n"+c.stack),c}return b},toString:function(){return"{Handler: "+this.handler+"("+this.name+","+this.id+","+this.ns+")}"}},f.TimedHandler=function(a,b){this.period=a,this.handler=b,this.lastCalled=(new Date).getTime(),this.user=!0},f.TimedHandler.prototype={run:function(){return this.lastCalled=(new Date).getTime(),this.handler()},reset:function(){this.lastCalled=(new Date).getTime()},toString:function(){return"{TimedHandler: "+this.handler+"("+this.period+")}"}},f.Connection=function(a,b){this.service=a,this.options=b||{};var c=this.options.protocol||"";a.indexOf("ws:")===0||a.indexOf("wss:")===0||c.indexOf("ws")===0?this._proto=new f.Websocket(this):this._proto=new f.Bosh(this),this.jid="",this.domain=null,this.features=null,this._sasl_data={},this.do_session=!1,this.do_bind=!1,this.timedHandlers=[],this.handlers=[],this.removeTimeds=[],this.removeHandlers=[],this.addTimeds=[],this.addHandlers=[],this._authentication={},this._idleTimeout=null,this._disconnectTimeout=null,this.do_authentication=!0,this.authenticated=!1,this.disconnecting=!1,this.connected=!1,this.errors=0,this.paused=!1,this._data=[],this._uniqueId=0,this._sasl_success_handler=null,this._sasl_failure_handler=null,this._sasl_challenge_handler=null,this.maxRetries=5,this._idleTimeout=setTimeout(this._onIdle.bind(this),100);for(var d in f._connectionPlugins)if(f._connectionPlugins.hasOwnProperty(d)){var e=f._connectionPlugins[d],g=function(){};g.prototype=e,this[d]=new g,this[d].init(this)}},f.Connection.prototype={reset:function(){this._proto._reset(),this.do_session=!1,this.do_bind=!1,this.timedHandlers=[],this.handlers=[],this.removeTimeds=[],this.removeHandlers=[],this.addTimeds=[],this.addHandlers=[],this._authentication={},this.authenticated=!1,this.disconnecting=!1,this.connected=!1,this.errors=0,this._requests=[],this._uniqueId=0},pause:function(){this.paused=!0},resume:function(){this.paused=!1},getUniqueId:function(a){return typeof a=="string"||typeof a=="number"?++this._uniqueId+":"+a:++this._uniqueId+""},connect:function(a,b,c,d,e,g){this.jid=a,this.authzid=f.getBareJidFromJid(this.jid),this.authcid=f.getNodeFromJid(this.jid),this.pass=b,this.servtype="xmpp",this.connect_callback=c,this.disconnecting=!1,this.connected=!1,this.authenticated=!1,this.errors=0,this.domain=f.getDomainFromJid(this.jid),this._changeConnectStatus(f.Status.CONNECTING,null),this._proto._connect(d,e,g)},attach:function(a,b,c,d,e,f,g){this._proto._attach(a,b,c,d,e,f,g)},xmlInput:function(a){return},xmlOutput:function(a){return},rawInput:function(a){return},rawOutput:function(a){return},send:function(a){if(a===null)return;if(typeof a.sort=="function")for(var b=0;b<a.length;b++)this._queueData(a[b]);else typeof a.tree=="function"?this._queueData(a.tree()):this._queueData(a);this._proto._send()},flush:function(){clearTimeout(this._idleTimeout),this._onIdle()},sendIQ:function(a,b,c,d){var e=null,f=this;typeof a.tree=="function"&&(a=a.tree());var g=a.getAttribute("id");g||(g=this.getUniqueId("sendIQ"),a.setAttribute("id",g));var h=this.addHandler(function(a){e&&f.deleteTimedHandler(e);var d=a.getAttribute("type");if(d=="result")b&&b(a);else{if(d!="error")throw{name:"StropheError",message:"Got bad IQ type of "+d};c&&c(a)}},null,"iq",null,g);return d&&(e=this.addTimedHandler(d,function(){return f.deleteHandler(h),c&&c(null),!1})),this.send(a),g},_queueData:function(a){if(a===null||!a.tagName||!a.childNodes)throw{name:"StropheError",message:"Cannot queue non-DOMElement."};this._data.push(a)},_sendRestart:function(){this._data.push("restart"),this._proto._sendRestart(),this._idleTimeout=setTimeout(this._onIdle.bind(this),100)},addTimedHandler:function(a,b){var c=new f.TimedHandler(a,b);return this.addTimeds.push(c),c},deleteTimedHandler:function(a){this.removeTimeds.push(a)},addHandler:function(a,b,c,d,e,g,h){var i=new f.Handler(a,b,c,d,e,g,h);return this.addHandlers.push(i),i},deleteHandler:function(a){this.removeHandlers.push(a)},disconnect:function(a){this._changeConnectStatus(f.Status.DISCONNECTING,a),f.info("Disconnect was called because: "+a);if(this.connected){var b=!1;this.disconnecting=!0,this.authenticated&&(b=k({xmlns:f.NS.CLIENT,type:"unavailable"})),this._disconnectTimeout=this._addSysTimedHandler(3e3,this._onDisconnectTimeout.bind(this)),this._proto._disconnect(b)}},_changeConnectStatus:function(a,b){for(var c in f._connectionPlugins)if(f._connectionPlugins.hasOwnProperty(c)){var d=this[c];if(d.statusChanged)try{d.statusChanged(a,b)}catch(e){f.error(""+c+" plugin caused an exception "+"changing status: "+e)}}if(this.connect_callback)try{this.connect_callback(a,b)}catch(g){f.error("User connection callback caused an exception: "+g)}},_doDisconnect:function(){this._disconnectTimeout!==null&&(this.deleteTimedHandler(this._disconnectTimeout),this._disconnectTimeout=null),f.info("_doDisconnect was called"),this._proto._doDisconnect(),this.authenticated=!1,this.disconnecting=!1,this.handlers=[],this.timedHandlers=[],this.removeTimeds=[],this.removeHandlers=[],this.addTimeds=[],this.addHandlers=[],this._changeConnectStatus(f.Status.DISCONNECTED,null),this.connected=!1},_dataRecv:function(a,b){f.info("_dataRecv called");var c=this._proto._reqToData(a);if(c===null)return;this.xmlInput!==f.Connection.prototype.xmlInput&&(c.nodeName===this._proto.strip&&c.childNodes.length?this.xmlInput(c.childNodes[0]):this.xmlInput(c)),this.rawInput!==f.Connection.prototype.rawInput&&(b?this.rawInput(b):this.rawInput(f.serialize(c)));var d,e;while(this.removeHandlers.length>0)e=this.removeHandlers.pop(),d=this.handlers.indexOf(e),d>=0&&this.handlers.splice(d,1);while(this.addHandlers.length>0)this.handlers.push(this.addHandlers.pop());if(this.disconnecting&&this._proto._emptyQueue()){this._doDisconnect();return}var g=c.getAttribute("type"),h,i;if(g!==null&&g=="terminate"){if(this.disconnecting)return;h=c.getAttribute("condition"),i=c.getElementsByTagName("conflict"),h!==null?(h=="remote-stream-error"&&i.length>0&&(h="conflict"),this._changeConnectStatus(f.Status.CONNFAIL,h)):this._changeConnectStatus(f.Status.CONNFAIL,"unknown"),this.disconnect("unknown stream-error");return}var j=this;f.forEachChild(c,null,function(a){var b,c;c=j.handlers,j.handlers=[];for(b=0;b<c.length;b++){var d=c[b];try{d.isMatch(a)&&(j.authenticated||!d.user)?d.run(a)&&j.handlers.push(d):j.handlers.push(d)}catch(e){f.warn("Removing Strophe handlers due to uncaught exception: "+e.message)}}})},mechanisms:{},_connect_cb:function(a,b,c){f.info("_connect_cb was called"),this.connected=!0;var d=this._proto._reqToData(a);if(!d)return;this.xmlInput!==f.Connection.prototype.xmlInput&&(d.nodeName===this._proto.strip&&d.childNodes.length?this.xmlInput(d.childNodes[0]):this.xmlInput(d)),this.rawInput!==f.Connection.prototype.rawInput&&(c?this.rawInput(c):this.rawInput(f.serialize(d)));var e=this._proto._connect_cb(d);if(e===f.Status.CONNFAIL)return;this._authentication.sasl_scram_sha1=!1,this._authentication.sasl_plain=!1,this._authentication.sasl_digest_md5=!1,this._authentication.sasl_anonymous=!1,this._authentication.legacy_auth=!1;var g=d.getElementsByTagName("stream:features").length>0;g||(g=d.getElementsByTagName("features").length>0);var h=d.getElementsByTagName("mechanism"),i=[],j,k,l=!1;if(!g){this._proto._no_auth_received(b);return}if(h.length>0)for(j=0;j<h.length;j++)k=f.getText(h[j]),this.mechanisms[k]&&i.push(this.mechanisms[k]);this._authentication.legacy_auth=d.getElementsByTagName("auth").length>0,l=this._authentication.legacy_auth||i.length>0;if(!l){this._proto._no_auth_received(b);return}this.do_authentication!==!1&&this.authenticate(i)},authenticate:function(b){var c;for(c=0;c<b.length-1;++c){var d=c;for(var e=c+1;e<b.length;++e)b[e].prototype.priority>b[d].prototype.priority&&(d=e);if(d!=c){var h=b[c];b[c]=b[d],b[d]=h}}var i=!1;for(c=0;c<b.length;++c){if(!b[c].test(this))continue;this._sasl_success_handler=this._addSysHandler(this._sasl_success_cb.bind(this),null,"success",null,null),this._sasl_failure_handler=this._addSysHandler(this._sasl_failure_cb.bind(this),null,"failure",null,null),this._sasl_challenge_handler=this._addSysHandler(this._sasl_challenge_cb.bind(this),null,"challenge",null,null),this._sasl_mechanism=new b[c],this._sasl_mechanism.onStart(this);var k=g("auth",{xmlns:f.NS.SASL,mechanism:this._sasl_mechanism.name});if(this._sasl_mechanism.isClientFirst){var l=this._sasl_mechanism.onChallenge(this,null);k.t(a.encode(l))}this.send(k.tree()),i=!0;break}i||(f.getNodeFromJid(this.jid)===null?(this._changeConnectStatus(f.Status.CONNFAIL,"x-strophe-bad-non-anon-jid"),this.disconnect("x-strophe-bad-non-anon-jid")):(this._changeConnectStatus(f.Status.AUTHENTICATING,null),this._addSysHandler(this._auth1_cb.bind(this),null,null,null,"_auth_1"),this.send(j({type:"get",to:this.domain,id:"_auth_1"}).c("query",{xmlns:f.NS.AUTH}).c("username",{}).t(f.getNodeFromJid(this.jid)).tree())))},_sasl_challenge_cb:function(b){var c=a.decode(f.getText(b)),d=this._sasl_mechanism.onChallenge(this,c),e=g("response",{xmlns:f.NS.SASL});return d!==""&&e.t(a.encode(d)),this.send(e.tree()),!0},_auth1_cb:function(a){var b=j({type:"set",id:"_auth_2"}).c("query",{xmlns:f.NS.AUTH}).c("username",{}).t(f.getNodeFromJid(this.jid)).up().c("password").t(this.pass);return f.getResourceFromJid(this.jid)||(this.jid=f.getBareJidFromJid(this.jid)+"/strophe"),b.up().c("resource",{}).t(f.getResourceFromJid(this.jid)),this._addSysHandler(this._auth2_cb.bind(this),null,null,null,"_auth_2"),this.send(b.tree()),!1},_sasl_success_cb:function(b){if(this._sasl_data["server-signature"]){var c,d=a.decode(f.getText(b)),e=/([a-z]+)=([^,]+)(,|$)/,g=d.match(e);g[1]=="v"&&(c=g[2]);if(c!=this._sasl_data["server-signature"])return this.deleteHandler(this._sasl_failure_handler),this._sasl_failure_handler=null,this._sasl_challenge_handler&&(this.deleteHandler(this._sasl_challenge_handler),this._sasl_challenge_handler=null),this._sasl_data={},this._sasl_failure_cb(null)}return f.info("SASL authentication succeeded."),this._sasl_mechanism&&this._sasl_mechanism.onSuccess(),this.deleteHandler(this._sasl_failure_handler),this._sasl_failure_handler=null,this._sasl_challenge_handler&&(this.deleteHandler(this._sasl_challenge_handler),this._sasl_challenge_handler=null),this._addSysHandler(this._sasl_auth1_cb.bind(this),null,"stream:features",null,null),this._sendRestart(),!1},_sasl_auth1_cb:function(a){this.features=a;var b,c;for(b=0;b<a.childNodes.length;b++)c=a.childNodes[b],c.nodeName=="bind"&&(this.do_bind=!0),c.nodeName=="session"&&(this.do_session=!0);if(!this.do_bind)return this._changeConnectStatus(f.Status.AUTHFAIL,null),!1;this._addSysHandler(this._sasl_bind_cb.bind(this),null,null,null,"_bind_auth_2");var d=f.getResourceFromJid(this.jid);return d?this.send(j({type:"set",id:"_bind_auth_2"}).c("bind",{xmlns:f.NS.BIND}).c("resource",{}).t(d).tree()):this.send(j({type:"set",id:"_bind_auth_2"}).c("bind",{xmlns:f.NS.BIND}).tree()),!1},_sasl_bind_cb:function(a){if(a.getAttribute("type")=="error"){f.info("SASL binding failed.");var b=a.getElementsByTagName("conflict"),c;return b.length>0&&(c="conflict"),this._changeConnectStatus(f.Status.AUTHFAIL,c),!1}var d=a.getElementsByTagName("bind"),e;if(!(d.length>0))return f.info("SASL binding failed."),this._changeConnectStatus(f.Status.AUTHFAIL,null),!1;e=d[0].getElementsByTagName("jid"),e.length>0&&(this.jid=f.getText(e[0]),this.do_session?(this._addSysHandler(this._sasl_session_cb.bind(this),null,null,null,"_session_auth_2"),this.send(j({type:"set",id:"_session_auth_2"}).c("session",{xmlns:f.NS.SESSION}).tree())):(this.authenticated=!0,this._changeConnectStatus(f.Status.CONNECTED,null)))},_sasl_session_cb:function(a){if(a.getAttribute("type")=="result")this.authenticated=!0,this._changeConnectStatus(f.Status.CONNECTED,null);else if(a.getAttribute("type")=="error")return f.info("Session creation failed."),this._changeConnectStatus(f.Status.AUTHFAIL,null),!1;return!1},_sasl_failure_cb:function(a){return this._sasl_success_handler&&(this.deleteHandler(this._sasl_success_handler),this._sasl_success_handler=null),this._sasl_challenge_handler&&(this.deleteHandler(this._sasl_challenge_handler),this._sasl_challenge_handler=null),this._sasl_mechanism&&this._sasl_mechanism.onFailure(),this._changeConnectStatus(f.Status.AUTHFAIL,null),!1},_auth2_cb:function(a){return a.getAttribute("type")=="result"?(this.authenticated=!0,this._changeConnectStatus(f.Status.CONNECTED,null)):a.getAttribute("type")=="error"&&(this._changeConnectStatus(f.Status.AUTHFAIL,null),this.disconnect("authentication failed")),!1},_addSysTimedHandler:function(a,b){var c=new f.TimedHandler(a,b);return c.user=!1,this.addTimeds.push(c),c},_addSysHandler:function(a,b,c,d,e){var g=new f.Handler(a,b,c,d,e);return g.user=!1,this.addHandlers.push(g),g},_onDisconnectTimeout:function(){return f.info("_onDisconnectTimeout was called"),this._proto._onDisconnectTimeout(),this._doDisconnect(),!1},_onIdle:function(){var a,b,c,d;while(this.addTimeds.length>0)this.timedHandlers.push(this.addTimeds.pop());while(this.removeTimeds.length>0)b=this.removeTimeds.pop(),a=this.timedHandlers.indexOf(b),a>=0&&this.timedHandlers.splice(a,1);var e=(new Date).getTime();d=[];for(a=0;a<this.timedHandlers.length;a++){b=this.timedHandlers[a];if(this.authenticated||!b.user)c=b.lastCalled+b.period,c-e<=0?b.run()&&d.push(b):d.push(b)}this.timedHandlers=d,clearTimeout(this._idleTimeout),this._proto._onIdle(),this.connected&&(this._idleTimeout=setTimeout(this._onIdle.bind(this),100))}},b&&b(f,g,h,j,k),f.SASLMechanism=function(a,b,c){this.name=a,this.isClientFirst=b,this.priority=c},f.SASLMechanism.prototype={test:function(a){return!0},onStart:function(a){this._connection=a},onChallenge:function(a,b){throw new Error("You should implement challenge handling!")},onFailure:function(){this._connection=null},onSuccess:function(){this._connection=null}},f.SASLAnonymous=function(){},f.SASLAnonymous.prototype=new f.SASLMechanism("ANONYMOUS",!1,10),f.SASLAnonymous.test=function(a){return a.authcid===null},f.Connection.prototype.mechanisms[f.SASLAnonymous.prototype.name]=f.SASLAnonymous,f.SASLPlain=function(){},f.SASLPlain.prototype=new f.SASLMechanism("PLAIN",!0,20),f.SASLPlain.test=function(a){return a.authcid!==null},f.SASLPlain.prototype.onChallenge=function(a){var b=a.authzid;return b+="\0",b+=a.authcid,b+="\0",b+=a.pass,b},f.Connection.prototype.mechanisms[f.SASLPlain.prototype.name]=f.SASLPlain,f.SASLSHA1=function(){},f.SASLSHA1.prototype=new f.SASLMechanism("SCRAM-SHA-1",!0,40),f.SASLSHA1.test=function(a){return a.authcid!==null},f.SASLSHA1.prototype.onChallenge=function(b,f,g){var h=g||o.hexdigest(Math.random()*1234567890),j="n="+b.authcid;return j+=",r=",j+=h,b._sasl_data.cnonce=h,b._sasl_data["client-first-message-bare"]=j,j="n,,"+j,this.onChallenge=function(b,f){var g,h,j,k,l,n,o,p,q,r,s,t="c=biws,",u=b._sasl_data["client-first-message-bare"]+","+f+",",v=b._sasl_data.cnonce,w=/([a-z]+)=([^,]+)(,|$)/;while(f.match(w)){var x=f.match(w);f=f.replace(x[0],"");switch(x[1]){case"r":g=x[2];break;case"s":h=x[2];break;case"i":j=x[2]}}if(g.substr(0,v.length)!==v)return b._sasl_data={},b._sasl_failure_cb();t+="r="+g,u+=t,h=a.decode(h),h+="\0\0\0",k=n=i(b.pass,h);for(o=1;o<j;o++){l=i(b.pass,m(n));for(p=0;p<5;p++)k[p]^=l[p];n=l}k=m(k),q=i(k,"Client Key"),r=e(k,"Server Key"),s=i(c(m(q)),u),b._sasl_data["server-signature"]=d(r,u);for(p=0;p<5;p++)q[p]^=s[p];return t+=",p="+a.encode(m(q)),t}.bind(this),j},f.Connection.prototype.mechanisms[f.SASLSHA1.prototype.name]=f.SASLSHA1,f.SASLMD5=function(){},f.SASLMD5.prototype=new f.SASLMechanism("DIGEST-MD5",!1,30),f.SASLMD5.test=function(a){return a.authcid!==null},f.SASLMD5.prototype._quote=function(a){return'"'+a.replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"'},f.SASLMD5.prototype.onChallenge=function(a,b,c){var d=/([a-z]+)=("[^"]+"|[^,"]+)(?:,|$)/,e=c||o.hexdigest(""+Math.random()*1234567890),f="",g=null,h="",i="",j;while(b.match(d)){j=b.match(d),b=b.replace(j[0],""),j[2]=j[2].replace(/^"(.+)"$/,"$1");switch(j[1]){case"realm":f=j[2];break;case"nonce":h=j[2];break;case"qop":i=j[2];break;case"host":g=j[2]}}var k=a.servtype+"/"+a.domain;g!==null&&(k=k+"/"+g);var l=o.hash(a.authcid+":"+f+":"+this._connection.pass)+":"+h+":"+e,m="AUTHENTICATE:"+k,n="";return n+="charset=utf-8,",n+="username="+this._quote(a.authcid)+",",n+="realm="+this._quote(f)+",",n+="nonce="+this._quote(h)+",",n+="nc=00000001,",n+="cnonce="+this._quote(e)+",",n+="digest-uri="+this._quote(k)+",",n+="response="+o.hexdigest(o.hexdigest(l)+":"+h+":00000001:"+e+":auth:"+o.hexdigest(m))+",",n+="qop=auth",this.onChallenge=function(){return""}.bind(this),n}
,f.Connection.prototype.mechanisms[f.SASLMD5.prototype.name]=f.SASLMD5}(function(){window.Strophe=arguments[0],window.$build=arguments[1],window.$msg=arguments[2],window.$iq=arguments[3],window.$pres=arguments[4]}),Strophe.Request=function(a,b,c,d){this.id=++Strophe._requestId,this.xmlData=a,this.data=Strophe.serialize(a),this.origFunc=b,this.func=b,this.rid=c,this.date=NaN,this.sends=d||0,this.abort=!1,this.dead=null,this.age=function(){if(!this.date)return 0;var a=new Date;return(a-this.date)/1e3},this.timeDead=function(){if(!this.dead)return 0;var a=new Date;return(a-this.dead)/1e3},this.xhr=this._newXHR()},Strophe.Request.prototype={getResponse:function(){var a=null;if(this.xhr.responseXML&&this.xhr.responseXML.documentElement){a=this.xhr.responseXML.documentElement;if(a.tagName=="parsererror")throw Strophe.error("invalid response received"),Strophe.error("responseText: "+this.xhr.responseText),Strophe.error("responseXML: "+Strophe.serialize(this.xhr.responseXML)),"parsererror"}else this.xhr.responseText&&(Strophe.error("invalid response received"),Strophe.error("responseText: "+this.xhr.responseText),Strophe.error("responseXML: "+Strophe.serialize(this.xhr.responseXML)));return a},_newXHR:function(){var a=null;return window.XMLHttpRequest?(a=new XMLHttpRequest,a.overrideMimeType&&a.overrideMimeType("text/xml")):window.ActiveXObject&&(a=new ActiveXObject("Microsoft.XMLHTTP")),a.onreadystatechange=this.func.bind(null,this),a}},Strophe.Bosh=function(a){this._conn=a,this.rid=Math.floor(Math.random()*4294967295),this.sid=null,this.hold=1,this.wait=60,this.window=5,this._requests=[]},Strophe.Bosh.prototype={strip:null,_buildBody:function(){var a=$build("body",{rid:this.rid++,xmlns:Strophe.NS.HTTPBIND});return this.sid!==null&&a.attrs({sid:this.sid}),a},_reset:function(){this.rid=Math.floor(Math.random()*4294967295),this.sid=null},_connect:function(a,b,c){this.wait=a||this.wait,this.hold=b||this.hold;var d=this._buildBody().attrs({to:this._conn.domain,"xml:lang":"en",wait:this.wait,hold:this.hold,content:"text/xml; charset=utf-8",ver:"1.6","xmpp:version":"1.0","xmlns:xmpp":Strophe.NS.BOSH});c&&d.attrs({route:c});var e=this._conn._connect_cb;this._requests.push(new Strophe.Request(d.tree(),this._onRequestStateChange.bind(this,e.bind(this._conn)),d.tree().getAttribute("rid"))),this._throttledRequestHandler()},_attach:function(a,b,c,d,e,f,g){this._conn.jid=a,this.sid=b,this.rid=c,this._conn.connect_callback=d,this._conn.domain=Strophe.getDomainFromJid(this._conn.jid),this._conn.authenticated=!0,this._conn.connected=!0,this.wait=e||this.wait,this.hold=f||this.hold,this.window=g||this.window,this._conn._changeConnectStatus(Strophe.Status.ATTACHED,null)},_connect_cb:function(a){var b=a.getAttribute("type"),c,d;if(b!==null&&b=="terminate")return Strophe.error("BOSH-Connection failed: "+c),c=a.getAttribute("condition"),d=a.getElementsByTagName("conflict"),c!==null?(c=="remote-stream-error"&&d.length>0&&(c="conflict"),this._conn._changeConnectStatus(Strophe.Status.CONNFAIL,c)):this._conn._changeConnectStatus(Strophe.Status.CONNFAIL,"unknown"),this._conn._doDisconnect(),Strophe.Status.CONNFAIL;this.sid||(this.sid=a.getAttribute("sid"));var e=a.getAttribute("requests");e&&(this.window=parseInt(e,10));var f=a.getAttribute("hold");f&&(this.hold=parseInt(f,10));var g=a.getAttribute("wait");g&&(this.wait=parseInt(g,10))},_disconnect:function(a){this._sendTerminate(a)},_doDisconnect:function(){this.sid=null,this.rid=Math.floor(Math.random()*4294967295)},_emptyQueue:function(){return this._requests.length===0},_hitError:function(a){this.errors++,Strophe.warn("request errored, status: "+a+", number of errors: "+this.errors),this.errors>4&&this._onDisconnectTimeout()},_no_auth_received:function(a){a?a=a.bind(this._conn):a=this._conn._connect_cb.bind(this._conn);var b=this._buildBody();this._requests.push(new Strophe.Request(b.tree(),this._onRequestStateChange.bind(this,a.bind(this._conn)),b.tree().getAttribute("rid"))),this._throttledRequestHandler()},_onDisconnectTimeout:function(){var a;while(this._requests.length>0)a=this._requests.pop(),a.abort=!0,a.xhr.abort(),a.xhr.onreadystatechange=function(){}},_onIdle:function(){var a=this._conn._data;this._conn.authenticated&&this._requests.length===0&&a.length===0&&!this._conn.disconnecting&&(Strophe.info("no requests during idle cycle, sending blank request"),a.push(null));if(this._requests.length<2&&a.length>0&&!this._conn.paused){var b=this._buildBody();for(var c=0;c<a.length;c++)a[c]!==null&&(a[c]==="restart"?b.attrs({to:this._conn.domain,"xml:lang":"en","xmpp:restart":"true","xmlns:xmpp":Strophe.NS.BOSH}):b.cnode(a[c]).up());delete this._conn._data,this._conn._data=[],this._requests.push(new Strophe.Request(b.tree(),this._onRequestStateChange.bind(this,this._conn._dataRecv.bind(this._conn)),b.tree().getAttribute("rid"))),this._processRequest(this._requests.length-1)}if(this._requests.length>0){var d=this._requests[0].age();this._requests[0].dead!==null&&this._requests[0].timeDead()>Math.floor(Strophe.SECONDARY_TIMEOUT*this.wait)&&this._throttledRequestHandler(),d>Math.floor(Strophe.TIMEOUT*this.wait)&&(Strophe.warn("Request "+this._requests[0].id+" timed out, over "+Math.floor(Strophe.TIMEOUT*this.wait)+" seconds since last activity"),this._throttledRequestHandler())}},_onRequestStateChange:function(a,b){Strophe.debug("request id "+b.id+"."+b.sends+" state changed to "+b.xhr.readyState);if(b.abort){b.abort=!1;return}var c;if(b.xhr.readyState==4){c=0;try{c=b.xhr.status}catch(d){}typeof c=="undefined"&&(c=0);if(this.disconnecting&&c>=400){this._hitError(c);return}var e=this._requests[0]==b,f=this._requests[1]==b;if(c>0&&c<500||b.sends>5)this._removeRequest(b),Strophe.debug("request id "+b.id+" should now be removed");if(c==200)(f||e&&this._requests.length>0&&this._requests[0].age()>Math.floor(Strophe.SECONDARY_TIMEOUT*this.wait))&&this._restartRequest(0),Strophe.debug("request id "+b.id+"."+b.sends+" got 200"),a(b),this.errors=0;else{Strophe.error("request id "+b.id+"."+b.sends+" error "+c+" happened");if(c===0||c>=400&&c<600||c>=12e3)this._hitError(c),c>=400&&c<500&&(this._conn._changeConnectStatus(Strophe.Status.DISCONNECTING,null),this._conn._doDisconnect())}c>0&&c<500||b.sends>5||this._throttledRequestHandler()}},_processRequest:function(a){var b=this,c=this._requests[a],d=-1;try{c.xhr.readyState==4&&(d=c.xhr.status)}catch(e){Strophe.error("caught an error in _requests["+a+"], reqStatus: "+d)}typeof d=="undefined"&&(d=-1);if(c.sends>this.maxRetries){this._onDisconnectTimeout();return}var f=c.age(),g=!isNaN(f)&&f>Math.floor(Strophe.TIMEOUT*this.wait),h=c.dead!==null&&c.timeDead()>Math.floor(Strophe.SECONDARY_TIMEOUT*this.wait),i=c.xhr.readyState==4&&(d<1||d>=500);if(g||h||i)h&&Strophe.error("Request "+this._requests[a].id+" timed out (secondary), restarting"),c.abort=!0,c.xhr.abort(),c.xhr.onreadystatechange=function(){},this._requests[a]=new Strophe.Request(c.xmlData,c.origFunc,c.rid,c.sends),c=this._requests[a];if(c.xhr.readyState===0){Strophe.debug("request id "+c.id+"."+c.sends+" posting");try{c.xhr.open("POST",this._conn.service,this._conn.options.sync?!1:!0)}catch(j){Strophe.error("XHR open failed."),this._conn.connected||this._conn._changeConnectStatus(Strophe.Status.CONNFAIL,"bad-service"),this._conn.disconnect();return}var k=function(){c.date=new Date;if(b._conn.options.customHeaders){var a=b._conn.options.customHeaders;for(var d in a)a.hasOwnProperty(d)&&c.xhr.setRequestHeader(d,a[d])}c.xhr.setRequestHeader("Content-Type","text/plain"),c.xhr.send(c.data)};if(c.sends>1){var l=Math.min(Math.floor(Strophe.TIMEOUT*this.wait),Math.pow(c.sends,3))*1e3;setTimeout(k,l)}else k();c.sends++,this._conn.xmlOutput!==Strophe.Connection.prototype.xmlOutput&&(c.xmlData.nodeName===this.strip&&c.xmlData.childNodes.length?this._conn.xmlOutput(c.xmlData.childNodes[0]):this._conn.xmlOutput(c.xmlData)),this._conn.rawOutput!==Strophe.Connection.prototype.rawOutput&&this._conn.rawOutput(c.data)}else Strophe.debug("_processRequest: "+(a===0?"first":"second")+" request has readyState of "+c.xhr.readyState)},_removeRequest:function(a){Strophe.debug("removing request");var b;for(b=this._requests.length-1;b>=0;b--)a==this._requests[b]&&this._requests.splice(b,1);a.xhr.onreadystatechange=function(){},this._throttledRequestHandler()},_restartRequest:function(a){var b=this._requests[a];b.dead===null&&(b.dead=new Date),this._processRequest(a)},_reqToData:function(a){try{return a.getResponse()}catch(b){if(b!="parsererror")throw b;this._conn.disconnect("strophe-parsererror")}},_sendTerminate:function(a){Strophe.info("_sendTerminate was called");var b=this._buildBody().attrs({type:"terminate"});a&&b.cnode(a.tree());var c=new Strophe.Request(b.tree(),this._onRequestStateChange.bind(this,this._conn._dataRecv.bind(this._conn)),b.tree().getAttribute("rid"));this._requests.push(c),this._throttledRequestHandler()},_send:function(){clearTimeout(this._conn._idleTimeout),this._throttledRequestHandler(),this._conn._idleTimeout=setTimeout(this._conn._onIdle.bind(this._conn),100)},_sendRestart:function(){this._throttledRequestHandler(),clearTimeout(this._conn._idleTimeout)},_throttledRequestHandler:function(){this._requests?Strophe.debug("_throttledRequestHandler called with "+this._requests.length+" requests"):Strophe.debug("_throttledRequestHandler called with undefined requests");if(!this._requests||this._requests.length===0)return;this._requests.length>0&&this._processRequest(0),this._requests.length>1&&Math.abs(this._requests[0].rid-this._requests[1].rid)<this.window&&this._processRequest(1)}},Strophe.Websocket=function(a){this._conn=a,this.strip="stream:stream";var b=a.service;if(b.indexOf("ws:")!==0&&b.indexOf("wss:")!==0){var c="";a.options.protocol==="ws"&&window.location.protocol!=="https:"?c+="ws":c+="wss",c+="://"+window.location.host,b.indexOf("/")!==0?c+=window.location.pathname+b:c+=b,a.service=c}},Strophe.Websocket.prototype={_buildStream:function(){return $build("stream:stream",{to:this._conn.domain,xmlns:Strophe.NS.CLIENT,"xmlns:stream":Strophe.NS.STREAM,version:"1.0"})},_check_streamerror:function(a,b){var c=a.getElementsByTagName("stream:error");if(c.length===0)return!1;var d=c[0],e="",f="",g="urn:ietf:params:xml:ns:xmpp-streams";for(var h=0;h<d.childNodes.length;h++){var i=d.childNodes[h];if(i.getAttribute("xmlns")!==g)break;i.nodeName==="text"?f=i.textContent:e=i.nodeName}var j="WebSocket stream error: ";return e?j+=e:j+="unknown",f&&(j+=" - "+e),Strophe.error(j),this._conn._changeConnectStatus(b,e),this._conn._doDisconnect(),!0},_reset:function(){return},_connect:function(){this._closeSocket(),this.socket=new WebSocket(this._conn.service,"xmpp"),this.socket.onopen=this._onOpen.bind(this),this.socket.onerror=this._onError.bind(this),this.socket.onclose=this._onClose.bind(this),this.socket.onmessage=this._connect_cb_wrapper.bind(this)},_connect_cb:function(a){var b=this._check_streamerror(a,Strophe.Status.CONNFAIL);if(b)return Strophe.Status.CONNFAIL},_handleStreamStart:function(a){var b=!1,c=a.getAttribute("xmlns");typeof c!="string"?b="Missing xmlns in stream:stream":c!==Strophe.NS.CLIENT&&(b="Wrong xmlns in stream:stream: "+c);var d=a.namespaceURI;typeof d!="string"?b="Missing xmlns:stream in stream:stream":d!==Strophe.NS.STREAM&&(b="Wrong xmlns:stream in stream:stream: "+d);var e=a.getAttribute("version");return typeof e!="string"?b="Missing version in stream:stream":e!=="1.0"&&(b="Wrong version in stream:stream: "+e),b?(this._conn._changeConnectStatus(Strophe.Status.CONNFAIL,b),this._conn._doDisconnect(),!1):!0},_connect_cb_wrapper:function(a){if(a.data.indexOf("<stream:stream ")===0||a.data.indexOf("<?xml")===0){var b=a.data.replace(/^(<\?.*?\?>\s*)*/,"");if(b==="")return;b=a.data.replace(/<stream:stream (.*[^\/])>/,"<stream:stream $1/>");var c=(new DOMParser).parseFromString(b,"text/xml").documentElement;this._conn.xmlInput(c),this._conn.rawInput(a.data),this._handleStreamStart(c)&&(this._connect_cb(c),this.streamStart=a.data.replace(/^<stream:(.*)\/>$/,"<stream:$1>"))}else{if(a.data==="</stream:stream>"){this._conn.rawInput(a.data),this._conn.xmlInput(document.createElement("stream:stream")),this._conn._changeConnectStatus(Strophe.Status.CONNFAIL,"Received closing stream"),this._conn._doDisconnect();return}var d=this._streamWrap(a.data),e=(new DOMParser).parseFromString(d,"text/xml").documentElement;this.socket.onmessage=this._onMessage.bind(this),this._conn._connect_cb(e,null,a.data)}},_disconnect:function(a){if(this.socket.readyState!==WebSocket.CLOSED){a&&this._conn.send(a);var b="</stream:stream>";this._conn.xmlOutput(document.createElement("stream:stream")),this._conn.rawOutput(b);try{this.socket.send(b)}catch(c){Strophe.info("Couldn't send closing stream tag.")}}this._conn._doDisconnect()},_doDisconnect:function(){Strophe.info("WebSockets _doDisconnect was called"),this._closeSocket()},_streamWrap:function(a){return this.streamStart+a+"</stream:stream>"},_closeSocket:function(){if(this.socket)try{this.socket.close()}catch(a){}this.socket=null},_emptyQueue:function(){return!0},_onClose:function(){this._conn.connected&&!this._conn.disconnecting?(Strophe.error("Websocket closed unexcectedly"),this._conn._doDisconnect()):Strophe.info("Websocket closed")},_no_auth_received:function(a){Strophe.error("Server did not send any auth methods"),this._conn._changeConnectStatus(Strophe.Status.CONNFAIL,"Server did not send any auth methods"),a&&(a=a.bind(this._conn),a()),this._conn._doDisconnect()},_onDisconnectTimeout:function(){},_onError:function(a){Strophe.error("Websocket error "+a),this._conn._changeConnectStatus(Strophe.Status.CONNFAIL,"The WebSocket connection could not be established was disconnected."),this._disconnect()},_onIdle:function(){var a=this._conn._data;if(a.length>0&&!this._conn.paused){for(var b=0;b<a.length;b++)if(a[b]!==null){var c,d;a[b]==="restart"?(c=this._buildStream(),d=this._removeClosingTag(c),c=c.tree()):(c=a[b],d=Strophe.serialize(c)),this._conn.xmlOutput(c),this._conn.rawOutput(d),this.socket.send(d)}this._conn._data=[]}},_onMessage:function(a){var b,c;if(a.data==="</stream:stream>"){var d="</stream:stream>";this._conn.rawInput(d),this._conn.xmlInput(document.createElement("stream:stream")),this._conn.disconnecting||this._conn._doDisconnect();return}if(a.data.search("<stream:stream ")===0){c=a.data.replace(/<stream:stream (.*[^\/])>/,"<stream:stream $1/>"),b=(new DOMParser).parseFromString(c,"text/xml").documentElement;if(!this._handleStreamStart(b))return}else c=this._streamWrap(a.data),b=(new DOMParser).parseFromString(c,"text/xml").documentElement;if(this._check_streamerror(b,Strophe.Status.ERROR))return;if(this._conn.disconnecting&&b.firstChild.nodeName==="presence"&&b.firstChild.getAttribute("type")==="unavailable"){this._conn.xmlInput(b),this._conn.rawInput(Strophe.serialize(b));return}this._conn._dataRecv(b,a.data)},_onOpen:function(){Strophe.info("Websocket open");var a=this._buildStream();this._conn.xmlOutput(a.tree());var b=this._removeClosingTag(a);this._conn.rawOutput(b),this.socket.send(b)},_removeClosingTag:function(a){var b=Strophe.serialize(a);return b=b.replace(/<(stream:stream .*[^\/])\/>$/,"<$1>"),b},_reqToData:function(a){return a},_send:function(){this._conn.flush()},_sendRestart:function(){clearTimeout(this._conn._idleTimeout),this._conn._onIdle.bind(this._conn)()}}}();
},{}],13:[function(require,module,exports){
(function(e,r){"object"==typeof exports?module.exports=exports=r():"function"==typeof define&&define.amd?define([],r):e.CryptoJS=r()})(this,function(){var e=e||function(e,r){var t={},i=t.lib={},n=i.Base=function(){function e(){}return{extend:function(r){e.prototype=this;var t=new e;return r&&t.mixIn(r),t.hasOwnProperty("init")||(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var r in e)e.hasOwnProperty(r)&&(this[r]=e[r]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),o=i.WordArray=n.extend({init:function(e,t){e=this.words=e||[],this.sigBytes=t!=r?t:4*e.length},toString:function(e){return(e||s).stringify(this)},concat:function(e){var r=this.words,t=e.words,i=this.sigBytes,n=e.sigBytes;if(this.clamp(),i%4)for(var o=0;n>o;o++){var c=255&t[o>>>2]>>>24-8*(o%4);r[i+o>>>2]|=c<<24-8*((i+o)%4)}else if(t.length>65535)for(var o=0;n>o;o+=4)r[i+o>>>2]=t[o>>>2];else r.push.apply(r,t);return this.sigBytes+=n,this},clamp:function(){var r=this.words,t=this.sigBytes;r[t>>>2]&=4294967295<<32-8*(t%4),r.length=e.ceil(t/4)},clone:function(){var e=n.clone.call(this);return e.words=this.words.slice(0),e},random:function(r){for(var t=[],i=0;r>i;i+=4)t.push(0|4294967296*e.random());return new o.init(t,r)}}),c=t.enc={},s=c.Hex={stringify:function(e){for(var r=e.words,t=e.sigBytes,i=[],n=0;t>n;n++){var o=255&r[n>>>2]>>>24-8*(n%4);i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(e){for(var r=e.length,t=[],i=0;r>i;i+=2)t[i>>>3]|=parseInt(e.substr(i,2),16)<<24-4*(i%8);return new o.init(t,r/2)}},u=c.Latin1={stringify:function(e){for(var r=e.words,t=e.sigBytes,i=[],n=0;t>n;n++){var o=255&r[n>>>2]>>>24-8*(n%4);i.push(String.fromCharCode(o))}return i.join("")},parse:function(e){for(var r=e.length,t=[],i=0;r>i;i++)t[i>>>2]|=(255&e.charCodeAt(i))<<24-8*(i%4);return new o.init(t,r)}},f=c.Utf8={stringify:function(e){try{return decodeURIComponent(escape(u.stringify(e)))}catch(r){throw Error("Malformed UTF-8 data")}},parse:function(e){return u.parse(unescape(encodeURIComponent(e)))}},a=i.BufferedBlockAlgorithm=n.extend({reset:function(){this._data=new o.init,this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=f.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(r){var t=this._data,i=t.words,n=t.sigBytes,c=this.blockSize,s=4*c,u=n/s;u=r?e.ceil(u):e.max((0|u)-this._minBufferSize,0);var f=u*c,a=e.min(4*f,n);if(f){for(var p=0;f>p;p+=c)this._doProcessBlock(i,p);var d=i.splice(0,f);t.sigBytes-=a}return new o.init(d,a)},clone:function(){var e=n.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0});i.Hasher=a.extend({cfg:n.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){a.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){e&&this._append(e);var r=this._doFinalize();return r},blockSize:16,_createHelper:function(e){return function(r,t){return new e.init(t).finalize(r)}},_createHmacHelper:function(e){return function(r,t){return new p.HMAC.init(e,t).finalize(r)}}});var p=t.algo={};return t}(Math);return e});
},{}],14:[function(require,module,exports){
(function(e,r){"object"==typeof exports?module.exports=exports=r(require("./core"),require("./sha1"),require("./hmac")):"function"==typeof define&&define.amd?define(["./core","./sha1","./hmac"],r):r(e.CryptoJS)})(this,function(e){return e.HmacSHA1});
},{"./core":13,"./hmac":15,"./sha1":16}],15:[function(require,module,exports){
(function(e,r){"object"==typeof exports?module.exports=exports=r(require("./core")):"function"==typeof define&&define.amd?define(["./core"],r):r(e.CryptoJS)})(this,function(e){(function(){var r=e,t=r.lib,n=t.Base,i=r.enc,o=i.Utf8,s=r.algo;s.HMAC=n.extend({init:function(e,r){e=this._hasher=new e.init,"string"==typeof r&&(r=o.parse(r));var t=e.blockSize,n=4*t;r.sigBytes>n&&(r=e.finalize(r)),r.clamp();for(var i=this._oKey=r.clone(),s=this._iKey=r.clone(),a=i.words,c=s.words,f=0;t>f;f++)a[f]^=1549556828,c[f]^=909522486;i.sigBytes=s.sigBytes=n,this.reset()},reset:function(){var e=this._hasher;e.reset(),e.update(this._iKey)},update:function(e){return this._hasher.update(e),this},finalize:function(e){var r=this._hasher,t=r.finalize(e);r.reset();var n=r.finalize(this._oKey.clone().concat(t));return n}})})()});
},{"./core":13}],16:[function(require,module,exports){
(function(e,r){"object"==typeof exports?module.exports=exports=r(require("./core")):"function"==typeof define&&define.amd?define(["./core"],r):r(e.CryptoJS)})(this,function(e){return function(){var r=e,t=r.lib,n=t.WordArray,i=t.Hasher,o=r.algo,s=[],c=o.SHA1=i.extend({_doReset:function(){this._hash=new n.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(e,r){for(var t=this._hash.words,n=t[0],i=t[1],o=t[2],c=t[3],a=t[4],f=0;80>f;f++){if(16>f)s[f]=0|e[r+f];else{var u=s[f-3]^s[f-8]^s[f-14]^s[f-16];s[f]=u<<1|u>>>31}var d=(n<<5|n>>>27)+a+s[f];d+=20>f?(i&o|~i&c)+1518500249:40>f?(i^o^c)+1859775393:60>f?(i&o|i&c|o&c)-1894007588:(i^o^c)-899497514,a=c,c=o,o=i<<30|i>>>2,i=n,n=d}t[0]=0|t[0]+n,t[1]=0|t[1]+i,t[2]=0|t[2]+o,t[3]=0|t[3]+c,t[4]=0|t[4]+a},_doFinalize:function(){var e=this._data,r=e.words,t=8*this._nDataBytes,n=8*e.sigBytes;return r[n>>>5]|=128<<24-n%32,r[(n+64>>>9<<4)+14]=Math.floor(t/4294967296),r[(n+64>>>9<<4)+15]=t,e.sigBytes=4*r.length,this._process(),this._hash},clone:function(){var e=i.clone.call(this);return e._hash=this._hash.clone(),e}});r.SHA1=i._createHelper(c),r.HmacSHA1=i._createHmacHelper(c)}(),e.SHA1});
},{"./core":13}]},{},[11])