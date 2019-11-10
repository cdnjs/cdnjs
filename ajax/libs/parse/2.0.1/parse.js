/**
 * Parse JavaScript SDK v2.0.1
 *
 * The source tree of this library can be found at
 *   https://github.com/ParsePlatform/Parse-SDK-JS
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Parse = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.track = track;

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Parse.Analytics provides an interface to Parse's logging and analytics
 * backend.
 *
 * @class Parse.Analytics
 * @static
 * @hideconstructor
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
 * @name Parse.Analytics.track
 * @param {String} name The name of the custom event to report to Parse as
 * having happened.
 * @param {Object} dimensions The dictionary of information by which to
 * segment this event.
 * @param {Object} options
 * @return {Promise} A promise that is resolved when the round-trip
 * to the server completes.
 */
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
  return _CoreManager2.default.getAnalyticsController().track(name, dimensions);
} /**
   * Copyright (c) 2015-present, Parse, LLC.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * 
   */

var DefaultController = {
  track: function (name, dimensions) {
    var RESTController = _CoreManager2.default.getRESTController();
    return RESTController.request('POST', 'events/' + name, { dimensions: dimensions });
  }
};

_CoreManager2.default.setAnalyticsController(DefaultController);
},{"./CoreManager":3}],2:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = _dereq_('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.run = run;
exports.getJobsData = getJobsData;
exports.startJob = startJob;
exports.getJobStatus = getJobStatus;

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _decode = _dereq_('./decode');

var _decode2 = _interopRequireDefault(_decode);

var _encode = _dereq_('./encode');

var _encode2 = _interopRequireDefault(_encode);

var _ParseError = _dereq_('./ParseError');

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParseQuery = _dereq_('./ParseQuery');

var _ParseQuery2 = _interopRequireDefault(_ParseQuery);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Contains functions for calling and declaring
 * <a href="/docs/cloud_code_guide#functions">cloud functions</a>.
 * <p><strong><em>
 *   Some functions are only available from Cloud Code.
 * </em></strong></p>
 *
 * @class Parse.Cloud
 * @static
 * @hideconstructor
 */

/**
 * Makes a call to a cloud function.
 * @method run
 * @name Parse.Cloud.run
 * @param {String} name The function name.
 * @param {Object} data The parameters to send to the cloud function.
 * @param {Object} options
 * @return {Promise} A promise that will be resolved with the result
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

  return _CoreManager2.default.getCloudController().run(name, data, requestOptions);
}

/**
 * Gets data for the current set of cloud jobs.
 * @method getJobsData
 * @name Parse.Cloud.getJobsData
 * @param {Object} options
 * @return {Promise} A promise that will be resolved with the result
 * of the function.
 */
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

function getJobsData(options) {
  options = options || {};

  return _CoreManager2.default.getCloudController().getJobsData({
    useMasterKey: true
  });
}

/**
 * Starts a given cloud job, which will process asynchronously.
 * @method startJob
 * @name Parse.Cloud.startJob
 * @param {String} name The function name.
 * @param {Object} data The parameters to send to the cloud function.
 * @param {Object} options
 * @return {Promise} A promise that will be resolved with the result
 * of the function.
 */
function startJob(name, data, options) {
  options = options || {};

  if (typeof name !== 'string' || name.length === 0) {
    throw new TypeError('Cloud job name must be a string.');
  }

  return _CoreManager2.default.getCloudController().startJob(name, data, {
    useMasterKey: true
  });
}

/**
 * Gets job status by Id
 * @method getJobStatus
 * @name Parse.Cloud.getJobStatus
 * @param {String} jobStatusId The Id of Job Status.
 * @return {Parse.Object} Status of Job.
 */
function getJobStatus(jobStatusId) {
  var query = new _ParseQuery2.default('_JobStatus');
  return query.get(jobStatusId, { useMasterKey: true });
}

var DefaultController = {
  run: function (name, data, options) {
    var RESTController = _CoreManager2.default.getRESTController();

    var payload = (0, _encode2.default)(data, true);

    var request = RESTController.request('POST', 'functions/' + name, payload, options);

    return request.then(function (res) {
      var decoded = (0, _decode2.default)(res);
      if (decoded && decoded.hasOwnProperty('result')) {
        return _promise2.default.resolve(decoded.result);
      }
      throw new _ParseError2.default(_ParseError2.default.INVALID_JSON, 'The server returned an invalid response.');
    });
  },
  getJobsData: function (options) {
    var RESTController = _CoreManager2.default.getRESTController();

    return RESTController.request('GET', 'cloud_code/jobs/data', null, options);
  },
  startJob: function (name, data, options) {
    var RESTController = _CoreManager2.default.getRESTController();

    var payload = (0, _encode2.default)(data, true);

    return RESTController.request('POST', 'jobs/' + name, payload, options);
  }
};

_CoreManager2.default.setCloudController(DefaultController);
},{"./CoreManager":3,"./ParseError":13,"./ParseQuery":21,"./decode":36,"./encode":37,"babel-runtime/core-js/promise":55}],3:[function(_dereq_,module,exports){
(function (process){
'use strict';

/*
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

var config = {
  // Defaults
  IS_NODE: typeof process !== 'undefined' && !!process.versions && !!process.versions.node && !process.versions.electron,
  REQUEST_ATTEMPT_LIMIT: 5,
  SERVER_URL: 'https://api.parse.com/1',
  LIVEQUERY_SERVER_URL: null,
  VERSION: 'js' + '2.0.1',
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
  get: function (key) {
    if (config.hasOwnProperty(key)) {
      return config[key];
    }
    throw new Error('Configuration key not found: ' + key);
  },

  set: function (key, value) {
    config[key] = value;
  },

  /* Specialized Controller Setters/Getters */

  setAnalyticsController: function (controller) {
    requireMethods('AnalyticsController', ['track'], controller);
    config['AnalyticsController'] = controller;
  },
  getAnalyticsController: function () {
    return config['AnalyticsController'];
  },
  setCloudController: function (controller) {
    requireMethods('CloudController', ['run', 'getJobsData', 'startJob'], controller);
    config['CloudController'] = controller;
  },
  getCloudController: function () {
    return config['CloudController'];
  },
  setConfigController: function (controller) {
    requireMethods('ConfigController', ['current', 'get'], controller);
    config['ConfigController'] = controller;
  },
  getConfigController: function () {
    return config['ConfigController'];
  },
  setFileController: function (controller) {
    requireMethods('FileController', ['saveFile', 'saveBase64'], controller);
    config['FileController'] = controller;
  },
  getFileController: function () {
    return config['FileController'];
  },
  setInstallationController: function (controller) {
    requireMethods('InstallationController', ['currentInstallationId'], controller);
    config['InstallationController'] = controller;
  },
  getInstallationController: function () {
    return config['InstallationController'];
  },
  setObjectController: function (controller) {
    requireMethods('ObjectController', ['save', 'fetch', 'destroy'], controller);
    config['ObjectController'] = controller;
  },
  getObjectController: function () {
    return config['ObjectController'];
  },
  setObjectStateController: function (controller) {
    requireMethods('ObjectStateController', ['getState', 'initializeState', 'removeState', 'getServerData', 'setServerData', 'getPendingOps', 'setPendingOp', 'pushPendingState', 'popPendingState', 'mergeFirstPendingState', 'getObjectCache', 'estimateAttribute', 'estimateAttributes', 'commitServerChanges', 'enqueueTask', 'clearAllState'], controller);

    config['ObjectStateController'] = controller;
  },
  getObjectStateController: function () {
    return config['ObjectStateController'];
  },
  setPushController: function (controller) {
    requireMethods('PushController', ['send'], controller);
    config['PushController'] = controller;
  },
  getPushController: function () {
    return config['PushController'];
  },
  setQueryController: function (controller) {
    requireMethods('QueryController', ['find', 'aggregate'], controller);
    config['QueryController'] = controller;
  },
  getQueryController: function () {
    return config['QueryController'];
  },
  setRESTController: function (controller) {
    requireMethods('RESTController', ['request', 'ajax'], controller);
    config['RESTController'] = controller;
  },
  getRESTController: function () {
    return config['RESTController'];
  },
  setSchemaController: function (controller) {
    requireMethods('SchemaController', ['get', 'create', 'update', 'delete', 'send', 'purge'], controller);
    config['SchemaController'] = controller;
  },
  getSchemaController: function () {
    return config['SchemaController'];
  },
  setSessionController: function (controller) {
    requireMethods('SessionController', ['getSession'], controller);
    config['SessionController'] = controller;
  },
  getSessionController: function () {
    return config['SessionController'];
  },
  setStorageController: function (controller) {
    if (controller.async) {
      requireMethods('An async StorageController', ['getItemAsync', 'setItemAsync', 'removeItemAsync'], controller);
    } else {
      requireMethods('A synchronous StorageController', ['getItem', 'setItem', 'removeItem'], controller);
    }
    config['StorageController'] = controller;
  },
  getStorageController: function () {
    return config['StorageController'];
  },
  setAsyncStorage: function (storage) {
    config['AsyncStorage'] = storage;
  },
  getAsyncStorage: function () {
    return config['AsyncStorage'];
  },
  setUserController: function (controller) {
    requireMethods('UserController', ['setCurrentUser', 'currentUser', 'currentUserAsync', 'signUp', 'logIn', 'become', 'logOut', 'requestPasswordReset', 'upgradeToRevocableSession', 'linkWith'], controller);
    config['UserController'] = controller;
  },
  getUserController: function () {
    return config['UserController'];
  },
  setLiveQueryController: function (controller) {
    requireMethods('LiveQueryController', ['subscribe', 'unsubscribe', 'open', 'close'], controller);
    config['LiveQueryController'] = controller;
  },
  getLiveQueryController: function () {
    return config['LiveQueryController'];
  },
  setHooksController: function (controller) {
    requireMethods('HooksController', ['create', 'get', 'update', 'remove'], controller);
    config['HooksController'] = controller;
  },
  getHooksController: function () {
    return config['HooksController'];
  }
};
}).call(this,_dereq_('_process'))
},{"_process":65}],4:[function(_dereq_,module,exports){
'use strict';

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

module.exports = _dereq_('events').EventEmitter;
var EventEmitter;
},{"events":179}],5:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parseDate = _dereq_('./parseDate');

var _parseDate2 = _interopRequireDefault(_parseDate);

var _ParseUser = _dereq_('./ParseUser');

var _ParseUser2 = _interopRequireDefault(_ParseUser);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

var PUBLIC_KEY = "*";

var initialized = false;
var requestedPermissions;
var initOptions;
var provider = {
  authenticate: function (options) {
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
  restoreAuthentication: function (authData) {
    if (authData) {
      var expiration = (0, _parseDate2.default)(authData.expiration_date);
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
  getAuthType: function () {
    return 'facebook';
  },
  deauthenticate: function () {
    this.restoreAuthentication(null);
  }
};

/**
 * Provides a set of utilities for using Parse with Facebook.
 * @class Parse.FacebookUtils
 * @static
 * @hideconstructor
 */
var FacebookUtils = {
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
   * @name Parse.FacebookUtils.init
   * @param {Object} options Facebook options argument as described here:
   *   <a href=
   *   "https://developers.facebook.com/docs/reference/javascript/FB.init/">
   *   FB.init()</a>. The status flag will be coerced to 'false' because it
   *   interferes with Parse Facebook integration. Call FB.getLoginStatus()
   *   explicitly if this behavior is required by your application.
   */
  init: function (options) {
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
    _ParseUser2.default._registerAuthenticationProvider(provider);
    initialized = true;
  },

  /**
   * Gets whether the user has their account linked to Facebook.
   *
   * @method isLinked
   * @name Parse.FacebookUtils.isLinked
   * @param {Parse.User} user User to check for a facebook link.
   *     The user must be logged in on this device.
   * @return {Boolean} <code>true</code> if the user has their account
   *     linked to Facebook.
   */
  isLinked: function (user) {
    return user._isLinked('facebook');
  },

  /**
   * Logs in a user using Facebook. This method delegates to the Facebook
   * SDK to authenticate the user, and then automatically logs in (or
   * creates, in the case where it is a new user) a Parse.User.
   *
   * @method logIn
   * @name Parse.FacebookUtils.logIn
   * @param {(String|Object)} permissions The permissions required for Facebook
   *    log in.  This is a comma-separated string of permissions.
   *    Alternatively, supply a Facebook authData object as described in our
   *    REST API docs if you want to handle getting facebook auth tokens
   *    yourself.
   * @param {Object} options Standard options object with success and error
   *    callbacks.
   * @returns {Promise}
   */
  logIn: function (permissions, options) {
    if (!permissions || typeof permissions === 'string') {
      if (!initialized) {
        throw new Error('You must initialize FacebookUtils before calling logIn.');
      }
      requestedPermissions = permissions;
      return _ParseUser2.default._logInWith('facebook', options);
    } else {
      var newOptions = {};
      if (options) {
        for (var key in options) {
          newOptions[key] = options[key];
        }
      }
      newOptions.authData = permissions;
      return _ParseUser2.default._logInWith('facebook', newOptions);
    }
  },

  /**
   * Links Facebook to an existing PFUser. This method delegates to the
   * Facebook SDK to authenticate the user, and then automatically links
   * the account to the Parse.User.
   *
   * @method link
   * @name Parse.FacebookUtils.link
   * @param {Parse.User} user User to link to Facebook. This must be the
   *     current user.
   * @param {(String|Object)} permissions The permissions required for Facebook
   *    log in.  This is a comma-separated string of permissions.
   *    Alternatively, supply a Facebook authData object as described in our
   *    REST API docs if you want to handle getting facebook auth tokens
   *    yourself.
   * @param {Object} options Standard options object with success and error
   *    callbacks.
   * @returns {Promise}
   */
  link: function (user, permissions, options) {
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
   * @name Parse.FacebookUtils.unlink
   * @param {Parse.User} user User to unlink from Facebook. This must be the
   *     current user.
   * @param {Object} options Standard options object with success and error
   *    callbacks.
   * @returns {Promise}
   */
  unlink: function (user, options) {
    if (!initialized) {
      throw new Error('You must initialize FacebookUtils before calling unlink.');
    }
    return user._unlinkFrom('facebook', options);
  }
};

exports.default = FacebookUtils;
},{"./ParseUser":26,"./parseDate":41}],6:[function(_dereq_,module,exports){
'use strict';

var _promise = _dereq_('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _Storage = _dereq_('./Storage');

var _Storage2 = _interopRequireDefault(_Storage);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

var iidCache = null;

function hexOctet() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function generateId() {
  return hexOctet() + hexOctet() + '-' + hexOctet() + '-' + hexOctet() + '-' + hexOctet() + '-' + hexOctet() + hexOctet() + hexOctet();
}

var InstallationController = {
  currentInstallationId: function () {
    if (typeof iidCache === 'string') {
      return _promise2.default.resolve(iidCache);
    }
    var path = _Storage2.default.generatePath('installationId');
    return _Storage2.default.getItemAsync(path).then(function (iid) {
      if (!iid) {
        iid = generateId();
        return _Storage2.default.setItemAsync(path, iid).then(function () {
          iidCache = iid;
          return iid;
        });
      }
      iidCache = iid;
      return iid;
    });
  },
  _clearCache: function () {
    iidCache = null;
  },
  _setInstallationIdCache: function (iid) {
    iidCache = iid;
  }
};

module.exports = InstallationController;
},{"./CoreManager":3,"./Storage":30,"babel-runtime/core-js/promise":55}],7:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = _dereq_('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = _dereq_('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _map = _dereq_('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = _dereq_('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = _dereq_('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = _dereq_('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _EventEmitter2 = _dereq_('./EventEmitter');

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _LiveQuerySubscription = _dereq_('./LiveQuerySubscription');

var _LiveQuerySubscription2 = _interopRequireDefault(_LiveQuerySubscription);

var _promiseUtils = _dereq_('./promiseUtils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// The LiveQuery client inner state
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

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

var generateInterval = function (k) {
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
 * @alias Parse.LiveQueryClient
 */

var LiveQueryClient = function (_EventEmitter) {
  (0, _inherits3.default)(LiveQueryClient, _EventEmitter);

  /**
   * @param {Object} options
   * @param {string} options.applicationId - applicationId of your Parse app
   * @param {string} options.serverURL - <b>the URL of your LiveQuery server</b>
   * @param {string} options.javascriptKey (optional)
   * @param {string} options.masterKey (optional) Your Parse Master Key. (Node.js only!)
   * @param {string} options.sessionToken (optional)
   */
  function LiveQueryClient(_ref) {
    var applicationId = _ref.applicationId,
        serverURL = _ref.serverURL,
        javascriptKey = _ref.javascriptKey,
        masterKey = _ref.masterKey,
        sessionToken = _ref.sessionToken;
    (0, _classCallCheck3.default)(this, LiveQueryClient);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LiveQueryClient.__proto__ || (0, _getPrototypeOf2.default)(LiveQueryClient)).call(this));

    if (!serverURL || serverURL.indexOf('ws') !== 0) {
      throw new Error('You need to set a proper Parse LiveQuery server url before using LiveQueryClient');
    }

    _this.reconnectHandle = null;
    _this.attempts = 1;
    _this.id = 0;
    _this.requestId = 1;
    _this.serverURL = serverURL;
    _this.applicationId = applicationId;
    _this.javascriptKey = javascriptKey;
    _this.masterKey = masterKey;
    _this.sessionToken = sessionToken;
    _this.connectPromise = (0, _promiseUtils.resolvingPromise)();
    _this.subscriptions = new _map2.default();
    _this.state = CLIENT_STATE.INITIALIZED;
    return _this;
  }

  (0, _createClass3.default)(LiveQueryClient, [{
    key: 'shouldOpen',
    value: function () {
      return this.state === CLIENT_STATE.INITIALIZED || this.state === CLIENT_STATE.DISCONNECTED;
    }

    /**
     * Subscribes to a ParseQuery
     * 
     * If you provide the sessionToken, when the LiveQuery server gets ParseObject's 
     * updates from parse server, it'll try to check whether the sessionToken fulfills 
     * the ParseObject's ACL. The LiveQuery server will only send updates to clients whose 
     * sessionToken is fit for the ParseObject's ACL. You can check the LiveQuery protocol
     * <a href="https://github.com/parse-community/parse-server/wiki/Parse-LiveQuery-Protocol-Specification">here</a> for more details. The subscription you get is the same subscription you get 
     * from our Standard API.
     * 
     * @param {Object} query - the ParseQuery you want to subscribe to
     * @param {string} sessionToken (optional) 
     * @return {Object} subscription
     */

  }, {
    key: 'subscribe',
    value: function (query, sessionToken) {
      var _this2 = this;

      if (!query) {
        return;
      }
      var className = query.className;
      var queryJSON = query.toJSON();
      var where = queryJSON.where;
      var fields = queryJSON.keys ? queryJSON.keys.split(',') : undefined;
      var subscribeRequest = {
        op: OP_TYPES.SUBSCRIBE,
        requestId: this.requestId,
        query: {
          className: className,
          where: where,
          fields: fields
        }
      };

      if (sessionToken) {
        subscribeRequest.sessionToken = sessionToken;
      }

      var subscription = new _LiveQuerySubscription2.default(this.requestId, query, sessionToken);
      this.subscriptions.set(this.requestId, subscription);
      this.requestId += 1;
      this.connectPromise.then(function () {
        _this2.socket.send((0, _stringify2.default)(subscribeRequest));
      });

      // adding listener so process does not crash
      // best practice is for developer to register their own listener
      subscription.on('error', function () {});

      return subscription;
    }

    /**
     * After calling unsubscribe you'll stop receiving events from the subscription object.
     * 
     * @param {Object} subscription - subscription you would like to unsubscribe from.
     */

  }, {
    key: 'unsubscribe',
    value: function (subscription) {
      var _this3 = this;

      if (!subscription) {
        return;
      }

      this.subscriptions.delete(subscription.id);
      var unsubscribeRequest = {
        op: OP_TYPES.UNSUBSCRIBE,
        requestId: subscription.id
      };
      this.connectPromise.then(function () {
        _this3.socket.send((0, _stringify2.default)(unsubscribeRequest));
      });
    }

    /**
     * After open is called, the LiveQueryClient will try to send a connect request
     * to the LiveQuery server.
     * 
     */

  }, {
    key: 'open',
    value: function () {
      var _this4 = this;

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
        _this4._handleWebSocketOpen();
      };

      this.socket.onmessage = function (event) {
        _this4._handleWebSocketMessage(event);
      };

      this.socket.onclose = function () {
        _this4._handleWebSocketClose();
      };

      this.socket.onerror = function (error) {
        _this4._handleWebSocketError(error);
      };
    }
  }, {
    key: 'resubscribe',
    value: function () {
      var _this5 = this;

      this.subscriptions.forEach(function (subscription, requestId) {
        var query = subscription.query;
        var queryJSON = query.toJSON();
        var where = queryJSON.where;
        var fields = queryJSON.keys ? queryJSON.keys.split(',') : undefined;
        var className = query.className;
        var sessionToken = subscription.sessionToken;
        var subscribeRequest = {
          op: OP_TYPES.SUBSCRIBE,
          requestId: requestId,
          query: {
            className: className,
            where: where,
            fields: fields
          }
        };

        if (sessionToken) {
          subscribeRequest.sessionToken = sessionToken;
        }

        _this5.connectPromise.then(function () {
          _this5.socket.send((0, _stringify2.default)(subscribeRequest));
        });
      });
    }

    /**
     * This method will close the WebSocket connection to this LiveQueryClient, 
     * cancel the auto reconnect and unsubscribe all subscriptions based on it.
     * 
     */

  }, {
    key: 'close',
    value: function () {
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
        for (var _iterator = (0, _getIterator3.default)(this.subscriptions.values()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var subscription = _step.value;

          subscription.emit(SUBSCRIPTION_EMMITER_TYPES.CLOSE);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
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
    value: function () {
      return typeof WebSocket === 'function' || (typeof WebSocket === 'undefined' ? 'undefined' : (0, _typeof3.default)(WebSocket)) === 'object' ? WebSocket : null;
    }

    // ensure we start with valid state if connect is called again after close

  }, {
    key: '_handleReset',
    value: function () {
      this.attempts = 1;
      this.id = 0;
      this.requestId = 1;
      this.connectPromise = (0, _promiseUtils.resolvingPromise)();
      this.subscriptions = new _map2.default();
    }
  }, {
    key: '_handleWebSocketOpen',
    value: function () {
      this.attempts = 1;
      var connectRequest = {
        op: OP_TYPES.CONNECT,
        applicationId: this.applicationId,
        javascriptKey: this.javascriptKey,
        masterKey: this.masterKey,
        sessionToken: this.sessionToken
      };
      this.socket.send((0, _stringify2.default)(connectRequest));
    }
  }, {
    key: '_handleWebSocketMessage',
    value: function (event) {
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
          var parseObject = new _ParseObject2.default(className);
          parseObject._finishFetch(data.object);
          if (!subscription) {
            break;
          }
          subscription.emit(data.op, parseObject);
      }
    }
  }, {
    key: '_handleWebSocketClose',
    value: function () {
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
        for (var _iterator2 = (0, _getIterator3.default)(this.subscriptions.values()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var subscription = _step2.value;

          subscription.emit(SUBSCRIPTION_EMMITER_TYPES.CLOSE);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
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
    value: function (error) {
      this.emit(CLIENT_EMMITER_TYPES.ERROR, error);
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = (0, _getIterator3.default)(this.subscriptions.values()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var subscription = _step3.value;

          subscription.emit(SUBSCRIPTION_EMMITER_TYPES.ERROR);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
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
    value: function () {
      var _this6 = this;

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
      }

      this.reconnectHandle = setTimeout(function () {
        _this6.attempts++;
        _this6.connectPromise = (0, _promiseUtils.resolvingPromise)();
        _this6.open();
      }.bind(this), time);
    }
  }]);
  return LiveQueryClient;
}(_EventEmitter3.default);

exports.default = LiveQueryClient;
},{"./EventEmitter":4,"./LiveQuerySubscription":8,"./ParseObject":18,"./promiseUtils":42,"babel-runtime/core-js/get-iterator":45,"babel-runtime/core-js/json/stringify":46,"babel-runtime/core-js/map":47,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":59,"babel-runtime/helpers/createClass":60,"babel-runtime/helpers/inherits":62,"babel-runtime/helpers/possibleConstructorReturn":63,"babel-runtime/helpers/typeof":64}],8:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = _dereq_('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = _dereq_('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = _dereq_('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _EventEmitter2 = _dereq_('./EventEmitter');

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Creates a new LiveQuery Subscription.
 * Extends events.EventEmitter
 * <a href="https://nodejs.org/api/events.html#events_class_eventemitter">cloud functions</a>.
 * 
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
 * @alias Parse.LiveQuerySubscription
 */
/*
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var Subscription = function (_EventEmitter) {
  (0, _inherits3.default)(Subscription, _EventEmitter);

  /*
   * @param {string} id - subscription id
   * @param {string} query - query to subscribe to
   * @param {string} sessionToken - optional session token
   */
  function Subscription(id, query, sessionToken) {
    (0, _classCallCheck3.default)(this, Subscription);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Subscription.__proto__ || (0, _getPrototypeOf2.default)(Subscription)).call(this));

    _this.id = id;
    _this.query = query;
    _this.sessionToken = sessionToken;
    return _this;
  }

  /**
   * closes the subscription
   */

  (0, _createClass3.default)(Subscription, [{
    key: 'unsubscribe',
    value: function () {
      var _this2 = this;

      return _CoreManager2.default.getLiveQueryController().getDefaultLiveQueryClient().then(function (liveQueryClient) {
        liveQueryClient.unsubscribe(_this2);
        _this2.emit('close');
        _this2.resolve();
      });
    }
  }]);
  return Subscription;
}(_EventEmitter3.default);

exports.default = Subscription;
},{"./CoreManager":3,"./EventEmitter":4,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":59,"babel-runtime/helpers/createClass":60,"babel-runtime/helpers/inherits":62,"babel-runtime/helpers/possibleConstructorReturn":63}],9:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = _dereq_('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _ParseRelation = _dereq_('./ParseRelation');

var _ParseRelation2 = _interopRequireDefault(_ParseRelation);

var _TaskQueue = _dereq_('./TaskQueue');

var _TaskQueue2 = _interopRequireDefault(_TaskQueue);

var _ParseOp = _dereq_('./ParseOp');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

function defaultState() {
  return {
    serverData: {},
    pendingOps: [{}],
    objectCache: {},
    tasks: new _TaskQueue2.default(),
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
  var attr = void 0;
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
    if (val && (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object' && !(val instanceof _ParseObject2.default) && !(val instanceof _ParseFile2.default) && !(val instanceof _ParseRelation2.default)) {
      var json = (0, _encode2.default)(val, false, true);
      objectCache[_attr3] = (0, _stringify2.default)(json);
    }
  }
}
},{"./ParseFile":14,"./ParseObject":18,"./ParseOp":19,"./ParseRelation":22,"./TaskQueue":32,"./encode":37,"babel-runtime/core-js/json/stringify":46,"babel-runtime/helpers/typeof":64}],10:[function(_dereq_,module,exports){
'use strict';

var _promise = _dereq_('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Contains all Parse API classes and functions.
 * @static
 * @global
 * @class
 * @hideconstructor
 */
/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var Parse = {
  /**
   * Call this method first to set up your authentication tokens for Parse.
   * You can get your keys from the Data Browser on parse.com.
   * @param {String} applicationId Your Parse Application ID.
   * @param {String} javaScriptKey (optional) Your Parse JavaScript Key (Not needed for parse-server)
   * @param {String} masterKey (optional) Your Parse Master Key. (Node.js only!)
   * @static
   */
  initialize: function (applicationId, javaScriptKey) {
    if ('browser' === 'browser' && _CoreManager2.default.get('IS_NODE') && !undefined) {
      console.log('It looks like you\'re using the browser version of the SDK in a ' + 'node.js environment. You should require(\'parse/node\') instead.');
    }
    Parse._initialize(applicationId, javaScriptKey);
  },
  _initialize: function (applicationId, javaScriptKey, masterKey) {
    _CoreManager2.default.set('APPLICATION_ID', applicationId);
    _CoreManager2.default.set('JAVASCRIPT_KEY', javaScriptKey);
    _CoreManager2.default.set('MASTER_KEY', masterKey);
    _CoreManager2.default.set('USE_MASTER_KEY', false);
  },

  /**
   * Call this method to set your AsyncStorage engine
   * Starting Parse@1.11, the ParseSDK do not provide a React AsyncStorage as the ReactNative module
   * is not provided at a stable path and changes over versions.
   * @param {AsyncStorage} storage a react native async storage.
   * @static
   */
  setAsyncStorage: function (storage) {
    _CoreManager2.default.setAsyncStorage(storage);
  }
};

/** These legacy setters may eventually be deprecated **/
/** 
 * @member Parse.applicationId
 * @type string
 * @static
 */
Object.defineProperty(Parse, 'applicationId', {
  get: function () {
    return _CoreManager2.default.get('APPLICATION_ID');
  },
  set: function (value) {
    _CoreManager2.default.set('APPLICATION_ID', value);
  }
});

/** 
 * @member Parse.javaScriptKey
 * @type string
 * @static
 */
Object.defineProperty(Parse, 'javaScriptKey', {
  get: function () {
    return _CoreManager2.default.get('JAVASCRIPT_KEY');
  },
  set: function (value) {
    _CoreManager2.default.set('JAVASCRIPT_KEY', value);
  }
});

/** 
 * @member Parse.masterKey
 * @type string
 * @static
 */
Object.defineProperty(Parse, 'masterKey', {
  get: function () {
    return _CoreManager2.default.get('MASTER_KEY');
  },
  set: function (value) {
    _CoreManager2.default.set('MASTER_KEY', value);
  }
});

/** 
 * @member Parse.serverURL
 * @type string
 * @static
 */
Object.defineProperty(Parse, 'serverURL', {
  get: function () {
    return _CoreManager2.default.get('SERVER_URL');
  },
  set: function (value) {
    _CoreManager2.default.set('SERVER_URL', value);
  }
});
/** 
 * @member Parse.liveQueryServerURL
 * @type string
 * @static
 */
Object.defineProperty(Parse, 'liveQueryServerURL', {
  get: function () {
    return _CoreManager2.default.get('LIVEQUERY_SERVER_URL');
  },
  set: function (value) {
    _CoreManager2.default.set('LIVEQUERY_SERVER_URL', value);
  }
});
/* End setters */

Parse.ACL = _dereq_('./ParseACL').default;
Parse.Analytics = _dereq_('./Analytics');
Parse.Cloud = _dereq_('./Cloud');
Parse.CoreManager = _dereq_('./CoreManager');
Parse.Config = _dereq_('./ParseConfig').default;
Parse.Error = _dereq_('./ParseError').default;
Parse.FacebookUtils = _dereq_('./FacebookUtils').default;
Parse.File = _dereq_('./ParseFile').default;
Parse.GeoPoint = _dereq_('./ParseGeoPoint').default;
Parse.Polygon = _dereq_('./ParsePolygon').default;
Parse.Installation = _dereq_('./ParseInstallation').default;
Parse.Object = _dereq_('./ParseObject').default;
Parse.Op = {
  Set: ParseOp.SetOp,
  Unset: ParseOp.UnsetOp,
  Increment: ParseOp.IncrementOp,
  Add: ParseOp.AddOp,
  Remove: ParseOp.RemoveOp,
  AddUnique: ParseOp.AddUniqueOp,
  Relation: ParseOp.RelationOp
};
Promise = _promise2.default;
Parse.Push = _dereq_('./Push');
Parse.Query = _dereq_('./ParseQuery').default;
Parse.Relation = _dereq_('./ParseRelation').default;
Parse.Role = _dereq_('./ParseRole').default;
Parse.Schema = _dereq_('./ParseSchema').default;
Parse.Session = _dereq_('./ParseSession').default;
Parse.Storage = _dereq_('./Storage');
Parse.User = _dereq_('./ParseUser').default;
Parse.LiveQuery = _dereq_('./ParseLiveQuery').default;
Parse.LiveQueryClient = _dereq_('./LiveQueryClient').default;

Parse._request = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _CoreManager2.default.getRESTController().request.apply(null, args);
};
Parse._ajax = function () {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return _CoreManager2.default.getRESTController().ajax.apply(null, args);
};
// We attempt to match the signatures of the legacy versions of these methods
Parse._decode = function (_, value) {
  return (0, _decode2.default)(value);
};
Parse._encode = function (value, _, disallowObjects) {
  return (0, _encode2.default)(value, disallowObjects);
};
Parse._getInstallationId = function () {
  return _CoreManager2.default.getInstallationController().currentInstallationId();
};

_CoreManager2.default.setInstallationController(_InstallationController2.default);
_CoreManager2.default.setRESTController(_RESTController2.default);

// For legacy requires, of the form `var Parse = require('parse').Parse`
Parse.Parse = Parse;

module.exports = Parse;
},{"./Analytics":1,"./Cloud":2,"./CoreManager":3,"./FacebookUtils":5,"./InstallationController":6,"./LiveQueryClient":7,"./ParseACL":11,"./ParseConfig":12,"./ParseError":13,"./ParseFile":14,"./ParseGeoPoint":15,"./ParseInstallation":16,"./ParseLiveQuery":17,"./ParseObject":18,"./ParseOp":19,"./ParsePolygon":20,"./ParseQuery":21,"./ParseRelation":22,"./ParseRole":23,"./ParseSchema":24,"./ParseSession":25,"./ParseUser":26,"./Push":27,"./RESTController":28,"./Storage":30,"./decode":36,"./encode":37,"babel-runtime/core-js/promise":55}],11:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = _dereq_('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ParseRole = _dereq_('./ParseRole');

var _ParseRole2 = _interopRequireDefault(_ParseRole);

var _ParseUser = _dereq_('./ParseUser');

var _ParseUser2 = _interopRequireDefault(_ParseUser);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

var PUBLIC_KEY = '*';

/**
 * Creates a new ACL.
 * If no argument is given, the ACL has no permissions for anyone.
 * If the argument is a Parse.User, the ACL will have read and write
 *   permission for only that user.
 * If the argument is any other JSON object, that object will be interpretted
 *   as a serialized ACL created with toJSON().
 * 
 * <p>An ACL, or Access Control List can be added to any
 * <code>Parse.Object</code> to restrict access to only a subset of users
 * of your application.</p>
 * @alias Parse.ACL
 */

var ParseACL = function () {

  /**
   * @param {(Parse.User|Object)} user The user to initialize the ACL for
   */
  function ParseACL(arg1) {
    (0, _classCallCheck3.default)(this, ParseACL);

    this.permissionsById = {};
    if (arg1 && (typeof arg1 === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg1)) === 'object') {
      if (arg1 instanceof _ParseUser2.default) {
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
   * @return {Object}
   */

  (0, _createClass3.default)(ParseACL, [{
    key: 'toJSON',
    value: function () {
      var permissions = {};
      for (var p in this.permissionsById) {
        permissions[p] = this.permissionsById[p];
      }
      return permissions;
    }

    /**
     * Returns whether this ACL is equal to another object
     * @param other The other object to compare to
     * @return {Boolean}
     */

  }, {
    key: 'equals',
    value: function (other) {
      if (!(other instanceof ParseACL)) {
        return false;
      }
      var users = (0, _keys2.default)(this.permissionsById);
      var otherUsers = (0, _keys2.default)(other.permissionsById);
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
    value: function (accessType, userId, allowed) {
      if (userId instanceof _ParseUser2.default) {
        userId = userId.id;
      } else if (userId instanceof _ParseRole2.default) {
        var name = userId.getName();
        if (!name) {
          throw new TypeError('Role must have a name');
        }
        userId = 'role:' + name;
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
        if ((0, _keys2.default)(permissions).length === 0) {
          delete this.permissionsById[userId];
        }
      }
    }
  }, {
    key: '_getAccess',
    value: function (accessType, userId) {
      if (userId instanceof _ParseUser2.default) {
        userId = userId.id;
        if (!userId) {
          throw new Error('Cannot get access for a ParseUser without an ID');
        }
      } else if (userId instanceof _ParseRole2.default) {
        var name = userId.getName();
        if (!name) {
          throw new TypeError('Role must have a name');
        }
        userId = 'role:' + name;
      }
      var permissions = this.permissionsById[userId];
      if (!permissions) {
        return false;
      }
      return !!permissions[accessType];
    }

    /**
     * Sets whether the given user is allowed to read this object.
     * @param userId An instance of Parse.User or its objectId.
     * @param {Boolean} allowed Whether that user should have read access.
     */

  }, {
    key: 'setReadAccess',
    value: function (userId, allowed) {
      this._setAccess('read', userId, allowed);
    }

    /**
     * Get whether the given user id is *explicitly* allowed to read this object.
     * Even if this returns false, the user may still be able to access it if
     * getPublicReadAccess returns true or a role that the user belongs to has
     * write access.
     * @param userId An instance of Parse.User or its objectId, or a Parse.Role.
     * @return {Boolean}
     */

  }, {
    key: 'getReadAccess',
    value: function (userId) {
      return this._getAccess('read', userId);
    }

    /**
     * Sets whether the given user id is allowed to write this object.
     * @param userId An instance of Parse.User or its objectId, or a Parse.Role..
     * @param {Boolean} allowed Whether that user should have write access.
     */

  }, {
    key: 'setWriteAccess',
    value: function (userId, allowed) {
      this._setAccess('write', userId, allowed);
    }

    /**
     * Gets whether the given user id is *explicitly* allowed to write this object.
     * Even if this returns false, the user may still be able to write it if
     * getPublicWriteAccess returns true or a role that the user belongs to has
     * write access.
     * @param userId An instance of Parse.User or its objectId, or a Parse.Role.
     * @return {Boolean}
     */

  }, {
    key: 'getWriteAccess',
    value: function (userId) {
      return this._getAccess('write', userId);
    }

    /**
     * Sets whether the public is allowed to read this object.
     * @param {Boolean} allowed
     */

  }, {
    key: 'setPublicReadAccess',
    value: function (allowed) {
      this.setReadAccess(PUBLIC_KEY, allowed);
    }

    /**
     * Gets whether the public is allowed to read this object.
     * @return {Boolean}
     */

  }, {
    key: 'getPublicReadAccess',
    value: function () {
      return this.getReadAccess(PUBLIC_KEY);
    }

    /**
     * Sets whether the public is allowed to write this object.
     * @param {Boolean} allowed
     */

  }, {
    key: 'setPublicWriteAccess',
    value: function (allowed) {
      this.setWriteAccess(PUBLIC_KEY, allowed);
    }

    /**
     * Gets whether the public is allowed to write this object.
     * @return {Boolean}
     */

  }, {
    key: 'getPublicWriteAccess',
    value: function () {
      return this.getWriteAccess(PUBLIC_KEY);
    }

    /**
     * Gets whether users belonging to the given role are allowed
     * to read this object. Even if this returns false, the role may
     * still be able to write it if a parent role has read access.
     *
     * @param role The name of the role, or a Parse.Role object.
     * @return {Boolean} true if the role has read access. false otherwise.
     * @throws {TypeError} If role is neither a Parse.Role nor a String.
     */

  }, {
    key: 'getRoleReadAccess',
    value: function (role) {
      if (role instanceof _ParseRole2.default) {
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
     * @param role The name of the role, or a Parse.Role object.
     * @return {Boolean} true if the role has write access. false otherwise.
     * @throws {TypeError} If role is neither a Parse.Role nor a String.
     */

  }, {
    key: 'getRoleWriteAccess',
    value: function (role) {
      if (role instanceof _ParseRole2.default) {
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
     * @param role The name of the role, or a Parse.Role object.
     * @param {Boolean} allowed Whether the given role can read this object.
     * @throws {TypeError} If role is neither a Parse.Role nor a String.
     */

  }, {
    key: 'setRoleReadAccess',
    value: function (role, allowed) {
      if (role instanceof _ParseRole2.default) {
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
     * @param role The name of the role, or a Parse.Role object.
     * @param {Boolean} allowed Whether the given role can write this object.
     * @throws {TypeError} If role is neither a Parse.Role nor a String.
     */

  }, {
    key: 'setRoleWriteAccess',
    value: function (role, allowed) {
      if (role instanceof _ParseRole2.default) {
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
}();

exports.default = ParseACL;
},{"./ParseRole":23,"./ParseUser":26,"babel-runtime/core-js/object/keys":53,"babel-runtime/helpers/classCallCheck":59,"babel-runtime/helpers/createClass":60,"babel-runtime/helpers/typeof":64}],12:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = _dereq_('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = _dereq_('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

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

var _Storage = _dereq_('./Storage');

var _Storage2 = _interopRequireDefault(_Storage);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Parse.Config is a local representation of configuration data that
 * can be set from the Parse dashboard.
 *
 * @alias Parse.Config
 */

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

var ParseConfig = function () {
  function ParseConfig() {
    (0, _classCallCheck3.default)(this, ParseConfig);

    this.attributes = {};
    this._escapedAttributes = {};
  }

  /**
   * Gets the value of an attribute.
   * @param {String} attr The name of an attribute.
   */

  (0, _createClass3.default)(ParseConfig, [{
    key: 'get',
    value: function (attr) {
      return this.attributes[attr];
    }

    /**
     * Gets the HTML-escaped value of an attribute.
     * @param {String} attr The name of an attribute.
     */

  }, {
    key: 'escape',
    value: function (attr) {
      var html = this._escapedAttributes[attr];
      if (html) {
        return html;
      }
      var val = this.attributes[attr];
      var escaped = '';
      if (val != null) {
        escaped = (0, _escape3.default)(val.toString());
      }
      this._escapedAttributes[attr] = escaped;
      return escaped;
    }

    /**
     * Retrieves the most recently-fetched configuration object, either from
     * memory or from local storage if necessary.
     *
     * @static
     * @return {Config} The most recently-fetched Parse.Config if it
     *     exists, else an empty Parse.Config.
     */

  }], [{
    key: 'current',
    value: function () {
      var controller = _CoreManager2.default.getConfigController();
      return controller.current();
    }

    /**
     * Gets a new configuration object from the server.
     * @static
     * @param {Object} options
     * @return {Promise} A promise that is resolved with a newly-created
     *     configuration object when the get completes.
     */

  }, {
    key: 'get',
    value: function (options) {
      options = options || {};

      var controller = _CoreManager2.default.getConfigController();
      return controller.get();
    }
  }]);
  return ParseConfig;
}();

var currentConfig = null;

var CURRENT_CONFIG_KEY = 'currentConfig';

function decodePayload(data) {
  try {
    var json = JSON.parse(data);
    if (json && (typeof json === 'undefined' ? 'undefined' : (0, _typeof3.default)(json)) === 'object') {
      return (0, _decode2.default)(json);
    }
  } catch (e) {
    return null;
  }
}

var DefaultController = {
  current: function () {
    if (currentConfig) {
      return currentConfig;
    }

    var config = new ParseConfig();
    var storagePath = _Storage2.default.generatePath(CURRENT_CONFIG_KEY);
    var configData;
    if (!_Storage2.default.async()) {
      configData = _Storage2.default.getItem(storagePath);

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
    return _Storage2.default.getItemAsync(storagePath).then(function (configData) {
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
  get: function () {
    var RESTController = _CoreManager2.default.getRESTController();

    return RESTController.request('GET', 'config', {}, {}).then(function (response) {
      if (!response || !response.params) {
        var error = new _ParseError2.default(_ParseError2.default.INVALID_JSON, 'Config JSON response invalid.');
        return _promise2.default.reject(error);
      }

      var config = new ParseConfig();
      config.attributes = {};
      for (var attr in response.params) {
        config.attributes[attr] = (0, _decode2.default)(response.params[attr]);
      }
      currentConfig = config;
      return _Storage2.default.setItemAsync(_Storage2.default.generatePath(CURRENT_CONFIG_KEY), (0, _stringify2.default)(response.params)).then(function () {
        return config;
      });
    });
  }
};

_CoreManager2.default.setConfigController(DefaultController);

exports.default = ParseConfig;
},{"./CoreManager":3,"./ParseError":13,"./Storage":30,"./decode":36,"./encode":37,"./escape":39,"babel-runtime/core-js/json/stringify":46,"babel-runtime/core-js/promise":55,"babel-runtime/helpers/classCallCheck":59,"babel-runtime/helpers/createClass":60,"babel-runtime/helpers/typeof":64}],13:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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
 * @alias Parse.Error
 */
var ParseError = function () {
  /**
   * @param {Number} code An error code constant from <code>Parse.Error</code>.
   * @param {String} message A detailed description of the error.
   */
  function ParseError(code, message) {
    (0, _classCallCheck3.default)(this, ParseError);

    this.code = code;
    this.message = message;
  }

  (0, _createClass3.default)(ParseError, [{
    key: 'toString',
    value: function () {
      return 'ParseError: ' + this.code + ' ' + this.message;
    }
  }]);
  return ParseError;
}();

/**
 * Error code indicating some error other than those enumerated here.
 * @property OTHER_CAUSE
 * @static
 * @final
 */

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
 * Error code indicating an invalid operation occured on schema
 * @property INVALID_SCHEMA_OPERATION
 * @static
 * @final
 */
ParseError.INVALID_SCHEMA_OPERATION = 255;

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

exports.default = ParseError;
},{"babel-runtime/helpers/classCallCheck":59,"babel-runtime/helpers/createClass":60}],14:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var dataUriRegexp = /^data:([a-zA-Z]+\/[-a-zA-Z0-9+.]+)(;charset=[a-zA-Z0-9\-\/]*)?;base64,/; /**
                                                                                               * Copyright (c) 2015-present, Parse, LLC.
                                                                                               * All rights reserved.
                                                                                               *
                                                                                               * This source code is licensed under the BSD-style license found in the
                                                                                               * LICENSE file in the root directory of this source tree. An additional grant
                                                                                               * of patent rights can be found in the PATENTS file in the same directory.
                                                                                               *
                                                                                               * 
                                                                                               */

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
 * @alias Parse.File
 */

var ParseFile = function () {

  /**
   * @param name {String} The file's name. This will be prefixed by a unique
   *     value once the file has finished saving. The file name must begin with
   *     an alphanumeric character, and consist of alphanumeric characters,
   *     periods, spaces, underscores, or dashes.
   * @param data {Array} The data for the file, as either:
   *     1. an Array of byte value Numbers, or
   *     2. an Object like { base64: "..." } with a base64-encoded String.
   *     3. a File object selected with a file upload control. (3) only works
   *        in Firefox 3.6+, Safari 6.0.2+, Chrome 7+, and IE 10+.
   *        For example:
   * <pre>
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
  function ParseFile(name, data, type) {
    (0, _classCallCheck3.default)(this, ParseFile);

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
      } else if (data && typeof data.base64 === 'string') {
        var _base = data.base64;
        var commaIndex = _base.indexOf(',');

        if (commaIndex !== -1) {
          var matches = dataUriRegexp.exec(_base.slice(0, commaIndex + 1));
          // if data URI with type and charset, there will be 4 matches.
          this._source = {
            format: 'base64',
            base64: _base.slice(commaIndex + 1),
            type: matches[1]
          };
        } else {
          this._source = {
            format: 'base64',
            base64: _base,
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
   * @return {String}
   */

  (0, _createClass3.default)(ParseFile, [{
    key: 'name',
    value: function () {
      return this._name;
    }

    /**
     * Gets the url of the file. It is only available after you save the file or
     * after you get the file from a Parse.Object.
     * @param {Object} options An object to specify url options
     * @return {String}
     */

  }, {
    key: 'url',
    value: function (options) {
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
     * @param {Object} options
     * @return {Promise} Promise that is resolved when the save finishes.
     */

  }, {
    key: 'save',
    value: function (options) {
      var _this = this;

      options = options || {};
      var controller = _CoreManager2.default.getFileController();
      if (!this._previousSave) {
        if (this._source.format === 'file') {
          this._previousSave = controller.saveFile(this._name, this._source, options).then(function (res) {
            _this._name = res.name;
            _this._url = res.url;
            return _this;
          });
        } else {
          this._previousSave = controller.saveBase64(this._name, this._source, options).then(function (res) {
            _this._name = res.name;
            _this._url = res.url;
            return _this;
          });
        }
      }
      if (this._previousSave) {
        return this._previousSave;
      }
    }
  }, {
    key: 'toJSON',
    value: function () {
      return {
        __type: 'File',
        name: this._name,
        url: this._url
      };
    }
  }, {
    key: 'equals',
    value: function (other) {
      if (this === other) {
        return true;
      }
      // Unsaved Files are never equal, since they will be saved to different URLs
      return other instanceof ParseFile && this.name() === other.name() && this.url() === other.url() && typeof this.url() !== 'undefined';
    }
  }], [{
    key: 'fromJSON',
    value: function (obj) {
      if (obj.__type !== 'File') {
        throw new TypeError('JSON object does not represent a ParseFile');
      }
      var file = new ParseFile(obj.name);
      file._url = obj.url;
      return file;
    }
  }, {
    key: 'encodeBase64',
    value: function (bytes) {
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
}();

var DefaultController = {
  saveFile: function (name, source) {
    if (source.format !== 'file') {
      throw new Error('saveFile can only be used with File-type sources.');
    }
    // To directly upload a File, we use a REST-style AJAX request
    var headers = {
      'X-Parse-Application-ID': _CoreManager2.default.get('APPLICATION_ID'),
      'Content-Type': source.type || (source.file ? source.file.type : null)
    };
    var jsKey = _CoreManager2.default.get('JAVASCRIPT_KEY');
    if (jsKey) {
      headers['X-Parse-JavaScript-Key'] = jsKey;
    }
    var url = _CoreManager2.default.get('SERVER_URL');
    if (url[url.length - 1] !== '/') {
      url += '/';
    }
    url += 'files/' + name;
    return _CoreManager2.default.getRESTController().ajax('POST', url, source.file, headers).then(function (res) {
      return res.response;
    });
  },

  saveBase64: function (name, source, options) {
    if (source.format !== 'base64') {
      throw new Error('saveBase64 can only be used with Base64-type sources.');
    }
    var data = {
      base64: source.base64
    };
    if (source.type) {
      data._ContentType = source.type;
    }

    return _CoreManager2.default.getRESTController().request('POST', 'files/' + name, data, options);
  }
};

_CoreManager2.default.setFileController(DefaultController);

exports.default = ParseFile;
},{"./CoreManager":3,"babel-runtime/helpers/classCallCheck":59,"babel-runtime/helpers/createClass":60}],15:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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
 * Creates a new GeoPoint with any of the following forms:<br>
 *   <pre>
 *   new GeoPoint(otherGeoPoint)
 *   new GeoPoint(30, 30)
 *   new GeoPoint([30, 30])
 *   new GeoPoint({latitude: 30, longitude: 30})
 *   new GeoPoint()  // defaults to (0, 0)
 *   </pre>
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
 * @alias Parse.GeoPoint
 */
var ParseGeoPoint = function () {

  /**
   * @param {(Number[]|Object|Number)} options Either a list of coordinate pairs, an object with `latitude`, `longitude`, or the latitude or the point. 
   * @param {Number} longitude The longitude of the GeoPoint
   */
  function ParseGeoPoint(arg1, arg2) {
    (0, _classCallCheck3.default)(this, ParseGeoPoint);

    if (Array.isArray(arg1)) {
      ParseGeoPoint._validate(arg1[0], arg1[1]);
      this._latitude = arg1[0];
      this._longitude = arg1[1];
    } else if ((typeof arg1 === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg1)) === 'object') {
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

  (0, _createClass3.default)(ParseGeoPoint, [{
    key: 'toJSON',

    /**
     * Returns a JSON representation of the GeoPoint, suitable for Parse.
      * @return {Object}
     */
    value: function () {
      ParseGeoPoint._validate(this._latitude, this._longitude);
      return {
        __type: 'GeoPoint',
        latitude: this._latitude,
        longitude: this._longitude
      };
    }
  }, {
    key: 'equals',
    value: function (other) {
      return other instanceof ParseGeoPoint && this.latitude === other.latitude && this.longitude === other.longitude;
    }

    /**
     * Returns the distance from this GeoPoint to another in radians.
      * @param {Parse.GeoPoint} point the other Parse.GeoPoint.
     * @return {Number}
     */

  }, {
    key: 'radiansTo',
    value: function (point) {
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
      * @param {Parse.GeoPoint} point the other Parse.GeoPoint.
     * @return {Number}
     */

  }, {
    key: 'kilometersTo',
    value: function (point) {
      return this.radiansTo(point) * 6371.0;
    }

    /**
     * Returns the distance from this GeoPoint to another in miles.
      * @param {Parse.GeoPoint} point the other Parse.GeoPoint.
     * @return {Number}
     */

  }, {
    key: 'milesTo',
    value: function (point) {
      return this.radiansTo(point) * 3958.8;
    }

    /*
     * Throws an exception if the given lat-long is out of bounds.
     */

  }, {
    key: 'latitude',
    get: function () {
      return this._latitude;
    },
    set: function (val) {
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
    get: function () {
      return this._longitude;
    },
    set: function (val) {
      ParseGeoPoint._validate(this.latitude, val);
      this._longitude = val;
    }
  }], [{
    key: '_validate',
    value: function (latitude, longitude) {
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
      * @param {Object} options An object with success and error callbacks.
     * @static
     */

  }, {
    key: 'current',
    value: function () {
      return navigator.geolocation.getCurrentPosition(function (location) {
        return new ParseGeoPoint(location.coords.latitude, location.coords.longitude);
      });
    }
  }]);
  return ParseGeoPoint;
}();

exports.default = ParseGeoPoint;
},{"babel-runtime/helpers/classCallCheck":59,"babel-runtime/helpers/createClass":60,"babel-runtime/helpers/typeof":64}],16:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = _dereq_('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = _dereq_('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = _dereq_('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ParseObject2 = _dereq_('./ParseObject');

var _ParseObject3 = _interopRequireDefault(_ParseObject2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Installation = function (_ParseObject) {
  (0, _inherits3.default)(Installation, _ParseObject);

  function Installation(attributes) {
    (0, _classCallCheck3.default)(this, Installation);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Installation.__proto__ || (0, _getPrototypeOf2.default)(Installation)).call(this, '_Installation'));

    if (attributes && (typeof attributes === 'undefined' ? 'undefined' : (0, _typeof3.default)(attributes)) === 'object') {
      if (!_this.set(attributes || {})) {
        throw new Error('Can\'t create an invalid Session');
      }
    }
    return _this;
  }

  return Installation;
}(_ParseObject3.default); /**
                           * Copyright (c) 2015-present, Parse, LLC.
                           * All rights reserved.
                           *
                           * This source code is licensed under the BSD-style license found in the
                           * LICENSE file in the root directory of this source tree. An additional grant
                           * of patent rights can be found in the PATENTS file in the same directory.
                           *
                           * 
                           */

exports.default = Installation;

_ParseObject3.default.registerSubclass('_Installation', Installation);
},{"./ParseObject":18,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":59,"babel-runtime/helpers/inherits":62,"babel-runtime/helpers/possibleConstructorReturn":63,"babel-runtime/helpers/typeof":64}],17:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = _dereq_('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _EventEmitter = _dereq_('./EventEmitter');

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _LiveQueryClient = _dereq_('./LiveQueryClient');

var _LiveQueryClient2 = _interopRequireDefault(_LiveQueryClient);

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function open() {
  var LiveQueryController = _CoreManager2.default.getLiveQueryController();
  LiveQueryController.open();
} /**
   * Copyright (c) 2015-present, Parse, LLC.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * 
   */

function close() {
  var LiveQueryController = _CoreManager2.default.getLiveQueryController();
  LiveQueryController.close();
}

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
var LiveQuery = new _EventEmitter2.default();

/**
 * After open is called, the LiveQuery will try to send a connect request
 * to the LiveQuery server.
 * 

 */
LiveQuery.open = open;

/**
 * When you're done using LiveQuery, you can call Parse.LiveQuery.close().
 * This function will close the WebSocket connection to the LiveQuery server,
 * cancel the auto reconnect, and unsubscribe all subscriptions based on it.
 * If you call query.subscribe() after this, we'll create a new WebSocket
 * connection to the LiveQuery server.
 * 

 */

LiveQuery.close = close;
// Register a default onError callback to make sure we do not crash on error
LiveQuery.on('error', function () {});

exports.default = LiveQuery;

function getSessionToken() {
  var controller = _CoreManager2.default.getUserController();
  return controller.currentUserAsync().then(function (currentUser) {
    return currentUser ? currentUser.getSessionToken() : undefined;
  });
}

function getLiveQueryClient() {
  return _CoreManager2.default.getLiveQueryController().getDefaultLiveQueryClient();
}

var defaultLiveQueryClient = void 0;
var DefaultLiveQueryController = {
  setDefaultLiveQueryClient: function (liveQueryClient) {
    defaultLiveQueryClient = liveQueryClient;
  },
  getDefaultLiveQueryClient: function () {
    if (defaultLiveQueryClient) {
      return _promise2.default.resolve(defaultLiveQueryClient);
    }

    return getSessionToken().then(function (sessionToken) {
      var liveQueryServerURL = _CoreManager2.default.get('LIVEQUERY_SERVER_URL');

      if (liveQueryServerURL && liveQueryServerURL.indexOf('ws') !== 0) {
        throw new Error('You need to set a proper Parse LiveQuery server url before using LiveQueryClient');
      }

      // If we can not find Parse.liveQueryServerURL, we try to extract it from Parse.serverURL
      if (!liveQueryServerURL) {
        var tempServerURL = _CoreManager2.default.get('SERVER_URL');
        var protocol = 'ws://';
        // If Parse is being served over SSL/HTTPS, ensure LiveQuery Server uses 'wss://' prefix
        if (tempServerURL.indexOf('https') === 0) {
          protocol = 'wss://';
        }
        var host = tempServerURL.replace(/^https?:\/\//, '');
        liveQueryServerURL = protocol + host;
        _CoreManager2.default.set('LIVEQUERY_SERVER_URL', liveQueryServerURL);
      }

      var applicationId = _CoreManager2.default.get('APPLICATION_ID');
      var javascriptKey = _CoreManager2.default.get('JAVASCRIPT_KEY');
      var masterKey = _CoreManager2.default.get('MASTER_KEY');
      // Get currentUser sessionToken if possible
      defaultLiveQueryClient = new _LiveQueryClient2.default({
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
  open: function () {
    getLiveQueryClient().then(function (liveQueryClient) {
      return liveQueryClient.open();
    });
  },
  close: function () {
    getLiveQueryClient().then(function (liveQueryClient) {
      return liveQueryClient.close();
    });
  },
  subscribe: function (query) {
    var subscriptionWrap = new _EventEmitter2.default();

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
        subscription.on('close', function (object) {
          subscriptionWrap.emit('close', object);
        });
        subscription.on('error', function (object) {
          subscriptionWrap.emit('error', object);
        });
      });
    });
    return subscriptionWrap;
  },
  unsubscribe: function (subscription) {
    getLiveQueryClient().then(function (liveQueryClient) {
      return liveQueryClient.unsubscribe(subscription);
    });
  },
  _clearCachedDefaultClient: function () {
    defaultLiveQueryClient = null;
  }
};

_CoreManager2.default.setLiveQueryController(DefaultLiveQueryController);
},{"./CoreManager":3,"./EventEmitter":4,"./LiveQueryClient":7,"babel-runtime/core-js/promise":55}],18:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty = _dereq_('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _create = _dereq_('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _freeze = _dereq_('babel-runtime/core-js/object/freeze');

var _freeze2 = _interopRequireDefault(_freeze);

var _promise = _dereq_('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = _dereq_('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = _dereq_('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

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

var _promiseUtils = _dereq_('./promiseUtils');

var _ParseOp = _dereq_('./ParseOp');

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

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// Mapping of class names to constructors, so we can populate objects from the
// server with appropriate subclasses of ParseObject
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

var classMap = {};

// Global counter for generating unique local Ids
var localCount = 0;
// Global counter for generating unique Ids for non-single-instance objects
var objectCount = 0;
// On web clients, objects are single-instance: any two objects with the same Id
// will have the same attributes. However, this may be dangerous default
// behavior in a server scenario
var singleInstance = !_CoreManager2.default.get('IS_NODE');
if (singleInstance) {
  _CoreManager2.default.setObjectStateController(SingleInstanceStateController);
} else {
  _CoreManager2.default.setObjectStateController(UniqueInstanceStateController);
}

function getServerUrlPath() {
  var serverUrl = _CoreManager2.default.get('SERVER_URL');
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
 * @alias Parse.Object
 */

var ParseObject = function () {
  /**
   * @param {String} className The class name for the object
   * @param {Object} attributes The initial set of data to store in the object.
   * @param {Object} options The options for this object instance.
   */
  function ParseObject(className, attributes, options) {
    (0, _classCallCheck3.default)(this, ParseObject);

    // Enable legacy initializers
    if (typeof this.initialize === 'function') {
      this.initialize.apply(this, arguments);
    }

    var toSet = null;
    this._objCount = objectCount++;
    if (typeof className === 'string') {
      this.className = className;
      if (attributes && (typeof attributes === 'undefined' ? 'undefined' : (0, _typeof3.default)(attributes)) === 'object') {
        toSet = attributes;
      }
    } else if (className && (typeof className === 'undefined' ? 'undefined' : (0, _typeof3.default)(className)) === 'object') {
      this.className = className.className;
      toSet = {};
      for (var attr in className) {
        if (attr !== 'className') {
          toSet[attr] = className[attr];
        }
      }
      if (attributes && (typeof attributes === 'undefined' ? 'undefined' : (0, _typeof3.default)(attributes)) === 'object') {
        options = attributes;
      }
    }
    if (toSet && !this.set(toSet, options)) {
      throw new Error('Can\'t create an invalid Parse Object');
    }
  }

  /**
   * The ID of this object, unique within its class.
   * @property id
   * @type String
   */

  (0, _createClass3.default)(ParseObject, [{
    key: '_getId',

    /** Private methods **/

    /**
     * Returns a local or server Id used uniquely identify this object
     */
    value: function () {
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
    value: function () {
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
    value: function () {
      var stateController = _CoreManager2.default.getObjectStateController();
      return stateController.getServerData(this._getStateIdentifier());
    }
  }, {
    key: '_clearServerData',
    value: function () {
      var serverData = this._getServerData();
      var unset = {};
      for (var attr in serverData) {
        unset[attr] = undefined;
      }
      var stateController = _CoreManager2.default.getObjectStateController();
      stateController.setServerData(this._getStateIdentifier(), unset);
    }
  }, {
    key: '_getPendingOps',
    value: function () {
      var stateController = _CoreManager2.default.getObjectStateController();
      return stateController.getPendingOps(this._getStateIdentifier());
    }
  }, {
    key: '_clearPendingOps',
    value: function () {
      var pending = this._getPendingOps();
      var latest = pending[pending.length - 1];
      var keys = (0, _keys2.default)(latest);
      keys.forEach(function (key) {
        delete latest[key];
      });
    }
  }, {
    key: '_getDirtyObjectAttributes',
    value: function () {
      var attributes = this.attributes;
      var stateController = _CoreManager2.default.getObjectStateController();
      var objectCache = stateController.getObjectCache(this._getStateIdentifier());
      var dirty = {};
      for (var attr in attributes) {
        var val = attributes[attr];
        if (val && (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object' && !(val instanceof ParseObject) && !(val instanceof _ParseFile2.default) && !(val instanceof _ParseRelation2.default)) {
          // Due to the way browsers construct maps, the key order will not change
          // unless the object is changed
          try {
            var json = (0, _encode2.default)(val, false, true);
            var stringified = (0, _stringify2.default)(json);
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
    value: function (seen) {
      var json = this.toJSON(seen);
      json.__type = 'Object';
      json.className = this.className;
      return json;
    }
  }, {
    key: '_getSaveJSON',
    value: function () {
      var pending = this._getPendingOps();
      var dirtyObjects = this._getDirtyObjectAttributes();
      var json = {};

      for (var attr in dirtyObjects) {
        json[attr] = new _ParseOp.SetOp(dirtyObjects[attr]).toJSON();
      }
      for (attr in pending[0]) {
        json[attr] = pending[0][attr].toJSON();
      }
      return json;
    }
  }, {
    key: '_getSaveParams',
    value: function () {
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
    value: function (serverData) {
      if (!this.id && serverData.objectId) {
        this.id = serverData.objectId;
      }
      var stateController = _CoreManager2.default.getObjectStateController();
      stateController.initializeState(this._getStateIdentifier());
      var decoded = {};
      for (var attr in serverData) {
        if (attr === 'ACL') {
          decoded[attr] = new _ParseACL2.default(serverData[attr]);
        } else if (attr !== 'objectId') {
          decoded[attr] = (0, _decode2.default)(serverData[attr]);
          if (decoded[attr] instanceof _ParseRelation2.default) {
            decoded[attr]._ensureParentAndKey(this, attr);
          }
        }
      }
      if (decoded.createdAt && typeof decoded.createdAt === 'string') {
        decoded.createdAt = (0, _parseDate2.default)(decoded.createdAt);
      }
      if (decoded.updatedAt && typeof decoded.updatedAt === 'string') {
        decoded.updatedAt = (0, _parseDate2.default)(decoded.updatedAt);
      }
      if (!decoded.updatedAt && decoded.createdAt) {
        decoded.updatedAt = decoded.createdAt;
      }
      stateController.commitServerChanges(this._getStateIdentifier(), decoded);
    }
  }, {
    key: '_setExisted',
    value: function (existed) {
      var stateController = _CoreManager2.default.getObjectStateController();
      var state = stateController.getState(this._getStateIdentifier());
      if (state) {
        state.existed = existed;
      }
    }
  }, {
    key: '_migrateId',
    value: function (serverId) {
      if (this._localId && serverId) {
        if (singleInstance) {
          var stateController = _CoreManager2.default.getObjectStateController();
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
    value: function (response, status) {
      var changes = {};

      var stateController = _CoreManager2.default.getObjectStateController();
      var pending = stateController.popPendingState(this._getStateIdentifier());
      for (var attr in pending) {
        if (pending[attr] instanceof _ParseOp.RelationOp) {
          changes[attr] = pending[attr].applyTo(undefined, this, attr);
        } else if (!(attr in response)) {
          // Only SetOps and UnsetOps should not come back with results
          changes[attr] = pending[attr].applyTo(undefined);
        }
      }
      for (attr in response) {
        if ((attr === 'createdAt' || attr === 'updatedAt') && typeof response[attr] === 'string') {
          changes[attr] = (0, _parseDate2.default)(response[attr]);
        } else if (attr === 'ACL') {
          changes[attr] = new _ParseACL2.default(response[attr]);
        } else if (attr !== 'objectId') {
          changes[attr] = (0, _decode2.default)(response[attr]);
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
    value: function () {
      this._getPendingOps();

      var stateController = _CoreManager2.default.getObjectStateController();
      stateController.mergeFirstPendingState(this._getStateIdentifier());
    }

    /** Public methods **/

  }, {
    key: 'initialize',
    value: function () {}
    // NOOP


    /**
     * Returns a JSON version of the object suitable for saving to Parse.
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function (seen) {
      var seenEntry = this.id ? this.className + ':' + this.id : this;
      var seen = seen || [seenEntry];
      var json = {};
      var attrs = this.attributes;
      for (var attr in attrs) {
        if ((attr === 'createdAt' || attr === 'updatedAt') && attrs[attr].toJSON) {
          json[attr] = attrs[attr].toJSON();
        } else {
          json[attr] = (0, _encode2.default)(attrs[attr], false, false, seen);
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
     * @param {Object} other - An other object ot compare
     * @return {Boolean}
     */

  }, {
    key: 'equals',
    value: function (other) {
      if (this === other) {
        return true;
      }
      return other instanceof ParseObject && this.className === other.className && this.id === other.id && typeof this.id !== 'undefined';
    }

    /**
     * Returns true if this object has been modified since its last
     * save/refresh.  If an attribute is specified, it returns true only if that
     * particular attribute has been modified since the last save/refresh.
     * @param {String} attr An attribute name (optional).
     * @return {Boolean}
     */

  }, {
    key: 'dirty',
    value: function (attr) {
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
      if ((0, _keys2.default)(pendingOps[0]).length !== 0) {
        return true;
      }
      if ((0, _keys2.default)(dirtyObjects).length !== 0) {
        return true;
      }
      return false;
    }

    /**
     * Returns an array of keys that have been modified since last save/refresh
     * @return {String[]}
     */

  }, {
    key: 'dirtyKeys',
    value: function () {
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
      return (0, _keys2.default)(keys);
    }

    /**
     * Gets a Pointer referencing this Object.
     * @return {Pointer}
     */

  }, {
    key: 'toPointer',
    value: function () {
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
     * @param {String} attr The string name of an attribute.
     */

  }, {
    key: 'get',
    value: function (attr) {
      return this.attributes[attr];
    }

    /**
     * Gets a relation on the given class for the attribute.
     * @param String attr The attribute to get the relation for.
     * @return {Parse.Relation}
     */

  }, {
    key: 'relation',
    value: function (attr) {
      var value = this.get(attr);
      if (value) {
        if (!(value instanceof _ParseRelation2.default)) {
          throw new Error('Called relation() on non-relation field ' + attr);
        }
        value._ensureParentAndKey(this, attr);
        return value;
      }
      return new _ParseRelation2.default(this, attr);
    }

    /**
     * Gets the HTML-escaped value of an attribute.
     * @param {String} attr The string name of an attribute.
     */

  }, {
    key: 'escape',
    value: function (attr) {
      var val = this.attributes[attr];
      if (val == null) {
        return '';
      }

      if (typeof val !== 'string') {
        if (typeof val.toString !== 'function') {
          return '';
        }
        val = val.toString();
      }
      return (0, _escape3.default)(val);
    }

    /**
     * Returns <code>true</code> if the attribute contains a value that is not
     * null or undefined.
     * @param {String} attr The string name of the attribute.
     * @return {Boolean}
     */

  }, {
    key: 'has',
    value: function (attr) {
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
     * @param {String} key The key to set.
     * @param {} value The value to give it.
     * @param {Object} options A set of options for the set.
     *     The only supported option is <code>error</code>.
     * @return {Boolean} true if the set succeeded.
     */

  }, {
    key: 'set',
    value: function (key, value, options) {
      var changes = {};
      var newOps = {};
      if (key && (typeof key === 'undefined' ? 'undefined' : (0, _typeof3.default)(key)) === 'object') {
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
        } else if (changes[k] && (0, _typeof3.default)(changes[k]) === 'object' && typeof changes[k].__op === 'string') {
          newOps[k] = (0, _ParseOp.opFromJSON)(changes[k]);
        } else if (k === 'objectId' || k === 'id') {
          if (typeof changes[k] === 'string') {
            this.id = changes[k];
          }
        } else if (k === 'ACL' && (0, _typeof3.default)(changes[k]) === 'object' && !(changes[k] instanceof _ParseACL2.default)) {
          newOps[k] = new _ParseOp.SetOp(new _ParseACL2.default(changes[k]));
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
      var stateController = _CoreManager2.default.getObjectStateController();
      for (var attr in newOps) {
        var nextOp = newOps[attr].mergeWith(pendingOps[last][attr]);
        stateController.setPendingOp(this._getStateIdentifier(), attr, nextOp);
      }

      return this;
    }

    /**
     * Remove an attribute from the model. This is a noop if the attribute doesn't
     * exist.
     * @param {String} attr The string name of an attribute.
     */

  }, {
    key: 'unset',
    value: function (attr, options) {
      options = options || {};
      options.unset = true;
      return this.set(attr, null, options);
    }

    /**
     * Atomically increments the value of the given attribute the next time the
     * object is saved. If no amount is specified, 1 is used by default.
     *
     * @param attr {String} The key.
     * @param amount {Number} The amount to increment by (optional).
     */

  }, {
    key: 'increment',
    value: function (attr, amount) {
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
     * @param attr {String} The key.
     * @param item {} The item to add.
     * @return {(ParseObject|Boolean)}
     */

  }, {
    key: 'add',
    value: function (attr, item) {
      return this.set(attr, new _ParseOp.AddOp([item]));
    }

    /**
     * Atomically add the objects to the end of the array associated with a given
     * key.
     * @param attr {String} The key.
     * @param items {Object[]} The items to add.
     */

  }, {
    key: 'addAll',
    value: function (attr, items) {
      return this.set(attr, new _ParseOp.AddOp(items));
    }

    /**
     * Atomically add an object to the array associated with a given key, only
     * if it is not already present in the array. The position of the insert is
     * not guaranteed.
     *
     * @param attr {String} The key.
     * @param item {} The object to add.
     */

  }, {
    key: 'addUnique',
    value: function (attr, item) {
      return this.set(attr, new _ParseOp.AddUniqueOp([item]));
    }

    /**
     * Atomically add the objects to the array associated with a given key, only
     * if it is not already present in the array. The position of the insert is
     * not guaranteed.
     *
     * @param attr {String} The key.
     * @param items {Object[]} The objects to add.
     */

  }, {
    key: 'addAllUnique',
    value: function (attr, items) {
      return this.set(attr, new _ParseOp.AddUniqueOp(items));
    }

    /**
     * Atomically remove all instances of an object from the array associated
     * with a given key.
     *
     * @param attr {String} The key.
     * @param item {} The object to remove.
     */

  }, {
    key: 'remove',
    value: function (attr, item) {
      return this.set(attr, new _ParseOp.RemoveOp([item]));
    }

    /**
     * Atomically remove all instances of the objects from the array associated
     * with a given key.
     *
     * @param attr {String} The key.
     * @param items {Object[]} The object to remove.
     */

  }, {
    key: 'removeAll',
    value: function (attr, items) {
      return this.set(attr, new _ParseOp.RemoveOp(items));
    }

    /**
     * Returns an instance of a subclass of Parse.Op describing what kind of
     * modification has been performed on this field since the last time it was
     * saved. For example, after calling object.increment("x"), calling
     * object.op("x") would return an instance of Parse.Op.Increment.
     *
     * @param attr {String} The key.
     * @returns {Parse.Op} The operation, or undefined if none.
     */

  }, {
    key: 'op',
    value: function (attr) {
      var pending = this._getPendingOps();
      for (var i = pending.length; i--;) {
        if (pending[i][attr]) {
          return pending[i][attr];
        }
      }
    }

    /**
     * Creates a new model with identical attributes to this one.
     * @return {Parse.Object}
     */

  }, {
    key: 'clone',
    value: function () {
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
     * @return {Parse.Object}
     */

  }, {
    key: 'newInstance',
    value: function () {
      var clone = new this.constructor();
      if (!clone.className) {
        clone.className = this.className;
      }
      clone.id = this.id;
      if (singleInstance) {
        // Just return an object with the right id
        return clone;
      }

      var stateController = _CoreManager2.default.getObjectStateController();
      if (stateController) {
        stateController.duplicateState(this._getStateIdentifier(), clone._getStateIdentifier());
      }
      return clone;
    }

    /**
     * Returns true if this object has never been saved to Parse.
     * @return {Boolean}
     */

  }, {
    key: 'isNew',
    value: function () {
      return !this.id;
    }

    /**
     * Returns true if this object was created by the Parse server when the
     * object might have already been there (e.g. in the case of a Facebook
     * login)
     * @return {Boolean}
     */

  }, {
    key: 'existed',
    value: function () {
      if (!this.id) {
        return false;
      }
      var stateController = _CoreManager2.default.getObjectStateController();
      var state = stateController.getState(this._getStateIdentifier());
      if (state) {
        return state.existed;
      }
      return false;
    }

    /**
     * Checks if the model is currently in a valid state.
     * @return {Boolean}
     */

  }, {
    key: 'isValid',
    value: function () {
      return !this.validate(this.attributes);
    }

    /**
     * You should not call this function directly unless you subclass
     * <code>Parse.Object</code>, in which case you can override this method
     * to provide additional validation on <code>set</code> and
     * <code>save</code>.  Your implementation should return
     *
     * @param {Object} attrs The current data to validate.
     * @return {} False if the data is valid.  An error object otherwise.
     * @see Parse.Object#set
     */

  }, {
    key: 'validate',
    value: function (attrs) {
      if (attrs.hasOwnProperty('ACL') && !(attrs.ACL instanceof _ParseACL2.default)) {
        return new _ParseError2.default(_ParseError2.default.OTHER_CAUSE, 'ACL must be a Parse ACL.');
      }
      for (var key in attrs) {
        if (!/^[A-Za-z][0-9A-Za-z_]*$/.test(key)) {
          return new _ParseError2.default(_ParseError2.default.INVALID_KEY_NAME);
        }
      }
      return false;
    }

    /**
     * Returns the ACL for this object.
     * @returns {Parse.ACL} An instance of Parse.ACL.
     * @see Parse.Object#get
     */

  }, {
    key: 'getACL',
    value: function () {
      var acl = this.get('ACL');
      if (acl instanceof _ParseACL2.default) {
        return acl;
      }
      return null;
    }

    /**
     * Sets the ACL to be used for this object.
     * @param {Parse.ACL} acl An instance of Parse.ACL.
     * @param {Object} options
     * @return {Boolean} Whether the set passed validation.
     * @see Parse.Object#set
     */

  }, {
    key: 'setACL',
    value: function (acl, options) {
      return this.set('ACL', acl, options);
    }

    /**
     * Clears any changes to this object made since the last call to save()
     */

  }, {
    key: 'revert',
    value: function () {
      this._clearPendingOps();
    }

    /**
     * Clears all attributes on a model
     * @return {(ParseObject | boolean)}
     */

  }, {
    key: 'clear',
    value: function () {
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
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @return {Promise} A promise that is fulfilled when the fetch
     *     completes.
     */

  }, {
    key: 'fetch',
    value: function (options) {
      options = options || {};
      var fetchOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        fetchOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        fetchOptions.sessionToken = options.sessionToken;
      }
      var controller = _CoreManager2.default.getObjectController();
      return controller.fetch(this, true, fetchOptions);
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
     *   }).then(function(gameTurnAgain) {
     *     // The save was successful.
     *   }, function(error) {
     *     // The save failed.  Error is an instance of Parse.Error.
     *   });</pre>
     *
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @return {Promise} A promise that is fulfilled when the save
     *     completes.
     */

  }, {
    key: 'save',
    value: function (arg1, arg2, arg3) {
      var _this = this;

      var attrs;
      var options;
      if ((typeof arg1 === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg1)) === 'object' || typeof arg1 === 'undefined') {
        attrs = arg1;
        if ((typeof arg2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg2)) === 'object') {
          options = arg2;
        }
      } else {
        attrs = {};
        attrs[arg1] = arg2;
        options = arg3;
      }

      // TODO: safely remove me
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
          return _promise2.default.reject(validation);
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

      var controller = _CoreManager2.default.getObjectController();
      var unsaved = (0, _unsavedChildren2.default)(this);
      return controller.save(unsaved, saveOptions).then(function () {
        return controller.save(_this, saveOptions);
      });
    }

    /**
     * Destroy this model on the server if it was already persisted.
     * If `wait: true` is passed, waits for the server to respond
     * before removal.
     *
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @return {Promise} A promise that is fulfilled when the destroy
     *     completes.
     */

  }, {
    key: 'destroy',
    value: function (options) {
      options = options || {};
      var destroyOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        destroyOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        destroyOptions.sessionToken = options.sessionToken;
      }
      if (!this.id) {
        return _promise2.default.resolve();
      }
      return _CoreManager2.default.getObjectController().destroy(this, destroyOptions);
    }

    /** Static methods **/

  }, {
    key: 'attributes',

    /** Prototype getters / setters **/

    get: function () {
      var stateController = _CoreManager2.default.getObjectStateController();
      return (0, _freeze2.default)(stateController.estimateAttributes(this._getStateIdentifier()));
    }

    /**
     * The first time this object was saved on the server.
     * @property createdAt
     * @type Date
     */

  }, {
    key: 'createdAt',
    get: function () {
      return this._getServerData().createdAt;
    }

    /**
     * The last time this object was updated on the server.
     * @property updatedAt
     * @type Date
     */

  }, {
    key: 'updatedAt',
    get: function () {
      return this._getServerData().updatedAt;
    }
  }], [{
    key: '_clearAllState',
    value: function () {
      var stateController = _CoreManager2.default.getObjectStateController();
      stateController.clearAllState();
    }

    /**
     * Fetches the given list of Parse.Object.
     * If any error is encountered, stops and calls the error handler.
     *
     * <pre>
     *   Parse.Object.fetchAll([object1, object2, ...])
     *    .then((list) => {
     *      // All the objects were fetched.
     *    }, (error) => {
     *      // An error occurred while fetching one of the objects.
     *    });
     * </pre>
     *
     * @param {Array} list A list of <code>Parse.Object</code>.
     * @param {Object} options
     * @static
     */

  }, {
    key: 'fetchAll',
    value: function (list, options) {
      var options = options || {};

      var queryOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        queryOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        queryOptions.sessionToken = options.sessionToken;
      }
      return _CoreManager2.default.getObjectController().fetch(list, true, queryOptions);
    }

    /**
     * Fetches the given list of Parse.Object if needed.
     * If any error is encountered, stops and calls the error handler.
     *
     * <pre>
     *   Parse.Object.fetchAllIfNeeded([object1, ...])
     *    .then((list) => {
     *      // Objects were fetched and updated.
     *    }, (error) => {
     *      // An error occurred while fetching one of the objects.
     *    });
     * </pre>
     *
     * @param {Array} list A list of <code>Parse.Object</code>.
     * @param {Object} options
     * @static
     */

  }, {
    key: 'fetchAllIfNeeded',
    value: function (list, options) {
      var options = options || {};

      var queryOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        queryOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        queryOptions.sessionToken = options.sessionToken;
      }
      return _CoreManager2.default.getObjectController().fetch(list, false, queryOptions);
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
     *   Parse.Object.destroyAll([object1, object2, ...]) 
     *    .then((list) => {
     *      // All the objects were deleted.
     *    }, (error) => {
     *      // An error occurred while deleting one or more of the objects.
     *      // If this is an aggregate error, then we can inspect each error
     *      // object individually to determine the reason why a particular
     *      // object was not deleted.
     *      if (error.code === Parse.Error.AGGREGATE_ERROR) {
     *        for (var i = 0; i < error.errors.length; i++) {
     *          console.log("Couldn't delete " + error.errors[i].object.id +
     *            "due to " + error.errors[i].message);
     *        }
     *      } else {
     *        console.log("Delete aborted because of " + error.message);
     *      }
     *   });
     * </pre>
     *
     * @param {Array} list A list of <code>Parse.Object</code>.
     * @param {Object} options
     * @static
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @return {Promise} A promise that is fulfilled when the destroyAll
     *     completes.
     */

  }, {
    key: 'destroyAll',
    value: function (list, options) {
      var options = options || {};

      var destroyOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        destroyOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        destroyOptions.sessionToken = options.sessionToken;
      }
      return _CoreManager2.default.getObjectController().destroy(list, destroyOptions);
    }

    /**
     * Saves the given list of Parse.Object.
     * If any error is encountered, stops and calls the error handler.
     *
     * <pre>
     *   Parse.Object.saveAll([object1, object2, ...])
     *    .then((list) => {
     *       // All the objects were saved.
     *    }, (error) => {
     *       // An error occurred while saving one of the objects.
     *    });
     * </pre>
     *
     * @param {Array} list A list of <code>Parse.Object</code>.
     * @param {Object} options
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
    value: function (list, options) {
      var options = options || {};

      var saveOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        saveOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        saveOptions.sessionToken = options.sessionToken;
      }
      return _CoreManager2.default.getObjectController().save(list, saveOptions);
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
     * @param {String} id The ID of the object to create a reference to.
     * @static
     * @return {Parse.Object} A Parse.Object reference.
     */

  }, {
    key: 'createWithoutData',
    value: function (id) {
      var obj = new this();
      obj.id = id;
      return obj;
    }

    /**
     * Creates a new instance of a Parse Object from a JSON representation.
     * @param {Object} json The JSON map of the Object's data
     * @param {boolean} override In single instance mode, all old server data
     *   is overwritten if this is set to true
     * @static
     * @return {Parse.Object} A Parse.Object reference
     */

  }, {
    key: 'fromJSON',
    value: function (json, override) {
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
     * @param {String} className The class name of the subclass
     * @param {Class} constructor The subclass
     */

  }, {
    key: 'registerSubclass',
    value: function (className, constructor) {
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
     * @param {String} className The name of the Parse class backing this model.
     * @param {Object} protoProps Instance properties to add to instances of the
     *     class returned from this method.
     * @param {Object} classProps Class properties to add the class returned from
     *     this method.
     * @return {Class} A new subclass of Parse.Object.
     */

  }, {
    key: 'extend',
    value: function (className, protoProps, classProps) {
      if (typeof className !== 'string') {
        if (className && typeof className.className === 'string') {
          return ParseObject.extend(className.className, className, protoProps);
        } else {
          throw new Error('Parse.Object.extend\'s first argument should be the className.');
        }
      }
      var adjustedClassName = className;

      if (adjustedClassName === 'User' && _CoreManager2.default.get('PERFORM_USER_REWRITE')) {
        adjustedClassName = '_User';
      }

      var parentProto = ParseObject.prototype;
      if (this.hasOwnProperty('__super__') && this.__super__) {
        parentProto = this.prototype;
      } else if (classMap[adjustedClassName]) {
        parentProto = classMap[adjustedClassName].prototype;
      }
      var ParseObjectSubclass = function (attributes, options) {
        this.className = adjustedClassName;
        this._objCount = objectCount++;
        // Enable legacy initializers
        if (typeof this.initialize === 'function') {
          this.initialize.apply(this, arguments);
        }

        if (attributes && (typeof attributes === 'undefined' ? 'undefined' : (0, _typeof3.default)(attributes)) === 'object') {
          if (!this.set(attributes || {}, options)) {
            throw new Error('Can\'t create an invalid Parse Object');
          }
        }
      };
      ParseObjectSubclass.className = adjustedClassName;
      ParseObjectSubclass.__super__ = parentProto;

      ParseObjectSubclass.prototype = (0, _create2.default)(parentProto, {
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
            (0, _defineProperty2.default)(ParseObjectSubclass.prototype, prop, {
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
            (0, _defineProperty2.default)(ParseObjectSubclass, prop, {
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
     * @static
     */

  }, {
    key: 'enableSingleInstance',
    value: function () {
      singleInstance = true;
      _CoreManager2.default.setObjectStateController(SingleInstanceStateController);
    }

    /**
     * Disable single instance objects, where any local objects with the same Id
     * share the same attributes, and stay synchronized with each other.
     * When disabled, you can have two instances of the same object in memory
     * without them sharing attributes.
     * @static
     */

  }, {
    key: 'disableSingleInstance',
    value: function () {
      singleInstance = false;
      _CoreManager2.default.setObjectStateController(UniqueInstanceStateController);
    }
  }]);
  return ParseObject;
}();

var DefaultController = {
  fetch: function (target, forceFetch, options) {
    if (Array.isArray(target)) {
      if (target.length < 1) {
        return _promise2.default.resolve([]);
      }
      var objs = [];
      var ids = [];
      var className = null;
      var results = [];
      var error = null;
      target.forEach(function (el) {
        if (error) {
          return;
        }
        if (!className) {
          className = el.className;
        }
        if (className !== el.className) {
          error = new _ParseError2.default(_ParseError2.default.INVALID_CLASS_NAME, 'All objects should be of the same class');
        }
        if (!el.id) {
          error = new _ParseError2.default(_ParseError2.default.MISSING_OBJECT_ID, 'All objects must have an ID');
        }
        if (forceFetch || (0, _keys2.default)(el._getServerData()).length === 0) {
          ids.push(el.id);
          objs.push(el);
        }
        results.push(el);
      });
      if (error) {
        return _promise2.default.reject(error);
      }
      var query = new _ParseQuery2.default(className);
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
              return _promise2.default.reject(new _ParseError2.default(_ParseError2.default.OBJECT_NOT_FOUND, 'All objects must exist on the server.'));
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
        return _promise2.default.resolve(results);
      });
    } else {
      var RESTController = _CoreManager2.default.getRESTController();
      return RESTController.request('GET', 'classes/' + target.className + '/' + target._getId(), {}, options).then(function (response) {
        if (target instanceof ParseObject) {
          target._clearPendingOps();
          target._clearServerData();
          target._finishFetch(response);
        }
        return target;
      });
    }
  },
  destroy: function (target, options) {
    var RESTController = _CoreManager2.default.getRESTController();
    if (Array.isArray(target)) {
      if (target.length < 1) {
        return _promise2.default.resolve([]);
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
      var deleteCompleted = _promise2.default.resolve();
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
                var err = new _ParseError2.default(results[i].error.code, results[i].error.error);
                err.object = batch[i];
                errors.push(err);
              }
            }
          });
        });
      });
      return deleteCompleted.then(function () {
        if (errors.length) {
          var aggregate = new _ParseError2.default(_ParseError2.default.AGGREGATE_ERROR);
          aggregate.errors = errors;
          return _promise2.default.reject(aggregate);
        }
        return _promise2.default.resolve(target);
      });
    } else if (target instanceof ParseObject) {
      return RESTController.request('DELETE', 'classes/' + target.className + '/' + target._getId(), {}, options).then(function () {
        return _promise2.default.resolve(target);
      });
    }
    return _promise2.default.resolve(target);
  },
  save: function (target, options) {
    var RESTController = _CoreManager2.default.getRESTController();
    var stateController = _CoreManager2.default.getObjectStateController();
    if (Array.isArray(target)) {
      if (target.length < 1) {
        return _promise2.default.resolve([]);
      }

      var unsaved = target.concat();
      for (var i = 0; i < target.length; i++) {
        if (target[i] instanceof ParseObject) {
          unsaved = unsaved.concat((0, _unsavedChildren2.default)(target[i], true));
        }
      }
      unsaved = (0, _unique2.default)(unsaved);

      var filesSaved = _promise2.default.resolve();
      var pending = [];
      unsaved.forEach(function (el) {
        if (el instanceof _ParseFile2.default) {
          filesSaved = filesSaved.then(function () {
            return el.save();
          });
        } else if (el instanceof ParseObject) {
          pending.push(el);
        }
      });

      return filesSaved.then(function () {
        var objectError = null;
        return (0, _promiseUtils.continueWhile)(function () {
          return pending.length > 0;
        }, function () {
          var batch = [];
          var nextPending = [];
          pending.forEach(function (el) {
            if (batch.length < 20 && (0, _canBeSerialized2.default)(el)) {
              batch.push(el);
            } else {
              nextPending.push(el);
            }
          });
          pending = nextPending;
          if (batch.length < 1) {
            return _promise2.default.reject(new _ParseError2.default(_ParseError2.default.OTHER_CAUSE, 'Tried to save a batch with a cycle.'));
          }

          // Queue up tasks for each object in the batch.
          // When every task is ready, the API request will execute
          var res, rej;
          var batchReturned = new _promise2.default(function (resolve, reject) {
            res = resolve;rej = reject;
          });
          batchReturned.resolve = res;
          batchReturned.reject = rej;
          var batchReady = [];
          var batchTasks = [];
          batch.forEach(function (obj, index) {
            var res, rej;
            var ready = new _promise2.default(function (resolve, reject) {
              res = resolve;rej = reject;
            });
            ready.resolve = res;
            ready.reject = rej;
            batchReady.push(ready);

            stateController.pushPendingState(obj._getStateIdentifier());
            batchTasks.push(stateController.enqueueTask(obj._getStateIdentifier(), function () {
              ready.resolve();
              return batchReturned.then(function (responses, status) {
                if (responses[index].hasOwnProperty('success')) {
                  obj._handleSaveResponse(responses[index].success, status);
                } else {
                  if (!objectError && responses[index].hasOwnProperty('error')) {
                    var serverError = responses[index].error;
                    objectError = new _ParseError2.default(serverError.code, serverError.error);
                    // Cancel the rest of the save
                    pending = [];
                  }
                  obj._handleSaveError();
                }
              });
            }));
          });

          (0, _promiseUtils.when)(batchReady).then(function () {
            // Kick off the batch request
            return RESTController.request('POST', 'batch', {
              requests: batch.map(function (obj) {
                var params = obj._getSaveParams();
                params.path = getServerUrlPath() + params.path;
                return params;
              })
            }, options);
          }).then(function (response, status) {
            batchReturned.resolve(response, status);
          }, function (error) {
            batchReturned.reject(new _ParseError2.default(_ParseError2.default.INCORRECT_TYPE, error.message));
          });

          return (0, _promiseUtils.when)(batchTasks);
        }).then(function () {
          if (objectError) {
            return _promise2.default.reject(objectError);
          }
          return _promise2.default.resolve(target);
        });
      });
    } else if (target instanceof ParseObject) {
      // copying target lets Flow guarantee the pointer isn't modified elsewhere
      var targetCopy = target;
      var task = function () {
        var params = targetCopy._getSaveParams();
        return RESTController.request(params.method, params.path, params.body, options).then(function (response, status) {
          targetCopy._handleSaveResponse(response, status);
        }, function (error) {
          targetCopy._handleSaveError();
          return _promise2.default.reject(error);
        });
      };

      stateController.pushPendingState(target._getStateIdentifier());
      return stateController.enqueueTask(target._getStateIdentifier(), task).then(function () {
        return target;
      }, function (error) {
        return _promise2.default.reject(error);
      });
    }
    return _promise2.default.resolve();
  }
};

_CoreManager2.default.setObjectController(DefaultController);

exports.default = ParseObject;
},{"./CoreManager":3,"./ParseACL":11,"./ParseError":13,"./ParseFile":14,"./ParseOp":19,"./ParseQuery":21,"./ParseRelation":22,"./SingleInstanceStateController":29,"./UniqueInstanceStateController":33,"./canBeSerialized":35,"./decode":36,"./encode":37,"./equals":38,"./escape":39,"./parseDate":41,"./promiseUtils":42,"./unique":43,"./unsavedChildren":44,"babel-runtime/core-js/json/stringify":46,"babel-runtime/core-js/object/create":48,"babel-runtime/core-js/object/define-property":49,"babel-runtime/core-js/object/freeze":50,"babel-runtime/core-js/object/keys":53,"babel-runtime/core-js/promise":55,"babel-runtime/helpers/classCallCheck":59,"babel-runtime/helpers/createClass":60,"babel-runtime/helpers/typeof":64}],19:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelationOp = exports.RemoveOp = exports.AddUniqueOp = exports.AddOp = exports.IncrementOp = exports.UnsetOp = exports.SetOp = exports.Op = undefined;

var _getPrototypeOf = _dereq_('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = _dereq_('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = _dereq_('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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
      return new AddOp((0, _decode2.default)(json.objects));
    case 'AddUnique':
      return new AddUniqueOp((0, _decode2.default)(json.objects));
    case 'Remove':
      return new RemoveOp((0, _decode2.default)(json.objects));
    case 'AddRelation':
      var toAdd = (0, _decode2.default)(json.objects);
      if (!Array.isArray(toAdd)) {
        return new RelationOp([], []);
      }
      return new RelationOp(toAdd, []);
    case 'RemoveRelation':
      var toRemove = (0, _decode2.default)(json.objects);
      if (!Array.isArray(toRemove)) {
        return new RelationOp([], []);
      }
      return new RelationOp([], toRemove);
    case 'Batch':
      var toAdd = [];
      var toRemove = [];
      for (var i = 0; i < json.ops.length; i++) {
        if (json.ops[i].__op === 'AddRelation') {
          toAdd = toAdd.concat((0, _decode2.default)(json.ops[i].objects));
        } else if (json.ops[i].__op === 'RemoveRelation') {
          toRemove = toRemove.concat((0, _decode2.default)(json.ops[i].objects));
        }
      }
      return new RelationOp(toAdd, toRemove);
  }
  return null;
}

var Op = exports.Op = function () {
  function Op() {
    (0, _classCallCheck3.default)(this, Op);
  }

  (0, _createClass3.default)(Op, [{
    key: 'applyTo',

    // Empty parent class
    value: function () {}
  }, {
    key: 'mergeWith',
    value: function () {}
  }, {
    key: 'toJSON',
    value: function () {}
  }]);
  return Op;
}();

var SetOp = exports.SetOp = function (_Op) {
  (0, _inherits3.default)(SetOp, _Op);

  function SetOp(value) {
    (0, _classCallCheck3.default)(this, SetOp);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SetOp.__proto__ || (0, _getPrototypeOf2.default)(SetOp)).call(this));

    _this._value = value;
    return _this;
  }

  (0, _createClass3.default)(SetOp, [{
    key: 'applyTo',
    value: function () {
      return this._value;
    }
  }, {
    key: 'mergeWith',
    value: function () {
      return new SetOp(this._value);
    }
  }, {
    key: 'toJSON',
    value: function () {
      return (0, _encode2.default)(this._value, false, true);
    }
  }]);
  return SetOp;
}(Op);

var UnsetOp = exports.UnsetOp = function (_Op2) {
  (0, _inherits3.default)(UnsetOp, _Op2);

  function UnsetOp() {
    (0, _classCallCheck3.default)(this, UnsetOp);
    return (0, _possibleConstructorReturn3.default)(this, (UnsetOp.__proto__ || (0, _getPrototypeOf2.default)(UnsetOp)).apply(this, arguments));
  }

  (0, _createClass3.default)(UnsetOp, [{
    key: 'applyTo',
    value: function () {
      return undefined;
    }
  }, {
    key: 'mergeWith',
    value: function () {
      return new UnsetOp();
    }
  }, {
    key: 'toJSON',
    value: function () {
      return { __op: 'Delete' };
    }
  }]);
  return UnsetOp;
}(Op);

var IncrementOp = exports.IncrementOp = function (_Op3) {
  (0, _inherits3.default)(IncrementOp, _Op3);

  function IncrementOp(amount) {
    (0, _classCallCheck3.default)(this, IncrementOp);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (IncrementOp.__proto__ || (0, _getPrototypeOf2.default)(IncrementOp)).call(this));

    if (typeof amount !== 'number') {
      throw new TypeError('Increment Op must be initialized with a numeric amount.');
    }
    _this3._amount = amount;
    return _this3;
  }

  (0, _createClass3.default)(IncrementOp, [{
    key: 'applyTo',
    value: function (value) {
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
    value: function (previous) {
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
    value: function () {
      return { __op: 'Increment', amount: this._amount };
    }
  }]);
  return IncrementOp;
}(Op);

var AddOp = exports.AddOp = function (_Op4) {
  (0, _inherits3.default)(AddOp, _Op4);

  function AddOp(value) {
    (0, _classCallCheck3.default)(this, AddOp);

    var _this4 = (0, _possibleConstructorReturn3.default)(this, (AddOp.__proto__ || (0, _getPrototypeOf2.default)(AddOp)).call(this));

    _this4._value = Array.isArray(value) ? value : [value];
    return _this4;
  }

  (0, _createClass3.default)(AddOp, [{
    key: 'applyTo',
    value: function (value) {
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
    value: function (previous) {
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
    value: function () {
      return { __op: 'Add', objects: (0, _encode2.default)(this._value, false, true) };
    }
  }]);
  return AddOp;
}(Op);

var AddUniqueOp = exports.AddUniqueOp = function (_Op5) {
  (0, _inherits3.default)(AddUniqueOp, _Op5);

  function AddUniqueOp(value) {
    (0, _classCallCheck3.default)(this, AddUniqueOp);

    var _this5 = (0, _possibleConstructorReturn3.default)(this, (AddUniqueOp.__proto__ || (0, _getPrototypeOf2.default)(AddUniqueOp)).call(this));

    _this5._value = (0, _unique2.default)(Array.isArray(value) ? value : [value]);
    return _this5;
  }

  (0, _createClass3.default)(AddUniqueOp, [{
    key: 'applyTo',
    value: function (value) {
      if (value == null) {
        return this._value || [];
      }
      if (Array.isArray(value)) {
        // copying value lets Flow guarantee the pointer isn't modified elsewhere
        var valueCopy = value;
        var toAdd = [];
        this._value.forEach(function (v) {
          if (v instanceof _ParseObject2.default) {
            if (!(0, _arrayContainsObject2.default)(valueCopy, v)) {
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
    value: function (previous) {
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
    value: function () {
      return { __op: 'AddUnique', objects: (0, _encode2.default)(this._value, false, true) };
    }
  }]);
  return AddUniqueOp;
}(Op);

var RemoveOp = exports.RemoveOp = function (_Op6) {
  (0, _inherits3.default)(RemoveOp, _Op6);

  function RemoveOp(value) {
    (0, _classCallCheck3.default)(this, RemoveOp);

    var _this6 = (0, _possibleConstructorReturn3.default)(this, (RemoveOp.__proto__ || (0, _getPrototypeOf2.default)(RemoveOp)).call(this));

    _this6._value = (0, _unique2.default)(Array.isArray(value) ? value : [value]);
    return _this6;
  }

  (0, _createClass3.default)(RemoveOp, [{
    key: 'applyTo',
    value: function (value) {
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
          if (this._value[i] instanceof _ParseObject2.default && this._value[i].id) {
            for (var j = 0; j < removed.length; j++) {
              if (removed[j] instanceof _ParseObject2.default && this._value[i].id === removed[j].id) {
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
    value: function (previous) {
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
          if (this._value[i] instanceof _ParseObject2.default) {
            if (!(0, _arrayContainsObject2.default)(uniques, this._value[i])) {
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
    value: function () {
      return { __op: 'Remove', objects: (0, _encode2.default)(this._value, false, true) };
    }
  }]);
  return RemoveOp;
}(Op);

var RelationOp = exports.RelationOp = function (_Op7) {
  (0, _inherits3.default)(RelationOp, _Op7);

  function RelationOp(adds, removes) {
    (0, _classCallCheck3.default)(this, RelationOp);

    var _this7 = (0, _possibleConstructorReturn3.default)(this, (RelationOp.__proto__ || (0, _getPrototypeOf2.default)(RelationOp)).call(this));

    _this7._targetClassName = null;

    if (Array.isArray(adds)) {
      _this7.relationsToAdd = (0, _unique2.default)(adds.map(_this7._extractId, _this7));
    }

    if (Array.isArray(removes)) {
      _this7.relationsToRemove = (0, _unique2.default)(removes.map(_this7._extractId, _this7));
    }
    return _this7;
  }

  (0, _createClass3.default)(RelationOp, [{
    key: '_extractId',
    value: function (obj) {
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
    value: function (value, object, key) {
      if (!value) {
        if (!object || !key) {
          throw new Error('Cannot apply a RelationOp without either a previous value, or an object and a key');
        }
        var parent = new _ParseObject2.default(object.className);
        if (object.id && object.id.indexOf('local') === 0) {
          parent._localId = object.id;
        } else if (object.id) {
          parent.id = object.id;
        }
        var relation = new _ParseRelation2.default(parent, key);
        relation.targetClassName = this._targetClassName;
        return relation;
      }
      if (value instanceof _ParseRelation2.default) {
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
    value: function (previous) {
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
    value: function () {
      var _this8 = this;

      var idToPointer = function (id) {
        return {
          __type: 'Pointer',
          className: _this8._targetClassName,
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
}(Op);
},{"./ParseObject":18,"./ParseRelation":22,"./arrayContainsObject":34,"./decode":36,"./encode":37,"./unique":43,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":59,"babel-runtime/helpers/createClass":60,"babel-runtime/helpers/inherits":62,"babel-runtime/helpers/possibleConstructorReturn":63}],20:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ParseGeoPoint = _dereq_('./ParseGeoPoint');

var _ParseGeoPoint2 = _interopRequireDefault(_ParseGeoPoint);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Creates a new Polygon with any of the following forms:<br>
 *   <pre>
 *   new Polygon([[0,0],[0,1],[1,1],[1,0]])
 *   new Polygon([GeoPoint, GeoPoint, GeoPoint])
 *   </pre>
 *
 * <p>Represents a coordinates that may be associated
 * with a key in a ParseObject or used as a reference point for geo queries.
 * This allows proximity-based queries on the key.</p>
 *
 * <p>Example:<pre>
 *   var polygon = new Parse.Polygon([[0,0],[0,1],[1,1],[1,0]]);
 *   var object = new Parse.Object("PlaceObject");
 *   object.set("area", polygon);
 *   object.save();</pre></p>
 * @alias Parse.Polygon
 */
var ParsePolygon = function () {

  /**
   * @param {(Number[][]|Parse.GeoPoint[])} coordinates An Array of coordinate pairs
   */
  function ParsePolygon(arg1) {
    (0, _classCallCheck3.default)(this, ParsePolygon);

    this._coordinates = ParsePolygon._validate(arg1);
  }

  /**
   * Coordinates value for this Polygon.
   * Throws an exception if not valid type.
   * @property coordinates
   * @type Array
   */

  (0, _createClass3.default)(ParsePolygon, [{
    key: 'toJSON',

    /**
     * Returns a JSON representation of the Polygon, suitable for Parse.
     * @return {Object}
     */
    value: function () {
      ParsePolygon._validate(this._coordinates);
      return {
        __type: 'Polygon',
        coordinates: this._coordinates
      };
    }

    /**
     * Checks if two polygons are equal
     * @param {(Parse.Polygon|Object)} other
     * @returns {Boolean}
     */

  }, {
    key: 'equals',
    value: function (other) {
      if (!(other instanceof ParsePolygon) || this.coordinates.length !== other.coordinates.length) {
        return false;
      }
      var isEqual = true;

      for (var i = 1; i < this._coordinates.length; i += 1) {
        if (this._coordinates[i][0] != other.coordinates[i][0] || this._coordinates[i][1] != other.coordinates[i][1]) {
          isEqual = false;
          break;
        }
      }
      return isEqual;
    }

    /**
     *
     * @param {Parse.GeoPoint} point
     * @returns {Boolean} Returns if the point is contained in the polygon
     */

  }, {
    key: 'containsPoint',
    value: function (point) {
      var minX = this._coordinates[0][0];
      var maxX = this._coordinates[0][0];
      var minY = this._coordinates[0][1];
      var maxY = this._coordinates[0][1];

      for (var i = 1; i < this._coordinates.length; i += 1) {
        var p = this._coordinates[i];
        minX = Math.min(p[0], minX);
        maxX = Math.max(p[0], maxX);
        minY = Math.min(p[1], minY);
        maxY = Math.max(p[1], maxY);
      }

      var outside = point.latitude < minX || point.latitude > maxX || point.longitude < minY || point.longitude > maxY;
      if (outside) {
        return false;
      }

      var inside = false;
      for (var _i = 0, j = this._coordinates.length - 1; _i < this._coordinates.length; j = _i++) {
        var startX = this._coordinates[_i][0];
        var startY = this._coordinates[_i][1];
        var endX = this._coordinates[j][0];
        var endY = this._coordinates[j][1];

        var intersect = startY > point.longitude != endY > point.longitude && point.latitude < (endX - startX) * (point.longitude - startY) / (endY - startY) + startX;

        if (intersect) {
          inside = !inside;
        }
      }
      return inside;
    }

    /**
     * Validates that the list of coordinates can form a valid polygon
     * @param {Array} coords the list of coordinated to validate as a polygon
     * @throws {TypeError}
     */

  }, {
    key: 'coordinates',
    get: function () {
      return this._coordinates;
    },
    set: function (coords) {
      this._coordinates = ParsePolygon._validate(coords);
    }
  }], [{
    key: '_validate',
    value: function (coords) {
      if (!Array.isArray(coords)) {
        throw new TypeError('Coordinates must be an Array');
      }
      if (coords.length < 3) {
        throw new TypeError('Polygon must have at least 3 GeoPoints or Points');
      }
      var points = [];
      for (var i = 0; i < coords.length; i += 1) {
        var coord = coords[i];
        var geoPoint = void 0;
        if (coord instanceof _ParseGeoPoint2.default) {
          geoPoint = coord;
        } else if (Array.isArray(coord) && coord.length === 2) {
          geoPoint = new _ParseGeoPoint2.default(coord[0], coord[1]);
        } else {
          throw new TypeError('Coordinates must be an Array of GeoPoints or Points');
        }
        points.push([geoPoint.latitude, geoPoint.longitude]);
      }
      return points;
    }
  }]);
  return ParsePolygon;
}(); /**
      * Copyright (c) 2015-present, Parse, LLC.
      * All rights reserved.
      *
      * This source code is licensed under the BSD-style license found in the
      * LICENSE file in the root directory of this source tree. An additional grant
      * of patent rights can be found in the PATENTS file in the same directory.
      *
      * 
      */

exports.default = ParsePolygon;
},{"./ParseGeoPoint":15,"babel-runtime/helpers/classCallCheck":59,"babel-runtime/helpers/createClass":60}],21:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = _dereq_('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _keys = _dereq_('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _encode = _dereq_('./encode');

var _encode2 = _interopRequireDefault(_encode);

var _promiseUtils = _dereq_('./promiseUtils');

var _ParseError = _dereq_('./ParseError');

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParseGeoPoint = _dereq_('./ParseGeoPoint');

var _ParseGeoPoint2 = _interopRequireDefault(_ParseGeoPoint);

var _ParsePolygon = _dereq_('./ParsePolygon');

var _ParsePolygon2 = _interopRequireDefault(_ParsePolygon);

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Converts a string into a regex that matches it.
 * Surrounding with \Q .. \E does this, we just need to escape any \E's in
 * the text separately.
 * @private
 */
function quote(s) {
  return '\\Q' + s.replace('\\E', '\\E\\\\E\\Q') + '\\E';
}

/**
 * Extracts the class name from queries. If not all queries have the same
 * class name an error will be thrown.
 */
/*
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function _getClassNameFromQueries(queries) {
  var className = null;
  queries.forEach(function (q) {
    if (!className) {
      className = q.className;
    }

    if (className !== q.className) {
      throw new Error('All queries must be for the same class.');
    }
  });
  return className;
}

/*
 * Handles pre-populating the result data of a query with select fields,
 * making sure that the data object contains keys for all objects that have
 * been requested with a select, so that our cached state updates correctly.
 */
function handleSelectResult(data, select) {
  var serverDataMask = {};

  select.forEach(function (field) {
    var hasSubObjectSelect = field.indexOf(".") !== -1;
    if (!hasSubObjectSelect && !data.hasOwnProperty(field)) {
      // this field was selected, but is missing from the retrieved data
      data[field] = undefined;
    } else if (hasSubObjectSelect) {
      // this field references a sub-object,
      // so we need to walk down the path components
      var pathComponents = field.split(".");
      var obj = data;
      var serverMask = serverDataMask;

      pathComponents.forEach(function (component, index, arr) {
        // add keys if the expected data is missing
        if (obj && !obj.hasOwnProperty(component)) {
          obj[component] = undefined;
        }
        if (obj !== undefined) {
          obj = obj[component];
        }

        //add this path component to the server mask so we can fill it in later if needed
        if (index < arr.length - 1) {
          if (!serverMask[component]) {
            serverMask[component] = {};
          }
          serverMask = serverMask[component];
        }
      });
    }
  });

  if ((0, _keys2.default)(serverDataMask).length > 0) {
    var copyMissingDataWithMask = function copyMissingDataWithMask(src, dest, mask, copyThisLevel) {
      //copy missing elements at this level
      if (copyThisLevel) {
        for (var key in src) {
          if (src.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
            dest[key] = src[key];
          }
        }
      }
      for (var key in mask) {
        if (dest[key] !== undefined && dest[key] !== null && src !== undefined && src !== null) {
          //traverse into objects as needed
          copyMissingDataWithMask(src[key], dest[key], mask[key], true);
        }
      }
    };

    // When selecting from sub-objects, we don't want to blow away the missing
    // information that we may have retrieved before. We've already added any
    // missing selected keys to sub-objects, but we still need to add in the
    // data for any previously retrieved sub-objects that were not selected.

    var serverData = _CoreManager2.default.getObjectStateController().getServerData({ id: data.objectId, className: data.className });

    copyMissingDataWithMask(serverData, data, serverDataMask, false);
  }
}

/**
 * Creates a new parse Parse.Query for the given Parse.Object subclass.
 *
 * <p>Parse.Query defines a query that is used to fetch Parse.Objects. The
 * most common use case is finding all objects that match a query through the
 * <code>find</code> method. for example, this sample code fetches all objects
 * of class <code>myclass</code>. it calls a different function depending on
 * whether the fetch succeeded or not.
 *
 * <pre>
 * var query = new Parse.Query(myclass);
 * query.find().then((results) => {
 *   // results is an array of parse.object.
 * }).catch((error) =>  {
 *  // error is an instance of parse.error.
 * });</pre></p>
 *
 * <p>a Parse.Query can also be used to retrieve a single object whose id is
 * known, through the get method. for example, this sample code fetches an
 * object of class <code>myclass</code> and id <code>myid</code>. it calls a
 * different function depending on whether the fetch succeeded or not.
 *
 * <pre>
 * var query = new Parse.Query(myclass);
 * query.get(myid).then((object) => {
 *     // object is an instance of parse.object.
 * }).catch((error) =>  {
 *  // error is an instance of parse.error.
 * });</pre></p>
 *
 * <p>a Parse.Query can also be used to count the number of objects that match
 * the query without retrieving all of those objects. for example, this
 * sample code counts the number of objects of the class <code>myclass</code>
 * <pre>
 * var query = new Parse.Query(myclass);
 * query.count().then((number) => {
 *     // there are number instances of myclass.
 * }).catch((error) => {
 *     // error is an instance of Parse.Error.
 * });</pre></p>
 * @alias Parse.Query
 */

var ParseQuery = function () {

  /**
   * @param {(String|Parse.Object)} objectClass An instance of a subclass of Parse.Object, or a Parse className string.
   */

  /**
   * @property className
   * @type String
   */
  function ParseQuery(objectClass) {
    (0, _classCallCheck3.default)(this, ParseQuery);

    if (typeof objectClass === 'string') {
      if (objectClass === 'User' && _CoreManager2.default.get('PERFORM_USER_REWRITE')) {
        this.className = '_User';
      } else {
        this.className = objectClass;
      }
    } else if (objectClass instanceof _ParseObject2.default) {
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
   * @param {Array} queries
   * @return {Parse.Query} Returns the query, so you can chain this call.
   */

  (0, _createClass3.default)(ParseQuery, [{
    key: '_orQuery',
    value: function (queries) {
      var queryJSON = queries.map(function (q) {
        return q.toJSON().where;
      });

      this._where.$or = queryJSON;
      return this;
    }

    /**
     * Adds constraint that all of the passed in queries match.
     * @method _andQuery
     * @param {Array} queries
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: '_andQuery',
    value: function (queries) {
      var queryJSON = queries.map(function (q) {
        return q.toJSON().where;
      });

      this._where.$and = queryJSON;
      return this;
    }

    /**
     * Helper for condition queries
     */

  }, {
    key: '_addCondition',
    value: function (key, condition, value) {
      if (!this._where[key] || typeof this._where[key] === 'string') {
        this._where[key] = {};
      }
      this._where[key][condition] = (0, _encode2.default)(value, false, true);
      return this;
    }

    /**
     * Converts string for regular expression at the beginning
     */

  }, {
    key: '_regexStartWith',
    value: function (string) {
      return '^' + quote(string);
    }

    /**
     * Returns a JSON representation of this query.
     * @return {Object} The JSON representation of the query.
     */

  }, {
    key: 'toJSON',
    value: function () {
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
     * Return a query with conditions from json, can be useful to send query from server side to client
     * Not static, all query conditions was set before calling this method will be deleted.
     * For example on the server side we have
     * var query = new Parse.Query("className");
     * query.equalTo(key: value);
     * query.limit(100);
     * ... (others queries)
     * Create JSON representation of Query Object
     * var jsonFromServer = query.fromJSON();
     *
     * On client side getting query:
     * var query = new Parse.Query("className");
     * query.fromJSON(jsonFromServer);
     *
     * and continue to query...
     * query.skip(100).find().then(...);
     * @param {QueryJSON} json from Parse.Query.toJSON() method
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'withJSON',
    value: function (json) {

      if (json.where) {
        this._where = json.where;
      }

      if (json.include) {
        this._include = json.include.split(",");
      }

      if (json.keys) {
        this._select = json.keys.split(",");
      }

      if (json.limit) {
        this._limit = json.limit;
      }

      if (json.skip) {
        this._skip = json.skip;
      }

      if (json.order) {
        this._order = json.order.split(",");
      }

      for (var _key in json) {
        if (json.hasOwnProperty(_key)) {
          if (["where", "include", "keys", "limit", "skip", "order"].indexOf(_key) === -1) {
            this._extraOptions[_key] = json[_key];
          }
        }
      }return this;
    }

    /**
     * Static method to restore Parse.Query by json representation
     * Internally calling Parse.Query.withJSON
     * @param {String} className
     * @param {QueryJSON} json from Parse.Query.toJSON() method
     * @returns {Parse.Query} new created query
     */

  }, {
    key: 'get',

    /**
     * Constructs a Parse.Object whose id is already known by fetching data from
     * the server.  Either options.success or options.error is called when the
     * find completes. Unlike the <code>first</code> method, it never returns undefined.
     *
     * @param {String} objectId The id of the object to be fetched.
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the result when
     * the query completes.
     */
    value: function (objectId, options) {
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

        var errorObject = new _ParseError2.default(_ParseError2.default.OBJECT_NOT_FOUND, 'Object not found.');
        return _promise2.default.reject(errorObject);
      });
    }

    /**
     * Retrieves a list of ParseObjects that satisfy this query.
     * Either options.success or options.error is called when the find
     * completes.
     *
     * @param {Object} options Valid options
     * are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the results when
     * the query completes.
     */

  }, {
    key: 'find',
    value: function (options) {
      var _this2 = this;

      options = options || {};

      var findOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        findOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        findOptions.sessionToken = options.sessionToken;
      }

      var controller = _CoreManager2.default.getQueryController();

      var select = this._select;

      return controller.find(this.className, this.toJSON(), findOptions).then(function (response) {
        return response.results.map(function (data) {
          // In cases of relations, the server may send back a className
          // on the top level of the payload
          var override = response.className || _this2.className;
          if (!data.className) {
            data.className = override;
          }

          // Make sure the data object contains keys for all objects that
          // have been requested with a select, so that our cached state
          // updates correctly.
          if (select) {
            handleSelectResult(data, select);
          }

          return _ParseObject2.default.fromJSON(data, !select);
        });
      });
    }

    /**
     * Counts the number of objects that match this query.
     * Either options.success or options.error is called when the count
     * completes.
     *
     * @param {Object} options 
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the count when
     * the query completes.
     */

  }, {
    key: 'count',
    value: function (options) {
      options = options || {};

      var findOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        findOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        findOptions.sessionToken = options.sessionToken;
      }

      var controller = _CoreManager2.default.getQueryController();

      var params = this.toJSON();
      params.limit = 0;
      params.count = 1;

      return controller.find(this.className, params, findOptions).then(function (result) {
        return result.count;
      });
    }

    /**
     * Executes a distinct query and returns unique values
     *
     * @param {String} key A field to find distinct values
     * @param {Object} options 
     * Valid options are:<ul>
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the query completes.
     */

  }, {
    key: 'distinct',
    value: function (key, options) {
      options = options || {};

      var distinctOptions = {
        useMasterKey: true
      };
      if (options.hasOwnProperty('sessionToken')) {
        distinctOptions.sessionToken = options.sessionToken;
      }
      var controller = _CoreManager2.default.getQueryController();
      var params = {
        distinct: key,
        where: this._where
      };

      return controller.aggregate(this.className, params, distinctOptions).then(function (results) {
        return results.results;
      });
    }

    /**
    * Executes an aggregate query and returns aggregate results
    *
    * @param {Mixed} pipeline Array or Object of stages to process query
    * @param {Object} options Valid options are:<ul>
    *   <li>sessionToken: A valid session token, used for making a request on
    *       behalf of a specific user.
    * </ul>
    *
    * @return {Promise} A promise that is resolved with the query completes.
    */

  }, {
    key: 'aggregate',
    value: function (pipeline, options) {
      options = options || {};

      var aggregateOptions = {
        useMasterKey: true
      };
      if (options.hasOwnProperty('sessionToken')) {
        aggregateOptions.sessionToken = options.sessionToken;
      }
      var controller = _CoreManager2.default.getQueryController();
      var stages = {};

      if (Array.isArray(pipeline)) {
        pipeline.forEach(function (stage) {
          for (var op in stage) {
            stages[op] = stage[op];
          }
        });
      } else if (pipeline && (typeof pipeline === 'undefined' ? 'undefined' : (0, _typeof3.default)(pipeline)) === 'object') {
        stages = pipeline;
      } else {
        throw new Error('Invalid pipeline must be Array or Object');
      }

      return controller.aggregate(this.className, stages, aggregateOptions).then(function (results) {
        return results.results;
      });
    }

    /**
     * Retrieves at most one Parse.Object that satisfies this query.
     *
     * Either options.success or options.error is called when it completes.
     * success is passed the object if there is one. otherwise, undefined.
     *
     * @param {Object} options Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the object when
     * the query completes.
     */

  }, {
    key: 'first',
    value: function (options) {
      var _this3 = this;

      options = options || {};

      var findOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        findOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('sessionToken')) {
        findOptions.sessionToken = options.sessionToken;
      }

      var controller = _CoreManager2.default.getQueryController();

      var params = this.toJSON();
      params.limit = 1;

      var select = this._select;

      return controller.find(this.className, params, findOptions).then(function (response) {
        var objects = response.results;
        if (!objects[0]) {
          return undefined;
        }
        if (!objects[0].className) {
          objects[0].className = _this3.className;
        }

        // Make sure the data object contains keys for all objects that
        // have been requested with a select, so that our cached state
        // updates correctly.
        if (select) {
          handleSelectResult(objects[0], select);
        }

        return _ParseObject2.default.fromJSON(objects[0], !select);
      });
    }

    /**
     * Iterates over each result of a query, calling a callback for each one. If
     * the callback returns a promise, the iteration will not continue until
     * that promise has been fulfilled. If the callback returns a rejected
     * promise, then iteration will stop with that error. The items are
     * processed in an unspecified order. The query may not have any sort order,
     * and may not use limit or skip.
     * @param {Function} callback Callback that will be called with each result
     *     of the query.
     * @param {Object} options Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     * @return {Promise} A promise that will be fulfilled once the
     *     iteration has completed.
     */

  }, {
    key: 'each',
    value: function (callback, options) {
      options = options || {};

      if (this._order || this._skip || this._limit >= 0) {
        return _promise2.default.reject('Cannot iterate on a query with sort, skip, or limit.');
      }

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
        } else if (val && (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object') {
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
      return (0, _promiseUtils.continueWhile)(function () {
        return !finished;
      }, function () {
        return query.find(findOptions).then(function (results) {
          var callbacksDone = _promise2.default.resolve();
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
      });
    }

    /** Query Conditions **/

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be equal to the provided value.
     * @param {String} key The key to check.
     * @param value The value that the Parse.Object must contain.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'equalTo',
    value: function (key, value) {
      if (typeof value === 'undefined') {
        return this.doesNotExist(key);
      }

      this._where[key] = (0, _encode2.default)(value, false, true);
      return this;
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be not equal to the provided value.
     * @param {String} key The key to check.
     * @param value The value that must not be equalled.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'notEqualTo',
    value: function (key, value) {
      return this._addCondition(key, '$ne', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be less than the provided value.
     * @param {String} key The key to check.
     * @param value The value that provides an upper bound.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'lessThan',
    value: function (key, value) {
      return this._addCondition(key, '$lt', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be greater than the provided value.
     * @param {String} key The key to check.
     * @param value The value that provides an lower bound.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'greaterThan',
    value: function (key, value) {
      return this._addCondition(key, '$gt', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be less than or equal to the provided value.
     * @param {String} key The key to check.
     * @param value The value that provides an upper bound.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'lessThanOrEqualTo',
    value: function (key, value) {
      return this._addCondition(key, '$lte', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be greater than or equal to the provided value.
     * @param {String} key The key to check.
     * @param value The value that provides an lower bound.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'greaterThanOrEqualTo',
    value: function (key, value) {
      return this._addCondition(key, '$gte', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * be contained in the provided list of values.
     * @param {String} key The key to check.
     * @param {Array} values The values that will match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'containedIn',
    value: function (key, value) {
      return this._addCondition(key, '$in', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * not be contained in the provided list of values.
     * @param {String} key The key to check.
     * @param {Array} values The values that will not match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'notContainedIn',
    value: function (key, value) {
      return this._addCondition(key, '$nin', value);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * contain each one of the provided list of values.
     * @param {String} key The key to check.  This key's value must be an array.
     * @param {Array} values The values that will match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'containsAll',
    value: function (key, values) {
      return this._addCondition(key, '$all', values);
    }

    /**
     * Adds a constraint to the query that requires a particular key's value to
     * contain each one of the provided list of values starting with given strings.
     * @param {String} key The key to check.  This key's value must be an array.
     * @param {Array<String>} values The string values that will match as starting string.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'containsAllStartingWith',
    value: function (key, values) {
      var _this = this;
      if (!Array.isArray(values)) {
        values = [values];
      }

      values = values.map(function (value) {
        return { "$regex": _this._regexStartWith(value) };
      });

      return this.containsAll(key, values);
    }

    /**
     * Adds a constraint for finding objects that contain the given key.
     * @param {String} key The key that should exist.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'exists',
    value: function (key) {
      return this._addCondition(key, '$exists', true);
    }

    /**
     * Adds a constraint for finding objects that do not contain a given key.
     * @param {String} key The key that should not exist
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'doesNotExist',
    value: function (key) {
      return this._addCondition(key, '$exists', false);
    }

    /**
     * Adds a regular expression constraint for finding string values that match
     * the provided regular expression.
     * This may be slow for large datasets.
     * @param {String} key The key that the string to match is stored in.
     * @param {RegExp} regex The regular expression pattern to match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'matches',
    value: function (key, regex, modifiers) {
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
     * @param {String} key The key that the contains the object to match the
     *                     query.
     * @param {Parse.Query} query The query that should match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'matchesQuery',
    value: function (key, query) {
      var queryJSON = query.toJSON();
      queryJSON.className = query.className;
      return this._addCondition(key, '$inQuery', queryJSON);
    }

    /**
     * Adds a constraint that requires that a key's value not matches a
     * Parse.Query constraint.
     * @param {String} key The key that the contains the object to match the
     *                     query.
     * @param {Parse.Query} query The query that should not match.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'doesNotMatchQuery',
    value: function (key, query) {
      var queryJSON = query.toJSON();
      queryJSON.className = query.className;
      return this._addCondition(key, '$notInQuery', queryJSON);
    }

    /**
     * Adds a constraint that requires that a key's value matches a value in
     * an object returned by a different Parse.Query.
     * @param {String} key The key that contains the value that is being
     *                     matched.
     * @param {String} queryKey The key in the objects returned by the query to
     *                          match against.
     * @param {Parse.Query} query The query to run.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'matchesKeyInQuery',
    value: function (key, queryKey, query) {
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
     * @param {String} key The key that contains the value that is being
     *                     excluded.
     * @param {String} queryKey The key in the objects returned by the query to
     *                          match against.
     * @param {Parse.Query} query The query to run.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'doesNotMatchKeyInQuery',
    value: function (key, queryKey, query) {
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
     * @param {String} key The key that the string to match is stored in.
     * @param {String} substring The substring that the value must contain.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'contains',
    value: function (key, value) {
      if (typeof value !== 'string') {
        throw new Error('The value being searched for must be a string.');
      }
      return this._addCondition(key, '$regex', quote(value));
    }

    /**
    * Adds a constraint for finding string values that contain a provided
    * string. This may be slow for large datasets. Requires Parse-Server > 2.5.0
    *
    * In order to sort you must use select and ascending ($score is required)
    *  <pre>
    *   query.fullText('field', 'term');
    *   query.ascending('$score');
    *   query.select('$score');
    *  </pre>
    *
    * To retrieve the weight / rank
    *  <pre>
    *   object->get('score');
    *  </pre>
    *
    * You can define optionals by providing an object as a third parameter
    *  <pre>
    *   query.fullText('field', 'term', { language: 'es', diacriticSensitive: true });
    *  </pre>
    *
    * @param {String} key The key that the string to match is stored in.
    * @param {String} value The string to search
    * @param {Object} options (Optional)
    * @param {String} options.language The language that determines the list of stop words for the search and the rules for the stemmer and tokenizer.
    * @param {Boolean} options.caseSensitive A boolean flag to enable or disable case sensitive search.
    * @param {Boolean} options.diacriticSensitive A boolean flag to enable or disable diacritic sensitive search.
    * @return {Parse.Query} Returns the query, so you can chain this call.
    */

  }, {
    key: 'fullText',
    value: function (key, value, options) {
      options = options || {};

      if (!key) {
        throw new Error('A key is required.');
      }
      if (!value) {
        throw new Error('A search term is required');
      }
      if (typeof value !== 'string') {
        throw new Error('The value being searched for must be a string.');
      }

      var fullOptions = { $term: value };
      for (var option in options) {
        switch (option) {
          case 'language':
            fullOptions.$language = options[option];
            break;
          case 'caseSensitive':
            fullOptions.$caseSensitive = options[option];
            break;
          case 'diacriticSensitive':
            fullOptions.$diacriticSensitive = options[option];
            break;
          default:
            throw new Error('Unknown option: ' + option);
            break;
        }
      }

      return this._addCondition(key, '$text', { $search: fullOptions });
    }

    /**
     * Method to sort the full text search by text score
     *
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'sortByTextScore',
    value: function () {
      this.ascending('$score');
      this.select(['$score']);
      return this;
    }

    /**
     * Adds a constraint for finding string values that start with a provided
     * string.  This query will use the backend index, so it will be fast even
     * for large datasets.
     * @param {String} key The key that the string to match is stored in.
     * @param {String} prefix The substring that the value must start with.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'startsWith',
    value: function (key, value) {
      if (typeof value !== 'string') {
        throw new Error('The value being searched for must be a string.');
      }
      return this._addCondition(key, '$regex', this._regexStartWith(value));
    }

    /**
     * Adds a constraint for finding string values that end with a provided
     * string.  This will be slow for large datasets.
     * @param {String} key The key that the string to match is stored in.
     * @param {String} suffix The substring that the value must end with.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'endsWith',
    value: function (key, value) {
      if (typeof value !== 'string') {
        throw new Error('The value being searched for must be a string.');
      }
      return this._addCondition(key, '$regex', quote(value) + '$');
    }

    /**
     * Adds a proximity based constraint for finding objects with key point
     * values near the point given.
     * @param {String} key The key that the Parse.GeoPoint is stored in.
     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'near',
    value: function (key, point) {
      if (!(point instanceof _ParseGeoPoint2.default)) {
        // Try to cast it as a GeoPoint
        point = new _ParseGeoPoint2.default(point);
      }
      return this._addCondition(key, '$nearSphere', point);
    }

    /**
     * Adds a proximity based constraint for finding objects with key point
     * values near the point given and within the maximum distance given.
     * @param {String} key The key that the Parse.GeoPoint is stored in.
     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
     * @param {Number} maxDistance Maximum distance (in radians) of results to
     *   return.
     * @param {Boolean} sorted A Bool value that is true if results should be
     *   sorted by distance ascending, false is no sorting is required,
     *   defaults to true.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'withinRadians',
    value: function (key, point, distance, sorted) {
      if (sorted || sorted === undefined) {
        this.near(key, point);
        return this._addCondition(key, '$maxDistance', distance);
      } else {
        return this._addCondition(key, '$geoWithin', { '$centerSphere': [[point.longitude, point.latitude], distance] });
      }
    }

    /**
     * Adds a proximity based constraint for finding objects with key point
     * values near the point given and within the maximum distance given.
     * Radius of earth used is 3958.8 miles.
     * @param {String} key The key that the Parse.GeoPoint is stored in.
     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
     * @param {Number} maxDistance Maximum distance (in miles) of results to
     *   return.
     * @param {Boolean} sorted A Bool value that is true if results should be
     *   sorted by distance ascending, false is no sorting is required,
     *   defaults to true.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'withinMiles',
    value: function (key, point, distance, sorted) {
      return this.withinRadians(key, point, distance / 3958.8, sorted);
    }

    /**
     * Adds a proximity based constraint for finding objects with key point
     * values near the point given and within the maximum distance given.
     * Radius of earth used is 6371.0 kilometers.
     * @param {String} key The key that the Parse.GeoPoint is stored in.
     * @param {Parse.GeoPoint} point The reference Parse.GeoPoint that is used.
     * @param {Number} maxDistance Maximum distance (in kilometers) of results
     *   to return.
     * @param {Boolean} sorted A Bool value that is true if results should be
     *   sorted by distance ascending, false is no sorting is required,
     *   defaults to true.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'withinKilometers',
    value: function (key, point, distance, sorted) {
      return this.withinRadians(key, point, distance / 6371.0, sorted);
    }

    /**
     * Adds a constraint to the query that requires a particular key's
     * coordinates be contained within a given rectangular geographic bounding
     * box.
     * @param {String} key The key to be constrained.
     * @param {Parse.GeoPoint} southwest
     *     The lower-left inclusive corner of the box.
     * @param {Parse.GeoPoint} northeast
     *     The upper-right inclusive corner of the box.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'withinGeoBox',
    value: function (key, southwest, northeast) {
      if (!(southwest instanceof _ParseGeoPoint2.default)) {
        southwest = new _ParseGeoPoint2.default(southwest);
      }
      if (!(northeast instanceof _ParseGeoPoint2.default)) {
        northeast = new _ParseGeoPoint2.default(northeast);
      }
      this._addCondition(key, '$within', { '$box': [southwest, northeast] });
      return this;
    }

    /**
     * Adds a constraint to the query that requires a particular key's
     * coordinates be contained within and on the bounds of a given polygon.
     * Supports closed and open (last point is connected to first) paths
     *
     * Polygon must have at least 3 points
     *
     * @param {String} key The key to be constrained.
     * @param {Array} array of geopoints
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'withinPolygon',
    value: function (key, points) {
      return this._addCondition(key, '$geoWithin', { '$polygon': points });
    }

    /**
     * Add a constraint to the query that requires a particular key's
     * coordinates that contains a ParseGeoPoint
     *
     * @param {String} key The key to be constrained.
     * @param {Parse.GeoPoint} GeoPoint
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'polygonContains',
    value: function (key, point) {
      return this._addCondition(key, '$geoIntersects', { '$point': point });
    }

    /** Query Orderings **/

    /**
     * Sorts the results in ascending order by the given key.
     *
     * @param {(String|String[]|...String)} key The key to order by, which is a
     * string of comma separated values, or an Array of keys, or multiple keys.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'ascending',
    value: function () {
      this._order = [];

      for (var _len = arguments.length, keys = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
        keys[_key2] = arguments[_key2];
      }

      return this.addAscending.apply(this, keys);
    }

    /**
     * Sorts the results in ascending order by the given key,
     * but can also add secondary sort descriptors without overwriting _order.
     *
     * @param {(String|String[]|...String)} key The key to order by, which is a
     * string of comma separated values, or an Array of keys, or multiple keys.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'addAscending',
    value: function () {
      var _this4 = this;

      if (!this._order) {
        this._order = [];
      }

      for (var _len2 = arguments.length, keys = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
        keys[_key3] = arguments[_key3];
      }

      keys.forEach(function (key) {
        if (Array.isArray(key)) {
          key = key.join();
        }
        _this4._order = _this4._order.concat(key.replace(/\s/g, '').split(','));
      });

      return this;
    }

    /**
     * Sorts the results in descending order by the given key.
     *
     * @param {(String|String[]|...String)} key The key to order by, which is a
     * string of comma separated values, or an Array of keys, or multiple keys.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'descending',
    value: function () {
      this._order = [];

      for (var _len3 = arguments.length, keys = Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
        keys[_key4] = arguments[_key4];
      }

      return this.addDescending.apply(this, keys);
    }

    /**
     * Sorts the results in descending order by the given key,
     * but can also add secondary sort descriptors without overwriting _order.
     *
     * @param {(String|String[]|...String)} key The key to order by, which is a
     * string of comma separated values, or an Array of keys, or multiple keys.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'addDescending',
    value: function () {
      var _this5 = this;

      if (!this._order) {
        this._order = [];
      }

      for (var _len4 = arguments.length, keys = Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
        keys[_key5] = arguments[_key5];
      }

      keys.forEach(function (key) {
        if (Array.isArray(key)) {
          key = key.join();
        }
        _this5._order = _this5._order.concat(key.replace(/\s/g, '').split(',').map(function (k) {
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
     * @param {Number} n the number of results to skip.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'skip',
    value: function (n) {
      if (typeof n !== 'number' || n < 0) {
        throw new Error('You can only skip by a positive number');
      }
      this._skip = n;
      return this;
    }

    /**
     * Sets the limit of the number of results to return. The default limit is
     * 100, with a maximum of 1000 results being returned at a time.
     * @param {Number} n the number of results to limit to.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'limit',
    value: function (n) {
      if (typeof n !== 'number') {
        throw new Error('You can only set the limit to a numeric value');
      }
      this._limit = n;
      return this;
    }

    /**
     * Includes nested Parse.Objects for the provided key.  You can use dot
     * notation to specify which fields in the included object are also fetched.
     * @param {...String|Array<String>} key The name(s) of the key(s) to include.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'include',
    value: function () {
      var _this6 = this;

      for (var _len5 = arguments.length, keys = Array(_len5), _key6 = 0; _key6 < _len5; _key6++) {
        keys[_key6] = arguments[_key6];
      }

      keys.forEach(function (key) {
        if (Array.isArray(key)) {
          _this6._include = _this6._include.concat(key);
        } else {
          _this6._include.push(key);
        }
      });
      return this;
    }

    /**
     * Restricts the fields of the returned Parse.Objects to include only the
     * provided keys.  If this is called multiple times, then all of the keys
     * specified in each of the calls will be included.
     * @param {...String|Array<String>} keys The name(s) of the key(s) to include.
     * @return {Parse.Query} Returns the query, so you can chain this call.
     */

  }, {
    key: 'select',
    value: function () {
      var _this7 = this;

      if (!this._select) {
        this._select = [];
      }

      for (var _len6 = arguments.length, keys = Array(_len6), _key7 = 0; _key7 < _len6; _key7++) {
        keys[_key7] = arguments[_key7];
      }

      keys.forEach(function (key) {
        if (Array.isArray(key)) {
          _this7._select = _this7._select.concat(key);
        } else {
          _this7._select.push(key);
        }
      });
      return this;
    }

    /**
     * Subscribe this query to get liveQuery updates
     * @return {LiveQuerySubscription} Returns the liveQuerySubscription, it's an event emitter
     * which can be used to get liveQuery updates.
     */

  }, {
    key: 'subscribe',
    value: function () {
      var controller = _CoreManager2.default.getLiveQueryController();
      return controller.subscribe(this);
    }

    /**
     * Constructs a Parse.Query that is the OR of the passed in queries.  For
     * example:
     * <pre>var compoundQuery = Parse.Query.or(query1, query2, query3);</pre>
     *
     * will create a compoundQuery that is an or of the query1, query2, and
     * query3.
     * @param {...Parse.Query} var_args The list of queries to OR.
     * @static
     * @return {Parse.Query} The query that is the OR of the passed in queries.
     */

  }], [{
    key: 'fromJSON',
    value: function (className, json) {
      var query = new ParseQuery(className);
      return query.withJSON(json);
    }
  }, {
    key: 'or',
    value: function () {
      for (var _len7 = arguments.length, queries = Array(_len7), _key8 = 0; _key8 < _len7; _key8++) {
        queries[_key8] = arguments[_key8];
      }

      var className = _getClassNameFromQueries(queries);
      var query = new ParseQuery(className);
      query._orQuery(queries);
      return query;
    }

    /**
     * Constructs a Parse.Query that is the AND of the passed in queries.  For
     * example:
     * <pre>var compoundQuery = Parse.Query.and(query1, query2, query3);</pre>
     *
     * will create a compoundQuery that is an and of the query1, query2, and
     * query3.
     * @param {...Parse.Query} var_args The list of queries to AND.
     * @static
     * @return {Parse.Query} The query that is the AND of the passed in queries.
     */

  }, {
    key: 'and',
    value: function () {
      for (var _len8 = arguments.length, queries = Array(_len8), _key9 = 0; _key9 < _len8; _key9++) {
        queries[_key9] = arguments[_key9];
      }

      var className = _getClassNameFromQueries(queries);
      var query = new ParseQuery(className);
      query._andQuery(queries);
      return query;
    }
  }]);
  return ParseQuery;
}();

var DefaultController = {
  find: function (className, params, options) {
    var RESTController = _CoreManager2.default.getRESTController();

    return RESTController.request('GET', 'classes/' + className, params, options);
  },
  aggregate: function (className, params, options) {
    var RESTController = _CoreManager2.default.getRESTController();

    return RESTController.request('GET', 'aggregate/' + className, params, options);
  }
};

_CoreManager2.default.setQueryController(DefaultController);

exports.default = ParseQuery;
},{"./CoreManager":3,"./ParseError":13,"./ParseGeoPoint":15,"./ParseObject":18,"./ParsePolygon":20,"./encode":37,"./promiseUtils":42,"babel-runtime/core-js/object/keys":53,"babel-runtime/core-js/promise":55,"babel-runtime/helpers/classCallCheck":59,"babel-runtime/helpers/createClass":60,"babel-runtime/helpers/typeof":64}],22:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ParseOp = _dereq_('./ParseOp');

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParseQuery = _dereq_('./ParseQuery');

var _ParseQuery2 = _interopRequireDefault(_ParseQuery);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Creates a new Relation for the given parent object and key. This
 * constructor should rarely be used directly, but rather created by
 * Parse.Object.relation.
 *
 * <p>
 * A class that is used to access all of the children of a many-to-many
 * relationship.  Each instance of Parse.Relation is associated with a
 * particular parent object and key.
 * </p>
 * @alias Parse.Relation
 */
var ParseRelation = function () {

  /**
   * @param {Parse.Object} parent The parent of this relation.
   * @param {String} key The key for this relation on the parent.
   */
  function ParseRelation(parent, key) {
    (0, _classCallCheck3.default)(this, ParseRelation);

    this.parent = parent;
    this.key = key;
    this.targetClassName = null;
  }

  /*
   * Makes sure that this relation has the right parent and key.
   */

  (0, _createClass3.default)(ParseRelation, [{
    key: '_ensureParentAndKey',
    value: function (parent, key) {
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
      * @param {} objects The item or items to add.
     */

  }, {
    key: 'add',
    value: function (objects) {
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
      * @param {} objects The item or items to remove.
     */

  }, {
    key: 'remove',
    value: function (objects) {
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
      * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function () {
      return {
        __type: 'Relation',
        className: this.targetClassName
      };
    }

    /**
     * Returns a Parse.Query that is limited to objects in this
     * relation.
      * @return {Parse.Query}
     */

  }, {
    key: 'query',
    value: function () {
      var query;
      var parent = this.parent;
      if (!parent) {
        throw new Error('Cannot construct a query for a Relation without a parent');
      }
      if (!this.targetClassName) {
        query = new _ParseQuery2.default(parent.className);
        query._extraOptions.redirectClassNameForKey = this.key;
      } else {
        query = new _ParseQuery2.default(this.targetClassName);
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
}(); /**
      * Copyright (c) 2015-present, Parse, LLC.
      * All rights reserved.
      *
      * This source code is licensed under the BSD-style license found in the
      * LICENSE file in the root directory of this source tree. An additional grant
      * of patent rights can be found in the PATENTS file in the same directory.
      *
      * 
      */

exports.default = ParseRelation;
},{"./ParseObject":18,"./ParseOp":19,"./ParseQuery":21,"babel-runtime/helpers/classCallCheck":59,"babel-runtime/helpers/createClass":60}],23:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = _dereq_('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = _dereq_('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = _dereq_('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = _dereq_('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ParseACL = _dereq_('./ParseACL');

var _ParseACL2 = _interopRequireDefault(_ParseACL);

var _ParseError = _dereq_('./ParseError');

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParseObject2 = _dereq_('./ParseObject');

var _ParseObject3 = _interopRequireDefault(_ParseObject2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Represents a Role on the Parse server. Roles represent groupings of
 * Users for the purposes of granting permissions (e.g. specifying an ACL
 * for an Object). Roles are specified by their sets of child users and
 * child roles, all of which are granted any permissions that the parent
 * role has.
 *
 * <p>Roles must have a name (which cannot be changed after creation of the
 * role), and must specify an ACL.</p>
 * @alias Parse.Role
 * @extends Parse.Object
 */
var ParseRole = function (_ParseObject) {
  (0, _inherits3.default)(ParseRole, _ParseObject);

  /**
   * @param {String} name The name of the Role to create.
   * @param {Parse.ACL} acl The ACL for this role. Roles must have an ACL.
   * A Parse.Role is a local representation of a role persisted to the Parse
   * cloud.
   */
  function ParseRole(name, acl) {
    (0, _classCallCheck3.default)(this, ParseRole);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ParseRole.__proto__ || (0, _getPrototypeOf2.default)(ParseRole)).call(this, '_Role'));

    if (typeof name === 'string' && acl instanceof _ParseACL2.default) {
      _this.setName(name);
      _this.setACL(acl);
    }
    return _this;
  }

  /**
   * Gets the name of the role.  You can alternatively call role.get("name")
   *
    * @return {String} the name of the role.
   */

  (0, _createClass3.default)(ParseRole, [{
    key: 'getName',
    value: function () {
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
      * @param {String} name The name of the role.
     * @param {Object} options Standard options object with success and error
     *     callbacks.
     */

  }, {
    key: 'setName',
    value: function (name, options) {
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
      * @return {Parse.Relation} the relation for the users belonging to this
     *     role.
     */

  }, {
    key: 'getUsers',
    value: function () {
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
      * @return {Parse.Relation} the relation for the roles belonging to this
     *     role.
     */

  }, {
    key: 'getRoles',
    value: function () {
      return this.relation('roles');
    }
  }, {
    key: 'validate',
    value: function (attrs, options) {
      var isInvalid = (0, _get3.default)(ParseRole.prototype.__proto__ || (0, _getPrototypeOf2.default)(ParseRole.prototype), 'validate', this).call(this, attrs, options);
      if (isInvalid) {
        return isInvalid;
      }

      if ('name' in attrs && attrs.name !== this.getName()) {
        var newName = attrs.name;
        if (this.id && this.id !== attrs.objectId) {
          // Check to see if the objectId being set matches this.id
          // This happens during a fetch -- the id is set before calling fetch
          // Let the name be set in this case
          return new _ParseError2.default(_ParseError2.default.OTHER_CAUSE, 'A role\'s name can only be set before it has been saved.');
        }
        if (typeof newName !== 'string') {
          return new _ParseError2.default(_ParseError2.default.OTHER_CAUSE, 'A role\'s name must be a String.');
        }
        if (!/^[0-9a-zA-Z\-_ ]+$/.test(newName)) {
          return new _ParseError2.default(_ParseError2.default.OTHER_CAUSE, 'A role\'s name can be only contain alphanumeric characters, _, ' + '-, and spaces.');
        }
      }
      return false;
    }
  }]);
  return ParseRole;
}(_ParseObject3.default); /**
                           * Copyright (c) 2015-present, Parse, LLC.
                           * All rights reserved.
                           *
                           * This source code is licensed under the BSD-style license found in the
                           * LICENSE file in the root directory of this source tree. An additional grant
                           * of patent rights can be found in the PATENTS file in the same directory.
                           *
                           * 
                           */

_ParseObject3.default.registerSubclass('_Role', ParseRole);

exports.default = ParseRole;
},{"./ParseACL":11,"./ParseError":13,"./ParseObject":18,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/helpers/classCallCheck":59,"babel-runtime/helpers/createClass":60,"babel-runtime/helpers/get":61,"babel-runtime/helpers/inherits":62,"babel-runtime/helpers/possibleConstructorReturn":63}],24:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var FIELD_TYPES = ['String', 'Number', 'Boolean', 'Date', 'File', 'GeoPoint', 'Polygon', 'Array', 'Object', 'Pointer', 'Relation'];

/**
 * A Parse.Schema object is for handling schema data from Parse.
 * <p>All the schemas methods require MasterKey.
 *
 * <pre>
 * const schema = new Parse.Schema('MyClass');
 * schema.addString('field');
 * schema.addIndex('index_name', {'field', 1});
 * schema.save();
 * </pre>
 * </p>
 * @alias Parse.Schema
 */
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

var ParseSchema = function () {

  /**
   * @param {String} className Parse Class string.
   */
  function ParseSchema(className) {
    (0, _classCallCheck3.default)(this, ParseSchema);

    if (typeof className === 'string') {
      if (className === 'User' && _CoreManager2.default.get('PERFORM_USER_REWRITE')) {
        this.className = '_User';
      } else {
        this.className = className;
      }
    }

    this._fields = {};
    this._indexes = {};
  }

  /**
   * Static method to get all schemas
   *
   * @param {Object} options
   * Valid options are:<ul>
   *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
   *     be used for this request.
   *   <li>sessionToken: A valid session token, used for making a request on
   *       behalf of a specific user.
   * </ul>
   *
   * @return {Promise} A promise that is resolved with the result when
   * the query completes.
   */

  (0, _createClass3.default)(ParseSchema, [{
    key: 'get',

    /**
     * Get the Schema from Parse
     *
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the result when
     * the query completes.
     */
    value: function (options) {
      this.assertClassName();

      options = options || {};
      var controller = _CoreManager2.default.getSchemaController();

      return controller.get(this.className, options).then(function (response) {
        if (!response) {
          throw new Error('Schema not found.');
        }
        return response;
      });
    }

    /**
     * Create a new Schema on Parse
     *
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the result when
     * the query completes.
     */

  }, {
    key: 'save',
    value: function (options) {
      this.assertClassName();

      options = options || {};
      var controller = _CoreManager2.default.getSchemaController();
      var params = {
        className: this.className,
        fields: this._fields,
        indexes: this._indexes
      };

      return controller.create(this.className, params, options).then(function (response) {
        return response;
      });
    }

    /**
     * Update a Schema on Parse
     *
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the result when
     * the query completes.
     */

  }, {
    key: 'update',
    value: function (options) {
      this.assertClassName();

      options = options || {};
      var controller = _CoreManager2.default.getSchemaController();
      var params = {
        className: this.className,
        fields: this._fields,
        indexes: this._indexes
      };

      this._fields = {};
      this._indexes = {};

      return controller.update(this.className, params, options).then(function (response) {
        return response;
      });
    }

    /**
     * Removing a Schema from Parse
     * Can only be used on Schema without objects
     *
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the result when
     * the query completes.
     */

  }, {
    key: 'delete',
    value: function (options) {
      this.assertClassName();

      options = options || {};
      var controller = _CoreManager2.default.getSchemaController();

      return controller.delete(this.className, options).then(function (response) {
        return response;
      });
    }

    /**
     * Removes all objects from a Schema (class) in Parse.
     * EXERCISE CAUTION, running this will delete all objects for this schema and cannot be reversed
     *
     * @param {Object} options
     * Valid options are:<ul>
     *   <li>useMasterKey: In Cloud Code and Node only, causes the Master Key to
     *     be used for this request.
     *   <li>sessionToken: A valid session token, used for making a request on
     *       behalf of a specific user.
     * </ul>
     *
     * @return {Promise} A promise that is resolved with the result when
     * the query completes.
     */

  }, {
    key: 'purge',
    value: function () {
      this.assertClassName();

      var controller = _CoreManager2.default.getSchemaController();

      return controller.purge(this.className).then(function (response) {
        return response;
      });
    }

    /**
     * Assert if ClassName has been filled
     * @private
     */

  }, {
    key: 'assertClassName',
    value: function () {
      if (!this.className) {
        throw new Error('You must set a Class Name before making any request.');
      }
    }

    /**
     * Adding a Field to Create / Update a Schema
     *
     * @param {String} name Name of the field that will be created on Parse
     * @param {String} type TheCan be a (String|Number|Boolean|Date|Parse.File|Parse.GeoPoint|Array|Object|Pointer|Parse.Relation)
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: 'addField',
    value: function (name, type) {
      type = type || 'String';

      if (!name) {
        throw new Error('field name may not be null.');
      }
      if (FIELD_TYPES.indexOf(type) === -1) {
        throw new Error(type + ' is not a valid type.');
      }

      this._fields[name] = { type: type };

      return this;
    }

    /**
     * Adding an Index to Create / Update a Schema
     *
     * @param {String} name Name of the field that will be created on Parse
     * @param {String} type Can be a (String|Number|Boolean|Date|Parse.File|Parse.GeoPoint|Array|Object|Pointer|Parse.Relation)
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: 'addIndex',
    value: function (name, index) {
      if (!name) {
        throw new Error('index name may not be null.');
      }
      if (!index) {
        throw new Error('index may not be null.');
      }

      this._indexes[name] = index;

      return this;
    }

    /**
     * Adding String Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: 'addString',
    value: function (name) {
      return this.addField(name, 'String');
    }

    /**
     * Adding Number Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: 'addNumber',
    value: function (name) {
      return this.addField(name, 'Number');
    }

    /**
     * Adding Boolean Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: 'addBoolean',
    value: function (name) {
      return this.addField(name, 'Boolean');
    }

    /**
     * Adding Date Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: 'addDate',
    value: function (name) {
      return this.addField(name, 'Date');
    }

    /**
     * Adding File Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: 'addFile',
    value: function (name) {
      return this.addField(name, 'File');
    }

    /**
     * Adding GeoPoint Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: 'addGeoPoint',
    value: function (name) {
      return this.addField(name, 'GeoPoint');
    }

    /**
     * Adding Polygon Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: 'addPolygon',
    value: function (name) {
      return this.addField(name, 'Polygon');
    }

    /**
     * Adding Array Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: 'addArray',
    value: function (name) {
      return this.addField(name, 'Array');
    }

    /**
     * Adding Object Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: 'addObject',
    value: function (name) {
      return this.addField(name, 'Object');
    }

    /**
     * Adding Pointer Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @param {String} targetClass Name of the target Pointer Class
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: 'addPointer',
    value: function (name, targetClass) {
      if (!name) {
        throw new Error('field name may not be null.');
      }
      if (!targetClass) {
        throw new Error('You need to set the targetClass of the Pointer.');
      }

      this._fields[name] = {
        type: 'Pointer',
        targetClass: targetClass
      };

      return this;
    }

    /**
     * Adding Relation Field
     *
     * @param {String} name Name of the field that will be created on Parse
     * @param {String} targetClass Name of the target Pointer Class
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: 'addRelation',
    value: function (name, targetClass) {
      if (!name) {
        throw new Error('field name may not be null.');
      }
      if (!targetClass) {
        throw new Error('You need to set the targetClass of the Relation.');
      }

      this._fields[name] = {
        type: 'Relation',
        targetClass: targetClass
      };

      return this;
    }

    /**
     * Deleting a Field to Update on a Schema
     *
     * @param {String} name Name of the field that will be created on Parse
     * @param {String} targetClass Name of the target Pointer Class
     * @return {Parse.Schema} Returns the schema, so you can chain this call.
     */

  }, {
    key: 'deleteField',
    value: function (name) {
      this._fields[name] = { __op: 'Delete' };
    }

    /**
    * Deleting an Index to Update on a Schema
    *
    * @param {String} name Name of the field that will be created on Parse
    * @param {String} targetClass Name of the target Pointer Class
    * @return {Parse.Schema} Returns the schema, so you can chain this call.
    */

  }, {
    key: 'deleteIndex',
    value: function (name) {
      this._indexes[name] = { __op: 'Delete' };
    }
  }], [{
    key: 'all',
    value: function (options) {
      options = options || {};
      var controller = _CoreManager2.default.getSchemaController();

      return controller.get('', options).then(function (response) {
        if (response.results.length === 0) {
          throw new Error('Schema not found.');
        }
        return response.results;
      });
    }
  }]);
  return ParseSchema;
}();

var DefaultController = {
  send: function (className, method, params, options) {
    var RESTController = _CoreManager2.default.getRESTController();
    var requestOptions = { useMasterKey: true };
    if (options.hasOwnProperty('sessionToken')) {
      requestOptions.sessionToken = options.sessionToken;
    }
    return RESTController.request(method, 'schemas/' + className, params, requestOptions);
  },
  get: function (className, options) {
    return this.send(className, 'GET', {}, options);
  },
  create: function (className, params, options) {
    return this.send(className, 'POST', params, options);
  },
  update: function (className, params, options) {
    return this.send(className, 'PUT', params, options);
  },
  delete: function (className, options) {
    return this.send(className, 'DELETE', {}, options);
  },
  purge: function (className) {
    var RESTController = _CoreManager2.default.getRESTController();
    return RESTController.request('DELETE', 'purge/' + className, {}, { useMasterKey: true });
  }
};

_CoreManager2.default.setSchemaController(DefaultController);

exports.default = ParseSchema;
},{"./CoreManager":3,"babel-runtime/helpers/classCallCheck":59,"babel-runtime/helpers/createClass":60}],25:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = _dereq_('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = _dereq_('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = _dereq_('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = _dereq_('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _isRevocableSession = _dereq_('./isRevocableSession');

var _isRevocableSession2 = _interopRequireDefault(_isRevocableSession);

var _ParseObject2 = _dereq_('./ParseObject');

var _ParseObject3 = _interopRequireDefault(_ParseObject2);

var _ParseUser = _dereq_('./ParseUser');

var _ParseUser2 = _interopRequireDefault(_ParseUser);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * <p>A Parse.Session object is a local representation of a revocable session.
 * This class is a subclass of a Parse.Object, and retains the same
 * functionality of a Parse.Object.</p>
 * @alias Parse.Session
 * @extends Parse.Object
 */
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

var ParseSession = function (_ParseObject) {
  (0, _inherits3.default)(ParseSession, _ParseObject);

  /**
   * 
   * @param {Object} attributes The initial set of data to store in the user.
   */
  function ParseSession(attributes) {
    (0, _classCallCheck3.default)(this, ParseSession);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ParseSession.__proto__ || (0, _getPrototypeOf2.default)(ParseSession)).call(this, '_Session'));

    if (attributes && (typeof attributes === 'undefined' ? 'undefined' : (0, _typeof3.default)(attributes)) === 'object') {
      if (!_this.set(attributes || {})) {
        throw new Error('Can\'t create an invalid Session');
      }
    }
    return _this;
  }

  /**
   * Returns the session token string.
    * @return {String}
   */

  (0, _createClass3.default)(ParseSession, [{
    key: 'getSessionToken',
    value: function () {
      var token = this.get('sessionToken');
      if (typeof token === 'string') {
        return token;
      }
      return '';
    }
  }], [{
    key: 'readOnlyAttributes',
    value: function () {
      return ['createdWith', 'expiresAt', 'installationId', 'restricted', 'sessionToken', 'user'];
    }

    /**
     * Retrieves the Session object for the currently logged in session.
      * @static
     * @return {Promise} A promise that is resolved with the Parse.Session
     *   object after it has been fetched. If there is no current user, the
     *   promise will be rejected.
     */

  }, {
    key: 'current',
    value: function (options) {
      options = options || {};
      var controller = _CoreManager2.default.getSessionController();

      var sessionOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        sessionOptions.useMasterKey = options.useMasterKey;
      }
      return _ParseUser2.default.currentAsync().then(function (user) {
        if (!user) {
          return _promise2.default.reject('There is no current user.');
        }
        user.getSessionToken();

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
      * @static
     * @return {Boolean}
     */

  }, {
    key: 'isCurrentSessionRevocable',
    value: function () {
      var currentUser = _ParseUser2.default.current();
      if (currentUser) {
        return (0, _isRevocableSession2.default)(currentUser.getSessionToken() || '');
      }
      return false;
    }
  }]);
  return ParseSession;
}(_ParseObject3.default);

_ParseObject3.default.registerSubclass('_Session', ParseSession);

var DefaultController = {
  getSession: function (options) {
    var RESTController = _CoreManager2.default.getRESTController();
    var session = new ParseSession();

    return RESTController.request('GET', 'sessions/me', {}, options).then(function (sessionData) {
      session._finishFetch(sessionData);
      session._setExisted(true);
      return session;
    });
  }
};

_CoreManager2.default.setSessionController(DefaultController);

exports.default = ParseSession;
},{"./CoreManager":3,"./ParseObject":18,"./ParseUser":26,"./isRevocableSession":40,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/core-js/promise":55,"babel-runtime/helpers/classCallCheck":59,"babel-runtime/helpers/createClass":60,"babel-runtime/helpers/inherits":62,"babel-runtime/helpers/possibleConstructorReturn":63,"babel-runtime/helpers/typeof":64}],26:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = _dereq_('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty = _dereq_('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _promise = _dereq_('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = _dereq_('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = _dereq_('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = _dereq_('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = _dereq_('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = _dereq_('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _isRevocableSession = _dereq_('./isRevocableSession');

var _isRevocableSession2 = _interopRequireDefault(_isRevocableSession);

var _ParseError = _dereq_('./ParseError');

var _ParseError2 = _interopRequireDefault(_ParseError);

var _ParseObject2 = _dereq_('./ParseObject');

var _ParseObject3 = _interopRequireDefault(_ParseObject2);

var _ParseSession = _dereq_('./ParseSession');

var _ParseSession2 = _interopRequireDefault(_ParseSession);

var _Storage = _dereq_('./Storage');

var _Storage2 = _interopRequireDefault(_Storage);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

var CURRENT_USER_KEY = 'currentUser';
var canUseCurrentUser = !_CoreManager2.default.get('IS_NODE');
var currentUserCacheMatchesDisk = false;
var currentUserCache = null;

var authProviders = {};

/**
 * <p>A Parse.User object is a local representation of a user persisted to the
 * Parse cloud. This class is a subclass of a Parse.Object, and retains the
 * same functionality of a Parse.Object, but also extends it with various
 * user specific methods, like authentication, signing up, and validation of
 * uniqueness.</p>
 * @alias Parse.User
 * @extends Parse.Object
 */

var ParseUser = function (_ParseObject) {
  (0, _inherits3.default)(ParseUser, _ParseObject);

  /**
   * @param {Object} attributes The initial set of data to store in the user.
   */
  function ParseUser(attributes) {
    (0, _classCallCheck3.default)(this, ParseUser);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ParseUser.__proto__ || (0, _getPrototypeOf2.default)(ParseUser)).call(this, '_User'));

    if (attributes && (typeof attributes === 'undefined' ? 'undefined' : (0, _typeof3.default)(attributes)) === 'object') {
      if (!_this.set(attributes || {})) {
        throw new Error('Can\'t create an invalid Parse User');
      }
    }
    return _this;
  }

  /**
   * Request a revocable session token to replace the older style of token.
    * @param {Object} options
   * @return {Promise} A promise that is resolved when the replacement
   *   token has been fetched.
   */

  (0, _createClass3.default)(ParseUser, [{
    key: '_upgradeToRevocableSession',
    value: function (options) {
      options = options || {};

      var upgradeOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        upgradeOptions.useMasterKey = options.useMasterKey;
      }

      var controller = _CoreManager2.default.getUserController();
      return controller.upgradeToRevocableSession(this, upgradeOptions);
    }

    /**
     * Unlike in the Android/iOS SDKs, logInWith is unnecessary, since you can
     * call linkWith on the user (even if it doesn't exist yet on the server).
     */

  }, {
    key: '_linkWith',
    value: function (provider, options) {
      var _this2 = this;

      var authType;
      if (typeof provider === 'string') {
        authType = provider;
        provider = authProviders[provider];
      } else {
        authType = provider.getAuthType();
      }
      if (options && options.hasOwnProperty('authData')) {
        var authData = this.get('authData') || {};
        if ((typeof authData === 'undefined' ? 'undefined' : (0, _typeof3.default)(authData)) !== 'object') {
          throw new Error('Invalid type: authData field should be an object');
        }
        authData[authType] = options.authData;

        var controller = _CoreManager2.default.getUserController();
        return controller.linkWith(this, authData);
      } else {
        return new _promise2.default(function (resolve, reject) {
          provider.authenticate({
            success: function (provider, result) {
              var opts = {};
              opts.authData = result;
              _this2._linkWith(provider, opts).then(function () {
                resolve(_this2);
              }, function (error) {
                reject(error);
              });
            },
            error: function (provider, _error) {
              reject(_error);
            }
          });
        });
      }
    }

    /**
     * Synchronizes auth data for a provider (e.g. puts the access token in the
     * right place to be used by the Facebook SDK).
      */

  }, {
    key: '_synchronizeAuthData',
    value: function (provider) {
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
      if (!provider || !authData || (typeof authData === 'undefined' ? 'undefined' : (0, _typeof3.default)(authData)) !== 'object') {
        return;
      }
      var success = provider.restoreAuthentication(authData[authType]);
      if (!success) {
        this._unlinkFrom(provider);
      }
    }

    /**
     * Synchronizes authData for all providers.
      */

  }, {
    key: '_synchronizeAllAuthData',
    value: function () {
      var authData = this.get('authData');
      if ((typeof authData === 'undefined' ? 'undefined' : (0, _typeof3.default)(authData)) !== 'object') {
        return;
      }

      for (var key in authData) {
        this._synchronizeAuthData(key);
      }
    }

    /**
     * Removes null values from authData (which exist temporarily for
     * unlinking)
      */

  }, {
    key: '_cleanupAuthData',
    value: function () {
      if (!this.isCurrent()) {
        return;
      }
      var authData = this.get('authData');
      if ((typeof authData === 'undefined' ? 'undefined' : (0, _typeof3.default)(authData)) !== 'object') {
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
      */

  }, {
    key: '_unlinkFrom',
    value: function (provider) {
      var _this3 = this;

      if (typeof provider === 'string') {
        provider = authProviders[provider];
      } else {
        provider.getAuthType();
      }
      return this._linkWith(provider, { authData: null }).then(function () {
        _this3._synchronizeAuthData(provider);
        return _promise2.default.resolve(_this3);
      });
    }

    /**
     * Checks whether a user is linked to a service.
      */

  }, {
    key: '_isLinked',
    value: function (provider) {
      var authType;
      if (typeof provider === 'string') {
        authType = provider;
      } else {
        authType = provider.getAuthType();
      }
      var authData = this.get('authData') || {};
      if ((typeof authData === 'undefined' ? 'undefined' : (0, _typeof3.default)(authData)) !== 'object') {
        return false;
      }
      return !!authData[authType];
    }

    /**
     * Deauthenticates all providers.
      */

  }, {
    key: '_logOutWithAll',
    value: function () {
      var authData = this.get('authData');
      if ((typeof authData === 'undefined' ? 'undefined' : (0, _typeof3.default)(authData)) !== 'object') {
        return;
      }

      for (var key in authData) {
        this._logOutWith(key);
      }
    }

    /**
     * Deauthenticates a single provider (e.g. removing access tokens from the
     * Facebook SDK).
      */

  }, {
    key: '_logOutWith',
    value: function (provider) {
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
    value: function () {
      return {
        sessionToken: this.get('sessionToken')
      };
    }

    /**
     * Returns true if <code>current</code> would return this user.
      * @return {Boolean}
     */

  }, {
    key: 'isCurrent',
    value: function () {
      var current = ParseUser.current();
      return !!current && current.id === this.id;
    }

    /**
     * Returns get("username").
      * @return {String}
     */

  }, {
    key: 'getUsername',
    value: function () {
      var username = this.get('username');
      if (username == null || typeof username === 'string') {
        return username;
      }
      return '';
    }

    /**
     * Calls set("username", username, options) and returns the result.
      * @param {String} username
     * @param {Object} options
     * @return {Boolean}
     */

  }, {
    key: 'setUsername',
    value: function (username) {
      // Strip anonymity, even we do not support anonymous user in js SDK, we may
      // encounter anonymous user created by android/iOS in cloud code.
      var authData = this.get('authData');
      if (authData && (typeof authData === 'undefined' ? 'undefined' : (0, _typeof3.default)(authData)) === 'object' && authData.hasOwnProperty('anonymous')) {
        // We need to set anonymous to null instead of deleting it in order to remove it from Parse.
        authData.anonymous = null;
      }
      this.set('username', username);
    }

    /**
     * Calls set("password", password, options) and returns the result.
      * @param {String} password
     * @param {Object} options
     * @return {Boolean}
     */

  }, {
    key: 'setPassword',
    value: function (password) {
      this.set('password', password);
    }

    /**
     * Returns get("email").
      * @return {String}
     */

  }, {
    key: 'getEmail',
    value: function () {
      var email = this.get('email');
      if (email == null || typeof email === 'string') {
        return email;
      }
      return '';
    }

    /**
     * Calls set("email", email) and returns the result.
      * @param {String} email
     * @return {Boolean}
     */

  }, {
    key: 'setEmail',
    value: function (email) {
      return this.set('email', email);
    }

    /**
     * Returns the session token for this user, if the user has been logged in,
     * or if it is the result of a query with the master key. Otherwise, returns
     * undefined.
      * @return {String} the session token, or undefined
     */

  }, {
    key: 'getSessionToken',
    value: function () {
      var token = this.get('sessionToken');
      if (token == null || typeof token === 'string') {
        return token;
      }
      return '';
    }

    /**
     * Checks whether this user is the current user and has been authenticated.
      * @return (Boolean) whether this user is the current user and is logged in.
     */

  }, {
    key: 'authenticated',
    value: function () {
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
      * @param {Object} attrs Extra fields to set on the new user, or null.
     * @param {Object} options
     * @return {Promise} A promise that is fulfilled when the signup
     *     finishes.
     */

  }, {
    key: 'signUp',
    value: function (attrs, options) {
      options = options || {};

      var signupOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        signupOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('installationId')) {
        signupOptions.installationId = options.installationId;
      }

      var controller = _CoreManager2.default.getUserController();
      return controller.signUp(this, attrs, signupOptions);
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
      * @param {Object} options
     * @return {Promise} A promise that is fulfilled with the user when
     *     the login is complete.
     */

  }, {
    key: 'logIn',
    value: function (options) {
      options = options || {};

      var loginOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        loginOptions.useMasterKey = options.useMasterKey;
      }
      if (options.hasOwnProperty('installationId')) {
        loginOptions.installationId = options.installationId;
      }

      var controller = _CoreManager2.default.getUserController();
      return controller.logIn(this, loginOptions);
    }

    /**
     * Wrap the default save behavior with functionality to save to local
     * storage if this is current user.
     */

  }, {
    key: 'save',
    value: function () {
      var _this4 = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (0, _get3.default)(ParseUser.prototype.__proto__ || (0, _getPrototypeOf2.default)(ParseUser.prototype), 'save', this).apply(this, args).then(function () {
        if (_this4.isCurrent()) {
          return _CoreManager2.default.getUserController().updateUserOnDisk(_this4);
        }
        return _this4;
      });
    }

    /**
     * Wrap the default destroy behavior with functionality that logs out
     * the current user when it is destroyed
     */

  }, {
    key: 'destroy',
    value: function () {
      var _this5 = this;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return (0, _get3.default)(ParseUser.prototype.__proto__ || (0, _getPrototypeOf2.default)(ParseUser.prototype), 'destroy', this).apply(this, args).then(function () {
        if (_this5.isCurrent()) {
          return _CoreManager2.default.getUserController().removeUserFromDisk();
        }
        return _this5;
      });
    }

    /**
     * Wrap the default fetch behavior with functionality to save to local
     * storage if this is current user.
     */

  }, {
    key: 'fetch',
    value: function () {
      var _this6 = this;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return (0, _get3.default)(ParseUser.prototype.__proto__ || (0, _getPrototypeOf2.default)(ParseUser.prototype), 'fetch', this).apply(this, args).then(function () {
        if (_this6.isCurrent()) {
          return _CoreManager2.default.getUserController().updateUserOnDisk(_this6);
        }
        return _this6;
      });
    }
  }], [{
    key: 'readOnlyAttributes',
    value: function () {
      return ['sessionToken'];
    }

    /**
     * Adds functionality to the existing Parse.User class
      * @param {Object} protoProps A set of properties to add to the prototype
     * @param {Object} classProps A set of static properties to add to the class
     * @static
     * @return {Class} The newly extended Parse.User class
     */

  }, {
    key: 'extend',
    value: function (protoProps, classProps) {
      if (protoProps) {
        for (var prop in protoProps) {
          if (prop !== 'className') {
            (0, _defineProperty2.default)(ParseUser.prototype, prop, {
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
            (0, _defineProperty2.default)(ParseUser, prop, {
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
      * @static
     * @return {Parse.Object} The currently logged in Parse.User.
     */

  }, {
    key: 'current',
    value: function () {
      if (!canUseCurrentUser) {
        return null;
      }
      var controller = _CoreManager2.default.getUserController();
      return controller.currentUser();
    }

    /**
     * Retrieves the currently logged in ParseUser from asynchronous Storage.
      * @static
     * @return {Promise} A Promise that is resolved with the currently
     *   logged in Parse User
     */

  }, {
    key: 'currentAsync',
    value: function () {
      if (!canUseCurrentUser) {
        return _promise2.default.resolve(null);
      }
      var controller = _CoreManager2.default.getUserController();
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
      * @param {String} username The username (or email) to sign up with.
     * @param {String} password The password to sign up with.
     * @param {Object} attrs Extra fields to set on the new user.
     * @param {Object} options
     * @static
     * @return {Promise} A promise that is fulfilled with the user when
     *     the signup completes.
     */

  }, {
    key: 'signUp',
    value: function (username, password, attrs, options) {
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
      * @param {String} username The username (or email) to log in with.
     * @param {String} password The password to log in with.
     * @param {Object} options
     * @static
     * @return {Promise} A promise that is fulfilled with the user when
     *     the login completes.
     */

  }, {
    key: 'logIn',
    value: function (username, password, options) {
      if (typeof username !== 'string') {
        return _promise2.default.reject(new _ParseError2.default(_ParseError2.default.OTHER_CAUSE, 'Username must be a string.'));
      } else if (typeof password !== 'string') {
        return _promise2.default.reject(new _ParseError2.default(_ParseError2.default.OTHER_CAUSE, 'Password must be a string.'));
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
      * @param {String} sessionToken The sessionToken to log in with.
     * @param {Object} options
     * @static
     * @return {Promise} A promise that is fulfilled with the user when
     *     the login completes.
     */

  }, {
    key: 'become',
    value: function (sessionToken, options) {
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

      var controller = _CoreManager2.default.getUserController();
      return controller.become(becomeOptions);
    }
  }, {
    key: 'logInWith',
    value: function (provider, options) {
      return ParseUser._logInWith(provider, options);
    }

    /**
     * Logs out the currently logged in user session. This will remove the
     * session from disk, log out of linked services, and future calls to
     * <code>current</code> will return <code>null</code>.
      * @static
     * @return {Promise} A promise that is resolved when the session is
     *   destroyed on the server.
     */

  }, {
    key: 'logOut',
    value: function () {
      if (!canUseCurrentUser) {
        throw new Error('There is no current user on a node.js server environment.');
      }

      var controller = _CoreManager2.default.getUserController();
      return controller.logOut();
    }

    /**
     * Requests a password reset email to be sent to the specified email address
     * associated with the user account. This email allows the user to securely
     * reset their password on the Parse site.
     *
     * <p>Calls options.success or options.error on completion.</p>
     *
      * @param {String} email The email address associated with the user that
     *     forgot their password.
     * @param {Object} options
     * @static
     * @returns {Promise}
     */

  }, {
    key: 'requestPasswordReset',
    value: function (email, options) {
      options = options || {};

      var requestOptions = {};
      if (options.hasOwnProperty('useMasterKey')) {
        requestOptions.useMasterKey = options.useMasterKey;
      }

      var controller = _CoreManager2.default.getUserController();
      return controller.requestPasswordReset(email, requestOptions);
    }

    /**
     * Allow someone to define a custom User class without className
     * being rewritten to _User. The default behavior is to rewrite
     * User to _User for legacy reasons. This allows developers to
     * override that behavior.
     *
      * @param {Boolean} isAllowed Whether or not to allow custom User class
     * @static
     */

  }, {
    key: 'allowCustomUserClass',
    value: function (isAllowed) {
      _CoreManager2.default.set('PERFORM_USER_REWRITE', !isAllowed);
    }

    /**
     * Allows a legacy application to start using revocable sessions. If the
     * current session token is not revocable, a request will be made for a new,
     * revocable session.
     * It is not necessary to call this method from cloud code unless you are
     * handling user signup or login from the server side. In a cloud code call,
     * this function will not attempt to upgrade the current token.
      * @param {Object} options
     * @static
     * @return {Promise} A promise that is resolved when the process has
     *   completed. If a replacement session token is requested, the promise
     *   will be resolved after a new token has been fetched.
     */

  }, {
    key: 'enableRevocableSession',
    value: function (options) {
      options = options || {};
      _CoreManager2.default.set('FORCE_REVOCABLE_SESSION', true);
      if (canUseCurrentUser) {
        var current = ParseUser.current();
        if (current) {
          return current._upgradeToRevocableSession(options);
        }
      }
      return _promise2.default.resolve();
    }

    /**
     * Enables the use of become or the current user in a server
     * environment. These features are disabled by default, since they depend on
     * global objects that are not memory-safe for most servers.
      * @static
     */

  }, {
    key: 'enableUnsafeCurrentUser',
    value: function () {
      canUseCurrentUser = true;
    }

    /**
     * Disables the use of become or the current user in any environment.
     * These features are disabled on servers by default, since they depend on
     * global objects that are not memory-safe for most servers.
      * @static
     */

  }, {
    key: 'disableUnsafeCurrentUser',
    value: function () {
      canUseCurrentUser = false;
    }
  }, {
    key: '_registerAuthenticationProvider',
    value: function (provider) {
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
    value: function (provider, options) {
      var user = new ParseUser();
      return user._linkWith(provider, options);
    }
  }, {
    key: '_clearCache',
    value: function () {
      currentUserCache = null;
      currentUserCacheMatchesDisk = false;
    }
  }, {
    key: '_setCurrentUserCache',
    value: function (user) {
      currentUserCache = user;
    }
  }]);
  return ParseUser;
}(_ParseObject3.default);

_ParseObject3.default.registerSubclass('_User', ParseUser);

var DefaultController = {
  updateUserOnDisk: function (user) {
    var path = _Storage2.default.generatePath(CURRENT_USER_KEY);
    var json = user.toJSON();
    json.className = '_User';
    return _Storage2.default.setItemAsync(path, (0, _stringify2.default)(json)).then(function () {
      return user;
    });
  },
  removeUserFromDisk: function () {
    var path = _Storage2.default.generatePath(CURRENT_USER_KEY);
    currentUserCacheMatchesDisk = true;
    currentUserCache = null;
    return _Storage2.default.removeItemAsync(path);
  },
  setCurrentUser: function (user) {
    currentUserCache = user;
    user._cleanupAuthData();
    user._synchronizeAllAuthData();
    return DefaultController.updateUserOnDisk(user);
  },
  currentUser: function () {
    if (currentUserCache) {
      return currentUserCache;
    }
    if (currentUserCacheMatchesDisk) {
      return null;
    }
    if (_Storage2.default.async()) {
      throw new Error('Cannot call currentUser() when using a platform with an async ' + 'storage system. Call currentUserAsync() instead.');
    }
    var path = _Storage2.default.generatePath(CURRENT_USER_KEY);
    var userData = _Storage2.default.getItem(path);
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
    var current = _ParseObject3.default.fromJSON(userData);
    currentUserCache = current;
    current._synchronizeAllAuthData();
    return current;
  },
  currentUserAsync: function () {
    if (currentUserCache) {
      return _promise2.default.resolve(currentUserCache);
    }
    if (currentUserCacheMatchesDisk) {
      return _promise2.default.resolve(null);
    }
    var path = _Storage2.default.generatePath(CURRENT_USER_KEY);
    return _Storage2.default.getItemAsync(path).then(function (userData) {
      currentUserCacheMatchesDisk = true;
      if (!userData) {
        currentUserCache = null;
        return _promise2.default.resolve(null);
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
      var current = _ParseObject3.default.fromJSON(userData);
      currentUserCache = current;
      current._synchronizeAllAuthData();
      return _promise2.default.resolve(current);
    });
  },
  signUp: function (user, attrs, options) {
    var username = attrs && attrs.username || user.get('username');
    var password = attrs && attrs.password || user.get('password');

    if (!username || !username.length) {
      return _promise2.default.reject(new _ParseError2.default(_ParseError2.default.OTHER_CAUSE, 'Cannot sign up user with an empty name.'));
    }
    if (!password || !password.length) {
      return _promise2.default.reject(new _ParseError2.default(_ParseError2.default.OTHER_CAUSE, 'Cannot sign up user with an empty password.'));
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
  logIn: function (user, options) {
    var RESTController = _CoreManager2.default.getRESTController();
    var stateController = _CoreManager2.default.getObjectStateController();
    var auth = {
      username: user.get('username'),
      password: user.get('password')
    };
    return RESTController.request('GET', 'login', auth, options).then(function (response) {
      user._migrateId(response.objectId);
      user._setExisted(true);
      stateController.setPendingOp(user._getStateIdentifier(), 'username', undefined);
      stateController.setPendingOp(user._getStateIdentifier(), 'password', undefined);
      response.password = undefined;
      user._finishFetch(response);
      if (!canUseCurrentUser) {
        // We can't set the current user, so just return the one we logged in
        return _promise2.default.resolve(user);
      }
      return DefaultController.setCurrentUser(user);
    });
  },
  become: function (options) {
    var user = new ParseUser();
    var RESTController = _CoreManager2.default.getRESTController();
    return RESTController.request('GET', 'users/me', {}, options).then(function (response) {
      user._finishFetch(response);
      user._setExisted(true);
      return DefaultController.setCurrentUser(user);
    });
  },
  logOut: function () {
    return DefaultController.currentUserAsync().then(function (currentUser) {
      var path = _Storage2.default.generatePath(CURRENT_USER_KEY);
      var promise = _Storage2.default.removeItemAsync(path);
      var RESTController = _CoreManager2.default.getRESTController();
      if (currentUser !== null) {
        var currentSession = currentUser.getSessionToken();
        if (currentSession && (0, _isRevocableSession2.default)(currentSession)) {
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
  requestPasswordReset: function (email, options) {
    var RESTController = _CoreManager2.default.getRESTController();
    return RESTController.request('POST', 'requestPasswordReset', { email: email }, options);
  },
  upgradeToRevocableSession: function (user, options) {
    var token = user.getSessionToken();
    if (!token) {
      return _promise2.default.reject(new _ParseError2.default(_ParseError2.default.SESSION_MISSING, 'Cannot upgrade a user with no session token'));
    }

    options.sessionToken = token;

    var RESTController = _CoreManager2.default.getRESTController();
    return RESTController.request('POST', 'upgradeToRevocableSession', {}, options).then(function (result) {
      var session = new _ParseSession2.default();
      session._finishFetch(result);
      user._finishFetch({ sessionToken: session.getSessionToken() });
      if (user.isCurrent()) {
        return DefaultController.setCurrentUser(user);
      }
      return _promise2.default.resolve(user);
    });
  },
  linkWith: function (user, authData) {
    return user.save({ authData: authData }).then(function () {
      if (canUseCurrentUser) {
        return DefaultController.setCurrentUser(user);
      }
      return user;
    });
  }
};

_CoreManager2.default.setUserController(DefaultController);

exports.default = ParseUser;
},{"./CoreManager":3,"./ParseError":13,"./ParseObject":18,"./ParseSession":25,"./Storage":30,"./isRevocableSession":40,"babel-runtime/core-js/json/stringify":46,"babel-runtime/core-js/object/define-property":49,"babel-runtime/core-js/object/get-prototype-of":52,"babel-runtime/core-js/promise":55,"babel-runtime/helpers/classCallCheck":59,"babel-runtime/helpers/createClass":60,"babel-runtime/helpers/get":61,"babel-runtime/helpers/inherits":62,"babel-runtime/helpers/possibleConstructorReturn":63,"babel-runtime/helpers/typeof":64}],27:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.send = send;

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _ParseQuery = _dereq_('./ParseQuery');

var _ParseQuery2 = _interopRequireDefault(_ParseQuery);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Contains functions to deal with Push in Parse.
 * @class Parse.Push
 * @static
 * @hideconstructor
 */

/**
 * Sends a push notification.
 * @method send
 * @name Parse.Push.send
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
 * @return {Promise} A promise that is fulfilled when the push request
 *     completes.
 */
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

function send(data, options) {
  options = options || {};

  if (data.where && data.where instanceof _ParseQuery2.default) {
    data.where = data.where.toJSON().where;
  }

  if (data.push_time && (0, _typeof3.default)(data.push_time) === 'object') {
    data.push_time = data.push_time.toJSON();
  }

  if (data.expiration_time && (0, _typeof3.default)(data.expiration_time) === 'object') {
    data.expiration_time = data.expiration_time.toJSON();
  }

  if (data.expiration_time && data.expiration_interval) {
    throw new Error('expiration_time and expiration_interval cannot both be set.');
  }

  return _CoreManager2.default.getPushController().send(data, {
    useMasterKey: options.useMasterKey
  });
}

var DefaultController = {
  send: function (data, options) {
    var RESTController = _CoreManager2.default.getRESTController();

    var request = RESTController.request('POST', 'push', data, { useMasterKey: !!options.useMasterKey });

    return request;
  }
};

_CoreManager2.default.setPushController(DefaultController);
},{"./CoreManager":3,"./ParseQuery":21,"babel-runtime/helpers/typeof":64}],28:[function(_dereq_,module,exports){
(function (process){
'use strict';

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = _dereq_('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = _dereq_('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

var _ParseError = _dereq_('./ParseError');

var _ParseError2 = _interopRequireDefault(_ParseError);

var _Storage = _dereq_('./Storage');

var _Storage2 = _interopRequireDefault(_Storage);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var XHR = null; /**
                 * Copyright (c) 2015-present, Parse, LLC.
                 * All rights reserved.
                 *
                 * This source code is licensed under the BSD-style license found in the
                 * LICENSE file in the root directory of this source tree. An additional grant
                 * of patent rights can be found in the PATENTS file in the same directory.
                 *
                 * 
                 */

if (typeof XMLHttpRequest !== 'undefined') {
  XHR = XMLHttpRequest;
}


var useXDomainRequest = false;
if (typeof XDomainRequest !== 'undefined' && !('withCredentials' in new XMLHttpRequest())) {
  useXDomainRequest = true;
}

function ajaxIE9(method, url, data) {
  return new _promise2.default(function (resolve, reject) {
    var xdr = new XDomainRequest();
    xdr.onload = function () {
      var response;
      try {
        response = JSON.parse(xdr.responseText);
      } catch (e) {
        reject(e);
      }
      if (response) {
        resolve({ response: response });
      }
    };
    xdr.onerror = xdr.ontimeout = function () {
      // Let's fake a real error message.
      var fakeResponse = {
        responseText: (0, _stringify2.default)({
          code: _ParseError2.default.X_DOMAIN_REQUEST,
          error: 'IE\'s XDomainRequest does not supply error info.'
        })
      };
      reject(fakeResponse);
    };
    xdr.onprogress = function () {};
    xdr.open(method, url);
    xdr.send(data);
  });
}

var RESTController = {
  ajax: function (method, url, data, headers) {
    if (useXDomainRequest) {
      return ajaxIE9(method, url, data, headers);
    }

    var res, rej;
    var promise = new _promise2.default(function (resolve, reject) {
      res = resolve;rej = reject;
    });
    promise.resolve = res;
    promise.reject = rej;
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

            if (typeof xhr.getResponseHeader === 'function') {
              if ((xhr.getAllResponseHeaders() || '').includes('x-parse-job-status-id: ')) {
                response = xhr.getResponseHeader('x-parse-job-status-id');
              }
            }
          } catch (e) {
            promise.reject(e.toString());
          }
          if (response) {
            promise.resolve({ response: response, status: xhr.status, xhr: xhr });
          }
        } else if (xhr.status >= 500 || xhr.status === 0) {
          // retry on 5XX or node-xmlhttprequest error
          if (++attempts < _CoreManager2.default.get('REQUEST_ATTEMPT_LIMIT')) {
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
      if (_CoreManager2.default.get('IS_NODE')) {
        headers['User-Agent'] = 'Parse/' + _CoreManager2.default.get('VERSION') + ' (NodeJS ' + process.versions.node + ')';
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
  request: function (method, path, data, options) {
    options = options || {};
    var url = _CoreManager2.default.get('SERVER_URL');
    if (url[url.length - 1] !== '/') {
      url += '/';
    }
    url += path;

    var payload = {};
    if (data && (typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object') {
      for (var k in data) {
        payload[k] = data[k];
      }
    }

    if (method !== 'POST') {
      payload._method = method;
      method = 'POST';
    }

    payload._ApplicationId = _CoreManager2.default.get('APPLICATION_ID');
    var jsKey = _CoreManager2.default.get('JAVASCRIPT_KEY');
    if (jsKey) {
      payload._JavaScriptKey = jsKey;
    }
    payload._ClientVersion = _CoreManager2.default.get('VERSION');

    var useMasterKey = options.useMasterKey;
    if (typeof useMasterKey === 'undefined') {
      useMasterKey = _CoreManager2.default.get('USE_MASTER_KEY');
    }
    if (useMasterKey) {
      if (_CoreManager2.default.get('MASTER_KEY')) {
        delete payload._JavaScriptKey;
        payload._MasterKey = _CoreManager2.default.get('MASTER_KEY');
      } else {
        throw new Error('Cannot use the Master Key, it has not been provided.');
      }
    }

    if (_CoreManager2.default.get('FORCE_REVOCABLE_SESSION')) {
      payload._RevocableSession = '1';
    }

    var installationId = options.installationId;
    var installationIdPromise;
    if (installationId && typeof installationId === 'string') {
      installationIdPromise = _promise2.default.resolve(installationId);
    } else {
      var installationController = _CoreManager2.default.getInstallationController();
      installationIdPromise = installationController.currentInstallationId();
    }

    return installationIdPromise.then(function (iid) {
      payload._InstallationId = iid;
      var userController = _CoreManager2.default.getUserController();
      if (options && typeof options.sessionToken === 'string') {
        return _promise2.default.resolve(options.sessionToken);
      } else if (userController) {
        return userController.currentUserAsync().then(function (user) {
          if (user) {
            return _promise2.default.resolve(user.getSessionToken());
          }
          return _promise2.default.resolve(null);
        });
      }
      return _promise2.default.resolve(null);
    }).then(function (token) {
      if (token) {
        payload._SessionToken = token;
      }

      var payloadString = (0, _stringify2.default)(payload);

      return RESTController.ajax(method, url, payloadString).then(function (_ref) {
        var response = _ref.response;

        return response;
      });
    }).catch(function (response) {
      // Transform the error into an instance of ParseError by trying to parse
      // the error string as JSON
      var error;
      if (response && response.responseText) {
        try {
          var errorJSON = JSON.parse(response.responseText);
          error = new _ParseError2.default(errorJSON.code, errorJSON.error);
        } catch (e) {
          // If we fail to parse the error text, that's okay.
          error = new _ParseError2.default(_ParseError2.default.INVALID_JSON, 'Received an error with invalid JSON from Parse: ' + response.responseText);
        }
      } else {
        error = new _ParseError2.default(_ParseError2.default.CONNECTION_FAILED, 'XMLHttpRequest failed: ' + (0, _stringify2.default)(response));
      }

      return _promise2.default.reject(error);
    });
  },
  _setXHR: function (xhr) {
    XHR = xhr;
  }
};

module.exports = RESTController;
}).call(this,_dereq_('_process'))
},{"./CoreManager":3,"./ParseError":13,"./Storage":30,"_process":65,"babel-runtime/core-js/json/stringify":46,"babel-runtime/core-js/promise":55,"babel-runtime/helpers/typeof":64}],29:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
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

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

var objectState = {}; /**
                       * Copyright (c) 2015-present, Parse, LLC.
                       * All rights reserved.
                       *
                       * This source code is licensed under the BSD-style license found in the
                       * LICENSE file in the root directory of this source tree. An additional grant
                       * of patent rights can be found in the PATENTS file in the same directory.
                       *
                       * 
                       */

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
},{"./ObjectStateMutations":9}],30:[function(_dereq_,module,exports){
'use strict';

var _promise = _dereq_('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _CoreManager = _dereq_('./CoreManager');

var _CoreManager2 = _interopRequireDefault(_CoreManager);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Storage = {
  async: function () {
    var controller = _CoreManager2.default.getStorageController();
    return !!controller.async;
  },
  getItem: function (path) {
    var controller = _CoreManager2.default.getStorageController();
    if (controller.async === 1) {
      throw new Error('Synchronous storage is not supported by the current storage controller');
    }
    return controller.getItem(path);
  },
  getItemAsync: function (path) {
    var controller = _CoreManager2.default.getStorageController();
    if (controller.async === 1) {
      return controller.getItemAsync(path);
    }
    return _promise2.default.resolve(controller.getItem(path));
  },
  setItem: function (path, value) {
    var controller = _CoreManager2.default.getStorageController();
    if (controller.async === 1) {
      throw new Error('Synchronous storage is not supported by the current storage controller');
    }
    return controller.setItem(path, value);
  },
  setItemAsync: function (path, value) {
    var controller = _CoreManager2.default.getStorageController();
    if (controller.async === 1) {
      return controller.setItemAsync(path, value);
    }
    return _promise2.default.resolve(controller.setItem(path, value));
  },
  removeItem: function (path) {
    var controller = _CoreManager2.default.getStorageController();
    if (controller.async === 1) {
      throw new Error('Synchronous storage is not supported by the current storage controller');
    }
    return controller.removeItem(path);
  },
  removeItemAsync: function (path) {
    var controller = _CoreManager2.default.getStorageController();
    if (controller.async === 1) {
      return controller.removeItemAsync(path);
    }
    return _promise2.default.resolve(controller.removeItem(path));
  },
  generatePath: function (path) {
    if (!_CoreManager2.default.get('APPLICATION_ID')) {
      throw new Error('You need to call Parse.initialize before using Parse.');
    }
    if (typeof path !== 'string') {
      throw new Error('Tried to get a Storage path that was not a String.');
    }
    if (path[0] === '/') {
      path = path.substr(1);
    }
    return 'Parse/' + _CoreManager2.default.get('APPLICATION_ID') + '/' + path;
  },
  _clear: function () {
    var controller = _CoreManager2.default.getStorageController();
    if (controller.hasOwnProperty('clear')) {
      controller.clear();
    }
  }
}; /**
    * Copyright (c) 2015-present, Parse, LLC.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree. An additional grant
    * of patent rights can be found in the PATENTS file in the same directory.
    *
    * 
    */

module.exports = Storage;

_CoreManager2.default.setStorageController(_dereq_('./StorageController.browser'));
},{"./CoreManager":3,"./StorageController.browser":31,"babel-runtime/core-js/promise":55}],31:[function(_dereq_,module,exports){
"use strict";

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

var StorageController = {
  async: 0,

  getItem: function (path) {
    return localStorage.getItem(path);
  },
  setItem: function (path, value) {
    try {
      localStorage.setItem(path, value);
    } catch (e) {
      // Quota exceeded, possibly due to Safari Private Browsing mode
    }
  },
  removeItem: function (path) {
    localStorage.removeItem(path);
  },
  clear: function () {
    localStorage.clear();
  }
};

module.exports = StorageController;
},{}],32:[function(_dereq_,module,exports){
"use strict";

var _promise = _dereq_("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = _dereq_("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = _dereq_("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var TaskQueue = function () {
  function TaskQueue() {
    (0, _classCallCheck3.default)(this, TaskQueue);

    this.queue = [];
  }

  (0, _createClass3.default)(TaskQueue, [{
    key: "enqueue",
    value: function (task) {
      var _this = this;

      var res;
      var rej;
      var taskComplete = new _promise2.default(function (resolve, reject) {
        res = resolve;
        rej = reject;
      });
      taskComplete.resolve = res;
      taskComplete.reject = rej;
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
    key: "_dequeue",
    value: function () {
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
}(); /**
      * Copyright (c) 2015-present, Parse, LLC.
      * All rights reserved.
      *
      * This source code is licensed under the BSD-style license found in the
      * LICENSE file in the root directory of this source tree. An additional grant
      * of patent rights can be found in the PATENTS file in the same directory.
      *
      * 
      */

module.exports = TaskQueue;
},{"babel-runtime/core-js/promise":55,"babel-runtime/helpers/classCallCheck":59,"babel-runtime/helpers/createClass":60}],33:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _weakMap = _dereq_('babel-runtime/core-js/weak-map');

var _weakMap2 = _interopRequireDefault(_weakMap);

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

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

var objectState = new _weakMap2.default();

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
      tasks: new _TaskQueue2.default(),
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
  objectState.delete(obj);
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
    for (var _key in oldState.pendingOps[index]) {
      newState.pendingOps[index][_key] = oldState.pendingOps[index][_key];
    }
  }
  for (var _key2 in oldState.objectCache) {
    newState.objectCache[_key2] = oldState.objectCache[_key2];
  }
  newState.existed = oldState.existed;
}

function clearAllState() {
  objectState = new _weakMap2.default();
}
},{"./ObjectStateMutations":9,"./TaskQueue":32,"babel-runtime/core-js/weak-map":58}],34:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = arrayContainsObject;

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function arrayContainsObject(array, object) {
  if (array.indexOf(object) > -1) {
    return true;
  }
  for (var i = 0; i < array.length; i++) {
    if (array[i] instanceof _ParseObject2.default && array[i].className === object.className && array[i]._getId() === object._getId()) {
      return true;
    }
  }
  return false;
} /**
   * Copyright (c) 2015-present, Parse, LLC.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * 
   */
},{"./ParseObject":18}],35:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = canBeSerialized;

var _ParseFile = _dereq_('./ParseFile');

var _ParseFile2 = _interopRequireDefault(_ParseFile);

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParseRelation = _dereq_('./ParseRelation');

var _ParseRelation2 = _interopRequireDefault(_ParseRelation);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function canBeSerialized(obj) {
  if (!(obj instanceof _ParseObject2.default)) {
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
} /**
   * Copyright (c) 2015-present, Parse, LLC.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * 
   */

function canBeSerializedHelper(value) {
  if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) !== 'object') {
    return true;
  }
  if (value instanceof _ParseRelation2.default) {
    return true;
  }
  if (value instanceof _ParseObject2.default) {
    return !!value.id;
  }
  if (value instanceof _ParseFile2.default) {
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
},{"./ParseFile":14,"./ParseObject":18,"./ParseRelation":22,"babel-runtime/helpers/typeof":64}],36:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = decode;

var _ParseACL = _dereq_('./ParseACL');

var _ParseACL2 = _interopRequireDefault(_ParseACL);

var _ParseFile = _dereq_('./ParseFile');

var _ParseFile2 = _interopRequireDefault(_ParseFile);

var _ParseGeoPoint = _dereq_('./ParseGeoPoint');

var _ParseGeoPoint2 = _interopRequireDefault(_ParseGeoPoint);

var _ParsePolygon = _dereq_('./ParsePolygon');

var _ParsePolygon2 = _interopRequireDefault(_ParsePolygon);

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParseOp = _dereq_('./ParseOp');

var _ParseRelation = _dereq_('./ParseRelation');

var _ParseRelation2 = _interopRequireDefault(_ParseRelation);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function decode(value) {
  if (value === null || (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) !== 'object') {
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
    return _ParseObject2.default.fromJSON(value);
  }
  if (value.__type === 'Object' && value.className) {
    return _ParseObject2.default.fromJSON(value);
  }
  if (value.__type === 'Relation') {
    // The parent and key fields will be populated by the parent
    var relation = new _ParseRelation2.default(null, null);
    relation.targetClassName = value.className;
    return relation;
  }
  if (value.__type === 'Date') {
    return new Date(value.iso);
  }
  if (value.__type === 'File') {
    return _ParseFile2.default.fromJSON(value);
  }
  if (value.__type === 'GeoPoint') {
    return new _ParseGeoPoint2.default({
      latitude: value.latitude,
      longitude: value.longitude
    });
  }
  if (value.__type === 'Polygon') {
    return new _ParsePolygon2.default(value.coordinates);
  }
  var copy = {};
  for (var k in value) {
    copy[k] = decode(value[k]);
  }
  return copy;
} /**
   * Copyright (c) 2015-present, Parse, LLC.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * 
   */
},{"./ParseACL":11,"./ParseFile":14,"./ParseGeoPoint":15,"./ParseObject":18,"./ParseOp":19,"./ParsePolygon":20,"./ParseRelation":22,"babel-runtime/helpers/typeof":64}],37:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = _dereq_('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = function (value, disallowObjects, forcePointers, seen) {
  return encode(value, !!disallowObjects, !!forcePointers, seen || []);
};

var _ParseACL = _dereq_('./ParseACL');

var _ParseACL2 = _interopRequireDefault(_ParseACL);

var _ParseFile = _dereq_('./ParseFile');

var _ParseFile2 = _interopRequireDefault(_ParseFile);

var _ParseGeoPoint = _dereq_('./ParseGeoPoint');

var _ParseGeoPoint2 = _interopRequireDefault(_ParseGeoPoint);

var _ParsePolygon = _dereq_('./ParsePolygon');

var _ParsePolygon2 = _interopRequireDefault(_ParsePolygon);

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParseOp = _dereq_('./ParseOp');

var _ParseRelation = _dereq_('./ParseRelation');

var _ParseRelation2 = _interopRequireDefault(_ParseRelation);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var toString = Object.prototype.toString; /**
                                           * Copyright (c) 2015-present, Parse, LLC.
                                           * All rights reserved.
                                           *
                                           * This source code is licensed under the BSD-style license found in the
                                           * LICENSE file in the root directory of this source tree. An additional grant
                                           * of patent rights can be found in the PATENTS file in the same directory.
                                           *
                                           * 
                                           */

function encode(value, disallowObjects, forcePointers, seen) {
  if (value instanceof _ParseObject2.default) {
    if (disallowObjects) {
      throw new Error('Parse Objects not allowed here');
    }
    var seenEntry = value.id ? value.className + ':' + value.id : value;
    if (forcePointers || !seen || seen.indexOf(seenEntry) > -1 || value.dirty() || (0, _keys2.default)(value._getServerData()).length < 1) {
      return value.toPointer();
    }
    seen = seen.concat(seenEntry);
    return value._toFullJSON(seen);
  }
  if (value instanceof _ParseOp.Op || value instanceof _ParseACL2.default || value instanceof _ParseGeoPoint2.default || value instanceof _ParsePolygon2.default || value instanceof _ParseRelation2.default) {
    return value.toJSON();
  }
  if (value instanceof _ParseFile2.default) {
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

  if (value && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
    var output = {};
    for (var k in value) {
      output[k] = encode(value[k], disallowObjects, forcePointers, seen);
    }
    return output;
  }

  return value;
}
},{"./ParseACL":11,"./ParseFile":14,"./ParseGeoPoint":15,"./ParseObject":18,"./ParseOp":19,"./ParsePolygon":20,"./ParseRelation":22,"babel-runtime/core-js/object/keys":53,"babel-runtime/helpers/typeof":64}],38:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = _dereq_('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = equals;

var _ParseACL = _dereq_('./ParseACL');

var _ParseACL2 = _interopRequireDefault(_ParseACL);

var _ParseFile = _dereq_('./ParseFile');

var _ParseFile2 = _interopRequireDefault(_ParseFile);

var _ParseGeoPoint = _dereq_('./ParseGeoPoint');

var _ParseGeoPoint2 = _interopRequireDefault(_ParseGeoPoint);

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

function equals(a, b) {
  if ((typeof a === 'undefined' ? 'undefined' : (0, _typeof3.default)(a)) !== (typeof b === 'undefined' ? 'undefined' : (0, _typeof3.default)(b))) {
    return false;
  }

  if (!a || (typeof a === 'undefined' ? 'undefined' : (0, _typeof3.default)(a)) !== 'object') {
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

  if (a instanceof _ParseACL2.default || a instanceof _ParseFile2.default || a instanceof _ParseGeoPoint2.default || a instanceof _ParseObject2.default) {
    return a.equals(b);
  }

  if ((0, _keys2.default)(a).length !== (0, _keys2.default)(b).length) {
    return false;
  }
  for (var k in a) {
    if (!equals(a[k], b[k])) {
      return false;
    }
  }
  return true;
}
},{"./ParseACL":11,"./ParseFile":14,"./ParseGeoPoint":15,"./ParseObject":18,"babel-runtime/core-js/object/keys":53,"babel-runtime/helpers/typeof":64}],39:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = escape;
/*
 * Copyright (c) 2015-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

var encoded = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '/': '&#x2F;',
  '\'': '&#x27;',
  '"': '&quot;'
};

function escape(str) {
  return str.replace(/[&<>\/'"]/g, function (char) {
    return encoded[char];
  });
}
},{}],40:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isRevocableSession;
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

function isRevocableSession(token) {
  return token.indexOf('r:') > -1;
}
},{}],41:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseDate;
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
},{}],42:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = _dereq_('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.resolvingPromise = resolvingPromise;
exports.when = when;
exports.continueWhile = continueWhile;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function resolvingPromise() {
  var res = void 0;
  var rej = void 0;
  var promise = new _promise2.default(function (resolve, reject) {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return promise;
}

function when(promises) {
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
    return _promise2.default.resolve(returnValue);
  }

  var promise = new resolvingPromise();

  var resolveOne = function () {
    total--;
    if (total <= 0) {
      if (hadError) {
        promise.reject(errors);
      } else {
        promise.resolve(returnValue);
      }
    }
  };

  var chain = function (object, index) {
    if (object && typeof object.then === 'function') {
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

function continueWhile(test, emitter) {
  if (test()) {
    return emitter().then(function () {
      return continueWhile(test, emitter);
    });
  }
  return _promise2.default.resolve();
}
},{"babel-runtime/core-js/promise":55}],43:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unique;

var _arrayContainsObject = _dereq_('./arrayContainsObject');

var _arrayContainsObject2 = _interopRequireDefault(_arrayContainsObject);

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

function unique(arr) {
  var uniques = [];
  arr.forEach(function (value) {
    if (value instanceof _ParseObject2.default) {
      if (!(0, _arrayContainsObject2.default)(uniques, value)) {
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
},{"./ParseObject":18,"./arrayContainsObject":34}],44:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = _dereq_('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = unsavedChildren;

var _ParseFile = _dereq_('./ParseFile');

var _ParseFile2 = _interopRequireDefault(_ParseFile);

var _ParseObject = _dereq_('./ParseObject');

var _ParseObject2 = _interopRequireDefault(_ParseObject);

var _ParseRelation = _dereq_('./ParseRelation');

var _ParseRelation2 = _interopRequireDefault(_ParseRelation);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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
    if ((0, _typeof3.default)(attributes[attr]) === 'object') {
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
} /**
   * Copyright (c) 2015-present, Parse, LLC.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * 
   */

function traverse(obj, encountered, shouldThrow, allowDeepUnsaved) {
  if (obj instanceof _ParseObject2.default) {
    if (!obj.id && shouldThrow) {
      throw new Error('Cannot create a pointer to an unsaved Object.');
    }
    var identifier = obj.className + ':' + obj._getId();
    if (!encountered.objects[identifier]) {
      encountered.objects[identifier] = obj.dirty() ? obj : true;
      var attributes = obj.attributes;
      for (var attr in attributes) {
        if ((0, _typeof3.default)(attributes[attr]) === 'object') {
          traverse(attributes[attr], encountered, !allowDeepUnsaved, allowDeepUnsaved);
        }
      }
    }
    return;
  }
  if (obj instanceof _ParseFile2.default) {
    if (!obj.url() && encountered.files.indexOf(obj) < 0) {
      encountered.files.push(obj);
    }
    return;
  }
  if (obj instanceof _ParseRelation2.default) {
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach(function (el) {
      if ((typeof el === 'undefined' ? 'undefined' : (0, _typeof3.default)(el)) === 'object') {
        traverse(el, encountered, shouldThrow, allowDeepUnsaved);
      }
    });
  }
  for (var k in obj) {
    if ((0, _typeof3.default)(obj[k]) === 'object') {
      traverse(obj[k], encountered, shouldThrow, allowDeepUnsaved);
    }
  }
}
},{"./ParseFile":14,"./ParseObject":18,"./ParseRelation":22,"babel-runtime/helpers/typeof":64}],45:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":66}],46:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":67}],47:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/map"), __esModule: true };
},{"core-js/library/fn/map":68}],48:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":69}],49:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":70}],50:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/freeze"), __esModule: true };
},{"core-js/library/fn/object/freeze":71}],51:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":72}],52:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/get-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/get-prototype-of":73}],53:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":74}],54:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":75}],55:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":76}],56:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":77}],57:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":78}],58:[function(_dereq_,module,exports){
module.exports = { "default": _dereq_("core-js/library/fn/weak-map"), __esModule: true };
},{"core-js/library/fn/weak-map":79}],59:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],60:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = _dereq_("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":49}],61:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

var _getPrototypeOf = _dereq_("../core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = _dereq_("../core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
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
};
},{"../core-js/object/get-own-property-descriptor":51,"../core-js/object/get-prototype-of":52}],62:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

var _setPrototypeOf = _dereq_("../core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = _dereq_("../core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = _dereq_("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
},{"../core-js/object/create":48,"../core-js/object/set-prototype-of":54,"../helpers/typeof":64}],63:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

var _typeof2 = _dereq_("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
},{"../helpers/typeof":64}],64:[function(_dereq_,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = _dereq_("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = _dereq_("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":56,"../core-js/symbol/iterator":57}],65:[function(_dereq_,module,exports){

},{}],66:[function(_dereq_,module,exports){
_dereq_('../modules/web.dom.iterable');
_dereq_('../modules/es6.string.iterator');
module.exports = _dereq_('../modules/core.get-iterator');
},{"../modules/core.get-iterator":160,"../modules/es6.string.iterator":172,"../modules/web.dom.iterable":178}],67:[function(_dereq_,module,exports){
var core  = _dereq_('../../modules/_core')
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};
},{"../../modules/_core":95}],68:[function(_dereq_,module,exports){
_dereq_('../modules/es6.object.to-string');
_dereq_('../modules/es6.string.iterator');
_dereq_('../modules/web.dom.iterable');
_dereq_('../modules/es6.map');
_dereq_('../modules/es7.map.to-json');
module.exports = _dereq_('../modules/_core').Map;
},{"../modules/_core":95,"../modules/es6.map":162,"../modules/es6.object.to-string":170,"../modules/es6.string.iterator":172,"../modules/es7.map.to-json":175,"../modules/web.dom.iterable":178}],69:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.create');
var $Object = _dereq_('../../modules/_core').Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};
},{"../../modules/_core":95,"../../modules/es6.object.create":163}],70:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.define-property');
var $Object = _dereq_('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":95,"../../modules/es6.object.define-property":164}],71:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.freeze');
module.exports = _dereq_('../../modules/_core').Object.freeze;
},{"../../modules/_core":95,"../../modules/es6.object.freeze":165}],72:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.get-own-property-descriptor');
var $Object = _dereq_('../../modules/_core').Object;
module.exports = function getOwnPropertyDescriptor(it, key){
  return $Object.getOwnPropertyDescriptor(it, key);
};
},{"../../modules/_core":95,"../../modules/es6.object.get-own-property-descriptor":166}],73:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.get-prototype-of');
module.exports = _dereq_('../../modules/_core').Object.getPrototypeOf;
},{"../../modules/_core":95,"../../modules/es6.object.get-prototype-of":167}],74:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.keys');
module.exports = _dereq_('../../modules/_core').Object.keys;
},{"../../modules/_core":95,"../../modules/es6.object.keys":168}],75:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.object.set-prototype-of');
module.exports = _dereq_('../../modules/_core').Object.setPrototypeOf;
},{"../../modules/_core":95,"../../modules/es6.object.set-prototype-of":169}],76:[function(_dereq_,module,exports){
_dereq_('../modules/es6.object.to-string');
_dereq_('../modules/es6.string.iterator');
_dereq_('../modules/web.dom.iterable');
_dereq_('../modules/es6.promise');
module.exports = _dereq_('../modules/_core').Promise;
},{"../modules/_core":95,"../modules/es6.object.to-string":170,"../modules/es6.promise":171,"../modules/es6.string.iterator":172,"../modules/web.dom.iterable":178}],77:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.symbol');
_dereq_('../../modules/es6.object.to-string');
_dereq_('../../modules/es7.symbol.async-iterator');
_dereq_('../../modules/es7.symbol.observable');
module.exports = _dereq_('../../modules/_core').Symbol;
},{"../../modules/_core":95,"../../modules/es6.object.to-string":170,"../../modules/es6.symbol":173,"../../modules/es7.symbol.async-iterator":176,"../../modules/es7.symbol.observable":177}],78:[function(_dereq_,module,exports){
_dereq_('../../modules/es6.string.iterator');
_dereq_('../../modules/web.dom.iterable');
module.exports = _dereq_('../../modules/_wks-ext').f('iterator');
},{"../../modules/_wks-ext":157,"../../modules/es6.string.iterator":172,"../../modules/web.dom.iterable":178}],79:[function(_dereq_,module,exports){
_dereq_('../modules/es6.object.to-string');
_dereq_('../modules/web.dom.iterable');
_dereq_('../modules/es6.weak-map');
module.exports = _dereq_('../modules/_core').WeakMap;
},{"../modules/_core":95,"../modules/es6.object.to-string":170,"../modules/es6.weak-map":174,"../modules/web.dom.iterable":178}],80:[function(_dereq_,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],81:[function(_dereq_,module,exports){
module.exports = function(){ /* empty */ };
},{}],82:[function(_dereq_,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],83:[function(_dereq_,module,exports){
var isObject = _dereq_('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":114}],84:[function(_dereq_,module,exports){
var forOf = _dereq_('./_for-of');

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":104}],85:[function(_dereq_,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = _dereq_('./_to-iobject')
  , toLength  = _dereq_('./_to-length')
  , toIndex   = _dereq_('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":149,"./_to-iobject":151,"./_to-length":152}],86:[function(_dereq_,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = _dereq_('./_ctx')
  , IObject  = _dereq_('./_iobject')
  , toObject = _dereq_('./_to-object')
  , toLength = _dereq_('./_to-length')
  , asc      = _dereq_('./_array-species-create');
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
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
},{"./_array-species-create":88,"./_ctx":96,"./_iobject":111,"./_to-length":152,"./_to-object":153}],87:[function(_dereq_,module,exports){
var isObject = _dereq_('./_is-object')
  , isArray  = _dereq_('./_is-array')
  , SPECIES  = _dereq_('./_wks')('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};
},{"./_is-array":113,"./_is-object":114,"./_wks":158}],88:[function(_dereq_,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = _dereq_('./_array-species-constructor');

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};
},{"./_array-species-constructor":87}],89:[function(_dereq_,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = _dereq_('./_cof')
  , TAG = _dereq_('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":90,"./_wks":158}],90:[function(_dereq_,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],91:[function(_dereq_,module,exports){
'use strict';
var dP          = _dereq_('./_object-dp').f
  , create      = _dereq_('./_object-create')
  , redefineAll = _dereq_('./_redefine-all')
  , ctx         = _dereq_('./_ctx')
  , anInstance  = _dereq_('./_an-instance')
  , defined     = _dereq_('./_defined')
  , forOf       = _dereq_('./_for-of')
  , $iterDefine = _dereq_('./_iter-define')
  , step        = _dereq_('./_iter-step')
  , setSpecies  = _dereq_('./_set-species')
  , DESCRIPTORS = _dereq_('./_descriptors')
  , fastKey     = _dereq_('./_meta').fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

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
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
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
        anInstance(this, C, 'forEach');
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
    if(DESCRIPTORS)dP(C.prototype, 'size', {
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
},{"./_an-instance":82,"./_ctx":96,"./_defined":97,"./_descriptors":98,"./_for-of":104,"./_iter-define":117,"./_iter-step":119,"./_meta":123,"./_object-create":126,"./_object-dp":127,"./_redefine-all":139,"./_set-species":142}],92:[function(_dereq_,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = _dereq_('./_classof')
  , from    = _dereq_('./_array-from-iterable');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};
},{"./_array-from-iterable":84,"./_classof":89}],93:[function(_dereq_,module,exports){
'use strict';
var redefineAll       = _dereq_('./_redefine-all')
  , getWeak           = _dereq_('./_meta').getWeak
  , anObject          = _dereq_('./_an-object')
  , isObject          = _dereq_('./_is-object')
  , anInstance        = _dereq_('./_an-instance')
  , forOf             = _dereq_('./_for-of')
  , createArrayMethod = _dereq_('./_array-methods')
  , $has              = _dereq_('./_has')
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
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
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};
},{"./_an-instance":82,"./_an-object":83,"./_array-methods":86,"./_for-of":104,"./_has":106,"./_is-object":114,"./_meta":123,"./_redefine-all":139}],94:[function(_dereq_,module,exports){
'use strict';
var global         = _dereq_('./_global')
  , $export        = _dereq_('./_export')
  , meta           = _dereq_('./_meta')
  , fails          = _dereq_('./_fails')
  , hide           = _dereq_('./_hide')
  , redefineAll    = _dereq_('./_redefine-all')
  , forOf          = _dereq_('./_for-of')
  , anInstance     = _dereq_('./_an-instance')
  , isObject       = _dereq_('./_is-object')
  , setToStringTag = _dereq_('./_set-to-string-tag')
  , dP             = _dereq_('./_object-dp').f
  , each           = _dereq_('./_array-methods')(0)
  , DESCRIPTORS    = _dereq_('./_descriptors');

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
    meta.NEED = true;
  } else {
    C = wrapper(function(target, iterable){
      anInstance(target, C, NAME, '_c');
      target._c = new Base;
      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
        anInstance(this, C, KEY);
        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    if('size' in proto)dP(C.prototype, 'size', {
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
},{"./_an-instance":82,"./_array-methods":86,"./_descriptors":98,"./_export":102,"./_fails":103,"./_for-of":104,"./_global":105,"./_hide":107,"./_is-object":114,"./_meta":123,"./_object-dp":127,"./_redefine-all":139,"./_set-to-string-tag":143}],95:[function(_dereq_,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],96:[function(_dereq_,module,exports){
// optional / simple context binding
var aFunction = _dereq_('./_a-function');
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
},{"./_a-function":80}],97:[function(_dereq_,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],98:[function(_dereq_,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !_dereq_('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":103}],99:[function(_dereq_,module,exports){
var isObject = _dereq_('./_is-object')
  , document = _dereq_('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":105,"./_is-object":114}],100:[function(_dereq_,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],101:[function(_dereq_,module,exports){
// all enumerable object keys, includes symbols
var getKeys = _dereq_('./_object-keys')
  , gOPS    = _dereq_('./_object-gops')
  , pIE     = _dereq_('./_object-pie');
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"./_object-gops":132,"./_object-keys":135,"./_object-pie":136}],102:[function(_dereq_,module,exports){
var global    = _dereq_('./_global')
  , core      = _dereq_('./_core')
  , ctx       = _dereq_('./_ctx')
  , hide      = _dereq_('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":95,"./_ctx":96,"./_global":105,"./_hide":107}],103:[function(_dereq_,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],104:[function(_dereq_,module,exports){
var ctx         = _dereq_('./_ctx')
  , call        = _dereq_('./_iter-call')
  , isArrayIter = _dereq_('./_is-array-iter')
  , anObject    = _dereq_('./_an-object')
  , toLength    = _dereq_('./_to-length')
  , getIterFn   = _dereq_('./core.get-iterator-method')
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;
},{"./_an-object":83,"./_ctx":96,"./_is-array-iter":112,"./_iter-call":115,"./_to-length":152,"./core.get-iterator-method":159}],105:[function(_dereq_,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],106:[function(_dereq_,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],107:[function(_dereq_,module,exports){
var dP         = _dereq_('./_object-dp')
  , createDesc = _dereq_('./_property-desc');
module.exports = _dereq_('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":98,"./_object-dp":127,"./_property-desc":138}],108:[function(_dereq_,module,exports){
module.exports = _dereq_('./_global').document && document.documentElement;
},{"./_global":105}],109:[function(_dereq_,module,exports){
module.exports = !_dereq_('./_descriptors') && !_dereq_('./_fails')(function(){
  return Object.defineProperty(_dereq_('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":98,"./_dom-create":99,"./_fails":103}],110:[function(_dereq_,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],111:[function(_dereq_,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = _dereq_('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":90}],112:[function(_dereq_,module,exports){
// check on default Array iterator
var Iterators  = _dereq_('./_iterators')
  , ITERATOR   = _dereq_('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":120,"./_wks":158}],113:[function(_dereq_,module,exports){
// 7.2.2 IsArray(argument)
var cof = _dereq_('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":90}],114:[function(_dereq_,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],115:[function(_dereq_,module,exports){
// call something on iterator step with safe closing on error
var anObject = _dereq_('./_an-object');
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
},{"./_an-object":83}],116:[function(_dereq_,module,exports){
'use strict';
var create         = _dereq_('./_object-create')
  , descriptor     = _dereq_('./_property-desc')
  , setToStringTag = _dereq_('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_dereq_('./_hide')(IteratorPrototype, _dereq_('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":107,"./_object-create":126,"./_property-desc":138,"./_set-to-string-tag":143,"./_wks":158}],117:[function(_dereq_,module,exports){
'use strict';
var LIBRARY        = _dereq_('./_library')
  , $export        = _dereq_('./_export')
  , redefine       = _dereq_('./_redefine')
  , hide           = _dereq_('./_hide')
  , has            = _dereq_('./_has')
  , Iterators      = _dereq_('./_iterators')
  , $iterCreate    = _dereq_('./_iter-create')
  , setToStringTag = _dereq_('./_set-to-string-tag')
  , getPrototypeOf = _dereq_('./_object-gpo')
  , ITERATOR       = _dereq_('./_wks')('iterator')
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
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
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
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":102,"./_has":106,"./_hide":107,"./_iter-create":116,"./_iterators":120,"./_library":122,"./_object-gpo":133,"./_redefine":140,"./_set-to-string-tag":143,"./_wks":158}],118:[function(_dereq_,module,exports){
var ITERATOR     = _dereq_('./_wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./_wks":158}],119:[function(_dereq_,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],120:[function(_dereq_,module,exports){
module.exports = {};
},{}],121:[function(_dereq_,module,exports){
var getKeys   = _dereq_('./_object-keys')
  , toIObject = _dereq_('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":135,"./_to-iobject":151}],122:[function(_dereq_,module,exports){
module.exports = true;
},{}],123:[function(_dereq_,module,exports){
var META     = _dereq_('./_uid')('meta')
  , isObject = _dereq_('./_is-object')
  , has      = _dereq_('./_has')
  , setDesc  = _dereq_('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !_dereq_('./_fails')(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"./_fails":103,"./_has":106,"./_is-object":114,"./_object-dp":127,"./_uid":155}],124:[function(_dereq_,module,exports){
var global    = _dereq_('./_global')
  , macrotask = _dereq_('./_task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = _dereq_('./_cof')(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};
},{"./_cof":90,"./_global":105,"./_task":148}],125:[function(_dereq_,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = _dereq_('./_object-keys')
  , gOPS     = _dereq_('./_object-gops')
  , pIE      = _dereq_('./_object-pie')
  , toObject = _dereq_('./_to-object')
  , IObject  = _dereq_('./_iobject')
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || _dereq_('./_fails')(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;
},{"./_fails":103,"./_iobject":111,"./_object-gops":132,"./_object-keys":135,"./_object-pie":136,"./_to-object":153}],126:[function(_dereq_,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = _dereq_('./_an-object')
  , dPs         = _dereq_('./_object-dps')
  , enumBugKeys = _dereq_('./_enum-bug-keys')
  , IE_PROTO    = _dereq_('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _dereq_('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  _dereq_('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":83,"./_dom-create":99,"./_enum-bug-keys":100,"./_html":108,"./_object-dps":128,"./_shared-key":144}],127:[function(_dereq_,module,exports){
var anObject       = _dereq_('./_an-object')
  , IE8_DOM_DEFINE = _dereq_('./_ie8-dom-define')
  , toPrimitive    = _dereq_('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = _dereq_('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":83,"./_descriptors":98,"./_ie8-dom-define":109,"./_to-primitive":154}],128:[function(_dereq_,module,exports){
var dP       = _dereq_('./_object-dp')
  , anObject = _dereq_('./_an-object')
  , getKeys  = _dereq_('./_object-keys');

module.exports = _dereq_('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":83,"./_descriptors":98,"./_object-dp":127,"./_object-keys":135}],129:[function(_dereq_,module,exports){
var pIE            = _dereq_('./_object-pie')
  , createDesc     = _dereq_('./_property-desc')
  , toIObject      = _dereq_('./_to-iobject')
  , toPrimitive    = _dereq_('./_to-primitive')
  , has            = _dereq_('./_has')
  , IE8_DOM_DEFINE = _dereq_('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = _dereq_('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":98,"./_has":106,"./_ie8-dom-define":109,"./_object-pie":136,"./_property-desc":138,"./_to-iobject":151,"./_to-primitive":154}],130:[function(_dereq_,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = _dereq_('./_to-iobject')
  , gOPN      = _dereq_('./_object-gopn').f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":131,"./_to-iobject":151}],131:[function(_dereq_,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = _dereq_('./_object-keys-internal')
  , hiddenKeys = _dereq_('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":100,"./_object-keys-internal":134}],132:[function(_dereq_,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],133:[function(_dereq_,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = _dereq_('./_has')
  , toObject    = _dereq_('./_to-object')
  , IE_PROTO    = _dereq_('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":106,"./_shared-key":144,"./_to-object":153}],134:[function(_dereq_,module,exports){
var has          = _dereq_('./_has')
  , toIObject    = _dereq_('./_to-iobject')
  , arrayIndexOf = _dereq_('./_array-includes')(false)
  , IE_PROTO     = _dereq_('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":85,"./_has":106,"./_shared-key":144,"./_to-iobject":151}],135:[function(_dereq_,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = _dereq_('./_object-keys-internal')
  , enumBugKeys = _dereq_('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":100,"./_object-keys-internal":134}],136:[function(_dereq_,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],137:[function(_dereq_,module,exports){
// most Object methods by ES6 should accept primitives
var $export = _dereq_('./_export')
  , core    = _dereq_('./_core')
  , fails   = _dereq_('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":95,"./_export":102,"./_fails":103}],138:[function(_dereq_,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],139:[function(_dereq_,module,exports){
var hide = _dereq_('./_hide');
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};
},{"./_hide":107}],140:[function(_dereq_,module,exports){
module.exports = _dereq_('./_hide');
},{"./_hide":107}],141:[function(_dereq_,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = _dereq_('./_is-object')
  , anObject = _dereq_('./_an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = _dereq_('./_ctx')(Function.call, _dereq_('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
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
},{"./_an-object":83,"./_ctx":96,"./_is-object":114,"./_object-gopd":129}],142:[function(_dereq_,module,exports){
'use strict';
var global      = _dereq_('./_global')
  , core        = _dereq_('./_core')
  , dP          = _dereq_('./_object-dp')
  , DESCRIPTORS = _dereq_('./_descriptors')
  , SPECIES     = _dereq_('./_wks')('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_core":95,"./_descriptors":98,"./_global":105,"./_object-dp":127,"./_wks":158}],143:[function(_dereq_,module,exports){
var def = _dereq_('./_object-dp').f
  , has = _dereq_('./_has')
  , TAG = _dereq_('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":106,"./_object-dp":127,"./_wks":158}],144:[function(_dereq_,module,exports){
var shared = _dereq_('./_shared')('keys')
  , uid    = _dereq_('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":145,"./_uid":155}],145:[function(_dereq_,module,exports){
var global = _dereq_('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":105}],146:[function(_dereq_,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = _dereq_('./_an-object')
  , aFunction = _dereq_('./_a-function')
  , SPECIES   = _dereq_('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":80,"./_an-object":83,"./_wks":158}],147:[function(_dereq_,module,exports){
var toInteger = _dereq_('./_to-integer')
  , defined   = _dereq_('./_defined');
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
},{"./_defined":97,"./_to-integer":150}],148:[function(_dereq_,module,exports){
var ctx                = _dereq_('./_ctx')
  , invoke             = _dereq_('./_invoke')
  , html               = _dereq_('./_html')
  , cel                = _dereq_('./_dom-create')
  , global             = _dereq_('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(_dereq_('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":90,"./_ctx":96,"./_dom-create":99,"./_global":105,"./_html":108,"./_invoke":110}],149:[function(_dereq_,module,exports){
var toInteger = _dereq_('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":150}],150:[function(_dereq_,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],151:[function(_dereq_,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = _dereq_('./_iobject')
  , defined = _dereq_('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":97,"./_iobject":111}],152:[function(_dereq_,module,exports){
// 7.1.15 ToLength
var toInteger = _dereq_('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":150}],153:[function(_dereq_,module,exports){
// 7.1.13 ToObject(argument)
var defined = _dereq_('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":97}],154:[function(_dereq_,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = _dereq_('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":114}],155:[function(_dereq_,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],156:[function(_dereq_,module,exports){
var global         = _dereq_('./_global')
  , core           = _dereq_('./_core')
  , LIBRARY        = _dereq_('./_library')
  , wksExt         = _dereq_('./_wks-ext')
  , defineProperty = _dereq_('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":95,"./_global":105,"./_library":122,"./_object-dp":127,"./_wks-ext":157}],157:[function(_dereq_,module,exports){
exports.f = _dereq_('./_wks');
},{"./_wks":158}],158:[function(_dereq_,module,exports){
var store      = _dereq_('./_shared')('wks')
  , uid        = _dereq_('./_uid')
  , Symbol     = _dereq_('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":105,"./_shared":145,"./_uid":155}],159:[function(_dereq_,module,exports){
var classof   = _dereq_('./_classof')
  , ITERATOR  = _dereq_('./_wks')('iterator')
  , Iterators = _dereq_('./_iterators');
module.exports = _dereq_('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":89,"./_core":95,"./_iterators":120,"./_wks":158}],160:[function(_dereq_,module,exports){
var anObject = _dereq_('./_an-object')
  , get      = _dereq_('./core.get-iterator-method');
module.exports = _dereq_('./_core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./_an-object":83,"./_core":95,"./core.get-iterator-method":159}],161:[function(_dereq_,module,exports){
'use strict';
var addToUnscopables = _dereq_('./_add-to-unscopables')
  , step             = _dereq_('./_iter-step')
  , Iterators        = _dereq_('./_iterators')
  , toIObject        = _dereq_('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = _dereq_('./_iter-define')(Array, 'Array', function(iterated, kind){
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
},{"./_add-to-unscopables":81,"./_iter-define":117,"./_iter-step":119,"./_iterators":120,"./_to-iobject":151}],162:[function(_dereq_,module,exports){
'use strict';
var strong = _dereq_('./_collection-strong');

// 23.1 Map Objects
module.exports = _dereq_('./_collection')('Map', function(get){
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
},{"./_collection":94,"./_collection-strong":91}],163:[function(_dereq_,module,exports){
var $export = _dereq_('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: _dereq_('./_object-create')});
},{"./_export":102,"./_object-create":126}],164:[function(_dereq_,module,exports){
var $export = _dereq_('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !_dereq_('./_descriptors'), 'Object', {defineProperty: _dereq_('./_object-dp').f});
},{"./_descriptors":98,"./_export":102,"./_object-dp":127}],165:[function(_dereq_,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = _dereq_('./_is-object')
  , meta     = _dereq_('./_meta').onFreeze;

_dereq_('./_object-sap')('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});
},{"./_is-object":114,"./_meta":123,"./_object-sap":137}],166:[function(_dereq_,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = _dereq_('./_to-iobject')
  , $getOwnPropertyDescriptor = _dereq_('./_object-gopd').f;

_dereq_('./_object-sap')('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./_object-gopd":129,"./_object-sap":137,"./_to-iobject":151}],167:[function(_dereq_,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = _dereq_('./_to-object')
  , $getPrototypeOf = _dereq_('./_object-gpo');

_dereq_('./_object-sap')('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./_object-gpo":133,"./_object-sap":137,"./_to-object":153}],168:[function(_dereq_,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = _dereq_('./_to-object')
  , $keys    = _dereq_('./_object-keys');

_dereq_('./_object-sap')('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./_object-keys":135,"./_object-sap":137,"./_to-object":153}],169:[function(_dereq_,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = _dereq_('./_export');
$export($export.S, 'Object', {setPrototypeOf: _dereq_('./_set-proto').set});
},{"./_export":102,"./_set-proto":141}],170:[function(_dereq_,module,exports){
arguments[4][65][0].apply(exports,arguments)
},{"dup":65}],171:[function(_dereq_,module,exports){
'use strict';
var LIBRARY            = _dereq_('./_library')
  , global             = _dereq_('./_global')
  , ctx                = _dereq_('./_ctx')
  , classof            = _dereq_('./_classof')
  , $export            = _dereq_('./_export')
  , isObject           = _dereq_('./_is-object')
  , aFunction          = _dereq_('./_a-function')
  , anInstance         = _dereq_('./_an-instance')
  , forOf              = _dereq_('./_for-of')
  , speciesConstructor = _dereq_('./_species-constructor')
  , task               = _dereq_('./_task').set
  , microtask          = _dereq_('./_microtask')()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[_dereq_('./_wks')('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = _dereq_('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
_dereq_('./_set-to-string-tag')($Promise, PROMISE);
_dereq_('./_set-species')(PROMISE);
Wrapper = _dereq_('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && _dereq_('./_iter-detect')(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./_a-function":80,"./_an-instance":82,"./_classof":89,"./_core":95,"./_ctx":96,"./_export":102,"./_for-of":104,"./_global":105,"./_is-object":114,"./_iter-detect":118,"./_library":122,"./_microtask":124,"./_redefine-all":139,"./_set-species":142,"./_set-to-string-tag":143,"./_species-constructor":146,"./_task":148,"./_wks":158}],172:[function(_dereq_,module,exports){
'use strict';
var $at  = _dereq_('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
_dereq_('./_iter-define')(String, 'String', function(iterated){
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
},{"./_iter-define":117,"./_string-at":147}],173:[function(_dereq_,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = _dereq_('./_global')
  , has            = _dereq_('./_has')
  , DESCRIPTORS    = _dereq_('./_descriptors')
  , $export        = _dereq_('./_export')
  , redefine       = _dereq_('./_redefine')
  , META           = _dereq_('./_meta').KEY
  , $fails         = _dereq_('./_fails')
  , shared         = _dereq_('./_shared')
  , setToStringTag = _dereq_('./_set-to-string-tag')
  , uid            = _dereq_('./_uid')
  , wks            = _dereq_('./_wks')
  , wksExt         = _dereq_('./_wks-ext')
  , wksDefine      = _dereq_('./_wks-define')
  , keyOf          = _dereq_('./_keyof')
  , enumKeys       = _dereq_('./_enum-keys')
  , isArray        = _dereq_('./_is-array')
  , anObject       = _dereq_('./_an-object')
  , toIObject      = _dereq_('./_to-iobject')
  , toPrimitive    = _dereq_('./_to-primitive')
  , createDesc     = _dereq_('./_property-desc')
  , _create        = _dereq_('./_object-create')
  , gOPNExt        = _dereq_('./_object-gopn-ext')
  , $GOPD          = _dereq_('./_object-gopd')
  , $DP            = _dereq_('./_object-dp')
  , $keys          = _dereq_('./_object-keys')
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  _dereq_('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  _dereq_('./_object-pie').f  = $propertyIsEnumerable;
  _dereq_('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !_dereq_('./_library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || _dereq_('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":83,"./_descriptors":98,"./_enum-keys":101,"./_export":102,"./_fails":103,"./_global":105,"./_has":106,"./_hide":107,"./_is-array":113,"./_keyof":121,"./_library":122,"./_meta":123,"./_object-create":126,"./_object-dp":127,"./_object-gopd":129,"./_object-gopn":131,"./_object-gopn-ext":130,"./_object-gops":132,"./_object-keys":135,"./_object-pie":136,"./_property-desc":138,"./_redefine":140,"./_set-to-string-tag":143,"./_shared":145,"./_to-iobject":151,"./_to-primitive":154,"./_uid":155,"./_wks":158,"./_wks-define":156,"./_wks-ext":157}],174:[function(_dereq_,module,exports){
'use strict';
var each         = _dereq_('./_array-methods')(0)
  , redefine     = _dereq_('./_redefine')
  , meta         = _dereq_('./_meta')
  , assign       = _dereq_('./_object-assign')
  , weak         = _dereq_('./_collection-weak')
  , isObject     = _dereq_('./_is-object')
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = _dereq_('./_collection')('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"./_array-methods":86,"./_collection":94,"./_collection-weak":93,"./_is-object":114,"./_meta":123,"./_object-assign":125,"./_redefine":140}],175:[function(_dereq_,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = _dereq_('./_export');

$export($export.P + $export.R, 'Map', {toJSON: _dereq_('./_collection-to-json')('Map')});
},{"./_collection-to-json":92,"./_export":102}],176:[function(_dereq_,module,exports){
_dereq_('./_wks-define')('asyncIterator');
},{"./_wks-define":156}],177:[function(_dereq_,module,exports){
_dereq_('./_wks-define')('observable');
},{"./_wks-define":156}],178:[function(_dereq_,module,exports){
_dereq_('./es6.array.iterator');
var global        = _dereq_('./_global')
  , hide          = _dereq_('./_hide')
  , Iterators     = _dereq_('./_iterators')
  , TO_STRING_TAG = _dereq_('./_wks')('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}
},{"./_global":105,"./_hide":107,"./_iterators":120,"./_wks":158,"./es6.array.iterator":161}],179:[function(_dereq_,module,exports){
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

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}]},{},[10])(10)
});
