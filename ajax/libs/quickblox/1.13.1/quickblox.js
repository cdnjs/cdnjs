/* QuickBlox JavaScript SDK - v1.13.1 - 2015-09-18 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.QB = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Authentication Module
 *
 */

var config = require('../qbConfig'),
    Utils = require('../qbUtils'),
    CryptoJS = require('crypto-js/hmac-sha1');

function AuthProxy(service) {
  this.service = service;
}

AuthProxy.prototype = {

  getSession: function(callback) {
    if (config.debug) { console.log('AuthProxy.getSession');}
    this.service.ajax({url: Utils.getUrl(config.urls.session)}, function(err,res){
      if (err){ callback(err, null); }
      else { callback (err, res); }
    });
  },

  createSession: function(params, callback) {

    if (config.creds.appId === '' ||
        config.creds.authKey === '' ||
        config.creds.authSecret === '') {
      throw new Error('Cannot create a new session without app credentials (app ID, auth key and auth secret)');
    }

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
  },

  destroySession: function(callback) {
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
  },

  login: function(params, callback) {
    if (config.debug) { console.log('AuthProxy.login', params); }
    this.service.ajax({url: Utils.getUrl(config.urls.login), type: 'POST', data: params},
                      function(err, res) {
                        if (err) { callback(err, null); }
                        else { callback(null, res.user); }
                      });
  },

  logout: function(callback) {
    if (config.debug) { console.log('AuthProxy.logout'); }
    this.service.ajax({url: Utils.getUrl(config.urls.login), type: 'DELETE', dataType:'text'}, callback);
  }
  
};

module.exports = AuthProxy;

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
  
  return CryptoJS(sessionMsg, secret).toString();
}

},{"../qbConfig":9,"../qbUtils":13,"crypto-js/hmac-sha1":17}],2:[function(require,module,exports){
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
 * - onDisconnectedListener
 * - onReconnectListener
 */

var config = require('../qbConfig'),
    Utils = require('../qbUtils');

var isBrowser = typeof window !== "undefined";
var unsupported = "This function isn't supported outside of the browser (...yet)";

if (isBrowser) {
  require('../../lib/strophe/strophe.min');
  // add extra namespaces for Strophe
  Strophe.addNamespace('CARBONS', 'urn:xmpp:carbons:2');
  Strophe.addNamespace('CHAT_MARKERS', 'urn:xmpp:chat-markers:0');
}

var dialogUrl = config.urls.chat + '/Dialog';
var messageUrl = config.urls.chat + '/Message';

var connection,
    webrtc,
    roster = {},
    joinedRooms = {};

function ChatProxy(service, webrtcModule, conn) {
  var self = this;
  webrtc = webrtcModule;
  connection = conn;

  this.service = service;
  if(isBrowser) {
    this.roster = new RosterProxy(service);
    this.muc = new MucProxy(service);
  }
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
        markable = stanza.querySelector('markable'),
        received = stanza.querySelector('received'),
        displayed = stanza.querySelector('displayed'),
        composing = stanza.querySelector('composing'),
        paused = stanza.querySelector('paused'),
        invite = stanza.querySelector('invite'),
        extraParams = stanza.querySelector('extraParams'),
        delay = stanza.querySelector('delay'),
        messageId = stanza.getAttribute('id'),
        dialogId = type === 'groupchat' ? self.helpers.getDialogIdFromNode(from) : null,
        userId = type === 'groupchat' ? self.helpers.getIdFromResource(from) : self.helpers.getIdFromNode(from),
        marker = received || displayed || null,
        message, extension, attachments, attach, attributes,
        msg;

    if (invite) return true;

    // custom parameters
    // TODO: need rewrite this block
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

        } else if (extraParams.childNodes[i].tagName === 'dialog_id') {
          dialogId = extraParams.childNodes[i].textContent;

        } else {
          if (extraParams.childNodes[i].childNodes.length > 1) {

            // Firefox issue with 4K XML node limit:
            // http://www.coderholic.com/firefox-4k-xml-node-limit/
            var nodeTextContentSize = extraParams.childNodes[i].textContent.length;
            if (nodeTextContentSize > 4096) {
              var wholeNodeContent = "";
              for(var j=0; j<extraParams.childNodes[i].childNodes.length; ++j){
                wholeNodeContent += extraParams.childNodes[i].childNodes[j].textContent;
              }
              extension[extraParams.childNodes[i].tagName] = wholeNodeContent;

            } else {
              extension = self._XMLtoJS(extension, extraParams.childNodes[i].tagName, extraParams.childNodes[i]);
            }
          } else {
            extension[extraParams.childNodes[i].tagName] = extraParams.childNodes[i].textContent;
          }
        }
      }

      if (attachments.length > 0)
        extension.attachments = attachments;
    }

    // fire 'is typing' callback
    //
    if(composing || paused){
      if (typeof self.onMessageTypingListener === 'function' && (type === 'chat' || type === 'groupchat' || !delay)){
        self.onMessageTypingListener(composing != null, userId, dialogId);
      }
      return true;
    }

    message = {
      id: messageId,
      dialog_id: dialogId,
      type: type,
      body: (body && body.textContent) || null,
      extension: extension || null,
      delay: delay
    };

    // chat markers
    if (marker) {
      message.markerType = received ? 'received' : 'displayed';
      message.markerMessageId = marker.getAttribute('id');
    }

    // !delay - this needed to don't duplicate messages from chat 2.0 API history
    // with typical XMPP behavior of history messages in group chat
    if (typeof self.onMessageListener === 'function' && (type === 'chat' || type === 'groupchat' || !delay))
      self.onMessageListener(userId, message);

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
ChatProxy.prototype = {

  connect: function(params, callback) {
    if(!isBrowser) throw unsupported;

    if (config.debug) { console.log('ChatProxy.connect', params); }
    var self = this,
        err, rooms;

    var userJid;
    if ('userId' in params) {
      userJid = params.userId + '-' + config.creds.appId + '@' + config.endpoints.chat;
      if ('resource' in params) {
        userJid = userJid + "/" + params.resource;
      }
    } else if ('jid' in params) {
      userJid = params.jid;
    }

    connection.connect(userJid, params.password, function(status) {
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

        connection.addHandler(self._onMessage, null, 'message', 'chat');
        connection.addHandler(self._onMessage, null, 'message', 'groupchat');
        connection.addHandler(self._onPresence, null, 'presence');
        connection.addHandler(self._onIQ, null, 'iq');

        // set signaling callbacks
        connection.addHandler(webrtc._onMessage, null, 'message', 'headline');

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

        if (typeof self.onDisconnectedListener === 'function'){
          self.onDisconnectedListener();
        }

        // reconnect to chat
        if (!self._isLogout) self.connect(params);
        break;
      case Strophe.Status.ATTACHED:
        trace('Status.ATTACHED');
        break;
      }
    });
  },

  send: function(jid_or_user_id, message) {
    if(!isBrowser) throw unsupported;

    if(message.id == null){
      message.id = Utils.getBsonObjectId();
    }

    var self = this,
        msg = $msg({
          from: connection.jid,
          to: this.helpers.jidOrUserId(jid_or_user_id),
          type: message.type,
          id: message.id
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

        } else if (typeof message.extension[field] === 'object') {

          self._JStoXML(field, message.extension[field], msg);

        } else {
          msg.c(field).t(message.extension[field]).up();
        }
      });

      msg.up();
    }

    // chat markers
    if (message.type === 'chat') {
      msg.c('markable', {
        xmlns: Strophe.NS.CHAT_MARKERS
      });
    }

    connection.send(msg);
  },

  // send typing status
  sendIsTypingStatus: function(jid_or_user_id) {
    if(!isBrowser) throw unsupported;

    var msg = $msg({
      from: connection.jid,
      to: this.helpers.jidOrUserId(jid_or_user_id),
      type: this.helpers.typeChat(jid_or_user_id)
    });

    msg.c('composing', {
      xmlns: 'http://jabber.org/protocol/chatstates'
    });

    connection.send(msg);
  },

  // send stop typing status
  sendIsStopTypingStatus: function(jid_or_user_id) {
    if(!isBrowser) throw unsupported;

    var msg = $msg({
      from: connection.jid,
      to: this.helpers.jidOrUserId(jid_or_user_id),
      type: this.helpers.typeChat(jid_or_user_id)
    });

    msg.c('paused', {
      xmlns: 'http://jabber.org/protocol/chatstates'
    });

    connection.send(msg);
  },

  // helper function for ChatProxy.send()
  sendPres: function(type) {
    if(!isBrowser) throw unsupported;

    connection.send($pres({
      from: connection.jid,
      type: type
    }));
  },

  sendDeliveredMessage: function(jid, messageId) {
    if(!isBrowser) throw unsupported;

    var msg = $msg({
      from: connection.jid,
      to: jid,
      type: 'chat',
      id: Utils.getBsonObjectId()
    });

    msg.c('received', {
      xmlns: Strophe.NS.CHAT_MARKERS,
      id: messageId
    });

    connection.send(msg);
  },

  sendReadMessage: function(jid, messageId) {
    if(!isBrowser) throw unsupported;

    var msg = $msg({
      from: connection.jid,
      to: jid,
      type: 'chat',
      id: Utils.getBsonObjectId()
    });

    msg.c('displayed', {
      xmlns: Strophe.NS.CHAT_MARKERS,
      id: messageId
    });

    connection.send(msg);
  },

  disconnect: function() {
    if(!isBrowser) throw unsupported;

    joinedRooms = {};
    this._isLogout = true;
    connection.flush();
    connection.disconnect();
  },

  addListener: function(params, callback) {
    if(!isBrowser) throw unsupported;

    return connection.addHandler(handler, null, params.name || null, params.type || null, params.id || null, params.from || null);

    function handler() {
      callback();
      // if 'false' - a handler will be performed only once
      return params.live !== false;
    }
  },

  deleteListener: function(ref) {
    if(!isBrowser) throw unsupported;

    connection.deleteHandler(ref);
  },

  // TODO: the magic
  _JStoXML: function(title, obj, msg) {
    var self = this;
    msg.c(title);
    Object.keys(obj).forEach(function(field) {
      if (typeof obj[field] === 'object')
        self._JStoXML(field, obj[field], msg);
      else
        msg.c(field).t(obj[field]).up();
    });
    msg.up();
  },

  // TODO: the magic
  _XMLtoJS: function(extension, title, obj) {
    var self = this;
    extension[title] = {};
    for (var i = 0, len = obj.childNodes.length; i < len; i++) {
      if (obj.childNodes[i].childNodes.length > 1) {
        extension[title] = self._XMLtoJS(extension[title], obj.childNodes[i].tagName, obj.childNodes[i]);
      } else {
        extension[title][obj.childNodes[i].tagName] = obj.childNodes[i].textContent;
      }
    }
    return extension;
  },

  _autoSendPresence: function() {
    if(!isBrowser) throw unsupported;

    connection.send($pres().tree());
    // we must return true to keep the handler alive
    // returning false would remove it after it finishes
    return true;
  },

  // Carbons XEP [http://xmpp.org/extensions/xep-0280.html]
  _enableCarbons: function(callback) {
    if(!isBrowser) throw unsupported;

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
  }

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

RosterProxy.prototype = {

  get: function(callback) {
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
  },

  add: function(jidOrUserId, callback) {
    var self = this;
    var userJid = this.helpers.jidOrUserId(jidOrUserId);
    var userId = this.helpers.getIdFromNode(userJid).toString();

    roster[userId] = {
      subscription: 'none',
      ask: 'subscribe'
    };

    self._sendSubscriptionPresence({
      jid: userJid,
      type: 'subscribe'
    });

    if (typeof callback === 'function') callback();
  },

  confirm: function(jidOrUserId, callback) {
    var self = this;
    var userJid = this.helpers.jidOrUserId(jidOrUserId);
    var userId = this.helpers.getIdFromNode(userJid).toString();

    roster[userId] = {
      subscription: 'from',
      ask: 'subscribe'
    };

    self._sendSubscriptionPresence({
      jid: userJid,
      type: 'subscribed'
    });

    self._sendSubscriptionPresence({
      jid: userJid,
      type: 'subscribe'
    });

    if (typeof callback === 'function') callback();
  },

  reject: function(jidOrUserId, callback) {
    var self = this;
    var userJid = this.helpers.jidOrUserId(jidOrUserId);
    var userId = this.helpers.getIdFromNode(userJid).toString();

    roster[userId] = {
      subscription: 'none',
      ask: null
    };

    self._sendSubscriptionPresence({
      jid: userJid,
      type: 'unsubscribed'
    });

    if (typeof callback === 'function') callback();
  },

  remove: function(jidOrUserId, callback) {
    var self = this;
    var userJid = this.helpers.jidOrUserId(jidOrUserId);
    var userId = this.helpers.getIdFromNode(userJid).toString();
    var iq;

    iq = $iq({
      from: connection.jid,
      type: 'set',
      id: connection.getUniqueId('removeRosterItem')
    }).c('query', {
      xmlns: Strophe.NS.ROSTER
    }).c('item', {
      jid: userJid,
      subscription: 'remove'
    });

    connection.sendIQ(iq, function() {
      delete roster[userId];
      if (typeof callback === 'function') callback();
    });
  },

  _sendSubscriptionPresence: function(params) {
    var pres;

    pres = $pres({
      to: params.jid,
      type: params.type
    });

    connection.send(pres);
  }

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

MucProxy.prototype = {

  join: function(jid, callback) {
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
  },

  leave: function(jid, callback) {
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
  },

  listOnlineUsers: function(roomJid, callback) {
    var iq, self = this,
        onlineUsers = [];

    iq = $iq({
      from: connection.jid,
      id: connection.getUniqueId('muc_disco_items'),
      to: roomJid,
      type: "get"
    }).c("query", {
      xmlns: 'http://jabber.org/protocol/disco#items'
    })

    connection.sendIQ(iq, function(stanza) {
      var items = stanza.getElementsByTagName('item');
      var userId;
      for (var i = 0, len = items.length; i < len; i++) {
        userId = self.helpers.getUserIdFromRoomJid(items[i].getAttribute('jid'));
        onlineUsers.push(userId);
      }
      callback(onlineUsers);
    });
  }

};

/* Chat module: History
---------------------------------------------------------------------- */

// Dialogs

function DialogProxy(service) {
  this.service = service;
  this.helpers = new Helpers;
}

DialogProxy.prototype = {

  list: function(params, callback) {
    if (typeof params === 'function' && typeof callback === 'undefined') {
      callback = params;
      params = {};
    }

    if (config.debug) { console.log('DialogProxy.list', params); }
    this.service.ajax({url: Utils.getUrl(dialogUrl), data: params}, callback);
  },

  create: function(params, callback) {
    if (config.debug) { console.log('DialogProxy.create', params); }
    this.service.ajax({url: Utils.getUrl(dialogUrl), type: 'POST', data: params}, callback);
  },

  update: function(id, params, callback) {
    if (config.debug) { console.log('DialogProxy.update', id, params); }
    this.service.ajax({url: Utils.getUrl(dialogUrl, id), type: 'PUT', data: params}, callback);
  },

  delete: function(id, params_or_callback, callback) {
    if (config.debug) { console.log('DialogProxy.delete', id);}
    if (arguments.length == 2) {
      this.service.ajax({url: Utils.getUrl(dialogUrl, id), type: 'DELETE', dataType: 'text'}, params_or_callback);
    } else if (arguments.length == 3) {
      this.service.ajax({url: Utils.getUrl(dialogUrl, id), type: 'DELETE', data: params_or_callback, dataType: 'text'}, callback);
    }
  }
};

// Messages

function MessageProxy(service) {
  this.service = service;
  this.helpers = new Helpers;
}

MessageProxy.prototype = {

  list: function(params, callback) {
    if (config.debug) { console.log('MessageProxy.list', params); }
    this.service.ajax({url: Utils.getUrl(messageUrl), data: params}, callback);
  },

  create: function(params, callback) {
    if (config.debug) { console.log('MessageProxy.create', params); }
    this.service.ajax({url: Utils.getUrl(messageUrl), type: 'POST', data: params}, callback);
  },

  update: function(id, params, callback) {
    if (config.debug) { console.log('MessageProxy.update', id, params); }
    this.service.ajax({url: Utils.getUrl(messageUrl, id), type: 'PUT', data: params}, callback);
  },

  delete: function(id, callback) {
    if (config.debug) { console.log('MessageProxy.delete', id); }
    this.service.ajax({url: Utils.getUrl(messageUrl, id), type: 'DELETE', dataType: 'text'}, callback);
  }

};

/* Helpers
---------------------------------------------------------------------- */
function Helpers() {}

Helpers.prototype = {

  jidOrUserId: function(jid_or_user_id) {
    var jid;
    if (typeof jid_or_user_id === 'string') {
      jid = jid_or_user_id;
    } else if (typeof jid_or_user_id === 'number') {
      jid = jid_or_user_id + '-' + config.creds.appId + '@' + config.endpoints.chat;
    } else {
      throw unsupported;
    }
    return jid;
  },

  typeChat: function(jid_or_user_id) {
    var chatType;
    if (typeof jid_or_user_id === 'string') {
      chatType = jid_or_user_id.indexOf("muc") > -1 ? 'groupchat' : 'chat';
    } else if (typeof jid_or_user_id === 'number') {
      chatType = 'chat';
    } else {
      throw unsupported;
    }
    return chatType;
  },

  getRecipientId: function(occupantsIds, UserId) {
    var recipient = null;
    occupantsIds.forEach(function(item, i, arr) {
      if(item != UserId){
        recipient = item;
      }
    });
    return recipient;
  },

  getUserJid: function(id, appId) {
    return id + '-' + appId + '@' + config.endpoints.chat;
  },

  getIdFromNode: function(jid) {
    if (jid.indexOf('@') < 0) return null;
    return parseInt(jid.split('@')[0].split('-')[0]);
  },

  getDialogIdFromNode: function(jid) {
    if (jid.indexOf('@') < 0) return null;
    return jid.split('@')[0].split('_')[1];
  },

  getRoomJid: function(jid) {
    if(!isBrowser) throw unsupported;
    return jid + '/' + this.getIdFromNode(connection.jid);
  },

  getIdFromResource: function(jid) {
    var s = jid.split('/');
    if (s.length < 2) return null;
    s.splice(0, 1);
    return parseInt(s.join('/'));
  },

  getUniqueId: function(suffix) {
    if(!isBrowser) throw unsupported;
    return connection.getUniqueId(suffix);
  },

  getBsonObjectId: function() {
    return Utils.getBsonObjectId();
  },

  getUserIdFromRoomJid: function(jid) {
    var arrayElements = jid.toString().split('/');
    if(arrayElements.length == 0){
      return null;
    }
    return arrayElements[arrayElements.length-1];
  }

};

module.exports = ChatProxy;

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

},{"../../lib/strophe/strophe.min":15,"../qbConfig":9,"../qbUtils":13}],3:[function(require,module,exports){
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

var config = require('../qbConfig'),
    Utils = require('../qbUtils');

var taggedForUserUrl = config.urls.blobs + '/tagged';

function ContentProxy(service) {
  this.service = service;
}

ContentProxy.prototype = {
  
  create: function(params, callback){
   if (config.debug) { console.log('ContentProxy.create', params);}
    this.service.ajax({url: Utils.getUrl(config.urls.blobs), data: {blob:params}, type: 'POST'}, function(err,result){
      if (err){ callback(err, null); }
      else { callback (err, result.blob); }
    });
  },

  list: function(params, callback){
    if (typeof params === 'function' && typeof callback ==='undefined') {
      callback = params;
      params = null;
    }
    this.service.ajax({url: Utils.getUrl(config.urls.blobs), data: params, type: 'GET'}, function(err,result){
      if (err){ callback(err, null); }
      else { callback (err, result); }
    });
  },

  delete: function(id, callback){
    this.service.ajax({url: Utils.getUrl(config.urls.blobs, id), type: 'DELETE', dataType: 'text'}, function(err, result) {
      if (err) { callback(err,null); }
      else { callback(null, true); }
    });
  },

  createAndUpload: function(params, callback){
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
  },

  upload: function(params, callback){
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
  },

  taggedForCurrentUser: function(callback) {
    this.service.ajax({url: Utils.getUrl(taggedForUserUrl)}, function(err, result) {
      if (err) { callback(err, null); }
      else { callback(null, result); }
    });
  },

  markUploaded: function (params, callback) {
    this.service.ajax({url: Utils.getUrl(config.urls.blobs, params.id + '/complete'), type: 'PUT', data: {size: params.size}, dataType: 'text' }, function(err, res){
      if (err) { callback (err, null); }
      else { callback (null, res); }
    });
  },

  getInfo: function (id, callback) {
    this.service.ajax({url: Utils.getUrl(config.urls.blobs, id)}, function (err, res) {
      if (err) { callback (err, null); }
      else { callback (null, res); }
    });
  },

  getFile: function (uid, callback) {
   this.service.ajax({url: Utils.getUrl(config.urls.blobs, uid)}, function (err, res) {
      if (err) { callback (err, null); }
      else { callback (null, res); }
    });
  },

  getFileUrl: function (id, callback) {
   this.service.ajax({url: Utils.getUrl(config.urls.blobs, id + '/getblobobjectbyid'), type: 'POST'}, function (err, res) {
      if (err) { callback (err, null); }
      else { callback (null, res.blob_object_access.params); }
    });
  },

  update: function (params, callback) {
    var data = {};
    data.blob = {};
    if (typeof params.name !== 'undefined') { data.blob.name = params.name; }
    this.service.ajax({url: Utils.getUrl(config.urls.blobs, params.id), data: data}, function(err, res) {
      if (err) { callback (err, null); }
      else { callback (null, res); } 
    });
  }

};

module.exports = ContentProxy;

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

},{"../qbConfig":9,"../qbUtils":13}],4:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Custom Objects module
 *
 */

var config = require('../qbConfig'),
    Utils = require('../qbUtils');

function DataProxy(service){
  this.service = service;
  if (config.debug) { console.log("LocationProxy", service); }
}

DataProxy.prototype = {

  create: function(className, data, callback) {
    if (config.debug) { console.log('DataProxy.create', className, data);}
    this.service.ajax({url: Utils.getUrl(config.urls.data, className), data: data, type: 'POST'}, function(err,res){
      if (err){ callback(err, null); }
      else { callback (err, res); }
    });
  },

  list: function(className, filters, callback) {
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
  },

  update: function(className, data, callback) {
    if (config.debug) { console.log('DataProxy.update', className, data);}
    this.service.ajax({url: Utils.getUrl(config.urls.data, className + '/' + data._id), data: data, type: 'PUT'}, function(err,result){
      if (err){ callback(err, null); }
      else { callback (err, result); }
    });
  },

  delete: function(className, id, callback) {
    if (config.debug) { console.log('DataProxy.delete', className, id);}
    this.service.ajax({url: Utils.getUrl(config.urls.data, className + '/' + id), type: 'DELETE', dataType: 'text'},
                      function(err,result){
                        if (err){ callback(err, null); }
                        else { callback (err, true); }
                      });
  },

  uploadFile: function(className, params, callback) {
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
  },

  updateFile: function(className, params, callback) {
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
  },

  downloadFile: function(className, params, callback) {
    if (config.debug) { console.log('DataProxy.downloadFile', className, params); }
    var result = Utils.getUrl(config.urls.data, className + '/' + params.id + '/file');
    result += '?field_name=' + params.field_name + '&token=' + this.service.getSession().token;
    callback(null, result);
  },

  deleteFile: function(className, params, callback) {
    if (config.debug) { console.log('DataProxy.deleteFile', className, params);}
    this.service.ajax({url: Utils.getUrl(config.urls.data, className + '/' + params.id + '/file'), data: {field_name: params.field_name},
                      dataType: 'text', type: 'DELETE'}, function(err, result) {
                        if (err) { callback (err, null); }
                        else { callback (err, true); }
                      });
  }
  
};

module.exports = DataProxy;

},{"../qbConfig":9,"../qbUtils":13}],5:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Location module
 *
 */

var config = require('../qbConfig'),
    Utils = require('../qbUtils');

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

GeoProxy.prototype = {

  create: function(params, callback){
    if (config.debug) { console.log('GeoProxy.create', {geo_data: params});}
    this.service.ajax({url: Utils.getUrl(config.urls.geodata), data: {geo_data: params}, type: 'POST'}, function(err,result){
      if (err){ callback(err, null); }
      else { callback (err, result.geo_datum); }
    });
  },

  update: function(params, callback){
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
  },

  get: function(id, callback){
    if (config.debug) { console.log('GeoProxy.get', id);}
    this.service.ajax({url: Utils.getUrl(config.urls.geodata, id)}, function(err,result){
       if (err) { callback (err, null); }
       else { callback(null, result.geo_datum); }
    });
  },

  list: function(params, callback){
    if (typeof params === 'function') {
      callback = params;
      params = undefined;
    }
    if (config.debug) { console.log('GeoProxy.find', params);}
    this.service.ajax({url: Utils.getUrl(geoFindUrl), data: params}, callback);
  },

  delete: function(id, callback){
    if (config.debug) { console.log('GeoProxy.delete', id); }
    this.service.ajax({url: Utils.getUrl(config.urls.geodata, id), type: 'DELETE', dataType: 'text'},
                     function(err,res){
                      if (err) { callback(err, null);}
                      else { callback(null, true);}
                     });
  },

  purge: function(days, callback){
    if (config.debug) { console.log('GeoProxy.purge', days); }
    this.service.ajax({url: Utils.getUrl(config.urls.geodata), data: {days: days}, type: 'DELETE', dataType: 'text'},
                     function(err, res){
                      if (err) { callback(err, null);}
                      else { callback(null, true);}
                     });
  }

};

function PlacesProxy(service) {
  this.service = service;
}

PlacesProxy.prototype = {

  list: function(params, callback){
    if (config.debug) { console.log('PlacesProxy.list', params);}
    this.service.ajax({url: Utils.getUrl(config.urls.places)}, callback);
  },

  create: function(params, callback){
    if (config.debug) { console.log('PlacesProxy.create', params);}
    this.service.ajax({url: Utils.getUrl(config.urls.places), data: {place:params}, type: 'POST'}, callback);
  },

  get: function(id, callback){
    if (config.debug) { console.log('PlacesProxy.get', id);}
    this.service.ajax({url: Utils.getUrl(config.urls.places, id)}, callback);
  },

  update: function(place, callback){
    if (config.debug) { console.log('PlacesProxy.update', place);}
    this.service.ajax({url: Utils.getUrl(config.urls.places, place.id), data: {place: place}, type: 'PUT'} , callback);
  },

  delete: function(id, callback){
    if (config.debug) { console.log('PlacesProxy.delete', id);}
    this.service.ajax({url: Utils.getUrl(config.urls.places, id), type: 'DELETE', dataType: 'text'}, callback);
  }

};

module.exports = LocationProxy;

},{"../qbConfig":9,"../qbUtils":13}],6:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Messages Module
 *
 */

var config = require('../qbConfig'),
    Utils = require('../qbUtils');

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

TokensProxy.prototype = {
  
  create: function(params, callback){
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
  },

  delete: function(id, callback) {
    if (config.debug) { console.log('MessageProxy.deletePushToken', id); }
    this.service.ajax({url: Utils.getUrl(config.urls.pushtokens, id), type: 'DELETE', dataType:'text'}, 
                      function (err, res) {
                        if (err) {callback(err, null);}
                        else {callback(null, true);}
                        });
  }

};

// Subscriptions

function SubscriptionsProxy(service){
  this.service = service;
}

SubscriptionsProxy.prototype = {

  create: function(params, callback) {
    if (config.debug) { console.log('MessageProxy.createSubscription', params); }
    this.service.ajax({url: Utils.getUrl(config.urls.subscriptions), type: 'POST', data: params}, callback);
  },

  list: function(callback) {
    if (config.debug) { console.log('MessageProxy.listSubscription'); }
    this.service.ajax({url: Utils.getUrl(config.urls.subscriptions)}, callback);
  },

  delete: function(id, callback) {
    if (config.debug) { console.log('MessageProxy.deleteSubscription', id); }
    this.service.ajax({url: Utils.getUrl(config.urls.subscriptions, id), type: 'DELETE', dataType:'text'}, 
                      function(err, res){
                        if (err) { callback(err, null);}
                        else { callback(null, true);}
                      });
  }

};

// Events
function EventsProxy(service){
  this.service = service;
}

EventsProxy.prototype = {

  create: function(params, callback) {
    if (config.debug) { console.log('MessageProxy.createEvent', params); }
    var message = {event: params};
    this.service.ajax({url: Utils.getUrl(config.urls.events), type: 'POST', data: message}, callback);
  },

  list: function(callback) {
   if (config.debug) { console.log('MessageProxy.listEvents'); }
    this.service.ajax({url: Utils.getUrl(config.urls.events)}, callback);
  },

  get: function(id, callback) {
    if (config.debug) { console.log('MessageProxy.getEvent', id); }
    this.service.ajax({url: Utils.getUrl(config.urls.events, id)}, callback);
  },
  
  status: function(id, callback) {
    if (config.debug) { console.log('MessageProxy.getEventStatus', id); }
    this.service.ajax({url: Utils.getUrl(config.urls.events, id + '/status')}, callback);
  },

  update: function(params, callback) {
    if (config.debug) { console.log('MessageProxy.createEvent', params); }
    var message = {event: params};
    this.service.ajax({url: Utils.getUrl(config.urls.events, params.id), type: 'PUT', data: message}, callback);
  },

  delete: function(id, callback) {
    if (config.debug) { console.log('MessageProxy.deleteEvent', id); }
    this.service.ajax({url: Utils.getUrl(config.urls.events, id), type: 'DELETE'}, callback);
  }

};

module.exports = MessagesProxy;

},{"../qbConfig":9,"../qbUtils":13}],7:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Users Module
 *
 */

var config = require('../qbConfig'),
    Utils = require('../qbUtils');

var DATE_FIELDS = ['created_at', 'updated_at', 'last_request_at'];
var NUMBER_FIELDS = ['id', 'external_user_id'];

var resetPasswordUrl = config.urls.users + '/password/reset';

function UsersProxy(service) {
  this.service = service;
}

UsersProxy.prototype = {

  listUsers: function(params, callback) {
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
  },

  get: function(params, callback) {
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
  },

  create: function(params, callback) {
    if (config.debug) { console.log('UsersProxy.create', params); }
    this.service.ajax({url: Utils.getUrl(config.urls.users), type: 'POST', data: {user: params}},
                      function(err, res) {
                        if (err) { callback(err, null); }
                        else { callback(null, res.user); }
                      });
  },

  update: function(id, params, callback) {
    if (config.debug) { console.log('UsersProxy.update', id, params); }
    this.service.ajax({url: Utils.getUrl(config.urls.users, id), type: 'PUT', data: {user: params}},
                      function(err, res) {
                        if (err) { callback(err, null); }
                        else { callback(null, res.user); }
                      });
  },

  delete: function(params, callback) {
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
  },

  resetPassword: function(email, callback) {
    if (config.debug) { console.log('UsersProxy.resetPassword', email); }
    this.service.ajax({url: Utils.getUrl(resetPasswordUrl), data: {email: email}}, callback);
  }

};

module.exports = UsersProxy;

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

},{"../qbConfig":9,"../qbUtils":13}],8:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * WebRTC Module
 *
 */

/*
 * User's callbacks (listener-functions):
 * - onCallListener
 * - onAcceptCallListener
 * - onRejectCallListener
 * - onStopCallListener
 * - onUpdateCallListener
 * - onRemoteStreamListener
 * - onSessionStateChangedListener
 * - onUserNotAnswerListener
 */

require('../../lib/strophe/strophe.min');
var download = require('../../lib/download/download.min');

var config = require('../qbConfig'),
    Utils = require('../qbUtils');

// cross-browser polyfill
var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
var RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription;
var RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate;
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
var URL = window.URL || window.webkitURL;

var signalingType = {
  CALL: 'call',
  ACCEPT: 'accept',
  REJECT: 'reject',
  STOP: 'hangUp',
  CANDIDATE: 'iceCandidates',
  PARAMETERS_CHANGED: 'update'
};

var WEBRTC_MODULE_ID = 'WebRTCVideoChat';

var connection, peer,
    callers = {};

// we use this timeout to fix next issue:
// "From Android/iOS make a call to Web and kill the Android/iOS app instantly. Web accept/reject popup will be still visible.
// We need a way to hide it if sach situation happened."
//
var answerTimers = {};

// We use this timer interval to dial a user - produce the call reqeusts each N seconds.
//
var dialingTimerIntervals = {};

// We use this timer on a caller's side to notify him if the opponent doesn't respond.
//
var callTimers = {};


/* WebRTC module: Core
--------------------------------------------------------------------------------- */
function WebRTCProxy(service, conn) {
  var self = this;
  connection = conn;

  this.service = service;
  this.helpers = new Helpers;

  this._onMessage = function(stanza) {
    var from = stanza.getAttribute('from'),
        extraParams = stanza.querySelector('extraParams'),
        delay = stanza.querySelector('delay'),
        userId = self.helpers.getIdFromNode(from),
        extension = self._getExtension(extraParams);

    var sessionId = extension.sessionID;
    
    if (delay || extension.moduleIdentifier !== WEBRTC_MODULE_ID) return true;

    // clean for users
    delete extension.moduleIdentifier;

    switch (extension.signalType) {
    case signalingType.CALL:
      trace('onCall from ' + userId);
      
      if (callers[userId]) {
      	trace('skip onCallListener, a user already got it');
      	return true;
      }

      // run caller availability timer and run again for this user
      clearAnswerTimer(userId);
      if(peer == null){
        startAnswerTimer(userId, self._answerTimeoutCallback);
      }
      //

      callers[userId] = {
        sessionID: extension.sessionID,
        sdp: extension.sdp
      };

      extension.callType = extension.callType === '1' ? 'video' : 'audio';
      delete extension.sdp;
      
      if (typeof self.onCallListener === 'function'){
        self.onCallListener(userId, extension);
      }

      break;
    case signalingType.ACCEPT:
      trace('onAccept from ' + userId);
        
      clearDialingTimerInterval(userId);
      clearCallTimer(userId);

      if (typeof peer === 'object')
        peer.onRemoteSessionCallback(extension.sdp, 'answer');
      delete extension.sdp;
      if (typeof self.onAcceptCallListener === 'function')
        self.onAcceptCallListener(userId, extension);
      break;
    case signalingType.REJECT:
      trace('onReject from ' + userId);

      clearDialingTimerInterval(userId);
      clearCallTimer(userId);

      self._close();
      if (typeof self.onRejectCallListener === 'function')
        self.onRejectCallListener(userId, extension);
      break;
    case signalingType.STOP:
      trace('onStop from ' + userId);

      clearDialingTimerInterval(userId);
      clearCallTimer(userId);

      clearCallers(userId);
      
      self._close();
      if (typeof self.onStopCallListener === 'function')
        self.onStopCallListener(userId, extension);
      break;
    case signalingType.CANDIDATE:
      if (typeof peer === 'object') {
        peer.addCandidates(extension.iceCandidates);
        if (peer.type === 'answer')
          self._sendCandidate(peer.opponentId, peer.iceCandidates);
      }
      break;
    case signalingType.PARAMETERS_CHANGED:
      trace('onUpdateCall from ' + userId);
      if (typeof self.onUpdateCallListener === 'function')
        self.onUpdateCallListener(userId, extension);
      break;
    }
    
    // we must return true to keep the handler alive
    // returning false would remove it after it finishes
    return true;
  };

  this._getExtension = function(extraParams) {
    var extension = {}, iceCandidates = [], opponents = [],
        candidate, oponnent, items, childrenNodes;

    if (extraParams) {
      for (var i = 0, len = extraParams.childNodes.length; i < len; i++) {
        if (extraParams.childNodes[i].tagName === 'iceCandidates') {
        
          // iceCandidates
          items = extraParams.childNodes[i].childNodes;
          for (var j = 0, len2 = items.length; j < len2; j++) {
            candidate = {};
            childrenNodes = items[j].childNodes;
            for (var k = 0, len3 = childrenNodes.length; k < len3; k++) {
              candidate[childrenNodes[k].tagName] = childrenNodes[k].textContent;
            }
            iceCandidates.push(candidate);
          }

        } else if (extraParams.childNodes[i].tagName === 'opponentsIDs') {

          // opponentsIDs
          items = extraParams.childNodes[i].childNodes;
          for (var j = 0, len2 = items.length; j < len2; j++) {
            oponnent = items[j].textContent;
            opponents.push(oponnent);
          }

        } else {
          if (extraParams.childNodes[i].childNodes.length > 1) {

            extension = self._XMLtoJS(extension, extraParams.childNodes[i].tagName, extraParams.childNodes[i]);

          } else {

            extension[extraParams.childNodes[i].tagName] = extraParams.childNodes[i].textContent;

          }
        }
      }
      if (iceCandidates.length > 0)
        extension.iceCandidates = iceCandidates;
      if (opponents.length > 0)
        extension.opponents = opponents;
    }

    return extension;
  };

  this._answerTimeoutCallback = function (userId){
  	clearCallers(userId);
    self._close();
    
    if(typeof self.onSessionStateChangedListener === 'function'){
      self.onSessionStateChangedListener(self.SessionState.CLOSED, userId);
    }
  };

  this._callTimeoutCallback = function (userId){
    trace("User " + userId + " not asnwer");

    clearDialingTimerInterval(userId);

    clearCallers(userId);
    self._close();

    if(typeof self.onUserNotAnswerListener === 'function'){
      self.onUserNotAnswerListener(userId);
    }
  };
}

WebRTCProxy.prototype.SessionState = {
  UNDEFINED: 0,
  CONNECTING: 1,
  CONNECTED: 2,
  FAILED: 3,
  DISCONNECTED: 4,
  CLOSED: 5
};

/* WebRTC module: User Media Steam
--------------------------------------------------------------------------------- */
// get local stream from user media interface (web-camera, microphone)
WebRTCProxy.prototype.getUserMedia = function(params, callback) {
  if (!getUserMedia) throw new Error('getUserMedia() is not supported in your browser');
  getUserMedia = getUserMedia.bind(navigator);
  var self = this;

  // Additional parameters for Media Constraints
  // http://tools.ietf.org/html/draft-alvestrand-constraints-resolution-00
  /**********************************************
   * googEchoCancellation: true
   * googAutoGainControl: true
   * googNoiseSuppression: true
   * googHighpassFilter: true
   * minWidth: 640
   * minHeight: 480
   * maxWidth: 1280
   * maxHeight: 720
   * minFrameRate: 60
   * maxAspectRatio: 1.333
  **********************************************/
  getUserMedia(
    {
      audio: params.audio || false,
      video: params.video || false
    },

    function(stream) {
      self.localStream = stream;
      if (params.elemId)
        self.attachMediaStream(params.elemId, stream, params.options);
      callback(null, stream);
    },

    function(err) {
      callback(err, null);
    }
  );
};

// attach media stream to audio/video element
WebRTCProxy.prototype.attachMediaStream = function(id, stream, options) {
  var elem = document.getElementById(id);
  if (elem) {
    elem.src = URL.createObjectURL(stream);
    if (options && options.muted) elem.muted = true;
    if (options && options.mirror) {
      elem.style.webkitTransform = 'scaleX(-1)';
      elem.style.transform = 'scaleX(-1)';
    }
    elem.play();
  }
};

WebRTCProxy.prototype.snapshot = function(id) {
  var video = document.getElementById(id),
      canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),
      dataURL, blob;
  
  if (video) {
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    if (video.style.transform === 'scaleX(-1)') {
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
    }
    context.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
    dataURL = canvas.toDataURL();

    blob = dataURItoBlob(dataURL, 'image/png');
    blob.name = 'snapshot_' + getLocalTime() + '.png';
    blob.url = dataURL;

    return blob;
  }
};

// add CSS filters to video stream
// http://css-tricks.com/almanac/properties/f/filter/
WebRTCProxy.prototype.filter = function(id, filters) {
  var video = document.getElementById(id);
  if (video) {
    video.style.webkitFilter = filters;
    video.style.filter = filters;
  }
};

WebRTCProxy.prototype.mute = function(type) {
  this._switchOffDevice(0, type);
};

WebRTCProxy.prototype.unmute = function(type) {
  this._switchOffDevice(1, type);
};

WebRTCProxy.prototype._switchOffDevice = function(bool, type) {
  if (type === 'audio' && this.localStream.getAudioTracks().length > 0) {
    this.localStream.getAudioTracks().forEach(function (track) {
      track.enabled = !!bool;
    });
  }
  if (type === 'video' && this.localStream.getVideoTracks().length > 0) {
    this.localStream.getVideoTracks().forEach(function (track) {
      track.enabled = !!bool;
    });
  }
};

/* WebRTC module: Real-Time Communication (Signaling)
--------------------------------------------------------------------------------- */
WebRTCProxy.prototype._createPeer = function(params) {
  if (!RTCPeerConnection) throw new Error('RTCPeerConnection() is not supported in your browser');
  if (!this.localStream) throw new Error("You don't have an access to the local stream");

  // Additional parameters for RTCPeerConnection options
  // new RTCPeerConnection(pcConfig, options)
  /**********************************************
   * DtlsSrtpKeyAgreement: true
   * RtpDataChannels: true
  **********************************************/
  var pcConfig = {
    iceServers: config.iceServers
  };
  peer = new RTCPeerConnection(pcConfig);
  peer.init(this, params);
  
  trace("Peer._createPeer: " + peer + ", sessionID: " + peer.sessionID);
};

WebRTCProxy.prototype.call = function(opponentsIDs, callType, extension) {

  trace('Call. userId: ' + opponentsIDs + ", callType: " + callType + ', extension: ' + JSON.stringify(extension));

  this._createPeer();

  var self = this;

  // For now we support only 1-1 calls.
  //
  var userIdsToCall = opponentsIDs instanceof Array ? opponentsIDs : [opponentsIDs];
  var userIdToCall = userIdsToCall[0];

  peer.opponentId = userIdToCall;
  peer.getSessionDescription(function(err, res) {
    if (err) {
      trace("getSessionDescription error: " + err);
    } else {

      // let's send call requests to user
      //
      clearDialingTimerInterval(userIdToCall);
      var functionToRun = function() {
        self._sendMessage(userIdToCall, extension, 'CALL', callType, userIdsToCall);
      };
      functionToRun(); // run a function for the first time and then each N seconds.
      startDialingTimerInterval(userIdToCall, functionToRun);
      //
      clearCallTimer(userIdToCall);
      startCallTimer(userIdToCall, self._callTimeoutCallback);
      //
      //
    }
  });
};

WebRTCProxy.prototype.accept = function(userId, extension) {
  var extension = extension || {};

  trace('Accept. userId: ' + userId + ', extension: ' + JSON.stringify(extension));

  clearAnswerTimer(userId);
  
  var caller = callers[userId];
  if (caller) {
    this._createPeer({
      sessionID: caller.sessionID,
      description: caller.sdp
    });
    // delete callers[userId];
  }

  var self = this;
  peer.opponentId = userId;

  peer.getSessionDescription(function(err, res) {
    if (err) {
      trace(err);
    } else {
      self._sendMessage(userId, extension, 'ACCEPT');
    }
  });
};

WebRTCProxy.prototype.reject = function(userId, extension) {
  var extension = extension || {};

  trace('Reject. userId: ' + userId + ', extension: ' + JSON.stringify(extension));

  clearAnswerTimer(userId);

  if (callers[userId]) {
    extension.sessionID = callers[userId].sessionID;
    delete callers[userId];
  }

  this._sendMessage(userId, extension, 'REJECT');
};

WebRTCProxy.prototype.stop = function(userId, extension) {
  var extension = extension || {};

  trace('Stop. userId: ' + userId + ', extension: ' + JSON.stringify(extension));

  clearAnswerTimer(userId);
  clearDialingTimerInterval(userId);
  clearCallTimer(userId);

  this._sendMessage(userId, extension, 'STOP');
  this._close();

  clearCallers(userId);
};

WebRTCProxy.prototype.update = function(userId, extension) {
  var extension = extension || {};
  trace('Update. userId: ' + userId + ', extension: ' + JSON.stringify(extension));

  this._sendMessage(userId, extension, 'PARAMETERS_CHANGED');
};

// close peer connection and local stream
WebRTCProxy.prototype._close = function() {
  trace("Peer._close");

  if (peer) {
    peer.close();
  }
  if (this.localStream) {
    this.localStream.stop();
    this.localStream = null;
  }
};

WebRTCProxy.prototype._sendCandidate = function(userId, iceCandidates) {
  var extension = {
    iceCandidates: iceCandidates
  };
  this._sendMessage(userId, extension, 'CANDIDATE');
};

WebRTCProxy.prototype._sendMessage = function(userId, extension, type, callType, opponentsIDs) {
  var extension = extension || {},
      self = this,
      msg, params;

  extension.moduleIdentifier = WEBRTC_MODULE_ID;
  extension.signalType = signalingType[type];
  extension.sessionID = peer && peer.sessionID || extension.sessionID;

  if (callType) {
    extension.callType = callType === 'video' ? '1' : '2';
  }

  if (type === 'CALL' || type === 'ACCEPT') {    
    extension.sdp = peer.localDescription.sdp;
    extension.platform = 'web';
  }

  if (type === 'CALL') {
    extension.callerID = this.helpers.getIdFromNode(connection.jid);
    extension.opponentsIDs = opponentsIDs;
  }
  
  params = {
    from: connection.jid,
    to: this.helpers.getUserJid(userId, this.service.getSession().application_id),
    type: 'headline',
    id: Utils.getBsonObjectId()
  };
  
  msg = $msg(params).c('extraParams', {
    xmlns: Strophe.NS.CLIENT
  });
  
  Object.keys(extension).forEach(function(field) {
    if (field === 'iceCandidates') {

      // iceCandidates
      msg = msg.c('iceCandidates');
      extension[field].forEach(function(candidate) {
        msg = msg.c('iceCandidate');
        Object.keys(candidate).forEach(function(key) {
          msg.c(key).t(candidate[key]).up();
        });
        msg.up();
      });
      msg.up();

    } else if (field === 'opponentsIDs') {

      // opponentsIDs
      msg = msg.c('opponentsIDs');
      extension[field].forEach(function(opponentId) {
        msg = msg.c('opponentID').t(opponentId).up();
      });
      msg.up();

    } else if (typeof extension[field] === 'object') {

      self._JStoXML(field, extension[field], msg);

    } else {
      msg.c(field).t(extension[field]).up();
    }
  });
  
  connection.send(msg);
};

// TODO: the magic
WebRTCProxy.prototype._JStoXML = function(title, obj, msg) {
  var self = this;
  msg.c(title);
  Object.keys(obj).forEach(function(field) {
    if (typeof obj[field] === 'object')
      self._JStoXML(field, obj[field], msg);
    else
      msg.c(field).t(obj[field]).up();
  });
  msg.up();
};

// TODO: the magic
WebRTCProxy.prototype._XMLtoJS = function(extension, title, obj) {
  var self = this;
  extension[title] = {};
  for (var i = 0, len = obj.childNodes.length; i < len; i++) {
    if (obj.childNodes[i].childNodes.length > 1) {
      extension[title] = self._XMLtoJS(extension[title], obj.childNodes[i].tagName, obj.childNodes[i]);
    } else {
      extension[title][obj.childNodes[i].tagName] = obj.childNodes[i].textContent;
    }
  }
  return extension;
};

/* WebRTC module: RTCPeerConnection extension
--------------------------------------------------------------------------------- */
if (RTCPeerConnection) {

RTCPeerConnection.prototype.init = function(service, options) {
  this.service = service;
  this.sessionID = options && options.sessionID || Date.now();
  this.type = options && options.description ? 'answer' : 'offer';
  
  this.addStream(this.service.localStream);
  this.onicecandidate = this.onIceCandidateCallback;
  this.onaddstream = this.onRemoteStreamCallback;
  this.onsignalingstatechange = this.onSignalingStateCallback;
  this.oniceconnectionstatechange = this.onIceConnectionStateCallback;  

  if (this.type === 'answer') {
    this.onRemoteSessionCallback(options.description, 'offer');
  }
};

RTCPeerConnection.prototype.getSessionDescription = function(callback) {
  if (peer.type === 'offer') {
    // Additional parameters for SDP Constraints
    // http://www.w3.org/TR/webrtc/#constraints
    // peer.createOffer(successCallback, errorCallback, constraints)
    peer.createOffer(successCallback, errorCallback);
  } else {
    peer.createAnswer(successCallback, errorCallback);
  }

  function successCallback(desc) {
    peer.setLocalDescription(desc, function() {
      callback(null, desc);
    }, errorCallback);
  }
  function errorCallback(error) {
    callback(error, null);
  }
};

RTCPeerConnection.prototype.onIceCandidateCallback = function(event) {
  var candidate = event.candidate;

  if (candidate) {
    trace("onICECandidate: " + JSON.stringify(candidate));

    peer.iceCandidates = peer.iceCandidates || [];
    peer.iceCandidates.push({
      sdpMLineIndex: candidate.sdpMLineIndex,
      sdpMid: candidate.sdpMid,
      candidate: candidate.candidate
    });
  }
};

// handler of remote session description
RTCPeerConnection.prototype.onRemoteSessionCallback = function(sessionDescription, type) {
  var desc = new RTCSessionDescription({sdp: sessionDescription, type: type});
  this.setRemoteDescription(desc);
};

// handler of remote media stream
RTCPeerConnection.prototype.onRemoteStreamCallback = function(event) {
  if (typeof peer.service.onRemoteStreamListener === 'function')
    peer.service.onRemoteStreamListener(event.stream);
};

RTCPeerConnection.prototype.addCandidates = function(iceCandidates) {
  var candidate;
  for (var i = 0, len = iceCandidates.length; i < len; i++) {
    candidate = {
      sdpMLineIndex: iceCandidates[i].sdpMLineIndex,
      sdpMid: iceCandidates[i].sdpMid,
      candidate: iceCandidates[i].candidate
    };
    this.addIceCandidate(new RTCIceCandidate(candidate));
  }
};

RTCPeerConnection.prototype.onSignalingStateCallback = function() {
  // send candidates
  if (peer && peer.signalingState === 'stable' && peer.type === 'offer'){
    peer.service._sendCandidate(peer.opponentId, peer.iceCandidates);
  }
};

RTCPeerConnection.prototype.onIceConnectionStateCallback = function() {
  trace("onIceConnectionStateCallback: " + peer.iceConnectionState);
  
  var newIceConnectionState = peer.iceConnectionState;

  // read more about all states:
  // http://w3c.github.io/webrtc-pc/#idl-def-RTCIceConnectionState
  //
  // 'disconnected' happens in a case when a user has killed an application (for example, on iOS/Android via task manager).
  // So we should notify our user about it.

  // notify user about state changes
  //
  if(typeof peer.service.onSessionStateChangedListener === 'function'){
	var sessionState = null;	
	if (newIceConnectionState === 'checking'){
      sessionState = peer.service.SessionState.CONNECTING;
	} else if (newIceConnectionState === 'connected'){
      sessionState = peer.service.SessionState.CONNECTED;
	} else if (newIceConnectionState === 'failed'){
      sessionState = peer.service.SessionState.FAILED;
	} else if (newIceConnectionState === 'disconnected'){
      sessionState = peer.service.SessionState.DISCONNECTED;
	} else if (newIceConnectionState === 'closed'){
      sessionState = peer.service.SessionState.CLOSED;
	}

	if(sessionState != null){
      peer.service.onSessionStateChangedListener(sessionState);
    }
  }

  //
  if (newIceConnectionState === 'closed'){
    peer = null;
  }
};

}

/* Helpers
---------------------------------------------------------------------- */
function Helpers() {}

Helpers.prototype = {

  getUserJid: function(id, appId) {
    return id + '-' + appId + '@' + config.endpoints.chat;
  },

  getIdFromNode: function(jid) {
    if (jid.indexOf('@') < 0) return null;
    return parseInt(jid.split('@')[0].split('-')[0]);
  }

};

module.exports = WebRTCProxy;

/* Private
---------------------------------------------------------------------- */
function trace(text) {
  if (config.debug) {
    console.log('[QBWebRTC]:', text);
  }
}

function getLocalTime() {
  var arr = (new Date).toString().split(' ');
  return arr.slice(1,5).join('-');
}

function clearCallers(userId){
	var caller = callers[userId];
	if (caller){
		delete callers[userId];
	}
}


////////////////////////////////////////////////////////////////////////

function clearAnswerTimer(userId){
	var answerTimer = answerTimers[userId];
  if(answerTimer){
    clearTimeout(answerTimer);
    delete answerTimers[userId];
  }
}

function startAnswerTimer(userId, callback){
  var answerTimeInterval = config.webrtc.answerTimeInterval*1000;
  var answerTimer = setTimeout(callback, answerTimeInterval, userId);
  answerTimers[userId] = answerTimer;
}

function clearDialingTimerInterval(userId){
  var dialingTimer = dialingTimerIntervals[userId];
  if(dialingTimer){
    clearInterval(dialingTimer);
    delete dialingTimerIntervals[userId];
  }
}

function startDialingTimerInterval(userId, functionToRun){
  var dialingTimeInterval = config.webrtc.dialingTimeInterval*1000;
  var dialingTimerId = setInterval(functionToRun, dialingTimeInterval);
  dialingTimerIntervals[userId] = dialingTimerId;
}

function clearCallTimer(userId){
  var callTimer = callTimers[userId];
  if(callTimer){
    clearTimeout(callTimer);
    delete callTimers[userId];
  }
}

function startCallTimer(userId, callback){
  var answerTimeInterval = config.webrtc.answerTimeInterval*1000;
  trace("startCallTimer, answerTimeInterval: " + answerTimeInterval);
  var callTimer = setTimeout(callback, answerTimeInterval, userId);
  callTimers[userId] = callTimer;
}

////////////////////////////////////////////////////////////////////////


// Convert Data URI to Blob
function dataURItoBlob(dataURI, contentType) {
  var arr = [],
      binary = window.atob(dataURI.split(',')[1]);
  
  for (var i = 0, len = binary.length; i < len; i++) {
    arr.push(binary.charCodeAt(i));
  }
  
  return new Blob([new Uint8Array(arr)], {type: contentType});
}

// Download Blob to local file system
Blob.prototype.download = function() {
  download(this, this.name, this.type);
};

},{"../../lib/download/download.min":14,"../../lib/strophe/strophe.min":15,"../qbConfig":9,"../qbUtils":13}],9:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Configuration Module
 *
 */

var config = {
  version: '1.13.1',
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
    // bosh: 'http://chat.quickblox.com:5280',
    bosh: 'https://chat.quickblox.com:5281', // With SSL
    // websocket: 'ws://chat.quickblox.com:5290',
    websocket: 'wss://chat.quickblox.com:5291', // With SSL
    active: 2
  },
  iceServers: [
    {
      'url': 'stun:stun.l.google.com:19302'
    },
    {
      'url': 'stun:turn.quickblox.com',
      'username': 'quickblox',
      'credential': 'baccb97ba2d92d71e26eb9886da5f1e0'
    },
    {
      'url': 'turn:turn.quickblox.com:3478?transport=udp',
      'username': 'quickblox',
      'credential': 'baccb97ba2d92d71e26eb9886da5f1e0'
    },
    {
      'url': 'turn:turn.quickblox.com:3478?transport=tcp',
      'username': 'quickblox',
      'credential': 'baccb97ba2d92d71e26eb9886da5f1e0'
    },
  ],
  webrtc: {
    answerTimeInterval: 60,
    dialingTimeInterval: 5,
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
  on: {
    sessionExpired: null
  },
  ssl: true,
  timeout: null,
  debug: false,
  addISOTime: false
};

config.set = function(options) {
  Object.keys(options).forEach(function(key) {
    if(key !== 'set' && config.hasOwnProperty(key)) {
      if(typeof options[key] !== 'object') {
        config[key] = options[key]
      } else {
        Object.keys(options[key]).forEach(function(nextkey) {
          if(config[key].hasOwnProperty(nextkey))
            config[key][nextkey] = options[key][nextkey];
        });
      }
    }
  })
};

module.exports = config;

},{}],10:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Main SDK Module
 *
 */

var config = require('./qbConfig');
var isBrowser = typeof window !== "undefined";

// Actual QuickBlox API starts here
function QuickBlox() {}

QuickBlox.prototype = {

  init: function(appId, authKey, authSecret, debug) {
    if (debug && typeof debug === 'boolean') config.debug = debug;
    else if (debug && typeof debug === 'object') config.set(debug);

    var Proxy = require('./qbProxy');
    this.service = new Proxy();

    // include dependencies
    var Auth = require('./modules/qbAuth'),
        Users = require('./modules/qbUsers'),
        Chat = require('./modules/qbChat'),
        Content = require('./modules/qbContent'),
        Location = require('./modules/qbLocation'),
        Messages = require('./modules/qbMessages'),
        Data = require('./modules/qbData');

    if (isBrowser) {
      // create Strophe Connection object
      var Connection = require('./qbStrophe');
      var conn = new Connection();

      // add WebRTC API
      var WebRTC = require('./modules/qbWebRTC');
      this.webrtc = new WebRTC(this.service, conn || null);
    }
    
    this.auth = new Auth(this.service);
    this.users = new Users(this.service);
    this.chat = new Chat(this.service, this.webrtc || null, conn || null);
    this.content = new Content(this.service);
    this.location = new Location(this.service);
    this.messages = new Messages(this.service);
    this.data = new Data(this.service);
    
    // Initialization by outside token
    if (typeof appId === 'string' && !authKey && !authSecret) {
      this.service.setSession({ token: appId });
    } else {
      config.creds.appId = appId;
      config.creds.authKey = authKey;
      config.creds.authSecret = authSecret;
    }
    if(console && config.debug) console.log('QuickBlox.init', this);
  },

  getSession: function(callback) {
    this.auth.getSession(callback);
  },

  createSession: function(params, callback) {
    this.auth.createSession(params, callback);
  },

  destroySession: function(callback) {
    this.auth.destroySession(callback);
  },

  login: function(params, callback) {
    this.auth.login(params, callback);
  },

  logout: function(callback) {
    this.auth.logout(callback);
  }
  
};

var QB = new QuickBlox();
QB.QuickBlox = QuickBlox;

module.exports = QB;

},{"./modules/qbAuth":1,"./modules/qbChat":2,"./modules/qbContent":3,"./modules/qbData":4,"./modules/qbLocation":5,"./modules/qbMessages":6,"./modules/qbUsers":7,"./modules/qbWebRTC":8,"./qbConfig":9,"./qbProxy":11,"./qbStrophe":12}],11:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Proxy Module
 *
 */

var config = require('./qbConfig');
var Utils = require('./qbUtils');
var versionNum = config.version;

// For server-side applications through using npm package 'quickblox' you should include the following lines
var isBrowser = typeof window !== 'undefined';
if (!isBrowser) var request = require('request');

var ajax = isBrowser && window.jQuery && window.jQuery.ajax || isBrowser && window.Zepto && window.Zepto.ajax;
if (isBrowser && !ajax) {
  throw new Error('Quickblox requires jQuery or Zepto');
}

function ServiceProxy() {
  this.qbInst = {
    config: config,
    session: null
  };
  if (config.debug) { console.log('ServiceProxy', this.qbInst); }
}

ServiceProxy.prototype = {

  setSession: function(session) {
    this.qbInst.session = session;
  },

  getSession: function() {
    return this.qbInst.session;
  },
  
  handleResponse: function(error, response, next, retry) {
    // can add middleware here...
    var _this = this;
    if(error && typeof config.on.sessionExpired === 'function' && (error.message === 'Unauthorized' || error.status === '401 Unauthorized')) {
      config.on.sessionExpired(function(){next(error,response)}, retry);
    } else {
      if (error) {
        next(error, null);
      } else {
        if (config.addISOTime) response = Utils.injectISOTimes(response);
        next(null, response);
      }
    }
  },

  ajax: function(params, callback) {
    if (config.debug) { console.log('ServiceProxy', params.type || 'GET', params); }
    var _this = this,
        retry = function(session) { if(!!session) _this.setSession(session); _this.ajax(params, callback) };
    var ajaxCall = {
      url: params.url,
      type: params.type || 'GET',
      dataType: params.dataType || 'json',
      data: params.data || ' ',
      timeout: config.timeout,
      beforeSend: function(jqXHR, settings) {
        if (config.debug) { console.log('ServiceProxy.ajax beforeSend', jqXHR, settings); }
        if (settings.url.indexOf('://' + config.endpoints.s3Bucket) === -1) {
          if (config.debug) { console.log('setting headers on request to ' + settings.url); }
          if (_this.qbInst.session && _this.qbInst.session.token) {
            jqXHR.setRequestHeader('QB-Token', _this.qbInst.session.token);
            jqXHR.setRequestHeader('QB-SDK', 'JS ' + versionNum + ' - Client');
          }
        }
      },
      success: function(data, status, jqHXR) {
        if (config.debug) { console.log('ServiceProxy.ajax success', data); }
        if (params.url.indexOf(config.urls.session) === -1) _this.handleResponse(null, data, callback, retry);
        else callback(null, data);
      },
      error: function(jqHXR, status, error) {
        if (config.debug) { console.log('ServiceProxy.ajax error', jqHXR.status, error, jqHXR.responseText); }
        var errorMsg = {
          code: jqHXR.status,
          status: status,
          message: error,
          detail: jqHXR.responseText
        };
        if (params.url.indexOf(config.urls.session) === -1) _this.handleResponse(errorMsg, null, callback, retry);
        else callback(errorMsg, null);
      }
    };
  
    if(!isBrowser) {
      
      var isJSONRequest = ajaxCall.dataType === 'json',
        makingQBRequest = params.url.indexOf('://' + config.endpoints.s3Bucket) === -1 && 
                          _this.qbInst && 
                          _this.qbInst.session && 
                          _this.qbInst.session.token ||
                          false;
                          
      var qbRequest = {
        url: ajaxCall.url,
        method: ajaxCall.type,
        timeout: config.timeout,
        json: isJSONRequest ? ajaxCall.data : null,
        form: !isJSONRequest ? ajaxCall.data : null,
        headers: makingQBRequest ? { 'QB-Token' : _this.qbInst.session.token, 'QB-SDK': 'JS ' + versionNum + ' - Server' } : null
      };
          
      var requestCallback = function(error, response, body) {
        if(error || response.statusCode !== 200 && response.statusCode !== 201 && response.statusCode !== 202) {
          var errorMsg;
          try {
            errorMsg = {
              code: response && response.statusCode || error && error.code,
              status: response && response.headers && response.headers.status || 'error',
              message: body || error && error.errno,
              detail: body && body.errors || error && error.syscall
            };
          } catch(e) {
            errorMsg = error;
          }
          if (qbRequest.url.indexOf(config.urls.session) === -1) _this.handleResponse(errorMsg, null, callback, retry);
          else callback(errorMsg, null);
        } else {
          if (qbRequest.url.indexOf(config.urls.session) === -1) _this.handleResponse(null, body, callback, retry);
          else callback(null, body);
        }
      };

    }
    
    // Optional - for example 'multipart/form-data' when sending a file.
    // Default is 'application/x-www-form-urlencoded; charset=UTF-8'
    if (typeof params.contentType === 'boolean' || typeof params.contentType === 'string') { ajaxCall.contentType = params.contentType; }
    if (typeof params.processData === 'boolean') { ajaxCall.processData = params.processData; }
    
    if(isBrowser) {
      ajax( ajaxCall );
    } else {
      request(qbRequest, requestCallback);
    }
  }
  
};

module.exports = ServiceProxy;

},{"./qbConfig":9,"./qbUtils":13,"request":20}],12:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Strophe Connection Object
 *
 */

require('../lib/strophe/strophe.min');
var config = require('./qbConfig');

function Connection() {
  var protocol = config.chatProtocol.active === 1 ? config.chatProtocol.bosh : config.chatProtocol.websocket;
  var conn = new Strophe.Connection(protocol);
  // if (config.debug) {
    if (config.chatProtocol.active === 1) {
      conn.xmlInput = function(data) { if (data.childNodes[0]) {for (var i = 0, len = data.childNodes.length; i < len; i++) { console.log('[QBChat RECV]:', data.childNodes[i]); }} };
      conn.xmlOutput = function(data) { if (data.childNodes[0]) {for (var i = 0, len = data.childNodes.length; i < len; i++) { console.log('[QBChat SENT]:', data.childNodes[i]); }} };
    } else {
      conn.xmlInput = function(data) { console.log('[QBChat RECV]:', data); };
      conn.xmlOutput = function(data) { console.log('[QBChat SENT]:', data); };
    }
  // }

  return conn;
}

module.exports = Connection;

},{"../lib/strophe/strophe.min":15,"./qbConfig":9}],13:[function(require,module,exports){
/*
 * QuickBlox JavaScript SDK
 *
 * Utilities
 *
 */

var config = require('./qbConfig');

// The object for type MongoDB.Bson.ObjectId
// http://docs.mongodb.org/manual/reference/object-id/
var ObjectId = {
  machine: Math.floor(Math.random() * 16777216).toString(16),
  pid: Math.floor(Math.random() * 32767).toString(16),
  increment: 0
};

var Utils = {
  randomNonce: function() {
    return Math.floor(Math.random() * 10000);
  },

  unixTime: function() {
    return Math.floor(Date.now() / 1000);
  },

  getUrl: function(base, id) {
    var protocol = config.ssl ? 'https://' : 'http://';
    var resource = id ? '/' + id : '';
    return protocol + config.endpoints.api + '/' + base + resource + config.urls.type;
  },

  // Generating BSON ObjectId and converting it to a 24 character string representation
  // Changed from https://github.com/justaprogrammer/ObjectId.js/blob/master/src/main/javascript/Objectid.js
  getBsonObjectId: function() {
    var timestamp = this.unixTime().toString(16),
        increment = (ObjectId.increment++).toString(16);

    if (increment > 0xffffff) ObjectId.increment = 0;

    return '00000000'.substr(0, 8 - timestamp.length) + timestamp +
           '000000'.substr(0, 6 - ObjectId.machine.length) + ObjectId.machine +
           '0000'.substr(0, 4 - ObjectId.pid.length) + ObjectId.pid +
           '000000'.substr(0, 6 - increment.length) + increment;
  },

  injectISOTimes: function(data) {
    if (data.created_at) {
      if (typeof data.created_at === 'number') data.iso_created_at = new Date(data.created_at * 1000).toISOString();
      if (typeof data.updated_at === 'number') data.iso_updated_at = new Date(data.updated_at * 1000).toISOString();
    }
    else if (data.items) {
      for (var i = 0, len = data.items.length; i < len; ++i) {
        if (typeof data.items[i].created_at === 'number') data.items[i].iso_created_at = new Date(data.items[i].created_at * 1000).toISOString();
        if (typeof data.items[i].updated_at === 'number') data.items[i].iso_updated_at = new Date(data.items[i].updated_at * 1000).toISOString();
      }
    }
    return data;
  }

};

module.exports = Utils;

},{"./qbConfig":9}],14:[function(require,module,exports){
function download(data,strFileName,strMimeType){function d2b(u){var p=u.split(/[:;,]/),t=p[1],dec="base64"==p[2]?atob:decodeURIComponent,bin=dec(p.pop()),mx=bin.length,i=0,uia=new Uint8Array(mx);for(i;mx>i;++i)uia[i]=bin.charCodeAt(i);return new B([uia],{type:t})}function saver(url,winMode){if("download"in a)return a.href=url,a.setAttribute("download",fn),a.innerHTML="downloading...",D.body.appendChild(a),setTimeout(function(){a.click(),D.body.removeChild(a),winMode===!0&&setTimeout(function(){self.URL.revokeObjectURL(a.href)},250)},66),!0;if("undefined"!=typeof safari)return url="data:"+url.replace(/^data:([\w\/\-\+]+)/,u),window.open(url)||confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")&&(location.href=url),!0;var f=D.createElement("iframe");D.body.appendChild(f),winMode||(url="data:"+url.replace(/^data:([\w\/\-\+]+)/,u)),f.src=url,setTimeout(function(){D.body.removeChild(f)},333)}var self=window,u="application/octet-stream",m=strMimeType||u,x=data,D=document,a=D.createElement("a"),z=function(a){return String(a)},B=self.Blob||self.MozBlob||self.WebKitBlob||z;B=B.call?B.bind(self):Blob;var blob,fr,fn=strFileName||"download";if("true"===String(this)&&(x=[x,m],m=x[0],x=x[1]),String(x).match(/^data\:[\w+\-]+\/[\w+\-]+[,;]/))return navigator.msSaveBlob?navigator.msSaveBlob(d2b(x),fn):saver(x);if(blob=x instanceof B?x:new B([x],{type:m}),navigator.msSaveBlob)return navigator.msSaveBlob(blob,fn);if(self.URL)saver(self.URL.createObjectURL(blob),!0);else{if("string"==typeof blob||blob.constructor===z)try{return saver("data:"+m+";base64,"+self.btoa(blob))}catch(y){return saver("data:"+m+","+encodeURIComponent(blob))}fr=new FileReader,fr.onload=function(){saver(this.result)},fr.readAsDataURL(blob)}return!0}module.exports=download;
},{}],15:[function(require,module,exports){
/*! strophe.js v1.2.2 - built on 20-06-2015 */
!function(a){return function(a,b){"function"==typeof define&&define.amd?define("strophe-base64",function(){return b()}):a.Base64=b()}(this,function(){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",b={encode:function(b){var c,d,e,f,g,h,i,j="",k=0;do c=b.charCodeAt(k++),d=b.charCodeAt(k++),e=b.charCodeAt(k++),f=c>>2,g=(3&c)<<4|d>>4,h=(15&d)<<2|e>>6,i=63&e,isNaN(d)?(g=(3&c)<<4,h=i=64):isNaN(e)&&(i=64),j=j+a.charAt(f)+a.charAt(g)+a.charAt(h)+a.charAt(i);while(k<b.length);return j},decode:function(b){var c,d,e,f,g,h,i,j="",k=0;b=b.replace(/[^A-Za-z0-9\+\/\=]/g,"");do f=a.indexOf(b.charAt(k++)),g=a.indexOf(b.charAt(k++)),h=a.indexOf(b.charAt(k++)),i=a.indexOf(b.charAt(k++)),c=f<<2|g>>4,d=(15&g)<<4|h>>2,e=(3&h)<<6|i,j+=String.fromCharCode(c),64!=h&&(j+=String.fromCharCode(d)),64!=i&&(j+=String.fromCharCode(e));while(k<b.length);return j}};return b}),function(a,b){"function"==typeof define&&define.amd?define("strophe-sha1",function(){return b()}):a.SHA1=b()}(this,function(){function a(a,d){a[d>>5]|=128<<24-d%32,a[(d+64>>9<<4)+15]=d;var g,h,i,j,k,l,m,n,o=new Array(80),p=1732584193,q=-271733879,r=-1732584194,s=271733878,t=-1009589776;for(g=0;g<a.length;g+=16){for(j=p,k=q,l=r,m=s,n=t,h=0;80>h;h++)16>h?o[h]=a[g+h]:o[h]=f(o[h-3]^o[h-8]^o[h-14]^o[h-16],1),i=e(e(f(p,5),b(h,q,r,s)),e(e(t,o[h]),c(h))),t=s,s=r,r=f(q,30),q=p,p=i;p=e(p,j),q=e(q,k),r=e(r,l),s=e(s,m),t=e(t,n)}return[p,q,r,s,t]}function b(a,b,c,d){return 20>a?b&c|~b&d:40>a?b^c^d:60>a?b&c|b&d|c&d:b^c^d}function c(a){return 20>a?1518500249:40>a?1859775393:60>a?-1894007588:-899497514}function d(b,c){var d=g(b);d.length>16&&(d=a(d,8*b.length));for(var e=new Array(16),f=new Array(16),h=0;16>h;h++)e[h]=909522486^d[h],f[h]=1549556828^d[h];var i=a(e.concat(g(c)),512+8*c.length);return a(f.concat(i),672)}function e(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function f(a,b){return a<<b|a>>>32-b}function g(a){for(var b=[],c=255,d=0;d<8*a.length;d+=8)b[d>>5]|=(a.charCodeAt(d/8)&c)<<24-d%32;return b}function h(a){for(var b="",c=255,d=0;d<32*a.length;d+=8)b+=String.fromCharCode(a[d>>5]>>>24-d%32&c);return b}function i(a){for(var b,c,d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",e="",f=0;f<4*a.length;f+=3)for(b=(a[f>>2]>>8*(3-f%4)&255)<<16|(a[f+1>>2]>>8*(3-(f+1)%4)&255)<<8|a[f+2>>2]>>8*(3-(f+2)%4)&255,c=0;4>c;c++)e+=8*f+6*c>32*a.length?"=":d.charAt(b>>6*(3-c)&63);return e}return{b64_hmac_sha1:function(a,b){return i(d(a,b))},b64_sha1:function(b){return i(a(g(b),8*b.length))},binb2str:h,core_hmac_sha1:d,str_hmac_sha1:function(a,b){return h(d(a,b))},str_sha1:function(b){return h(a(g(b),8*b.length))}}}),function(a,b){"function"==typeof define&&define.amd?define("strophe-md5",function(){return b()}):a.MD5=b()}(this,function(a){var b=function(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c},c=function(a,b){return a<<b|a>>>32-b},d=function(a){for(var b=[],c=0;c<8*a.length;c+=8)b[c>>5]|=(255&a.charCodeAt(c/8))<<c%32;return b},e=function(a){for(var b="",c=0;c<32*a.length;c+=8)b+=String.fromCharCode(a[c>>5]>>>c%32&255);return b},f=function(a){for(var b="0123456789abcdef",c="",d=0;d<4*a.length;d++)c+=b.charAt(a[d>>2]>>d%4*8+4&15)+b.charAt(a[d>>2]>>d%4*8&15);return c},g=function(a,d,e,f,g,h){return b(c(b(b(d,a),b(f,h)),g),e)},h=function(a,b,c,d,e,f,h){return g(b&c|~b&d,a,b,e,f,h)},i=function(a,b,c,d,e,f,h){return g(b&d|c&~d,a,b,e,f,h)},j=function(a,b,c,d,e,f,h){return g(b^c^d,a,b,e,f,h)},k=function(a,b,c,d,e,f,h){return g(c^(b|~d),a,b,e,f,h)},l=function(a,c){a[c>>5]|=128<<c%32,a[(c+64>>>9<<4)+14]=c;for(var d,e,f,g,l=1732584193,m=-271733879,n=-1732584194,o=271733878,p=0;p<a.length;p+=16)d=l,e=m,f=n,g=o,l=h(l,m,n,o,a[p+0],7,-680876936),o=h(o,l,m,n,a[p+1],12,-389564586),n=h(n,o,l,m,a[p+2],17,606105819),m=h(m,n,o,l,a[p+3],22,-1044525330),l=h(l,m,n,o,a[p+4],7,-176418897),o=h(o,l,m,n,a[p+5],12,1200080426),n=h(n,o,l,m,a[p+6],17,-1473231341),m=h(m,n,o,l,a[p+7],22,-45705983),l=h(l,m,n,o,a[p+8],7,1770035416),o=h(o,l,m,n,a[p+9],12,-1958414417),n=h(n,o,l,m,a[p+10],17,-42063),m=h(m,n,o,l,a[p+11],22,-1990404162),l=h(l,m,n,o,a[p+12],7,1804603682),o=h(o,l,m,n,a[p+13],12,-40341101),n=h(n,o,l,m,a[p+14],17,-1502002290),m=h(m,n,o,l,a[p+15],22,1236535329),l=i(l,m,n,o,a[p+1],5,-165796510),o=i(o,l,m,n,a[p+6],9,-1069501632),n=i(n,o,l,m,a[p+11],14,643717713),m=i(m,n,o,l,a[p+0],20,-373897302),l=i(l,m,n,o,a[p+5],5,-701558691),o=i(o,l,m,n,a[p+10],9,38016083),n=i(n,o,l,m,a[p+15],14,-660478335),m=i(m,n,o,l,a[p+4],20,-405537848),l=i(l,m,n,o,a[p+9],5,568446438),o=i(o,l,m,n,a[p+14],9,-1019803690),n=i(n,o,l,m,a[p+3],14,-187363961),m=i(m,n,o,l,a[p+8],20,1163531501),l=i(l,m,n,o,a[p+13],5,-1444681467),o=i(o,l,m,n,a[p+2],9,-51403784),n=i(n,o,l,m,a[p+7],14,1735328473),m=i(m,n,o,l,a[p+12],20,-1926607734),l=j(l,m,n,o,a[p+5],4,-378558),o=j(o,l,m,n,a[p+8],11,-2022574463),n=j(n,o,l,m,a[p+11],16,1839030562),m=j(m,n,o,l,a[p+14],23,-35309556),l=j(l,m,n,o,a[p+1],4,-1530992060),o=j(o,l,m,n,a[p+4],11,1272893353),n=j(n,o,l,m,a[p+7],16,-155497632),m=j(m,n,o,l,a[p+10],23,-1094730640),l=j(l,m,n,o,a[p+13],4,681279174),o=j(o,l,m,n,a[p+0],11,-358537222),n=j(n,o,l,m,a[p+3],16,-722521979),m=j(m,n,o,l,a[p+6],23,76029189),l=j(l,m,n,o,a[p+9],4,-640364487),o=j(o,l,m,n,a[p+12],11,-421815835),n=j(n,o,l,m,a[p+15],16,530742520),m=j(m,n,o,l,a[p+2],23,-995338651),l=k(l,m,n,o,a[p+0],6,-198630844),o=k(o,l,m,n,a[p+7],10,1126891415),n=k(n,o,l,m,a[p+14],15,-1416354905),m=k(m,n,o,l,a[p+5],21,-57434055),l=k(l,m,n,o,a[p+12],6,1700485571),o=k(o,l,m,n,a[p+3],10,-1894986606),n=k(n,o,l,m,a[p+10],15,-1051523),m=k(m,n,o,l,a[p+1],21,-2054922799),l=k(l,m,n,o,a[p+8],6,1873313359),o=k(o,l,m,n,a[p+15],10,-30611744),n=k(n,o,l,m,a[p+6],15,-1560198380),m=k(m,n,o,l,a[p+13],21,1309151649),l=k(l,m,n,o,a[p+4],6,-145523070),o=k(o,l,m,n,a[p+11],10,-1120210379),n=k(n,o,l,m,a[p+2],15,718787259),m=k(m,n,o,l,a[p+9],21,-343485551),l=b(l,d),m=b(m,e),n=b(n,f),o=b(o,g);return[l,m,n,o]},m={hexdigest:function(a){return f(l(d(a),8*a.length))},hash:function(a){return e(l(d(a),8*a.length))}};return m}),Function.prototype.bind||(Function.prototype.bind=function(a){var b=this,c=Array.prototype.slice,d=Array.prototype.concat,e=c.call(arguments,1);return function(){return b.apply(a?a:this,d.call(e,c.call(arguments,0)))}}),Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a){var b=this.length,c=Number(arguments[1])||0;for(c=0>c?Math.ceil(c):Math.floor(c),0>c&&(c+=b);b>c;c++)if(c in this&&this[c]===a)return c;return-1}),function(a,b){if("function"==typeof define&&define.amd)define("strophe-core",["strophe-sha1","strophe-base64","strophe-md5","strophe-polyfill"],function(){return b.apply(this,arguments)});else{var c=b(a.SHA1,a.Base64,a.MD5);window.Strophe=c.Strophe,window.$build=c.$build,window.$iq=c.$iq,window.$msg=c.$msg,window.$pres=c.$pres,window.SHA1=c.SHA1,window.Base64=c.Base64,window.MD5=c.MD5,window.b64_hmac_sha1=c.SHA1.b64_hmac_sha1,window.b64_sha1=c.SHA1.b64_sha1,window.str_hmac_sha1=c.SHA1.str_hmac_sha1,window.str_sha1=c.SHA1.str_sha1}}(this,function(a,b,c){function d(a,b){return new h.Builder(a,b)}function e(a){return new h.Builder("message",a)}function f(a){return new h.Builder("iq",a)}function g(a){return new h.Builder("presence",a)}var h;return h={VERSION:"1.2.2",NS:{HTTPBIND:"http://jabber.org/protocol/httpbind",BOSH:"urn:xmpp:xbosh",CLIENT:"jabber:client",AUTH:"jabber:iq:auth",ROSTER:"jabber:iq:roster",PROFILE:"jabber:iq:profile",DISCO_INFO:"http://jabber.org/protocol/disco#info",DISCO_ITEMS:"http://jabber.org/protocol/disco#items",MUC:"http://jabber.org/protocol/muc",SASL:"urn:ietf:params:xml:ns:xmpp-sasl",STREAM:"http://etherx.jabber.org/streams",FRAMING:"urn:ietf:params:xml:ns:xmpp-framing",BIND:"urn:ietf:params:xml:ns:xmpp-bind",SESSION:"urn:ietf:params:xml:ns:xmpp-session",VERSION:"jabber:iq:version",STANZAS:"urn:ietf:params:xml:ns:xmpp-stanzas",XHTML_IM:"http://jabber.org/protocol/xhtml-im",XHTML:"http://www.w3.org/1999/xhtml"},XHTML:{tags:["a","blockquote","br","cite","em","img","li","ol","p","span","strong","ul","body"],attributes:{a:["href"],blockquote:["style"],br:[],cite:["style"],em:[],img:["src","alt","style","height","width"],li:["style"],ol:["style"],p:["style"],span:["style"],strong:[],ul:["style"],body:[]},css:["background-color","color","font-family","font-size","font-style","font-weight","margin-left","margin-right","text-align","text-decoration"],validTag:function(a){for(var b=0;b<h.XHTML.tags.length;b++)if(a==h.XHTML.tags[b])return!0;return!1},validAttribute:function(a,b){if("undefined"!=typeof h.XHTML.attributes[a]&&h.XHTML.attributes[a].length>0)for(var c=0;c<h.XHTML.attributes[a].length;c++)if(b==h.XHTML.attributes[a][c])return!0;return!1},validCSS:function(a){for(var b=0;b<h.XHTML.css.length;b++)if(a==h.XHTML.css[b])return!0;return!1}},Status:{ERROR:0,CONNECTING:1,CONNFAIL:2,AUTHENTICATING:3,AUTHFAIL:4,CONNECTED:5,DISCONNECTED:6,DISCONNECTING:7,ATTACHED:8,REDIRECT:9},LogLevel:{DEBUG:0,INFO:1,WARN:2,ERROR:3,FATAL:4},ElementType:{NORMAL:1,TEXT:3,CDATA:4,FRAGMENT:11},TIMEOUT:1.1,SECONDARY_TIMEOUT:.1,addNamespace:function(a,b){h.NS[a]=b},forEachChild:function(a,b,c){var d,e;for(d=0;d<a.childNodes.length;d++)e=a.childNodes[d],e.nodeType!=h.ElementType.NORMAL||b&&!this.isTagEqual(e,b)||c(e)},isTagEqual:function(a,b){return a.tagName==b},_xmlGenerator:null,_makeGenerator:function(){var a;return void 0===document.implementation.createDocument||document.implementation.createDocument&&document.documentMode&&document.documentMode<10?(a=this._getIEXmlDom(),a.appendChild(a.createElement("strophe"))):a=document.implementation.createDocument("jabber:client","strophe",null),a},xmlGenerator:function(){return h._xmlGenerator||(h._xmlGenerator=h._makeGenerator()),h._xmlGenerator},_getIEXmlDom:function(){for(var a=null,b=["Msxml2.DOMDocument.6.0","Msxml2.DOMDocument.5.0","Msxml2.DOMDocument.4.0","MSXML2.DOMDocument.3.0","MSXML2.DOMDocument","MSXML.DOMDocument","Microsoft.XMLDOM"],c=0;c<b.length&&null===a;c++)try{a=new ActiveXObject(b[c])}catch(d){a=null}return a},xmlElement:function(a){if(!a)return null;var b,c,d,e=h.xmlGenerator().createElement(a);for(b=1;b<arguments.length;b++){var f=arguments[b];if(f)if("string"==typeof f||"number"==typeof f)e.appendChild(h.xmlTextNode(f));else if("object"==typeof f&&"function"==typeof f.sort)for(c=0;c<f.length;c++){var g=f[c];"object"==typeof g&&"function"==typeof g.sort&&void 0!==g[1]&&e.setAttribute(g[0],g[1])}else if("object"==typeof f)for(d in f)f.hasOwnProperty(d)&&void 0!==f[d]&&e.setAttribute(d,f[d])}return e},xmlescape:function(a){return a=a.replace(/\&/g,"&amp;"),a=a.replace(/</g,"&lt;"),a=a.replace(/>/g,"&gt;"),a=a.replace(/'/g,"&apos;"),a=a.replace(/"/g,"&quot;")},xmlunescape:function(a){return a=a.replace(/\&amp;/g,"&"),a=a.replace(/&lt;/g,"<"),a=a.replace(/&gt;/g,">"),a=a.replace(/&apos;/g,"'"),a=a.replace(/&quot;/g,'"')},xmlTextNode:function(a){return h.xmlGenerator().createTextNode(a)},xmlHtmlNode:function(a){var b;if(window.DOMParser){var c=new DOMParser;b=c.parseFromString(a,"text/xml")}else b=new ActiveXObject("Microsoft.XMLDOM"),b.async="false",b.loadXML(a);return b},getText:function(a){if(!a)return null;var b="";0===a.childNodes.length&&a.nodeType==h.ElementType.TEXT&&(b+=a.nodeValue);for(var c=0;c<a.childNodes.length;c++)a.childNodes[c].nodeType==h.ElementType.TEXT&&(b+=a.childNodes[c].nodeValue);return h.xmlescape(b)},copyElement:function(a){var b,c;if(a.nodeType==h.ElementType.NORMAL){for(c=h.xmlElement(a.tagName),b=0;b<a.attributes.length;b++)c.setAttribute(a.attributes[b].nodeName,a.attributes[b].value);for(b=0;b<a.childNodes.length;b++)c.appendChild(h.copyElement(a.childNodes[b]))}else a.nodeType==h.ElementType.TEXT&&(c=h.xmlGenerator().createTextNode(a.nodeValue));return c},createHtml:function(a){var b,c,d,e,f,g,i,j,k,l,m;if(a.nodeType==h.ElementType.NORMAL)if(e=a.nodeName.toLowerCase(),h.XHTML.validTag(e))try{for(c=h.xmlElement(e),b=0;b<h.XHTML.attributes[e].length;b++)if(f=h.XHTML.attributes[e][b],g=a.getAttribute(f),"undefined"!=typeof g&&null!==g&&""!==g&&g!==!1&&0!==g)if("style"==f&&"object"==typeof g&&"undefined"!=typeof g.cssText&&(g=g.cssText),"style"==f){for(i=[],j=g.split(";"),d=0;d<j.length;d++)k=j[d].split(":"),l=k[0].replace(/^\s*/,"").replace(/\s*$/,"").toLowerCase(),h.XHTML.validCSS(l)&&(m=k[1].replace(/^\s*/,"").replace(/\s*$/,""),i.push(l+": "+m));i.length>0&&(g=i.join("; "),c.setAttribute(f,g))}else c.setAttribute(f,g);for(b=0;b<a.childNodes.length;b++)c.appendChild(h.createHtml(a.childNodes[b]))}catch(n){c=h.xmlTextNode("")}else for(c=h.xmlGenerator().createDocumentFragment(),b=0;b<a.childNodes.length;b++)c.appendChild(h.createHtml(a.childNodes[b]));else if(a.nodeType==h.ElementType.FRAGMENT)for(c=h.xmlGenerator().createDocumentFragment(),b=0;b<a.childNodes.length;b++)c.appendChild(h.createHtml(a.childNodes[b]));else a.nodeType==h.ElementType.TEXT&&(c=h.xmlTextNode(a.nodeValue));return c},escapeNode:function(a){return"string"!=typeof a?a:a.replace(/^\s+|\s+$/g,"").replace(/\\/g,"\\5c").replace(/ /g,"\\20").replace(/\"/g,"\\22").replace(/\&/g,"\\26").replace(/\'/g,"\\27").replace(/\//g,"\\2f").replace(/:/g,"\\3a").replace(/</g,"\\3c").replace(/>/g,"\\3e").replace(/@/g,"\\40")},unescapeNode:function(a){return"string"!=typeof a?a:a.replace(/\\20/g," ").replace(/\\22/g,'"').replace(/\\26/g,"&").replace(/\\27/g,"'").replace(/\\2f/g,"/").replace(/\\3a/g,":").replace(/\\3c/g,"<").replace(/\\3e/g,">").replace(/\\40/g,"@").replace(/\\5c/g,"\\")},getNodeFromJid:function(a){return a.indexOf("@")<0?null:a.split("@")[0]},getDomainFromJid:function(a){var b=h.getBareJidFromJid(a);if(b.indexOf("@")<0)return b;var c=b.split("@");return c.splice(0,1),c.join("@")},getResourceFromJid:function(a){var b=a.split("/");return b.length<2?null:(b.splice(0,1),b.join("/"))},getBareJidFromJid:function(a){return a?a.split("/")[0]:null},log:function(a,b){},debug:function(a){this.log(this.LogLevel.DEBUG,a)},info:function(a){this.log(this.LogLevel.INFO,a)},warn:function(a){this.log(this.LogLevel.WARN,a)},error:function(a){this.log(this.LogLevel.ERROR,a)},fatal:function(a){this.log(this.LogLevel.FATAL,a)},serialize:function(a){var b;if(!a)return null;"function"==typeof a.tree&&(a=a.tree());var c,d,e=a.nodeName;for(a.getAttribute("_realname")&&(e=a.getAttribute("_realname")),b="<"+e,c=0;c<a.attributes.length;c++)"_realname"!=a.attributes[c].nodeName&&(b+=" "+a.attributes[c].nodeName+"='"+a.attributes[c].value.replace(/&/g,"&amp;").replace(/\'/g,"&apos;").replace(/>/g,"&gt;").replace(/</g,"&lt;")+"'");if(a.childNodes.length>0){for(b+=">",c=0;c<a.childNodes.length;c++)switch(d=a.childNodes[c],d.nodeType){case h.ElementType.NORMAL:b+=h.serialize(d);break;case h.ElementType.TEXT:b+=h.xmlescape(d.nodeValue);break;case h.ElementType.CDATA:b+="<![CDATA["+d.nodeValue+"]]>"}b+="</"+e+">"}else b+="/>";return b},_requestId:0,_connectionPlugins:{},addConnectionPlugin:function(a,b){h._connectionPlugins[a]=b}},h.Builder=function(a,b){("presence"==a||"message"==a||"iq"==a)&&(b&&!b.xmlns?b.xmlns=h.NS.CLIENT:b||(b={xmlns:h.NS.CLIENT})),this.nodeTree=h.xmlElement(a,b),this.node=this.nodeTree},h.Builder.prototype={tree:function(){return this.nodeTree},toString:function(){return h.serialize(this.nodeTree)},up:function(){return this.node=this.node.parentNode,this},attrs:function(a){for(var b in a)a.hasOwnProperty(b)&&(void 0===a[b]?this.node.removeAttribute(b):this.node.setAttribute(b,a[b]));return this},c:function(a,b,c){var d=h.xmlElement(a,b,c);return this.node.appendChild(d),"string"!=typeof c&&(this.node=d),this},cnode:function(a){var b,c=h.xmlGenerator();try{b=void 0!==c.importNode}catch(d){b=!1}var e=b?c.importNode(a,!0):h.copyElement(a);return this.node.appendChild(e),this.node=e,this},t:function(a){var b=h.xmlTextNode(a);return this.node.appendChild(b),this},h:function(a){var b=document.createElement("body");b.innerHTML=a;for(var c=h.createHtml(b);c.childNodes.length>0;)this.node.appendChild(c.childNodes[0]);return this}},h.Handler=function(a,b,c,d,e,f,g){this.handler=a,this.ns=b,this.name=c,this.type=d,this.id=e,this.options=g||{matchBare:!1},this.options.matchBare||(this.options.matchBare=!1),this.options.matchBare?this.from=f?h.getBareJidFromJid(f):null:this.from=f,this.user=!0},h.Handler.prototype={isMatch:function(a){var b,c=null;if(c=this.options.matchBare?h.getBareJidFromJid(a.getAttribute("from")):a.getAttribute("from"),b=!1,this.ns){var d=this;h.forEachChild(a,null,function(a){a.getAttribute("xmlns")==d.ns&&(b=!0)}),b=b||a.getAttribute("xmlns")==this.ns}else b=!0;var e=a.getAttribute("type");return!b||this.name&&!h.isTagEqual(a,this.name)||this.type&&(Array.isArray(this.type)?-1==this.type.indexOf(e):e!=this.type)||this.id&&a.getAttribute("id")!=this.id||this.from&&c!=this.from?!1:!0},run:function(a){var b=null;try{b=this.handler(a)}catch(c){throw c.sourceURL?h.fatal("error: "+this.handler+" "+c.sourceURL+":"+c.line+" - "+c.name+": "+c.message):c.fileName?("undefined"!=typeof console&&(console.trace(),console.error(this.handler," - error - ",c,c.message)),h.fatal("error: "+this.handler+" "+c.fileName+":"+c.lineNumber+" - "+c.name+": "+c.message)):h.fatal("error: "+c.message+"\n"+c.stack),c}return b},toString:function(){return"{Handler: "+this.handler+"("+this.name+","+this.id+","+this.ns+")}"}},h.TimedHandler=function(a,b){this.period=a,this.handler=b,this.lastCalled=(new Date).getTime(),this.user=!0},h.TimedHandler.prototype={run:function(){return this.lastCalled=(new Date).getTime(),this.handler()},reset:function(){this.lastCalled=(new Date).getTime()},toString:function(){return"{TimedHandler: "+this.handler+"("+this.period+")}"}},h.Connection=function(a,b){this.service=a,this.options=b||{};var c=this.options.protocol||"";0===a.indexOf("ws:")||0===a.indexOf("wss:")||0===c.indexOf("ws")?this._proto=new h.Websocket(this):this._proto=new h.Bosh(this),this.jid="",this.domain=null,this.features=null,this._sasl_data={},this.do_session=!1,this.do_bind=!1,this.timedHandlers=[],this.handlers=[],this.removeTimeds=[],this.removeHandlers=[],this.addTimeds=[],this.addHandlers=[],this._authentication={},this._idleTimeout=null,this._disconnectTimeout=null,this.authenticated=!1,this.connected=!1,this.disconnecting=!1,this.do_authentication=!0,this.paused=!1,this.restored=!1,this._data=[],this._uniqueId=0,this._sasl_success_handler=null,this._sasl_failure_handler=null,this._sasl_challenge_handler=null,this.maxRetries=5,this._idleTimeout=setTimeout(this._onIdle.bind(this),100);for(var d in h._connectionPlugins)if(h._connectionPlugins.hasOwnProperty(d)){var e=h._connectionPlugins[d],f=function(){};f.prototype=e,this[d]=new f,this[d].init(this)}},h.Connection.prototype={reset:function(){this._proto._reset(),this.do_session=!1,this.do_bind=!1,this.timedHandlers=[],this.handlers=[],this.removeTimeds=[],this.removeHandlers=[],this.addTimeds=[],this.addHandlers=[],this._authentication={},this.authenticated=!1,this.connected=!1,this.disconnecting=!1,this.restored=!1,this._data=[],this._requests=[],this._uniqueId=0},pause:function(){this.paused=!0},resume:function(){this.paused=!1},getUniqueId:function(a){return"string"==typeof a||"number"==typeof a?++this._uniqueId+":"+a:++this._uniqueId+""},connect:function(a,b,c,d,e,f,g){this.jid=a,this.authzid=h.getBareJidFromJid(this.jid),this.authcid=g||h.getNodeFromJid(this.jid),this.pass=b,this.servtype="xmpp",this.connect_callback=c,this.disconnecting=!1,this.connected=!1,this.authenticated=!1,this.restored=!1,this.domain=h.getDomainFromJid(this.jid),this._changeConnectStatus(h.Status.CONNECTING,null),this._proto._connect(d,e,f)},attach:function(a,b,c,d,e,f,g){if(!(this._proto instanceof h.Bosh))throw{name:"StropheSessionError",message:'The "attach" method can only be used with a BOSH connection.'};this._proto._attach(a,b,c,d,e,f,g)},restore:function(a,b,c,d,e){if(!this._sessionCachingSupported())throw{name:"StropheSessionError",message:'The "restore" method can only be used with a BOSH connection.'};this._proto._restore(a,b,c,d,e)},_sessionCachingSupported:function(){if(this._proto instanceof h.Bosh){if(!JSON)return!1;try{window.sessionStorage.setItem("_strophe_","_strophe_"),window.sessionStorage.removeItem("_strophe_")}catch(a){return!1}return!0}return!1},xmlInput:function(a){},xmlOutput:function(a){},rawInput:function(a){},rawOutput:function(a){},send:function(a){if(null!==a){if("function"==typeof a.sort)for(var b=0;b<a.length;b++)this._queueData(a[b]);else this._queueData("function"==typeof a.tree?a.tree():a);this._proto._send()}},flush:function(){clearTimeout(this._idleTimeout),this._onIdle()},sendIQ:function(a,b,c,d){var e=null,f=this;"function"==typeof a.tree&&(a=a.tree());var g=a.getAttribute("id");g||(g=this.getUniqueId("sendIQ"),a.setAttribute("id",g));var i=a.getAttribute("to"),j=this.jid,k=this.addHandler(function(a){e&&f.deleteTimedHandler(e);var d=!1,g=a.getAttribute("from");if((g===i||null===i&&(g===h.getBareJidFromJid(j)||g===h.getDomainFromJid(j)||g===j))&&(d=!0),!d)throw{name:"StropheError",message:"Got answer to IQ from wrong jid:"+g+"\nExpected jid: "+i};var k=a.getAttribute("type");if("result"==k)b&&b(a);else{if("error"!=k)throw{name:"StropheError",message:"Got bad IQ type of "+k};c&&c(a)}},null,"iq",["error","result"],g);return d&&(e=this.addTimedHandler(d,function(){return f.deleteHandler(k),c&&c(null),!1})),this.send(a),g},_queueData:function(a){if(null===a||!a.tagName||!a.childNodes)throw{name:"StropheError",message:"Cannot queue non-DOMElement."};this._data.push(a)},_sendRestart:function(){this._data.push("restart"),this._proto._sendRestart(),this._idleTimeout=setTimeout(this._onIdle.bind(this),100)},addTimedHandler:function(a,b){var c=new h.TimedHandler(a,b);return this.addTimeds.push(c),c},deleteTimedHandler:function(a){this.removeTimeds.push(a)},addHandler:function(a,b,c,d,e,f,g){var i=new h.Handler(a,b,c,d,e,f,g);return this.addHandlers.push(i),i},deleteHandler:function(a){this.removeHandlers.push(a);var b=this.addHandlers.indexOf(a);b>=0&&this.addHandlers.splice(b,1)},disconnect:function(a){if(this._changeConnectStatus(h.Status.DISCONNECTING,a),h.info("Disconnect was called because: "+a),this.connected){var b=!1;this.disconnecting=!0,this.authenticated&&(b=g({xmlns:h.NS.CLIENT,type:"unavailable"})),this._disconnectTimeout=this._addSysTimedHandler(3e3,this._onDisconnectTimeout.bind(this)),this._proto._disconnect(b)}else h.info("Disconnect was called before Strophe connected to the server"),this._proto._abortAllRequests()},_changeConnectStatus:function(a,b){for(var c in h._connectionPlugins)if(h._connectionPlugins.hasOwnProperty(c)){var d=this[c];if(d.statusChanged)try{d.statusChanged(a,b)}catch(e){h.error(""+c+" plugin caused an exception changing status: "+e)}}if(this.connect_callback)try{this.connect_callback(a,b)}catch(f){h.error("User connection callback caused an exception: "+f)}},_doDisconnect:function(a){"number"==typeof this._idleTimeout&&clearTimeout(this._idleTimeout),null!==this._disconnectTimeout&&(this.deleteTimedHandler(this._disconnectTimeout),this._disconnectTimeout=null),h.info("_doDisconnect was called"),this._proto._doDisconnect(),this.authenticated=!1,this.disconnecting=!1,this.restored=!1,this.handlers=[],this.timedHandlers=[],this.removeTimeds=[],this.removeHandlers=[],this.addTimeds=[],this.addHandlers=[],this._changeConnectStatus(h.Status.DISCONNECTED,a),this.connected=!1},_dataRecv:function(a,b){h.info("_dataRecv called");var c=this._proto._reqToData(a);if(null!==c){this.xmlInput!==h.Connection.prototype.xmlInput&&this.xmlInput(c.nodeName===this._proto.strip&&c.childNodes.length?c.childNodes[0]:c),this.rawInput!==h.Connection.prototype.rawInput&&this.rawInput(b?b:h.serialize(c));for(var d,e;this.removeHandlers.length>0;)e=this.removeHandlers.pop(),d=this.handlers.indexOf(e),d>=0&&this.handlers.splice(d,1);for(;this.addHandlers.length>0;)this.handlers.push(this.addHandlers.pop());if(this.disconnecting&&this._proto._emptyQueue())return void this._doDisconnect();var f,g,i=c.getAttribute("type");if(null!==i&&"terminate"==i){if(this.disconnecting)return;return f=c.getAttribute("condition"),g=c.getElementsByTagName("conflict"),null!==f?("remote-stream-error"==f&&g.length>0&&(f="conflict"),this._changeConnectStatus(h.Status.CONNFAIL,f)):this._changeConnectStatus(h.Status.CONNFAIL,"unknown"),void this._doDisconnect(f)}var j=this;h.forEachChild(c,null,function(a){var b,c;for(c=j.handlers,j.handlers=[],b=0;b<c.length;b++){var d=c[b];try{!d.isMatch(a)||!j.authenticated&&d.user?j.handlers.push(d):d.run(a)&&j.handlers.push(d)}catch(e){h.warn("Removing Strophe handlers due to uncaught exception: "+e.message)}}})}},mechanisms:{},_connect_cb:function(a,b,c){h.info("_connect_cb was called"),this.connected=!0;var d=this._proto._reqToData(a);if(d){this.xmlInput!==h.Connection.prototype.xmlInput&&this.xmlInput(d.nodeName===this._proto.strip&&d.childNodes.length?d.childNodes[0]:d),this.rawInput!==h.Connection.prototype.rawInput&&this.rawInput(c?c:h.serialize(d));var e=this._proto._connect_cb(d);if(e!==h.Status.CONNFAIL){this._authentication.sasl_scram_sha1=!1,this._authentication.sasl_plain=!1,this._authentication.sasl_digest_md5=!1,this._authentication.sasl_anonymous=!1,this._authentication.legacy_auth=!1;var f;f=d.getElementsByTagNameNS?d.getElementsByTagNameNS(h.NS.STREAM,"features").length>0:d.getElementsByTagName("stream:features").length>0||d.getElementsByTagName("features").length>0;var g,i,j=d.getElementsByTagName("mechanism"),k=[],l=!1;if(!f)return void this._proto._no_auth_received(b);if(j.length>0)for(g=0;g<j.length;g++)i=h.getText(j[g]),this.mechanisms[i]&&k.push(this.mechanisms[i]);return this._authentication.legacy_auth=d.getElementsByTagName("auth").length>0,(l=this._authentication.legacy_auth||k.length>0)?void(this.do_authentication!==!1&&this.authenticate(k)):void this._proto._no_auth_received(b)}}},authenticate:function(a){var c;for(c=0;c<a.length-1;++c){for(var e=c,g=c+1;g<a.length;++g)a[g].prototype.priority>a[e].prototype.priority&&(e=g);if(e!=c){var i=a[c];a[c]=a[e],a[e]=i}}var j=!1;for(c=0;c<a.length;++c)if(a[c].test(this)){this._sasl_success_handler=this._addSysHandler(this._sasl_success_cb.bind(this),null,"success",null,null),this._sasl_failure_handler=this._addSysHandler(this._sasl_failure_cb.bind(this),null,"failure",null,null),this._sasl_challenge_handler=this._addSysHandler(this._sasl_challenge_cb.bind(this),null,"challenge",null,null),this._sasl_mechanism=new a[c],this._sasl_mechanism.onStart(this);var k=d("auth",{xmlns:h.NS.SASL,mechanism:this._sasl_mechanism.name});if(this._sasl_mechanism.isClientFirst){var l=this._sasl_mechanism.onChallenge(this,null);k.t(b.encode(l))}this.send(k.tree()),j=!0;break}j||(null===h.getNodeFromJid(this.jid)?(this._changeConnectStatus(h.Status.CONNFAIL,"x-strophe-bad-non-anon-jid"),this.disconnect("x-strophe-bad-non-anon-jid")):(this._changeConnectStatus(h.Status.AUTHENTICATING,null),this._addSysHandler(this._auth1_cb.bind(this),null,null,null,"_auth_1"),this.send(f({type:"get",to:this.domain,id:"_auth_1"}).c("query",{xmlns:h.NS.AUTH}).c("username",{}).t(h.getNodeFromJid(this.jid)).tree())))},_sasl_challenge_cb:function(a){var c=b.decode(h.getText(a)),e=this._sasl_mechanism.onChallenge(this,c),f=d("response",{xmlns:h.NS.SASL});return""!==e&&f.t(b.encode(e)),this.send(f.tree()),!0},_auth1_cb:function(a){var b=f({type:"set",id:"_auth_2"}).c("query",{xmlns:h.NS.AUTH}).c("username",{}).t(h.getNodeFromJid(this.jid)).up().c("password").t(this.pass);return h.getResourceFromJid(this.jid)||(this.jid=h.getBareJidFromJid(this.jid)+"/strophe"),b.up().c("resource",{}).t(h.getResourceFromJid(this.jid)),this._addSysHandler(this._auth2_cb.bind(this),null,null,null,"_auth_2"),this.send(b.tree()),!1},_sasl_success_cb:function(a){if(this._sasl_data["server-signature"]){var c,d=b.decode(h.getText(a)),e=/([a-z]+)=([^,]+)(,|$)/,f=d.match(e);if("v"==f[1]&&(c=f[2]),c!=this._sasl_data["server-signature"])return this.deleteHandler(this._sasl_failure_handler),this._sasl_failure_handler=null,this._sasl_challenge_handler&&(this.deleteHandler(this._sasl_challenge_handler),this._sasl_challenge_handler=null),this._sasl_data={},this._sasl_failure_cb(null)}h.info("SASL authentication succeeded."),this._sasl_mechanism&&this._sasl_mechanism.onSuccess(),this.deleteHandler(this._sasl_failure_handler),this._sasl_failure_handler=null,this._sasl_challenge_handler&&(this.deleteHandler(this._sasl_challenge_handler),this._sasl_challenge_handler=null);var g=[],i=function(a,b){for(;a.length;)this.deleteHandler(a.pop());return this._sasl_auth1_cb.bind(this)(b),!1};return g.push(this._addSysHandler(function(a){i.bind(this)(g,a)}.bind(this),null,"stream:features",null,null)),g.push(this._addSysHandler(function(a){i.bind(this)(g,a)}.bind(this),h.NS.STREAM,"features",null,null)),this._sendRestart(),!1},_sasl_auth1_cb:function(a){this.features=a;var b,c;for(b=0;b<a.childNodes.length;b++)c=a.childNodes[b],"bind"==c.nodeName&&(this.do_bind=!0),"session"==c.nodeName&&(this.do_session=!0);if(!this.do_bind)return this._changeConnectStatus(h.Status.AUTHFAIL,null),!1;this._addSysHandler(this._sasl_bind_cb.bind(this),null,null,null,"_bind_auth_2");var d=h.getResourceFromJid(this.jid);return this.send(d?f({type:"set",id:"_bind_auth_2"}).c("bind",{xmlns:h.NS.BIND}).c("resource",{}).t(d).tree():f({type:"set",id:"_bind_auth_2"}).c("bind",{xmlns:h.NS.BIND}).tree()),!1},_sasl_bind_cb:function(a){if("error"==a.getAttribute("type")){h.info("SASL binding failed.");var b,c=a.getElementsByTagName("conflict");return c.length>0&&(b="conflict"),this._changeConnectStatus(h.Status.AUTHFAIL,b),!1}var d,e=a.getElementsByTagName("bind");return e.length>0?(d=e[0].getElementsByTagName("jid"),void(d.length>0&&(this.jid=h.getText(d[0]),this.do_session?(this._addSysHandler(this._sasl_session_cb.bind(this),null,null,null,"_session_auth_2"),this.send(f({type:"set",id:"_session_auth_2"}).c("session",{xmlns:h.NS.SESSION}).tree())):(this.authenticated=!0,this._changeConnectStatus(h.Status.CONNECTED,null))))):(h.info("SASL binding failed."),this._changeConnectStatus(h.Status.AUTHFAIL,null),!1)},_sasl_session_cb:function(a){if("result"==a.getAttribute("type"))this.authenticated=!0,this._changeConnectStatus(h.Status.CONNECTED,null);else if("error"==a.getAttribute("type"))return h.info("Session creation failed."),this._changeConnectStatus(h.Status.AUTHFAIL,null),!1;return!1},_sasl_failure_cb:function(a){return this._sasl_success_handler&&(this.deleteHandler(this._sasl_success_handler),this._sasl_success_handler=null),this._sasl_challenge_handler&&(this.deleteHandler(this._sasl_challenge_handler),this._sasl_challenge_handler=null),this._sasl_mechanism&&this._sasl_mechanism.onFailure(),this._changeConnectStatus(h.Status.AUTHFAIL,null),!1},_auth2_cb:function(a){return"result"==a.getAttribute("type")?(this.authenticated=!0,this._changeConnectStatus(h.Status.CONNECTED,null)):"error"==a.getAttribute("type")&&(this._changeConnectStatus(h.Status.AUTHFAIL,null),this.disconnect("authentication failed")),!1},_addSysTimedHandler:function(a,b){var c=new h.TimedHandler(a,b);return c.user=!1,this.addTimeds.push(c),c},_addSysHandler:function(a,b,c,d,e){var f=new h.Handler(a,b,c,d,e);return f.user=!1,this.addHandlers.push(f),f},_onDisconnectTimeout:function(){return h.info("_onDisconnectTimeout was called"),this._proto._onDisconnectTimeout(),this._doDisconnect(),!1},_onIdle:function(){for(var a,b,c,d;this.addTimeds.length>0;)this.timedHandlers.push(this.addTimeds.pop());for(;this.removeTimeds.length>0;)b=this.removeTimeds.pop(),a=this.timedHandlers.indexOf(b),a>=0&&this.timedHandlers.splice(a,1);var e=(new Date).getTime();for(d=[],a=0;a<this.timedHandlers.length;a++)b=this.timedHandlers[a],(this.authenticated||!b.user)&&(c=b.lastCalled+b.period,0>=c-e?b.run()&&d.push(b):d.push(b));this.timedHandlers=d,clearTimeout(this._idleTimeout),this._proto._onIdle(),this.connected&&(this._idleTimeout=setTimeout(this._onIdle.bind(this),100))}},h.SASLMechanism=function(a,b,c){this.name=a,this.isClientFirst=b,
this.priority=c},h.SASLMechanism.prototype={test:function(a){return!0},onStart:function(a){this._connection=a},onChallenge:function(a,b){throw new Error("You should implement challenge handling!")},onFailure:function(){this._connection=null},onSuccess:function(){this._connection=null}},h.SASLAnonymous=function(){},h.SASLAnonymous.prototype=new h.SASLMechanism("ANONYMOUS",!1,10),h.SASLAnonymous.test=function(a){return null===a.authcid},h.Connection.prototype.mechanisms[h.SASLAnonymous.prototype.name]=h.SASLAnonymous,h.SASLPlain=function(){},h.SASLPlain.prototype=new h.SASLMechanism("PLAIN",!0,20),h.SASLPlain.test=function(a){return null!==a.authcid},h.SASLPlain.prototype.onChallenge=function(a){var b=a.authzid;return b+="\x00",b+=a.authcid,b+="\x00",b+=a.pass},h.Connection.prototype.mechanisms[h.SASLPlain.prototype.name]=h.SASLPlain,h.SASLSHA1=function(){},h.SASLSHA1.prototype=new h.SASLMechanism("SCRAM-SHA-1",!0,40),h.SASLSHA1.test=function(a){return null!==a.authcid},h.SASLSHA1.prototype.onChallenge=function(d,e,f){var g=f||c.hexdigest(1234567890*Math.random()),h="n="+d.authcid;return h+=",r=",h+=g,d._sasl_data.cnonce=g,d._sasl_data["client-first-message-bare"]=h,h="n,,"+h,this.onChallenge=function(c,d){for(var e,f,g,h,i,j,k,l,m,n,o,p="c=biws,",q=c._sasl_data["client-first-message-bare"]+","+d+",",r=c._sasl_data.cnonce,s=/([a-z]+)=([^,]+)(,|$)/;d.match(s);){var t=d.match(s);switch(d=d.replace(t[0],""),t[1]){case"r":e=t[2];break;case"s":f=t[2];break;case"i":g=t[2]}}if(e.substr(0,r.length)!==r)return c._sasl_data={},c._sasl_failure_cb();for(p+="r="+e,q+=p,f=b.decode(f),f+="\x00\x00\x00",h=j=a.core_hmac_sha1(c.pass,f),k=1;g>k;k++){for(i=a.core_hmac_sha1(c.pass,a.binb2str(j)),l=0;5>l;l++)h[l]^=i[l];j=i}for(h=a.binb2str(h),m=a.core_hmac_sha1(h,"Client Key"),n=a.str_hmac_sha1(h,"Server Key"),o=a.core_hmac_sha1(a.str_sha1(a.binb2str(m)),q),c._sasl_data["server-signature"]=a.b64_hmac_sha1(n,q),l=0;5>l;l++)m[l]^=o[l];return p+=",p="+b.encode(a.binb2str(m))}.bind(this),h},h.Connection.prototype.mechanisms[h.SASLSHA1.prototype.name]=h.SASLSHA1,h.SASLMD5=function(){},h.SASLMD5.prototype=new h.SASLMechanism("DIGEST-MD5",!1,30),h.SASLMD5.test=function(a){return null!==a.authcid},h.SASLMD5.prototype._quote=function(a){return'"'+a.replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"'},h.SASLMD5.prototype.onChallenge=function(a,b,d){for(var e,f=/([a-z]+)=("[^"]+"|[^,"]+)(?:,|$)/,g=d||c.hexdigest(""+1234567890*Math.random()),h="",i=null,j="",k="";b.match(f);)switch(e=b.match(f),b=b.replace(e[0],""),e[2]=e[2].replace(/^"(.+)"$/,"$1"),e[1]){case"realm":h=e[2];break;case"nonce":j=e[2];break;case"qop":k=e[2];break;case"host":i=e[2]}var l=a.servtype+"/"+a.domain;null!==i&&(l=l+"/"+i);var m=c.hash(a.authcid+":"+h+":"+this._connection.pass)+":"+j+":"+g,n="AUTHENTICATE:"+l,o="";return o+="charset=utf-8,",o+="username="+this._quote(a.authcid)+",",o+="realm="+this._quote(h)+",",o+="nonce="+this._quote(j)+",",o+="nc=00000001,",o+="cnonce="+this._quote(g)+",",o+="digest-uri="+this._quote(l)+",",o+="response="+c.hexdigest(c.hexdigest(m)+":"+j+":00000001:"+g+":auth:"+c.hexdigest(n))+",",o+="qop=auth",this.onChallenge=function(){return""}.bind(this),o},h.Connection.prototype.mechanisms[h.SASLMD5.prototype.name]=h.SASLMD5,{Strophe:h,$build:d,$msg:e,$iq:f,$pres:g,SHA1:a,Base64:b,MD5:c}}),function(a,b){return"function"==typeof define&&define.amd?void define("strophe-bosh",["strophe-core"],function(a){return b(a.Strophe,a.$build)}):b(Strophe,$build)}(this,function(a,b){return a.Request=function(b,c,d,e){this.id=++a._requestId,this.xmlData=b,this.data=a.serialize(b),this.origFunc=c,this.func=c,this.rid=d,this.date=0/0,this.sends=e||0,this.abort=!1,this.dead=null,this.age=function(){if(!this.date)return 0;var a=new Date;return(a-this.date)/1e3},this.timeDead=function(){if(!this.dead)return 0;var a=new Date;return(a-this.dead)/1e3},this.xhr=this._newXHR()},a.Request.prototype={getResponse:function(){var b=null;if(this.xhr.responseXML&&this.xhr.responseXML.documentElement){if(b=this.xhr.responseXML.documentElement,"parsererror"==b.tagName)throw a.error("invalid response received"),a.error("responseText: "+this.xhr.responseText),a.error("responseXML: "+a.serialize(this.xhr.responseXML)),"parsererror"}else this.xhr.responseText&&(a.error("invalid response received"),a.error("responseText: "+this.xhr.responseText),a.error("responseXML: "+a.serialize(this.xhr.responseXML)));return b},_newXHR:function(){var a=null;return window.XMLHttpRequest?(a=new XMLHttpRequest,a.overrideMimeType&&a.overrideMimeType("text/xml; charset=utf-8")):window.ActiveXObject&&(a=new ActiveXObject("Microsoft.XMLHTTP")),a.onreadystatechange=this.func.bind(null,this),a}},a.Bosh=function(a){this._conn=a,this.rid=Math.floor(4294967295*Math.random()),this.sid=null,this.hold=1,this.wait=60,this.window=5,this.errors=0,this._requests=[]},a.Bosh.prototype={strip:null,_buildBody:function(){var c=b("body",{rid:this.rid++,xmlns:a.NS.HTTPBIND});return null!==this.sid&&c.attrs({sid:this.sid}),this._conn.options.keepalive&&this._cacheSession(),c},_reset:function(){this.rid=Math.floor(4294967295*Math.random()),this.sid=null,this.errors=0,window.sessionStorage.removeItem("strophe-bosh-session")},_connect:function(b,c,d){this.wait=b||this.wait,this.hold=c||this.hold,this.errors=0;var e=this._buildBody().attrs({to:this._conn.domain,"xml:lang":"en",wait:this.wait,hold:this.hold,content:"text/xml; charset=utf-8",ver:"1.6","xmpp:version":"1.0","xmlns:xmpp":a.NS.BOSH});d&&e.attrs({route:d});var f=this._conn._connect_cb;this._requests.push(new a.Request(e.tree(),this._onRequestStateChange.bind(this,f.bind(this._conn)),e.tree().getAttribute("rid"))),this._throttledRequestHandler()},_attach:function(b,c,d,e,f,g,h){this._conn.jid=b,this.sid=c,this.rid=d,this._conn.connect_callback=e,this._conn.domain=a.getDomainFromJid(this._conn.jid),this._conn.authenticated=!0,this._conn.connected=!0,this.wait=f||this.wait,this.hold=g||this.hold,this.window=h||this.window,this._conn._changeConnectStatus(a.Status.ATTACHED,null)},_restore:function(b,c,d,e,f){var g=JSON.parse(window.sessionStorage.getItem("strophe-bosh-session"));if(!("undefined"!=typeof g&&null!==g&&g.rid&&g.sid&&g.jid)||"undefined"!=typeof b&&a.getBareJidFromJid(g.jid)!=a.getBareJidFromJid(b))throw{name:"StropheSessionError",message:"_restore: no restoreable session."};this._conn.restored=!0,this._attach(g.jid,g.sid,g.rid,c,d,e,f)},_cacheSession:function(){this._conn.authenticated?this._conn.jid&&this.rid&&this.sid&&window.sessionStorage.setItem("strophe-bosh-session",JSON.stringify({jid:this._conn.jid,rid:this.rid,sid:this.sid})):window.sessionStorage.removeItem("strophe-bosh-session")},_connect_cb:function(b){var c,d,e=b.getAttribute("type");if(null!==e&&"terminate"==e)return c=b.getAttribute("condition"),a.error("BOSH-Connection failed: "+c),d=b.getElementsByTagName("conflict"),null!==c?("remote-stream-error"==c&&d.length>0&&(c="conflict"),this._conn._changeConnectStatus(a.Status.CONNFAIL,c)):this._conn._changeConnectStatus(a.Status.CONNFAIL,"unknown"),this._conn._doDisconnect(c),a.Status.CONNFAIL;this.sid||(this.sid=b.getAttribute("sid"));var f=b.getAttribute("requests");f&&(this.window=parseInt(f,10));var g=b.getAttribute("hold");g&&(this.hold=parseInt(g,10));var h=b.getAttribute("wait");h&&(this.wait=parseInt(h,10))},_disconnect:function(a){this._sendTerminate(a)},_doDisconnect:function(){this.sid=null,this.rid=Math.floor(4294967295*Math.random()),window.sessionStorage.removeItem("strophe-bosh-session")},_emptyQueue:function(){return 0===this._requests.length},_hitError:function(b){this.errors++,a.warn("request errored, status: "+b+", number of errors: "+this.errors),this.errors>4&&this._conn._onDisconnectTimeout()},_no_auth_received:function(b){b=b?b.bind(this._conn):this._conn._connect_cb.bind(this._conn);var c=this._buildBody();this._requests.push(new a.Request(c.tree(),this._onRequestStateChange.bind(this,b.bind(this._conn)),c.tree().getAttribute("rid"))),this._throttledRequestHandler()},_onDisconnectTimeout:function(){this._abortAllRequests()},_abortAllRequests:function(){for(var a;this._requests.length>0;)a=this._requests.pop(),a.abort=!0,a.xhr.abort(),a.xhr.onreadystatechange=function(){}},_onIdle:function(){var b=this._conn._data;if(this._conn.authenticated&&0===this._requests.length&&0===b.length&&!this._conn.disconnecting&&(a.info("no requests during idle cycle, sending blank request"),b.push(null)),!this._conn.paused){if(this._requests.length<2&&b.length>0){for(var c=this._buildBody(),d=0;d<b.length;d++)null!==b[d]&&("restart"===b[d]?c.attrs({to:this._conn.domain,"xml:lang":"en","xmpp:restart":"true","xmlns:xmpp":a.NS.BOSH}):c.cnode(b[d]).up());delete this._conn._data,this._conn._data=[],this._requests.push(new a.Request(c.tree(),this._onRequestStateChange.bind(this,this._conn._dataRecv.bind(this._conn)),c.tree().getAttribute("rid"))),this._throttledRequestHandler()}if(this._requests.length>0){var e=this._requests[0].age();null!==this._requests[0].dead&&this._requests[0].timeDead()>Math.floor(a.SECONDARY_TIMEOUT*this.wait)&&this._throttledRequestHandler(),e>Math.floor(a.TIMEOUT*this.wait)&&(a.warn("Request "+this._requests[0].id+" timed out, over "+Math.floor(a.TIMEOUT*this.wait)+" seconds since last activity"),this._throttledRequestHandler())}}},_onRequestStateChange:function(b,c){if(a.debug("request id "+c.id+"."+c.sends+" state changed to "+c.xhr.readyState),c.abort)return void(c.abort=!1);var d;if(4==c.xhr.readyState){d=0;try{d=c.xhr.status}catch(e){}if("undefined"==typeof d&&(d=0),this.disconnecting&&d>=400)return void this._hitError(d);var f=this._requests[0]==c,g=this._requests[1]==c;(d>0&&500>d||c.sends>5)&&(this._removeRequest(c),a.debug("request id "+c.id+" should now be removed")),200==d?((g||f&&this._requests.length>0&&this._requests[0].age()>Math.floor(a.SECONDARY_TIMEOUT*this.wait))&&this._restartRequest(0),a.debug("request id "+c.id+"."+c.sends+" got 200"),b(c),this.errors=0):(a.error("request id "+c.id+"."+c.sends+" error "+d+" happened"),(0===d||d>=400&&600>d||d>=12e3)&&(this._hitError(d),d>=400&&500>d&&(this._conn._changeConnectStatus(a.Status.DISCONNECTING,null),this._conn._doDisconnect()))),d>0&&500>d||c.sends>5||this._throttledRequestHandler()}},_processRequest:function(b){var c=this,d=this._requests[b],e=-1;try{4==d.xhr.readyState&&(e=d.xhr.status)}catch(f){a.error("caught an error in _requests["+b+"], reqStatus: "+e)}if("undefined"==typeof e&&(e=-1),d.sends>this._conn.maxRetries)return void this._conn._onDisconnectTimeout();var g=d.age(),h=!isNaN(g)&&g>Math.floor(a.TIMEOUT*this.wait),i=null!==d.dead&&d.timeDead()>Math.floor(a.SECONDARY_TIMEOUT*this.wait),j=4==d.xhr.readyState&&(1>e||e>=500);if((h||i||j)&&(i&&a.error("Request "+this._requests[b].id+" timed out (secondary), restarting"),d.abort=!0,d.xhr.abort(),d.xhr.onreadystatechange=function(){},this._requests[b]=new a.Request(d.xmlData,d.origFunc,d.rid,d.sends),d=this._requests[b]),0===d.xhr.readyState){a.debug("request id "+d.id+"."+d.sends+" posting");try{d.xhr.open("POST",this._conn.service,this._conn.options.sync?!1:!0),d.xhr.setRequestHeader("Content-Type","text/xml; charset=utf-8")}catch(k){return a.error("XHR open failed."),this._conn.connected||this._conn._changeConnectStatus(a.Status.CONNFAIL,"bad-service"),void this._conn.disconnect()}var l=function(){if(d.date=new Date,c._conn.options.customHeaders){var a=c._conn.options.customHeaders;for(var b in a)a.hasOwnProperty(b)&&d.xhr.setRequestHeader(b,a[b])}d.xhr.send(d.data)};if(d.sends>1){var m=1e3*Math.min(Math.floor(a.TIMEOUT*this.wait),Math.pow(d.sends,3));setTimeout(l,m)}else l();d.sends++,this._conn.xmlOutput!==a.Connection.prototype.xmlOutput&&this._conn.xmlOutput(d.xmlData.nodeName===this.strip&&d.xmlData.childNodes.length?d.xmlData.childNodes[0]:d.xmlData),this._conn.rawOutput!==a.Connection.prototype.rawOutput&&this._conn.rawOutput(d.data)}else a.debug("_processRequest: "+(0===b?"first":"second")+" request has readyState of "+d.xhr.readyState)},_removeRequest:function(b){a.debug("removing request");var c;for(c=this._requests.length-1;c>=0;c--)b==this._requests[c]&&this._requests.splice(c,1);b.xhr.onreadystatechange=function(){},this._throttledRequestHandler()},_restartRequest:function(a){var b=this._requests[a];null===b.dead&&(b.dead=new Date),this._processRequest(a)},_reqToData:function(a){try{return a.getResponse()}catch(b){if("parsererror"!=b)throw b;this._conn.disconnect("strophe-parsererror")}},_sendTerminate:function(b){a.info("_sendTerminate was called");var c=this._buildBody().attrs({type:"terminate"});b&&c.cnode(b.tree());var d=new a.Request(c.tree(),this._onRequestStateChange.bind(this,this._conn._dataRecv.bind(this._conn)),c.tree().getAttribute("rid"));this._requests.push(d),this._throttledRequestHandler()},_send:function(){clearTimeout(this._conn._idleTimeout),this._throttledRequestHandler(),this._conn._idleTimeout=setTimeout(this._conn._onIdle.bind(this._conn),100)},_sendRestart:function(){this._throttledRequestHandler(),clearTimeout(this._conn._idleTimeout)},_throttledRequestHandler:function(){a.debug(this._requests?"_throttledRequestHandler called with "+this._requests.length+" requests":"_throttledRequestHandler called with undefined requests"),this._requests&&0!==this._requests.length&&(this._requests.length>0&&this._processRequest(0),this._requests.length>1&&Math.abs(this._requests[0].rid-this._requests[1].rid)<this.window&&this._processRequest(1))}},a}),function(a,b){return"function"==typeof define&&define.amd?void define("strophe-websocket",["strophe-core"],function(a){return b(a.Strophe,a.$build)}):b(Strophe,$build)}(this,function(a,b){return a.Websocket=function(a){this._conn=a,this.strip="wrapper";var b=a.service;if(0!==b.indexOf("ws:")&&0!==b.indexOf("wss:")){var c="";c+="ws"===a.options.protocol&&"https:"!==window.location.protocol?"ws":"wss",c+="://"+window.location.host,c+=0!==b.indexOf("/")?window.location.pathname+b:b,a.service=c}},a.Websocket.prototype={_buildStream:function(){return b("open",{xmlns:a.NS.FRAMING,to:this._conn.domain,version:"1.0"})},_check_streamerror:function(b,c){var d;if(d=b.getElementsByTagNameNS?b.getElementsByTagNameNS(a.NS.STREAM,"error"):b.getElementsByTagName("stream:error"),0===d.length)return!1;for(var e=d[0],f="",g="",h="urn:ietf:params:xml:ns:xmpp-streams",i=0;i<e.childNodes.length;i++){var j=e.childNodes[i];if(j.getAttribute("xmlns")!==h)break;"text"===j.nodeName?g=j.textContent:f=j.nodeName}var k="WebSocket stream error: ";return k+=f?f:"unknown",g&&(k+=" - "+f),a.error(k),this._conn._changeConnectStatus(c,f),this._conn._doDisconnect(),!0},_reset:function(){},_connect:function(){this._closeSocket(),this.socket=new WebSocket(this._conn.service,"xmpp"),this.socket.onopen=this._onOpen.bind(this),this.socket.onerror=this._onError.bind(this),this.socket.onclose=this._onClose.bind(this),this.socket.onmessage=this._connect_cb_wrapper.bind(this)},_connect_cb:function(b){var c=this._check_streamerror(b,a.Status.CONNFAIL);return c?a.Status.CONNFAIL:void 0},_handleStreamStart:function(b){var c=!1,d=b.getAttribute("xmlns");"string"!=typeof d?c="Missing xmlns in <open />":d!==a.NS.FRAMING&&(c="Wrong xmlns in <open />: "+d);var e=b.getAttribute("version");return"string"!=typeof e?c="Missing version in <open />":"1.0"!==e&&(c="Wrong version in <open />: "+e),c?(this._conn._changeConnectStatus(a.Status.CONNFAIL,c),this._conn._doDisconnect(),!1):!0},_connect_cb_wrapper:function(b){if(0===b.data.indexOf("<open ")||0===b.data.indexOf("<?xml")){var c=b.data.replace(/^(<\?.*?\?>\s*)*/,"");if(""===c)return;var d=(new DOMParser).parseFromString(c,"text/xml").documentElement;this._conn.xmlInput(d),this._conn.rawInput(b.data),this._handleStreamStart(d)&&this._connect_cb(d)}else if(0===b.data.indexOf("<close ")){this._conn.rawInput(b.data),this._conn.xmlInput(b);var e=b.getAttribute("see-other-uri");e?(this._conn._changeConnectStatus(a.Status.REDIRECT,"Received see-other-uri, resetting connection"),this._conn.reset(),this._conn.service=e,this._connect()):(this._conn._changeConnectStatus(a.Status.CONNFAIL,"Received closing stream"),this._conn._doDisconnect())}else{var f=this._streamWrap(b.data),g=(new DOMParser).parseFromString(f,"text/xml").documentElement;this.socket.onmessage=this._onMessage.bind(this),this._conn._connect_cb(g,null,b.data)}},_disconnect:function(c){if(this.socket&&this.socket.readyState!==WebSocket.CLOSED){c&&this._conn.send(c);var d=b("close",{xmlns:a.NS.FRAMING});this._conn.xmlOutput(d);var e=a.serialize(d);this._conn.rawOutput(e);try{this.socket.send(e)}catch(f){a.info("Couldn't send <close /> tag.")}}this._conn._doDisconnect()},_doDisconnect:function(){a.info("WebSockets _doDisconnect was called"),this._closeSocket()},_streamWrap:function(a){return"<wrapper>"+a+"</wrapper>"},_closeSocket:function(){if(this.socket)try{this.socket.close()}catch(a){}this.socket=null},_emptyQueue:function(){return!0},_onClose:function(){this._conn.connected&&!this._conn.disconnecting?(a.error("Websocket closed unexcectedly"),this._conn._doDisconnect()):a.info("Websocket closed")},_no_auth_received:function(b){a.error("Server did not send any auth methods"),this._conn._changeConnectStatus(a.Status.CONNFAIL,"Server did not send any auth methods"),b&&(b=b.bind(this._conn))(),this._conn._doDisconnect()},_onDisconnectTimeout:function(){},_abortAllRequests:function(){},_onError:function(b){a.error("Websocket error "+b),this._conn._changeConnectStatus(a.Status.CONNFAIL,"The WebSocket connection could not be established was disconnected."),this._disconnect()},_onIdle:function(){var b=this._conn._data;if(b.length>0&&!this._conn.paused){for(var c=0;c<b.length;c++)if(null!==b[c]){var d,e;d="restart"===b[c]?this._buildStream().tree():b[c],e=a.serialize(d),this._conn.xmlOutput(d),this._conn.rawOutput(e),this.socket.send(e)}this._conn._data=[]}},_onMessage:function(b){var c,d,e='<close xmlns="urn:ietf:params:xml:ns:xmpp-framing" />';if(b.data===e)return this._conn.rawInput(e),this._conn.xmlInput(b),void(this._conn.disconnecting||this._conn._doDisconnect());if(0===b.data.search("<open ")){if(c=(new DOMParser).parseFromString(b.data,"text/xml").documentElement,!this._handleStreamStart(c))return}else d=this._streamWrap(b.data),c=(new DOMParser).parseFromString(d,"text/xml").documentElement;return this._check_streamerror(c,a.Status.ERROR)?void 0:this._conn.disconnecting&&"presence"===c.firstChild.nodeName&&"unavailable"===c.firstChild.getAttribute("type")?(this._conn.xmlInput(c),void this._conn.rawInput(a.serialize(c))):void this._conn._dataRecv(c,b.data)},_onOpen:function(){a.info("Websocket open");var b=this._buildStream();this._conn.xmlOutput(b.tree());var c=a.serialize(b);this._conn.rawOutput(c),this.socket.send(c)},_reqToData:function(a){return a},_send:function(){this._conn.flush()},_sendRestart:function(){clearTimeout(this._conn._idleTimeout),this._conn._onIdle.bind(this._conn)()}},a}),a?a(Strophe,$build,$msg,$iq,$pres):void 0}(function(a,b,c,d,e){window.Strophe=a,window.$build=b,window.$msg=c,window.$iq=d,window.$pres=e});
},{}],16:[function(require,module,exports){
(function(e,r){"object"==typeof exports?module.exports=exports=r():"function"==typeof define&&define.amd?define([],r):e.CryptoJS=r()})(this,function(){var e=e||function(e,r){var t={},i=t.lib={},n=i.Base=function(){function e(){}return{extend:function(r){e.prototype=this;var t=new e;return r&&t.mixIn(r),t.hasOwnProperty("init")||(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var r in e)e.hasOwnProperty(r)&&(this[r]=e[r]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),o=i.WordArray=n.extend({init:function(e,t){e=this.words=e||[],this.sigBytes=t!=r?t:4*e.length},toString:function(e){return(e||s).stringify(this)},concat:function(e){var r=this.words,t=e.words,i=this.sigBytes,n=e.sigBytes;if(this.clamp(),i%4)for(var o=0;n>o;o++){var c=255&t[o>>>2]>>>24-8*(o%4);r[i+o>>>2]|=c<<24-8*((i+o)%4)}else if(t.length>65535)for(var o=0;n>o;o+=4)r[i+o>>>2]=t[o>>>2];else r.push.apply(r,t);return this.sigBytes+=n,this},clamp:function(){var r=this.words,t=this.sigBytes;r[t>>>2]&=4294967295<<32-8*(t%4),r.length=e.ceil(t/4)},clone:function(){var e=n.clone.call(this);return e.words=this.words.slice(0),e},random:function(r){for(var t=[],i=0;r>i;i+=4)t.push(0|4294967296*e.random());return new o.init(t,r)}}),c=t.enc={},s=c.Hex={stringify:function(e){for(var r=e.words,t=e.sigBytes,i=[],n=0;t>n;n++){var o=255&r[n>>>2]>>>24-8*(n%4);i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(e){for(var r=e.length,t=[],i=0;r>i;i+=2)t[i>>>3]|=parseInt(e.substr(i,2),16)<<24-4*(i%8);return new o.init(t,r/2)}},u=c.Latin1={stringify:function(e){for(var r=e.words,t=e.sigBytes,i=[],n=0;t>n;n++){var o=255&r[n>>>2]>>>24-8*(n%4);i.push(String.fromCharCode(o))}return i.join("")},parse:function(e){for(var r=e.length,t=[],i=0;r>i;i++)t[i>>>2]|=(255&e.charCodeAt(i))<<24-8*(i%4);return new o.init(t,r)}},f=c.Utf8={stringify:function(e){try{return decodeURIComponent(escape(u.stringify(e)))}catch(r){throw Error("Malformed UTF-8 data")}},parse:function(e){return u.parse(unescape(encodeURIComponent(e)))}},a=i.BufferedBlockAlgorithm=n.extend({reset:function(){this._data=new o.init,this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=f.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(r){var t=this._data,i=t.words,n=t.sigBytes,c=this.blockSize,s=4*c,u=n/s;u=r?e.ceil(u):e.max((0|u)-this._minBufferSize,0);var f=u*c,a=e.min(4*f,n);if(f){for(var p=0;f>p;p+=c)this._doProcessBlock(i,p);var d=i.splice(0,f);t.sigBytes-=a}return new o.init(d,a)},clone:function(){var e=n.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0});i.Hasher=a.extend({cfg:n.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){a.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){e&&this._append(e);var r=this._doFinalize();return r},blockSize:16,_createHelper:function(e){return function(r,t){return new e.init(t).finalize(r)}},_createHmacHelper:function(e){return function(r,t){return new p.HMAC.init(e,t).finalize(r)}}});var p=t.algo={};return t}(Math);return e});
},{}],17:[function(require,module,exports){
(function(e,r){"object"==typeof exports?module.exports=exports=r(require("./core"),require("./sha1"),require("./hmac")):"function"==typeof define&&define.amd?define(["./core","./sha1","./hmac"],r):r(e.CryptoJS)})(this,function(e){return e.HmacSHA1});
},{"./core":16,"./hmac":18,"./sha1":19}],18:[function(require,module,exports){
(function(e,r){"object"==typeof exports?module.exports=exports=r(require("./core")):"function"==typeof define&&define.amd?define(["./core"],r):r(e.CryptoJS)})(this,function(e){(function(){var r=e,t=r.lib,n=t.Base,i=r.enc,o=i.Utf8,s=r.algo;s.HMAC=n.extend({init:function(e,r){e=this._hasher=new e.init,"string"==typeof r&&(r=o.parse(r));var t=e.blockSize,n=4*t;r.sigBytes>n&&(r=e.finalize(r)),r.clamp();for(var i=this._oKey=r.clone(),s=this._iKey=r.clone(),a=i.words,c=s.words,f=0;t>f;f++)a[f]^=1549556828,c[f]^=909522486;i.sigBytes=s.sigBytes=n,this.reset()},reset:function(){var e=this._hasher;e.reset(),e.update(this._iKey)},update:function(e){return this._hasher.update(e),this},finalize:function(e){var r=this._hasher,t=r.finalize(e);r.reset();var n=r.finalize(this._oKey.clone().concat(t));return n}})})()});
},{"./core":16}],19:[function(require,module,exports){
(function(e,r){"object"==typeof exports?module.exports=exports=r(require("./core")):"function"==typeof define&&define.amd?define(["./core"],r):r(e.CryptoJS)})(this,function(e){return function(){var r=e,t=r.lib,n=t.WordArray,i=t.Hasher,o=r.algo,s=[],c=o.SHA1=i.extend({_doReset:function(){this._hash=new n.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(e,r){for(var t=this._hash.words,n=t[0],i=t[1],o=t[2],c=t[3],a=t[4],f=0;80>f;f++){if(16>f)s[f]=0|e[r+f];else{var u=s[f-3]^s[f-8]^s[f-14]^s[f-16];s[f]=u<<1|u>>>31}var d=(n<<5|n>>>27)+a+s[f];d+=20>f?(i&o|~i&c)+1518500249:40>f?(i^o^c)+1859775393:60>f?(i&o|i&c|o&c)-1894007588:(i^o^c)-899497514,a=c,c=o,o=i<<30|i>>>2,i=n,n=d}t[0]=0|t[0]+n,t[1]=0|t[1]+i,t[2]=0|t[2]+o,t[3]=0|t[3]+c,t[4]=0|t[4]+a},_doFinalize:function(){var e=this._data,r=e.words,t=8*this._nDataBytes,n=8*e.sigBytes;return r[n>>>5]|=128<<24-n%32,r[(n+64>>>9<<4)+14]=Math.floor(t/4294967296),r[(n+64>>>9<<4)+15]=t,e.sigBytes=4*r.length,this._process(),this._hash},clone:function(){var e=i.clone.call(this);return e._hash=this._hash.clone(),e}});r.SHA1=i._createHelper(c),r.HmacSHA1=i._createHmacHelper(c)}(),e.SHA1});
},{"./core":16}],20:[function(require,module,exports){

},{}]},{},[10])(10)
});