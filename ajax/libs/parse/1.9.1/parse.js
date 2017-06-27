/**
 * Parse JavaScript SDK v1.9.1
 *
 * The source tree of this library can be found at
 *   https://github.com/ParsePlatform/Parse-SDK-JS
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Parse = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

/**
 * Parse.Analytics provides an interface to Parse's logging and analytics
 * backend.
 *
 * @class Parse.Analytics
 * @static
 */

/**
 * Tracks the occurrence of a custom event with additional dimensions.
 * Parse will store a data point at the time of invocation with the given
 * event name.
 *
 * Dimensions will allow segmentation of the occurrences of this custom
 * event. Keys and values should be {@code String}s, and will throw
 * otherwise.
 *
 * To track a user signup along with additional metadata, consider the
 * following:
 * <pre>
 * var dimensions = {
 *  gender: 'm',
 *  source: 'web',
 *  dayType: 'weekend'
 * };
 * Parse.Analytics.track('signup', dimensions);
 * </pre>
 *
 * There is a default limit of 8 dimensions per event tracked.
 *
 * @method track
 * @param {String} name The name of the custom event to report to Parse as
 * having happened.
 * @param {Object} dimensions The dictionary of information by which to
 * segment this event.
 * @param {Object} options A Backbone-style callback object.
 * @return {Parse.Promise} A promise that is resolved when the round-trip
 * to the server completes.
 */
'use strict';

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.track = track;

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

function track(name, dimensions, options) {
  name = name || '';
  name = name.replace(/^\s*/, '');
  name = name.replace(/\s*$/, '');
  if (name.length === 0) {
    throw new TypeError('A name for the custom event must be provided');
  }

  for (var key in dimensions) {
    if (typeof key !== 'string' || typeof dimensions[key] !== 'string') {
      throw new TypeError('track() dimensions expects keys and values of type "string".');
    }
  }

  options = options || {};
  return _CoreManager2['default'].getAnalyticsController().track(name, dimensions)._thenRunCallbacks(options);
}

_CoreManager2['default'].setAnalyticsController({
  track: function track(name, dimensions) {
    var RESTController = _CoreManager2['default'].getRESTController();
    return RESTController.request('POST', 'events/' + name, { dimensions: dimensions });
  }
});
},{"./CoreManager":3,"babel-runtime/helpers/interop-require-default":56}],2:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.run = run;

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _decode = _dereq_('./decode');

var _decode2 = _interopRequireDefault(_decode);

var _encode = _dereq_('./encode');

var _encode2 = _interopRequireDefault(_encode);

var _ParseError = _dereq_('./ParseError');

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParsePromise = _dereq_('./ParsePromise');

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

/**
 * Contains functions for calling and declaring
 * <a href="/docs/cloud_code_guide#functions">cloud functions</a>.
 * <p><strong><em>
 *   Some functions are only available from Cloud Code.
 * </em></strong></p>
 *
 * @class Parse.Cloud
 * @static
 */

/**
 * Makes a call to a cloud function.
 * @method run
 * @param {String} name The function name.
 * @param {Object} data The parameters to send to the cloud function.
 * @param {Object} options A Backbone-style options object
 * options.success, if set, should be a function to handle a successful
 * call to a cloud function.  options.error should be a function that
 * handles an error running the cloud function.  Both functions are
 * optional.  Both functions take a single argument.
 * @return {Parse.Promise} A promise that will be resolved with the result
 * of the function.
 */

function run(name, data, options) {
  options = options || {};

  if (typeof name !== 'string' || name.length === 0) {
    throw new TypeError('Cloud function name must be a string.');
  }

  var requestOptions = {};
  if (options.useMasterKey) {
    requestOptions.useMasterKey = options.useMasterKey;
  }
  if (options.sessionToken) {
    requestOptions.sessionToken = options.sessionToken;
  }

  return _CoreManager2['default'].getCloudController().run(name, data, requestOptions)._thenRunCallbacks(options);
}

_CoreManager2['default'].setCloudController({
  run: function run(name, data, options) {
    var RESTController = _CoreManager2['default'].getRESTController();

    var payload = (0, _encode2['default'])(data, true);

    var requestOptions = {};
    if (options.hasOwnProperty('useMasterKey')) {
      requestOptions.useMasterKey = options.useMasterKey;
    }
    if (options.hasOwnProperty('sessionToken')) {
      requestOptions.sessionToken = options.sessionToken;
    }

    var request = RESTController.request('POST', 'functions/' + name, payload, requestOptions);

    return request.then(function (res) {
      var decoded = (0, _decode2['default'])(res);
      if (decoded && decoded.hasOwnProperty('result')) {
        return _ParsePromise2['default'].as(decoded.result);
      }
      return _ParsePromise2['default'].error(new _ParseError2['default'](_ParseError2['default'].INVALID_JSON, 'The server returned an invalid response.'));
    })._thenRunCallbacks(options);
  }
});
},{"./CoreManager":3,"./ParseError":13,"./ParsePromise":20,"./decode":35,"./encode":36,"babel-runtime/helpers/interop-require-default":56}],3:[function(_dereq_,module,exports){
(function (process){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var config = {
  // Defaults
  IS_NODE: typeof process !== 'undefined' && !!process.versions && !!process.versions.node && !process.versions.electron,
  REQUEST_ATTEMPT_LIMIT: 5,
  SERVER_URL: 'https://api.parse.com/1',
  LIVEQUERY_SERVER_URL: null,
  VERSION: 'js' + '1.9.1',
  APPLICATION_ID: null,
  JAVASCRIPT_KEY: null,
  MASTER_KEY: null,
  USE_MASTER_KEY: false,
  PERFORM_USER_REWRITE: true,
  FORCE_REVOCABLE_SESSION: false
};

function requireMethods(name, methods, controller) {
  methods.forEach(function (func) {
    if (typeof controller[func] !== 'function') {
      throw new Error(name + ' must implement ' + func + '()');
    }
  });
}

module.exports = {
  get: function get(key) {
    if (config.hasOwnProperty(key)) {
      return config[key];
    }
    throw new Error('Configuration key not found: ' + key);
  },

  set: function set(key, value) {
    config[key] = value;
  },

  /* Specialized Controller Setters/Getters */

  setAnalyticsController: function setAnalyticsController(controller) {
    requireMethods('AnalyticsController', ['track'], controller);
    config['AnalyticsController'] = controller;
  },

  getAnalyticsController: function getAnalyticsController() {
    return config['AnalyticsController'];
  },

  setCloudController: function setCloudController(controller) {
    requireMethods('CloudController', ['run'], controller);
    config['CloudController'] = controller;
  },

  getCloudController: function getCloudController() {
    return config['CloudController'];
  },

  setConfigController: function setConfigController(controller) {
    requireMethods('ConfigController', ['current', 'get'], controller);
    config['ConfigController'] = controller;
  },

  getConfigController: function getConfigController() {
    return config['ConfigController'];
  },

  setFileController: function setFileController(controller) {
    requireMethods('FileController', ['saveFile', 'saveBase64'], controller);
    config['FileController'] = controller;
  },

  getFileController: function getFileController() {
    return config['FileController'];
  },

  setInstallationController: function setInstallationController(controller) {
    requireMethods('InstallationController', ['currentInstallationId'], controller);
    config['InstallationController'] = controller;
  },

  getInstallationController: function getInstallationController() {
    return config['InstallationController'];
  },

  setObjectController: function setObjectController(controller) {
    requireMethods('ObjectController', ['save', 'fetch', 'destroy'], controller);
    config['ObjectController'] = controller;
  },

  getObjectController: function getObjectController() {
    return config['ObjectController'];
  },

  setObjectStateController: function setObjectStateController(controller) {
    requireMethods('ObjectStateController', ['getState', 'initializeState', 'removeState', 'getServerData', 'setServerData', 'getPendingOps', 'setPendingOp', 'pushPendingState', 'popPendingState', 'mergeFirstPendingState', 'getObjectCache', 'estimateAttribute', 'estimateAttributes', 'commitServerChanges', 'enqueueTask', 'clearAllState'], controller);

    config['ObjectStateController'] = controller;
  },

  getObjectStateController: function getObjectStateController() {
    return config['ObjectStateController'];
  },

  setPushController: function setPushController(controller) {
    requireMethods('PushController', ['send'], controller);
    config['PushController'] = controller;
  },

  getPushController: function getPushController() {
    return config['PushController'];
  },

  setQueryController: function setQueryController(controller) {
    requireMethods('QueryController', ['find'], controller);
    config['QueryController'] = controller;
  },

  getQueryController: function getQueryController() {
    return config['QueryController'];
  },

  setRESTController: function setRESTController(controller) {
    requireMethods('RESTController', ['request', 'ajax'], controller);
    config['RESTController'] = controller;
  },

  getRESTController: function getRESTController() {
    return config['RESTController'];
  },

  setSessionController: function setSessionController(controller) {
    requireMethods('SessionController', ['getSession'], controller);
    config['SessionController'] = controller;
  },

  getSessionController: function getSessionController() {
    return config['SessionController'];
  },

  setStorageController: function setStorageController(controller) {
    if (controller.async) {
      requireMethods('An async StorageController', ['getItemAsync', 'setItemAsync', 'removeItemAsync'], controller);
    } else {
      requireMethods('A synchronous StorageController', ['getItem', 'setItem', 'removeItem'], controller);
    }
    config['StorageController'] = controller;
  },

  getStorageController: function getStorageController() {
    return config['StorageController'];
  },

  setUserController: function setUserController(controller) {
    requireMethods('UserController', ['setCurrentUser', 'currentUser', 'currentUserAsync', 'signUp', 'logIn', 'become', 'logOut', 'requestPasswordReset', 'upgradeToRevocableSession', 'linkWith'], controller);
    config['UserController'] = controller;
  },

  getUserController: function getUserController() {
    return config['UserController'];
  },

  setLiveQueryController: function setLiveQueryController(controller) {
    requireMethods('LiveQueryController', ['subscribe', 'unsubscribe', 'open', 'close'], controller);
    config['LiveQueryController'] = controller;
  },

  getLiveQueryController: function getLiveQueryController() {
    return config['LiveQueryController'];
  },

  setHooksController: function setHooksController(controller) {
    requireMethods('HooksController', ['create', 'get', 'update', 'remove'], controller);
    config['HooksController'] = controller;
  },

  getHooksController: function getHooksController() {
    return config['HooksController'];
  }
};
}).call(this,_dereq_('_process'))
},{"_process":58}],4:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This is a simple wrapper to unify EventEmitter implementations across platforms.
 */

'use strict';

module.exports = _dereq_('events').EventEmitter;
},{"events":129}],5:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * -weak
 */

'use strict';

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _parseDate = _dereq_('./parseDate');

var _parseDate2 = _interopRequireDefault(_parseDate);

var _ParseUser = _dereq_('./ParseUser');

var _ParseUser2 = _interopRequireDefault(_ParseUser);

var initialized = false;
var requestedPermissions;
var initOptions;

/**
 * Provides a set of utilities for using Parse with Facebook.
 * @class Parse.FacebookUtils
 * @static
 */
exports['default'] = {
  /**
   * Initializes Parse Facebook integration.  Call this function after you
   * have loaded the Facebook Javascript SDK with the same parameters
   * as you would pass to<code>
   * <a href=
   * "https://developers.facebook.com/docs/reference/javascript/FB.init/">
   * FB.init()</a></code>.  Parse.FacebookUtils will invoke FB.init() for you
   * with these arguments.
   *
   * @method init
   * @param {Object} options Facebook options argument as described here:
   *   <a href=
   *   "https://developers.facebook.com/docs/reference/javascript/FB.init/">
   *   FB.init()</a>. The status flag will be coerced to 'false' because it
   *   interferes with Parse Facebook integration. Call FB.getLoginStatus()
   *   explicitly if this behavior is required by your application.
   */
  init: function init(options) {
    if (typeof FB === 'undefined') {
      throw new Error('The Facebook JavaScript SDK must be loaded before calling init.');
    }
    initOptions = {};
    if (options) {
      for (var key in options) {
        initOptions[key] = options[key];
      }
    }
    if (initOptions.status && typeof console !== 'undefined') {
      var warn = console.warn || console.log || function () {};
      warn.call(console, 'The "status" flag passed into' + ' FB.init, when set to true, can interfere with Parse Facebook' + ' integration, so it has been suppressed. Please call' + ' FB.getLoginStatus() explicitly if you require this behavior.');
    }
    initOptions.status = false;
    FB.init(initOptions);
    _ParseUser2['default']._registerAuthenticationProvider({
      authenticate: function authenticate(options) {
        var _this = this;

        if (typeof FB === 'undefined') {
          options.error(this, 'Facebook SDK not found.');
        }
        FB.login(function (response) {
          if (response.authResponse) {
            if (options.success) {
              options.success(_this, {
                id: response.authResponse.userID,
                access_token: response.authResponse.accessToken,
                expiration_date: new Date(response.authResponse.expiresIn * 1000 + new Date().getTime()).toJSON()
              });
            }
          } else {
            if (options.error) {
              options.error(_this, response);
            }
          }
        }, {
          scope: requestedPermissions
        });
      },

      restoreAuthentication: function restoreAuthentication(authData) {
        if (authData) {
          var expiration = (0, _parseDate2['default'])(authData.expiration_date);
          var expiresIn = expiration ? (expiration.getTime() - new Date().getTime()) / 1000 : 0;

          var authResponse = {
            userID: authData.id,
            accessToken: authData.access_token,
            expiresIn: expiresIn
          };
          var newOptions = {};
          if (initOptions) {
            for (var key in initOptions) {
              newOptions[key] = initOptions[key];
            }
          }
          newOptions.authResponse = authResponse;

          // Suppress checks for login status from the browser.
          newOptions.status = false;

          // If the user doesn't match the one known by the FB SDK, log out.
          // Most of the time, the users will match -- it's only in cases where
          // the FB SDK knows of a different user than the one being restored
          // from a Parse User that logged in with username/password.
          var existingResponse = FB.getAuthResponse();
          if (existingResponse && existingResponse.userID !== authResponse.userID) {
            FB.logout();
          }

          FB.init(newOptions);
        }
        return true;
      },

      getAuthType: function getAuthType() {
        return 'facebook';
      },

      deauthenticate: function deauthenticate() {
        this.restoreAuthentication(null);
      }
    });
    initialized = true;
  },

  /**
   * Gets whether the user has their account linked to Facebook.
   *
   * @method isLinked
   * @param {Parse.User} user User to check for a facebook link.
   *     The user must be logged in on this device.
   * @return {Boolean} <code>true</code> if the user has their account
   *     linked to Facebook.
   */
  isLinked: function isLinked(user) {
    return user._isLinked('facebook');
  },

  /**
   * Logs in a user using Facebook. This method delegates to the Facebook
   * SDK to authenticate the user, and then automatically logs in (or
   * creates, in the case where it is a new user) a Parse.User.
   *
   * @method logIn
   * @param {String, Object} permissions The permissions required for Facebook
   *    log in.  This is a comma-separated string of permissions.
   *    Alternatively, supply a Facebook authData object as described in our
   *    REST API docs if you want to handle getting facebook auth tokens
   *    yourself.
   * @param {Object} options Standard options object with success and error
   *    callbacks.
   */
  logIn: function logIn(permissions, options) {
    if (!permissions || typeof permissions === 'string') {
      if (!initialized) {
        throw new Error('You must initialize FacebookUtils before calling logIn.');
      }
      requestedPermissions = permissions;
      return _ParseUser2['default']._logInWith('facebook', options);
    } else {
      var newOptions = {};
      if (options) {
        for (var key in options) {
          newOptions[key] = options[key];
        }
      }
      newOptions.authData = permissions;
      return _ParseUser2['default']._logInWith('facebook', newOptions);
    }
  },

  /**
   * Links Facebook to an existing PFUser. This method delegates to the
   * Facebook SDK to authenticate the user, and then automatically links
   * the account to the Parse.User.
   *
   * @method link
   * @param {Parse.User} user User to link to Facebook. This must be the
   *     current user.
   * @param {String, Object} permissions The permissions required for Facebook
   *    log in.  This is a comma-separated string of permissions.
   *    Alternatively, supply a Facebook authData object as described in our
   *    REST API docs if you want to handle getting facebook auth tokens
   *    yourself.
   * @param {Object} options Standard options object with success and error
   *    callbacks.
   */
  link: function link(user, permissions, options) {
    if (!permissions || typeof permissions === 'string') {
      if (!initialized) {
        throw new Error('You must initialize FacebookUtils before calling link.');
      }
      requestedPermissions = permissions;
      return user._linkWith('facebook', options);
    } else {
      var newOptions = {};
      if (options) {
        for (var key in options) {
          newOptions[key] = options[key];
        }
      }
      newOptions.authData = permissions;
      return user._linkWith('facebook', newOptions);
    }
  },

  /**
   * Unlinks the Parse.User from a Facebook account.
   *
   * @method unlink
   * @param {Parse.User} user User to unlink from Facebook. This must be the
   *     current user.
   * @param {Object} options Standard options object with success and error
   *    callbacks.
   */
  unlink: function unlink(user, options) {
    if (!initialized) {
      throw new Error('You must initialize FacebookUtils before calling unlink.');
    }
    return user._unlinkFrom('facebook', options);
  }
};
module.exports = exports['default'];
},{"./ParseUser":25,"./parseDate":40,"babel-runtime/helpers/interop-require-default":56}],6:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _ParsePromise = _dereq_('./ParsePromise');

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

var _Storage = _dereq_('./Storage');

var _Storage2 = _interopRequireDefault(_Storage);

var iidCache = null;

function hexOctet() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function generateId() {
  return hexOctet() + hexOctet() + '-' + hexOctet() + '-' + hexOctet() + '-' + hexOctet() + '-' + hexOctet() + hexOctet() + hexOctet();
}

module.exports = {
  currentInstallationId: function currentInstallationId() {
    if (typeof iidCache === 'string') {
      return _ParsePromise2['default'].as(iidCache);
    }
    var path = _Storage2['default'].generatePath('installationId');
    return _Storage2['default'].getItemAsync(path).then(function (iid) {
      if (!iid) {
        iid = generateId();
        return _Storage2['default'].setItemAsync(path, iid).then(function () {
          iidCache = iid;
          return iid;
        });
      }
      iidCache = iid;
      return iid;
    });
  },

  _clearCache: function _clearCache() {
    iidCache = null;
  },

  _setInstallationIdCache: function _setInstallationIdCache(iid) {
    iidCache = iid;
  }
};
},{"./CoreManager":3,"./ParsePromise":20,"./Storage":29,"babel-runtime/helpers/interop-require-default":56}],7:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _get = _dereq_('babel-runtime/helpers/get')['default'];

var _inherits = _dereq_('babel-runtime/helpers/inherits')['default'];

var _createClass = _dereq_('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = _dereq_('babel-runtime/helpers/class-call-check')['default'];

var _Map = _dereq_('babel-runtime/core-js/map')['default'];

var _getIterator = _dereq_('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _EventEmitter2 = _dereq_('./EventEmitter');

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _ParsePromise = _dereq_('./ParsePromise');

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _LiveQuerySubscription = _dereq_('./LiveQuerySubscription');

var _LiveQuerySubscription2 = _interopRequireDefault(_LiveQuerySubscription);

// The LiveQuery client inner state
var CLIENT_STATE = {
  INITIALIZED: 'initialized',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  CLOSED: 'closed',
  RECONNECTING: 'reconnecting',
  DISCONNECTED: 'disconnected'
};

// The event type the LiveQuery client should sent to server
var OP_TYPES = {
  CONNECT: 'connect',
  SUBSCRIBE: 'subscribe',
  UNSUBSCRIBE: 'unsubscribe',
  ERROR: 'error'
};

// The event we get back from LiveQuery server
var OP_EVENTS = {
  CONNECTED: 'connected',
  SUBSCRIBED: 'subscribed',
  UNSUBSCRIBED: 'unsubscribed',
  ERROR: 'error',
  CREATE: 'create',
  UPDATE: 'update',
  ENTER: 'enter',
  LEAVE: 'leave',
  DELETE: 'delete'
};

// The event the LiveQuery client should emit
var CLIENT_EMMITER_TYPES = {
  CLOSE: 'close',
  ERROR: 'error',
  OPEN: 'open'
};

// The event the LiveQuery subscription should emit
var SUBSCRIPTION_EMMITER_TYPES = {
  OPEN: 'open',
  CLOSE: 'close',
  ERROR: 'error',
  CREATE: 'create',
  UPDATE: 'update',
  ENTER: 'enter',
  LEAVE: 'leave',
  DELETE: 'delete'
};

var generateInterval = function generateInterval(k) {
  return Math.random() * Math.min(30, Math.pow(2, k) - 1) * 1000;
};

/**
 * Creates a new LiveQueryClient.
 * Extends events.EventEmitter
 * <a href="https://nodejs.org/api/events.html#events_class_eventemitter">cloud functions</a>.
 * 
 * A wrapper of a standard WebSocket client. We add several useful methods to 
 * help you connect/disconnect to LiveQueryServer, subscribe/unsubscribe a ParseQuery easily.
 *
 * javascriptKey and masterKey are used for verifying the LiveQueryClient when it tries
 * to connect to the LiveQuery server
 * 
 * @class Parse.LiveQueryClient
 * @constructor
 * @param {Object} options
 * @param {string} options.applicationId - applicationId of your Parse app
 * @param {string} options.serverURL - <b>the URL of your LiveQuery server</b>
 * @param {string} options.javascriptKey (optional)
 * @param {string} options.masterKey (optional) Your Parse Master Key. (Node.js only!)
 * @param {string} options.sessionToken (optional)
 *
 *
 * We expose three events to help you monitor the status of the LiveQueryClient.
 *
 * <pre>
 * let Parse = require('parse/node');
 * let LiveQueryClient = Parse.LiveQueryClient;
 * let client = new LiveQueryClient({
 *   applicationId: '',
 *   serverURL: '',
 *   javascriptKey: '',
 *   masterKey: ''
 *  });
 * </pre>
 * 
 * Open - When we establish the WebSocket connection to the LiveQuery server, you'll get this event.
 * <pre>
 * client.on('open', () => {
 * 
 * });</pre>
 *
 * Close - When we lose the WebSocket connection to the LiveQuery server, you'll get this event.
 * <pre>
 * client.on('close', () => {
 * 
 * });</pre>
 *
 * Error - When some network error or LiveQuery server error happens, you'll get this event.
 * <pre>
 * client.on('error', (error) => {
 * 
 * });</pre>
 * 
 * 
 */

var LiveQueryClient = (function (_EventEmitter) {
  _inherits(LiveQueryClient, _EventEmitter);

  function LiveQueryClient(_ref) {
    var applicationId = _ref.applicationId;
    var serverURL = _ref.serverURL;
    var javascriptKey = _ref.javascriptKey;
    var masterKey = _ref.masterKey;
    var sessionToken = _ref.sessionToken;

    _classCallCheck(this, LiveQueryClient);

    _get(Object.getPrototypeOf(LiveQueryClient.prototype), 'constructor', this).call(this);

    if (!serverURL || serverURL.indexOf('ws') !== 0) {
      throw new Error('You need to set a proper Parse LiveQuery server url before using LiveQueryClient');
    }

    this.reconnectHandle = null;
    this.attempts = 1;;
    this.id = 0;
    this.requestId = 1;
    this.serverURL = serverURL;
    this.applicationId = applicationId;
    this.javascriptKey = javascriptKey;
    this.masterKey = masterKey;
    this.sessionToken = sessionToken;
    this.connectPromise = new _ParsePromise2['default']();
    this.subscriptions = new _Map();
    this.state = CLIENT_STATE.INITIALIZED;
  }

  _createClass(LiveQueryClient, [{
    key: 'shouldOpen',
    value: function shouldOpen() {
      return this.state === CLIENT_STATE.INITIALIZED || this.state === CLIENT_STATE.DISCONNECTED;
    }

    /**
     * Subscribes to a ParseQuery
     * 
     * If you provide the sessionToken, when the LiveQuery server gets ParseObject's 
     * updates from parse server, it'll try to check whether the sessionToken fulfills 
     * the ParseObject's ACL. The LiveQuery server will only send updates to clients whose 
     * sessionToken is fit for the ParseObject's ACL. You can check the LiveQuery protocol
     * <a href="https://github.com/ParsePlatform/parse-server/wiki/Parse-LiveQuery-Protocol-Specification">here</a> for more details. The subscription you get is the same subscription you get 
     * from our Standard API.
     * 
     * @method subscribe
     * @param {Object} query - the ParseQuery you want to subscribe to
     * @param {string} sessionToken (optional) 
     * @return {Object} subscription
     */
  }, {
    key: 'subscribe',
    value: function subscribe(query, sessionToken) {
      var _this = this;

      if (!query) {
        return;
      }
      var where = query.toJSON().where;
      var className = query.className;
      var subscribeRequest = {
        op: OP_TYPES.SUBSCRIBE,
        requestId: this.requestId,
        query: {
          className: className,
          where: where
        }
      };

      if (sessionToken) {
        subscribeRequest.sessionToken = sessionToken;
      }

      var subscription = new _LiveQuerySubscription2['default'](this.requestId, query, sessionToken);
      this.subscriptions.set(this.requestId, subscription);
      this.requestId += 1;
      this.connectPromise.then(function () {
        _this.socket.send(JSON.stringify(subscribeRequest));
      });

      // adding listener so process does not crash
      // best practice is for developer to register their own listener
      subscription.on('error', function () {});

      return subscription;
    }

    /**
     * After calling unsubscribe you'll stop receiving events from the subscription object.
     * 
     * @method unsubscribe
     * @param {Object} subscription - subscription you would like to unsubscribe from.
     */
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(subscription) {
      var _this2 = this;

      if (!subscription) {
        return;
      }

      this.subscriptions['delete'](subscription.id);
      var unsubscribeRequest = {
        op: OP_TYPES.UNSUBSCRIBE,
        requestId: subscription.id
      };
      this.connectPromise.then(function () {
        _this2.socket.send(JSON.stringify(unsubscribeRequest));
      });
    }

    /**
     * After open is called, the LiveQueryClient will try to send a connect request
     * to the LiveQuery server.
     * 
     * @method open
     */
  }, {
    key: 'open',
    value: function open() {
      var _this3 = this;

      var WebSocketImplementation = this._getWebSocketImplementation();
      if (!WebSocketImplementation) {
        this.emit(CLIENT_EMMITER_TYPES.ERROR, 'Can not find WebSocket implementation');
        return;
      }

      if (this.state !== CLIENT_STATE.RECONNECTING) {
        this.state = CLIENT_STATE.CONNECTING;
      }

      // Get WebSocket implementation
      this.socket = new WebSocketImplementation(this.serverURL);

      // Bind WebSocket callbacks
      this.socket.onopen = function () {
        _this3._handleWebSocketOpen();
      };

      this.socket.onmessage = function (event) {
        _this3._handleWebSocketMessage(event);
      };

      this.socket.onclose = function () {
        _this3._handleWebSocketClose();
      };

      this.socket.onerror = function (error) {
        console.log("error on socket");
        _this3._handleWebSocketError(error);
      };
    }
  }, {
    key: 'resubscribe',
    value: function resubscribe() {
      var _this4 = this;

      this.subscriptions.forEach(function (subscription, requestId) {
        var query = subscription.query;
        var where = query.toJSON().where;
        var className = query.className;
        var sessionToken = subscription.sessionToken;
        var subscribeRequest = {
          op: OP_TYPES.SUBSCRIBE,
          requestId: requestId,
          query: {
            className: className,
            where: where
          }
        };

        if (sessionToken) {
          subscribeRequest.sessionToken = sessionToken;
        }

        _this4.connectPromise.then(function () {
          _this4.socket.send(JSON.stringify(subscribeRequest));
        });
      });
    }

    /**
     * This method will close the WebSocket connection to this LiveQueryClient, 
     * cancel the auto reconnect and unsubscribe all subscriptions based on it.
     * 
     * @method close
     */
  }, {
    key: 'close',
    value: function close() {
      if (this.state === CLIENT_STATE.INITIALIZED || this.state === CLIENT_STATE.DISCONNECTED) {
        return;
      }
      this.state = CLIENT_STATE.DISCONNECTED;
      this.socket.close();
      // Notify each subscription about the close
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(this.subscriptions.values()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var subscription = _step.value;

          subscription.emit(SUBSCRIPTION_EMMITER_TYPES.CLOSE);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this._handleReset();
      this.emit(CLIENT_EMMITER_TYPES.CLOSE);
    }
  }, {
    key: '_getWebSocketImplementation',
    value: function _getWebSocketImplementation() {
      return typeof WebSocket === 'function' || typeof WebSocket === 'object' ? WebSocket : null;
    }

    // ensure we start with valid state if connect is called again after close
  }, {
    key: '_handleReset',
    value: function _handleReset() {
      this.attempts = 1;;
      this.id = 0;
      this.requestId = 1;
      this.connectPromise = new _ParsePromise2['default']();
      this.subscriptions = new _Map();
    }
  }, {
    key: '_handleWebSocketOpen',
    value: function _handleWebSocketOpen() {
      this.attempts = 1;
      var connectRequest = {
        op: OP_TYPES.CONNECT,
        applicationId: this.applicationId,
        javascriptKey: this.javascriptKey,
        masterKey: this.masterKey,
        sessionToken: this.sessionToken
      };
      this.socket.send(JSON.stringify(connectRequest));
    }
  }, {
    key: '_handleWebSocketMessage',
    value: function _handleWebSocketMessage(event) {
      var data = event.data;
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      var subscription = null;
      if (data.requestId) {
        subscription = this.subscriptions.get(data.requestId);
      }
      switch (data.op) {
        case OP_EVENTS.CONNECTED:
          if (this.state === CLIENT_STATE.RECONNECTING) {
            this.resubscribe();
          }
          this.emit(CLIENT_EMMITER_TYPES.OPEN);
          this.id = data.clientId;
          this.connectPromise.resolve();
          this.state = CLIENT_STATE.CONNECTED;
          break;
        case OP_EVENTS.SUBSCRIBED:
          if (subscription) {
            subscription.emit(SUBSCRIPTION_EMMITER_TYPES.OPEN);
          }
          break;
        case OP_EVENTS.ERROR:
          if (data.requestId) {
            if (subscription) {
              subscription.emit(SUBSCRIPTION_EMMITER_TYPES.ERROR, data.error);
            }
          } else {
            this.emit(CLIENT_EMMITER_TYPES.ERROR, data.error);
          }
          break;
        case OP_EVENTS.UNSUBSCRIBED:
          // We have already deleted subscription in unsubscribe(), do nothing here
          break;
        default:
          // create, update, enter, leave, delete cases
          var className = data.object.className;
          // Delete the extrea __type and className fields during transfer to full JSON
          delete data.object.__type;
          delete data.object.className;
          var parseObject = new _ParseObject2['default'](className);
          parseObject._finishFetch(data.object);
          if (!subscription) {
            break;
          }
          subscription.emit(data.op, parseObject);
      }
    }
  }, {
    key: '_handleWebSocketClose',
    value: function _handleWebSocketClose() {
      if (this.state === CLIENT_STATE.DISCONNECTED) {
        return;
      }
      this.state = CLIENT_STATE.CLOSED;
      this.emit(CLIENT_EMMITER_TYPES.CLOSE);
      // Notify each subscription about the close
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _getIterator(this.subscriptions.values()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var subscription = _step2.value;

          subscription.emit(SUBSCRIPTION_EMMITER_TYPES.CLOSE);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this._handleReconnect();
    }
  }, {
    key: '_handleWebSocketError',
    value: function _handleWebSocketError(error) {
      this.emit(CLIENT_EMMITER_TYPES.ERROR, error);
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = _getIterator(this.subscriptions.values()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var subscription = _step3.value;

          subscription.emit(SUBSCRIPTION_EMMITER_TYPES.ERROR);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3['return']) {
            _iterator3['return']();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      this._handleReconnect();
    }
  }, {
    key: '_handleReconnect',
    value: function _handleReconnect() {
      var _this5 = this;

      // if closed or currently reconnecting we stop attempting to reconnect
      if (this.state === CLIENT_STATE.DISCONNECTED) {
        return;
      }

      this.state = CLIENT_STATE.RECONNECTING;
      var time = generateInterval(this.attempts);

      // handle case when both close/error occur at frequent rates we ensure we do not reconnect unnecessarily.
      // we're unable to distinguish different between close/error when we're unable to reconnect therefore
      // we try to reonnect in both cases
      // server side ws and browser WebSocket behave differently in when close/error get triggered

      if (this.reconnectHandle) {
        clearTimeout(this.reconnectHandle);
      } else {
        console.info('attempting to reconnect');
      }

      this.reconnectHandle = setTimeout((function () {
        _this5.attempts++;
        _this5.connectPromise = new _ParsePromise2['default']();
        _this5.open();
      }).bind(this), time);
    }
  }]);

  return LiveQueryClient;
})(_EventEmitter3['default']);

exports['default'] = LiveQueryClient;
module.exports = exports['default'];
},{"./EventEmitter":4,"./LiveQuerySubscription":8,"./ParseObject":18,"./ParsePromise":20,"babel-runtime/core-js/get-iterator":43,"babel-runtime/core-js/map":44,"babel-runtime/helpers/class-call-check":52,"babel-runtime/helpers/create-class":53,"babel-runtime/helpers/get":54,"babel-runtime/helpers/inherits":55,"babel-runtime/helpers/interop-require-default":56}],8:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _get = _dereq_('babel-runtime/helpers/get')['default'];

var _inherits = _dereq_('babel-runtime/helpers/inherits')['default'];

var _createClass = _dereq_('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = _dereq_('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _EventEmitter2 = _dereq_('./EventEmitter');

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

/**
 * Creates a new LiveQuery Subscription.
 * Extends events.EventEmitter
 * <a href="https://nodejs.org/api/events.html#events_class_eventemitter">cloud functions</a>.
 * 
 * @constructor
 * @param {string} id - subscription id
 * @param {string} query - query to subscribe to
 * @param {string} sessionToken - optional session token
 *
 * <p>Open Event - When you call query.subscribe(), we send a subscribe request to 
 * the LiveQuery server, when we get the confirmation from the LiveQuery server,
 * this event will be emitted. When the client loses WebSocket connection to the
 * LiveQuery server, we will try to auto reconnect the LiveQuery server. If we
 * reconnect the LiveQuery server and successfully resubscribe the ParseQuery,
 * you'll also get this event.
 * 
 * <pre>
 * subscription.on('open', () => {
 * 
 * });</pre></p>
 *
 * <p>Create Event - When a new ParseObject is created and it fulfills the ParseQuery you subscribe,
 * you'll get this event. The object is the ParseObject which is created.
 * 
 * <pre>
 * subscription.on('create', (object) => {
 * 
 * });</pre></p>
 *
 * <p>Update Event - When an existing ParseObject which fulfills the ParseQuery you subscribe 
 * is updated (The ParseObject fulfills the ParseQuery before and after changes),
 * you'll get this event. The object is the ParseObject which is updated.
 * Its content is the latest value of the ParseObject.
 * 
 * <pre>
 * subscription.on('update', (object) => {
 * 
 * });</pre></p>
 * 
 * <p>Enter Event - When an existing ParseObject's old value doesn't fulfill the ParseQuery
 * but its new value fulfills the ParseQuery, you'll get this event. The object is the
 * ParseObject which enters the ParseQuery. Its content is the latest value of the ParseObject.
 * 
 * <pre>
 * subscription.on('enter', (object) => {
 * 
 * });</pre></p>
 *
 *
 * <p>Update Event - When an existing ParseObject's old value fulfills the ParseQuery but its new value
 * doesn't fulfill the ParseQuery, you'll get this event. The object is the ParseObject
 * which leaves the ParseQuery. Its content is the latest value of the ParseObject.
 * 
 * <pre>
 * subscription.on('leave', (object) => {
 * 
 * });</pre></p>
 *
 *
 * <p>Delete Event - When an existing ParseObject which fulfills the ParseQuery is deleted, you'll
 * get this event. The object is the ParseObject which is deleted.
 * 
 * <pre>
 * subscription.on('delete', (object) => {
 * 
 * });</pre></p>
 *
 *
 * <p>Close Event - When the client loses the WebSocket connection to the LiveQuery
 * server and we stop receiving events, you'll get this event.
 * 
 * <pre>
 * subscription.on('close', () => {
 * 
 * });</pre></p>
 *
 * 
 */

var Subscription = (function (_EventEmitter) {
  _inherits(Subscription, _EventEmitter);

  function Subscription(id, query, sessionToken) {
    _classCallCheck(this, Subscription);

    _get(Object.getPrototypeOf(Subscription.prototype), 'constructor', this).call(this);
    this.id = id;
    this.query = query;
    this.sessionToken = sessionToken;
  }

  /**
   * @method unsubscribe
   */

  _createClass(Subscription, [{
    key: 'unsubscribe',
    value: function unsubscribe() {
      var _this2 = this;

      var _this = this;
      _CoreManager2['default'].getLiveQueryController().getDefaultLiveQueryClient().then(function (liveQueryClient) {
        liveQueryClient.unsubscribe(_this);
        _this.emit('close');
        _this2.resolve();
      });
    }
  }]);

  return Subscription;
})(_EventEmitter3['default']);

exports['default'] = Subscription;
module.exports = exports['default'];
},{"./CoreManager":3,"./EventEmitter":4,"babel-runtime/helpers/class-call-check":52,"babel-runtime/helpers/create-class":53,"babel-runtime/helpers/get":54,"babel-runtime/helpers/inherits":55,"babel-runtime/helpers/interop-require-default":56}],9:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.defaultState = defaultState;
exports.setServerData = setServerData;
exports.setPendingOp = setPendingOp;
exports.pushPendingState = pushPendingState;
exports.popPendingState = popPendingState;
exports.mergeFirstPendingState = mergeFirstPendingState;
exports.estimateAttribute = estimateAttribute;
exports.estimateAttributes = estimateAttributes;
exports.commitServerChanges = commitServerChanges;

var _encode = _dereq_('./encode');

var _encode2 = _interopRequireDefault(_encode);

var _ParseFile = _dereq_('./ParseFile');

var _ParseFile2 = _interopRequireDefault(_ParseFile);

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParsePromise = _dereq_('./ParsePromise');

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

var _ParseRelation = _dereq_('./ParseRelation');

var _ParseRelation2 = _interopRequireDefault(_ParseRelation);

var _TaskQueue = _dereq_('./TaskQueue');

var _TaskQueue2 = _interopRequireDefault(_TaskQueue);

var _ParseOp = _dereq_('./ParseOp');

function defaultState() {
  return {
    serverData: {},
    pendingOps: [{}],
    objectCache: {},
    tasks: new _TaskQueue2['default'](),
    existed: false
  };
}

function setServerData(serverData, attributes) {
  for (var _attr in attributes) {
    if (typeof attributes[_attr] !== 'undefined') {
      serverData[_attr] = attributes[_attr];
    } else {
      delete serverData[_attr];
    }
  }
}

function setPendingOp(pendingOps, attr, op) {
  var last = pendingOps.length - 1;
  if (op) {
    pendingOps[last][attr] = op;
  } else {
    delete pendingOps[last][attr];
  }
}

function pushPendingState(pendingOps) {
  pendingOps.push({});
}

function popPendingState(pendingOps) {
  var first = pendingOps.shift();
  if (!pendingOps.length) {
    pendingOps[0] = {};
  }
  return first;
}

function mergeFirstPendingState(pendingOps) {
  var first = popPendingState(pendingOps);
  var next = pendingOps[0];
  for (var _attr2 in first) {
    if (next[_attr2] && first[_attr2]) {
      var merged = next[_attr2].mergeWith(first[_attr2]);
      if (merged) {
        next[_attr2] = merged;
      }
    } else {
      next[_attr2] = first[_attr2];
    }
  }
}

function estimateAttribute(serverData, pendingOps, className, id, attr) {
  var value = serverData[attr];
  for (var i = 0; i < pendingOps.length; i++) {
    if (pendingOps[i][attr]) {
      if (pendingOps[i][attr] instanceof _ParseOp.RelationOp) {
        if (id) {
          value = pendingOps[i][attr].applyTo(value, { className: className, id: id }, attr);
        }
      } else {
        value = pendingOps[i][attr].applyTo(value);
      }
    }
  }
  return value;
}

function estimateAttributes(serverData, pendingOps, className, id) {
  var data = {};
  var attr = undefined;
  for (attr in serverData) {
    data[attr] = serverData[attr];
  }
  for (var i = 0; i < pendingOps.length; i++) {
    for (attr in pendingOps[i]) {
      if (pendingOps[i][attr] instanceof _ParseOp.RelationOp) {
        if (id) {
          data[attr] = pendingOps[i][attr].applyTo(data[attr], { className: className, id: id }, attr);
        }
      } else {
        data[attr] = pendingOps[i][attr].applyTo(data[attr]);
      }
    }
  }
  return data;
}

function commitServerChanges(serverData, objectCache, changes) {
  for (var _attr3 in changes) {
    var val = changes[_attr3];
    serverData[_attr3] = val;
    if (val && typeof val === 'object' && !(val instanceof _ParseObject2['default']) && !(val instanceof _ParseFile2['default']) && !(val instanceof _ParseRelation2['default'])) {
      var json = (0, _encode2['default'])(val, false, true);
      objectCache[_attr3] = JSON.stringify(json);
    }
  }
}
},{"./ParseFile":14,"./ParseObject":18,"./ParseOp":19,"./ParsePromise":20,"./ParseRelation":22,"./TaskQueue":31,"./encode":36,"babel-runtime/helpers/interop-require-default":56}],10:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = _dereq_('babel-runtime/helpers/interop-require-wildcard')['default'];

var _decode = _dereq_('./decode');

var _decode2 = _interopRequireDefault(_decode);

var _encode = _dereq_('./encode');

var _encode2 = _interopRequireDefault(_encode);

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _InstallationController = _dereq_('./InstallationController');

var _InstallationController2 = _interopRequireDefault(_InstallationController);

var _ParseOp = _dereq_('./ParseOp');

var ParseOp = _interopRequireWildcard(_ParseOp);

var _RESTController = _dereq_('./RESTController');

var _RESTController2 = _interopRequireDefault(_RESTController);

/**
 * Contains all Parse API classes and functions.
 * @class Parse
 * @static
 */
var Parse = {
  /**
   * Call this method first to set up your authentication tokens for Parse.
   * You can get your keys from the Data Browser on parse.com.
   * @method initialize
   * @param {String} applicationId Your Parse Application ID.
   * @param {String} javaScriptKey (optional) Your Parse JavaScript Key (Not needed for parse-server)
   * @param {String} masterKey (optional) Your Parse Master Key. (Node.js only!)
   * @static
   */
  initialize: function initialize(applicationId, javaScriptKey) {
    if ('browser' === 'browser' && _CoreManager2['default'].get('IS_NODE')) {
      console.log('It looks like you\'re using the browser version of the SDK in a ' + 'node.js environment. You should require(\'parse/node\') instead.');
    }
    Parse._initialize(applicationId, javaScriptKey);
  },

  _initialize: function _initialize(applicationId, javaScriptKey, masterKey) {
    _CoreManager2['default'].set('APPLICATION_ID', applicationId);
    _CoreManager2['default'].set('JAVASCRIPT_KEY', javaScriptKey);
    _CoreManager2['default'].set('MASTER_KEY', masterKey);
    _CoreManager2['default'].set('USE_MASTER_KEY', false);
  }
};

/** These legacy setters may eventually be deprecated **/
Object.defineProperty(Parse, 'applicationId', {
  get: function get() {
    return _CoreManager2['default'].get('APPLICATION_ID');
  },
  set: function set(value) {
    _CoreManager2['default'].set('APPLICATION_ID', value);
  }
});
Object.defineProperty(Parse, 'javaScriptKey', {
  get: function get() {
    return _CoreManager2['default'].get('JAVASCRIPT_KEY');
  },
  set: function set(value) {
    _CoreManager2['default'].set('JAVASCRIPT_KEY', value);
  }
});
Object.defineProperty(Parse, 'masterKey', {
  get: function get() {
    return _CoreManager2['default'].get('MASTER_KEY');
  },
  set: function set(value) {
    _CoreManager2['default'].set('MASTER_KEY', value);
  }
});
Object.defineProperty(Parse, 'serverURL', {
  get: function get() {
    return _CoreManager2['default'].get('SERVER_URL');
  },
  set: function set(value) {
    _CoreManager2['default'].set('SERVER_URL', value);
  }
});
Object.defineProperty(Parse, 'liveQueryServerURL', {
  get: function get() {
    return _CoreManager2['default'].get('LIVEQUERY_SERVER_URL');
  },
  set: function set(value) {
    _CoreManager2['default'].set('LIVEQUERY_SERVER_URL', value);
  }
});
/** End setters **/

Parse.ACL = _dereq_('./ParseACL');
Parse.Analytics = _dereq_('./Analytics');
Parse.Cloud = _dereq_('./Cloud');
Parse.CoreManager = _dereq_('./CoreManager');
Parse.Config = _dereq_('./ParseConfig');
Parse.Error = _dereq_('./ParseError');
Parse.FacebookUtils = _dereq_('./FacebookUtils');
Parse.File = _dereq_('./ParseFile');
Parse.GeoPoint = _dereq_('./ParseGeoPoint');
Parse.Installation = _dereq_('./ParseInstallation');
Parse.Object = _dereq_('./ParseObject');
Parse.Op = {
  Set: ParseOp.SetOp,
  Unset: ParseOp.UnsetOp,
  Increment: ParseOp.IncrementOp,
  Add: ParseOp.AddOp,
  Remove: ParseOp.RemoveOp,
  AddUnique: ParseOp.AddUniqueOp,
  Relation: ParseOp.RelationOp
};
Parse.Promise = _dereq_('./ParsePromise');
Parse.Push = _dereq_('./Push');
Parse.Query = _dereq_('./ParseQuery');
Parse.Relation = _dereq_('./ParseRelation');
Parse.Role = _dereq_('./ParseRole');
Parse.Session = _dereq_('./ParseSession');
Parse.Storage = _dereq_('./Storage');
Parse.User = _dereq_('./ParseUser');
Parse.LiveQuery = _dereq_('./ParseLiveQuery');
Parse.LiveQueryClient = _dereq_('./LiveQueryClient');

Parse._request = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _CoreManager2['default'].getRESTController().request.apply(null, args);
};
Parse._ajax = function () {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return _CoreManager2['default'].getRESTController().ajax.apply(null, args);
};
// We attempt to match the signatures of the legacy versions of these methods
Parse._decode = function (_, value) {
  return (0, _decode2['default'])(value);
};
Parse._encode = function (value, _, disallowObjects) {
  return (0, _encode2['default'])(value, disallowObjects);
};
Parse._getInstallationId = function () {
  return _CoreManager2['default'].getInstallationController().currentInstallationId();
};

_CoreManager2['default'].setInstallationController(_InstallationController2['default']);
_CoreManager2['default'].setRESTController(_RESTController2['default']);

// For legacy requires, of the form `var Parse = require('parse').Parse`
Parse.Parse = Parse;

module.exports = Parse;
},{"./Analytics":1,"./Cloud":2,"./CoreManager":3,"./FacebookUtils":5,"./InstallationController":6,"./LiveQueryClient":7,"./ParseACL":11,"./ParseConfig":12,"./ParseError":13,"./ParseFile":14,"./ParseGeoPoint":15,"./ParseInstallation":16,"./ParseLiveQuery":17,"./ParseObject":18,"./ParseOp":19,"./ParsePromise":20,"./ParseQuery":21,"./ParseRelation":22,"./ParseRole":23,"./ParseSession":24,"./ParseUser":25,"./Push":26,"./RESTController":27,"./Storage":29,"./decode":35,"./encode":36,"babel-runtime/helpers/interop-require-default":56,"babel-runtime/helpers/interop-require-wildcard":57}],11:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _createClass = _dereq_('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = _dereq_('babel-runtime/helpers/class-call-check')['default'];

var _Object$keys = _dereq_('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ParseRole = _dereq_('./ParseRole');

var _ParseRole2 = _interopRequireDefault(_ParseRole);

var _ParseUser = _dereq_('./ParseUser');

var _ParseUser2 = _interopRequireDefault(_ParseUser);

var PUBLIC_KEY = '*';

/**
 * Creates a new ACL.
 * If no argument is given, the ACL has no permissions for anyone.
 * If the argument is a Parse.User, the ACL will have read and write
 *   permission for only that user.
 * If the argument is any other JSON object, that object will be interpretted
 *   as a serialized ACL created with toJSON().
 * @class Parse.ACL
 * @constructor
 *
 * <p>An ACL, or Access Control List can be added to any
 * <code>Parse.Object</code> to restrict access to only a subset of users
 * of your application.</p>
 */

var ParseACL = (function () {
  function ParseACL(arg1) {
    _classCallCheck(this, ParseACL);

    this.permissionsById = {};
    if (arg1 && typeof arg1 === 'object') {
      if (arg1 instanceof _ParseUser2['default']) {
        this.setReadAccess(arg1, true);
        this.setWriteAccess(arg1, true);
      } else {
        for (var userId in arg1) {
          var accessList = arg1[userId];
          if (typeof userId !== 'string') {
            throw new TypeError('Tried to create an ACL with an invalid user id.');
          }
          this.permissionsById[userId] = {};
          for (var permission in accessList) {
            var allowed = accessList[permission];
            if (permission !== 'read' && permission !== 'write') {
              throw new TypeError('Tried to create an ACL with an invalid permission type.');
            }
            if (typeof allowed !== 'boolean') {
              throw new TypeError('Tried to create an ACL with an invalid permission value.');
            }
            this.permissionsById[userId][permission] = allowed;
          }
        }
      }
    } else if (typeof arg1 === 'function') {
      throw new TypeError('ParseACL constructed with a function. Did you forget ()?');
    }
  }

  /**
   * Returns a JSON-encoded version of the ACL.
   * @method toJSON
   * @return {Object}
   */

  _createClass(ParseACL, [{
    key: 'toJSON',
    value: function toJSON() {
      var permissions = {};
      for (var p in this.permissionsById) {
        permissions[p] = this.permissionsById[p];
      }
      return permissions;
    }

    /**
     * Returns whether this ACL is equal to another object
     * @method equals
     * @param other The other object to compare to
     * @return {Boolean}
     */
  }, {
    key: 'equals',
    value: function equals(other) {
      if (!(other instanceof ParseACL)) {
        return false;
      }
      var users = _Object$keys(this.permissionsById);
      var otherUsers = _Object$keys(other.permissionsById);
      if (users.length !== otherUsers.length) {
        return false;
      }
      for (var u in this.permissionsById) {
        if (!other.permissionsById[u]) {
          return false;
        }
        if (this.permissionsById[u].read !== other.permissionsById[u].read) {
          return false;
        }
        if (this.permissionsById[u].write !== other.permissionsById[u].write) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: '_setAccess',
    value: function _setAccess(accessType, userId, allowed) {
      if (userId instanceof _ParseUser2['default']) {
        userId = userId.id;
      } else if (userId instanceof _ParseRole2['default']) {
        var _name = userId.getName();
        if (!_name) {
          throw new TypeError('Role must have a name');
        }
        userId = 'role:' + _name;
      }
      if (typeof userId !== 'string') {
        throw new TypeError('userId must be a string.');
      }
      if (typeof allowed !== 'boolean') {
        throw new TypeError('allowed must be either true or false.');
      }
      var permissions = this.permissionsById[userId];
      if (!permissions) {
        if (!allowed) {
          // The user already doesn't have this permission, so no action is needed
          return;
        } else {
          permissions = {};
          this.permissionsById[userId] = permissions;
        }
      }

      if (allowed) {
        this.permissionsById[userId][accessType] = true;
      } else {
        delete permissions[accessType];
        if (_Object$keys(permissions).length === 0) {
          delete this.permissionsById[userId];
        }
      }
    }
  }, {
    key: '_getAccess',
    value: function _getAccess(accessType, userId) {
      if (userId instanceof _ParseUser2['default']) {
        userId = userId.id;
        if (!userId) {
          throw new Error('Cannot get access for a ParseUser without an ID');
        }
      } else if (userId instanceof _ParseRole2['default']) {
        var _name2 = userId.getName();
        if (!_name2) {
          throw new TypeError('Role must have a name');
        }
        userId = 'role:' + _name2;
      }
      var permissions = this.permissionsById[userId];
      if (!permissions) {
        return false;
      }
      return !!permissions[accessType];
    }

    /**
     * Sets whether the given user is allowed to read this object.
     * @method setReadAccess
     * @param userId An instance of Parse.User or its objectId.
     * @param {Boolean} allowed Whether that user should have read access.
     */
  }, {
    key: 'setReadAccess',
    value: function setReadAccess(userId, allowed) {
      this._setAccess('read', userId, allowed);
    }

    /**
     * Get whether the given user id is *explicitly* allowed to read this object.
     * Even if this returns false, the user may still be able to access it if
     * getPublicReadAccess returns true or a role that the user belongs to has
     * write access.
     * @method getReadAccess
     * @param userId An instance of Parse.User or its objectId, or a Parse.Role.
     * @return {Boolean}
     */
  }, {
    key: 'getReadAccess',
    value: function getReadAccess(userId) {
      return this._getAccess('read', userId);
    }

    /**
     * Sets whether the given user id is allowed to write this object.
     * @method setWriteAccess
     * @param userId An instance of Parse.User or its objectId, or a Parse.Role..
     * @param {Boolean} allowed Whether that user should have write access.
     */
  }, {
    key: 'setWriteAccess',
    value: function setWriteAccess(userId, allowed) {
      this._setAccess('write', userId, allowed);
    }

    /**
     * Gets whether the given user id is *explicitly* allowed to write this object.
     * Even if this returns false, the user may still be able to write it if
     * getPublicWriteAccess returns true or a role that the user belongs to has
     * write access.
     * @method getWriteAccess
     * @param userId An instance of Parse.User or its objectId, or a Parse.Role.
     * @return {Boolean}
     */
  }, {
    key: 'getWriteAccess',
    value: function getWriteAccess(userId) {
      return this._getAccess('write', userId);
    }

    /**
     * Sets whether the public is allowed to read this object.
     * @method setPublicReadAccess
     * @param {Boolean} allowed
     */
  }, {
    key: 'setPublicReadAccess',
    value: function setPublicReadAccess(allowed) {
      this.setReadAccess(PUBLIC_KEY, allowed);
    }

    /**
     * Gets whether the public is allowed to read this object.
     * @method getPublicReadAccess
     * @return {Boolean}
     */
  }, {
    key: 'getPublicReadAccess',
    value: function getPublicReadAccess() {
      return this.getReadAccess(PUBLIC_KEY);
    }

    /**
     * Sets whether the public is allowed to write this object.
     * @method setPublicWriteAccess
     * @param {Boolean} allowed
     */
  }, {
    key: 'setPublicWriteAccess',
    value: function setPublicWriteAccess(allowed) {
      this.setWriteAccess(PUBLIC_KEY, allowed);
    }

    /**
     * Gets whether the public is allowed to write this object.
     * @method getPublicWriteAccess
     * @return {Boolean}
     */
  }, {
    key: 'getPublicWriteAccess',
    value: function getPublicWriteAccess() {
      return this.getWriteAccess(PUBLIC_KEY);
    }

    /**
     * Gets whether users belonging to the given role are allowed
     * to read this object. Even if this returns false, the role may
     * still be able to write it if a parent role has read access.
     *
     * @method getRoleReadAccess
     * @param role The name of the role, or a Parse.Role object.
     * @return {Boolean} true if the role has read access. false otherwise.
     * @throws {TypeError} If role is neither a Parse.Role nor a String.
     */
  }, {
    key: 'getRoleReadAccess',
    value: function getRoleReadAccess(role) {
      if (role instanceof _ParseRole2['default']) {
        // Normalize to the String name
        role = role.getName();
      }
      if (typeof role !== 'string') {
        throw new TypeError('role must be a ParseRole or a String');
      }
      return this.getReadAccess('role:' + role);
    }

    /**
     * Gets whether users belonging to the given role are allowed
     * to write this object. Even if this returns false, the role may
     * still be able to write it if a parent role has write access.
     *
     * @method getRoleWriteAccess
     * @param role The name of the role, or a Parse.Role object.
     * @return {Boolean} true if the role has write access. false otherwise.
     * @throws {TypeError} If role is neither a Parse.Role nor a String.
     */
  }, {
    key: 'getRoleWriteAccess',
    value: function getRoleWriteAccess(role) {
      if (role instanceof _ParseRole2['default']) {
        // Normalize to the String name
        role = role.getName();
      }
      if (typeof role !== 'string') {
        throw new TypeError('role must be a ParseRole or a String');
      }
      return this.getWriteAccess('role:' + role);
    }

    /**
     * Sets whether users belonging to the given role are allowed
     * to read this object.
     *
     * @method setRoleReadAccess
     * @param role The name of the role, or a Parse.Role object.
     * @param {Boolean} allowed Whether the given role can read this object.
     * @throws {TypeError} If role is neither a Parse.Role nor a String.
     */
  }, {
    key: 'setRoleReadAccess',
    value: function setRoleReadAccess(role, allowed) {
      if (role instanceof _ParseRole2['default']) {
        // Normalize to the String name
        role = role.getName();
      }
      if (typeof role !== 'string') {
        throw new TypeError('role must be a ParseRole or a String');
      }
      this.setReadAccess('role:' + role, allowed);
    }

    /**
     * Sets whether users belonging to the given role are allowed
     * to write this object.
     *
     * @method setRoleWriteAccess
     * @param role The name of the role, or a Parse.Role object.
     * @param {Boolean} allowed Whether the given role can write this object.
     * @throws {TypeError} If role is neither a Parse.Role nor a String.
     */
  }, {
    key: 'setRoleWriteAccess',
    value: function setRoleWriteAccess(role, allowed) {
      if (role instanceof _ParseRole2['default']) {
        // Normalize to the String name
        role = role.getName();
      }
      if (typeof role !== 'string') {
        throw new TypeError('role must be a ParseRole or a String');
      }
      this.setWriteAccess('role:' + role, allowed);
    }
  }]);

  return ParseACL;
})();

exports['default'] = ParseACL;
module.exports = exports['default'];
},{"./ParseRole":23,"./ParseUser":25,"babel-runtime/core-js/object/keys":49,"babel-runtime/helpers/class-call-check":52,"babel-runtime/helpers/create-class":53,"babel-runtime/helpers/interop-require-default":56}],12:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _createClass = _dereq_('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = _dereq_('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _decode = _dereq_('./decode');

var _decode2 = _interopRequireDefault(_decode);

var _encode = _dereq_('./encode');

var _encode2 = _interopRequireDefault(_encode);

var _escape2 = _dereq_('./escape');

var _escape3 = _interopRequireDefault(_escape2);

var _ParseError = _dereq_('./ParseError');

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParsePromise = _dereq_('./ParsePromise');

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

var _Storage = _dereq_('./Storage');

var _Storage2 = _interopRequireDefault(_Storage);

/**
 * Parse.Config is a local representation of configuration data that
 * can be set from the Parse dashboard.
 *
 * @class Parse.Config
 * @constructor
 */

var ParseConfig = (function () {
  function ParseConfig() {
    _classCallCheck(this, ParseConfig);

    this.attributes = {};
    this._escapedAttributes = {};
  }

  /**
   * Gets the value of an attribute.
   * @method get
   * @param {String} attr The name of an attribute.
   */

  _createClass(ParseConfig, [{
    key: 'get',
    value: function get(attr) {
      return this.attributes[attr];
    }

    /**
     * Gets the HTML-escaped value of an attribute.
     * @method escape
     * @param {String} attr The name of an attribute.
     */
  }, {
    key: 'escape',
    value: function escape(attr) {
      var html = this._escapedAttributes[attr];
      if (html) {
        return html;
      }
      var val = this.attributes[attr];
      var escaped = '';
      if (val != null) {
        escaped = (0, _escape3['default'])(val.toString());
      }
      this._escapedAttributes[attr] = escaped;
      return escaped;
    }

    /**
     * Retrieves the most recently-fetched configuration object, either from
     * memory or from local storage if necessary.
     *
     * @method current
     * @static
     * @return {Config} The most recently-fetched Parse.Config if it
     *     exists, else an empty Parse.Config.
     */
  }], [{
    key: 'current',
    value: function current() {
      var controller = _CoreManager2['default'].getConfigController();
      return controller.current();
    }

    /**
     * Gets a new configuration object from the server.
     * @method get
     * @static
     * @param {Object} options A Backbone-style options object.
     * Valid options are:<ul>
     *   <li>success: Function to call when the get completes successfully.
     *   <li>error: Function to call when the get fails.
     * </ul>
     * @return {Parse.Promise} A promise that is resolved with a newly-created
     *     configuration object when the get completes.
     */
  }, {
    key: 'get',
    value: function get(options) {
      options = options || {};

      var controller = _CoreManager2['default'].getConfigController();
      return controller.get()._thenRunCallbacks(options);
    }
  }]);

  return ParseConfig;
})();

exports['default'] = ParseConfig;

var currentConfig = null;

var CURRENT_CONFIG_KEY = 'currentConfig';

function decodePayload(data) {
  try {
    var json = JSON.parse(data);
    if (json && typeof json === 'object') {
      return (0, _decode2['default'])(json);
    }
  } catch (e) {
    return null;
  }
}

_CoreManager2['default'].setConfigController({
  current: function current() {
    if (currentConfig) {
      return currentConfig;
    }

    var config = new ParseConfig();
    var storagePath = _Storage2['default'].generatePath(CURRENT_CONFIG_KEY);
    var configData;
    if (!_Storage2['default'].async()) {
      configData = _Storage2['default'].getItem(storagePath);

      if (configData) {
        var attributes = decodePayload(configData);
        if (attributes) {
          config.attributes = attributes;
          currentConfig = config;
        }
      }
      return config;
    }
    // Return a promise for async storage controllers
    return _Storage2['default'].getItemAsync(storagePath).then(function (configData) {
      if (configData) {
        var attributes = decodePayload(configData);
        if (attributes) {
          config.attributes = attributes;
          currentConfig = config;
        }
      }
      return config;
    });
  },

  get: function get() {
    var RESTController = _CoreManager2['default'].getRESTController();

    return RESTController.request('GET', 'config', {}, {}).then(function (response) {
      if (!response || !response.params) {
        var error = new _ParseError2['default'](_ParseError2['default'].INVALID_JSON, 'Config JSON response invalid.');
        return _ParsePromise2['default'].error(error);
      }

      var config = new ParseConfig();
      config.attributes = {};
      for (var attr in response.params) {
        config.attributes[attr] = (0, _decode2['default'])(response.params[attr]);
      }
      currentConfig = config;
      return _Storage2['default'].setItemAsync(_Storage2['default'].generatePath(CURRENT_CONFIG_KEY), JSON.stringify(response.params)).then(function () {
        return config;
      });
    });
  }
});
module.exports = exports['default'];
},{"./CoreManager":3,"./ParseError":13,"./ParsePromise":20,"./Storage":29,"./decode":35,"./encode":36,"./escape":38,"babel-runtime/helpers/class-call-check":52,"babel-runtime/helpers/create-class":53,"babel-runtime/helpers/interop-require-default":56}],13:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Constructs a new Parse.Error object with the given code and message.
 * @class Parse.Error
 * @constructor
 * @param {Number} code An error code constant from <code>Parse.Error</code>.
 * @param {String} message A detailed description of the error.
 */
"use strict";

var _classCallCheck = _dereq_("babel-runtime/helpers/class-call-check")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ParseError = function ParseError(code, message) {
  _classCallCheck(this, ParseError);

  this.code = code;
  this.message = message;
}

/**
 * Error code indicating some error other than those enumerated here.
 * @property OTHER_CAUSE
 * @static
 * @final
 */
;

exports["default"] = ParseError;
ParseError.OTHER_CAUSE = -1;

/**
 * Error code indicating that something has gone wrong with the server.
 * If you get this error code, it is Parse's fault. Contact us at
 * https://parse.com/help
 * @property INTERNAL_SERVER_ERROR
 * @static
 * @final
 */
ParseError.INTERNAL_SERVER_ERROR = 1;

/**
 * Error code indicating the connection to the Parse servers failed.
 * @property CONNECTION_FAILED
 * @static
 * @final
 */
ParseError.CONNECTION_FAILED = 100;

/**
 * Error code indicating the specified object doesn't exist.
 * @property OBJECT_NOT_FOUND
 * @static
 * @final
 */
ParseError.OBJECT_NOT_FOUND = 101;

/**
 * Error code indicating you tried to query with a datatype that doesn't
 * support it, like exact matching an array or object.
 * @property INVALID_QUERY
 * @static
 * @final
 */
ParseError.INVALID_QUERY = 102;

/**
 * Error code indicating a missing or invalid classname. Classnames are
 * case-sensitive. They must start with a letter, and a-zA-Z0-9_ are the
 * only valid characters.
 * @property INVALID_CLASS_NAME
 * @static
 * @final
 */
ParseError.INVALID_CLASS_NAME = 103;

/**
 * Error code indicating an unspecified object id.
 * @property MISSING_OBJECT_ID
 * @static
 * @final
 */
ParseError.MISSING_OBJECT_ID = 104;

/**
 * Error code indicating an invalid key name. Keys are case-sensitive. They
 * must start with a letter, and a-zA-Z0-9_ are the only valid characters.
 * @property INVALID_KEY_NAME
 * @static
 * @final
 */
ParseError.INVALID_KEY_NAME = 105;

/**
 * Error code indicating a malformed pointer. You should not see this unless
 * you have been mucking about changing internal Parse code.
 * @property INVALID_POINTER
 * @static
 * @final
 */
ParseError.INVALID_POINTER = 106;

/**
 * Error code indicating that badly formed JSON was received upstream. This
 * either indicates you have done something unusual with modifying how
 * things encode to JSON, or the network is failing badly.
 * @property INVALID_JSON
 * @static
 * @final
 */
ParseError.INVALID_JSON = 107;

/**
 * Error code indicating that the feature you tried to access is only
 * available internally for testing purposes.
 * @property COMMAND_UNAVAILABLE
 * @static
 * @final
 */
ParseError.COMMAND_UNAVAILABLE = 108;

/**
 * You must call Parse.initialize before using the Parse library.
 * @property NOT_INITIALIZED
 * @static
 * @final
 */
ParseError.NOT_INITIALIZED = 109;

/**
 * Error code indicating that a field was set to an inconsistent type.
 * @property INCORRECT_TYPE
 * @static
 * @final
 */
ParseError.INCORRECT_TYPE = 111;

/**
 * Error code indicating an invalid channel name. A channel name is either
 * an empty string (the broadcast channel) or contains only a-zA-Z0-9_
 * characters and starts with a letter.
 * @property INVALID_CHANNEL_NAME
 * @static
 * @final
 */
ParseError.INVALID_CHANNEL_NAME = 112;

/**
 * Error code indicating that push is misconfigured.
 * @property PUSH_MISCONFIGURED
 * @static
 * @final
 */
ParseError.PUSH_MISCONFIGURED = 115;

/**
 * Error code indicating that the object is too large.
 * @property OBJECT_TOO_LARGE
 * @static
 * @final
 */
ParseError.OBJECT_TOO_LARGE = 116;

/**
 * Error code indicating that the operation isn't allowed for clients.
 * @property OPERATION_FORBIDDEN
 * @static
 * @final
 */
ParseError.OPERATION_FORBIDDEN = 119;

/**
 * Error code indicating the result was not found in the cache.
 * @property CACHE_MISS
 * @static
 * @final
 */
ParseError.CACHE_MISS = 120;

/**
 * Error code indicating that an invalid key was used in a nested
 * JSONObject.
 * @property INVALID_NESTED_KEY
 * @static
 * @final
 */
ParseError.INVALID_NESTED_KEY = 121;

/**
 * Error code indicating that an invalid filename was used for ParseFile.
 * A valid file name contains only a-zA-Z0-9_. characters and is between 1
 * and 128 characters.
 * @property INVALID_FILE_NAME
 * @static
 * @final
 */
ParseError.INVALID_FILE_NAME = 122;

/**
 * Error code indicating an invalid ACL was provided.
 * @property INVALID_ACL
 * @static
 * @final
 */
ParseError.INVALID_ACL = 123;

/**
 * Error code indicating that the request timed out on the server. Typically
 * this indicates that the request is too expensive to run.
 * @property TIMEOUT
 * @static
 * @final
 */
ParseError.TIMEOUT = 124;

/**
 * Error code indicating that the email address was invalid.
 * @property INVALID_EMAIL_ADDRESS
 * @static
 * @final
 */
ParseError.INVALID_EMAIL_ADDRESS = 125;

/**
 * Error code indicating a missing content type.
 * @property MISSING_CONTENT_TYPE
 * @static
 * @final
 */
ParseError.MISSING_CONTENT_TYPE = 126;

/**
 * Error code indicating a missing content length.
 * @property MISSING_CONTENT_LENGTH
 * @static
 * @final
 */
ParseError.MISSING_CONTENT_LENGTH = 127;

/**
 * Error code indicating an invalid content length.
 * @property INVALID_CONTENT_LENGTH
 * @static
 * @final
 */
ParseError.INVALID_CONTENT_LENGTH = 128;

/**
 * Error code indicating a file that was too large.
 * @property FILE_TOO_LARGE
 * @static
 * @final
 */
ParseError.FILE_TOO_LARGE = 129;

/**
 * Error code indicating an error saving a file.
 * @property FILE_SAVE_ERROR
 * @static
 * @final
 */
ParseError.FILE_SAVE_ERROR = 130;

/**
 * Error code indicating that a unique field was given a value that is
 * already taken.
 * @property DUPLICATE_VALUE
 * @static
 * @final
 */
ParseError.DUPLICATE_VALUE = 137;

/**
 * Error code indicating that a role's name is invalid.
 * @property INVALID_ROLE_NAME
 * @static
 * @final
 */
ParseError.INVALID_ROLE_NAME = 139;

/**
 * Error code indicating that an application quota was exceeded.  Upgrade to
 * resolve.
 * @property EXCEEDED_QUOTA
 * @static
 * @final
 */
ParseError.EXCEEDED_QUOTA = 140;

/**
 * Error code indicating that a Cloud Code script failed.
 * @property SCRIPT_FAILED
 * @static
 * @final
 */
ParseError.SCRIPT_FAILED = 141;

/**
 * Error code indicating that a Cloud Code validation failed.
 * @property VALIDATION_ERROR
 * @static
 * @final
 */
ParseError.VALIDATION_ERROR = 142;

/**
 * Error code indicating that invalid image data was provided.
 * @property INVALID_IMAGE_DATA
 * @static
 * @final
 */
ParseError.INVALID_IMAGE_DATA = 143;

/**
 * Error code indicating an unsaved file.
 * @property UNSAVED_FILE_ERROR
 * @static
 * @final
 */
ParseError.UNSAVED_FILE_ERROR = 151;

/**
 * Error code indicating an invalid push time.
 * @property INVALID_PUSH_TIME_ERROR
 * @static
 * @final
 */
ParseError.INVALID_PUSH_TIME_ERROR = 152;

/**
 * Error code indicating an error deleting a file.
 * @property FILE_DELETE_ERROR
 * @static
 * @final
 */
ParseError.FILE_DELETE_ERROR = 153;

/**
 * Error code indicating that the application has exceeded its request
 * limit.
 * @property REQUEST_LIMIT_EXCEEDED
 * @static
 * @final
 */
ParseError.REQUEST_LIMIT_EXCEEDED = 155;

/**
 * Error code indicating an invalid event name.
 * @property INVALID_EVENT_NAME
 * @static
 * @final
 */
ParseError.INVALID_EVENT_NAME = 160;

/**
 * Error code indicating that the username is missing or empty.
 * @property USERNAME_MISSING
 * @static
 * @final
 */
ParseError.USERNAME_MISSING = 200;

/**
 * Error code indicating that the password is missing or empty.
 * @property PASSWORD_MISSING
 * @static
 * @final
 */
ParseError.PASSWORD_MISSING = 201;

/**
 * Error code indicating that the username has already been taken.
 * @property USERNAME_TAKEN
 * @static
 * @final
 */
ParseError.USERNAME_TAKEN = 202;

/**
 * Error code indicating that the email has already been taken.
 * @property EMAIL_TAKEN
 * @static
 * @final
 */
ParseError.EMAIL_TAKEN = 203;

/**
 * Error code indicating that the email is missing, but must be specified.
 * @property EMAIL_MISSING
 * @static
 * @final
 */
ParseError.EMAIL_MISSING = 204;

/**
 * Error code indicating that a user with the specified email was not found.
 * @property EMAIL_NOT_FOUND
 * @static
 * @final
 */
ParseError.EMAIL_NOT_FOUND = 205;

/**
 * Error code indicating that a user object without a valid session could
 * not be altered.
 * @property SESSION_MISSING
 * @static
 * @final
 */
ParseError.SESSION_MISSING = 206;

/**
 * Error code indicating that a user can only be created through signup.
 * @property MUST_CREATE_USER_THROUGH_SIGNUP
 * @static
 * @final
 */
ParseError.MUST_CREATE_USER_THROUGH_SIGNUP = 207;

/**
 * Error code indicating that an an account being linked is already linked
 * to another user.
 * @property ACCOUNT_ALREADY_LINKED
 * @static
 * @final
 */
ParseError.ACCOUNT_ALREADY_LINKED = 208;

/**
 * Error code indicating that the current session token is invalid.
 * @property INVALID_SESSION_TOKEN
 * @static
 * @final
 */
ParseError.INVALID_SESSION_TOKEN = 209;

/**
 * Error code indicating that a user cannot be linked to an account because
 * that account's id could not be found.
 * @property LINKED_ID_MISSING
 * @static
 * @final
 */
ParseError.LINKED_ID_MISSING = 250;

/**
 * Error code indicating that a user with a linked (e.g. Facebook) account
 * has an invalid session.
 * @property INVALID_LINKED_SESSION
 * @static
 * @final
 */
ParseError.INVALID_LINKED_SESSION = 251;

/**
 * Error code indicating that a service being linked (e.g. Facebook or
 * Twitter) is unsupported.
 * @property UNSUPPORTED_SERVICE
 * @static
 * @final
 */
ParseError.UNSUPPORTED_SERVICE = 252;

/**
 * Error code indicating that there were multiple errors. Aggregate errors
 * have an "errors" property, which is an array of error objects with more
 * detail about each error that occurred.
 * @property AGGREGATE_ERROR
 * @static
 * @final
 */
ParseError.AGGREGATE_ERROR = 600;

/**
 * Error code indicating the client was unable to read an input file.
 * @property FILE_READ_ERROR
 * @static
 * @final
 */
ParseError.FILE_READ_ERROR = 601;

/**
 * Error code indicating a real error code is unavailable because
 * we had to use an XDomainRequest object to allow CORS requests in
 * Internet Explorer, which strips the body from HTTP responses that have
 * a non-2XX status code.
 * @property X_DOMAIN_REQUEST
 * @static
 * @final
 */
ParseError.X_DOMAIN_REQUEST = 602;
module.exports = exports["default"];
},{"babel-runtime/helpers/class-call-check":52}],14:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _createClass = _dereq_('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = _dereq_('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _ParsePromise = _dereq_('./ParsePromise');

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

function b64Digit(number) {
  if (number < 26) {
    return String.fromCharCode(65 + number);
  }
  if (number < 52) {
    return String.fromCharCode(97 + (number - 26));
  }
  if (number < 62) {
    return String.fromCharCode(48 + (number - 52));
  }
  if (number === 62) {
    return '+';
  }
  if (number === 63) {
    return '/';
  }
  throw new TypeError('Tried to encode large digit ' + number + ' in base64.');
}

/**
 * A Parse.File is a local representation of a file that is saved to the Parse
 * cloud.
 * @class Parse.File
 * @constructor
 * @param name {String} The file's name. This will be prefixed by a unique
 *     value once the file has finished saving. The file name must begin with
 *     an alphanumeric character, and consist of alphanumeric characters,
 *     periods, spaces, underscores, or dashes.
 * @param data {Array} The data for the file, as either:
 *     1. an Array of byte value Numbers, or
 *     2. an Object like { base64: "..." } with a base64-encoded String.
 *     3. a File object selected with a file upload control. (3) only works
 *        in Firefox 3.6+, Safari 6.0.2+, Chrome 7+, and IE 10+.
 *        For example:<pre>
 * var fileUploadControl = $("#profilePhotoFileUpload")[0];
 * if (fileUploadControl.files.length > 0) {
 *   var file = fileUploadControl.files[0];
 *   var name = "photo.jpg";
 *   var parseFile = new Parse.File(name, file);
 *   parseFile.save().then(function() {
 *     // The file has been saved to Parse.
 *   }, function(error) {
 *     // The file either could not be read, or could not be saved to Parse.
 *   });
 * }</pre>
 * @param type {String} Optional Content-Type header to use for the file. If
 *     this is omitted, the content type will be inferred from the name's
 *     extension.
 */

var ParseFile = (function () {
  function ParseFile(name, data, type) {
    _classCallCheck(this, ParseFile);

    var specifiedType = type || '';

    this._name = name;

    if (data !== undefined) {
      if (Array.isArray(data)) {
        this._source = {
          format: 'base64',
          base64: ParseFile.encodeBase64(data),
          type: specifiedType
        };
      } else if (typeof File !== 'undefined' && data instanceof File) {
        this._source = {
          format: 'file',
          file: data,
          type: specifiedType
        };
      } else if (data && typeof data.base64 !== 'undefined') {
        var _base64 = data.base64;
        var commaIndex = _base64.indexOf(',');

        if (commaIndex !== -1) {
          var matches = /^data:([a-zA-Z]*\/[a-zA-Z+.-]*);(charset=[a-zA-Z0-9\-\/\s]*,)?base64,/.exec(_base64.slice(0, commaIndex + 1));
          // if data URI with type and charset, there will be 4 matches.
          this._source = {
            format: 'base64',
            base64: _base64.slice(commaIndex + 1),
            type: matches[1]
          };
        } else {
          this._source = {
            format: 'base64',
            base64: _base64,
            type: specifiedType
          };
        }
      } else {
        throw new TypeError('Cannot create a Parse.File with that data.');
      }
    }
  }

  /**
   * Gets the name of the file. Before save is called, this is the filename
   * given by the user. After save is called, that name gets prefixed with a
   * unique identifier.
   * @method name
   * @return {String}
   */

  _createClass(ParseFile, [{
    key: 'name',
    value: function name() {
      return this._name;
    }

    /**
     * Gets the url of the file. It is only available after you save the file or
     * after you get the file from a Parse.Object.
     * @method url
     * @param {Object} options An object to specify url options
     * @return {String}
     */
  }, {
    key: 'url',
    value: function url(options) {
      options = options || {};
      if (!this._url) {
        return;
      }
      if (options.forceSecure) {
        return this._url.replace(/^http:\/\//i, 'https://');
      } else {
        return this._url;
      }
    }

    /**
     * Saves the file to the Parse cloud.
     * @method save
     * @param {Object} options A Backbone-style options object.
     * @return {Parse.Promise} Promise that is resolved when the save finishes.
     */
  }, {
    key: 'save',
    value: function save(options) {
      var _this = this;

      options = options || {};
      var controller = _CoreManager2['default'].getFileController();
      if (!this._previousSave) {
        if (this._source.format === 'file') {
          this._previousSave = controller.saveFile(this._name, this._source).then(function (res) {
            _this._name = res.name;
            _this._url = res.url;
            return _this;
          });
        } else {
          this._previousSave = controller.saveBase64(this._name, this._source).then(function (res) {
            _this._name = res.name;
            _this._url = res.url;
            return _this;
          });
        }
      }
      if (this._previousSave) {
        return this._previousSave._thenRunCallbacks(options);
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        __type: 'File',
        name: this._name,
        url: this._url
      };
    }
  }, {
    key: 'equals',
    value: function equals(other) {
      if (this === other) {
        return true;
      }
      // Unsaved Files are never equal, since they will be saved to different URLs
      return other instanceof ParseFile && this.name() === other.name() && this.url() === other.url() && typeof this.url() !== 'undefined';
    }
  }], [{
    key: 'fromJSON',
    value: function fromJSON(obj) {
      if (obj.__type !== 'File') {
        throw new TypeError('JSON object does not represent a ParseFile');
      }
      var file = new ParseFile(obj.name);
      file._url = obj.url;
      return file;
    }
  }, {
    key: 'encodeBase64',
    value: function encodeBase64(bytes) {
      var chunks = [];
      chunks.length = Math.ceil(bytes.length / 3);
      for (var i = 0; i < chunks.length; i++) {
        var b1 = bytes[i * 3];
        var b2 = bytes[i * 3 + 1] || 0;
        var b3 = bytes[i * 3 + 2] || 0;

        var has2 = i * 3 + 1 < bytes.length;
        var has3 = i * 3 + 2 < bytes.length;

        chunks[i] = [b64Digit(b1 >> 2 & 0x3F), b64Digit(b1 << 4 & 0x30 | b2 >> 4 & 0x0F), has2 ? b64Digit(b2 << 2 & 0x3C | b3 >> 6 & 0x03) : '=', has3 ? b64Digit(b3 & 0x3F) : '='].join('');
      }

      return chunks.join('');
    }
  }]);

  return ParseFile;
})();

exports['default'] = ParseFile;

_CoreManager2['default'].setFileController({
  saveFile: function saveFile(name, source) {
    if (source.format !== 'file') {
      throw new Error('saveFile can only be used with File-type sources.');
    }
    // To directly upload a File, we use a REST-style AJAX request
    var headers = {
      'X-Parse-Application-ID': _CoreManager2['default'].get('APPLICATION_ID'),
      'X-Parse-JavaScript-Key': _CoreManager2['default'].get('JAVASCRIPT_KEY'),
      'Content-Type': source.type || (source.file ? source.file.type : null)
    };
    var url = _CoreManager2['default'].get('SERVER_URL');
    if (url[url.length - 1] !== '/') {
      url += '/';
    }
    url += 'files/' + name;
    return _CoreManager2['default'].getRESTController().ajax('POST', url, source.file, headers);
  },

  saveBase64: function saveBase64(name, source) {
    if (source.format !== 'base64') {
      throw new Error('saveBase64 can only be used with Base64-type sources.');
    }
    var data = {
      base64: source.base64
    };
    if (source.type) {
      data._ContentType = source.type;
    }

    return _CoreManager2['default'].getRESTController().request('POST', 'files/' + name, data);
  }
});
module.exports = exports['default'];
},{"./CoreManager":3,"./ParsePromise":20,"babel-runtime/helpers/class-call-check":52,"babel-runtime/helpers/create-class":53,"babel-runtime/helpers/interop-require-default":56}],15:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _createClass = _dereq_('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = _dereq_('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ParsePromise = _dereq_('./ParsePromise');

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

/**
 * Creates a new GeoPoint with any of the following forms:<br>
 *   <pre>
 *   new GeoPoint(otherGeoPoint)
 *   new GeoPoint(30, 30)
 *   new GeoPoint([30, 30])
 *   new GeoPoint({latitude: 30, longitude: 30})
 *   new GeoPoint()  // defaults to (0, 0)
 *   </pre>
 * @class Parse.GeoPoint
 * @constructor
 *
 * <p>Represents a latitude / longitude point that may be associated
 * with a key in a ParseObject or used as a reference point for geo queries.
 * This allows proximity-based queries on the key.</p>
 *
 * <p>Only one key in a class may contain a GeoPoint.</p>
 *
 * <p>Example:<pre>
 *   var point = new Parse.GeoPoint(30.0, -20.0);
 *   var object = new Parse.Object("PlaceObject");
 *   object.set("location", point);
 *   object.save();</pre></p>
 */

var ParseGeoPoint = (function () {
  function ParseGeoPoint(arg1, arg2) {
    _classCallCheck(this, ParseGeoPoint);

    if (Array.isArray(arg1)) {
      ParseGeoPoint._validate(arg1[0], arg1[1]);
      this._latitude = arg1[0];
      this._longitude = arg1[1];
    } else if (typeof arg1 === 'object') {
      ParseGeoPoint._validate(arg1.latitude, arg1.longitude);
      this._latitude = arg1.latitude;
      this._longitude = arg1.longitude;
    } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
      ParseGeoPoint._validate(arg1, arg2);
      this._latitude = arg1;
      this._longitude = arg2;
    } else {
      this._latitude = 0;
      this._longitude = 0;
    }
  }

  /**
   * North-south portion of the coordinate, in range [-90, 90].
   * Throws an exception if set out of range in a modern browser.
   * @property latitude
   * @type Number
   */

  _createClass(ParseGeoPoint, [{
    key: 'toJSON',

    /**
     * Returns a JSON representation of the GeoPoint, suitable for Parse.
     * @method toJSON
     * @return {Object}
     */
    value: function toJSON() {
      ParseGeoPoint._validate(this._latitude, this._longitude);
      return {
        __type: 'GeoPoint',
        latitude: this._latitude,
        longitude: this._longitude
      };
    }
  }, {
    key: 'equals',
    value: function equals(other) {
      return other instanceof ParseGeoPoint && this.latitude === other.latitude && this.longitude === other.longitude;
    }

    /**
     * Returns the distance from this GeoPoint to another in radians.
     * @method radiansTo
     * @param {Parse.GeoPoint} point the other Parse.GeoPoint.
     * @return {Number}
     */
  }, {
    key: 'radiansTo',
    value: function radiansTo(point) {
      var d2r = Math.PI / 180.0;
      var lat1rad = this.latitude * d2r;
      var long1rad = this.longitude * d2r;
      var lat2rad = point.latitude * d2r;
      var long2rad = point.longitude * d2r;

      var sinDeltaLatDiv2 = Math.sin((lat1rad - lat2rad) / 2);
      var sinDeltaLongDiv2 = Math.sin((long1rad - long2rad) / 2);
      // Square of half the straight line chord distance between both points.
      var a = sinDeltaLatDiv2 * sinDeltaLatDiv2 + Math.cos(lat1rad) * Math.cos(lat2rad) * sinDeltaLongDiv2 * sinDeltaLongDiv2;
      a = Math.min(1.0, a);
      return 2 * Math.asin(Math.sqrt(a));
    }

    /**
     * Returns the distance from this GeoPoint to another in kilometers.
     * @method kilometersTo
     * @param {Parse.GeoPoint} point the other Parse.GeoPoint.
     * @return {Number}
     */
  }, {
    key: 'kilometersTo',
    value: function kilometersTo(point) {
      return this.radiansTo(point) * 6371.0;
    }

    /**
     * Returns the distance from this GeoPoint to another in miles.
     * @method milesTo
     * @param {Parse.GeoPoint} point the other Parse.GeoPoint.
     * @return {Number}
     */
  }, {
    key: 'milesTo',
    value: function milesTo(point) {
      return this.radiansTo(point) * 3958.8;
    }

    /**
     * Throws an exception if the given lat-long is out of bounds.
     */
  }, {
    key: 'latitude',
    get: function get() {
      return this._latitude;
    },
    set: function set(val) {
      ParseGeoPoint._validate(val, this.longitude);
      this._latitude = val;
    }

    /**
     * East-west portion of the coordinate, in range [-180, 180].
     * Throws if set out of range in a modern browser.
     * @property longitude
     * @type Number
     */
  }, {
    key: 'longitude',
    get: function get() {
      return this._longitude;
    },
    set: function set(val) {
      ParseGeoPoint._validate(this.latitude, val);
      this._longitude = val;
    }
  }], [{
    key: '_validate',
    value: function _validate(latitude, longitude) {
      if (latitude !== latitude || longitude !== longitude) {
        throw new TypeError('GeoPoint latitude and longitude must be valid numbers');
      }
      if (latitude < -90.0) {
        throw new TypeError('GeoPoint latitude out of bounds: ' + latitude + ' < -90.0.');
      }
      if (latitude > 90.0) {
        throw new TypeError('GeoPoint latitude out of bounds: ' + latitude + ' > 90.0.');
      }
      if (longitude < -180.0) {
        throw new TypeError('GeoPoint longitude out of bounds: ' + longitude + ' < -180.0.');
      }
      if (longitude > 180.0) {
        throw new TypeError('GeoPoint longitude out of bounds: ' + longitude + ' > 180.0.');
      }
    }

    /**
     * Creates a GeoPoint with the user's current location, if available.
     * Calls options.success with a new GeoPoint instance or calls options.error.
     * @method current
     * @param {Object} options An object with success and error callbacks.
     * @static
     */
  }, {
    key: 'current',
    value: function current(options) {
      var promise = new _ParsePromise2['default']();
      navigator.geolocation.getCurrentPosition(function (location) {
        promise.resolve(new ParseGeoPoint(location.coords.latitude, location.coords.longitude));
      }, function (error) {
        promise.reject(error);
      });

      return promise._thenRunCallbacks(options);
    }
  }]);

  return ParseGeoPoint;
})();

exports['default'] = ParseGeoPoint;
module.exports = exports['default'];
},{"./ParsePromise":20,"babel-runtime/helpers/class-call-check":52,"babel-runtime/helpers/create-class":53,"babel-runtime/helpers/interop-require-default":56}],16:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _get = _dereq_('babel-runtime/helpers/get')['default'];

var _inherits = _dereq_('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = _dereq_('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ParseObject2 = _dereq_('./ParseObject');

var _ParseObject3 = _interopRequireDefault(_ParseObject2);

var Installation = (function (_ParseObject) {
  _inherits(Installation, _ParseObject);

  function Installation(attributes) {
    _classCallCheck(this, Installation);

    _get(Object.getPrototypeOf(Installation.prototype), 'constructor', this).call(this, '_Installation');
    if (attributes && typeof attributes === 'object') {
      if (!this.set(attributes || {})) {
        throw new Error('Can\'t create an invalid Session');
      }
    }
  }

  return Installation;
})(_ParseObject3['default']);

exports['default'] = Installation;

_ParseObject3['default'].registerSubclass('_Installation', Installation);
module.exports = exports['default'];
},{"./ParseObject":18,"babel-runtime/helpers/class-call-check":52,"babel-runtime/helpers/get":54,"babel-runtime/helpers/inherits":55,"babel-runtime/helpers/interop-require-default":56}],17:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _EventEmitter = _dereq_('./EventEmitter');

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _LiveQueryClient = _dereq_('./LiveQueryClient');

var _LiveQueryClient2 = _interopRequireDefault(_LiveQueryClient);

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _ParsePromise = _dereq_('./ParsePromise');

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

/**
 *
 * We expose three events to help you monitor the status of the WebSocket connection:
 *
 * <p>Open - When we establish the WebSocket connection to the LiveQuery server, you'll get this event.
 * 
 * <pre>
 * Parse.LiveQuery.on('open', () => {
 * 
 * });</pre></p>
 *
 * <p>Close - When we lose the WebSocket connection to the LiveQuery server, you'll get this event.
 * 
 * <pre>
 * Parse.LiveQuery.on('close', () => {
 * 
 * });</pre></p>
 *
 * <p>Error - When some network error or LiveQuery server error happens, you'll get this event.
 * 
 * <pre>
 * Parse.LiveQuery.on('error', (error) => {
 * 
 * });</pre></p>
 * 
 * @class Parse.LiveQuery
 * @static
 * 
 */
var LiveQuery = new _EventEmitter2['default']();

/**
 * After open is called, the LiveQuery will try to send a connect request
 * to the LiveQuery server.
 * 
 * @method open
 */
LiveQuery.open = function open() {
  var LiveQueryController = _CoreManager2['default'].getLiveQueryController();
  LiveQueryController.open();
};

/**
 * When you're done using LiveQuery, you can call Parse.LiveQuery.close().
 * This function will close the WebSocket connection to the LiveQuery server,
 * cancel the auto reconnect, and unsubscribe all subscriptions based on it.
 * If you call query.subscribe() after this, we'll create a new WebSocket
 * connection to the LiveQuery server.
 * 
 * @method close
 */

LiveQuery.close = function close() {
  var LiveQueryController = _CoreManager2['default'].getLiveQueryController();
  LiveQueryController.close();
};
// Register a default onError callback to make sure we do not crash on error
LiveQuery.on('error', function () {});

exports['default'] = LiveQuery;

function getSessionToken() {
  var controller = _CoreManager2['default'].getUserController();
  return controller.currentUserAsync().then(function (currentUser) {
    return currentUser ? currentUser.getSessionToken() : undefined;
  });
}

function getLiveQueryClient() {
  return _CoreManager2['default'].getLiveQueryController().getDefaultLiveQueryClient();
}

var defaultLiveQueryClient = undefined;

_CoreManager2['default'].setLiveQueryController({
  setDefaultLiveQueryClient: function setDefaultLiveQueryClient(liveQueryClient) {
    defaultLiveQueryClient = liveQueryClient;
  },
  getDefaultLiveQueryClient: function getDefaultLiveQueryClient() {
    if (defaultLiveQueryClient) {
      return _ParsePromise2['default'].as(defaultLiveQueryClient);
    }

    return getSessionToken().then(function (sessionToken) {
      var liveQueryServerURL = _CoreManager2['default'].get('LIVEQUERY_SERVER_URL');

      if (liveQueryServerURL && liveQueryServerURL.indexOf('ws') !== 0) {
        throw new Error('You need to set a proper Parse LiveQuery server url before using LiveQueryClient');
      }

      // If we can not find Parse.liveQueryServerURL, we try to extract it from Parse.serverURL
      if (!liveQueryServerURL) {
        var tempServerURL = _CoreManager2['default'].get('SERVER_URL');
        var protocol = 'ws://';
        // If Parse is being served over SSL/HTTPS, ensure LiveQuery Server uses 'wss://' prefix
        if (tempServerURL.indexOf('https') === 0) {
          protocol = 'wss://';
        }
        var host = tempServerURL.replace(/^https?:\/\//, '');
        liveQueryServerURL = protocol + host;
        _CoreManager2['default'].set('LIVEQUERY_SERVER_URL', liveQueryServerURL);
      }

      var applicationId = _CoreManager2['default'].get('APPLICATION_ID');
      var javascriptKey = _CoreManager2['default'].get('JAVASCRIPT_KEY');
      var masterKey = _CoreManager2['default'].get('MASTER_KEY');
      // Get currentUser sessionToken if possible
      defaultLiveQueryClient = new _LiveQueryClient2['default']({
        applicationId: applicationId,
        serverURL: liveQueryServerURL,
        javascriptKey: javascriptKey,
        masterKey: masterKey,
        sessionToken: sessionToken
      });
      // Register a default onError callback to make sure we do not crash on error
      // Cannot create these events on a nested way because of EventEmiiter from React Native
      defaultLiveQueryClient.on('error', function (error) {
        LiveQuery.emit('error', error);
      });
      defaultLiveQueryClient.on('open', function () {
        LiveQuery.emit('open');
      });
      defaultLiveQueryClient.on('close', function () {
        LiveQuery.emit('close');
      });

      return defaultLiveQueryClient;
    });
  },
  open: function open() {
    var _this = this;

    getLiveQueryClient().then(function (liveQueryClient) {
      _this.resolve(liveQueryClient.open());
    });
  },
  close: function close() {
    var _this2 = this;

    getLiveQueryClient().then(function (liveQueryClient) {
      _this2.resolve(liveQueryClient.close());
    });
  },
  subscribe: function subscribe(query) {
    var _this3 = this;

    var subscriptionWrap = new _EventEmitter2['default']();

    getLiveQueryClient().then(function (liveQueryClient) {
      if (liveQueryClient.shouldOpen()) {
        liveQueryClient.open();
      }
      var promiseSessionToken = getSessionToken();
      // new event emitter
      return promiseSessionToken.then(function (sessionToken) {

        var subscription = liveQueryClient.subscribe(query, sessionToken);
        // enter, leave create, etc

        subscriptionWrap.id = subscription.id;
        subscriptionWrap.query = subscription.query;
        subscriptionWrap.sessionToken = subscription.sessionToken;
        subscriptionWrap.unsubscribe = subscription.unsubscribe;
        // Cannot create these events on a nested way because of EventEmiiter from React Native
        subscription.on('open', function () {
          subscriptionWrap.emit('open');
        });
        subscription.on('create', function (object) {
          subscriptionWrap.emit('create', object);
        });
        subscription.on('update', function (object) {
          subscriptionWrap.emit('update', object);
        });
        subscription.on('enter', function (object) {
          subscriptionWrap.emit('enter', object);
        });
        subscription.on('leave', function (object) {
          subscriptionWrap.emit('leave', object);
        });
        subscription.on('delete', function (object) {
          subscriptionWrap.emit('delete', object);
        });

        _this3.resolve();
      });
    });
    return subscriptionWrap;
  },
  unsubscribe: function unsubscribe(subscription) {
    var _this4 = this;

    getLiveQueryClient().then(function (liveQueryClient) {
      _this4.resolve(liveQueryClient.unsubscribe(subscription));
    });
  },
  _clearCachedDefaultClient: function _clearCachedDefaultClient() {
    defaultLiveQueryClient = null;
  }
});
module.exports = exports['default'];
},{"./CoreManager":3,"./EventEmitter":4,"./LiveQueryClient":7,"./ParsePromise":20,"babel-runtime/helpers/interop-require-default":56}],18:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _createClass = _dereq_('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = _dereq_('babel-runtime/helpers/class-call-check')['default'];

var _Object$keys = _dereq_('babel-runtime/core-js/object/keys')['default'];

var _Object$freeze = _dereq_('babel-runtime/core-js/object/freeze')['default'];

var _Object$create = _dereq_('babel-runtime/core-js/object/create')['default'];

var _Object$defineProperty = _dereq_('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = _dereq_('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _canBeSerialized = _dereq_('./canBeSerialized');

var _canBeSerialized2 = _interopRequireDefault(_canBeSerialized);

var _decode = _dereq_('./decode');

var _decode2 = _interopRequireDefault(_decode);

var _encode = _dereq_('./encode');

var _encode2 = _interopRequireDefault(_encode);

var _equals = _dereq_('./equals');

var _equals2 = _interopRequireDefault(_equals);

var _escape2 = _dereq_('./escape');

var _escape3 = _interopRequireDefault(_escape2);

var _ParseACL = _dereq_('./ParseACL');

var _ParseACL2 = _interopRequireDefault(_ParseACL);

var _parseDate = _dereq_('./parseDate');

var _parseDate2 = _interopRequireDefault(_parseDate);

var _ParseError = _dereq_('./ParseError');

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParseFile = _dereq_('./ParseFile');

var _ParseFile2 = _interopRequireDefault(_ParseFile);

var _ParseOp = _dereq_('./ParseOp');

var _ParsePromise = _dereq_('./ParsePromise');

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

var _ParseQuery = _dereq_('./ParseQuery');

var _ParseQuery2 = _interopRequireDefault(_ParseQuery);

var _ParseRelation = _dereq_('./ParseRelation');

var _ParseRelation2 = _interopRequireDefault(_ParseRelation);

var _SingleInstanceStateController = _dereq_('./SingleInstanceStateController');

var SingleInstanceStateController = _interopRequireWildcard(_SingleInstanceStateController);

var _unique = _dereq_('./unique');

var _unique2 = _interopRequireDefault(_unique);

var _UniqueInstanceStateController = _dereq_('./UniqueInstanceStateController');

var UniqueInstanceStateController = _interopRequireWildcard(_UniqueInstanceStateController);

var _unsavedChildren = _dereq_('./unsavedChildren');

var _unsavedChildren2 = _interopRequireDefault(_unsavedChildren);

// Mapping of class names to constructors, so we can populate objects from the
// server with appropriate subclasses of ParseObject
var classMap = {};

// Global counter for generating unique local Ids
var localCount = 0;
// Global counter for generating unique Ids for non-single-instance objects
var objectCount = 0;
// On web clients, objects are single-instance: any two objects with the same Id
// will have the same attributes. However, this may be dangerous default
// behavior in a server scenario
var singleInstance = !_CoreManager2['default'].get('IS_NODE');
if (singleInstance) {
  _CoreManager2['default'].setObjectStateController(SingleInstanceStateController);
} else {
  _CoreManager2['default'].setObjectStateController(UniqueInstanceStateController);
}

function getServerUrlPath() {
  var serverUrl = _CoreManager2['default'].get('SERVER_URL');
  if (serverUrl[serverUrl.length - 1] !== '/') {
    serverUrl += '/';
  }
  var url = serverUrl.replace(/https?:\/\//, '');
  return url.substr(url.indexOf('/'));
}

/**
 * Creates a new model with defined attributes.
 *
 * <p>You won't normally call this method directly.  It is recommended that
 * you use a subclass of <code>Parse.Object</code> instead, created by calling
 * <code>extend</code>.</p>
 *
 * <p>However, if you don't want to use a subclass, or aren't sure which
 * subclass is appropriate, you can use this form:<pre>
 *     var object = new Parse.Object("ClassName");
 * </pre>
 * That is basically equivalent to:<pre>
 *     var MyClass = Parse.Object.extend("ClassName");
 *     var object = new MyClass();
 * </pre></p>
 *
 * @class Parse.Object
 * @constructor
 * @param {String} className The class name for the object
 * @param {Object} attributes The initial set of data to store in the object.
 * @param {Object} options The options for this object instance.
 */

var ParseObject = (function () {
  function ParseObject(className, attributes, options) {
    _classCallCheck(this, ParseObject);

    // Enable legacy initializers
    if (typeof this.initialize === 'function') {
      this.initialize.apply(this, arguments);
    }

    var toSet = null;
    this._objCount = objectCount++;
    if (typeof className === 'string') {
      this.className = className;
      if (attributes && typeof attributes === 'object') {
        toSet = attributes;
      }
    } else if (className && typeof className === 'object') {
      this.className = className.className;
      toSet = {};
      for (var attr in className) {
        if (attr !== 'className') {
          toSet[attr] = className[attr];
        }
      }
      if (attributes && typeof attributes === 'object') {
        options = attributes;
      }
    }
    if (toSet && !this.set(toSet, options)) {
      throw new Error('Can\'t create an invalid Parse Object');
    }
  }

  /** Prototype getters / setters **/

  _createClass(ParseObject, [{
    key: '_getId',

    /** Private methods **/

    /**
     * Returns a local or server Id used uniquely identify this object
     */
    value: function _getId() {
      if (typeof this.id === 'string') {
        return this.id;
      }
      if (typeof this._localId === 'string') {
        return this._localId;
      }
      var localId = 'local' + String(localCount++);
      this._localId = localId;
      return localId;
    }

    /**
     * Returns a unique identifier used to pull data from the State Controller.
     */
  }, {
    key: '_getStateIdentifier',
    value: function _getStateIdentifier() {
      if (singleInstance) {
        var _id = this.id;
        if (!_id) {
          _id = this._getId();
        }
        return {
          id: _id,
          className: this.className
        };
      } else {
        return this;
      }
    }
  }, {
    key: '_getServerData',
    value: function _getServerData() {
      var stateController = _CoreManager2['default'].getObjectStateController();
      return stateController.getServerData(this._getStateIdentifier());
    }
  }, {
    key: '_clearServerData',
    value: function _clearServerData() {
      var serverData = this._getServerData();
      var unset = {};
      for (var attr in serverData) {
        unset[attr] = undefined;
      }
      var stateController = _CoreManager2['default'].getObjectStateController();
      stateController.setServerData(this._getStateIdentifier(), unset);
    }
  }, {
    key: '_getPendingOps',
    value: function _getPendingOps() {
      var stateController = _CoreManager2['default'].getObjectStateController();
      return stateController.getPendingOps(this._getStateIdentifier());
    }
  }, {
    key: '_clearPendingOps',
    value: function _clearPendingOps() {
      var pending = this._getPendingOps();
      var latest = pending[pending.length - 1];
      var keys = _Object$keys(latest);
      keys.forEach(function (key) {
        delete latest[key];
      });
    }
  }, {
    key: '_getDirtyObjectAttributes',
    value: function _getDirtyObjectAttributes() {
      var attributes = this.attributes;
      var stateController = _CoreManager2['default'].getObjectStateController();
      var objectCache = stateController.getObjectCache(this._getStateIdentifier());
      var dirty = {};
      for (var attr in attributes) {
        var val = attributes[attr];
        if (val && typeof val === 'object' && !(val instanceof ParseObject) && !(val instanceof _ParseFile2['default']) && !(val instanceof _ParseRelation2['default'])) {
          // Due to the way browsers construct maps, the key order will not change
          // unless the object is changed
          try {
            var json = (0, _encode2['default'])(val, false, true);
            var stringified = JSON.stringify(json);
            if (objectCache[attr] !== stringified) {
              dirty[attr] = val;
            }
          } catch (e) {
            // Error occurred, possibly by a nested unsaved pointer in a mutable container
            // No matter how it happened, it indicates a change in the attribute
            dirty[attr] = val;
          }
        }
      }
      return dirty;
    }
  }, {
    key: '_toFullJSON',
    value: function _toFullJSON(seen) {
      var json = this.toJSON(seen);
      json.__type = 'Object';
      json.className = this.className;
      return json;
    }
  }, {
    key: '_getSaveJSON',
    value: function _getSaveJSON() {
      var pending = this._getPendingOps();
      var dirtyObjects = this._getDirtyObjectAttributes();
      var json = {};
      var attr;
      for (attr in dirtyObjects) {
        json[attr] = new _ParseOp.SetOp(dirtyObjects[attr]).toJSON();
      }
      for (attr in pending[0]) {
        json[attr] = pending[0][attr].toJSON();
      }
      return json;
    }
  }, {
    key: '_getSaveParams',
    value: function _getSaveParams() {
      var method = this.id ? 'PUT' : 'POST';
      var body = this._getSaveJSON();
      var path = 'classes/' + this.className;
      if (this.id) {
        path += '/' + this.id;
      } else if (this.className === '_User') {
        path = 'users';
      }
      return {
        method: method,
        body: body,
        path: path
      };
    }
  }, {
    key: '_finishFetch',
    value: function _finishFetch(serverData) {
      if (!this.id && serverData.objectId) {
        this.id = serverData.objectId;
      }
      var stateController = _CoreManager2['default'].getObjectStateController();
      stateController.initializeState(this._getStateIdentifier());
      var decoded = {};
      for (var attr in serverData) {
        if (attr === 'ACL') {
          decoded[attr] = new _ParseACL2['default'](serverData[attr]);
        } else if (attr !== 'objectId') {
          decoded[attr] = (0, _decode2['default'])(serverData[attr]);
          if (decoded[attr] instanceof _ParseRelation2['default']) {
            decoded[attr]._ensureParentAndKey(this, attr);
          }
        }
      }
      if (decoded.createdAt && typeof decoded.createdAt === 'string') {
        decoded.createdAt = (0, _parseDate2['default'])(decoded.createdAt);
      }
      if (decoded.updatedAt && typeof decoded.updatedAt === 'string') {
        decoded.updatedAt = (0, _parseDate2['default'])(decoded.updatedAt);
      }
      if (!decoded.updatedAt && decoded.createdAt) {
        decoded.updatedAt = decoded.createdAt;
      }
      stateController.commitServerChanges(this._getStateIdentifier(), decoded);
    }
  }, {
    key: '_setExisted',
    value: function _setExisted(existed) {
      var stateController = _CoreManager2['default'].getObjectStateController();
      var state = stateController.getState(this._getStateIdentifier());
      if (state) {
        state.existed = existed;
      }
    }
  }, {
    key: '_migrateId',
    value: function _migrateId(serverId) {
      if (this._localId && serverId) {
        if (singleInstance) {
          var stateController = _CoreManager2['default'].getObjectStateController();
          var oldState = stateController.removeState(this._getStateIdentifier());
          this.id = serverId;
          delete this._localId;
          if (oldState) {
            stateController.initializeState(this._getStateIdentifier(), oldState);
          }
        } else {
          this.id = serverId;
          delete this._localId;
        }
      }
    }
  }, {
    key: '_handleSaveResponse',
    value: function _handleSaveResponse(response, status) {
      var changes = {};
      var attr;
      var stateController = _CoreManager2['default'].getObjectStateController();
      var pending = stateController.popPendingState(this._getStateIdentifier());
      for (attr in pending) {
        if (pending[attr] instanceof _ParseOp.RelationOp) {
          changes[attr] = pending[attr].applyTo(undefined, this, attr);
        } else if (!(attr in response)) {
          // Only SetOps and UnsetOps should not come back with results
          changes[attr] = pending[attr].applyTo(undefined);
        }
      }
      for (attr in response) {
        if ((attr === 'createdAt' || attr === 'updatedAt') && typeof response[attr] === 'string') {
          changes[attr] = (0, _parseDate2['default'])(response[attr]);
        } else if (attr === 'ACL') {
          changes[attr] = new _ParseACL2['default'](response[attr]);
        } else if (attr !== 'objectId') {
          changes[attr] = (0, _decode2['default'])(response[attr]);
          if (changes[attr] instanceof _ParseOp.UnsetOp) {
            changes[attr] = undefined;
          }
        }
      }
      if (changes.createdAt && !changes.updatedAt) {
        changes.updatedAt = changes.createdAt;
      }

      this._migrateId(response.objectId);

      if (status !== 201) {
        this._setExisted(true);
      }

      stateController.commitServerChanges(this._getStateIdentifier(), changes);
    }
  }, {
    key: '_handleSaveError',
    value: function _handleSaveError() {
      var pending = this._getPendingOps();
      var stateController = _CoreManager2['default'].getObjectStateController();
      stateController.mergeFirstPendingState(this._getStateIdentifier());
    }

    /** Public methods **/

  }, {
    key: 'initialize',
    value: function initialize() {}
    // NOOP

    /**
     * Returns a JSON version of the object suitable for saving to Parse.
     * @method toJSON
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON(seen) {
      var seenEntry = this.id ? this.className + ':' + this.id : this;
      var seen = seen || [seenEntry];
      var json = {};
      var attrs = this.attributes;
      for (var attr in attrs) {
        if ((attr === 'createdAt' || attr === 'updatedAt') && attrs[attr].toJSON) {
          json[attr] = attrs[attr].toJSON();
        } else {
          json[attr] = (0, _encode2['default'])(attrs[attr], false, false, seen);
        }
      }
      var pending = this._getPendingOps();
      for (var attr in pending[0]) {
        json[attr] = pending[0][attr].toJSON();
      }

      if (this.id) {
        json.objectId = this.id;
      }
      return json;
    }

    /**
     * Determines whether this ParseObject is equal to another ParseObject
     * @method equals
     * @return {Boolean}
     */
  }, {
    key: 'equals',
    value: function equals(other) {
      if (this === other) {
        return true;
      }
      return other instanceof ParseObject && this.className === other.className && this.id === other.id && typeof this.id !== 'undefined';
    }

    /**
     * Returns true if this object has been modified since its last
     * save/refresh.  If an attribute is specified, it returns true only if that
     * particular attribute has been modified since the last save/refresh.
     * @method dirty
     * @param {String} attr An attribute name (optional).
     * @return {Boolean}
     */
  }, {
    key: 'dirty',
    value: function dirty(attr) {
      if (!this.id) {
        return true;
      }
      var pendingOps = this._getPendingOps();
      var dirtyObjects = this._getDirtyObjectAttributes();
      if (attr) {
        if (dirtyObjects.hasOwnProperty(attr)) {
          return true;
        }
        for (var i = 0; i < pendingOps.length; i++) {
          if (pendingOps[i].hasOwnProperty(attr)) {
            return true;
          }
        }
        return false;
      }
      if (_Object$keys(pendingOps[0]).length !== 0) {
        return true;
      }
      if (_Object$keys(dirtyObjects).length !== 0) {
        return true;
      }
      return false;
    }

    /**
     * Returns an array of keys that have been modified since last save/refresh
     * @method dirtyKeys
     * @return {Array of string}
     */
  }, {
    key: 'dirtyKeys',
    value: function dirtyKeys() {
      var pendingOps = this._getPendingOps();
      var keys = {};
      for (var i = 0; i < pendingOps.length; i++) {
        for (var attr in pendingOps[i]) {
          keys[attr] = true;
        }
      }
      var dirtyObjects = this._getDirtyObjectAttributes();
      for (var attr in dirtyObjects) {
        keys[attr] = true;
      }
      return _Object$keys(keys);
    }

    /**
     * Gets a Pointer referencing this Object.
     * @method toPointer
     * @return {Object}
     */
  }, {
    key: 'toPointer',
    value: function toPointer() {
      if (!this.id) {
        throw new Error('Cannot create a pointer to an unsaved ParseObject');
      }
      return {
        __type: 'Pointer',
        className: this.className,
        objectId: this.id
      };
    }

    /**
     * Gets the value of an attribute.
     * @method get
     * @param {String} attr The string name of an attribute.
     */
  }, {
    key: 'get',
    value: function get(attr) {
      return this.attributes[attr];
    }

    /**
     * Gets a relation on the given class for the attribute.
     * @method relation
     * @param String attr The attribute to get the relation for.
     */
  }, {
    key: 'relation',
    value: function relation(attr) {
      var value = this.get(attr);
      if (value) {
        if (!(value instanceof _ParseRelation2['default'])) {
          throw new Error('Called relation() on non-relation field ' + attr);
        }
        value._ensureParentAndKey(this, attr);
        return value;
      }
      return new _ParseRelation2['default'](this, attr);
    }

    /**
     * Gets the HTML-escaped value of an attribute.
     * @method escape
     * @param {String} attr The string name of an attribute.
     */
  }, {
    key: 'escape',
    value: function escape(attr) {
      var val = this.attributes[attr];
      if (val == null) {
        return '';
      }
      var str = val;
      if (typeof val !== 'string') {
        if (typeof val.toString !== 'function') {
          return '';
        }
        val = val.toString();
      }
      return (0, _escape3['default'])(val);
    }

    /**
     * Returns <code>true</code> if the attribute contains a value that is not
     * null or undefined.
     * @method has
     * @param {String} attr The string name of the attribute.
     * @return {Boolean}
     */
  }, {
    key: 'has',
    value: function has(attr) {
      var attributes = this.attributes;
      if (attributes.hasOwnProperty(attr)) {
        return attributes[attr] != null;
      }
      return false;
    }

    /**
     * Sets a hash of model attributes on the object.
     *
     * <p>You can call it with an object containing keys and values, or with one
     * key and value.  For example:<pre>
     *   gameTurn.set({
     *     player: player1,
     *     diceRoll: 2
     *   }, {
     *     error: function(gameTurnAgain, error) {
     *       // The set failed validation.
     *     }
     *   });
     *
     *   game.set("currentPlayer", player2, {
     *     error: function(gameTurnAgain, error) {
     *       // The set failed validation.
     *     }
     *   });
     *
     *   game.set("finished", true);</pre></p>
     *
     * @method set
     * @param {String} key The key to set.
     * @param {} value The value to give it.
     * @param {Object} options A set of options for the set.
     *     The only supported option is <code>error</code>.
     * @return {Boolean} true if the set succeeded.
     */
  }, {
    key: 'set',
    value: function set(key, value, options) {
      var changes = {};
      var newOps = {};
      if (key && typeof key === 'object') {
        changes = key;
        options = value;
      } else if (typeof key === 'string') {
        changes[key] = value;
      } else {
        return this;
      }

      options = options || {};
      var readonly = [];
      if (typeof this.constructor.readOnlyAttributes === 'function') {
        readonly = readonly.concat(this.constructor.readOnlyAttributes());
      }
      for (var k in changes) {
        if (k === 'createdAt' || k === 'updatedAt') {
          // This property is read-only, but for legacy reasons we silently
          // ignore it
          continue;
        }
        if (readonly.indexOf(k) > -1) {
          throw new Error('Cannot modify readonly attribute: ' + k);
        }
        if (options.unset) {
          newOps[k] = new _ParseOp.UnsetOp();
        } else if (changes[k] instanceof _ParseOp.Op) {
          newOps[k] = changes[k];
        } else if (changes[k] && typeof changes[k] === 'object' && typeof changes[k].__op === 'string') {
          newOps[k] = (0, _ParseOp.opFromJSON)(changes[k]);
        } else if (k === 'objectId' || k === 'id') {
          if (typeof changes[k] === 'string') {
            this.id = changes[k];
          }
        } else if (k === 'ACL' && typeof changes[k] === 'object' && !(changes[k] instanceof _ParseACL2['default'])) {
          newOps[k] = new _ParseOp.SetOp(new _ParseACL2['default'](changes[k]));
        } else {
          newOps[k] = new _ParseOp.SetOp(changes[k]);
        }
      }

      // Calculate new values
      var currentAttributes = this.attributes;
      var newValues = {};
      for (var attr in newOps) {
        if (newOps[attr] instanceof _ParseOp.RelationOp) {
          newValues[attr] = newOps[attr].applyTo(currentAttributes[attr], this, attr);
        } else if (!(newOps[attr] instanceof _ParseOp.UnsetOp)) {
          newValues[attr] = newOps[attr].applyTo(currentAttributes[attr]);
        }
      }

      // Validate changes
      if (!options.ignoreValidation) {
        var validation = this.validate(newValues);
        if (validation) {
          if (typeof options.error === 'function') {
            options.error(this, validation);
          }
          return false;
        }
      }

      // Consolidate Ops
      var pendingOps = this._getPendingOps();
      var last = pendingOps.length - 1;
      var stateController = _CoreManager2['default'].getObjectStateController();
      for (var attr in newOps) {
        var nextOp = newOps[attr].mergeWith(pendingOps[last][attr]);
        stateController.setPendingOp(this._getStateIdentifier(), attr, nextOp);
      }

      return this;
    }

    /**
     * Remove an attribute from the model. This is a noop if the attribute doesn't
     * exist.
     * @method unset
     * @param {String} attr The string name of an attribute.
     */
  }, {
    key: 'unset',
    value: function unset(attr, options) {
      options = options || {};
      options.unset = true;
      return this.set(attr, null, options);
    }

    /**
     * Atomically increments the value of the given attribute the next time the
     * object is saved. If no amount is specified, 1 is used by default.
     *
     * @method increment
     * @param attr {String} The key.
     * @param amount {Number} The amount to increment by (optional).
     */
  }, {
    key: 'increment',
    value: function increment(attr, amount) {
      if (typeof amount === 'undefined') {
        amount = 1;
      }
      if (typeof amount !== 'number') {
        throw new Error('Cannot increment by a non-numeric amount.');
      }
      return this.set(attr, new _ParseOp.IncrementOp(amount));
    }

    /**
     * Atomically add an object to the end of the array associated with a given
     * key.
     * @method add
     * @param attr {String} The key.
     * @param item {} The item to add.
     */
  }, {
    key: 'add',
    value: function add(attr, item) {
      return this.set(attr, new _ParseOp.AddOp([item]));
    }

    /**
     * Atomically add an object to the array associated with a given key, only
     * if it is not already present in the array. The position of the insert is
     * not guaranteed.
     *
     * @method addUnique
     * @param attr {String} The key.
     * @param item {} The object to add.
     */
  }, {
    key: 'addUnique',
    value: function addUnique(attr, item) {
      return this.set(attr, new _ParseOp.AddUniqueOp([item]));
    }

    /**
     * Atomically remove all instances of an object from the array associated
     * with a given key.
     *
     * @method remove
     * @param attr {String} The key.
     * @param item {} The object to remove.
     */
  }, {
    key: 'remove',
    value: function remove(attr, item) {
      return this.set(attr, new _ParseOp.RemoveOp([item]));
    }

    /**
     * Returns an instance of a subclass of Parse.Op describing what kind of
     * modification has been performed on this field since the last time it was
     * saved. For example, after calling object.increment("x"), calling
     * object.op("x") would return an instance of Parse.Op.Increment.
     *
     * @method op
     * @param attr {String} The key.
     * @returns {Parse.Op} The operation, or undefined if none.
     */
  }, {
    key: 'op',
    value: function op(attr) {
      var pending = this._getPendingOps();
      for (var i = pending.length; i--;) {
        if (pending[i][attr]) {
          return pending[i][attr];
        }
      }
    }

    /**
     * Creates a new model with identical attributes to this one, similar to Backbone.Model's clone()
     * @method clone
     * @return {Parse.Object}
     */
  }, {
    key: 'clone',
    value: function clone() {
      var clone = new this.constructor();
      if (!clone.className) {
        clone.className = this.className;
      }
      var attributes = this.attributes;
      if (typeof this.constructor.readOnlyAttributes === 'function') {
        var readonly = this.constructor.readOnlyAttributes() || [];
        // Attributes are frozen, so we have to rebuild an object,
        // rather than delete readonly keys
        var copy = {};
        for (var a in attributes) {
          if (readonly.indexOf(a) < 0) {
            copy[a] = attributes[a];
          }
        }
        attributes = copy;
      }
      if (clone.set) {
        clone.set(attributes);
      }
      return clone;
    }

    /**
     * Creates a new instance of this object. Not to be confused with clone()
     * @method newInstance
     * @return {Parse.Object}
     */
  }, {
    key: 'newInstance',
    value: function newInstance() {
      var clone = new this.constructor();
      if (!clone.className) {
        clone.className = this.className;
      }
      clone.id = this.id;
      if (singleInstance) {
        // Just return an object with the right id
        return clone;
      }

      var stateController = _CoreManager2['default'].getObjectStateController();
      if (stateController) {
        stateController.duplicateState(this._getStateIdentifier(), clone._getStateIdentifier());
      }
      return clone;
    }

    /**
     * Returns true if this object has never been saved to Parse.
     * @method isNew
     * @return {Boolean}
     */
  }, {
    key: 'isNew',
    value: function isNew() {
      return !this.id;
    }

    /**
     * Returns true if this object was created by the Parse server when the
     * object might have already been there (e.g. in the case of a Facebook
     * login)
     * @method existed
     * @return {Boolean}
     */
  }, {
    key: 'existed',
    value: function existed() {
      if (!this.id) {
        return false;
      }
      var stateController = _CoreManager2['default'].getObjectStateController();
      var state = stateController.getState(this._getStateIdentifier());
      if (state) {
        return state.existed;
      }
      return false;
    }

    /**
     * Checks if the model is currently in a valid state.
     * @method isValid
     * @return {Boolean}
     */
  }, {
    key: 'isValid',
    value: function isValid() {
      return !this.validate(this.attributes);
    }

    /**
     * You should not call this function directly unless you subclass
     * <code>Parse.Object</code>, in which case you can override this method
     * to provide additional validation on <code>set</code> and
     * <code>save</code>.  Your implementation should return
     *
     * @method validate
     * @param {Object} attrs The current data to validate.
     * @return {} False if the data is valid.  An error object otherwise.
     * @see Parse.Object#set
     */
  }, {
    key: 'validate',
    value: function validate(attrs) {
      if (attrs.hasOwnProperty('ACL') && !(attrs.ACL instanceof _ParseACL2['default'])) {
        return new _ParseError2['default'](_ParseError2['default'].OTHER_CAUSE, 'ACL must be a Parse ACL.');
      }
      for (var key in attrs) {
        if (!/^[A-Za-z][0-9A-Za-z_]*$/.test(key)) {
          return new _ParseError2['default'](_ParseError2['default'].INVALID_KEY_NAME);
        }
      }
      return false;
    }

    /**
     * Returns the ACL for this object.
     * @method getACL
     * @returns {Parse.ACL} An instance of Parse.ACL.
     * @see Parse.Object#get
     */
  }, {
    key: 'getACL',
    value: function getACL() {
      var acl = this.get('ACL');
      if (acl instanceof _ParseACL2['default']) {
        return acl;
      }
      return null;
    }

    /**
     * Sets the ACL to be used for this object.
     * @method setACL
     * @param {Parse.ACL} acl An instance of Parse.ACL.
     * @param {Object} options Optional Backbone-like options object to be
     *     passed in to set.
     * @return {Boolean} Whether the set passed validation.
     * @see Parse.Object#set
     */
  }, {
    key: 'setACL',
    value: function setACL(acl, options) {
      return this.set('ACL', acl, options);
    }

    /**
     * Clears any changes to this object made since the last call to save()
     * @method revert
     */
  }, {
    key: 'revert',
    value: function revert() {
      this._clearPendingOps();
    }

    /**
     * Clears all attributes on a model
     * @method clear
     */
  }, {
    key: 'clear',
    value: function clear() {
      var attributes = this.attributes;
      var erasable = {};
      var readonly = ['createdAt', 'updatedAt'];
      if (typeof this.constructor.readOnlyAttributes === 'function') {
        readonly = readonly.concat(this.constructor.readOnlyAttributes());
      }
      for (var attr in attributes) {
        if (readonly.indexOf(attr) < 0) {
          erasable[attr] = true;
        }
      }
      return this.set(erasable, { unset: true });
    }

    /**
     * Fetch the model from the server. If the server's representation of the
     * model differs from its current attributes, they will be overriden.
     *
     * @method fetch
     * @param {Object} options A Backbone-style callback object.
     * Valid options are:<ul>
     *   <li>success: A Backbone-style success callback.
     *   <li>error: An Backbone-style error callback.
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @return {Parse.Promise} A promise that is fulfilled when the fetch
     *     completes.
     */
  }, {
    key: 'fetch',
    value: function fetch(options) {
      options = options || {};
      var fetchOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        fetchOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        fetchOptions.sessionToken = options.sessionToken;
      }
      var controller = _CoreManager2['default'].getObjectController();
      return controller.fetch(this, true, fetchOptions)._thenRunCallbacks(options);
    }

    /**
     * Set a hash of model attributes, and save the model to the server.
     * updatedAt will be updated when the request returns.
     * You can either call it as:<pre>
     *   object.save();</pre>
     * or<pre>
     *   object.save(null, options);</pre>
     * or<pre>
     *   object.save(attrs, options);</pre>
     * or<pre>
     *   object.save(key, value, options);</pre>
     *
     * For example, <pre>
     *   gameTurn.save({
     *     player: "Jake Cutter",
     *     diceRoll: 2
     *   }, {
     *     success: function(gameTurnAgain) {
     *       // The save was successful.
     *     },
     *     error: function(gameTurnAgain, error) {
     *       // The save failed.  Error is an instance of Parse.Error.
     *     }
     *   });</pre>
     * or with promises:<pre>
     *   gameTurn.save({
     *     player: "Jake Cutter",
     *     diceRoll: 2
     *   }).then(function(gameTurnAgain) {
     *     // The save was successful.
     *   }, function(error) {
     *     // The save failed.  Error is an instance of Parse.Error.
     *   });</pre>
     *
     * @method save
     * @param {Object} options A Backbone-style callback object.
     * Valid options are:<ul>
     *   <li>success: A Backbone-style success callback.
     *   <li>error: An Backbone-style error callback.
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @return {Parse.Promise} A promise that is fulfilled when the save
     *     completes.
     */
  }, {
    key: 'save',
    value: function save(arg1, arg2, arg3) {
      var _this = this;

      var attrs;
      var options;
      if (typeof arg1 === 'object' || typeof arg1 === 'undefined') {
        attrs = arg1;
        if (typeof arg2 === 'object') {
          options = arg2;
        }
      } else {
        attrs = {};
        attrs[arg1] = arg2;
        options = arg3;
      }

      // Support save({ success: function() {}, error: function() {} })
      if (!options && attrs) {
        options = {};
        if (typeof attrs.success === 'function') {
          options.success = attrs.success;
          delete attrs.success;
        }
        if (typeof attrs.error === 'function') {
          options.error = attrs.error;
          delete attrs.error;
        }
      }

      if (attrs) {
        var validation = this.validate(attrs);
        if (validation) {
          if (options && typeof options.error === 'function') {
            options.error(this, validation);
          }
          return _ParsePromise2['default'].error(validation);
        }
        this.set(attrs, options);
      }

      options = options || {};
      var saveOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        saveOptions.useMasterKey = !!options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken') && typeof options.sessionToken === 'string') {
        saveOptions.sessionToken = options.sessionToken;
      }

      var controller = _CoreManager2['default'].getObjectController();
      var unsaved = (0, _unsavedChildren2['default'])(this);
      return controller.save(unsaved, saveOptions).then(function () {
        return controller.save(_this, saveOptions);
      })._thenRunCallbacks(options, this);
    }

    /**
     * Destroy this model on the server if it was already persisted.
     * If `wait: true` is passed, waits for the server to respond
     * before removal.
     *
     * @method destroy
     * @param {Object} options A Backbone-style callback object.
     * Valid options are:<ul>
     *   <li>success: A Backbone-style success callback
     *   <li>error: An Backbone-style error callback.
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @return {Parse.Promise} A promise that is fulfilled when the destroy
     *     completes.
     */
  }, {
    key: 'destroy',
    value: function destroy(options) {
      options = options || {};
      var destroyOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        destroyOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        destroyOptions.sessionToken = options.sessionToken;
      }
      if (!this.id) {
        return _ParsePromise2['default'].as()._thenRunCallbacks(options);
      }
      return _CoreManager2['default'].getObjectController().destroy(this, destroyOptions)._thenRunCallbacks(options);
    }

    /** Static methods **/

  }, {
    key: 'attributes',
    get: function get() {
      var stateController = _CoreManager2['default'].getObjectStateController();
      return _Object$freeze(stateController.estimateAttributes(this._getStateIdentifier()));
    }

    /**
     * The first time this object was saved on the server.
     * @property createdAt
     * @type Date
     */
  }, {
    key: 'createdAt',
    get: function get() {
      return this._getServerData().createdAt;
    }

    /**
     * The last time this object was updated on the server.
     * @property updatedAt
     * @type Date
     */
  }, {
    key: 'updatedAt',
    get: function get() {
      return this._getServerData().updatedAt;
    }
  }], [{
    key: '_clearAllState',
    value: function _clearAllState() {
      var stateController = _CoreManager2['default'].getObjectStateController();
      stateController.clearAllState();
    }

    /**
     * Fetches the given list of Parse.Object.
     * If any error is encountered, stops and calls the error handler.
     *
     * <pre>
     *   Parse.Object.fetchAll([object1, object2, ...], {
     *     success: function(list) {
     *       // All the objects were fetched.
     *     },
     *     error: function(error) {
     *       // An error occurred while fetching one of the objects.
     *     },
     *   });
     * </pre>
     *
     * @method fetchAll
     * @param {Array} list A list of <code>Parse.Object</code>.
     * @param {Object} options A Backbone-style callback object.
     * @static
     * Valid options are:<ul>
     *   <li>success: A Backbone-style success callback.
     *   <li>error: An Backbone-style error callback.
     * </ul>
     */
  }, {
    key: 'fetchAll',
    value: function fetchAll(list, options) {
      var options = options || {};

      var queryOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        queryOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        queryOptions.sessionToken = options.sessionToken;
      }
      return _CoreManager2['default'].getObjectController().fetch(list, true, queryOptions)._thenRunCallbacks(options);
    }

    /**
     * Fetches the given list of Parse.Object if needed.
     * If any error is encountered, stops and calls the error handler.
     *
     * <pre>
     *   Parse.Object.fetchAllIfNeeded([object1, ...], {
     *     success: function(list) {
     *       // Objects were fetched and updated.
     *     },
     *     error: function(error) {
     *       // An error occurred while fetching one of the objects.
     *     },
     *   });
     * </pre>
     *
     * @method fetchAllIfNeeded
     * @param {Array} list A list of <code>Parse.Object</code>.
     * @param {Object} options A Backbone-style callback object.
     * @static
     * Valid options are:<ul>
     *   <li>success: A Backbone-style success callback.
     *   <li>error: An Backbone-style error callback.
     * </ul>
     */
  }, {
    key: 'fetchAllIfNeeded',
    value: function fetchAllIfNeeded(list, options) {
      var options = options || {};

      var queryOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        queryOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        queryOptions.sessionToken = options.sessionToken;
      }
      return _CoreManager2['default'].getObjectController().fetch(list, false, queryOptions)._thenRunCallbacks(options);
    }

    /**
     * Destroy the given list of models on the server if it was already persisted.
     *
     * <p>Unlike saveAll, if an error occurs while deleting an individual model,
     * this method will continue trying to delete the rest of the models if
     * possible, except in the case of a fatal error like a connection error.
     *
     * <p>In particular, the Parse.Error object returned in the case of error may
     * be one of two types:
     *
     * <ul>
     *   <li>A Parse.Error.AGGREGATE_ERROR. This object's "errors" property is an
     *       array of other Parse.Error objects. Each error object in this array
     *       has an "object" property that references the object that could not be
     *       deleted (for instance, because that object could not be found).</li>
     *   <li>A non-aggregate Parse.Error. This indicates a serious error that
     *       caused the delete operation to be aborted partway through (for
     *       instance, a connection failure in the middle of the delete).</li>
     * </ul>
     *
     * <pre>
     *   Parse.Object.destroyAll([object1, object2, ...], {
     *     success: function() {
     *       // All the objects were deleted.
     *     },
     *     error: function(error) {
     *       // An error occurred while deleting one or more of the objects.
     *       // If this is an aggregate error, then we can inspect each error
     *       // object individually to determine the reason why a particular
     *       // object was not deleted.
     *       if (error.code === Parse.Error.AGGREGATE_ERROR) {
     *         for (var i = 0; i < error.errors.length; i++) {
     *           console.log("Couldn't delete " + error.errors[i].object.id +
     *             "due to " + error.errors[i].message);
     *         }
     *       } else {
     *         console.log("Delete aborted because of " + error.message);
     *       }
     *     },
     *   });
     * </pre>
     *
     * @method destroyAll
     * @param {Array} list A list of <code>Parse.Object</code>.
     * @param {Object} options A Backbone-style callback object.
     * @static
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @return {Parse.Promise} A promise that is fulfilled when the destroyAll
     *     completes.
     */
  }, {
    key: 'destroyAll',
    value: function destroyAll(list, options) {
      var options = options || {};

      var destroyOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        destroyOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        destroyOptions.sessionToken = options.sessionToken;
      }
      return _CoreManager2['default'].getObjectController().destroy(list, destroyOptions)._thenRunCallbacks(options);
    }

    /**
     * Saves the given list of Parse.Object.
     * If any error is encountered, stops and calls the error handler.
     *
     * <pre>
     *   Parse.Object.saveAll([object1, object2, ...], {
     *     success: function(list) {
     *       // All the objects were saved.
     *     },
     *     error: function(error) {
     *       // An error occurred while saving one of the objects.
     *     },
     *   });
     * </pre>
     *
     * @method saveAll
     * @param {Array} list A list of <code>Parse.Object</code>.
     * @param {Object} options A Backbone-style callback object.
     * @static
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     */
  }, {
    key: 'saveAll',
    value: function saveAll(list, options) {
      var options = options || {};

      var saveOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        saveOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        saveOptions.sessionToken = options.sessionToken;
      }
      return _CoreManager2['default'].getObjectController().save(list, saveOptions)._thenRunCallbacks(options);
    }

    /**
     * Creates a reference to a subclass of Parse.Object with the given id. This
     * does not exist on Parse.Object, only on subclasses.
     *
     * <p>A shortcut for: <pre>
     *  var Foo = Parse.Object.extend("Foo");
     *  var pointerToFoo = new Foo();
     *  pointerToFoo.id = "myObjectId";
     * </pre>
     *
     * @method createWithoutData
     * @param {String} id The ID of the object to create a reference to.
     * @static
     * @return {Parse.Object} A Parse.Object reference.
     */
  }, {
    key: 'createWithoutData',
    value: function createWithoutData(id) {
      var obj = new this();
      obj.id = id;
      return obj;
    }

    /**
     * Creates a new instance of a Parse Object from a JSON representation.
     * @method fromJSON
     * @param {Object} json The JSON map of the Object's data
     * @param {boolean} override In single instance mode, all old server data
     *   is overwritten if this is set to true
     * @static
     * @return {Parse.Object} A Parse.Object reference
     */
  }, {
    key: 'fromJSON',
    value: function fromJSON(json, override) {
      if (!json.className) {
        throw new Error('Cannot create an object without a className');
      }
      var constructor = classMap[json.className];
      var o = constructor ? new constructor() : new ParseObject(json.className);
      var otherAttributes = {};
      for (var attr in json) {
        if (attr !== 'className' && attr !== '__type') {
          otherAttributes[attr] = json[attr];
        }
      }
      if (override) {
        // id needs to be set before clearServerData can work
        if (otherAttributes.objectId) {
          o.id = otherAttributes.objectId;
        }
        var preserved = null;
        if (typeof o._preserveFieldsOnFetch === 'function') {
          preserved = o._preserveFieldsOnFetch();
        }
        o._clearServerData();
        if (preserved) {
          o._finishFetch(preserved);
        }
      }
      o._finishFetch(otherAttributes);
      if (json.objectId) {
        o._setExisted(true);
      }
      return o;
    }

    /**
     * Registers a subclass of Parse.Object with a specific class name.
     * When objects of that class are retrieved from a query, they will be
     * instantiated with this subclass.
     * This is only necessary when using ES6 subclassing.
     * @method registerSubclass
     * @param {String} className The class name of the subclass
     * @param {Class} constructor The subclass
     */
  }, {
    key: 'registerSubclass',
    value: function registerSubclass(className, constructor) {
      if (typeof className !== 'string') {
        throw new TypeError('The first argument must be a valid class name.');
      }
      if (typeof constructor === 'undefined') {
        throw new TypeError('You must supply a subclass constructor.');
      }
      if (typeof constructor !== 'function') {
        throw new TypeError('You must register the subclass constructor. ' + 'Did you attempt to register an instance of the subclass?');
      }
      classMap[className] = constructor;
      if (!constructor.className) {
        constructor.className = className;
      }
    }

    /**
     * Creates a new subclass of Parse.Object for the given Parse class name.
     *
     * <p>Every extension of a Parse class will inherit from the most recent
     * previous extension of that class. When a Parse.Object is automatically
     * created by parsing JSON, it will use the most recent extension of that
     * class.</p>
     *
     * <p>You should call either:<pre>
     *     var MyClass = Parse.Object.extend("MyClass", {
     *         <i>Instance methods</i>,
     *         initialize: function(attrs, options) {
     *             this.someInstanceProperty = [],
     *             <i>Other instance properties</i>
     *         }
     *     }, {
     *         <i>Class properties</i>
     *     });</pre>
     * or, for Backbone compatibility:<pre>
     *     var MyClass = Parse.Object.extend({
     *         className: "MyClass",
     *         <i>Instance methods</i>,
     *         initialize: function(attrs, options) {
     *             this.someInstanceProperty = [],
     *             <i>Other instance properties</i>
     *         }
     *     }, {
     *         <i>Class properties</i>
     *     });</pre></p>
     *
     * @method extend
     * @param {String} className The name of the Parse class backing this model.
     * @param {Object} protoProps Instance properties to add to instances of the
     *     class returned from this method.
     * @param {Object} classProps Class properties to add the class returned from
     *     this method.
     * @return {Class} A new subclass of Parse.Object.
     */
  }, {
    key: 'extend',
    value: function extend(className, protoProps, classProps) {
      if (typeof className !== 'string') {
        if (className && typeof className.className === 'string') {
          return ParseObject.extend(className.className, className, protoProps);
        } else {
          throw new Error('Parse.Object.extend\'s first argument should be the className.');
        }
      }
      var adjustedClassName = className;

      if (adjustedClassName === 'User' && _CoreManager2['default'].get('PERFORM_USER_REWRITE')) {
        adjustedClassName = '_User';
      }

      var parentProto = ParseObject.prototype;
      if (this.hasOwnProperty('__super__') && this.__super__) {
        parentProto = this.prototype;
      } else if (classMap[adjustedClassName]) {
        parentProto = classMap[adjustedClassName].prototype;
      }
      var ParseObjectSubclass = function ParseObjectSubclass(attributes, options) {
        this.className = adjustedClassName;
        this._objCount = objectCount++;
        // Enable legacy initializers
        if (typeof this.initialize === 'function') {
          this.initialize.apply(this, arguments);
        }

        if (attributes && typeof attributes === 'object') {
          if (!this.set(attributes || {}, options)) {
            throw new Error('Can\'t create an invalid Parse Object');
          }
        }
      };
      ParseObjectSubclass.className = adjustedClassName;
      ParseObjectSubclass.__super__ = parentProto;

      ParseObjectSubclass.prototype = _Object$create(parentProto, {
        constructor: {
          value: ParseObjectSubclass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });

      if (protoProps) {
        for (var prop in protoProps) {
          if (prop !== 'className') {
            _Object$defineProperty(ParseObjectSubclass.prototype, prop, {
              value: protoProps[prop],
              enumerable: false,
              writable: true,
              configurable: true
            });
          }
        }
      }

      if (classProps) {
        for (var prop in classProps) {
          if (prop !== 'className') {
            _Object$defineProperty(ParseObjectSubclass, prop, {
              value: classProps[prop],
              enumerable: false,
              writable: true,
              configurable: true
            });
          }
        }
      }

      ParseObjectSubclass.extend = function (name, protoProps, classProps) {
        if (typeof name === 'string') {
          return ParseObject.extend.call(ParseObjectSubclass, name, protoProps, classProps);
        }
        return ParseObject.extend.call(ParseObjectSubclass, adjustedClassName, name, protoProps);
      };
      ParseObjectSubclass.createWithoutData = ParseObject.createWithoutData;

      classMap[adjustedClassName] = ParseObjectSubclass;
      return ParseObjectSubclass;
    }

    /**
     * Enable single instance objects, where any local objects with the same Id
     * share the same attributes, and stay synchronized with each other.
     * This is disabled by default in server environments, since it can lead to
     * security issues.
     * @method enableSingleInstance
     */
  }, {
    key: 'enableSingleInstance',
    value: function enableSingleInstance() {
      singleInstance = true;
      _CoreManager2['default'].setObjectStateController(SingleInstanceStateController);
    }

    /**
     * Disable single instance objects, where any local objects with the same Id
     * share the same attributes, and stay synchronized with each other.
     * When disabled, you can have two instances of the same object in memory
     * without them sharing attributes.
     * @method disableSingleInstance
     */
  }, {
    key: 'disableSingleInstance',
    value: function disableSingleInstance() {
      singleInstance = false;
      _CoreManager2['default'].setObjectStateController(UniqueInstanceStateController);
    }
  }]);

  return ParseObject;
})();

exports['default'] = ParseObject;

_CoreManager2['default'].setObjectController({
  fetch: function fetch(target, forceFetch, options) {
    if (Array.isArray(target)) {
      if (target.length < 1) {
        return _ParsePromise2['default'].as([]);
      }
      var objs = [];
      var ids = [];
      var className = null;
      var results = [];
      var error = null;
      target.forEach(function (el, i) {
        if (error) {
          return;
        }
        if (!className) {
          className = el.className;
        }
        if (className !== el.className) {
          error = new _ParseError2['default'](_ParseError2['default'].INVALID_CLASS_NAME, 'All objects should be of the same class');
        }
        if (!el.id) {
          error = new _ParseError2['default'](_ParseError2['default'].MISSING_OBJECT_ID, 'All objects must have an ID');
        }
        if (forceFetch || _Object$keys(el._getServerData()).length === 0) {
          ids.push(el.id);
          objs.push(el);
        }
        results.push(el);
      });
      if (error) {
        return _ParsePromise2['default'].error(error);
      }
      var query = new _ParseQuery2['default'](className);
      query.containedIn('objectId', ids);
      query._limit = ids.length;
      return query.find(options).then(function (objects) {
        var idMap = {};
        objects.forEach(function (o) {
          idMap[o.id] = o;
        });
        for (var i = 0; i < objs.length; i++) {
          var obj = objs[i];
          if (!obj || !obj.id || !idMap[obj.id]) {
            if (forceFetch) {
              return _ParsePromise2['default'].error(new _ParseError2['default'](_ParseError2['default'].OBJECT_NOT_FOUND, 'All objects must exist on the server.'));
            }
          }
        }
        if (!singleInstance) {
          // If single instance objects are disabled, we need to replace the
          for (var i = 0; i < results.length; i++) {
            var obj = results[i];
            if (obj && obj.id && idMap[obj.id]) {
              var id = obj.id;
              obj._finishFetch(idMap[id].toJSON());
              results[i] = idMap[id];
            }
          }
        }
        return _ParsePromise2['default'].as(results);
      });
    } else {
      var RESTController = _CoreManager2['default'].getRESTController();
      return RESTController.request('GET', 'classes/' + target.className + '/' + target._getId(), {}, options).then(function (response, status, xhr) {
        if (target instanceof ParseObject) {
          target._clearPendingOps();
          target._clearServerData();
          target._finishFetch(response);
        }
        return target;
      });
    }
  },

  destroy: function destroy(target, options) {
    var RESTController = _CoreManager2['default'].getRESTController();
    if (Array.isArray(target)) {
      if (target.length < 1) {
        return _ParsePromise2['default'].as([]);
      }
      var batches = [[]];
      target.forEach(function (obj) {
        if (!obj.id) {
          return;
        }
        batches[batches.length - 1].push(obj);
        if (batches[batches.length - 1].length >= 20) {
          batches.push([]);
        }
      });
      if (batches[batches.length - 1].length === 0) {
        // If the last batch is empty, remove it
        batches.pop();
      }
      var deleteCompleted = _ParsePromise2['default'].as();
      var errors = [];
      batches.forEach(function (batch) {
        deleteCompleted = deleteCompleted.then(function () {
          return RESTController.request('POST', 'batch', {
            requests: batch.map(function (obj) {
              return {
                method: 'DELETE',
                path: getServerUrlPath() + 'classes/' + obj.className + '/' + obj._getId(),
                body: {}
              };
            })
          }, options).then(function (results) {
            for (var i = 0; i < results.length; i++) {
              if (results[i] && results[i].hasOwnProperty('error')) {
                var err = new _ParseError2['default'](results[i].error.code, results[i].error.error);
                err.object = batch[i];
                errors.push(err);
              }
            }
          });
        });
      });
      return deleteCompleted.then(function () {
        if (errors.length) {
          var aggregate = new _ParseError2['default'](_ParseError2['default'].AGGREGATE_ERROR);
          aggregate.errors = errors;
          return _ParsePromise2['default'].error(aggregate);
        }
        return _ParsePromise2['default'].as(target);
      });
    } else if (target instanceof ParseObject) {
      return RESTController.request('DELETE', 'classes/' + target.className + '/' + target._getId(), {}, options).then(function () {
        return _ParsePromise2['default'].as(target);
      });
    }
    return _ParsePromise2['default'].as(target);
  },

  save: function save(target, options) {
    var RESTController = _CoreManager2['default'].getRESTController();
    var stateController = _CoreManager2['default'].getObjectStateController();
    if (Array.isArray(target)) {
      if (target.length < 1) {
        return _ParsePromise2['default'].as([]);
      }

      var unsaved = target.concat();
      for (var i = 0; i < target.length; i++) {
        if (target[i] instanceof ParseObject) {
          unsaved = unsaved.concat((0, _unsavedChildren2['default'])(target[i], true));
        }
      }
      unsaved = (0, _unique2['default'])(unsaved);

      var filesSaved = _ParsePromise2['default'].as();
      var pending = [];
      unsaved.forEach(function (el) {
        if (el instanceof _ParseFile2['default']) {
          filesSaved = filesSaved.then(function () {
            return el.save();
          });
        } else if (el instanceof ParseObject) {
          pending.push(el);
        }
      });

      return filesSaved.then(function () {
        var objectError = null;
        return _ParsePromise2['default']._continueWhile(function () {
          return pending.length > 0;
        }, function () {
          var batch = [];
          var nextPending = [];
          pending.forEach(function (el) {
            if (batch.length < 20 && (0, _canBeSerialized2['default'])(el)) {
              batch.push(el);
            } else {
              nextPending.push(el);
            }
          });
          pending = nextPending;
          if (batch.length < 1) {
            return _ParsePromise2['default'].error(new _ParseError2['default'](_ParseError2['default'].OTHER_CAUSE, 'Tried to save a batch with a cycle.'));
          }

          // Queue up tasks for each object in the batch.
          // When every task is ready, the API request will execute
          var batchReturned = new _ParsePromise2['default']();
          var batchReady = [];
          var batchTasks = [];
          batch.forEach(function (obj, index) {
            var ready = new _ParsePromise2['default']();
            batchReady.push(ready);
            var task = function task() {
              ready.resolve();
              return batchReturned.then(function (responses, status) {
                if (responses[index].hasOwnProperty('success')) {
                  obj._handleSaveResponse(responses[index].success, status);
                } else {
                  if (!objectError && responses[index].hasOwnProperty('error')) {
                    var serverError = responses[index].error;
                    objectError = new _ParseError2['default'](serverError.code, serverError.error);
                    // Cancel the rest of the save
                    pending = [];
                  }
                  obj._handleSaveError();
                }
              });
            };
            stateController.pushPendingState(obj._getStateIdentifier());
            batchTasks.push(stateController.enqueueTask(obj._getStateIdentifier(), task));
          });

          _ParsePromise2['default'].when(batchReady).then(function () {
            // Kick off the batch request
            return RESTController.request('POST', 'batch', {
              requests: batch.map(function (obj) {
                var params = obj._getSaveParams();
                params.path = getServerUrlPath() + params.path;
                return params;
              })
            }, options);
          }).then(function (response, status, xhr) {
            batchReturned.resolve(response, status);
          });

          return _ParsePromise2['default'].when(batchTasks);
        }).then(function () {
          if (objectError) {
            return _ParsePromise2['default'].error(objectError);
          }
          return _ParsePromise2['default'].as(target);
        });
      });
    } else if (target instanceof ParseObject) {
      // copying target lets Flow guarantee the pointer isn't modified elsewhere
      var targetCopy = target;
      var task = function task() {
        var params = targetCopy._getSaveParams();
        return RESTController.request(params.method, params.path, params.body, options).then(function (response, status) {
          targetCopy._handleSaveResponse(response, status);
        }, function (error) {
          targetCopy._handleSaveError();
          return _ParsePromise2['default'].error(error);
        });
      };

      stateController.pushPendingState(target._getStateIdentifier());
      return stateController.enqueueTask(target._getStateIdentifier(), task).then(function () {
        return target;
      }, function (error) {
        return _ParsePromise2['default'].error(error);
      });
    }
    return _ParsePromise2['default'].as();
  }
});
module.exports = exports['default'];

/**
 * The ID of this object, unique within its class.
 * @property id
 * @type String
 */
},{"./CoreManager":3,"./ParseACL":11,"./ParseError":13,"./ParseFile":14,"./ParseOp":19,"./ParsePromise":20,"./ParseQuery":21,"./ParseRelation":22,"./SingleInstanceStateController":28,"./UniqueInstanceStateController":32,"./canBeSerialized":34,"./decode":35,"./encode":36,"./equals":37,"./escape":38,"./parseDate":40,"./unique":41,"./unsavedChildren":42,"babel-runtime/core-js/object/create":45,"babel-runtime/core-js/object/define-property":46,"babel-runtime/core-js/object/freeze":47,"babel-runtime/core-js/object/keys":49,"babel-runtime/helpers/class-call-check":52,"babel-runtime/helpers/create-class":53,"babel-runtime/helpers/interop-require-default":56,"babel-runtime/helpers/interop-require-wildcard":57}],19:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _createClass = _dereq_('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = _dereq_('babel-runtime/helpers/class-call-check')['default'];

var _get = _dereq_('babel-runtime/helpers/get')['default'];

var _inherits = _dereq_('babel-runtime/helpers/inherits')['default'];

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.opFromJSON = opFromJSON;

var _arrayContainsObject = _dereq_('./arrayContainsObject');

var _arrayContainsObject2 = _interopRequireDefault(_arrayContainsObject);

var _decode = _dereq_('./decode');

var _decode2 = _interopRequireDefault(_decode);

var _encode = _dereq_('./encode');

var _encode2 = _interopRequireDefault(_encode);

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParseRelation = _dereq_('./ParseRelation');

var _ParseRelation2 = _interopRequireDefault(_ParseRelation);

var _unique = _dereq_('./unique');

var _unique2 = _interopRequireDefault(_unique);

function opFromJSON(json) {
  if (!json || !json.__op) {
    return null;
  }
  switch (json.__op) {
    case 'Delete':
      return new UnsetOp();
    case 'Increment':
      return new IncrementOp(json.amount);
    case 'Add':
      return new AddOp((0, _decode2['default'])(json.objects));
    case 'AddUnique':
      return new AddUniqueOp((0, _decode2['default'])(json.objects));
    case 'Remove':
      return new RemoveOp((0, _decode2['default'])(json.objects));
    case 'AddRelation':
      var toAdd = (0, _decode2['default'])(json.objects);
      if (!Array.isArray(toAdd)) {
        return new RelationOp([], []);
      }
      return new RelationOp(toAdd, []);
    case 'RemoveRelation':
      var toRemove = (0, _decode2['default'])(json.objects);
      if (!Array.isArray(toRemove)) {
        return new RelationOp([], []);
      }
      return new RelationOp([], toRemove);
    case 'Batch':
      var toAdd = [];
      var toRemove = [];
      for (var i = 0; i < json.ops.length; i++) {
        if (json.ops[i].__op === 'AddRelation') {
          toAdd = toAdd.concat((0, _decode2['default'])(json.ops[i].objects));
        } else if (json.ops[i].__op === 'RemoveRelation') {
          toRemove = toRemove.concat((0, _decode2['default'])(json.ops[i].objects));
        }
      }
      return new RelationOp(toAdd, toRemove);
  }
  return null;
}

var Op = (function () {
  function Op() {
    _classCallCheck(this, Op);
  }

  _createClass(Op, [{
    key: 'applyTo',

    // Empty parent class
    value: function applyTo(value) {}
  }, {
    key: 'mergeWith',
    value: function mergeWith(previous) {}
  }, {
    key: 'toJSON',
    value: function toJSON() {}
  }]);

  return Op;
})();

exports.Op = Op;

var SetOp = (function (_Op) {
  _inherits(SetOp, _Op);

  function SetOp(value) {
    _classCallCheck(this, SetOp);

    _get(Object.getPrototypeOf(SetOp.prototype), 'constructor', this).call(this);
    this._value = value;
  }

  _createClass(SetOp, [{
    key: 'applyTo',
    value: function applyTo(value) {
      return this._value;
    }
  }, {
    key: 'mergeWith',
    value: function mergeWith(previous) {
      return new SetOp(this._value);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return (0, _encode2['default'])(this._value, false, true);
    }
  }]);

  return SetOp;
})(Op);

exports.SetOp = SetOp;

var UnsetOp = (function (_Op2) {
  _inherits(UnsetOp, _Op2);

  function UnsetOp() {
    _classCallCheck(this, UnsetOp);

    _get(Object.getPrototypeOf(UnsetOp.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(UnsetOp, [{
    key: 'applyTo',
    value: function applyTo(value) {
      return undefined;
    }
  }, {
    key: 'mergeWith',
    value: function mergeWith(previous) {
      return new UnsetOp();
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return { __op: 'Delete' };
    }
  }]);

  return UnsetOp;
})(Op);

exports.UnsetOp = UnsetOp;

var IncrementOp = (function (_Op3) {
  _inherits(IncrementOp, _Op3);

  function IncrementOp(amount) {
    _classCallCheck(this, IncrementOp);

    _get(Object.getPrototypeOf(IncrementOp.prototype), 'constructor', this).call(this);
    if (typeof amount !== 'number') {
      throw new TypeError('Increment Op must be initialized with a numeric amount.');
    }
    this._amount = amount;
  }

  _createClass(IncrementOp, [{
    key: 'applyTo',
    value: function applyTo(value) {
      if (typeof value === 'undefined') {
        return this._amount;
      }
      if (typeof value !== 'number') {
        throw new TypeError('Cannot increment a non-numeric value.');
      }
      return this._amount + value;
    }
  }, {
    key: 'mergeWith',
    value: function mergeWith(previous) {
      if (!previous) {
        return this;
      }
      if (previous instanceof SetOp) {
        return new SetOp(this.applyTo(previous._value));
      }
      if (previous instanceof UnsetOp) {
        return new SetOp(this._amount);
      }
      if (previous instanceof IncrementOp) {
        return new IncrementOp(this.applyTo(previous._amount));
      }
      throw new Error('Cannot merge Increment Op with the previous Op');
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return { __op: 'Increment', amount: this._amount };
    }
  }]);

  return IncrementOp;
})(Op);

exports.IncrementOp = IncrementOp;

var AddOp = (function (_Op4) {
  _inherits(AddOp, _Op4);

  function AddOp(value) {
    _classCallCheck(this, AddOp);

    _get(Object.getPrototypeOf(AddOp.prototype), 'constructor', this).call(this);
    this._value = Array.isArray(value) ? value : [value];
  }

  _createClass(AddOp, [{
    key: 'applyTo',
    value: function applyTo(value) {
      if (value == null) {
        return this._value;
      }
      if (Array.isArray(value)) {
        return value.concat(this._value);
      }
      throw new Error('Cannot add elements to a non-array value');
    }
  }, {
    key: 'mergeWith',
    value: function mergeWith(previous) {
      if (!previous) {
        return this;
      }
      if (previous instanceof SetOp) {
        return new SetOp(this.applyTo(previous._value));
      }
      if (previous instanceof UnsetOp) {
        return new SetOp(this._value);
      }
      if (previous instanceof AddOp) {
        return new AddOp(this.applyTo(previous._value));
      }
      throw new Error('Cannot merge Add Op with the previous Op');
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return { __op: 'Add', objects: (0, _encode2['default'])(this._value, false, true) };
    }
  }]);

  return AddOp;
})(Op);

exports.AddOp = AddOp;

var AddUniqueOp = (function (_Op5) {
  _inherits(AddUniqueOp, _Op5);

  function AddUniqueOp(value) {
    _classCallCheck(this, AddUniqueOp);

    _get(Object.getPrototypeOf(AddUniqueOp.prototype), 'constructor', this).call(this);
    this._value = (0, _unique2['default'])(Array.isArray(value) ? value : [value]);
  }

  _createClass(AddUniqueOp, [{
    key: 'applyTo',
    value: function applyTo(value) {
      if (value == null) {
        return this._value || [];
      }
      if (Array.isArray(value)) {
        // copying value lets Flow guarantee the pointer isn't modified elsewhere
        var valueCopy = value;
        var toAdd = [];
        this._value.forEach(function (v) {
          if (v instanceof _ParseObject2['default']) {
            if (!(0, _arrayContainsObject2['default'])(valueCopy, v)) {
              toAdd.push(v);
            }
          } else {
            if (valueCopy.indexOf(v) < 0) {
              toAdd.push(v);
            }
          }
        });
        return value.concat(toAdd);
      }
      throw new Error('Cannot add elements to a non-array value');
    }
  }, {
    key: 'mergeWith',
    value: function mergeWith(previous) {
      if (!previous) {
        return this;
      }
      if (previous instanceof SetOp) {
        return new SetOp(this.applyTo(previous._value));
      }
      if (previous instanceof UnsetOp) {
        return new SetOp(this._value);
      }
      if (previous instanceof AddUniqueOp) {
        return new AddUniqueOp(this.applyTo(previous._value));
      }
      throw new Error('Cannot merge AddUnique Op with the previous Op');
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return { __op: 'AddUnique', objects: (0, _encode2['default'])(this._value, false, true) };
    }
  }]);

  return AddUniqueOp;
})(Op);

exports.AddUniqueOp = AddUniqueOp;

var RemoveOp = (function (_Op6) {
  _inherits(RemoveOp, _Op6);

  function RemoveOp(value) {
    _classCallCheck(this, RemoveOp);

    _get(Object.getPrototypeOf(RemoveOp.prototype), 'constructor', this).call(this);
    this._value = (0, _unique2['default'])(Array.isArray(value) ? value : [value]);
  }

  _createClass(RemoveOp, [{
    key: 'applyTo',
    value: function applyTo(value) {
      if (value == null) {
        return [];
      }
      if (Array.isArray(value)) {
        var i = value.indexOf(this._value);
        var removed = value.concat([]);
        for (var i = 0; i < this._value.length; i++) {
          var index = removed.indexOf(this._value[i]);
          while (index > -1) {
            removed.splice(index, 1);
            index = removed.indexOf(this._value[i]);
          }
          if (this._value[i] instanceof _ParseObject2['default'] && this._value[i].id) {
            for (var j = 0; j < removed.length; j++) {
              if (removed[j] instanceof _ParseObject2['default'] && this._value[i].id === removed[j].id) {
                removed.splice(j, 1);
                j--;
              }
            }
          }
        }
        return removed;
      }
      throw new Error('Cannot remove elements from a non-array value');
    }
  }, {
    key: 'mergeWith',
    value: function mergeWith(previous) {
      if (!previous) {
        return this;
      }
      if (previous instanceof SetOp) {
        return new SetOp(this.applyTo(previous._value));
      }
      if (previous instanceof UnsetOp) {
        return new UnsetOp();
      }
      if (previous instanceof RemoveOp) {
        var uniques = previous._value.concat([]);
        for (var i = 0; i < this._value.length; i++) {
          if (this._value[i] instanceof _ParseObject2['default']) {
            if (!(0, _arrayContainsObject2['default'])(uniques, this._value[i])) {
              uniques.push(this._value[i]);
            }
          } else {
            if (uniques.indexOf(this._value[i]) < 0) {
              uniques.push(this._value[i]);
            }
          }
        }
        return new RemoveOp(uniques);
      }
      throw new Error('Cannot merge Remove Op with the previous Op');
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return { __op: 'Remove', objects: (0, _encode2['default'])(this._value, false, true) };
    }
  }]);

  return RemoveOp;
})(Op);

exports.RemoveOp = RemoveOp;

var RelationOp = (function (_Op7) {
  _inherits(RelationOp, _Op7);

  function RelationOp(adds, removes) {
    _classCallCheck(this, RelationOp);

    _get(Object.getPrototypeOf(RelationOp.prototype), 'constructor', this).call(this);
    this._targetClassName = null;

    if (Array.isArray(adds)) {
      this.relationsToAdd = (0, _unique2['default'])(adds.map(this._extractId, this));
    }

    if (Array.isArray(removes)) {
      this.relationsToRemove = (0, _unique2['default'])(removes.map(this._extractId, this));
    }
  }

  _createClass(RelationOp, [{
    key: '_extractId',
    value: function _extractId(obj) {
      if (typeof obj === 'string') {
        return obj;
      }
      if (!obj.id) {
        throw new Error('You cannot add or remove an unsaved Parse Object from a relation');
      }
      if (!this._targetClassName) {
        this._targetClassName = obj.className;
      }
      if (this._targetClassName !== obj.className) {
        throw new Error('Tried to create a Relation with 2 different object types: ' + this._targetClassName + ' and ' + obj.className + '.');
      }
      return obj.id;
    }
  }, {
    key: 'applyTo',
    value: function applyTo(value, object, key) {
      if (!value) {
        if (!object || !key) {
          throw new Error('Cannot apply a RelationOp without either a previous value, or an object and a key');
        }
        var parent = new _ParseObject2['default'](object.className);
        if (object.id && object.id.indexOf('local') === 0) {
          parent._localId = object.id;
        } else if (object.id) {
          parent.id = object.id;
        }
        var relation = new _ParseRelation2['default'](parent, key);
        relation.targetClassName = this._targetClassName;
        return relation;
      }
      if (value instanceof _ParseRelation2['default']) {
        if (this._targetClassName) {
          if (value.targetClassName) {
            if (this._targetClassName !== value.targetClassName) {
              throw new Error('Related object must be a ' + value.targetClassName + ', but a ' + this._targetClassName + ' was passed in.');
            }
          } else {
            value.targetClassName = this._targetClassName;
          }
        }
        return value;
      } else {
        throw new Error('Relation cannot be applied to a non-relation field');
      }
    }
  }, {
    key: 'mergeWith',
    value: function mergeWith(previous) {
      if (!previous) {
        return this;
      } else if (previous instanceof UnsetOp) {
        throw new Error('You cannot modify a relation after deleting it.');
      } else if (previous instanceof RelationOp) {
        if (previous._targetClassName && previous._targetClassName !== this._targetClassName) {
          throw new Error('Related object must be of class ' + previous._targetClassName + ', but ' + (this._targetClassName || 'null') + ' was passed in.');
        }
        var newAdd = previous.relationsToAdd.concat([]);
        this.relationsToRemove.forEach(function (r) {
          var index = newAdd.indexOf(r);
          if (index > -1) {
            newAdd.splice(index, 1);
          }
        });
        this.relationsToAdd.forEach(function (r) {
          var index = newAdd.indexOf(r);
          if (index < 0) {
            newAdd.push(r);
          }
        });

        var newRemove = previous.relationsToRemove.concat([]);
        this.relationsToAdd.forEach(function (r) {
          var index = newRemove.indexOf(r);
          if (index > -1) {
            newRemove.splice(index, 1);
          }
        });
        this.relationsToRemove.forEach(function (r) {
          var index = newRemove.indexOf(r);
          if (index < 0) {
            newRemove.push(r);
          }
        });

        var newRelation = new RelationOp(newAdd, newRemove);
        newRelation._targetClassName = this._targetClassName;
        return newRelation;
      }
      throw new Error('Cannot merge Relation Op with the previous Op');
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var _this = this;

      var idToPointer = function idToPointer(id) {
        return {
          __type: 'Pointer',
          className: _this._targetClassName,
          objectId: id
        };
      };

      var adds = null;
      var removes = null;
      var pointers = null;

      if (this.relationsToAdd.length > 0) {
        pointers = this.relationsToAdd.map(idToPointer);
        adds = { __op: 'AddRelation', objects: pointers };
      }
      if (this.relationsToRemove.length > 0) {
        pointers = this.relationsToRemove.map(idToPointer);
        removes = { __op: 'RemoveRelation', objects: pointers };
      }

      if (adds && removes) {
        return { __op: 'Batch', ops: [adds, removes] };
      }

      return adds || removes || {};
    }
  }]);

  return RelationOp;
})(Op);

exports.RelationOp = RelationOp;
},{"./ParseObject":18,"./ParseRelation":22,"./arrayContainsObject":33,"./decode":35,"./encode":36,"./unique":41,"babel-runtime/helpers/class-call-check":52,"babel-runtime/helpers/create-class":53,"babel-runtime/helpers/get":54,"babel-runtime/helpers/inherits":55,"babel-runtime/helpers/interop-require-default":56}],20:[function(_dereq_,module,exports){
(function (process){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var _createClass = _dereq_('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = _dereq_('babel-runtime/helpers/class-call-check')['default'];

var _getIterator = _dereq_('babel-runtime/core-js/get-iterator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _isPromisesAPlusCompliant = true;

/**
 * A Promise is returned by async methods as a hook to provide callbacks to be
 * called when the async task is fulfilled.
 *
 * <p>Typical usage would be like:<pre>
 *    query.find().then(function(results) {
 *      results[0].set("foo", "bar");
 *      return results[0].saveAsync();
 *    }).then(function(result) {
 *      console.log("Updated " + result.id);
 *    });
 * </pre></p>
 *
 * @class Parse.Promise
 * @constructor
 */

var ParsePromise = (function () {
  function ParsePromise(executor) {
    _classCallCheck(this, ParsePromise);

    this._resolved = false;
    this._rejected = false;
    this._resolvedCallbacks = [];
    this._rejectedCallbacks = [];

    if (typeof executor === 'function') {
      executor(this.resolve.bind(this), this.reject.bind(this));
    }
  }

  /**
   * Marks this promise as fulfilled, firing any callbacks waiting on it.
   * @method resolve
   * @param {Object} result the result to pass to the callbacks.
   */

  _createClass(ParsePromise, [{
    key: 'resolve',
    value: function resolve() {
      if (this._resolved || this._rejected) {
        throw new Error('A promise was resolved even though it had already been ' + (this._resolved ? 'resolved' : 'rejected') + '.');
      }
      this._resolved = true;

      for (var _len = arguments.length, results = Array(_len), _key = 0; _key < _len; _key++) {
        results[_key] = arguments[_key];
      }

      this._result = results;
      for (var i = 0; i < this._resolvedCallbacks.length; i++) {
        this._resolvedCallbacks[i].apply(this, results);
      }

      this._resolvedCallbacks = [];
      this._rejectedCallbacks = [];
    }

    /**
     * Marks this promise as fulfilled, firing any callbacks waiting on it.
     * @method reject
     * @param {Object} error the error to pass to the callbacks.
     */
  }, {
    key: 'reject',
    value: function reject(error) {
      if (this._resolved || this._rejected) {
        throw new Error('A promise was rejected even though it had already been ' + (this._resolved ? 'resolved' : 'rejected') + '.');
      }
      this._rejected = true;
      this._error = error;
      for (var i = 0; i < this._rejectedCallbacks.length; i++) {
        this._rejectedCallbacks[i](error);
      }
      this._resolvedCallbacks = [];
      this._rejectedCallbacks = [];
    }

    /**
     * Adds callbacks to be called when this promise is fulfilled. Returns a new
     * Promise that will be fulfilled when the callback is complete. It allows
     * chaining. If the callback itself returns a Promise, then the one returned
     * by "then" will not be fulfilled until that one returned by the callback
     * is fulfilled.
     * @method then
     * @param {Function} resolvedCallback Function that is called when this
     * Promise is resolved. Once the callback is complete, then the Promise
     * returned by "then" will also be fulfilled.
     * @param {Function} rejectedCallback Function that is called when this
     * Promise is rejected with an error. Once the callback is complete, then
     * the promise returned by "then" with be resolved successfully. If
     * rejectedCallback is null, or it returns a rejected Promise, then the
     * Promise returned by "then" will be rejected with that error.
     * @return {Parse.Promise} A new Promise that will be fulfilled after this
     * Promise is fulfilled and either callback has completed. If the callback
     * returned a Promise, then this Promise will not be fulfilled until that
     * one is.
     */
  }, {
    key: 'then',
    value: function then(resolvedCallback, rejectedCallback) {
      var _this = this;

      var promise = new ParsePromise();

      var wrappedResolvedCallback = function wrappedResolvedCallback() {
        for (var _len2 = arguments.length, results = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          results[_key2] = arguments[_key2];
        }

        if (typeof resolvedCallback === 'function') {
          if (_isPromisesAPlusCompliant) {
            try {
              results = [resolvedCallback.apply(this, results)];
            } catch (e) {
              results = [ParsePromise.error(e)];
            }
          } else {
            results = [resolvedCallback.apply(this, results)];
          }
        }
        if (results.length === 1 && ParsePromise.is(results[0])) {
          results[0].then(function () {
            promise.resolve.apply(promise, arguments);
          }, function (error) {
            promise.reject(error);
          });
        } else {
          promise.resolve.apply(promise, results);
        }
      };

      var wrappedRejectedCallback = function wrappedRejectedCallback(error) {
        var result = [];
        if (typeof rejectedCallback === 'function') {
          if (_isPromisesAPlusCompliant) {
            try {
              result = [rejectedCallback(error)];
            } catch (e) {
              result = [ParsePromise.error(e)];
            }
          } else {
            result = [rejectedCallback(error)];
          }
          if (result.length === 1 && ParsePromise.is(result[0])) {
            result[0].then(function () {
              promise.resolve.apply(promise, arguments);
            }, function (error) {
              promise.reject(error);
            });
          } else {
            if (_isPromisesAPlusCompliant) {
              promise.resolve.apply(promise, result);
            } else {
              promise.reject(result[0]);
            }
          }
        } else {
          promise.reject(error);
        }
      };

      var runLater = function runLater(fn) {
        fn.call();
      };
      if (_isPromisesAPlusCompliant) {
        if (typeof process !== 'undefined' && typeof process.nextTick === 'function') {
          runLater = function (fn) {
            process.nextTick(fn);
          };
        } else if (typeof setTimeout === 'function') {
          runLater = function (fn) {
            setTimeout(fn, 0);
          };
        }
      }

      if (this._resolved) {
        runLater(function () {
          wrappedResolvedCallback.apply(_this, _this._result);
        });
      } else if (this._rejected) {
        runLater(function () {
          wrappedRejectedCallback(_this._error);
        });
      } else {
        this._resolvedCallbacks.push(wrappedResolvedCallback);
        this._rejectedCallbacks.push(wrappedRejectedCallback);
      }

      return promise;
    }

    /**
     * Add handlers to be called when the promise
     * is either resolved or rejected
     * @method always
     */
  }, {
    key: 'always',
    value: function always(callback) {
      return this.then(callback, callback);
    }

    /**
     * Add handlers to be called when the Promise object is resolved
     * @method done
     */
  }, {
    key: 'done',
    value: function done(callback) {
      return this.then(callback);
    }

    /**
     * Add handlers to be called when the Promise object is rejected
     * Alias for catch().
     * @method fail
     */
  }, {
    key: 'fail',
    value: function fail(callback) {
      return this.then(null, callback);
    }

    /**
     * Add handlers to be called when the Promise object is rejected
     * @method catch
     */
  }, {
    key: 'catch',
    value: function _catch(callback) {
      return this.then(null, callback);
    }

    /**
     * Run the given callbacks after this promise is fulfilled.
     * @method _thenRunCallbacks
     * @param optionsOrCallback {} A Backbone-style options callback, or a
     * callback function. If this is an options object and contains a "model"
     * attributes, that will be passed to error callbacks as the first argument.
     * @param model {} If truthy, this will be passed as the first result of
     * error callbacks. This is for Backbone-compatability.
     * @return {Parse.Promise} A promise that will be resolved after the
     * callbacks are run, with the same result as this.
     */
  }, {
    key: '_thenRunCallbacks',
    value: function _thenRunCallbacks(optionsOrCallback, model) {
      var options = {};
      if (typeof optionsOrCallback === 'function') {
        options.success = function (result) {
          optionsOrCallback(result, null);
        };
        options.error = function (error) {
          optionsOrCallback(null, error);
        };
      } else if (typeof optionsOrCallback === 'object') {
        if (typeof optionsOrCallback.success === 'function') {
          options.success = optionsOrCallback.success;
        }
        if (typeof optionsOrCallback.error === 'function') {
          options.error = optionsOrCallback.error;
        }
      }

      return this.then(function () {
        for (var _len3 = arguments.length, results = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          results[_key3] = arguments[_key3];
        }

        if (options.success) {
          options.success.apply(this, results);
        }
        return ParsePromise.as.apply(ParsePromise, arguments);
      }, function (error) {
        if (options.error) {
          if (typeof model !== 'undefined') {
            options.error(model, error);
          } else {
            options.error(error);
          }
        }
        // By explicitly returning a rejected Promise, this will work with
        // either jQuery or Promises/A+ semantics.
        return ParsePromise.error(error);
      });
    }

    /**
     * Adds a callback function that should be called regardless of whether
     * this promise failed or succeeded. The callback will be given either the
     * array of results for its first argument, or the error as its second,
     * depending on whether this Promise was rejected or resolved. Returns a
     * new Promise, like "then" would.
     * @method _continueWith
     * @param {Function} continuation the callback.
     */
  }, {
    key: '_continueWith',
    value: function _continueWith(continuation) {
      return this.then(function () {
        return continuation(arguments, null);
      }, function (error) {
        return continuation(null, error);
      });
    }

    /**
     * Returns true iff the given object fulfils the Promise interface.
     * @method is
     * @param {Object} promise The object to test
     * @static
     * @return {Boolean}
     */
  }], [{
    key: 'is',
    value: function is(promise) {
      return promise != null && typeof promise.then === 'function';
    }

    /**
     * Returns a new promise that is resolved with a given value.
     * @method as
     * @param value The value to resolve the promise with
     * @static
     * @return {Parse.Promise} the new promise.
     */
  }, {
    key: 'as',
    value: function as() {
      var promise = new ParsePromise();

      for (var _len4 = arguments.length, values = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        values[_key4] = arguments[_key4];
      }

      promise.resolve.apply(promise, values);
      return promise;
    }

    /**
     * Returns a new promise that is resolved with a given value.
     * If that value is a thenable Promise (has a .then() prototype
     * method), the new promise will be chained to the end of the
     * value.
     * @method resolve
     * @param value The value to resolve the promise with
     * @static
     * @return {Parse.Promise} the new promise.
     */
  }, {
    key: 'resolve',
    value: function resolve(value) {
      return new ParsePromise(function (resolve, reject) {
        if (ParsePromise.is(value)) {
          value.then(resolve, reject);
        } else {
          resolve(value);
        }
      });
    }

    /**
     * Returns a new promise that is rejected with a given error.
     * @method error
     * @param error The error to reject the promise with
     * @static
     * @return {Parse.Promise} the new promise.
     */
  }, {
    key: 'error',
    value: function error() {
      var promise = new ParsePromise();

      for (var _len5 = arguments.length, errors = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        errors[_key5] = arguments[_key5];
      }

      promise.reject.apply(promise, errors);
      return promise;
    }

    /**
     * Returns a new promise that is rejected with a given error.
     * This is an alias for Parse.Promise.error, for compliance with
     * the ES6 implementation.
     * @method reject
     * @param error The error to reject the promise with
     * @static
     * @return {Parse.Promise} the new promise.
     */
  }, {
    key: 'reject',
    value: function reject() {
      for (var _len6 = arguments.length, errors = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        errors[_key6] = arguments[_key6];
      }

      return ParsePromise.error.apply(null, errors);
    }

    /**
     * Returns a new promise that is fulfilled when all of the input promises
     * are resolved. If any promise in the list fails, then the returned promise
     * will be rejected with an array containing the error from each promise.
     * If they all succeed, then the returned promise will succeed, with the
     * results being the results of all the input
     * promises. For example: <pre>
     *   var p1 = Parse.Promise.as(1);
     *   var p2 = Parse.Promise.as(2);
     *   var p3 = Parse.Promise.as(3);
     *
     *   Parse.Promise.when(p1, p2, p3).then(function(r1, r2, r3) {
     *     console.log(r1);  // prints 1
     *     console.log(r2);  // prints 2
     *     console.log(r3);  // prints 3
     *   });</pre>
     *
     * The input promises can also be specified as an array: <pre>
     *   var promises = [p1, p2, p3];
     *   Parse.Promise.when(promises).then(function(results) {
     *     console.log(results);  // prints [1,2,3]
     *   });
     * </pre>
     * @method when
     * @param {Array} promises a list of promises to wait for.
     * @static
     * @return {Parse.Promise} the new promise.
     */
  }, {
    key: 'when',
    value: function when(promises) {
      var objects;
      var arrayArgument = Array.isArray(promises);
      if (arrayArgument) {
        objects = promises;
      } else {
        objects = arguments;
      }

      var total = objects.length;
      var hadError = false;
      var results = [];
      var returnValue = arrayArgument ? [results] : results;
      var errors = [];
      results.length = objects.length;
      errors.length = objects.length;

      if (total === 0) {
        return ParsePromise.as.apply(this, returnValue);
      }

      var promise = new ParsePromise();

      var resolveOne = function resolveOne() {
        total--;
        if (total <= 0) {
          if (hadError) {
            promise.reject(errors);
          } else {
            promise.resolve.apply(promise, returnValue);
          }
        }
      };

      var chain = function chain(object, index) {
        if (ParsePromise.is(object)) {
          object.then(function (result) {
            results[index] = result;
            resolveOne();
          }, function (error) {
            errors[index] = error;
            hadError = true;
            resolveOne();
          });
        } else {
          results[i] = object;
          resolveOne();
        }
      };
      for (var i = 0; i < objects.length; i++) {
        chain(objects[i], i);
      }

      return promise;
    }

    /**
     * Returns a new promise that is fulfilled when all of the promises in the
     * iterable argument are resolved. If any promise in the list fails, then
     * the returned promise will be immediately rejected with the reason that
     * single promise rejected. If they all succeed, then the returned promise
     * will succeed, with the results being the results of all the input
     * promises. If the iterable provided is empty, the returned promise will
     * be immediately resolved.
     * 
     * For example: <pre>
     *   var p1 = Parse.Promise.as(1);
     *   var p2 = Parse.Promise.as(2);
     *   var p3 = Parse.Promise.as(3);
     *
     *   Parse.Promise.all([p1, p2, p3]).then(function([r1, r2, r3]) {
     *     console.log(r1);  // prints 1
     *     console.log(r2);  // prints 2
     *     console.log(r3);  // prints 3
     *   });</pre>
     *
     * @method all
     * @param {Iterable} promises an iterable of promises to wait for.
     * @static
     * @return {Parse.Promise} the new promise.
     */
  }, {
    key: 'all',
    value: function all(promises) {
      var total = 0;
      var objects = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(promises), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var p = _step.value;

          objects[total++] = p;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (total === 0) {
        return ParsePromise.as([]);
      }

      var hadError = false;
      var promise = new ParsePromise();
      var resolved = 0;
      var results = [];
      objects.forEach(function (object, i) {
        if (ParsePromise.is(object)) {
          object.then(function (result) {
            if (hadError) {
              return false;
            }
            results[i] = result;
            resolved++;
            if (resolved >= total) {
              promise.resolve(results);
            }
          }, function (error) {
            // Reject immediately
            promise.reject(error);
            hadError = true;
          });
        } else {
          results[i] = object;
          resolved++;
          if (!hadError && resolved >= total) {
            promise.resolve(results);
          }
        }
      });

      return promise;
    }

    /**
     * Returns a new promise that is immediately fulfilled when any of the
     * promises in the iterable argument are resolved or rejected. If the
     * first promise to complete is resolved, the returned promise will be
     * resolved with the same value. Likewise, if the first promise to
     * complete is rejected, the returned promise will be rejected with the
     * same reason.
     *
     * @method race
     * @param {Iterable} promises an iterable of promises to wait for.
     * @static
     * @return {Parse.Promise} the new promise.
     */
  }, {
    key: 'race',
    value: function race(promises) {
      var completed = false;
      var promise = new ParsePromise();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _getIterator(promises), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var p = _step2.value;

          if (ParsePromise.is(p)) {
            p.then(function (result) {
              if (completed) {
                return;
              }
              completed = true;
              promise.resolve(result);
            }, function (error) {
              if (completed) {
                return;
              }
              completed = true;
              promise.reject(error);
            });
          } else if (!completed) {
            completed = true;
            promise.resolve(p);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return promise;
    }

    /**
     * Runs the given asyncFunction repeatedly, as long as the predicate
     * function returns a truthy value. Stops repeating if asyncFunction returns
     * a rejected promise.
     * @method _continueWhile
     * @param {Function} predicate should return false when ready to stop.
     * @param {Function} asyncFunction should return a Promise.
     * @static
     */
  }, {
    key: '_continueWhile',
    value: function _continueWhile(predicate, asyncFunction) {
      if (predicate()) {
        return asyncFunction().then(function () {
          return ParsePromise._continueWhile(predicate, asyncFunction);
        });
      }
      return ParsePromise.as();
    }
  }, {
    key: 'isPromisesAPlusCompliant',
    value: function isPromisesAPlusCompliant() {
      return _isPromisesAPlusCompliant;
    }
  }, {
    key: 'enableAPlusCompliant',
    value: function enableAPlusCompliant() {
      _isPromisesAPlusCompliant = true;
    }
  }, {
    key: 'disableAPlusCompliant',
    value: function disableAPlusCompliant() {
      _isPromisesAPlusCompliant = false;
    }
  }]);

  return ParsePromise;
})();

exports['default'] = ParsePromise;
module.exports = exports['default'];
}).call(this,_dereq_('_process'))
},{"_process":58,"babel-runtime/core-js/get-iterator":43,"babel-runtime/helpers/class-call-check":52,"babel-runtime/helpers/create-class":53}],21:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _createClass = _dereq_('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = _dereq_('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _encode = _dereq_('./encode');

var _encode2 = _interopRequireDefault(_encode);

var _ParseError = _dereq_('./ParseError');

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParseGeoPoint = _dereq_('./ParseGeoPoint');

var _ParseGeoPoint2 = _interopRequireDefault(_ParseGeoPoint);

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParsePromise = _dereq_('./ParsePromise');

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

/**
 * Converts a string into a regex that matches it.
 * Surrounding with \Q .. \E does this, we just need to escape any \E's in
 * the text separately.
 */
function quote(s) {
  return '\\Q' + s.replace('\\E', '\\E\\\\E\\Q') + '\\E';
}

/**
 * Creates a new parse Parse.Query for the given Parse.Object subclass.
 * @class Parse.Query
 * @constructor
 * @param {} objectClass An instance of a subclass of Parse.Object, or a Parse className string.
 *
 * <p>Parse.Query defines a query that is used to fetch Parse.Objects. The
 * most common use case is finding all objects that match a query through the
 * <code>find</code> method. For example, this sample code fetches all objects
 * of class <code>MyClass</code>. It calls a different function depending on
 * whether the fetch succeeded or not.
 *
 * <pre>
 * var query = new Parse.Query(MyClass);
 * query.find({
 *   success: function(results) {
 *     // results is an array of Parse.Object.
 *   },
 *
 *   error: function(error) {
 *     // error is an instance of Parse.Error.
 *   }
 * });</pre></p>
 *
 * <p>A Parse.Query can also be used to retrieve a single object whose id is
 * known, through the get method. For example, this sample code fetches an
 * object of class <code>MyClass</code> and id <code>myId</code>. It calls a
 * different function depending on whether the fetch succeeded or not.
 *
 * <pre>
 * var query = new Parse.Query(MyClass);
 * query.get(myId, {
 *   success: function(object) {
 *     // object is an instance of Parse.Object.
 *   },
 *
 *   error: function(object, error) {
 *     // error is an instance of Parse.Error.
 *   }
 * });</pre></p>
 *
 * <p>A Parse.Query can also be used to count the number of objects that match
 * the query without retrieving all of those objects. For example, this
 * sample code counts the number of objects of the class <code>MyClass</code>
 * <pre>
 * var query = new Parse.Query(MyClass);
 * query.count({
 *   success: function(number) {
 *     // There are number instances of MyClass.
 *   },
 *
 *   error: function(error) {
 *     // error is an instance of Parse.Error.
 *   }
 * });</pre></p>
 */

var ParseQuery = (function () {
  function ParseQuery(objectClass) {
    _classCallCheck(this, ParseQuery);

    if (typeof objectClass === 'string') {
      if (objectClass === 'User' && _CoreManager2['default'].get('PERFORM_USER_REWRITE')) {
        this.className = '_User';
      } else {
        this.className = objectClass;
      }
    } else if (objectClass instanceof _ParseObject2['default']) {
      this.className = objectClass.className;
    } else if (typeof objectClass === 'function') {
      if (typeof objectClass.className === 'string') {
        this.className = objectClass.className;
      } else {
        var obj = new objectClass();
        this.className = obj.className;
      }
    } else {
      throw new TypeError('A ParseQuery must be constructed with a ParseObject or class name.');
    }

    this._where = {};
    this._include = [];
    this._limit = -1; // negative limit is not sent in the server request
    this._skip = 0;
    this._extraOptions = {};
  }

  /**
   * Adds constraint that at least one of the passed in queries matches.
   * @method _orQuery
   * @param {Array} queries
   * @return {Parse.Query} Returns the query, so you can chain this call.
   */

  _createClass(ParseQuery, [{
    key: '_orQuery',
    value: function _orQuery(queries) {
      var queryJSON = queries.map(function (q) {
        return q.toJSON().where;
      });

      this._where.$or = queryJSON;
      return this;
    }

    /**
     * Helper for condition queries
     */
  }, {
    key: '_addCondition',
    value: function _addCondition(key, condition, value) {
      if (!this._where[key] || typeof this._where[key] === 'string') {
        this._where[key] = {};
      }
      this._where[key][condition] = (0, _encode2['default'])(value, false, true);
      return this;
    }

    /**
     * Returns a JSON representation of this query.
     * @method toJSON
     * @return {Object} The JSON representation of the query.
     */
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var params = {
        where: this._where
      };

      if (this._include.length) {
        params.include = this._include.join(',');
      }
      if (this._select) {
        params.keys = this._select.join(',');
      }
      if (this._limit >= 0) {
        params.limit = this._limit;
      }
      if (this._skip > 0) {
        params.skip = this._skip;
      }
      if (this._order) {
        params.order = this._order.join(',');
      }
      for (var key in this._extraOptions) {
        params[key] = this._extraOptions[key];
      }

      return params;
    }

    /**
     * Constructs a Parse.Object whose id is already known by fetching data from
     * the server.  Either options.success or options.error is called when the
     * find completes.
     *
     * @method get
     * @param {String} objectId The id of the object to be fetched.
     * @param {Object} options A Backbone-style options object.
     * Valid options are:<ul>
     *   <li>success: A Backbone-style success callback
     *   <li>error: An Backbone-style error callback.
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Parse.Promise} A promise that is resolved with the result when
     * the query completes.
     */
  }, {
    key: 'get',
    value: function get(objectId, options) {
      this.equalTo('objectId', objectId);

      var firstOptions = {};
      if (options && options.hasOwnProperty('useMasterKey')) {
        firstOptions.useMasterKey = options.useMasterKey;
      }
      if (options && options.hasOwnProperty('sessionToken')) {
        firstOptions.sessionToken = options.sessionToken;
      }

      return this.first(firstOptions).then(function (response) {
        if (response) {
          return response;
        }

        var errorObject = new _ParseError2['default'](_ParseError2['default'].OBJECT_NOT_FOUND, 'Object not found.');
        return _ParsePromise2['default'].error(errorObject);
      })._thenRunCallbacks(options, null);
    }

    /**
     * Retrieves a list of ParseObjects that satisfy this query.
     * Either options.success or options.error is called when the find
     * completes.
     *
     * @method find
     * @param {Object} options A Backbone-style options object. Valid options
     * are:<ul>
     *   <li>success: Function to call when the find completes successfully.
     *   <li>error: Function to call when the find fails.
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Parse.Promise} A promise that is resolved with the results when
     * the query completes.
     */
  }, {
    key: 'find',
    value: function find(options) {
      var _this = this;

      options = options || {};

      var findOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        findOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        findOptions.sessionToken = options.sessionToken;
      }

      var controller = _CoreManager2['default'].getQueryController();

      return controller.find(this.className, this.toJSON(), findOptions).then(function (response) {
        return response.results.map(function (data) {
          // In cases of relations, the server may send back a className
          // on the top level of the payload
          var override = response.className || _this.className;
          if (!data.className) {
            data.className = override;
          }
          return _ParseObject2['default'].fromJSON(data, true);
        });
      })._thenRunCallbacks(options);
    }

    /**
     * Counts the number of objects that match this query.
     * Either options.success or options.error is called when the count
     * completes.
     *
     * @method count
     * @param {Object} options A Backbone-style options object. Valid options
     * are:<ul>
     *   <li>success: Function to call when the count completes successfully.
     *   <li>error: Function to call when the find fails.
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Parse.Promise} A promise that is resolved with the count when
     * the query completes.
     */
  }, {
    key: 'count',
    value: function count(options) {
      options = options || {};

      var findOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        findOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        findOptions.sessionToken = options.sessionToken;
      }

      var controller = _CoreManager2['default'].getQueryController();

      var params = this.toJSON();
      params.limit = 0;
      params.count = 1;

      return controller.find(this.className, params, findOptions).then(function (result) {
        return result.count;
      })._thenRunCallbacks(options);
    }

    /**
     * Retrieves at most one Parse.Object that satisfies this query.
     *
     * Either options.success or options.error is called when it completes.
     * success is passed the object if there is one. otherwise, undefined.
     *
     * @method first
     * @param {Object} options A Backbone-style options object. Valid options
     * are:<ul>
     *   <li>success: Function to call when the find completes successfully.
     *   <li>error: Function to call when the find fails.
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Parse.Promise} A promise that is resolved with the object when
     * the query completes.
     */
  }, {
    key: 'first',
    value: function first(options) {
      var _this2 = this;

      options = options || {};

      var findOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        findOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        findOptions.sessionToken = options.sessionToken;
      }

      var controller = _CoreManager2['default'].getQueryController();

      var params = this.toJSON();
      params.limit = 1;

      return controller.find(this.className, params, findOptions).then(function (response) {
        var objects = response.results;
        if (!objects[0]) {
          return undefined;
        }
        if (!objects[0].className) {
          objects[0].className = _this2.className;
        }
        return _ParseObject2['default'].fromJSON(objects[0], true);
      })._thenRunCallbacks(options);
    }

    /**
     * Iterates over each result of a query, calling a callback for each one. If
     * the callback returns a promise, the iteration will not continue until
     * that promise has been fulfilled. If the callback returns a rejected
     * promise, then iteration will stop with that error. The items are
     * processed in an unspecified order. The query may not have any sort order,
     * and may not use limit or skip.
     * @method each
     * @param {Function} callback Callback that will be called with each result
     *     of the query.
     * @param {Object} options A Backbone-style options object. Valid options
     * are:<ul>
     *   <li>success: Function to call when the iteration completes successfully.
     *   <li>error: Function to call when the iteration fails.
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @return {Parse.Promise} A promise that will be fulfilled once the
     *     iteration has completed.
     */
  }, {
    key: 'each',
    value: function each(callback, options) {
      options = options || {};

      if (this._order || this._skip || this._limit >= 0) {
        return _ParsePromise2['default'].error('Cannot iterate on a query with sort, skip, or limit.')._thenRunCallbacks(options);
      }

      var promise = new _ParsePromise2['default']();

      var query = new ParseQuery(this.className);
      // We can override the batch size from the options.
      // This is undocumented, but useful for testing.
      query._limit = options.batchSize || 100;
      query._include = this._include.map(function (i) {
        return i;
      });
      if (this._select) {
        query._select = this._select.map(function (s) {
          return s;
        });
      }

      query._where = {};
      for (var attr in this._where) {
        var val = this._where[attr];
        if (Array.isArray(val)) {
          query._where[attr] = val.map(function (v) {
            return v;
          });
        } else if (val && typeof val === 'object') {
          var conditionMap = {};
          query._where[attr] = conditionMap;
          for (var cond in val) {
            conditionMap[cond] = val[cond];
          }
        } else {
          query._where[attr] = val;
        }
      }

      query.ascending('objectId');

      var findOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        findOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        findOptions.sessionToken = options.sessionToken;
      }

      var finished = false;
      return _ParsePromise2['default']._continueWhile(function () {
        return !finished;
      }, function () {
        return query.find(findOptions).then(function (results) {
          var callbacksDone = _ParsePromise2['default'].as();
          results.forEach(function (result) {
            callbacksDone = callbacksDone.then(function () {
              return callback(result);
            });
          });

          return callbacksDone.then(function () {
            if (results.length >= query._limit) {
              query.greaterThan('objectId', results[results.length - 1].id);
            } else {
              finished = true;
            }
          });
        });
      })._thenRunCallbacks(options);
    }

    /** Query Conditions **/

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be equal to the provided value.
     * @method equalTo
     * @param {String} key The key to check.
     * @param value The value that the Parse.Object must contain.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'equalTo',
    value: function equalTo(key, value) {
      if (typeof value === 'undefined') {
        return this.doesNotExist(key);
      }

      this._where[key] = (0, _encode2['default'])(value, false, true);
      return this;
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be not equal to the provided value.
     * @method notEqualTo
     * @param {String} key The key to check.
     * @param value The value that must not be equalled.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'notEqualTo',
    value: function notEqualTo(key, value) {
      return this._addCondition(key, '$ne', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be less than the provided value.
     * @method lessThan
     * @param {String} key The key to check.
     * @param value The value that provides an upper bound.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'lessThan',
    value: function lessThan(key, value) {
      return this._addCondition(key, '$lt', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be greater than the provided value.
     * @method greaterThan
     * @param {String} key The key to check.
     * @param value The value that provides an lower bound.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'greaterThan',
    value: function greaterThan(key, value) {
      return this._addCondition(key, '$gt', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be less than or equal to the provided value.
     * @method lessThanOrEqualTo
     * @param {String} key The key to check.
     * @param value The value that provides an upper bound.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'lessThanOrEqualTo',
    value: function lessThanOrEqualTo(key, value) {
      return this._addCondition(key, '$lte', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be greater than or equal to the provided value.
     * @method greaterThanOrEqualTo
     * @param {String} key The key to check.
     * @param value The value that provides an lower bound.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'greaterThanOrEqualTo',
    value: function greaterThanOrEqualTo(key, value) {
      return this._addCondition(key, '$gte', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be contained in the provided list of values.
     * @method containedIn
     * @param {String} key The key to check.
     * @param {Array} values The values that will match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'containedIn',
    value: function containedIn(key, value) {
      return this._addCondition(key, '$in', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * not be contained in the provided list of values.
     * @method notContainedIn
     * @param {String} key The key to check.
     * @param {Array} values The values that will not match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'notContainedIn',
    value: function notContainedIn(key, value) {
      return this._addCondition(key, '$nin', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * contain each one of the provided list of values.
     * @method containsAll
     * @param {String} key The key to check.  This key's value must be an array.
     * @param {Array} values The values that will match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'containsAll',
    value: function containsAll(key, values) {
      return this._addCondition(key, '$all', values);
    }

    /**
     * Adds a constraint for finding objects that contain the given key.
     * @method exists
     * @param {String} key The key that should exist.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'exists',
    value: function exists(key) {
      return this._addCondition(key, '$exists', true);
    }

    /**
     * Adds a constraint for finding objects that do not contain a given key.
     * @method doesNotExist
     * @param {String} key The key that should not exist
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'doesNotExist',
    value: function doesNotExist(key) {
      return this._addCondition(key, '$exists', false);
    }

    /**
     * Adds a regular expression constraint for finding string values that match
     * the provided regular expression.
     * This may be slow for large datasets.
     * @method matches
     * @param {String} key The key that the string to match is stored in.
     * @param {RegExp} regex The regular expression pattern to match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'matches',
    value: function matches(key, regex, modifiers) {
      this._addCondition(key, '$regex', regex);
      if (!modifiers) {
        modifiers = '';
      }
      if (regex.ignoreCase) {
        modifiers += 'i';
      }
      if (regex.multiline) {
        modifiers += 'm';
      }
      if (modifiers.length) {
        this._addCondition(key, '$options', modifiers);
      }
      return this;
    }

    /**
     * Adds a constraint that requires that a key's value matches a Parse.Query
     * constraint.
     * @method matchesQuery
     * @param {String} key The key that the contains the object to match the
     *                     query.
     * @param {Parse.Query} query The query that should match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'matchesQuery',
    value: function matchesQuery(key, query) {
      var queryJSON = query.toJSON();
      queryJSON.className = query.className;
      return this._addCondition(key, '$inQuery', queryJSON);
    }

    /**
     * Adds a constraint that requires that a key's value not matches a
     * Parse.Query constraint.
     * @method doesNotMatchQuery
     * @param {String} key The key that the contains the object to match the
     *                     query.
     * @param {Parse.Query} query The query that should not match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'doesNotMatchQuery',
    value: function doesNotMatchQuery(key, query) {
      var queryJSON = query.toJSON();
      queryJSON.className = query.className;
      return this._addCondition(key, '$notInQuery', queryJSON);
    }

    /**
     * Adds a constraint that requires that a key's value matches a value in
     * an object returned by a different Parse.Query.
     * @method matchesKeyInQuery
     * @param {String} key The key that contains the value that is being
     *                     matched.
     * @param {String} queryKey The key in the objects returned by the query to
     *                          match against.
     * @param {Parse.Query} query The query to run.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'matchesKeyInQuery',
    value: function matchesKeyInQuery(key, queryKey, query) {
      var queryJSON = query.toJSON();
      queryJSON.className = query.className;
      return this._addCondition(key, '$select', {
        key: queryKey,
        query: queryJSON
      });
    }

    /**
     * Adds a constraint that requires that a key's value not match a value in
     * an object returned by a different Parse.Query.
     * @method doesNotMatchKeyInQuery
     * @param {String} key The key that contains the value that is being
     *                     excluded.
     * @param {String} queryKey The key in the objects returned by the query to
     *                          match against.
     * @param {Parse.Query} query The query to run.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'doesNotMatchKeyInQuery',
    value: function doesNotMatchKeyInQuery(key, queryKey, query) {
      var queryJSON = query.toJSON();
      queryJSON.className = query.className;
      return this._addCondition(key, '$dontSelect', {
        key: queryKey,
        query: queryJSON
      });
    }

    /**
     * Adds a constraint for finding string values that contain a provided
     * string.  This may be slow for large datasets.
     * @method contains
     * @param {String} key The key that the string to match is stored in.
     * @param {String} substring The substring that the value must contain.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'contains',
    value: function contains(key, value) {
      if (typeof value !== 'string') {
        throw new Error('The value being searched for must be a string.');
      }
      return this._addCondition(key, '$regex', quote(value));
    }

    /**
     * Adds a constraint for finding string values that start with a provided
     * string.  This query will use the backend index, so it will be fast even
     * for large datasets.
     * @method startsWith
     * @param {String} key The key that the string to match is stored in.
     * @param {String} prefix The substring that the value must start with.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'startsWith',
    value: function startsWith(key, value) {
      if (typeof value !== 'string') {
        throw new Error('The value being searched for must be a string.');
      }
      return this._addCondition(key, '$regex', '^' + quote(value));
    }

    /**
     * Adds a constraint for finding string values that end with a provided
     * string.  This will be slow for large datasets.
     * @method endsWith
     * @param {String} key The key that the string to match is stored in.
     * @param {String} suffix The substring that the value must end with.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'endsWith',
    value: function endsWith(key, value) {
      if (typeof value !== 'string') {
        throw new Error('The value being searched for must be a string.');
      }
      return this._addCondition(key, '$regex', quote(value) + '$');
    }

    /**
     * Adds a proximity based constraint for finding objects with key point
     * values near the point given.
     * @method near
     * @param {String} key The key that the Parse.GeoPoint is stored in.
     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'near',
    value: function near(key, point) {
      if (!(point instanceof _ParseGeoPoint2['default'])) {
        // Try to cast it as a GeoPoint
        point = new _ParseGeoPoint2['default'](point);
      }
      return this._addCondition(key, '$nearSphere', point);
    }

    /**
     * Adds a proximity based constraint for finding objects with key point
     * values near the point given and within the maximum distance given.
     * @method withinRadians
     * @param {String} key The key that the Parse.GeoPoint is stored in.
     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
     * @param {Number} maxDistance Maximum distance (in radians) of results to
     *   return.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'withinRadians',
    value: function withinRadians(key, point, distance) {
      this.near(key, point);
      return this._addCondition(key, '$maxDistance', distance);
    }

    /**
     * Adds a proximity based constraint for finding objects with key point
     * values near the point given and within the maximum distance given.
     * Radius of earth used is 3958.8 miles.
     * @method withinMiles
     * @param {String} key The key that the Parse.GeoPoint is stored in.
     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
     * @param {Number} maxDistance Maximum distance (in miles) of results to
     *     return.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'withinMiles',
    value: function withinMiles(key, point, distance) {
      return this.withinRadians(key, point, distance / 3958.8);
    }

    /**
     * Adds a proximity based constraint for finding objects with key point
     * values near the point given and within the maximum distance given.
     * Radius of earth used is 6371.0 kilometers.
     * @method withinKilometers
     * @param {String} key The key that the Parse.GeoPoint is stored in.
     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
     * @param {Number} maxDistance Maximum distance (in kilometers) of results
     *     to return.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'withinKilometers',
    value: function withinKilometers(key, point, distance) {
      return this.withinRadians(key, point, distance / 6371.0);
    }

    /**
     * Adds a constraint to the query that requires a particular key's
     * coordinates be contained within a given rectangular geographic bounding
     * box.
     * @method withinGeoBox
     * @param {String} key The key to be constrained.
     * @param {Parse.GeoPoint} southwest
     *     The lower-left inclusive corner of the box.
     * @param {Parse.GeoPoint} northeast
     *     The upper-right inclusive corner of the box.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'withinGeoBox',
    value: function withinGeoBox(key, southwest, northeast) {
      if (!(southwest instanceof _ParseGeoPoint2['default'])) {
        southwest = new _ParseGeoPoint2['default'](southwest);
      }
      if (!(northeast instanceof _ParseGeoPoint2['default'])) {
        northeast = new _ParseGeoPoint2['default'](northeast);
      }
      this._addCondition(key, '$within', { '$box': [southwest, northeast] });
      return this;
    }

    /** Query Orderings **/

    /**
     * Sorts the results in ascending order by the given key.
     *
     * @method ascending
     * @param {(String|String[]|...String} key The key to order by, which is a
     * string of comma separated values, or an Array of keys, or multiple keys.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'ascending',
    value: function ascending() {
      this._order = [];

      for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
        keys[_key] = arguments[_key];
      }

      return this.addAscending.apply(this, keys);
    }

    /**
     * Sorts the results in ascending order by the given key,
     * but can also add secondary sort descriptors without overwriting _order.
     *
     * @method addAscending
     * @param {(String|String[]|...String} key The key to order by, which is a
     * string of comma separated values, or an Array of keys, or multiple keys.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'addAscending',
    value: function addAscending() {
      var _this3 = this;

      if (!this._order) {
        this._order = [];
      }

      for (var _len2 = arguments.length, keys = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        keys[_key2] = arguments[_key2];
      }

      keys.forEach(function (key) {
        if (Array.isArray(key)) {
          key = key.join();
        }
        _this3._order = _this3._order.concat(key.replace(/\s/g, '').split(','));
      });

      return this;
    }

    /**
     * Sorts the results in descending order by the given key.
     *
     * @method descending
     * @param {(String|String[]|...String} key The key to order by, which is a
     * string of comma separated values, or an Array of keys, or multiple keys.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'descending',
    value: function descending() {
      this._order = [];

      for (var _len3 = arguments.length, keys = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        keys[_key3] = arguments[_key3];
      }

      return this.addDescending.apply(this, keys);
    }

    /**
     * Sorts the results in descending order by the given key,
     * but can also add secondary sort descriptors without overwriting _order.
     *
     * @method addDescending
     * @param {(String|String[]|...String} key The key to order by, which is a
     * string of comma separated values, or an Array of keys, or multiple keys.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'addDescending',
    value: function addDescending() {
      var _this4 = this;

      if (!this._order) {
        this._order = [];
      }

      for (var _len4 = arguments.length, keys = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        keys[_key4] = arguments[_key4];
      }

      keys.forEach(function (key) {
        if (Array.isArray(key)) {
          key = key.join();
        }
        _this4._order = _this4._order.concat(key.replace(/\s/g, '').split(',').map(function (k) {
          return '-' + k;
        }));
      });

      return this;
    }

    /** Query Options **/

    /**
     * Sets the number of results to skip before returning any results.
     * This is useful for pagination.
     * Default is to skip zero results.
     * @method skip
     * @param {Number} n the number of results to skip.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'skip',
    value: function skip(n) {
      if (typeof n !== 'number' || n < 0) {
        throw new Error('You can only skip by a positive number');
      }
      this._skip = n;
      return this;
    }

    /**
     * Sets the limit of the number of results to return. The default limit is
     * 100, with a maximum of 1000 results being returned at a time.
     * @method limit
     * @param {Number} n the number of results to limit to.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'limit',
    value: function limit(n) {
      if (typeof n !== 'number') {
        throw new Error('You can only set the limit to a numeric value');
      }
      this._limit = n;
      return this;
    }

    /**
     * Includes nested Parse.Objects for the provided key.  You can use dot
     * notation to specify which fields in the included object are also fetched.
     * @method include
     * @param {String} key The name of the key to include.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'include',
    value: function include() {
      var _this5 = this;

      for (var _len5 = arguments.length, keys = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        keys[_key5] = arguments[_key5];
      }

      keys.forEach(function (key) {
        if (Array.isArray(key)) {
          _this5._include = _this5._include.concat(key);
        } else {
          _this5._include.push(key);
        }
      });
      return this;
    }

    /**
     * Restricts the fields of the returned Parse.Objects to include only the
     * provided keys.  If this is called multiple times, then all of the keys
     * specified in each of the calls will be included.
     * @method select
     * @param {Array} keys The names of the keys to include.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */
  }, {
    key: 'select',
    value: function select() {
      var _this6 = this;

      if (!this._select) {
        this._select = [];
      }

      for (var _len6 = arguments.length, keys = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        keys[_key6] = arguments[_key6];
      }

      keys.forEach(function (key) {
        if (Array.isArray(key)) {
          _this6._select = _this6._select.concat(key);
        } else {
          _this6._select.push(key);
        }
      });
      return this;
    }

    /**
     * Subscribe this query to get liveQuery updates
     * @method subscribe
     * @return {LiveQuerySubscription} Returns the liveQuerySubscription, it's an event emitter
     * which can be used to get liveQuery updates.
     */
  }, {
    key: 'subscribe',
    value: function subscribe() {
      var controller = _CoreManager2['default'].getLiveQueryController();
      return controller.subscribe(this);
    }

    /**
     * Constructs a Parse.Query that is the OR of the passed in queries.  For
     * example:
     * <pre>var compoundQuery = Parse.Query.or(query1, query2, query3);</pre>
     *
     * will create a compoundQuery that is an or of the query1, query2, and
     * query3.
     * @method or
     * @param {...Parse.Query} var_args The list of queries to OR.
     * @static
     * @return {Parse.Query} The query that is the OR of the passed in queries.
     */
  }], [{
    key: 'or',
    value: function or() {
      var className = null;

      for (var _len7 = arguments.length, queries = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        queries[_key7] = arguments[_key7];
      }

      queries.forEach(function (q) {
        if (!className) {
          className = q.className;
        }

        if (className !== q.className) {
          throw new Error('All queries must be for the same class.');
        }
      });

      var query = new ParseQuery(className);
      query._orQuery(queries);
      return query;
    }
  }]);

  return ParseQuery;
})();

exports['default'] = ParseQuery;

_CoreManager2['default'].setQueryController({
  find: function find(className, params, options) {
    var RESTController = _CoreManager2['default'].getRESTController();

    return RESTController.request('GET', 'classes/' + className, params, options);
  }
});
module.exports = exports['default'];
},{"./CoreManager":3,"./ParseError":13,"./ParseGeoPoint":15,"./ParseObject":18,"./ParsePromise":20,"./encode":36,"babel-runtime/helpers/class-call-check":52,"babel-runtime/helpers/create-class":53,"babel-runtime/helpers/interop-require-default":56}],22:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _createClass = _dereq_('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = _dereq_('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ParseOp = _dereq_('./ParseOp');

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParseQuery = _dereq_('./ParseQuery');

var _ParseQuery2 = _interopRequireDefault(_ParseQuery);

/**
 * Creates a new Relation for the given parent object and key. This
 * constructor should rarely be used directly, but rather created by
 * Parse.Object.relation.
 * @class Parse.Relation
 * @constructor
 * @param {Parse.Object} parent The parent of this relation.
 * @param {String} key The key for this relation on the parent.
 *
 * <p>
 * A class that is used to access all of the children of a many-to-many
 * relationship.  Each instance of Parse.Relation is associated with a
 * particular parent object and key.
 * </p>
 */

var ParseRelation = (function () {
  function ParseRelation(parent, key) {
    _classCallCheck(this, ParseRelation);

    this.parent = parent;
    this.key = key;
    this.targetClassName = null;
  }

  /**
   * Makes sure that this relation has the right parent and key.
   */

  _createClass(ParseRelation, [{
    key: '_ensureParentAndKey',
    value: function _ensureParentAndKey(parent, key) {
      this.key = this.key || key;
      if (this.key !== key) {
        throw new Error('Internal Error. Relation retrieved from two different keys.');
      }
      if (this.parent) {
        if (this.parent.className !== parent.className) {
          throw new Error('Internal Error. Relation retrieved from two different Objects.');
        }
        if (this.parent.id) {
          if (this.parent.id !== parent.id) {
            throw new Error('Internal Error. Relation retrieved from two different Objects.');
          }
        } else if (parent.id) {
          this.parent = parent;
        }
      } else {
        this.parent = parent;
      }
    }

    /**
     * Adds a Parse.Object or an array of Parse.Objects to the relation.
     * @method add
     * @param {} objects The item or items to add.
     */
  }, {
    key: 'add',
    value: function add(objects) {
      if (!Array.isArray(objects)) {
        objects = [objects];
      }

      var change = new _ParseOp.RelationOp(objects, []);
      var parent = this.parent;
      if (!parent) {
        throw new Error('Cannot add to a Relation without a parent');
      }
      parent.set(this.key, change);
      this.targetClassName = change._targetClassName;
      return parent;
    }

    /**
     * Removes a Parse.Object or an array of Parse.Objects from this relation.
     * @method remove
     * @param {} objects The item or items to remove.
     */
  }, {
    key: 'remove',
    value: function remove(objects) {
      if (!Array.isArray(objects)) {
        objects = [objects];
      }

      var change = new _ParseOp.RelationOp([], objects);
      if (!this.parent) {
        throw new Error('Cannot remove from a Relation without a parent');
      }
      this.parent.set(this.key, change);
      this.targetClassName = change._targetClassName;
    }

    /**
     * Returns a JSON version of the object suitable for saving to disk.
     * @method toJSON
     * @return {Object}
     */
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return {
        __type: 'Relation',
        className: this.targetClassName
      };
    }

    /**
     * Returns a Parse.Query that is limited to objects in this
     * relation.
     * @method query
     * @return {Parse.Query}
     */
  }, {
    key: 'query',
    value: function query() {
      var query;
      var parent = this.parent;
      if (!parent) {
        throw new Error('Cannot construct a query for a Relation without a parent');
      }
      if (!this.targetClassName) {
        query = new _ParseQuery2['default'](parent.className);
        query._extraOptions.redirectClassNameForKey = this.key;
      } else {
        query = new _ParseQuery2['default'](this.targetClassName);
      }
      query._addCondition('$relatedTo', 'object', {
        __type: 'Pointer',
        className: parent.className,
        objectId: parent.id
      });
      query._addCondition('$relatedTo', 'key', this.key);

      return query;
    }
  }]);

  return ParseRelation;
})();

exports['default'] = ParseRelation;
module.exports = exports['default'];
},{"./ParseObject":18,"./ParseOp":19,"./ParseQuery":21,"babel-runtime/helpers/class-call-check":52,"babel-runtime/helpers/create-class":53,"babel-runtime/helpers/interop-require-default":56}],23:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

/**
 * Represents a Role on the Parse server. Roles represent groupings of
 * Users for the purposes of granting permissions (e.g. specifying an ACL
 * for an Object). Roles are specified by their sets of child users and
 * child roles, all of which are granted any permissions that the parent
 * role has.
 *
 * <p>Roles must have a name (which cannot be changed after creation of the
 * role), and must specify an ACL.</p>
 * @class Parse.Role
 * @constructor
 * @param {String} name The name of the Role to create.
 * @param {Parse.ACL} acl The ACL for this role. Roles must have an ACL.
 * A Parse.Role is a local representation of a role persisted to the Parse
 * cloud.
 */
'use strict';

var _get = _dereq_('babel-runtime/helpers/get')['default'];

var _inherits = _dereq_('babel-runtime/helpers/inherits')['default'];

var _createClass = _dereq_('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = _dereq_('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ParseACL = _dereq_('./ParseACL');

var _ParseACL2 = _interopRequireDefault(_ParseACL);

var _ParseError = _dereq_('./ParseError');

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParseObject2 = _dereq_('./ParseObject');

var _ParseObject3 = _interopRequireDefault(_ParseObject2);

var ParseRole = (function (_ParseObject) {
  _inherits(ParseRole, _ParseObject);

  function ParseRole(name, acl) {
    _classCallCheck(this, ParseRole);

    _get(Object.getPrototypeOf(ParseRole.prototype), 'constructor', this).call(this, '_Role');
    if (typeof name === 'string' && acl instanceof _ParseACL2['default']) {
      this.setName(name);
      this.setACL(acl);
    }
  }

  /**
   * Gets the name of the role.  You can alternatively call role.get("name")
   *
   * @method getName
   * @return {String} the name of the role.
   */

  _createClass(ParseRole, [{
    key: 'getName',
    value: function getName() {
      var name = this.get('name');
      if (name == null || typeof name === 'string') {
        return name;
      }
      return '';
    }

    /**
     * Sets the name for a role. This value must be set before the role has
     * been saved to the server, and cannot be set once the role has been
     * saved.
     *
     * <p>
     *   A role's name can only contain alphanumeric characters, _, -, and
     *   spaces.
     * </p>
     *
     * <p>This is equivalent to calling role.set("name", name)</p>
     *
     * @method setName
     * @param {String} name The name of the role.
     * @param {Object} options Standard options object with success and error
     *     callbacks.
     */
  }, {
    key: 'setName',
    value: function setName(name, options) {
      return this.set('name', name, options);
    }

    /**
     * Gets the Parse.Relation for the Parse.Users that are direct
     * children of this role. These users are granted any privileges that this
     * role has been granted (e.g. read or write access through ACLs). You can
     * add or remove users from the role through this relation.
     *
     * <p>This is equivalent to calling role.relation("users")</p>
     *
     * @method getUsers
     * @return {Parse.Relation} the relation for the users belonging to this
     *     role.
     */
  }, {
    key: 'getUsers',
    value: function getUsers() {
      return this.relation('users');
    }

    /**
     * Gets the Parse.Relation for the Parse.Roles that are direct
     * children of this role. These roles' users are granted any privileges that
     * this role has been granted (e.g. read or write access through ACLs). You
     * can add or remove child roles from this role through this relation.
     *
     * <p>This is equivalent to calling role.relation("roles")</p>
     *
     * @method getRoles
     * @return {Parse.Relation} the relation for the roles belonging to this
     *     role.
     */
  }, {
    key: 'getRoles',
    value: function getRoles() {
      return this.relation('roles');
    }
  }, {
    key: 'validate',
    value: function validate(attrs, options) {
      var isInvalid = _get(Object.getPrototypeOf(ParseRole.prototype), 'validate', this).call(this, attrs, options);
      if (isInvalid) {
        return isInvalid;
      }

      if ('name' in attrs && attrs.name !== this.getName()) {
        var newName = attrs.name;
        if (this.id && this.id !== attrs.objectId) {
          // Check to see if the objectId being set matches this.id
          // This happens during a fetch -- the id is set before calling fetch
          // Let the name be set in this case
          return new _ParseError2['default'](_ParseError2['default'].OTHER_CAUSE, 'A role\'s name can only be set before it has been saved.');
        }
        if (typeof newName !== 'string') {
          return new _ParseError2['default'](_ParseError2['default'].OTHER_CAUSE, 'A role\'s name must be a String.');
        }
        if (!/^[0-9a-zA-Z\-_ ]+$/.test(newName)) {
          return new _ParseError2['default'](_ParseError2['default'].OTHER_CAUSE, 'A role\'s name can be only contain alphanumeric characters, _, ' + '-, and spaces.');
        }
      }
      return false;
    }
  }]);

  return ParseRole;
})(_ParseObject3['default']);

exports['default'] = ParseRole;

_ParseObject3['default'].registerSubclass('_Role', ParseRole);
module.exports = exports['default'];
},{"./ParseACL":11,"./ParseError":13,"./ParseObject":18,"babel-runtime/helpers/class-call-check":52,"babel-runtime/helpers/create-class":53,"babel-runtime/helpers/get":54,"babel-runtime/helpers/inherits":55,"babel-runtime/helpers/interop-require-default":56}],24:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

/**
 * @class Parse.Session
 * @constructor
 *
 * <p>A Parse.Session object is a local representation of a revocable session.
 * This class is a subclass of a Parse.Object, and retains the same
 * functionality of a Parse.Object.</p>
 */
'use strict';

var _get = _dereq_('babel-runtime/helpers/get')['default'];

var _inherits = _dereq_('babel-runtime/helpers/inherits')['default'];

var _createClass = _dereq_('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = _dereq_('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _isRevocableSession = _dereq_('./isRevocableSession');

var _isRevocableSession2 = _interopRequireDefault(_isRevocableSession);

var _ParseObject2 = _dereq_('./ParseObject');

var _ParseObject3 = _interopRequireDefault(_ParseObject2);

var _ParsePromise = _dereq_('./ParsePromise');

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

var _ParseUser = _dereq_('./ParseUser');

var _ParseUser2 = _interopRequireDefault(_ParseUser);

var ParseSession = (function (_ParseObject) {
  _inherits(ParseSession, _ParseObject);

  function ParseSession(attributes) {
    _classCallCheck(this, ParseSession);

    _get(Object.getPrototypeOf(ParseSession.prototype), 'constructor', this).call(this, '_Session');
    if (attributes && typeof attributes === 'object') {
      if (!this.set(attributes || {})) {
        throw new Error('Can\'t create an invalid Session');
      }
    }
  }

  /**
   * Returns the session token string.
   * @method getSessionToken
   * @return {String}
   */

  _createClass(ParseSession, [{
    key: 'getSessionToken',
    value: function getSessionToken() {
      var token = this.get('sessionToken');
      if (typeof token === 'string') {
        return token;
      }
      return '';
    }
  }], [{
    key: 'readOnlyAttributes',
    value: function readOnlyAttributes() {
      return ['createdWith', 'expiresAt', 'installationId', 'restricted', 'sessionToken', 'user'];
    }

    /**
     * Retrieves the Session object for the currently logged in session.
     * @method current
     * @static
     * @return {Parse.Promise} A promise that is resolved with the Parse.Session
     *   object after it has been fetched. If there is no current user, the
     *   promise will be rejected.
     */
  }, {
    key: 'current',
    value: function current(options) {
      options = options || {};
      var controller = _CoreManager2['default'].getSessionController();

      var sessionOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        sessionOptions.useMasterKey = options.useMasterKey;
      }
      return _ParseUser2['default'].currentAsync().then(function (user) {
        if (!user) {
          return _ParsePromise2['default'].error('There is no current user.');
        }
        var token = user.getSessionToken();
        sessionOptions.sessionToken = user.getSessionToken();
        return controller.getSession(sessionOptions);
      });
    }

    /**
     * Determines whether the current session token is revocable.
     * This method is useful for migrating Express.js or Node.js web apps to
     * use revocable sessions. If you are migrating an app that uses the Parse
     * SDK in the browser only, please use Parse.User.enableRevocableSession()
     * instead, so that sessions can be automatically upgraded.
     * @method isCurrentSessionRevocable
     * @static
     * @return {Boolean}
     */
  }, {
    key: 'isCurrentSessionRevocable',
    value: function isCurrentSessionRevocable() {
      var currentUser = _ParseUser2['default'].current();
      if (currentUser) {
        return (0, _isRevocableSession2['default'])(currentUser.getSessionToken() || '');
      }
      return false;
    }
  }]);

  return ParseSession;
})(_ParseObject3['default']);

exports['default'] = ParseSession;

_ParseObject3['default'].registerSubclass('_Session', ParseSession);

_CoreManager2['default'].setSessionController({
  getSession: function getSession(options) {
    var RESTController = _CoreManager2['default'].getRESTController();
    var session = new ParseSession();

    return RESTController.request('GET', 'sessions/me', {}, options).then(function (sessionData) {
      session._finishFetch(sessionData);
      session._setExisted(true);
      return session;
    });
  }
});
module.exports = exports['default'];
},{"./CoreManager":3,"./ParseObject":18,"./ParsePromise":20,"./ParseUser":25,"./isRevocableSession":39,"babel-runtime/helpers/class-call-check":52,"babel-runtime/helpers/create-class":53,"babel-runtime/helpers/get":54,"babel-runtime/helpers/inherits":55,"babel-runtime/helpers/interop-require-default":56}],25:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _get = _dereq_('babel-runtime/helpers/get')['default'];

var _inherits = _dereq_('babel-runtime/helpers/inherits')['default'];

var _createClass = _dereq_('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = _dereq_('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = _dereq_('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _isRevocableSession = _dereq_('./isRevocableSession');

var _isRevocableSession2 = _interopRequireDefault(_isRevocableSession);

var _ParseError = _dereq_('./ParseError');

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParseObject2 = _dereq_('./ParseObject');

var _ParseObject3 = _interopRequireDefault(_ParseObject2);

var _ParsePromise = _dereq_('./ParsePromise');

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

var _ParseSession = _dereq_('./ParseSession');

var _ParseSession2 = _interopRequireDefault(_ParseSession);

var _Storage = _dereq_('./Storage');

var _Storage2 = _interopRequireDefault(_Storage);

var CURRENT_USER_KEY = 'currentUser';
var canUseCurrentUser = !_CoreManager2['default'].get('IS_NODE');
var currentUserCacheMatchesDisk = false;
var currentUserCache = null;

var authProviders = {};

/**
 * @class Parse.User
 * @constructor
 *
 * <p>A Parse.User object is a local representation of a user persisted to the
 * Parse cloud. This class is a subclass of a Parse.Object, and retains the
 * same functionality of a Parse.Object, but also extends it with various
 * user specific methods, like authentication, signing up, and validation of
 * uniqueness.</p>
 */

var ParseUser = (function (_ParseObject) {
  _inherits(ParseUser, _ParseObject);

  function ParseUser(attributes) {
    _classCallCheck(this, ParseUser);

    _get(Object.getPrototypeOf(ParseUser.prototype), 'constructor', this).call(this, '_User');
    if (attributes && typeof attributes === 'object') {
      if (!this.set(attributes || {})) {
        throw new Error('Can\'t create an invalid Parse User');
      }
    }
  }

  /**
   * Request a revocable session token to replace the older style of token.
   * @method _upgradeToRevocableSession
   * @param {Object} options A Backbone-style options object.
   * @return {Parse.Promise} A promise that is resolved when the replacement
   *   token has been fetched.
   */

  _createClass(ParseUser, [{
    key: '_upgradeToRevocableSession',
    value: function _upgradeToRevocableSession(options) {
      options = options || {};

      var upgradeOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        upgradeOptions.useMasterKey = options.useMasterKey;
      }

      var controller = _CoreManager2['default'].getUserController();
      return controller.upgradeToRevocableSession(this, upgradeOptions)._thenRunCallbacks(options);
    }

    /**
     * Unlike in the Android/iOS SDKs, logInWith is unnecessary, since you can
     * call linkWith on the user (even if it doesn't exist yet on the server).
     * @method _linkWith
     */
  }, {
    key: '_linkWith',
    value: function _linkWith(provider, options) {
      var _this = this;

      var authType;
      if (typeof provider === 'string') {
        authType = provider;
        provider = authProviders[provider];
      } else {
        authType = provider.getAuthType();
      }
      if (options && options.hasOwnProperty('authData')) {
        var authData = this.get('authData') || {};
        if (typeof authData !== 'object') {
          throw new Error('Invalid type: authData field should be an object');
        }
        authData[authType] = options.authData;

        var controller = _CoreManager2['default'].getUserController();
        return controller.linkWith(this, authData)._thenRunCallbacks(options, this);
      } else {
        var promise = new _ParsePromise2['default']();
        provider.authenticate({
          success: function success(provider, result) {
            var opts = {};
            opts.authData = result;
            if (options.success) {
              opts.success = options.success;
            }
            if (options.error) {
              opts.error = options.error;
            }
            _this._linkWith(provider, opts).then(function () {
              promise.resolve(_this);
            }, function (error) {
              promise.reject(error);
            });
          },
          error: function error(provider, _error) {
            if (options.error) {
              options.error(_this, _error);
            }
            promise.reject(_error);
          }
        });
        return promise;
      }
    }

    /**
     * Synchronizes auth data for a provider (e.g. puts the access token in the
     * right place to be used by the Facebook SDK).
     * @method _synchronizeAuthData
     */
  }, {
    key: '_synchronizeAuthData',
    value: function _synchronizeAuthData(provider) {
      if (!this.isCurrent() || !provider) {
        return;
      }
      var authType;
      if (typeof provider === 'string') {
        authType = provider;
        provider = authProviders[authType];
      } else {
        authType = provider.getAuthType();
      }
      var authData = this.get('authData');
      if (!provider || !authData || typeof authData !== 'object') {
        return;
      }
      var success = provider.restoreAuthentication(authData[authType]);
      if (!success) {
        this._unlinkFrom(provider);
      }
    }

    /**
     * Synchronizes authData for all providers.
     * @method _synchronizeAllAuthData
     */
  }, {
    key: '_synchronizeAllAuthData',
    value: function _synchronizeAllAuthData() {
      var authData = this.get('authData');
      if (typeof authData !== 'object') {
        return;
      }

      for (var key in authData) {
        this._synchronizeAuthData(key);
      }
    }

    /**
     * Removes null values from authData (which exist temporarily for
     * unlinking)
     * @method _cleanupAuthData
     */
  }, {
    key: '_cleanupAuthData',
    value: function _cleanupAuthData() {
      if (!this.isCurrent()) {
        return;
      }
      var authData = this.get('authData');
      if (typeof authData !== 'object') {
        return;
      }

      for (var key in authData) {
        if (!authData[key]) {
          delete authData[key];
        }
      }
    }

    /**
     * Unlinks a user from a service.
     * @method _unlinkFrom
     */
  }, {
    key: '_unlinkFrom',
    value: function _unlinkFrom(provider, options) {
      var _this2 = this;

      var authType;
      if (typeof provider === 'string') {
        authType = provider;
        provider = authProviders[provider];
      } else {
        authType = provider.getAuthType();
      }
      return this._linkWith(provider, { authData: null }).then(function () {
        _this2._synchronizeAuthData(provider);
        return _ParsePromise2['default'].as(_this2);
      })._thenRunCallbacks(options);
    }

    /**
     * Checks whether a user is linked to a service.
     * @method _isLinked
     */
  }, {
    key: '_isLinked',
    value: function _isLinked(provider) {
      var authType;
      if (typeof provider === 'string') {
        authType = provider;
      } else {
        authType = provider.getAuthType();
      }
      var authData = this.get('authData') || {};
      if (typeof authData !== 'object') {
        return false;
      }
      return !!authData[authType];
    }

    /**
     * Deauthenticates all providers.
     * @method _logOutWithAll
     */
  }, {
    key: '_logOutWithAll',
    value: function _logOutWithAll() {
      var authData = this.get('authData');
      if (typeof authData !== 'object') {
        return;
      }

      for (var key in authData) {
        this._logOutWith(key);
      }
    }

    /**
     * Deauthenticates a single provider (e.g. removing access tokens from the
     * Facebook SDK).
     * @method _logOutWith
     */
  }, {
    key: '_logOutWith',
    value: function _logOutWith(provider) {
      if (!this.isCurrent()) {
        return;
      }
      if (typeof provider === 'string') {
        provider = authProviders[provider];
      }
      if (provider && provider.deauthenticate) {
        provider.deauthenticate();
      }
    }

    /**
     * Class instance method used to maintain specific keys when a fetch occurs.
     * Used to ensure that the session token is not lost.
     */
  }, {
    key: '_preserveFieldsOnFetch',
    value: function _preserveFieldsOnFetch() {
      return {
        sessionToken: this.get('sessionToken')
      };
    }

    /**
     * Returns true if <code>current</code> would return this user.
     * @method isCurrent
     * @return {Boolean}
     */
  }, {
    key: 'isCurrent',
    value: function isCurrent() {
      var current = ParseUser.current();
      return !!current && current.id === this.id;
    }

    /**
     * Returns get("username").
     * @method getUsername
     * @return {String}
     */
  }, {
    key: 'getUsername',
    value: function getUsername() {
      var username = this.get('username');
      if (username == null || typeof username === 'string') {
        return username;
      }
      return '';
    }

    /**
     * Calls set("username", username, options) and returns the result.
     * @method setUsername
     * @param {String} username
     * @param {Object} options A Backbone-style options object.
     * @return {Boolean}
     */
  }, {
    key: 'setUsername',
    value: function setUsername(username) {
      // Strip anonymity, even we do not support anonymous user in js SDK, we may
      // encounter anonymous user created by android/iOS in cloud code.
      var authData = this.get('authData');
      if (authData && typeof authData === 'object' && authData.hasOwnProperty('anonymous')) {
        // We need to set anonymous to null instead of deleting it in order to remove it from Parse.
        authData.anonymous = null;
      }
      this.set('username', username);
    }

    /**
     * Calls set("password", password, options) and returns the result.
     * @method setPassword
     * @param {String} password
     * @param {Object} options A Backbone-style options object.
     * @return {Boolean}
     */
  }, {
    key: 'setPassword',
    value: function setPassword(password) {
      this.set('password', password);
    }

    /**
     * Returns get("email").
     * @method getEmail
     * @return {String}
     */
  }, {
    key: 'getEmail',
    value: function getEmail() {
      var email = this.get('email');
      if (email == null || typeof email === 'string') {
        return email;
      }
      return '';
    }

    /**
     * Calls set("email", email, options) and returns the result.
     * @method setEmail
     * @param {String} email
     * @param {Object} options A Backbone-style options object.
     * @return {Boolean}
     */
  }, {
    key: 'setEmail',
    value: function setEmail(email) {
      this.set('email', email);
    }

    /**
     * Returns the session token for this user, if the user has been logged in,
     * or if it is the result of a query with the master key. Otherwise, returns
     * undefined.
     * @method getSessionToken
     * @return {String} the session token, or undefined
     */
  }, {
    key: 'getSessionToken',
    value: function getSessionToken() {
      var token = this.get('sessionToken');
      if (token == null || typeof token === 'string') {
        return token;
      }
      return '';
    }

    /**
     * Checks whether this user is the current user and has been authenticated.
     * @method authenticated
     * @return (Boolean) whether this user is the current user and is logged in.
     */
  }, {
    key: 'authenticated',
    value: function authenticated() {
      var current = ParseUser.current();
      return !!this.get('sessionToken') && !!current && current.id === this.id;
    }

    /**
     * Signs up a new user. You should call this instead of save for
     * new Parse.Users. This will create a new Parse.User on the server, and
     * also persist the session on disk so that you can access the user using
     * <code>current</code>.
     *
     * <p>A username and password must be set before calling signUp.</p>
     *
     * <p>Calls options.success or options.error on completion.</p>
     *
     * @method signUp
     * @param {Object} attrs Extra fields to set on the new user, or null.
     * @param {Object} options A Backbone-style options object.
     * @return {Parse.Promise} A promise that is fulfilled when the signup
     *     finishes.
     */
  }, {
    key: 'signUp',
    value: function signUp(attrs, options) {
      options = options || {};

      var signupOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        signupOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('installationId')) {
        signupOptions.installationId = options.installationId;
      }

      var controller = _CoreManager2['default'].getUserController();
      return controller.signUp(this, attrs, signupOptions)._thenRunCallbacks(options, this);
    }

    /**
     * Logs in a Parse.User. On success, this saves the session to disk,
     * so you can retrieve the currently logged in user using
     * <code>current</code>.
     *
     * <p>A username and password must be set before calling logIn.</p>
     *
     * <p>Calls options.success or options.error on completion.</p>
     *
     * @method logIn
     * @param {Object} options A Backbone-style options object.
     * @return {Parse.Promise} A promise that is fulfilled with the user when
     *     the login is complete.
     */
  }, {
    key: 'logIn',
    value: function logIn(options) {
      options = options || {};

      var loginOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        loginOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('installationId')) {
        loginOptions.installationId = options.installationId;
      }

      var controller = _CoreManager2['default'].getUserController();
      return controller.logIn(this, loginOptions)._thenRunCallbacks(options, this);
    }

    /**
     * Wrap the default save behavior with functionality to save to local
     * storage if this is current user.
     */
  }, {
    key: 'save',
    value: function save() {
      var _this3 = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _get(Object.getPrototypeOf(ParseUser.prototype), 'save', this).apply(this, args).then(function () {
        if (_this3.isCurrent()) {
          return _CoreManager2['default'].getUserController().updateUserOnDisk(_this3);
        }
        return _this3;
      });
    }

    /**
     * Wrap the default destroy behavior with functionality that logs out
     * the current user when it is destroyed
     */
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this4 = this;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _get(Object.getPrototypeOf(ParseUser.prototype), 'destroy', this).apply(this, args).then(function () {
        if (_this4.isCurrent()) {
          return _CoreManager2['default'].getUserController().removeUserFromDisk();
        }
        return _this4;
      });
    }

    /**
     * Wrap the default fetch behavior with functionality to save to local
     * storage if this is current user.
     */
  }, {
    key: 'fetch',
    value: function fetch() {
      var _this5 = this;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _get(Object.getPrototypeOf(ParseUser.prototype), 'fetch', this).apply(this, args).then(function () {
        if (_this5.isCurrent()) {
          return _CoreManager2['default'].getUserController().updateUserOnDisk(_this5);
        }
        return _this5;
      });
    }
  }], [{
    key: 'readOnlyAttributes',
    value: function readOnlyAttributes() {
      return ['sessionToken'];
    }

    /**
     * Adds functionality to the existing Parse.User class
     * @method extend
     * @param {Object} protoProps A set of properties to add to the prototype
     * @param {Object} classProps A set of static properties to add to the class
     * @static
     * @return {Class} The newly extended Parse.User class
     */
  }, {
    key: 'extend',
    value: function extend(protoProps, classProps) {
      if (protoProps) {
        for (var prop in protoProps) {
          if (prop !== 'className') {
            _Object$defineProperty(ParseUser.prototype, prop, {
              value: protoProps[prop],
              enumerable: false,
              writable: true,
              configurable: true
            });
          }
        }
      }

      if (classProps) {
        for (var prop in classProps) {
          if (prop !== 'className') {
            _Object$defineProperty(ParseUser, prop, {
              value: classProps[prop],
              enumerable: false,
              writable: true,
              configurable: true
            });
          }
        }
      }

      return ParseUser;
    }

    /**
     * Retrieves the currently logged in ParseUser with a valid session,
     * either from memory or localStorage, if necessary.
     * @method current
     * @static
     * @return {Parse.Object} The currently logged in Parse.User.
     */
  }, {
    key: 'current',
    value: function current() {
      if (!canUseCurrentUser) {
        return null;
      }
      var controller = _CoreManager2['default'].getUserController();
      return controller.currentUser();
    }

    /**
     * Retrieves the currently logged in ParseUser from asynchronous Storage.
     * @method currentAsync
     * @static
     * @return {Parse.Promise} A Promise that is resolved with the currently
     *   logged in Parse User
     */
  }, {
    key: 'currentAsync',
    value: function currentAsync() {
      if (!canUseCurrentUser) {
        return _ParsePromise2['default'].as(null);
      }
      var controller = _CoreManager2['default'].getUserController();
      return controller.currentUserAsync();
    }

    /**
     * Signs up a new user with a username (or email) and password.
     * This will create a new Parse.User on the server, and also persist the
     * session in localStorage so that you can access the user using
     * {@link #current}.
     *
     * <p>Calls options.success or options.error on completion.</p>
     *
     * @method signUp
     * @param {String} username The username (or email) to sign up with.
     * @param {String} password The password to sign up with.
     * @param {Object} attrs Extra fields to set on the new user.
     * @param {Object} options A Backbone-style options object.
     * @static
     * @return {Parse.Promise} A promise that is fulfilled with the user when
     *     the signup completes.
     */
  }, {
    key: 'signUp',
    value: function signUp(username, password, attrs, options) {
      attrs = attrs || {};
      attrs.username = username;
      attrs.password = password;
      var user = new ParseUser(attrs);
      return user.signUp({}, options);
    }

    /**
     * Logs in a user with a username (or email) and password. On success, this
     * saves the session to disk, so you can retrieve the currently logged in
     * user using <code>current</code>.
     *
     * <p>Calls options.success or options.error on completion.</p>
     *
     * @method logIn
     * @param {String} username The username (or email) to log in with.
     * @param {String} password The password to log in with.
     * @param {Object} options A Backbone-style options object.
     * @static
     * @return {Parse.Promise} A promise that is fulfilled with the user when
     *     the login completes.
     */
  }, {
    key: 'logIn',
    value: function logIn(username, password, options) {
      if (typeof username !== 'string') {
        return _ParsePromise2['default'].error(new _ParseError2['default'](_ParseError2['default'].OTHER_CAUSE, 'Username must be a string.'));
      } else if (typeof password !== 'string') {
        return _ParsePromise2['default'].error(new _ParseError2['default'](_ParseError2['default'].OTHER_CAUSE, 'Password must be a string.'));
      }
      var user = new ParseUser();
      user._finishFetch({ username: username, password: password });
      return user.logIn(options);
    }

    /**
     * Logs in a user with a session token. On success, this saves the session
     * to disk, so you can retrieve the currently logged in user using
     * <code>current</code>.
     *
     * <p>Calls options.success or options.error on completion.</p>
     *
     * @method become
     * @param {String} sessionToken The sessionToken to log in with.
     * @param {Object} options A Backbone-style options object.
     * @static
     * @return {Parse.Promise} A promise that is fulfilled with the user when
     *     the login completes.
     */
  }, {
    key: 'become',
    value: function become(sessionToken, options) {
      if (!canUseCurrentUser) {
        throw new Error('It is not memory-safe to become a user in a server environment');
      }
      options = options || {};

      var becomeOptions = {
        sessionToken: sessionToken
      };
      if (options.hasOwnProperty('useMasterKey')) {
        becomeOptions.useMasterKey = options.useMasterKey;
      }

      var controller = _CoreManager2['default'].getUserController();
      return controller.become(becomeOptions)._thenRunCallbacks(options);
    }
  }, {
    key: 'logInWith',
    value: function logInWith(provider, options) {
      return ParseUser._logInWith(provider, options);
    }

    /**
     * Logs out the currently logged in user session. This will remove the
     * session from disk, log out of linked services, and future calls to
     * <code>current</code> will return <code>null</code>.
     * @method logOut
     * @static
     * @return {Parse.Promise} A promise that is resolved when the session is
     *   destroyed on the server.
     */
  }, {
    key: 'logOut',
    value: function logOut() {
      if (!canUseCurrentUser) {
        throw new Error('There is no current user user on a node.js server environment.');
      }

      var controller = _CoreManager2['default'].getUserController();
      return controller.logOut();
    }

    /**
     * Requests a password reset email to be sent to the specified email address
     * associated with the user account. This email allows the user to securely
     * reset their password on the Parse site.
     *
     * <p>Calls options.success or options.error on completion.</p>
     *
     * @method requestPasswordReset
     * @param {String} email The email address associated with the user that
     *     forgot their password.
     * @param {Object} options A Backbone-style options object.
     * @static
     */
  }, {
    key: 'requestPasswordReset',
    value: function requestPasswordReset(email, options) {
      options = options || {};

      var requestOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        requestOptions.useMasterKey = options.useMasterKey;
      }

      var controller = _CoreManager2['default'].getUserController();
      return controller.requestPasswordReset(email, requestOptions)._thenRunCallbacks(options);
    }

    /**
     * Allow someone to define a custom User class without className
     * being rewritten to _User. The default behavior is to rewrite
     * User to _User for legacy reasons. This allows developers to
     * override that behavior.
     *
     * @method allowCustomUserClass
     * @param {Boolean} isAllowed Whether or not to allow custom User class
     * @static
     */
  }, {
    key: 'allowCustomUserClass',
    value: function allowCustomUserClass(isAllowed) {
      _CoreManager2['default'].set('PERFORM_USER_REWRITE', !isAllowed);
    }

    /**
     * Allows a legacy application to start using revocable sessions. If the
     * current session token is not revocable, a request will be made for a new,
     * revocable session.
     * It is not necessary to call this method from cloud code unless you are
     * handling user signup or login from the server side. In a cloud code call,
     * this function will not attempt to upgrade the current token.
     * @method enableRevocableSession
     * @param {Object} options A Backbone-style options object.
     * @static
     * @return {Parse.Promise} A promise that is resolved when the process has
     *   completed. If a replacement session token is requested, the promise
     *   will be resolved after a new token has been fetched.
     */
  }, {
    key: 'enableRevocableSession',
    value: function enableRevocableSession(options) {
      options = options || {};
      _CoreManager2['default'].set('FORCE_REVOCABLE_SESSION', true);
      if (canUseCurrentUser) {
        var current = ParseUser.current();
        if (current) {
          return current._upgradeToRevocableSession(options);
        }
      }
      return _ParsePromise2['default'].as()._thenRunCallbacks(options);
    }

    /**
     * Enables the use of become or the current user in a server
     * environment. These features are disabled by default, since they depend on
     * global objects that are not memory-safe for most servers.
     * @method enableUnsafeCurrentUser
     * @static
     */
  }, {
    key: 'enableUnsafeCurrentUser',
    value: function enableUnsafeCurrentUser() {
      canUseCurrentUser = true;
    }

    /**
     * Disables the use of become or the current user in any environment.
     * These features are disabled on servers by default, since they depend on
     * global objects that are not memory-safe for most servers.
     * @method disableUnsafeCurrentUser
     * @static
     */
  }, {
    key: 'disableUnsafeCurrentUser',
    value: function disableUnsafeCurrentUser() {
      canUseCurrentUser = false;
    }
  }, {
    key: '_registerAuthenticationProvider',
    value: function _registerAuthenticationProvider(provider) {
      authProviders[provider.getAuthType()] = provider;
      // Synchronize the current user with the auth provider.
      ParseUser.currentAsync().then(function (current) {
        if (current) {
          current._synchronizeAuthData(provider.getAuthType());
        }
      });
    }
  }, {
    key: '_logInWith',
    value: function _logInWith(provider, options) {
      var user = new ParseUser();
      return user._linkWith(provider, options);
    }
  }, {
    key: '_clearCache',
    value: function _clearCache() {
      currentUserCache = null;
      currentUserCacheMatchesDisk = false;
    }
  }, {
    key: '_setCurrentUserCache',
    value: function _setCurrentUserCache(user) {
      currentUserCache = user;
    }
  }]);

  return ParseUser;
})(_ParseObject3['default']);

exports['default'] = ParseUser;

_ParseObject3['default'].registerSubclass('_User', ParseUser);

var DefaultController = {
  updateUserOnDisk: function updateUserOnDisk(user) {
    var path = _Storage2['default'].generatePath(CURRENT_USER_KEY);
    var json = user.toJSON();
    json.className = '_User';
    return _Storage2['default'].setItemAsync(path, JSON.stringify(json)).then(function () {
      return user;
    });
  },

  removeUserFromDisk: function removeUserFromDisk() {
    var path = _Storage2['default'].generatePath(CURRENT_USER_KEY);
    currentUserCacheMatchesDisk = true;
    currentUserCache = null;
    return _Storage2['default'].removeItemAsync(path);
  },

  setCurrentUser: function setCurrentUser(user) {
    currentUserCache = user;
    user._cleanupAuthData();
    user._synchronizeAllAuthData();
    return DefaultController.updateUserOnDisk(user);
  },

  currentUser: function currentUser() {
    if (currentUserCache) {
      return currentUserCache;
    }
    if (currentUserCacheMatchesDisk) {
      return null;
    }
    if (_Storage2['default'].async()) {
      throw new Error('Cannot call currentUser() when using a platform with an async ' + 'storage system. Call currentUserAsync() instead.');
    }
    var path = _Storage2['default'].generatePath(CURRENT_USER_KEY);
    var userData = _Storage2['default'].getItem(path);
    currentUserCacheMatchesDisk = true;
    if (!userData) {
      currentUserCache = null;
      return null;
    }
    userData = JSON.parse(userData);
    if (!userData.className) {
      userData.className = '_User';
    }
    if (userData._id) {
      if (userData.objectId !== userData._id) {
        userData.objectId = userData._id;
      }
      delete userData._id;
    }
    if (userData._sessionToken) {
      userData.sessionToken = userData._sessionToken;
      delete userData._sessionToken;
    }
    var current = _ParseObject3['default'].fromJSON(userData);
    currentUserCache = current;
    current._synchronizeAllAuthData();
    return current;
  },

  currentUserAsync: function currentUserAsync() {
    if (currentUserCache) {
      return _ParsePromise2['default'].as(currentUserCache);
    }
    if (currentUserCacheMatchesDisk) {
      return _ParsePromise2['default'].as(null);
    }
    var path = _Storage2['default'].generatePath(CURRENT_USER_KEY);
    return _Storage2['default'].getItemAsync(path).then(function (userData) {
      currentUserCacheMatchesDisk = true;
      if (!userData) {
        currentUserCache = null;
        return _ParsePromise2['default'].as(null);
      }
      userData = JSON.parse(userData);
      if (!userData.className) {
        userData.className = '_User';
      }
      if (userData._id) {
        if (userData.objectId !== userData._id) {
          userData.objectId = userData._id;
        }
        delete userData._id;
      }
      if (userData._sessionToken) {
        userData.sessionToken = userData._sessionToken;
        delete userData._sessionToken;
      }
      var current = _ParseObject3['default'].fromJSON(userData);
      currentUserCache = current;
      current._synchronizeAllAuthData();
      return _ParsePromise2['default'].as(current);
    });
  },

  signUp: function signUp(user, attrs, options) {
    var username = attrs && attrs.username || user.get('username');
    var password = attrs && attrs.password || user.get('password');

    if (!username || !username.length) {
      return _ParsePromise2['default'].error(new _ParseError2['default'](_ParseError2['default'].OTHER_CAUSE, 'Cannot sign up user with an empty name.'));
    }
    if (!password || !password.length) {
      return _ParsePromise2['default'].error(new _ParseError2['default'](_ParseError2['default'].OTHER_CAUSE, 'Cannot sign up user with an empty password.'));
    }

    return user.save(attrs, options).then(function () {
      // Clear the password field
      user._finishFetch({ password: undefined });

      if (canUseCurrentUser) {
        return DefaultController.setCurrentUser(user);
      }
      return user;
    });
  },

  logIn: function logIn(user, options) {
    var RESTController = _CoreManager2['default'].getRESTController();
    var stateController = _CoreManager2['default'].getObjectStateController();
    var auth = {
      username: user.get('username'),
      password: user.get('password')
    };
    return RESTController.request('GET', 'login', auth, options).then(function (response, status) {
      user._migrateId(response.objectId);
      user._setExisted(true);
      stateController.setPendingOp(user._getStateIdentifier(), 'username', undefined);
      stateController.setPendingOp(user._getStateIdentifier(), 'password', undefined);
      response.password = undefined;
      user._finishFetch(response);
      if (!canUseCurrentUser) {
        // We can't set the current user, so just return the one we logged in
        return _ParsePromise2['default'].as(user);
      }
      return DefaultController.setCurrentUser(user);
    });
  },

  become: function become(options) {
    var user = new ParseUser();
    var RESTController = _CoreManager2['default'].getRESTController();
    return RESTController.request('GET', 'users/me', {}, options).then(function (response, status) {
      user._finishFetch(response);
      user._setExisted(true);
      return DefaultController.setCurrentUser(user);
    });
  },

  logOut: function logOut() {
    return DefaultController.currentUserAsync().then(function (currentUser) {
      var path = _Storage2['default'].generatePath(CURRENT_USER_KEY);
      var promise = _Storage2['default'].removeItemAsync(path);
      var RESTController = _CoreManager2['default'].getRESTController();
      if (currentUser !== null) {
        var currentSession = currentUser.getSessionToken();
        if (currentSession && (0, _isRevocableSession2['default'])(currentSession)) {
          promise = promise.then(function () {
            return RESTController.request('POST', 'logout', {}, { sessionToken: currentSession });
          });
        }
        currentUser._logOutWithAll();
        currentUser._finishFetch({ sessionToken: undefined });
      }
      currentUserCacheMatchesDisk = true;
      currentUserCache = null;

      return promise;
    });
  },

  requestPasswordReset: function requestPasswordReset(email, options) {
    var RESTController = _CoreManager2['default'].getRESTController();
    return RESTController.request('POST', 'requestPasswordReset', { email: email }, options);
  },

  upgradeToRevocableSession: function upgradeToRevocableSession(user, options) {
    var token = user.getSessionToken();
    if (!token) {
      return _ParsePromise2['default'].error(new _ParseError2['default'](_ParseError2['default'].SESSION_MISSING, 'Cannot upgrade a user with no session token'));
    }

    options.sessionToken = token;

    var RESTController = _CoreManager2['default'].getRESTController();
    return RESTController.request('POST', 'upgradeToRevocableSession', {}, options).then(function (result) {
      var session = new _ParseSession2['default']();
      session._finishFetch(result);
      user._finishFetch({ sessionToken: session.getSessionToken() });
      if (user.isCurrent()) {
        return DefaultController.setCurrentUser(user);
      }
      return _ParsePromise2['default'].as(user);
    });
  },

  linkWith: function linkWith(user, authData) {
    return user.save({ authData: authData }).then(function () {
      if (canUseCurrentUser) {
        return DefaultController.setCurrentUser(user);
      }
      return user;
    });
  }
};

_CoreManager2['default'].setUserController(DefaultController);
module.exports = exports['default'];
},{"./CoreManager":3,"./ParseError":13,"./ParseObject":18,"./ParsePromise":20,"./ParseSession":24,"./Storage":29,"./isRevocableSession":39,"babel-runtime/core-js/object/define-property":46,"babel-runtime/helpers/class-call-check":52,"babel-runtime/helpers/create-class":53,"babel-runtime/helpers/get":54,"babel-runtime/helpers/inherits":55,"babel-runtime/helpers/interop-require-default":56}],26:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.send = send;

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _ParseQuery = _dereq_('./ParseQuery');

var _ParseQuery2 = _interopRequireDefault(_ParseQuery);

/**
 * Contains functions to deal with Push in Parse.
 * @class Parse.Push
 * @static
 */

/**
 * Sends a push notification.
 * @method send
 * @param {Object} data -  The data of the push notification.  Valid fields
 * are:
 *   <ol>
 *     <li>channels - An Array of channels to push to.</li>
 *     <li>push_time - A Date object for when to send the push.</li>
 *     <li>expiration_time -  A Date object for when to expire
 *         the push.</li>
 *     <li>expiration_interval - The seconds from now to expire the push.</li>
 *     <li>where - A Parse.Query over Parse.Installation that is used to match
 *         a set of installations to push to.</li>
 *     <li>data - The data to send as part of the push</li>
 *   <ol>
 * @param {Object} options An object that has an optional success function,
 * that takes no arguments and will be called on a successful push, and
 * an error function that takes a Parse.Error and will be called if the push
 * failed.
 * @return {Parse.Promise} A promise that is fulfilled when the push request
 *     completes.
 */

function send(data, options) {
  options = options || {};

  if (data.where && data.where instanceof _ParseQuery2['default']) {
    data.where = data.where.toJSON().where;
  }

  if (data.push_time && typeof data.push_time === 'object') {
    data.push_time = data.push_time.toJSON();
  }

  if (data.expiration_time && typeof data.expiration_time === 'object') {
    data.expiration_time = data.expiration_time.toJSON();
  }

  if (data.expiration_time && data.expiration_interval) {
    throw new Error('expiration_time and expiration_interval cannot both be set.');
  }

  return _CoreManager2['default'].getPushController().send(data, {
    useMasterKey: options.useMasterKey
  })._thenRunCallbacks(options);
}

_CoreManager2['default'].setPushController({
  send: function send(data, options) {
    var RESTController = _CoreManager2['default'].getRESTController();

    var request = RESTController.request('POST', 'push', data, { useMasterKey: !!options.useMasterKey });

    return request._thenRunCallbacks(options);
  }
});
},{"./CoreManager":3,"./ParseQuery":21,"babel-runtime/helpers/interop-require-default":56}],27:[function(_dereq_,module,exports){
(function (process){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _ParseError = _dereq_('./ParseError');

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParsePromise = _dereq_('./ParsePromise');

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

var _Storage = _dereq_('./Storage');

var _Storage2 = _interopRequireDefault(_Storage);

var XHR = null;
if (typeof XMLHttpRequest !== 'undefined') {
  XHR = XMLHttpRequest;
}

var useXDomainRequest = false;
if (typeof XDomainRequest !== 'undefined' && !('withCredentials' in new XMLHttpRequest())) {
  useXDomainRequest = true;
}

function ajaxIE9(method, url, data) {
  var promise = new _ParsePromise2['default']();
  var xdr = new XDomainRequest();
  xdr.onload = function () {
    var response;
    try {
      response = JSON.parse(xdr.responseText);
    } catch (e) {
      promise.reject(e);
    }
    if (response) {
      promise.resolve(response);
    }
  };
  xdr.onerror = xdr.ontimeout = function () {
    // Let's fake a real error message.
    var fakeResponse = {
      responseText: JSON.stringify({
        code: _ParseError2['default'].X_DOMAIN_REQUEST,
        error: 'IE\'s XDomainRequest does not supply error info.'
      })
    };
    promise.reject(fakeResponse);
  };
  xdr.onprogress = function () {};
  xdr.open(method, url);
  xdr.send(data);
  return promise;
}

var RESTController = {
  ajax: function ajax(method, url, data, headers) {
    if (useXDomainRequest) {
      return ajaxIE9(method, url, data, headers);
    }

    var promise = new _ParsePromise2['default']();
    var attempts = 0;

    var dispatch = function dispatch() {
      if (XHR == null) {
        throw new Error('Cannot make a request: No definition of XMLHttpRequest was found.');
      }
      var handled = false;
      var xhr = new XHR();

      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4 || handled) {
          return;
        }
        handled = true;

        if (xhr.status >= 200 && xhr.status < 300) {
          var response;
          try {
            response = JSON.parse(xhr.responseText);
          } catch (e) {
            promise.reject(e.toString());
          }
          if (response) {
            promise.resolve(response, xhr.status, xhr);
          }
        } else if (xhr.status >= 500 || xhr.status === 0) {
          // retry on 5XX or node-xmlhttprequest error
          if (++attempts < _CoreManager2['default'].get('REQUEST_ATTEMPT_LIMIT')) {
            // Exponentially-growing random delay
            var delay = Math.round(Math.random() * 125 * Math.pow(2, attempts));
            setTimeout(dispatch, delay);
          } else if (xhr.status === 0) {
            promise.reject('Unable to connect to the Parse API');
          } else {
            // After the retry limit is reached, fail
            promise.reject(xhr);
          }
        } else {
          promise.reject(xhr);
        }
      };

      headers = headers || {};
      if (typeof headers['Content-Type'] !== 'string') {
        headers['Content-Type'] = 'text/plain'; // Avoid pre-flight
      }
      if (_CoreManager2['default'].get('IS_NODE')) {
        headers['User-Agent'] = 'Parse/' + _CoreManager2['default'].get('VERSION') + ' (NodeJS ' + process.versions.node + ')';
      }

      xhr.open(method, url, true);
      for (var h in headers) {
        xhr.setRequestHeader(h, headers[h]);
      }
      xhr.send(data);
    };
    dispatch();

    return promise;
  },

  request: function request(method, path, data, options) {
    options = options || {};
    var url = _CoreManager2['default'].get('SERVER_URL');
    if (url[url.length - 1] !== '/') {
      url += '/';
    }
    url += path;

    var payload = {};
    if (data && typeof data === 'object') {
      for (var k in data) {
        payload[k] = data[k];
      }
    }

    if (method !== 'POST') {
      payload._method = method;
      method = 'POST';
    }

    payload._ApplicationId = _CoreManager2['default'].get('APPLICATION_ID');
    var jsKey = _CoreManager2['default'].get('JAVASCRIPT_KEY');
    if (jsKey) {
      payload._JavaScriptKey = jsKey;
    }
    payload._ClientVersion = _CoreManager2['default'].get('VERSION');

    var useMasterKey = options.useMasterKey;
    if (typeof useMasterKey === 'undefined') {
      useMasterKey = _CoreManager2['default'].get('USE_MASTER_KEY');
    }
    if (useMasterKey) {
      if (_CoreManager2['default'].get('MASTER_KEY')) {
        delete payload._JavaScriptKey;
        payload._MasterKey = _CoreManager2['default'].get('MASTER_KEY');
      } else {
        throw new Error('Cannot use the Master Key, it has not been provided.');
      }
    }

    if (_CoreManager2['default'].get('FORCE_REVOCABLE_SESSION')) {
      payload._RevocableSession = '1';
    }

    var installationId = options.installationId;
    var installationIdPromise;
    if (installationId && typeof installationId === 'string') {
      installationIdPromise = _ParsePromise2['default'].as(installationId);
    } else {
      var installationController = _CoreManager2['default'].getInstallationController();
      installationIdPromise = installationController.currentInstallationId();
    }

    return installationIdPromise.then(function (iid) {
      payload._InstallationId = iid;
      var userController = _CoreManager2['default'].getUserController();
      if (options && typeof options.sessionToken === 'string') {
        return _ParsePromise2['default'].as(options.sessionToken);
      } else if (userController) {
        return userController.currentUserAsync().then(function (user) {
          if (user) {
            return _ParsePromise2['default'].as(user.getSessionToken());
          }
          return _ParsePromise2['default'].as(null);
        });
      }
      return _ParsePromise2['default'].as(null);
    }).then(function (token) {
      if (token) {
        payload._SessionToken = token;
      }

      var payloadString = JSON.stringify(payload);

      return RESTController.ajax(method, url, payloadString);
    }).then(null, function (response) {
      // Transform the error into an instance of ParseError by trying to parse
      // the error string as JSON
      var error;
      if (response && response.responseText) {
        try {
          var errorJSON = JSON.parse(response.responseText);
          error = new _ParseError2['default'](errorJSON.code, errorJSON.error);
        } catch (e) {
          // If we fail to parse the error text, that's okay.
          error = new _ParseError2['default'](_ParseError2['default'].INVALID_JSON, 'Received an error with invalid JSON from Parse: ' + response.responseText);
        }
      } else {
        error = new _ParseError2['default'](_ParseError2['default'].CONNECTION_FAILED, 'XMLHttpRequest failed: ' + JSON.stringify(response));
      }

      return _ParsePromise2['default'].error(error);
    });
  },

  _setXHR: function _setXHR(xhr) {
    XHR = xhr;
  }
};

module.exports = RESTController;
}).call(this,_dereq_('_process'))
},{"./CoreManager":3,"./ParseError":13,"./ParsePromise":20,"./Storage":29,"_process":58,"babel-runtime/helpers/interop-require-default":56}],28:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _interopRequireWildcard = _dereq_('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getState = getState;
exports.initializeState = initializeState;
exports.removeState = removeState;
exports.getServerData = getServerData;
exports.setServerData = setServerData;
exports.getPendingOps = getPendingOps;
exports.setPendingOp = setPendingOp;
exports.pushPendingState = pushPendingState;
exports.popPendingState = popPendingState;
exports.mergeFirstPendingState = mergeFirstPendingState;
exports.getObjectCache = getObjectCache;
exports.estimateAttribute = estimateAttribute;
exports.estimateAttributes = estimateAttributes;
exports.commitServerChanges = commitServerChanges;
exports.enqueueTask = enqueueTask;
exports.clearAllState = clearAllState;
exports.duplicateState = duplicateState;

var _ObjectStateMutations = _dereq_('./ObjectStateMutations');

var ObjectStateMutations = _interopRequireWildcard(_ObjectStateMutations);

var objectState = {};

function getState(obj) {
  var classData = objectState[obj.className];
  if (classData) {
    return classData[obj.id] || null;
  }
  return null;
}

function initializeState(obj, initial) {
  var state = getState(obj);
  if (state) {
    return state;
  }
  if (!objectState[obj.className]) {
    objectState[obj.className] = {};
  }
  if (!initial) {
    initial = ObjectStateMutations.defaultState();
  }
  state = objectState[obj.className][obj.id] = initial;
  return state;
}

function removeState(obj) {
  var state = getState(obj);
  if (state === null) {
    return null;
  }
  delete objectState[obj.className][obj.id];
  return state;
}

function getServerData(obj) {
  var state = getState(obj);
  if (state) {
    return state.serverData;
  }
  return {};
}

function setServerData(obj, attributes) {
  var serverData = initializeState(obj).serverData;
  ObjectStateMutations.setServerData(serverData, attributes);
}

function getPendingOps(obj) {
  var state = getState(obj);
  if (state) {
    return state.pendingOps;
  }
  return [{}];
}

function setPendingOp(obj, attr, op) {
  var pendingOps = initializeState(obj).pendingOps;
  ObjectStateMutations.setPendingOp(pendingOps, attr, op);
}

function pushPendingState(obj) {
  var pendingOps = initializeState(obj).pendingOps;
  ObjectStateMutations.pushPendingState(pendingOps);
}

function popPendingState(obj) {
  var pendingOps = initializeState(obj).pendingOps;
  return ObjectStateMutations.popPendingState(pendingOps);
}

function mergeFirstPendingState(obj) {
  var pendingOps = getPendingOps(obj);
  ObjectStateMutations.mergeFirstPendingState(pendingOps);
}

function getObjectCache(obj) {
  var state = getState(obj);
  if (state) {
    return state.objectCache;
  }
  return {};
}

function estimateAttribute(obj, attr) {
  var serverData = getServerData(obj);
  var pendingOps = getPendingOps(obj);
  return ObjectStateMutations.estimateAttribute(serverData, pendingOps, obj.className, obj.id, attr);
}

function estimateAttributes(obj) {
  var serverData = getServerData(obj);
  var pendingOps = getPendingOps(obj);
  return ObjectStateMutations.estimateAttributes(serverData, pendingOps, obj.className, obj.id);
}

function commitServerChanges(obj, changes) {
  var state = initializeState(obj);
  ObjectStateMutations.commitServerChanges(state.serverData, state.objectCache, changes);
}

function enqueueTask(obj, task) {
  var state = initializeState(obj);
  return state.tasks.enqueue(task);
}

function clearAllState() {
  objectState = {};
}

function duplicateState(source, dest) {
  dest.id = source.id;
}
},{"./ObjectStateMutations":9,"babel-runtime/helpers/interop-require-wildcard":57}],29:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _ParsePromise = _dereq_('./ParsePromise');

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

module.exports = {
  async: function async() {
    var controller = _CoreManager2['default'].getStorageController();
    return !!controller.async;
  },

  getItem: function getItem(path) {
    var controller = _CoreManager2['default'].getStorageController();
    if (controller.async === 1) {
      throw new Error('Synchronous storage is not supported by the current storage controller');
    }
    return controller.getItem(path);
  },

  getItemAsync: function getItemAsync(path) {
    var controller = _CoreManager2['default'].getStorageController();
    if (controller.async === 1) {
      return controller.getItemAsync(path);
    }
    return _ParsePromise2['default'].as(controller.getItem(path));
  },

  setItem: function setItem(path, value) {
    var controller = _CoreManager2['default'].getStorageController();
    if (controller.async === 1) {
      throw new Error('Synchronous storage is not supported by the current storage controller');
    }
    return controller.setItem(path, value);
  },

  setItemAsync: function setItemAsync(path, value) {
    var controller = _CoreManager2['default'].getStorageController();
    if (controller.async === 1) {
      return controller.setItemAsync(path, value);
    }
    return _ParsePromise2['default'].as(controller.setItem(path, value));
  },

  removeItem: function removeItem(path) {
    var controller = _CoreManager2['default'].getStorageController();
    if (controller.async === 1) {
      throw new Error('Synchronous storage is not supported by the current storage controller');
    }
    return controller.removeItem(path);
  },

  removeItemAsync: function removeItemAsync(path) {
    var controller = _CoreManager2['default'].getStorageController();
    if (controller.async === 1) {
      return controller.removeItemAsync(path);
    }
    return _ParsePromise2['default'].as(controller.removeItem(path));
  },

  generatePath: function generatePath(path) {
    if (!_CoreManager2['default'].get('APPLICATION_ID')) {
      throw new Error('You need to call Parse.initialize before using Parse.');
    }
    if (typeof path !== 'string') {
      throw new Error('Tried to get a Storage path that was not a String.');
    }
    if (path[0] === '/') {
      path = path.substr(1);
    }
    return 'Parse/' + _CoreManager2['default'].get('APPLICATION_ID') + '/' + path;
  },

  _clear: function _clear() {
    var controller = _CoreManager2['default'].getStorageController();
    if (controller.hasOwnProperty('clear')) {
      controller.clear();
    }
  }
};

_CoreManager2['default'].setStorageController(_dereq_('./StorageController.browser'));
},{"./CoreManager":3,"./ParsePromise":20,"./StorageController.browser":30,"babel-runtime/helpers/interop-require-default":56}],30:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

var _ParsePromise = _dereq_('./ParsePromise');

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

module.exports = {
  async: 0,

  getItem: function getItem(path) {
    return localStorage.getItem(path);
  },

  setItem: function setItem(path, value) {
    try {
      localStorage.setItem(path, value);
    } catch (e) {
      // Quota exceeded, possibly due to Safari Private Browsing mode
    }
  },

  removeItem: function removeItem(path) {
    localStorage.removeItem(path);
  },

  clear: function clear() {
    localStorage.clear();
  }
};
},{"./ParsePromise":20,"babel-runtime/helpers/interop-require-default":56}],31:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _createClass = _dereq_('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = _dereq_('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

var _ParsePromise = _dereq_('./ParsePromise');

var _ParsePromise2 = _interopRequireDefault(_ParsePromise);

module.exports = (function () {
  function TaskQueue() {
    _classCallCheck(this, TaskQueue);

    this.queue = [];
  }

  _createClass(TaskQueue, [{
    key: 'enqueue',
    value: function enqueue(task) {
      var _this = this;

      var taskComplete = new _ParsePromise2['default']();
      this.queue.push({
        task: task,
        _completion: taskComplete
      });
      if (this.queue.length === 1) {
        task().then(function () {
          _this._dequeue();
          taskComplete.resolve();
        }, function (error) {
          _this._dequeue();
          taskComplete.reject(error);
        });
      }
      return taskComplete;
    }
  }, {
    key: '_dequeue',
    value: function _dequeue() {
      var _this2 = this;

      this.queue.shift();
      if (this.queue.length) {
        var next = this.queue[0];
        next.task().then(function () {
          _this2._dequeue();
          next._completion.resolve();
        }, function (error) {
          _this2._dequeue();
          next._completion.reject(error);
        });
      }
    }
  }]);

  return TaskQueue;
})();
},{"./ParsePromise":20,"babel-runtime/helpers/class-call-check":52,"babel-runtime/helpers/create-class":53,"babel-runtime/helpers/interop-require-default":56}],32:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _WeakMap = _dereq_('babel-runtime/core-js/weak-map')['default'];

var _interopRequireWildcard = _dereq_('babel-runtime/helpers/interop-require-wildcard')['default'];

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getState = getState;
exports.initializeState = initializeState;
exports.removeState = removeState;
exports.getServerData = getServerData;
exports.setServerData = setServerData;
exports.getPendingOps = getPendingOps;
exports.setPendingOp = setPendingOp;
exports.pushPendingState = pushPendingState;
exports.popPendingState = popPendingState;
exports.mergeFirstPendingState = mergeFirstPendingState;
exports.getObjectCache = getObjectCache;
exports.estimateAttribute = estimateAttribute;
exports.estimateAttributes = estimateAttributes;
exports.commitServerChanges = commitServerChanges;
exports.enqueueTask = enqueueTask;
exports.duplicateState = duplicateState;
exports.clearAllState = clearAllState;

var _ObjectStateMutations = _dereq_('./ObjectStateMutations');

var ObjectStateMutations = _interopRequireWildcard(_ObjectStateMutations);

var _TaskQueue = _dereq_('./TaskQueue');

var _TaskQueue2 = _interopRequireDefault(_TaskQueue);

var objectState = new _WeakMap();

function getState(obj) {
  var classData = objectState.get(obj);
  return classData || null;
}

function initializeState(obj, initial) {
  var state = getState(obj);
  if (state) {
    return state;
  }
  if (!initial) {
    initial = {
      serverData: {},
      pendingOps: [{}],
      objectCache: {},
      tasks: new _TaskQueue2['default'](),
      existed: false
    };
  }
  state = initial;
  objectState.set(obj, state);
  return state;
}

function removeState(obj) {
  var state = getState(obj);
  if (state === null) {
    return null;
  }
  objectState['delete'](obj);
  return state;
}

function getServerData(obj) {
  var state = getState(obj);
  if (state) {
    return state.serverData;
  }
  return {};
}

function setServerData(obj, attributes) {
  var serverData = initializeState(obj).serverData;
  ObjectStateMutations.setServerData(serverData, attributes);
}

function getPendingOps(obj) {
  var state = getState(obj);
  if (state) {
    return state.pendingOps;
  }
  return [{}];
}

function setPendingOp(obj, attr, op) {
  var pendingOps = initializeState(obj).pendingOps;
  ObjectStateMutations.setPendingOp(pendingOps, attr, op);
}

function pushPendingState(obj) {
  var pendingOps = initializeState(obj).pendingOps;
  ObjectStateMutations.pushPendingState(pendingOps);
}

function popPendingState(obj) {
  var pendingOps = initializeState(obj).pendingOps;
  return ObjectStateMutations.popPendingState(pendingOps);
}

function mergeFirstPendingState(obj) {
  var pendingOps = getPendingOps(obj);
  ObjectStateMutations.mergeFirstPendingState(pendingOps);
}

function getObjectCache(obj) {
  var state = getState(obj);
  if (state) {
    return state.objectCache;
  }
  return {};
}

function estimateAttribute(obj, attr) {
  var serverData = getServerData(obj);
  var pendingOps = getPendingOps(obj);
  return ObjectStateMutations.estimateAttribute(serverData, pendingOps, obj.className, obj.id, attr);
}

function estimateAttributes(obj) {
  var serverData = getServerData(obj);
  var pendingOps = getPendingOps(obj);
  return ObjectStateMutations.estimateAttributes(serverData, pendingOps, obj.className, obj.id);
}

function commitServerChanges(obj, changes) {
  var state = initializeState(obj);
  ObjectStateMutations.commitServerChanges(state.serverData, state.objectCache, changes);
}

function enqueueTask(obj, task) {
  var state = initializeState(obj);
  return state.tasks.enqueue(task);
}

function duplicateState(source, dest) {
  var oldState = initializeState(source);
  var newState = initializeState(dest);
  for (var key in oldState.serverData) {
    newState.serverData[key] = oldState.serverData[key];
  }
  for (var index = 0; index < oldState.pendingOps.length; index++) {
    for (var key in oldState.pendingOps[index]) {
      newState.pendingOps[index][key] = oldState.pendingOps[index][key];
    }
  }
  for (var key in oldState.objectCache) {
    newState.objectCache[key] = oldState.objectCache[key];
  }
  newState.existed = oldState.existed;
}

function clearAllState() {
  objectState = new _WeakMap();
}
},{"./ObjectStateMutations":9,"./TaskQueue":31,"babel-runtime/core-js/weak-map":51,"babel-runtime/helpers/interop-require-default":56,"babel-runtime/helpers/interop-require-wildcard":57}],33:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = arrayContainsObject;

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

function arrayContainsObject(array, object) {
  if (array.indexOf(object) > -1) {
    return true;
  }
  for (var i = 0; i < array.length; i++) {
    if (array[i] instanceof _ParseObject2['default'] && array[i].className === object.className && array[i]._getId() === object._getId()) {
      return true;
    }
  }
  return false;
}

module.exports = exports['default'];
},{"./ParseObject":18,"babel-runtime/helpers/interop-require-default":56}],34:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = canBeSerialized;

var _ParseFile = _dereq_('./ParseFile');

var _ParseFile2 = _interopRequireDefault(_ParseFile);

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParseRelation = _dereq_('./ParseRelation');

var _ParseRelation2 = _interopRequireDefault(_ParseRelation);

function canBeSerialized(obj) {
  if (!(obj instanceof _ParseObject2['default'])) {
    return true;
  }
  var attributes = obj.attributes;
  for (var attr in attributes) {
    var val = attributes[attr];
    if (!canBeSerializedHelper(val)) {
      return false;
    }
  }
  return true;
}

function canBeSerializedHelper(value) {
  if (typeof value !== 'object') {
    return true;
  }
  if (value instanceof _ParseRelation2['default']) {
    return true;
  }
  if (value instanceof _ParseObject2['default']) {
    return !!value.id;
  }
  if (value instanceof _ParseFile2['default']) {
    if (value.url()) {
      return true;
    }
    return false;
  }
  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      if (!canBeSerializedHelper(value[i])) {
        return false;
      }
    }
    return true;
  }
  for (var k in value) {
    if (!canBeSerializedHelper(value[k])) {
      return false;
    }
  }
  return true;
}
module.exports = exports['default'];
},{"./ParseFile":14,"./ParseObject":18,"./ParseRelation":22,"babel-runtime/helpers/interop-require-default":56}],35:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = decode;

var _ParseACL = _dereq_('./ParseACL');

var _ParseACL2 = _interopRequireDefault(_ParseACL);

var _ParseFile = _dereq_('./ParseFile');

var _ParseFile2 = _interopRequireDefault(_ParseFile);

var _ParseGeoPoint = _dereq_('./ParseGeoPoint');

var _ParseGeoPoint2 = _interopRequireDefault(_ParseGeoPoint);

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParseOp = _dereq_('./ParseOp');

var _ParseRelation = _dereq_('./ParseRelation');

var _ParseRelation2 = _interopRequireDefault(_ParseRelation);

function decode(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }
  if (Array.isArray(value)) {
    var dup = [];
    value.forEach(function (v, i) {
      dup[i] = decode(v);
    });
    return dup;
  }
  if (typeof value.__op === 'string') {
    return (0, _ParseOp.opFromJSON)(value);
  }
  if (value.__type === 'Pointer' && value.className) {
    return _ParseObject2['default'].fromJSON(value);
  }
  if (value.__type === 'Object' && value.className) {
    return _ParseObject2['default'].fromJSON(value);
  }
  if (value.__type === 'Relation') {
    // The parent and key fields will be populated by the parent
    var relation = new _ParseRelation2['default'](null, null);
    relation.targetClassName = value.className;
    return relation;
  }
  if (value.__type === 'Date') {
    return new Date(value.iso);
  }
  if (value.__type === 'File') {
    return _ParseFile2['default'].fromJSON(value);
  }
  if (value.__type === 'GeoPoint') {
    return new _ParseGeoPoint2['default']({
      latitude: value.latitude,
      longitude: value.longitude
    });
  }
  var copy = {};
  for (var k in value) {
    copy[k] = decode(value[k]);
  }
  return copy;
}

module.exports = exports['default'];
},{"./ParseACL":11,"./ParseFile":14,"./ParseGeoPoint":15,"./ParseObject":18,"./ParseOp":19,"./ParseRelation":22,"babel-runtime/helpers/interop-require-default":56}],36:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _Object$keys = _dereq_('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ParseACL = _dereq_('./ParseACL');

var _ParseACL2 = _interopRequireDefault(_ParseACL);

var _ParseFile = _dereq_('./ParseFile');

var _ParseFile2 = _interopRequireDefault(_ParseFile);

var _ParseGeoPoint = _dereq_('./ParseGeoPoint');

var _ParseGeoPoint2 = _interopRequireDefault(_ParseGeoPoint);

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParseOp = _dereq_('./ParseOp');

var _ParseRelation = _dereq_('./ParseRelation');

var _ParseRelation2 = _interopRequireDefault(_ParseRelation);

var toString = Object.prototype.toString;

function encode(value, disallowObjects, forcePointers, seen) {
  if (value instanceof _ParseObject2['default']) {
    if (disallowObjects) {
      throw new Error('Parse Objects not allowed here');
    }
    var seenEntry = value.id ? value.className + ':' + value.id : value;
    if (forcePointers || !seen || seen.indexOf(seenEntry) > -1 || value.dirty() || _Object$keys(value._getServerData()).length < 1) {
      return value.toPointer();
    }
    seen = seen.concat(seenEntry);
    return value._toFullJSON(seen);
  }
  if (value instanceof _ParseOp.Op || value instanceof _ParseACL2['default'] || value instanceof _ParseGeoPoint2['default'] || value instanceof _ParseRelation2['default']) {
    return value.toJSON();
  }
  if (value instanceof _ParseFile2['default']) {
    if (!value.url()) {
      throw new Error('Tried to encode an unsaved file.');
    }
    return value.toJSON();
  }
  if (toString.call(value) === '[object Date]') {
    if (isNaN(value)) {
      throw new Error('Tried to encode an invalid date.');
    }
    return { __type: 'Date', iso: value.toJSON() };
  }
  if (toString.call(value) === '[object RegExp]' && typeof value.source === 'string') {
    return value.source;
  }

  if (Array.isArray(value)) {
    return value.map(function (v) {
      return encode(v, disallowObjects, forcePointers, seen);
    });
  }

  if (value && typeof value === 'object') {
    var output = {};
    for (var k in value) {
      output[k] = encode(value[k], disallowObjects, forcePointers, seen);
    }
    return output;
  }

  return value;
}

exports['default'] = function (value, disallowObjects, forcePointers, seen) {
  return encode(value, !!disallowObjects, !!forcePointers, seen || []);
};

module.exports = exports['default'];
},{"./ParseACL":11,"./ParseFile":14,"./ParseGeoPoint":15,"./ParseObject":18,"./ParseOp":19,"./ParseRelation":22,"babel-runtime/core-js/object/keys":49,"babel-runtime/helpers/interop-require-default":56}],37:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var _Object$keys = _dereq_('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = equals;

var _ParseACL = _dereq_('./ParseACL');

var _ParseACL2 = _interopRequireDefault(_ParseACL);

var _ParseFile = _dereq_('./ParseFile');

var _ParseFile2 = _interopRequireDefault(_ParseFile);

var _ParseGeoPoint = _dereq_('./ParseGeoPoint');

var _ParseGeoPoint2 = _interopRequireDefault(_ParseGeoPoint);

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

function equals(a, b) {
  if (typeof a !== typeof b) {
    return false;
  }

  if (!a || typeof a !== 'object') {
    // a is a primitive
    return a === b;
  }

  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (var i = a.length; i--;) {
      if (!equals(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  if (a instanceof _ParseACL2['default'] || a instanceof _ParseFile2['default'] || a instanceof _ParseGeoPoint2['default'] || a instanceof _ParseObject2['default']) {
    return a.equals(b);
  }

  if (_Object$keys(a).length !== _Object$keys(b).length) {
    return false;
  }
  for (var k in a) {
    if (!equals(a[k], b[k])) {
      return false;
    }
  }
  return true;
}

module.exports = exports['default'];
},{"./ParseACL":11,"./ParseFile":14,"./ParseGeoPoint":15,"./ParseObject":18,"babel-runtime/core-js/object/keys":49,"babel-runtime/helpers/interop-require-default":56}],38:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = escape;

function escape(str) {
  return str.replace(/[&<>\/'"]/g, function (char) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '/': '&#x2F;',
      '\'': '&#x27;',
      '"': '&quot;'
    })[char];
  });
}

module.exports = exports['default'];
},{}],39:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = isRevocableSession;

function isRevocableSession(token) {
  return token.indexOf('r:') > -1;
}

module.exports = exports['default'];
},{}],40:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = parseDate;

function parseDate(iso8601) {
  var regexp = new RegExp('^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,2})' + 'T' + '([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})' + '(.([0-9]+))?' + 'Z$');
  var match = regexp.exec(iso8601);
  if (!match) {
    return null;
  }

  var year = match[1] || 0;
  var month = (match[2] || 1) - 1;
  var day = match[3] || 0;
  var hour = match[4] || 0;
  var minute = match[5] || 0;
  var second = match[6] || 0;
  var milli = match[8] || 0;

  return new Date(Date.UTC(year, month, day, hour, minute, second, milli));
}

module.exports = exports['default'];
},{}],41:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = unique;

var _arrayContainsObject = _dereq_('./arrayContainsObject');

var _arrayContainsObject2 = _interopRequireDefault(_arrayContainsObject);

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

function unique(arr) {
  var uniques = [];
  arr.forEach(function (value) {
    if (value instanceof _ParseObject2['default']) {
      if (!(0, _arrayContainsObject2['default'])(uniques, value)) {
        uniques.push(value);
      }
    } else {
      if (uniques.indexOf(value) < 0) {
        uniques.push(value);
      }
    }
  });
  return uniques;
}

module.exports = exports['default'];
},{"./ParseObject":18,"./arrayContainsObject":33,"babel-runtime/helpers/interop-require-default":56}],42:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _interopRequireDefault = _dereq_('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = unsavedChildren;

var _ParseFile = _dereq_('./ParseFile');

var _ParseFile2 = _interopRequireDefault(_ParseFile);

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParseRelation = _dereq_('./ParseRelation');

var _ParseRelation2 = _interopRequireDefault(_ParseRelation);

/**
 * Return an array of unsaved children, which are either Parse Objects or Files.
 * If it encounters any dirty Objects without Ids, it will throw an exception.
 */

function unsavedChildren(obj, allowDeepUnsaved) {
  var encountered = {
    objects: {},
    files: []
  };
  var identifier = obj.className + ':' + obj._getId();
  encountered.objects[identifier] = obj.dirty() ? obj : true;
  var attributes = obj.attributes;
  for (var attr in attributes) {
    if (typeof attributes[attr] === 'object') {
      traverse(attributes[attr], encountered, false, !!allowDeepUnsaved);
    }
  }
  var unsaved = [];
  for (var id in encountered.objects) {
    if (id !== identifier && encountered.objects[id] !== true) {
      unsaved.push(encountered.objects[id]);
    }
  }
  return unsaved.concat(encountered.files);
}

function traverse(obj, encountered, shouldThrow, allowDeepUnsaved) {
  if (obj instanceof _ParseObject2['default']) {
    if (!obj.id && shouldThrow) {
      throw new Error('Cannot create a pointer to an unsaved Object.');
    }
    var identifier = obj.className + ':' + obj._getId();
    if (!encountered.objects[identifier]) {
      encountered.objects[identifier] = obj.dirty() ? obj : true;
      var attributes = obj.attributes;
      for (var attr in attributes) {
        if (typeof attributes[attr] === 'object') {
          traverse(attributes[attr], encountered, !allowDeepUnsaved, allowDeepUnsaved);
        }
      }
    }
    return;
  }
  if (obj instanceof _ParseFile2['default']) {
    if (!obj.url() && encountered.files.indexOf(obj) < 0) {
      encountered.files.push(obj);
    }
    return;
  }
  if (obj instanceof _ParseRelation2['default']) {
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach(function (el) {
      if (typeof el === 'object') {
        traverse(el, encountered, shouldThrow, allowDeepUnsaved);
      }
    });
  }
  for (var k in obj) {
    if (typeof obj[k] === 'object') {
      traverse(obj[k], encountered, shouldThrow, allowDeepUnsaved);
    }
  }
}
module.exports = exports['default'];
},{"./ParseFile":14,"./ParseObject":18,"./ParseRelation":22,"babel-runtime/helpers/interop-require-default":56}],43:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":59}],44:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/map"), __esModule: true };
},{"core-js/library/fn/map":60}],45:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":61}],46:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":62}],47:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/freeze"), __esModule: true };
},{"core-js/library/fn/object/freeze":63}],48:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":64}],49:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":65}],50:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":66}],51:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/weak-map"), __esModule: true };
},{"core-js/library/fn/weak-map":67}],52:[function(_dereq_,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],53:[function(_dereq_,module,exports){
"use strict";

var _Object$defineProperty = _dereq_("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":46}],54:[function(_dereq_,module,exports){
"use strict";

var _Object$getOwnPropertyDescriptor = _dereq_("babel-runtime/core-js/object/get-own-property-descriptor")["default"];

exports["default"] = function get(_x, _x2, _x3) {
  var _again = true;

  _function: while (_again) {
    var object = _x,
        property = _x2,
        receiver = _x3;
    _again = false;
    if (object === null) object = Function.prototype;

    var desc = _Object$getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        _x = parent;
        _x2 = property;
        _x3 = receiver;
        _again = true;
        desc = parent = undefined;
        continue _function;
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  }
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/get-own-property-descriptor":48}],55:[function(_dereq_,module,exports){
"use strict";

var _Object$create = _dereq_("babel-runtime/core-js/object/create")["default"];

var _Object$setPrototypeOf = _dereq_("babel-runtime/core-js/object/set-prototype-of")["default"];

exports["default"] = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/create":45,"babel-runtime/core-js/object/set-prototype-of":50}],56:[function(_dereq_,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],57:[function(_dereq_,module,exports){
"use strict";

exports["default"] = function (obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj["default"] = obj;
    return newObj;
  }
};

exports.__esModule = true;
},{}],58:[function(_dereq_,module,exports){

},{}],59:[function(_dereq_,module,exports){
_dereq_('../modules/web.dom.iterable');
_dereq_('../modules/es6.string.iterator');
module.exports = _dereq_('../modules/core.get-iterator');
},{"../modules/core.get-iterator":117,"../modules/es6.string.iterator":125,"../modules/web.dom.iterable":128}],60:[function(_dereq_,module,exports){
_dereq_('../modules/es6.object.to-string');
_dereq_('../modules/es6.string.iterator');
_dereq_('../modules/web.dom.iterable');
_dereq_('../modules/es6.map');
_dereq_('../modules/es7.map.to-json');
module.exports = _dereq_('../modules/$.core').Map;
},{"../modules/$.core":79,"../modules/es6.map":119,"../modules/es6.object.to-string":124,"../modules/es6.string.iterator":125,"../modules/es7.map.to-json":127,"../modules/web.dom.iterable":128}],61:[function(_dereq_,module,exports){
var $ = _dereq_('../../modules/$');
module.exports = function create(P, D){
  return $.create(P, D);
};
},{"../../modules/$":98}],62:[function(_dereq_,module,exports){
var $ = _dereq_('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":98}],63:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.freeze');
module.exports = _dereq_('../../modules/$.core').Object.freeze;
},{"../../modules/$.core":79,"../../modules/es6.object.freeze":120}],64:[function(_dereq_,module,exports){
var $ = _dereq_('../../modules/$');
_dereq_('../../modules/es6.object.get-own-property-descriptor');
module.exports = function getOwnPropertyDescriptor(it, key){
  return $.getDesc(it, key);
};
},{"../../modules/$":98,"../../modules/es6.object.get-own-property-descriptor":121}],65:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.keys');
module.exports = _dereq_('../../modules/$.core').Object.keys;
},{"../../modules/$.core":79,"../../modules/es6.object.keys":122}],66:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.set-prototype-of');
module.exports = _dereq_('../../modules/$.core').Object.setPrototypeOf;
},{"../../modules/$.core":79,"../../modules/es6.object.set-prototype-of":123}],67:[function(_dereq_,module,exports){
_dereq_('../modules/es6.object.to-string');
_dereq_('../modules/web.dom.iterable');
_dereq_('../modules/es6.weak-map');
module.exports = _dereq_('../modules/$.core').WeakMap;
},{"../modules/$.core":79,"../modules/es6.object.to-string":124,"../modules/es6.weak-map":126,"../modules/web.dom.iterable":128}],68:[function(_dereq_,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],69:[function(_dereq_,module,exports){
module.exports = function(){ /* empty */ };
},{}],70:[function(_dereq_,module,exports){
var isObject = _dereq_('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":92}],71:[function(_dereq_,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = _dereq_('./$.ctx')
  , IObject  = _dereq_('./$.iobject')
  , toObject = _dereq_('./$.to-object')
  , toLength = _dereq_('./$.to-length')
  , asc      = _dereq_('./$.array-species-create');
module.exports = function(TYPE){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? asc($this, length) : IS_FILTER ? asc($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"./$.array-species-create":72,"./$.ctx":80,"./$.iobject":89,"./$.to-length":112,"./$.to-object":113}],72:[function(_dereq_,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var isObject = _dereq_('./$.is-object')
  , isArray  = _dereq_('./$.is-array')
  , SPECIES  = _dereq_('./$.wks')('species');
module.exports = function(original, length){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return new (C === undefined ? Array : C)(length);
};
},{"./$.is-array":91,"./$.is-object":92,"./$.wks":115}],73:[function(_dereq_,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = _dereq_('./$.cof')
  , TAG = _dereq_('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":74,"./$.wks":115}],74:[function(_dereq_,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],75:[function(_dereq_,module,exports){
'use strict';
var $            = _dereq_('./$')
  , hide         = _dereq_('./$.hide')
  , redefineAll  = _dereq_('./$.redefine-all')
  , ctx          = _dereq_('./$.ctx')
  , strictNew    = _dereq_('./$.strict-new')
  , defined      = _dereq_('./$.defined')
  , forOf        = _dereq_('./$.for-of')
  , $iterDefine  = _dereq_('./$.iter-define')
  , step         = _dereq_('./$.iter-step')
  , ID           = _dereq_('./$.uid')('id')
  , $has         = _dereq_('./$.has')
  , isObject     = _dereq_('./$.is-object')
  , setSpecies   = _dereq_('./$.set-species')
  , DESCRIPTORS  = _dereq_('./$.descriptors')
  , isExtensible = Object.isExtensible || isObject
  , SIZE         = DESCRIPTORS ? '_s' : 'size'
  , id           = 0;

var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!$has(it, ID)){
    // can't set id to frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add id
    if(!create)return 'E';
    // add missing object id
    hide(it, ID, ++id);
  // return object id with prefix
  } return 'O' + it[ID];
};

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      strictNew(that, C, NAME);
      that._i = $.create(null); // index
      that._f = undefined;      // first entry
      that._l = undefined;      // last entry
      that[SIZE] = 0;           // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
},{"./$":98,"./$.ctx":80,"./$.defined":81,"./$.descriptors":82,"./$.for-of":85,"./$.has":87,"./$.hide":88,"./$.is-object":92,"./$.iter-define":95,"./$.iter-step":96,"./$.redefine-all":102,"./$.set-species":105,"./$.strict-new":108,"./$.uid":114}],76:[function(_dereq_,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var forOf   = _dereq_('./$.for-of')
  , classof = _dereq_('./$.classof');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    var arr = [];
    forOf(this, false, arr.push, arr);
    return arr;
  };
};
},{"./$.classof":73,"./$.for-of":85}],77:[function(_dereq_,module,exports){
'use strict';
var hide              = _dereq_('./$.hide')
  , redefineAll       = _dereq_('./$.redefine-all')
  , anObject          = _dereq_('./$.an-object')
  , isObject          = _dereq_('./$.is-object')
  , strictNew         = _dereq_('./$.strict-new')
  , forOf             = _dereq_('./$.for-of')
  , createArrayMethod = _dereq_('./$.array-methods')
  , $has              = _dereq_('./$.has')
  , WEAK              = _dereq_('./$.uid')('weak')
  , isExtensible      = Object.isExtensible || isObject
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for frozen keys
var frozenStore = function(that){
  return that._l || (that._l = new FrozenStore);
};
var FrozenStore = function(){
  this.a = [];
};
var findFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
FrozenStore.prototype = {
  get: function(key){
    var entry = findFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findFrozen(this, key);
  },
  set: function(key, value){
    var entry = findFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      strictNew(that, C, NAME);
      that._i = id++;      // collection id
      that._l = undefined; // leak store for frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return frozenStore(this)['delete'](key);
        return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return frozenStore(this).has(key);
        return $has(key, WEAK) && $has(key[WEAK], this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    if(!isExtensible(anObject(key))){
      frozenStore(that).set(key, value);
    } else {
      $has(key, WEAK) || hide(key, WEAK, {});
      key[WEAK][that._i] = value;
    } return that;
  },
  frozenStore: frozenStore,
  WEAK: WEAK
};
},{"./$.an-object":70,"./$.array-methods":71,"./$.for-of":85,"./$.has":87,"./$.hide":88,"./$.is-object":92,"./$.redefine-all":102,"./$.strict-new":108,"./$.uid":114}],78:[function(_dereq_,module,exports){
'use strict';
var $              = _dereq_('./$')
  , global         = _dereq_('./$.global')
  , $export        = _dereq_('./$.export')
  , fails          = _dereq_('./$.fails')
  , hide           = _dereq_('./$.hide')
  , redefineAll    = _dereq_('./$.redefine-all')
  , forOf          = _dereq_('./$.for-of')
  , strictNew      = _dereq_('./$.strict-new')
  , isObject       = _dereq_('./$.is-object')
  , setToStringTag = _dereq_('./$.set-to-string-tag')
  , DESCRIPTORS    = _dereq_('./$.descriptors');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
  } else {
    C = wrapper(function(target, iterable){
      strictNew(target, C, NAME);
      target._c = new Base;
      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
    });
    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','),function(KEY){
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    if('size' in proto)$.setDesc(C.prototype, 'size', {
      get: function(){
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./$":98,"./$.descriptors":82,"./$.export":83,"./$.fails":84,"./$.for-of":85,"./$.global":86,"./$.hide":88,"./$.is-object":92,"./$.redefine-all":102,"./$.set-to-string-tag":106,"./$.strict-new":108}],79:[function(_dereq_,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],80:[function(_dereq_,module,exports){
// optional / simple context binding
var aFunction = _dereq_('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":68}],81:[function(_dereq_,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],82:[function(_dereq_,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !_dereq_('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":84}],83:[function(_dereq_,module,exports){
var global    = _dereq_('./$.global')
  , core      = _dereq_('./$.core')
  , ctx       = _dereq_('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":79,"./$.ctx":80,"./$.global":86}],84:[function(_dereq_,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],85:[function(_dereq_,module,exports){
var ctx         = _dereq_('./$.ctx')
  , call        = _dereq_('./$.iter-call')
  , isArrayIter = _dereq_('./$.is-array-iter')
  , anObject    = _dereq_('./$.an-object')
  , toLength    = _dereq_('./$.to-length')
  , getIterFn   = _dereq_('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that){
  var iterFn = getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./$.an-object":70,"./$.ctx":80,"./$.is-array-iter":90,"./$.iter-call":93,"./$.to-length":112,"./core.get-iterator-method":116}],86:[function(_dereq_,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],87:[function(_dereq_,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],88:[function(_dereq_,module,exports){
var $          = _dereq_('./$')
  , createDesc = _dereq_('./$.property-desc');
module.exports = _dereq_('./$.descriptors') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":98,"./$.descriptors":82,"./$.property-desc":101}],89:[function(_dereq_,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = _dereq_('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":74}],90:[function(_dereq_,module,exports){
// check on default Array iterator
var Iterators  = _dereq_('./$.iterators')
  , ITERATOR   = _dereq_('./$.wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./$.iterators":97,"./$.wks":115}],91:[function(_dereq_,module,exports){
// 7.2.2 IsArray(argument)
var cof = _dereq_('./$.cof');
module.exports = Array.isArray || function(arg){
  return cof(arg) == 'Array';
};
},{"./$.cof":74}],92:[function(_dereq_,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],93:[function(_dereq_,module,exports){
// call something on iterator step with safe closing on error
var anObject = _dereq_('./$.an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./$.an-object":70}],94:[function(_dereq_,module,exports){
'use strict';
var $              = _dereq_('./$')
  , descriptor     = _dereq_('./$.property-desc')
  , setToStringTag = _dereq_('./$.set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_dereq_('./$.hide')(IteratorPrototype, _dereq_('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./$":98,"./$.hide":88,"./$.property-desc":101,"./$.set-to-string-tag":106,"./$.wks":115}],95:[function(_dereq_,module,exports){
'use strict';
var LIBRARY        = _dereq_('./$.library')
  , $export        = _dereq_('./$.export')
  , redefine       = _dereq_('./$.redefine')
  , hide           = _dereq_('./$.hide')
  , has            = _dereq_('./$.has')
  , Iterators      = _dereq_('./$.iterators')
  , $iterCreate    = _dereq_('./$.iter-create')
  , setToStringTag = _dereq_('./$.set-to-string-tag')
  , getProto       = _dereq_('./$').getProto
  , ITERATOR       = _dereq_('./$.wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , methods, key;
  // Fix native
  if($native){
    var IteratorPrototype = getProto($default.call(new Base));
    // Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    // fix Array#{values, @@iterator}.name in V8 / FF
    if(DEF_VALUES && $native.name !== VALUES){
      VALUES_BUG = true;
      $default = function values(){ return $native.call(this); };
    }
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES  ? $default : getMethod(VALUES),
      keys:    IS_SET      ? $default : getMethod(KEYS),
      entries: !DEF_VALUES ? $default : getMethod('entries')
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./$":98,"./$.export":83,"./$.has":87,"./$.hide":88,"./$.iter-create":94,"./$.iterators":97,"./$.library":99,"./$.redefine":103,"./$.set-to-string-tag":106,"./$.wks":115}],96:[function(_dereq_,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],97:[function(_dereq_,module,exports){
module.exports = {};
},{}],98:[function(_dereq_,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],99:[function(_dereq_,module,exports){
module.exports = true;
},{}],100:[function(_dereq_,module,exports){
// most Object methods by ES6 should accept primitives
var $export = _dereq_('./$.export')
  , core    = _dereq_('./$.core')
  , fails   = _dereq_('./$.fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./$.core":79,"./$.export":83,"./$.fails":84}],101:[function(_dereq_,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],102:[function(_dereq_,module,exports){
var redefine = _dereq_('./$.redefine');
module.exports = function(target, src){
  for(var key in src)redefine(target, key, src[key]);
  return target;
};
},{"./$.redefine":103}],103:[function(_dereq_,module,exports){
module.exports = _dereq_('./$.hide');
},{"./$.hide":88}],104:[function(_dereq_,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = _dereq_('./$').getDesc
  , isObject = _dereq_('./$.is-object')
  , anObject = _dereq_('./$.an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = _dereq_('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./$":98,"./$.an-object":70,"./$.ctx":80,"./$.is-object":92}],105:[function(_dereq_,module,exports){
'use strict';
var core        = _dereq_('./$.core')
  , $           = _dereq_('./$')
  , DESCRIPTORS = _dereq_('./$.descriptors')
  , SPECIES     = _dereq_('./$.wks')('species');

module.exports = function(KEY){
  var C = core[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":98,"./$.core":79,"./$.descriptors":82,"./$.wks":115}],106:[function(_dereq_,module,exports){
var def = _dereq_('./$').setDesc
  , has = _dereq_('./$.has')
  , TAG = _dereq_('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./$":98,"./$.has":87,"./$.wks":115}],107:[function(_dereq_,module,exports){
var global = _dereq_('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":86}],108:[function(_dereq_,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],109:[function(_dereq_,module,exports){
var toInteger = _dereq_('./$.to-integer')
  , defined   = _dereq_('./$.defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$.defined":81,"./$.to-integer":110}],110:[function(_dereq_,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],111:[function(_dereq_,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = _dereq_('./$.iobject')
  , defined = _dereq_('./$.defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./$.defined":81,"./$.iobject":89}],112:[function(_dereq_,module,exports){
// 7.1.15 ToLength
var toInteger = _dereq_('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":110}],113:[function(_dereq_,module,exports){
// 7.1.13 ToObject(argument)
var defined = _dereq_('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":81}],114:[function(_dereq_,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],115:[function(_dereq_,module,exports){
var store  = _dereq_('./$.shared')('wks')
  , uid    = _dereq_('./$.uid')
  , Symbol = _dereq_('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"./$.global":86,"./$.shared":107,"./$.uid":114}],116:[function(_dereq_,module,exports){
var classof   = _dereq_('./$.classof')
  , ITERATOR  = _dereq_('./$.wks')('iterator')
  , Iterators = _dereq_('./$.iterators');
module.exports = _dereq_('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./$.classof":73,"./$.core":79,"./$.iterators":97,"./$.wks":115}],117:[function(_dereq_,module,exports){
var anObject = _dereq_('./$.an-object')
  , get      = _dereq_('./core.get-iterator-method');
module.exports = _dereq_('./$.core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./$.an-object":70,"./$.core":79,"./core.get-iterator-method":116}],118:[function(_dereq_,module,exports){
'use strict';
var addToUnscopables = _dereq_('./$.add-to-unscopables')
  , step             = _dereq_('./$.iter-step')
  , Iterators        = _dereq_('./$.iterators')
  , toIObject        = _dereq_('./$.to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = _dereq_('./$.iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./$.add-to-unscopables":69,"./$.iter-define":95,"./$.iter-step":96,"./$.iterators":97,"./$.to-iobject":111}],119:[function(_dereq_,module,exports){
'use strict';
var strong = _dereq_('./$.collection-strong');

// 23.1 Map Objects
_dereq_('./$.collection')('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"./$.collection":78,"./$.collection-strong":75}],120:[function(_dereq_,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = _dereq_('./$.is-object');

_dereq_('./$.object-sap')('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(it) : it;
  };
});
},{"./$.is-object":92,"./$.object-sap":100}],121:[function(_dereq_,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = _dereq_('./$.to-iobject');

_dereq_('./$.object-sap')('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./$.object-sap":100,"./$.to-iobject":111}],122:[function(_dereq_,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = _dereq_('./$.to-object');

_dereq_('./$.object-sap')('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./$.object-sap":100,"./$.to-object":113}],123:[function(_dereq_,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = _dereq_('./$.export');
$export($export.S, 'Object', {setPrototypeOf: _dereq_('./$.set-proto').set});
},{"./$.export":83,"./$.set-proto":104}],124:[function(_dereq_,module,exports){
arguments[4][58][0].apply(exports,arguments)
},{"dup":58}],125:[function(_dereq_,module,exports){
'use strict';
var $at  = _dereq_('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
_dereq_('./$.iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./$.iter-define":95,"./$.string-at":109}],126:[function(_dereq_,module,exports){
'use strict';
var $            = _dereq_('./$')
  , redefine     = _dereq_('./$.redefine')
  , weak         = _dereq_('./$.collection-weak')
  , isObject     = _dereq_('./$.is-object')
  , has          = _dereq_('./$.has')
  , frozenStore  = weak.frozenStore
  , WEAK         = weak.WEAK
  , isExtensible = Object.isExtensible || isObject
  , tmp          = {};

// 23.3 WeakMap Objects
var $WeakMap = _dereq_('./$.collection')('WeakMap', function(get){
  return function WeakMap(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      if(!isExtensible(key))return frozenStore(this).get(key);
      if(has(key, WEAK))return key[WEAK][this._i];
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
}, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  $.each.call(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on leaky map
      if(isObject(a) && !isExtensible(a)){
        var result = frozenStore(this)[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"./$":98,"./$.collection":78,"./$.collection-weak":77,"./$.has":87,"./$.is-object":92,"./$.redefine":103}],127:[function(_dereq_,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = _dereq_('./$.export');

$export($export.P, 'Map', {toJSON: _dereq_('./$.collection-to-json')('Map')});
},{"./$.collection-to-json":76,"./$.export":83}],128:[function(_dereq_,module,exports){
_dereq_('./es6.array.iterator');
var Iterators = _dereq_('./$.iterators');
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
},{"./$.iterators":97,"./es6.array.iterator":118}],129:[function(_dereq_,module,exports){
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

},{}]},{},[10])(10)
});