!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.Snoocore=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var urlLib = require('url');
var querystring = require('querystring');

var when = require('when');
var delay = require('when/delay');

var rawApi = require('./build/api');
var redditNodeParser = require('./redditNodeParser');
var utils = require('./utils');

module.exports = Snoocore;

Snoocore.oauth = require('./oauth');
Snoocore.request = require('./request');
Snoocore.when = when;

function Snoocore(config) {

  var self = {};

  self._userAgent = config.userAgent || 'snoocore-default-User-Agent';

  self._isNode = typeof config.browser !== 'undefined'
               ? !config.browser
               : utils.isNode();

  self._server = {
    oauth: 'https://oauth.reddit.com',
    www: 'https://www.reddit.com',
    ssl: 'https://ssl.reddit.com'
  };

  self._modhash = ''; // The current mod hash of whatever user we have
  self._redditSession = ''; // The current cookie (reddit_session)
  self._authData = {}; // Set if user has authenticated with OAuth
  self._refreshToken = ''; // Set when calling `refresh` and when duration:'permanent'

  self._login = config.login || {};
  self._oauth = config.oauth || {};
  self._oauth.scope = self._oauth.scope || [ 'identity' ]; // Default scope for reddit

  // Structure the raw reddit api into a tree format
  // @TODO move this into a build step in ./run.js, no need to build
  // this every time we load the library
  self._endpointTree = buildEndpointTree(rawApi);

  // The current throttle delay before a request will go through
  // increments every time a call is made, and is reduced when a
  // call finishes.
  //
  // Time is added / removed based on the throttle variable.
  var throttle = config.throttle || 2000;
  var throttleDelay = 1;

  function isAuthenticated() {
    return typeof self._authData.access_token !== 'undefined' &&
    typeof self._authData.token_type !== 'undefined';
  }

  function isLoggedIn() {
    return self._modhash;
  }

  function replaceUrlParams(endpointUrl, givenArgs) {
    // nothing to replace!
    if (endpointUrl.indexOf('$') === -1) {
      return endpointUrl;
    }

    // pull out variables from the url
    var params = endpointUrl.match(/\$[\w\.]+/g);

    // replace with the argument provided
    params.forEach(function(param) {
      if (typeof givenArgs[param] === 'undefined') {
        throw new Error('missing required url parameter ' + param);
      }
      endpointUrl = endpointUrl.replace(param, givenArgs[param]);
    });

    return endpointUrl;
  }

  function addUrlExtension(endpointUrl, endpointExtensions) {
    endpointExtensions = endpointExtensions || [];
    // add ".json" if we have an url path that needs it specified
    if (endpointExtensions.length === 0) { return endpointUrl; }

    if (endpointExtensions.indexOf('.json') === -1) {
      throw new Error(
        'Invalid extension types specified, unable to use ' +
                      'this endpoint!');
    }

    endpointUrl += '.json';
    return endpointUrl;
  }

  function getAuthOrStandardUrl(endpoint) {

    // if we are authenticated and we have oauth scopes for this endpoint...
    if (isAuthenticated() && endpoint.oauth.length > 0) {
      return self._server.oauth + endpoint.path;
    }
    // else, decide if we want to use www vs. ssl
    return endpoint.method === 'GET'
			   ? self._server.www + endpoint.path
			   : self._server.ssl + endpoint.path;
  }

  // Builds the URL that we will query taking into account any
  // variables in the url containing `$`
  function buildUrl(givenArgs, endpoint) {
    var url = getAuthOrStandardUrl(endpoint);
    url = replaceUrlParams(url, givenArgs);
    url = addUrlExtension(url, endpoint.extensions);
    return url;
  }

  function buildArgs(endpointArgs) {
    var args = {};

    // Skip any url parameters (e.g. items that begin with $)
    for (var key in endpointArgs) {
      if (key.substring(0, 1) !== '$') {
        args[key] = endpointArgs[key];
      }
    }

    return args;
  }

  // Returns an object containing the restful verb that is needed to 
  // call the reddit API. That verb is a function call to `callRedditApi`
  // with the necessary normalization modifications setup in options.
  function buildCall(endpoints, options) {

    options = options || {};
    var methods = {};

    // normalize the arguments given by the user to conform to the
    // endpoint tree
    function fixGivenArgs(givenArgs) {
      givenArgs = givenArgs || {};

      // replace any of the user alias place holders with the actual ones
      Object.keys(options.urlParamAlias || []).forEach(function(providedAlias) {
	// e.g. '$subreddit' vs '$sub'
	var actualAlias = options.urlParamAlias[providedAlias];
	// set the givenArgs to matche the actual alias value with the value that
	// the user gave
	givenArgs[actualAlias] = givenArgs[providedAlias];
	// remove the provided alias
	delete givenArgs[providedAlias];
      });

      // replace any of the url parameters with values embedded into the
      // path into the givenArguments
      Object.keys(options.urlParamValue || []).forEach(function(providedValue) {
	// e.g. '$subreddit' vs 'aww'
	var actualAlias = options.urlParamValue[providedValue];
	// add the correct argument to givenArgs with the value provided
	givenArgs[actualAlias] = providedValue;
      });

      return givenArgs;
    }

    endpoints.forEach(function(endpoint) {
      methods[endpoint.method.toLowerCase()] = function(givenArgs, callOptions) {
	givenArgs = fixGivenArgs(givenArgs);
	return callRedditApi(endpoint, givenArgs, callOptions);
      };

      if (endpoint.isListing) {
	methods.listing = function(givenArgs, callOptions) {
	  givenArgs = fixGivenArgs(givenArgs);
	  return getListing(endpoint, givenArgs, callOptions);
	};
      }
    });

    return methods;
  }

  // Call the reddit api
  function callRedditApi(endpoint, givenArgs, options) {

    // Options that will change the way this call behaves
    options = options || {};
    var bypassAuth = options.bypassAuth || false;

    var startCallTime = Date.now();
    throttleDelay += throttle;

    // Wait for the throttle delay amount, then call the Reddit API
    return delay(throttleDelay - throttle).then(function() {

      var method = endpoint.method.toUpperCase();
      var url = buildUrl(givenArgs, endpoint);
      var parsedUrl = urlLib.parse(url);

      var args = buildArgs(givenArgs);

      var headers = {};

      if (self._isNode) {
	// Can't set User-Agent in browser based JavaScript!
	headers['User-Agent'] = self._userAgent;

	// Can't set custom headers in Firefox CORS requests
	headers['X-Modhash'] = self._modhash;
      }

      // If we are nod bypassing authentication, authenticate the user
      if (!bypassAuth) {

	if (isAuthenticated()) {
	  // OAuth based authentication

	  // Check that the correct scopes have been requested
	  var missingScope;
	  endpoint.oauth.forEach(function(requiredScope) {
	    missingScope = (
	      (self._oauth.scope || []).indexOf(requiredScope) === -1 && 
	      requiredScope !== 'any');

	    if (missingScope) {
	      throw new Error('missing required scope(s): ' + endpoint.oauth.join(', '));
	    }
	  });

	  headers['Authorization'] = self._authData.token_type + ' ' +
				     self._authData.access_token;
	}
	else if (isLoggedIn() && self._isNode) {
	  // Cookie based authentication (only supported in Node.js)
	    headers['Cookie'] = 'reddit_session=' + self._redditSession + ';';
	}

      }

      return Snoocore.request.https({
	method: method,
	hostname: parsedUrl.hostname,
	path: parsedUrl.path,
	headers: headers
      }, querystring.stringify(args)).then(function(response) {

	// Forbidden. Try to get a new access_token if we have
	// a refresh token
	if (response._status === 403 && self._refreshToken !== '') {

	  if (options._refreshTokenFail) { // fail if the refresh fail flag was set.
	    throw new Error('unable to fetch a new access_token');
	  }

	  // attempt to refresh the access token
	  return self.refresh(self._refreshToken).then(function() {
	    // make the call again and flag to fail if it happens again
	    return callRedditApi(endpoint, givenArgs, { _refreshTokenFail: true });
	  });
	}

	var data = response._body || {};

	// Attempt to parse some JSON, otherwise continue on (may be empty, or text)
	  try { data = JSON.parse(data); } catch(e) {}

	// Set the modhash if the data contains it (Cookie based login)
	  if (data && data.json && data.json.data)
	{
	  self._modhash = data.json.data.modhash;
	  self._redditSession = data.json.data.cookie;
	}

	// Throw any errors that reddit may inform us about
	if (data.hasOwnProperty('error')) {
	  throw new Error('\n>>> Reddit Response:\n\n' + String(data.error)
			    + '\n\n>>> Endpoint URL: '+ url
			  + '\n\n>>> Endpoint method: ' + endpoint.method
			  + '\n\n>>> Arguments: ' + JSON.stringify(args, null, 2));
	}

	return data;
      });

    }).finally(function() {
      // decrement the throttle delay. If the call is quick and snappy, we
      // only decrement the total time that it took to make the call.
      var endCallTime = Date.now();
      var callDuration = endCallTime - startCallTime;

      if (callDuration < throttle) {
	throttleDelay -= callDuration;
      } else {
	throttleDelay -= throttle;
      }
    });

  }

  function getListing(endpoint, givenArgs, options) {

    givenArgs = givenArgs || {};

    // number of results that we have loaded so far. It will
    // increase / decrease when calling next / previous.
    var count = 0;
    var limit = givenArgs.limit || 25;
    // keep a reference to the start of this listing
    var start = givenArgs.after || null;

    function getSlice(givenArgs) {
      return callRedditApi(endpoint, givenArgs, options).then(function(result) {

	var slice = {};

	slice.count = count;

	slice.get = result || {};

	slice.before = slice.get.data.before || null;
	slice.after = slice.get.data.after || null;
	slice.allChildren = slice.get.data.children || [];

	slice.empty = slice.allChildren.length === 0;

	slice.children = slice.allChildren.filter(function(child) {
	  return !child.data.stickied;
	});

	slice.stickied = slice.allChildren.filter(function(child) {
	  return child.data.stickied;
	});

	slice.next = function() {
	  count += limit;

	  var args = givenArgs;
	  args.before = null;
	  args.after = slice.children[slice.children.length - 1].data.name;
	  args.count = count;
	  return getSlice(args);
	};

	slice.previous = function() {
	  count -= limit;

	  var args = givenArgs;
	  args.before = slice.children[0].data.name;
	  args.after = null;
	  args.count = count;
	  return getSlice(args);
	};

	slice.start = function() {
	  count = 0;

	  var args = givenArgs;
	  args.before = null;
	  args.after = start;
	  args.count = count;
	  return getSlice(args);
	};

	slice.requery = function() {
	  return getSlice(givenArgs);
	};

	return slice;
      });

    }

    return getSlice(givenArgs);
  }

  /*
     Structures the reddit api endpoints into a tree
     that we can use later for traversing
     The layout:

     {
     api: { v1: { me: { _endpoints: [ {GET} ], prefs: { _endpoints: [ {GET}, {PATCH}  ] }}}},
     live: { $thread: { "about.json": { _endpoints: [ {GET} ] }}},
     ...
     }

     The endpoints live in arrays to support instances where
     there are multiple verbs defined for an endpoint such as
     /api/v1/me/prefs

     It also handles the ase where /api/v1/me is a parent endpoint to
     /app/v1/me/prefs by defining endpoints in a `_endpoints` field.
   */

  function buildEndpointTree(rawApi) {
    var endpointTree = {};

    rawApi.forEach(function(endpoint) {
      // get the sections to traverse down for this endpoint
      var pathSections = endpoint.path.substring(1).split('/');
      var leaf = endpointTree; // start at the root

      // move down to where we need to be in the chain for this endpoint
      var i = 0;
      var len = pathSections.length;

      for (; i < len - 1; ++i) {
	if (typeof leaf[pathSections[i]] === 'undefined') {
	  leaf[pathSections[i]] = {};
	}
	leaf = leaf[pathSections[i]];
      }

      // push the endpoint to this section of the tree
      if (typeof leaf[pathSections[i]] === 'undefined') {
	leaf[pathSections[i]] = { _endpoints: [] };
      }

      leaf[pathSections[i]]._endpoints.push(endpoint);

    });

    return endpointTree;
  }

  // Build support for the raw API calls
  self.raw = function(url) {

    var parsed = urlLib.parse(url);

    function getEndpoint(method) {
      return {
	path: parsed.path,
	method: method,
	oauth: [],
	isListing: true
      };
    }

    var endpoints = ['get', 'post', 'put', 'patch', 'delete', 'update']
		       .map(getEndpoint);
    return buildCall(endpoints);
  };

  // Path syntax support.
  self.path = function(path) {

    path = path.replace(/^\//, ''); // remove leading slash if any
    var sections = path.split('/'); // sections to traverse down
    var leaf = self._endpointTree; // the top level of the endpoint tree that we will traverse down

    // Adjust how this call is built if necessary
    var buildCallOptions = {
      urlParamAlias: {}, // aliases for url parameters
      urlParamValue: {} // values for url parameters (included in the url vs. using $placeholder)
    };

    // Travel down the endpoint tree until we get to the endpoint that we want
    for (var i = 0, len = sections.length; i < len; ++i) {

      // The next section of the url path provided
      var providedSection = sections[i];
      // The *real* section should the provided section not exist
      var actualSection = providedSection;

      // If the user provided section does not exist in our endpoint tree
      // this means that they are using their own placeholder, or an actual
      // value of the url parameter
      if (typeof leaf[providedSection] === 'undefined') {

	var leafKeys = Object.keys(leaf);

	for (var j = 0, jlen = leafKeys.length; j < jlen; ++j) {
	  // Return the section that represents a placeholder
	  if (leafKeys[j].substring(0, 1) === '$') {
	    actualSection = leafKeys[j]; // The actual value, e.g. '$subreddit'
	    break;
	  }
	}

	// The user is using their own alias
	if (providedSection.substring(0, 1) === '$') {
	  buildCallOptions.urlParamAlias[providedSection] = actualSection;
	}
	// looks like they used a value instead of the placeholder
	else {
	  buildCallOptions.urlParamValue[providedSection] = actualSection;
	}

      }

      // Check that the actual section is a valid one
      if (typeof leaf[actualSection] === 'undefined') {
	throw new Error('Invalid path provided. Check that this is a valid path.\n' + path);
      }

      // move down the endpoint tree
      leaf = leaf[actualSection];
    }

    // Check that our leaf is an endpoint before building the call
    if (typeof leaf._endpoints === 'undefined') {
      throw new Error('Invalid path provided. Check that this is a valid path.\n' + path);
    }

    return buildCall(leaf._endpoints, buildCallOptions);
  };

  // Sets the modhash & cookie to allow for cookie-based calls
  self.login = function(options) {

    // If options is not defined, use the self._login options to use
    // the options setup in the initial config.
    options = options || self._login;

    var hasUserPass = options.username && options.password;
    var hasCookieModhash = options.modhash && options.cookie;

    if (!hasUserPass && !hasCookieModhash) {
      return when.reject(new Error(
	'login expects either a username/password, or a ' +
				   'cookie/modhash'));
    }

    if (hasCookieModhash) {
      self._modhash = options.modhash;
      self._redditSession = options.cookie;
      return when.resolve();
    }

    var rem = typeof options.rem !== 'undefined'
	    ? options.rem
	    : true;

    var api_type = typeof options.api_type !== 'undefined'
		 ? options.api_type
		 : 'json';

    return self.path('/api/login').post({
      user: options.username,
      passwd: options.password,
      rem: rem,
      api_type: api_type
    });
  };

  // Clears the modhash & cookie that was set, and pings the `/logout` path
  // on Reddit for good measure.
  self.logout = function() {
    var getModhash = self._modhash
		   ? when.resolve(self._modhash)
				 : self.path('/api/me.json').get().then(function(result) {
				   return result.data ? result.data.modhash : void 0;
				 });

    return getModhash.then(function(modhash) {
      // If we don't have a modhash, there is no need to logout
      if (!modhash) { return; }

      var defer = when.defer();

      return Snoocore.request.https({
	method: 'POST',
	hostname: 'www.reddit.com',
	path: '/logout',
	headers: {
	  'X-Modhash': modhash
	}
      }, querystring.stringify({
	uh: modhash
      })).then(function(response) {
	self._modhash = '';
	self._redditSession = '';
      });

    });
  };

  // keep backwards compatability
  self.getAuthUrl = 
  self.getExplicitAuthUrl = function(state) {
    var options = self._oauth;
    options.state = state || Math.ceil(Math.random() * 1000);
    return Snoocore.oauth.getExplicitAuthUrl(options);
  };

  self.getImplicitAuthUrl = function(state) {
    var options = self._oauth;
    options.state = state || Math.ceil(Math.random() * 1000);
    return Snoocore.oauth.getImplicitAuthUrl(options);
  };

  self.refresh = function(refreshToken) {
    return Snoocore.oauth.getAuthData('refresh', {
      refreshToken: refreshToken,
      consumerKey: self._oauth.consumerKey,
      consumerSecret: self._oauth.consumerSecret,
      redirectUri: self._oauth.redirectUri,
      scope: self._oauth.scope
    }).then(function(authDataResult) {
      // only set the internal refresh token if reddit
      // agrees that it was OK and sends back authData
      self._refreshToken = refreshToken;
      self._authData = authDataResult;
    });
  };

  // Sets the auth data from the oauth module to allow OAuth calls.
  // 
  // This function can authenticate with:
  //
  // - Script based OAuth (no parameter)
  // - Raw authentication data
  // - Authorization Code (request_type = "code")
  // - Access Token (request_type = "token") / Implicit OAuth
  //
  self.auth = function(authDataOrAuthCodeOrAccessToken) {

    var authData;

    switch(self._oauth.type) {
      case 'script':
	authData = Snoocore.oauth.getAuthData(self._oauth.type, {
	  consumerKey: self._oauth.consumerKey,
	  consumerSecret: self._oauth.consumerSecret,
	  scope: self._oauth.scope,
	  username: self._login.username,
	  password: self._login.password
	});
	break;

      case 'web': // keep web/insatlled here for backwards compatability
      case 'installed': 
      case 'explicit':
	authData = Snoocore.oauth.getAuthData(self._oauth.type, {
	  authorizationCode: authDataOrAuthCodeOrAccessToken, // auth code in this case
	  consumerKey: self._oauth.consumerKey,
	  consumerSecret: self._oauth.consumerSecret || '',
	  redirectUri: self._oauth.redirectUri,
	  scope: self._oauth.scope
	});
	break;

      case 'implicit':
	authData = {
	  access_token: authDataOrAuthCodeOrAccessToken, // access token in this case
	  token_type: 'bearer',
	  expires_in: 3600,
	  scope: self._oauth.scope
	};
	break;

      default:
	// assume that it is the authData
	authData = authDataOrAuthCodeOrAccessToken; 
    }

    return when(authData).then(function(authDataResult) {

      self._authData = authDataResult;

      // if the web/installed app used a perminant duration, send
      // back the refresh token that will be used to re-authenticate
      // later without user interaction.
      if (authDataResult.refresh_token) {
	// set the internal refresh token for automatic expiring
	// access_token management
	self._refreshToken = authDataResult.refresh_token;
	return authDataResult.refresh_token;
      }
    });
  };

  // Clears any authentication data & removes OAuth authentication
  //
  // By default it will only remove the "access_token". Specify
  // the users refresh token to revoke that token instead.
  self.deauth = function(refreshToken) {

    // no need to deauth if not authenticated
    if (typeof self._authData.access_token === 'undefined') {
      return when.resolve();
    }

    var isRefreshToken = typeof refreshToken === 'string';
    var token = isRefreshToken ? refreshToken : self._authData.access_token;

    return Snoocore.oauth.revokeToken(token, isRefreshToken, {
      consumerKey: self._oauth.consumerKey,
      consumerSecret: self._oauth.consumerSecret
    }).then(function() {
      self._authData = {}; // clear internal auth data
    });
  };

  // expose functions for testing
  self._test = {
    isAuthenticated: isAuthenticated,
    getAuthOrStandardUrl: getAuthOrStandardUrl,
    replaceUrlParams: replaceUrlParams,
    addUrlExtension: addUrlExtension,
    buildUrl: buildUrl,
    buildArgs: buildArgs,
    buildCall: buildCall
  };

  // Make self.path the primary function that we return, but 
  // still allow access to the objects defined on self
  Object.keys(self).forEach(function(key) {
    self.path[key] = self[key];
  });

  self = self.path;
  return self;
}

},{"./build/api":2,"./oauth":34,"./redditNodeParser":35,"./request":36,"./utils":38,"querystring":12,"url":13,"when":33,"when/delay":16}],2:[function(require,module,exports){

module.exports = [{"path":"/api/clear_sessions","oauth":[],"extensions":[],"method":"POST","args":{"api_type":{},"curpass":{},"dest":{},"uh":{}},"isListing":false},{"path":"/api/delete_user","oauth":[],"extensions":[],"method":"POST","args":{"api_type":{},"confirm":{},"delete_message":{},"passwd":{},"uh":{},"user":{}},"isListing":false},{"path":"/api/login","oauth":[],"extensions":[],"method":"POST","args":{"api_type":{},"passwd":{},"rem":{},"user":{}},"isListing":false},{"path":"/api/me.json","oauth":[],"extensions":[],"method":"GET","args":{},"isListing":false},{"path":"/api/register","oauth":[],"extensions":[],"method":"POST","args":{"api_type":{},"captcha":{},"email":{},"iden":{},"passwd":{},"passwd2":{},"rem":{},"user":{}},"isListing":false},{"path":"/api/set_force_https","oauth":[],"extensions":[],"method":"POST","args":{"api_type":{},"curpass":{},"force_https":{},"uh":{}},"isListing":false},{"path":"/api/update","oauth":[],"extensions":[],"method":"POST","args":{"api_type":{},"curpass":{},"dest":{},"email":{},"newpass":{},"uh":{},"verify":{},"verpass":{}},"isListing":false},{"path":"/api/update_email","oauth":[],"extensions":[],"method":"POST","args":{"api_type":{},"curpass":{},"dest":{},"email":{},"uh":{},"verify":{}},"isListing":false},{"path":"/api/update_password","oauth":[],"extensions":[],"method":"POST","args":{"api_type":{},"curpass":{},"newpass":{},"uh":{},"verpass":{}},"isListing":false},{"path":"/api/v1/me","oauth":["identity"],"extensions":[],"method":"GET","args":{},"isListing":false},{"path":"/api/v1/me/karma","oauth":["mysubreddits"],"extensions":[],"method":"GET","args":{},"isListing":false},{"path":"/api/v1/me/prefs","oauth":["identity"],"extensions":[],"method":"GET","args":{"fields":{}},"isListing":false},{"path":"/api/v1/me/prefs","oauth":["account"],"extensions":[],"method":"PATCH","args":{"This":{}},"isListing":false},{"path":"/api/v1/me/trophies","oauth":["identity"],"extensions":[],"method":"GET","args":{},"isListing":false},{"path":"/prefs/$where","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/prefs/friends","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/prefs/blocked","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/api/v1/me/friends","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/api/v1/me/blocked","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/api/adddeveloper","oauth":[],"extensions":[],"method":"POST","args":{"api_type":{},"client_id":{},"name":{},"uh":{}},"isListing":false},{"path":"/api/deleteapp","oauth":[],"extensions":[],"method":"POST","args":{"client_id":{},"uh":{}},"isListing":false},{"path":"/api/removedeveloper","oauth":[],"extensions":[],"method":"POST","args":{"api_type":{},"client_id":{},"name":{},"uh":{}},"isListing":false},{"path":"/api/revokeapp","oauth":[],"extensions":[],"method":"POST","args":{"client_id":{},"uh":{}},"isListing":false},{"path":"/api/setappicon","oauth":[],"extensions":[],"method":"POST","args":{"api_type":{},"client_id":{},"file":{},"uh":{}},"isListing":false},{"path":"/api/updateapp","oauth":[],"extensions":[],"method":"POST","args":{"about_url":{},"api_type":{},"app_type":{},"icon_url":{},"name":{},"redirect_uri":{},"uh":{}},"isListing":false},{"path":"/api/needs_captcha.json","oauth":["any"],"extensions":[],"method":"GET","args":{},"isListing":false},{"path":"/api/new_captcha","oauth":["any"],"extensions":[],"method":"POST","args":{"api_type":{}},"isListing":false},{"path":"/captcha/$iden","oauth":["any"],"extensions":[],"method":"GET","args":{},"isListing":false},{"path":"/api/clearflairtemplates","oauth":["modflair"],"extensions":[],"method":"POST","args":{"api_type":{},"flair_type":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/api/clearflairtemplates","oauth":["modflair"],"extensions":[],"method":"POST","args":{"api_type":{},"flair_type":{},"uh":{}},"isListing":false},{"path":"/api/deleteflair","oauth":["modflair"],"extensions":[],"method":"POST","args":{"api_type":{},"name":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/api/deleteflair","oauth":["modflair"],"extensions":[],"method":"POST","args":{"api_type":{},"name":{},"uh":{}},"isListing":false},{"path":"/api/deleteflairtemplate","oauth":["modflair"],"extensions":[],"method":"POST","args":{"api_type":{},"flair_template_id":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/api/deleteflairtemplate","oauth":["modflair"],"extensions":[],"method":"POST","args":{"api_type":{},"flair_template_id":{},"uh":{}},"isListing":false},{"path":"/api/flair","oauth":["modflair"],"extensions":[],"method":"POST","args":{"api_type":{},"css_class":{},"link":{},"name":{},"text":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/api/flair","oauth":["modflair"],"extensions":[],"method":"POST","args":{"api_type":{},"css_class":{},"link":{},"name":{},"text":{},"uh":{}},"isListing":false},{"path":"/api/flairconfig","oauth":["modflair"],"extensions":[],"method":"POST","args":{"api_type":{},"flair_enabled":{},"flair_position":{},"flair_self_assign_enabled":{},"link_flair_position":{},"link_flair_self_assign_enabled":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/api/flairconfig","oauth":["modflair"],"extensions":[],"method":"POST","args":{"api_type":{},"flair_enabled":{},"flair_position":{},"flair_self_assign_enabled":{},"link_flair_position":{},"link_flair_self_assign_enabled":{},"uh":{}},"isListing":false},{"path":"/api/flaircsv","oauth":["modflair"],"extensions":[],"method":"POST","args":{"flair_csv":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/api/flaircsv","oauth":["modflair"],"extensions":[],"method":"POST","args":{"flair_csv":{},"uh":{}},"isListing":false},{"path":"/api/flairlist","oauth":["modflair"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"name":{},"show":{}},"isListing":true},{"path":"/r/$subreddit/api/flairlist","oauth":["modflair"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"name":{},"show":{}},"isListing":true},{"path":"/api/flairselector","oauth":["flair"],"extensions":[],"method":"POST","args":{"link":{},"name":{}},"isListing":false},{"path":"/r/$subreddit/api/flairselector","oauth":["flair"],"extensions":[],"method":"POST","args":{"link":{},"name":{}},"isListing":false},{"path":"/api/flairtemplate","oauth":["modflair"],"extensions":[],"method":"POST","args":{"api_type":{},"css_class":{},"flair_template_id":{},"flair_type":{},"text":{},"text_editable":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/api/flairtemplate","oauth":["modflair"],"extensions":[],"method":"POST","args":{"api_type":{},"css_class":{},"flair_template_id":{},"flair_type":{},"text":{},"text_editable":{},"uh":{}},"isListing":false},{"path":"/api/selectflair","oauth":["flair"],"extensions":[],"method":"POST","args":{"api_type":{},"flair_template_id":{},"link":{},"name":{},"text":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/api/selectflair","oauth":["flair"],"extensions":[],"method":"POST","args":{"api_type":{},"flair_template_id":{},"link":{},"name":{},"text":{},"uh":{}},"isListing":false},{"path":"/api/setflairenabled","oauth":["flair"],"extensions":[],"method":"POST","args":{"api_type":{},"flair_enabled":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/api/setflairenabled","oauth":["flair"],"extensions":[],"method":"POST","args":{"api_type":{},"flair_enabled":{},"uh":{}},"isListing":false},{"path":"/api/v1/gold/gild/$fullname","oauth":["creddits"],"extensions":[],"method":"POST","args":{"fullname":{}},"isListing":false},{"path":"/api/v1/gold/give/$username","oauth":["creddits"],"extensions":[],"method":"POST","args":{"months":{},"username":{}},"isListing":false},{"path":"/api/comment","oauth":["submit"],"extensions":[],"method":"POST","args":{"api_type":{},"text":{},"thing_id":{},"uh":{}},"isListing":false},{"path":"/api/del","oauth":["edit"],"extensions":[],"method":"POST","args":{"id":{},"uh":{}},"isListing":false},{"path":"/api/editusertext","oauth":["edit"],"extensions":[],"method":"POST","args":{"api_type":{},"text":{},"thing_id":{},"uh":{}},"isListing":false},{"path":"/api/hide","oauth":["report"],"extensions":[],"method":"POST","args":{"id":{},"uh":{}},"isListing":false},{"path":"/api/info","oauth":["read"],"extensions":[],"method":"GET","args":{"id":{},"url":{}},"isListing":false},{"path":"/r/$subreddit/api/info","oauth":["read"],"extensions":[],"method":"GET","args":{"id":{},"url":{}},"isListing":false},{"path":"/api/marknsfw","oauth":["modposts"],"extensions":[],"method":"POST","args":{"id":{},"uh":{}},"isListing":false},{"path":"/api/morechildren","oauth":["read"],"extensions":[],"method":"POST","args":{"api_type":{},"children":{},"id":{},"link_id":{},"pv_hex":{},"sort":{}},"isListing":false},{"path":"/api/report","oauth":["report"],"extensions":[],"method":"POST","args":{"api_type":{},"other_reason":{},"reason":{},"thing_id":{},"uh":{}},"isListing":false},{"path":"/api/save","oauth":["save"],"extensions":[],"method":"POST","args":{"category":{},"id":{},"uh":{}},"isListing":false},{"path":"/api/saved_categories.json","oauth":["save"],"extensions":[],"method":"GET","args":{},"isListing":false},{"path":"/api/sendreplies","oauth":["edit"],"extensions":[],"method":"POST","args":{"id":{},"state":{},"uh":{}},"isListing":false},{"path":"/api/set_contest_mode","oauth":["modposts"],"extensions":[],"method":"POST","args":{"api_type":{},"id":{},"state":{},"uh":{}},"isListing":false},{"path":"/api/set_subreddit_sticky","oauth":["modposts"],"extensions":[],"method":"POST","args":{"api_type":{},"id":{},"state":{},"uh":{}},"isListing":false},{"path":"/api/store_visits","oauth":["save"],"extensions":[],"method":"POST","args":{"links":{},"uh":{}},"isListing":false},{"path":"/api/submit","oauth":["submit"],"extensions":[],"method":"POST","args":{"api_type":{},"captcha":{},"extension":{},"iden":{},"kind":{},"resubmit":{},"sendreplies":{},"sr":{},"text":{},"then":{},"title":{},"uh":{},"url":{}},"isListing":false},{"path":"/api/unhide","oauth":["report"],"extensions":[],"method":"POST","args":{"id":{},"uh":{}},"isListing":false},{"path":"/api/unmarknsfw","oauth":["modposts"],"extensions":[],"method":"POST","args":{"id":{},"uh":{}},"isListing":false},{"path":"/api/unsave","oauth":["save"],"extensions":[],"method":"POST","args":{"id":{},"uh":{}},"isListing":false},{"path":"/api/vote","oauth":["vote"],"extensions":[],"method":"POST","args":{"dir":{},"id":{},"uh":{},"v":{}},"isListing":false},{"path":"/by_id/$names","oauth":["read"],"extensions":[],"method":"GET","args":{"names":{}},"isListing":false},{"path":"/comments/$article","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"article":{},"comment":{},"context":{},"depth":{},"limit":{},"sort":{}},"isListing":false},{"path":"/r/$subreddit/comments/$article","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"article":{},"comment":{},"context":{},"depth":{},"limit":{},"sort":{}},"isListing":false},{"path":"/hot","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/r/$subreddit/hot","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/new","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/r/$subreddit/new","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/random","oauth":["read"],"extensions":[],"method":"GET","args":{},"isListing":false},{"path":"/r/$subreddit/random","oauth":["read"],"extensions":[],"method":"GET","args":{},"isListing":false},{"path":"/$sort","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"t":{},"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/r/$subreddit/$sort","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"t":{},"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/top","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"t":{},"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/r/$subreddit/top","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"t":{},"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/controversial","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"t":{},"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/r/$subreddit/controversial","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"t":{},"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/api/live/create","oauth":["submit"],"extensions":[],"method":"POST","args":{"api_type":{},"description":{},"nsfw":{},"resources":{},"title":{},"uh":{}},"isListing":false},{"path":"/api/live/$thread/accept_contributor_invite","oauth":["livemanage"],"extensions":[],"method":"POST","args":{"api_type":{},"uh":{}},"isListing":false},{"path":"/api/live/$thread/close_thread","oauth":["livemanage"],"extensions":[],"method":"POST","args":{"api_type":{},"uh":{}},"isListing":false},{"path":"/api/live/$thread/delete_update","oauth":["edit"],"extensions":[],"method":"POST","args":{"api_type":{},"id":{},"uh":{}},"isListing":false},{"path":"/api/live/$thread/edit","oauth":["livemanage"],"extensions":[],"method":"POST","args":{"api_type":{},"description":{},"nsfw":{},"resources":{},"title":{},"uh":{}},"isListing":false},{"path":"/api/live/$thread/invite_contributor","oauth":["livemanage"],"extensions":[],"method":"POST","args":{"api_type":{},"name":{},"permissions":{},"type":{},"uh":{}},"isListing":false},{"path":"/api/live/$thread/leave_contributor","oauth":["livemanage"],"extensions":[],"method":"POST","args":{"api_type":{},"uh":{}},"isListing":false},{"path":"/api/live/$thread/report","oauth":["report"],"extensions":[],"method":"POST","args":{"api_type":{},"type":{},"uh":{}},"isListing":false},{"path":"/api/live/$thread/rm_contributor","oauth":["livemanage"],"extensions":[],"method":"POST","args":{"api_type":{},"id":{},"uh":{}},"isListing":false},{"path":"/api/live/$thread/rm_contributor_invite","oauth":["livemanage"],"extensions":[],"method":"POST","args":{"api_type":{},"id":{},"uh":{}},"isListing":false},{"path":"/api/live/$thread/set_contributor_permissions","oauth":["livemanage"],"extensions":[],"method":"POST","args":{"api_type":{},"name":{},"permissions":{},"type":{},"uh":{}},"isListing":false},{"path":"/api/live/$thread/strike_update","oauth":["edit"],"extensions":[],"method":"POST","args":{"api_type":{},"id":{},"uh":{}},"isListing":false},{"path":"/api/live/$thread/update","oauth":["submit"],"extensions":[],"method":"POST","args":{"api_type":{},"body":{},"uh":{}},"isListing":false},{"path":"/live/$thread","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"is_embed":{},"limit":{},"stylesr":{}},"isListing":false},{"path":"/live/$thread/about.json","oauth":["read"],"extensions":[],"method":"GET","args":{},"isListing":false},{"path":"/live/$thread/contributors.json","oauth":["read"],"extensions":[],"method":"GET","args":{},"isListing":false},{"path":"/live/$thread/discussions","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/api/block","oauth":["privatemessages"],"extensions":[],"method":"POST","args":{"id":{},"uh":{}},"isListing":false},{"path":"/api/compose","oauth":["privatemessages"],"extensions":[],"method":"POST","args":{"api_type":{},"captcha":{},"from_sr":{},"iden":{},"subject":{},"text":{},"to":{},"uh":{}},"isListing":false},{"path":"/api/read_all_messages","oauth":["privatemessages"],"extensions":[],"method":"POST","args":{"uh":{}},"isListing":false},{"path":"/api/read_message","oauth":["privatemessages"],"extensions":[],"method":"POST","args":{"id":{},"uh":{}},"isListing":false},{"path":"/api/unblock_subreddit","oauth":["privatemessages"],"extensions":[],"method":"POST","args":{"id":{},"uh":{}},"isListing":false},{"path":"/api/unread_message","oauth":["privatemessages"],"extensions":[],"method":"POST","args":{"id":{},"uh":{}},"isListing":false},{"path":"/message/$where","oauth":["privatemessages"],"extensions":[".json",".xml"],"method":"GET","args":{"mark":{},"mid":{},"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/message/inbox","oauth":["privatemessages"],"extensions":[".json",".xml"],"method":"GET","args":{"mark":{},"mid":{},"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/message/unread","oauth":["privatemessages"],"extensions":[".json",".xml"],"method":"GET","args":{"mark":{},"mid":{},"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/message/sent","oauth":["privatemessages"],"extensions":[".json",".xml"],"method":"GET","args":{"mark":{},"mid":{},"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/about/log","oauth":["modlog"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"mod":{},"show":{},"type":{}},"isListing":true},{"path":"/r/$subreddit/about/log","oauth":["modlog"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"mod":{},"show":{},"type":{}},"isListing":true},{"path":"/about/$location","oauth":["read"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"location":{},"only":{},"show":{}},"isListing":true},{"path":"/r/$subreddit/about/$location","oauth":["read"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"location":{},"only":{},"show":{}},"isListing":true},{"path":"/about/reports","oauth":["read"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"location":{},"only":{},"show":{}},"isListing":true},{"path":"/r/$subreddit/about/reports","oauth":["read"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"location":{},"only":{},"show":{}},"isListing":true},{"path":"/about/spam","oauth":["read"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"location":{},"only":{},"show":{}},"isListing":true},{"path":"/r/$subreddit/about/spam","oauth":["read"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"location":{},"only":{},"show":{}},"isListing":true},{"path":"/about/modqueue","oauth":["read"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"location":{},"only":{},"show":{}},"isListing":true},{"path":"/r/$subreddit/about/modqueue","oauth":["read"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"location":{},"only":{},"show":{}},"isListing":true},{"path":"/about/unmoderated","oauth":["read"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"location":{},"only":{},"show":{}},"isListing":true},{"path":"/r/$subreddit/about/unmoderated","oauth":["read"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"location":{},"only":{},"show":{}},"isListing":true},{"path":"/about/edited","oauth":["read"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"location":{},"only":{},"show":{}},"isListing":true},{"path":"/r/$subreddit/about/edited","oauth":["read"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"location":{},"only":{},"show":{}},"isListing":true},{"path":"/api/accept_moderator_invite","oauth":[],"extensions":[],"method":"POST","args":{"api_type":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/api/accept_moderator_invite","oauth":[],"extensions":[],"method":"POST","args":{"api_type":{},"uh":{}},"isListing":false},{"path":"/api/approve","oauth":["modposts"],"extensions":[],"method":"POST","args":{"id":{},"uh":{}},"isListing":false},{"path":"/api/distinguish","oauth":["modposts"],"extensions":[],"method":"POST","args":{"api_type":{},"how":{},"id":{},"uh":{}},"isListing":false},{"path":"/api/ignore_reports","oauth":["modposts"],"extensions":[],"method":"POST","args":{"id":{},"uh":{}},"isListing":false},{"path":"/api/leavecontributor","oauth":[],"extensions":[],"method":"POST","args":{"id":{},"uh":{}},"isListing":false},{"path":"/api/leavemoderator","oauth":[],"extensions":[],"method":"POST","args":{"id":{},"uh":{}},"isListing":false},{"path":"/api/remove","oauth":["modposts"],"extensions":[],"method":"POST","args":{"id":{},"spam":{},"uh":{}},"isListing":false},{"path":"/api/unignore_reports","oauth":["modposts"],"extensions":[],"method":"POST","args":{"id":{},"uh":{}},"isListing":false},{"path":"/stylesheet","oauth":["modconfig"],"extensions":[],"method":"GET","args":{},"isListing":false},{"path":"/r/$subreddit/stylesheet","oauth":["modconfig"],"extensions":[],"method":"GET","args":{},"isListing":false},{"path":"/api/multi/mine","oauth":["read"],"extensions":[],"method":"GET","args":{},"isListing":false},{"path":"/api/multi/$multipath","oauth":["subscribe"],"extensions":[],"method":"DELETE","args":{"multipath":{},"uh":{}},"isListing":false},{"path":"/api/filter/filterpath","oauth":["subscribe"],"extensions":[],"method":"DELETE","args":{"multipath":{},"uh":{}},"isListing":false},{"path":"/api/multi/$multipath","oauth":["read"],"extensions":[],"method":"GET","args":{"multipath":{}},"isListing":false},{"path":"/api/filter/filterpath","oauth":["read"],"extensions":[],"method":"GET","args":{"multipath":{}},"isListing":false},{"path":"/api/multi/$multipath","oauth":["subscribe"],"extensions":[],"method":"POST","args":{"model":{},"multipath":{},"uh":{}},"isListing":false},{"path":"/api/filter/filterpath","oauth":["subscribe"],"extensions":[],"method":"POST","args":{"model":{},"multipath":{},"uh":{}},"isListing":false},{"path":"/api/multi/$multipath","oauth":["subscribe"],"extensions":[],"method":"PUT","args":{"model":{},"multipath":{},"uh":{}},"isListing":false},{"path":"/api/filter/filterpath","oauth":["subscribe"],"extensions":[],"method":"PUT","args":{"model":{},"multipath":{},"uh":{}},"isListing":false},{"path":"/api/multi/$multipath/copy","oauth":["subscribe"],"extensions":[],"method":"POST","args":{"from":{},"to":{},"uh":{}},"isListing":false},{"path":"/api/multi/$multipath/description","oauth":["read"],"extensions":[],"method":"GET","args":{"multipath":{}},"isListing":false},{"path":"/api/multi/$multipath/description","oauth":["read"],"extensions":[],"method":"PUT","args":{"model":{},"multipath":{},"uh":{}},"isListing":false},{"path":"/api/multi/$multipath/r/$srname","oauth":["subscribe"],"extensions":[],"method":"DELETE","args":{"multipath":{},"srname":{},"uh":{}},"isListing":false},{"path":"/api/filter/filterpath/r/$srname","oauth":["subscribe"],"extensions":[],"method":"DELETE","args":{"multipath":{},"srname":{},"uh":{}},"isListing":false},{"path":"/api/multi/$multipath/r/$srname","oauth":["read"],"extensions":[],"method":"GET","args":{"multipath":{},"srname":{}},"isListing":false},{"path":"/api/filter/filterpath/r/$srname","oauth":["read"],"extensions":[],"method":"GET","args":{"multipath":{},"srname":{}},"isListing":false},{"path":"/api/multi/$multipath/r/$srname","oauth":["subscribe"],"extensions":[],"method":"PUT","args":{"model":{},"multipath":{},"srname":{},"uh":{}},"isListing":false},{"path":"/api/filter/filterpath/r/$srname","oauth":["subscribe"],"extensions":[],"method":"PUT","args":{"model":{},"multipath":{},"srname":{},"uh":{}},"isListing":false},{"path":"/api/multi/$multipath/rename","oauth":["subscribe"],"extensions":[],"method":"POST","args":{"from":{},"to":{},"uh":{}},"isListing":false},{"path":"/search","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"q":{},"restrict_sr":{},"show":{},"sort":{},"syntax":{},"t":{}},"isListing":true},{"path":"/r/$subreddit/search","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"q":{},"restrict_sr":{},"show":{},"sort":{},"syntax":{},"t":{}},"isListing":true},{"path":"/about/$where","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{},"user":{}},"isListing":true},{"path":"/r/$subreddit/about/$where","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{},"user":{}},"isListing":true},{"path":"/about/banned","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{},"user":{}},"isListing":true},{"path":"/r/$subreddit/about/banned","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{},"user":{}},"isListing":true},{"path":"/about/wikibanned","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{},"user":{}},"isListing":true},{"path":"/r/$subreddit/about/wikibanned","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{},"user":{}},"isListing":true},{"path":"/about/contributors","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{},"user":{}},"isListing":true},{"path":"/r/$subreddit/about/contributors","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{},"user":{}},"isListing":true},{"path":"/about/wikicontributors","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{},"user":{}},"isListing":true},{"path":"/r/$subreddit/about/wikicontributors","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{},"user":{}},"isListing":true},{"path":"/about/moderators","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{},"user":{}},"isListing":true},{"path":"/r/$subreddit/about/moderators","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{},"user":{}},"isListing":true},{"path":"/api/delete_sr_header","oauth":["modconfig"],"extensions":[],"method":"POST","args":{"api_type":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/api/delete_sr_header","oauth":["modconfig"],"extensions":[],"method":"POST","args":{"api_type":{},"uh":{}},"isListing":false},{"path":"/api/delete_sr_img","oauth":["modconfig"],"extensions":[],"method":"POST","args":{"api_type":{},"img_name":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/api/delete_sr_img","oauth":["modconfig"],"extensions":[],"method":"POST","args":{"api_type":{},"img_name":{},"uh":{}},"isListing":false},{"path":"/api/recommend/sr/$srnames","oauth":["read"],"extensions":[],"method":"GET","args":{"omit":{},"srnames":{}},"isListing":false},{"path":"/api/search_reddit_names.json","oauth":["read"],"extensions":[],"method":"POST","args":{"include_over_18":{},"query":{}},"isListing":false},{"path":"/api/site_admin","oauth":["modconfig"],"extensions":[],"method":"POST","args":{"allow_top":{},"api_type":{},"collapse_deleted_comments":{},"comment_score_hide_mins":{},"css_on_cname":{},"description":{},"exclude_banned_modqueue":{},"header-title":{},"lang":{},"link_type":{},"name":{},"over_18":{},"public_description":{},"public_traffic":{},"show_cname_sidebar":{},"show_media":{},"spam_comments":{},"spam_links":{},"spam_selfposts":{},"sr":{},"submit_link_label":{},"submit_text":{},"submit_text_label":{},"title":{},"type":{},"uh":{},"wiki_edit_age":{},"wiki_edit_karma":{},"wikimode":{}},"isListing":false},{"path":"/api/submit_text.json","oauth":["submit"],"extensions":[],"method":"GET","args":{},"isListing":false},{"path":"/r/$subreddit/api/submit_text.json","oauth":["submit"],"extensions":[],"method":"GET","args":{},"isListing":false},{"path":"/api/$subreddit_stylesheet","oauth":["modconfig"],"extensions":[],"method":"POST","args":{"api_type":{},"op":{},"reason":{},"stylesheet_contents":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/api/subreddit_stylesheet","oauth":["modconfig"],"extensions":[],"method":"POST","args":{"api_type":{},"op":{},"reason":{},"stylesheet_contents":{},"uh":{}},"isListing":false},{"path":"/api/subreddits_by_topic.json","oauth":["read"],"extensions":[],"method":"GET","args":{"query":{}},"isListing":false},{"path":"/api/subscribe","oauth":["subscribe"],"extensions":[],"method":"POST","args":{"action":{},"sr":{},"uh":{}},"isListing":false},{"path":"/api/upload_sr_img","oauth":["modconfig"],"extensions":[],"method":"POST","args":{"file":{},"formid":{},"header":{},"img_type":{},"name":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/api/upload_sr_img","oauth":["modconfig"],"extensions":[],"method":"POST","args":{"file":{},"formid":{},"header":{},"img_type":{},"name":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/about.json","oauth":["read"],"extensions":[],"method":"GET","args":{},"isListing":false},{"path":"/r/$subreddit/about/edit.json","oauth":["modconfig"],"extensions":[],"method":"GET","args":{"created":{},"location":{}},"isListing":false},{"path":"/subreddits/mine/$where","oauth":["mysubreddits"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/subreddits/mine/subscriber","oauth":["mysubreddits"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/subreddits/mine/contributor","oauth":["mysubreddits"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/subreddits/mine/moderator","oauth":["mysubreddits"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/subreddits/search","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"q":{},"show":{}},"isListing":true},{"path":"/subreddits/$where","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/subreddits/popular","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/subreddits/new","oauth":["read"],"extensions":[".json",".xml"],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/api/friend","oauth":[],"extensions":[],"method":"POST","args":{"api_type":{},"ban_message":{},"container":{},"duration":{},"name":{},"note":{},"permissions":{},"type":{},"uh":{}},"isListing":false},{"path":"/api/setpermissions","oauth":[],"extensions":[],"method":"POST","args":{"api_type":{},"name":{},"permissions":{},"type":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/api/setpermissions","oauth":[],"extensions":[],"method":"POST","args":{"api_type":{},"name":{},"permissions":{},"type":{},"uh":{}},"isListing":false},{"path":"/api/unfriend","oauth":[],"extensions":[],"method":"POST","args":{"container":{},"id":{},"name":{},"type":{},"uh":{}},"isListing":false},{"path":"/api/username_available.json","oauth":[],"extensions":[],"method":"GET","args":{"user":{}},"isListing":false},{"path":"/api/v1/me/friends/$username","oauth":["subscribe"],"extensions":[],"method":"DELETE","args":{"username":{}},"isListing":false},{"path":"/api/v1/me/friends/$username","oauth":["mysubreddits"],"extensions":[],"method":"GET","args":{"username":{}},"isListing":false},{"path":"/api/v1/me/friends/$username","oauth":["subscribe"],"extensions":[],"method":"PUT","args":{"This":{}},"isListing":false},{"path":"/api/v1/user/$username/trophies","oauth":["read"],"extensions":[],"method":"GET","args":{"username":{}},"isListing":false},{"path":"/user/$username/about.json","oauth":["read"],"extensions":[],"method":"GET","args":{"username":{}},"isListing":false},{"path":"/user/$username/$where","oauth":["history"],"extensions":[".json",".xml"],"method":"GET","args":{"show":{},"sort":{},"t":{},"username":{},"after":{},"before":{},"count":{},"limit":{}},"isListing":true},{"path":"/user/$username/overview","oauth":["history"],"extensions":[".json",".xml"],"method":"GET","args":{"show":{},"sort":{},"t":{},"username":{},"after":{},"before":{},"count":{},"limit":{}},"isListing":true},{"path":"/user/$username/submitted","oauth":["history"],"extensions":[".json",".xml"],"method":"GET","args":{"show":{},"sort":{},"t":{},"username":{},"after":{},"before":{},"count":{},"limit":{}},"isListing":true},{"path":"/user/$username/comments","oauth":["history"],"extensions":[".json",".xml"],"method":"GET","args":{"show":{},"sort":{},"t":{},"username":{},"after":{},"before":{},"count":{},"limit":{}},"isListing":true},{"path":"/user/$username/liked","oauth":["history"],"extensions":[".json",".xml"],"method":"GET","args":{"show":{},"sort":{},"t":{},"username":{},"after":{},"before":{},"count":{},"limit":{}},"isListing":true},{"path":"/user/$username/disliked","oauth":["history"],"extensions":[".json",".xml"],"method":"GET","args":{"show":{},"sort":{},"t":{},"username":{},"after":{},"before":{},"count":{},"limit":{}},"isListing":true},{"path":"/user/$username/hidden","oauth":["history"],"extensions":[".json",".xml"],"method":"GET","args":{"show":{},"sort":{},"t":{},"username":{},"after":{},"before":{},"count":{},"limit":{}},"isListing":true},{"path":"/user/$username/saved","oauth":["history"],"extensions":[".json",".xml"],"method":"GET","args":{"show":{},"sort":{},"t":{},"username":{},"after":{},"before":{},"count":{},"limit":{}},"isListing":true},{"path":"/user/$username/gilded","oauth":["history"],"extensions":[".json",".xml"],"method":"GET","args":{"show":{},"sort":{},"t":{},"username":{},"after":{},"before":{},"count":{},"limit":{}},"isListing":true},{"path":"/api/wiki/alloweditor/$act","oauth":["modwiki"],"extensions":[],"method":"POST","args":{"act":{},"page":{},"uh":{},"username":{}},"isListing":false},{"path":"/r/$subreddit/api/wiki/alloweditor/$act","oauth":["modwiki"],"extensions":[],"method":"POST","args":{"act":{},"page":{},"uh":{},"username":{}},"isListing":false},{"path":"/api/wiki/alloweditor/del","oauth":["modwiki"],"extensions":[],"method":"POST","args":{"act":{},"page":{},"uh":{},"username":{}},"isListing":false},{"path":"/r/$subreddit/api/wiki/alloweditor/del","oauth":["modwiki"],"extensions":[],"method":"POST","args":{"act":{},"page":{},"uh":{},"username":{}},"isListing":false},{"path":"/api/wiki/alloweditor/add","oauth":["modwiki"],"extensions":[],"method":"POST","args":{"act":{},"page":{},"uh":{},"username":{}},"isListing":false},{"path":"/r/$subreddit/api/wiki/alloweditor/add","oauth":["modwiki"],"extensions":[],"method":"POST","args":{"act":{},"page":{},"uh":{},"username":{}},"isListing":false},{"path":"/api/wiki/edit","oauth":["wikiedit"],"extensions":[],"method":"POST","args":{"content":{},"page":{},"previous":{},"reason":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/api/wiki/edit","oauth":["wikiedit"],"extensions":[],"method":"POST","args":{"content":{},"page":{},"previous":{},"reason":{},"uh":{}},"isListing":false},{"path":"/api/wiki/hide","oauth":["modwiki"],"extensions":[],"method":"POST","args":{"page":{},"revision":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/api/wiki/hide","oauth":["modwiki"],"extensions":[],"method":"POST","args":{"page":{},"revision":{},"uh":{}},"isListing":false},{"path":"/api/wiki/revert","oauth":["modwiki"],"extensions":[],"method":"POST","args":{"page":{},"revision":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/api/wiki/revert","oauth":["modwiki"],"extensions":[],"method":"POST","args":{"page":{},"revision":{},"uh":{}},"isListing":false},{"path":"/wiki/discussions/$page","oauth":["wikiread"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"page":{},"show":{}},"isListing":true},{"path":"/r/$subreddit/wiki/discussions/$page","oauth":["wikiread"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"page":{},"show":{}},"isListing":true},{"path":"/wiki/pages","oauth":["wikiread"],"extensions":[],"method":"GET","args":{},"isListing":false},{"path":"/r/$subreddit/wiki/pages","oauth":["wikiread"],"extensions":[],"method":"GET","args":{},"isListing":false},{"path":"/wiki/revisions","oauth":["wikiread"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/r/$subreddit/wiki/revisions","oauth":["wikiread"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"show":{}},"isListing":true},{"path":"/wiki/revisions/$page","oauth":["wikiread"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"page":{},"show":{}},"isListing":true},{"path":"/r/$subreddit/wiki/revisions/$page","oauth":["wikiread"],"extensions":[],"method":"GET","args":{"after":{},"before":{},"count":{},"limit":{},"page":{},"show":{}},"isListing":true},{"path":"/wiki/settings/$page","oauth":["modwiki"],"extensions":[],"method":"GET","args":{"page":{}},"isListing":false},{"path":"/r/$subreddit/wiki/settings/$page","oauth":["modwiki"],"extensions":[],"method":"GET","args":{"page":{}},"isListing":false},{"path":"/wiki/settings/$page","oauth":["modwiki"],"extensions":[],"method":"POST","args":{"listed":{},"page":{},"permlevel":{},"uh":{}},"isListing":false},{"path":"/r/$subreddit/wiki/settings/$page","oauth":["modwiki"],"extensions":[],"method":"POST","args":{"listed":{},"page":{},"permlevel":{},"uh":{}},"isListing":false},{"path":"/wiki/$page","oauth":["wikiread"],"extensions":[],"method":"GET","args":{"page":{},"v":{},"v2":{}},"isListing":false},{"path":"/r/$subreddit/wiki/$page","oauth":["wikiread"],"extensions":[],"method":"GET","args":{"page":{},"v":{},"v2":{}},"isListing":false}];

},{}],3:[function(require,module,exports){
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

  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
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
  arr.constructor = Buffer
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

},{"base64-js":4,"ieee754":5,"is-array":6}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){

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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
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
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],9:[function(require,module,exports){
(function (global){
/*! http://mths.be/punycode v1.2.4 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports;
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^ -~]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		while (length--) {
			array[length] = fn(array[length]);
		}
		return array;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings.
	 * @private
	 * @param {String} domain The domain name.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		return map(string.split(regexSeparators), fn).join('.');
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <http://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
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

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
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

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
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
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
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

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols to a Punycode string of ASCII-only
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
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
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
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
					// Represent delta as a generalized variable-length integer
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

	/**
	 * Converts a Punycode string representing a domain name to Unicode. Only the
	 * Punycoded parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it on a string that has already been converted to
	 * Unicode.
	 * @memberOf punycode
	 * @param {String} domain The Punycode domain name to convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(domain) {
		return mapDomain(domain, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name to Punycode. Only the
	 * non-ASCII parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it with a domain that's already in ASCII.
	 * @memberOf punycode
	 * @param {String} domain The domain name to convert, as a Unicode string.
	 * @returns {String} The Punycode representation of the given domain name.
	 */
	function toASCII(domain) {
		return mapDomain(domain, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.2.4',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <http://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":10,"./encode":11}],13:[function(require,module,exports){
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

var punycode = require('punycode');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
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
  if (url && isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
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
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a puny coded representation of "domain".
      // It only converts the part of the domain name that
      // has non ASCII characters. I.e. it dosent matter if
      // you call it with a domain that already is in ASCII.
      var domainArray = this.hostname.split('.');
      var newOut = [];
      for (var i = 0; i < domainArray.length; ++i) {
        var s = domainArray[i];
        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
            'xn--' + punycode.encode(s) : s);
      }
      this.hostname = newOut.join('.');
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  Object.keys(this).forEach(function(k) {
    result[k] = this[k];
  }, this);

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    Object.keys(relative).forEach(function(k) {
      if (k !== 'protocol')
        result[k] = relative[k];
    });

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      Object.keys(relative).forEach(function(k) {
        result[k] = relative[k];
      });
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especialy happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!isNull(result.pathname) || !isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host) && (last === '.' || last === '..') ||
      last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
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

  // if the path is allowed to go above the root, restore leading ..s
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

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especialy happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!isNull(result.pathname) || !isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

function isString(arg) {
  return typeof arg === "string";
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isNull(arg) {
  return arg === null;
}
function isNullOrUndefined(arg) {
  return  arg == null;
}

},{"punycode":9,"querystring":12}],14:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],15:[function(require,module,exports){
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
},{"./support/isBuffer":14,"_process":8,"inherits":7}],16:[function(require,module,exports){
/** @license MIT License (c) copyright 2011-2013 original author or authors */

/**
 * delay.js
 *
 * Helper that returns a promise that resolves after a delay.
 *
 * @author Brian Cavalier
 * @author John Hann
 */

(function(define) {
define(function(require) {

	var when = require('./when');

    /**
	 * @deprecated Use when(value).delay(ms)
     */
    return function delay(msec, value) {
		return when(value).delay(msec);
    };

});
})(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); });



},{"./when":33}],17:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function (require) {

	var makePromise = require('./makePromise');
	var Scheduler = require('./Scheduler');
	var async = require('./env').asap;

	return makePromise({
		scheduler: new Scheduler(async)
	});

});
})(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); });

},{"./Scheduler":18,"./env":30,"./makePromise":31}],18:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	// Credit to Twisol (https://github.com/Twisol) for suggesting
	// this type of extensible queue + trampoline approach for next-tick conflation.

	/**
	 * Async task scheduler
	 * @param {function} async function to schedule a single async function
	 * @constructor
	 */
	function Scheduler(async) {
		this._async = async;
		this._running = false;

		this._queue = new Array(1<<16);
		this._queueLen = 0;
		this._afterQueue = new Array(1<<4);
		this._afterQueueLen = 0;

		var self = this;
		this.drain = function() {
			self._drain();
		};
	}

	/**
	 * Enqueue a task
	 * @param {{ run:function }} task
	 */
	Scheduler.prototype.enqueue = function(task) {
		this._queue[this._queueLen++] = task;
		this.run();
	};

	/**
	 * Enqueue a task to run after the main task queue
	 * @param {{ run:function }} task
	 */
	Scheduler.prototype.afterQueue = function(task) {
		this._afterQueue[this._afterQueueLen++] = task;
		this.run();
	};

	Scheduler.prototype.run = function() {
		if (!this._running) {
			this._running = true;
			this._async(this.drain);
		}
	};

	/**
	 * Drain the handler queue entirely, and then the after queue
	 */
	Scheduler.prototype._drain = function() {
		var i = 0;
		for (; i < this._queueLen; ++i) {
			this._queue[i].run();
			this._queue[i] = void 0;
		}

		this._queueLen = 0;
		this._running = false;

		for (i = 0; i < this._afterQueueLen; ++i) {
			this._afterQueue[i].run();
			this._afterQueue[i] = void 0;
		}

		this._afterQueueLen = 0;
	};

	return Scheduler;

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],19:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	/**
	 * Custom error type for promises rejected by promise.timeout
	 * @param {string} message
	 * @constructor
	 */
	function TimeoutError (message) {
		Error.call(this);
		this.message = message;
		this.name = TimeoutError.name;
		if (typeof Error.captureStackTrace === 'function') {
			Error.captureStackTrace(this, TimeoutError);
		}
	}

	TimeoutError.prototype = Object.create(Error.prototype);
	TimeoutError.prototype.constructor = TimeoutError;

	return TimeoutError;
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));
},{}],20:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	makeApply.tryCatchResolve = tryCatchResolve;

	return makeApply;

	function makeApply(Promise, call) {
		if(arguments.length < 2) {
			call = tryCatchResolve;
		}

		return apply;

		function apply(f, thisArg, args) {
			var p = Promise._defer();
			var l = args.length;
			var params = new Array(l);
			callAndResolve({ f:f, thisArg:thisArg, args:args, params:params, i:l-1, call:call }, p._handler);

			return p;
		}

		function callAndResolve(c, h) {
			if(c.i < 0) {
				return call(c.f, c.thisArg, c.params, h);
			}

			var handler = Promise._handler(c.args[c.i]);
			handler.fold(callAndResolveNext, c, void 0, h);
		}

		function callAndResolveNext(c, x, h) {
			c.params[c.i] = x;
			c.i -= 1;
			callAndResolve(c, h);
		}
	}

	function tryCatchResolve(f, thisArg, args, resolver) {
		try {
			resolver.resolve(f.apply(thisArg, args));
		} catch(e) {
			resolver.reject(e);
		}
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));



},{}],21:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function(require) {

	var state = require('../state');
	var applier = require('../apply');

	return function array(Promise) {

		var applyFold = applier(Promise);
		var toPromise = Promise.resolve;
		var all = Promise.all;

		var ar = Array.prototype.reduce;
		var arr = Array.prototype.reduceRight;
		var slice = Array.prototype.slice;

		// Additional array combinators

		Promise.any = any;
		Promise.some = some;
		Promise.settle = settle;

		Promise.map = map;
		Promise.filter = filter;
		Promise.reduce = reduce;
		Promise.reduceRight = reduceRight;

		/**
		 * When this promise fulfills with an array, do
		 * onFulfilled.apply(void 0, array)
		 * @param {function} onFulfilled function to apply
		 * @returns {Promise} promise for the result of applying onFulfilled
		 */
		Promise.prototype.spread = function(onFulfilled) {
			return this.then(all).then(function(array) {
				return onFulfilled.apply(this, array);
			});
		};

		return Promise;

		/**
		 * One-winner competitive race.
		 * Return a promise that will fulfill when one of the promises
		 * in the input array fulfills, or will reject when all promises
		 * have rejected.
		 * @param {array} promises
		 * @returns {Promise} promise for the first fulfilled value
		 */
		function any(promises) {
			var p = Promise._defer();
			var resolver = p._handler;
			var l = promises.length>>>0;

			var pending = l;
			var errors = [];

			for (var h, x, i = 0; i < l; ++i) {
				x = promises[i];
				if(x === void 0 && !(i in promises)) {
					--pending;
					continue;
				}

				h = Promise._handler(x);
				if(h.state() > 0) {
					resolver.become(h);
					Promise._visitRemaining(promises, i, h);
					break;
				} else {
					h.visit(resolver, handleFulfill, handleReject);
				}
			}

			if(pending === 0) {
				resolver.reject(new RangeError('any(): array must not be empty'));
			}

			return p;

			function handleFulfill(x) {
				/*jshint validthis:true*/
				errors = null;
				this.resolve(x); // this === resolver
			}

			function handleReject(e) {
				/*jshint validthis:true*/
				if(this.resolved) { // this === resolver
					return;
				}

				errors.push(e);
				if(--pending === 0) {
					this.reject(errors);
				}
			}
		}

		/**
		 * N-winner competitive race
		 * Return a promise that will fulfill when n input promises have
		 * fulfilled, or will reject when it becomes impossible for n
		 * input promises to fulfill (ie when promises.length - n + 1
		 * have rejected)
		 * @param {array} promises
		 * @param {number} n
		 * @returns {Promise} promise for the earliest n fulfillment values
		 *
		 * @deprecated
		 */
		function some(promises, n) {
			/*jshint maxcomplexity:7*/
			var p = Promise._defer();
			var resolver = p._handler;

			var results = [];
			var errors = [];

			var l = promises.length>>>0;
			var nFulfill = 0;
			var nReject;
			var x, i; // reused in both for() loops

			// First pass: count actual array items
			for(i=0; i<l; ++i) {
				x = promises[i];
				if(x === void 0 && !(i in promises)) {
					continue;
				}
				++nFulfill;
			}

			// Compute actual goals
			n = Math.max(n, 0);
			nReject = (nFulfill - n + 1);
			nFulfill = Math.min(n, nFulfill);

			if(n > nFulfill) {
				resolver.reject(new RangeError('some(): array must contain at least '
				+ n + ' item(s), but had ' + nFulfill));
			} else if(nFulfill === 0) {
				resolver.resolve(results);
			}

			// Second pass: observe each array item, make progress toward goals
			for(i=0; i<l; ++i) {
				x = promises[i];
				if(x === void 0 && !(i in promises)) {
					continue;
				}

				Promise._handler(x).visit(resolver, fulfill, reject, resolver.notify);
			}

			return p;

			function fulfill(x) {
				/*jshint validthis:true*/
				if(this.resolved) { // this === resolver
					return;
				}

				results.push(x);
				if(--nFulfill === 0) {
					errors = null;
					this.resolve(results);
				}
			}

			function reject(e) {
				/*jshint validthis:true*/
				if(this.resolved) { // this === resolver
					return;
				}

				errors.push(e);
				if(--nReject === 0) {
					results = null;
					this.reject(errors);
				}
			}
		}

		/**
		 * Apply f to the value of each promise in a list of promises
		 * and return a new list containing the results.
		 * @param {array} promises
		 * @param {function(x:*, index:Number):*} f mapping function
		 * @returns {Promise}
		 */
		function map(promises, f) {
			return Promise._traverse(f, promises);
		}

		/**
		 * Filter the provided array of promises using the provided predicate.  Input may
		 * contain promises and values
		 * @param {Array} promises array of promises and values
		 * @param {function(x:*, index:Number):boolean} predicate filtering predicate.
		 *  Must return truthy (or promise for truthy) for items to retain.
		 * @returns {Promise} promise that will fulfill with an array containing all items
		 *  for which predicate returned truthy.
		 */
		function filter(promises, predicate) {
			var a = slice.call(promises);
			return Promise._traverse(predicate, a).then(function(keep) {
				return filterSync(a, keep);
			});
		}

		function filterSync(promises, keep) {
			// Safe because we know all promises have fulfilled if we've made it this far
			var l = keep.length;
			var filtered = new Array(l);
			for(var i=0, j=0; i<l; ++i) {
				if(keep[i]) {
					filtered[j++] = Promise._handler(promises[i]).value;
				}
			}
			filtered.length = j;
			return filtered;

		}

		/**
		 * Return a promise that will always fulfill with an array containing
		 * the outcome states of all input promises.  The returned promise
		 * will never reject.
		 * @param {Array} promises
		 * @returns {Promise} promise for array of settled state descriptors
		 */
		function settle(promises) {
			return all(promises.map(settleOne));
		}

		function settleOne(p) {
			var h = Promise._handler(p);
			return h.state() === 0 ? toPromise(p).then(state.fulfilled, state.rejected)
					: state.inspect(h);
		}

		/**
		 * Traditional reduce function, similar to `Array.prototype.reduce()`, but
		 * input may contain promises and/or values, and reduceFunc
		 * may return either a value or a promise, *and* initialValue may
		 * be a promise for the starting value.
		 * @param {Array|Promise} promises array or promise for an array of anything,
		 *      may contain a mix of promises and values.
		 * @param {function(accumulated:*, x:*, index:Number):*} f reduce function
		 * @returns {Promise} that will resolve to the final reduced value
		 */
		function reduce(promises, f /*, initialValue */) {
			return arguments.length > 2 ? ar.call(promises, liftCombine(f), arguments[2])
					: ar.call(promises, liftCombine(f));
		}

		/**
		 * Traditional reduce function, similar to `Array.prototype.reduceRight()`, but
		 * input may contain promises and/or values, and reduceFunc
		 * may return either a value or a promise, *and* initialValue may
		 * be a promise for the starting value.
		 * @param {Array|Promise} promises array or promise for an array of anything,
		 *      may contain a mix of promises and values.
		 * @param {function(accumulated:*, x:*, index:Number):*} f reduce function
		 * @returns {Promise} that will resolve to the final reduced value
		 */
		function reduceRight(promises, f /*, initialValue */) {
			return arguments.length > 2 ? arr.call(promises, liftCombine(f), arguments[2])
					: arr.call(promises, liftCombine(f));
		}

		function liftCombine(f) {
			return function(z, x, i) {
				return applyFold(f, void 0, [z,x,i]);
			};
		}
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

},{"../apply":20,"../state":32}],22:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return function flow(Promise) {

		var resolve = Promise.resolve;
		var reject = Promise.reject;
		var origCatch = Promise.prototype['catch'];

		/**
		 * Handle the ultimate fulfillment value or rejection reason, and assume
		 * responsibility for all errors.  If an error propagates out of result
		 * or handleFatalError, it will be rethrown to the host, resulting in a
		 * loud stack track on most platforms and a crash on some.
		 * @param {function?} onResult
		 * @param {function?} onError
		 * @returns {undefined}
		 */
		Promise.prototype.done = function(onResult, onError) {
			this._handler.visit(this._handler.receiver, onResult, onError);
		};

		/**
		 * Add Error-type and predicate matching to catch.  Examples:
		 * promise.catch(TypeError, handleTypeError)
		 *   .catch(predicate, handleMatchedErrors)
		 *   .catch(handleRemainingErrors)
		 * @param onRejected
		 * @returns {*}
		 */
		Promise.prototype['catch'] = Promise.prototype.otherwise = function(onRejected) {
			if (arguments.length < 2) {
				return origCatch.call(this, onRejected);
			}

			if(typeof onRejected !== 'function') {
				return this.ensure(rejectInvalidPredicate);
			}

			return origCatch.call(this, createCatchFilter(arguments[1], onRejected));
		};

		/**
		 * Wraps the provided catch handler, so that it will only be called
		 * if the predicate evaluates truthy
		 * @param {?function} handler
		 * @param {function} predicate
		 * @returns {function} conditional catch handler
		 */
		function createCatchFilter(handler, predicate) {
			return function(e) {
				return evaluatePredicate(e, predicate)
					? handler.call(this, e)
					: reject(e);
			};
		}

		/**
		 * Ensures that onFulfilledOrRejected will be called regardless of whether
		 * this promise is fulfilled or rejected.  onFulfilledOrRejected WILL NOT
		 * receive the promises' value or reason.  Any returned value will be disregarded.
		 * onFulfilledOrRejected may throw or return a rejected promise to signal
		 * an additional error.
		 * @param {function} handler handler to be called regardless of
		 *  fulfillment or rejection
		 * @returns {Promise}
		 */
		Promise.prototype['finally'] = Promise.prototype.ensure = function(handler) {
			if(typeof handler !== 'function') {
				return this;
			}

			return this.then(function(x) {
				return runSideEffect(handler, this, identity, x);
			}, function(e) {
				return runSideEffect(handler, this, reject, e);
			});
		};

		function runSideEffect (handler, thisArg, propagate, value) {
			var result = handler.call(thisArg);
			return maybeThenable(result)
				? propagateValue(result, propagate, value)
				: propagate(value);
		}

		function propagateValue (result, propagate, x) {
			return resolve(result).then(function () {
				return propagate(x);
			});
		}

		/**
		 * Recover from a failure by returning a defaultValue.  If defaultValue
		 * is a promise, it's fulfillment value will be used.  If defaultValue is
		 * a promise that rejects, the returned promise will reject with the
		 * same reason.
		 * @param {*} defaultValue
		 * @returns {Promise} new promise
		 */
		Promise.prototype['else'] = Promise.prototype.orElse = function(defaultValue) {
			return this.then(void 0, function() {
				return defaultValue;
			});
		};

		/**
		 * Shortcut for .then(function() { return value; })
		 * @param  {*} value
		 * @return {Promise} a promise that:
		 *  - is fulfilled if value is not a promise, or
		 *  - if value is a promise, will fulfill with its value, or reject
		 *    with its reason.
		 */
		Promise.prototype['yield'] = function(value) {
			return this.then(function() {
				return value;
			});
		};

		/**
		 * Runs a side effect when this promise fulfills, without changing the
		 * fulfillment value.
		 * @param {function} onFulfilledSideEffect
		 * @returns {Promise}
		 */
		Promise.prototype.tap = function(onFulfilledSideEffect) {
			return this.then(onFulfilledSideEffect)['yield'](this);
		};

		return Promise;
	};

	function rejectInvalidPredicate() {
		throw new TypeError('catch predicate must be a function');
	}

	function evaluatePredicate(e, predicate) {
		return isError(predicate) ? e instanceof predicate : predicate(e);
	}

	function isError(predicate) {
		return predicate === Error
			|| (predicate != null && predicate.prototype instanceof Error);
	}

	function maybeThenable(x) {
		return (typeof x === 'object' || typeof x === 'function') && x !== null;
	}

	function identity(x) {
		return x;
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],23:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */
/** @author Jeff Escalante */

(function(define) { 'use strict';
define(function() {

	return function fold(Promise) {

		Promise.prototype.fold = function(f, z) {
			var promise = this._beget();

			this._handler.fold(function(z, x, to) {
				Promise._handler(z).fold(function(x, z, to) {
					to.resolve(f.call(this, z, x));
				}, x, this, to);
			}, z, promise._handler.receiver, promise._handler);

			return promise;
		};

		return Promise;
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],24:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function(require) {

	var inspect = require('../state').inspect;

	return function inspection(Promise) {

		Promise.prototype.inspect = function() {
			return inspect(Promise._handler(this));
		};

		return Promise;
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

},{"../state":32}],25:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return function generate(Promise) {

		var resolve = Promise.resolve;

		Promise.iterate = iterate;
		Promise.unfold = unfold;

		return Promise;

		/**
		 * @deprecated Use github.com/cujojs/most streams and most.iterate
		 * Generate a (potentially infinite) stream of promised values:
		 * x, f(x), f(f(x)), etc. until condition(x) returns true
		 * @param {function} f function to generate a new x from the previous x
		 * @param {function} condition function that, given the current x, returns
		 *  truthy when the iterate should stop
		 * @param {function} handler function to handle the value produced by f
		 * @param {*|Promise} x starting value, may be a promise
		 * @return {Promise} the result of the last call to f before
		 *  condition returns true
		 */
		function iterate(f, condition, handler, x) {
			return unfold(function(x) {
				return [x, f(x)];
			}, condition, handler, x);
		}

		/**
		 * @deprecated Use github.com/cujojs/most streams and most.unfold
		 * Generate a (potentially infinite) stream of promised values
		 * by applying handler(generator(seed)) iteratively until
		 * condition(seed) returns true.
		 * @param {function} unspool function that generates a [value, newSeed]
		 *  given a seed.
		 * @param {function} condition function that, given the current seed, returns
		 *  truthy when the unfold should stop
		 * @param {function} handler function to handle the value produced by unspool
		 * @param x {*|Promise} starting value, may be a promise
		 * @return {Promise} the result of the last value produced by unspool before
		 *  condition returns true
		 */
		function unfold(unspool, condition, handler, x) {
			return resolve(x).then(function(seed) {
				return resolve(condition(seed)).then(function(done) {
					return done ? seed : resolve(unspool(seed)).spread(next);
				});
			});

			function next(item, newSeed) {
				return resolve(handler(item)).then(function() {
					return unfold(unspool, condition, handler, newSeed);
				});
			}
		}
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],26:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return function progress(Promise) {

		/**
		 * @deprecated
		 * Register a progress handler for this promise
		 * @param {function} onProgress
		 * @returns {Promise}
		 */
		Promise.prototype.progress = function(onProgress) {
			return this.then(void 0, void 0, onProgress);
		};

		return Promise;
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],27:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function(require) {

	var env = require('../env');
	var TimeoutError = require('../TimeoutError');

	function setTimeout(f, ms, x, y) {
		return env.setTimer(function() {
			f(x, y, ms);
		}, ms);
	}

	return function timed(Promise) {
		/**
		 * Return a new promise whose fulfillment value is revealed only
		 * after ms milliseconds
		 * @param {number} ms milliseconds
		 * @returns {Promise}
		 */
		Promise.prototype.delay = function(ms) {
			var p = this._beget();
			this._handler.fold(handleDelay, ms, void 0, p._handler);
			return p;
		};

		function handleDelay(ms, x, h) {
			setTimeout(resolveDelay, ms, x, h);
		}

		function resolveDelay(x, h) {
			h.resolve(x);
		}

		/**
		 * Return a new promise that rejects after ms milliseconds unless
		 * this promise fulfills earlier, in which case the returned promise
		 * fulfills with the same value.
		 * @param {number} ms milliseconds
		 * @param {Error|*=} reason optional rejection reason to use, defaults
		 *   to a TimeoutError if not provided
		 * @returns {Promise}
		 */
		Promise.prototype.timeout = function(ms, reason) {
			var p = this._beget();
			var h = p._handler;

			var t = setTimeout(onTimeout, ms, reason, p._handler);

			this._handler.visit(h,
				function onFulfill(x) {
					env.clearTimer(t);
					this.resolve(x); // this = h
				},
				function onReject(x) {
					env.clearTimer(t);
					this.reject(x); // this = h
				},
				h.notify);

			return p;
		};

		function onTimeout(reason, h, ms) {
			var e = typeof reason === 'undefined'
				? new TimeoutError('timed out after ' + ms + 'ms')
				: reason;
			h.reject(e);
		}

		return Promise;
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

},{"../TimeoutError":19,"../env":30}],28:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function(require) {

	var setTimer = require('../env').setTimer;

	return function unhandledRejection(Promise) {
		var logError = noop;
		var logInfo = noop;
		var localConsole;

		if(typeof console !== 'undefined') {
			// Alias console to prevent things like uglify's drop_console option from
			// removing console.log/error. Unhandled rejections fall into the same
			// category as uncaught exceptions, and build tools shouldn't silence them.
			localConsole = console;
			logError = typeof localConsole.error !== 'undefined'
				? function (e) { localConsole.error(e); }
				: function (e) { localConsole.log(e); };

			logInfo = typeof localConsole.info !== 'undefined'
				? function (e) { localConsole.info(e); }
				: function (e) { localConsole.log(e); };
		}

		Promise.onPotentiallyUnhandledRejection = function(rejection) {
			enqueue(report, rejection);
		};

		Promise.onPotentiallyUnhandledRejectionHandled = function(rejection) {
			enqueue(unreport, rejection);
		};

		Promise.onFatalRejection = function(rejection) {
			enqueue(throwit, rejection.value);
		};

		var tasks = [];
		var reported = [];
		var running = null;

		function report(r) {
			if(!r.handled) {
				reported.push(r);
				logError('Potentially unhandled rejection [' + r.id + '] ' + formatError(r.value));
			}
		}

		function unreport(r) {
			var i = reported.indexOf(r);
			if(i >= 0) {
				reported.splice(i, 1);
				logInfo('Handled previous rejection [' + r.id + '] ' + formatObject(r.value));
			}
		}

		function enqueue(f, x) {
			tasks.push(f, x);
			if(running === null) {
				running = setTimer(flush, 0);
			}
		}

		function flush() {
			running = null;
			while(tasks.length > 0) {
				tasks.shift()(tasks.shift());
			}
		}

		return Promise;
	};

	function formatError(e) {
		var s = typeof e === 'object' && e.stack ? e.stack : formatObject(e);
		return e instanceof Error ? s : s + ' (WARNING: non-Error used)';
	}

	function formatObject(o) {
		var s = String(o);
		if(s === '[object Object]' && typeof JSON !== 'undefined') {
			s = tryStringify(o, s);
		}
		return s;
	}

	function tryStringify(e, defaultValue) {
		try {
			return JSON.stringify(e);
		} catch(e) {
			// Ignore. Cannot JSON.stringify e, stick with String(e)
			return defaultValue;
		}
	}

	function throwit(e) {
		throw e;
	}

	function noop() {}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

},{"../env":30}],29:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return function addWith(Promise) {
		/**
		 * Returns a promise whose handlers will be called with `this` set to
		 * the supplied receiver.  Subsequent promises derived from the
		 * returned promise will also have their handlers called with receiver
		 * as `this`. Calling `with` with undefined or no arguments will return
		 * a promise whose handlers will again be called in the usual Promises/A+
		 * way (no `this`) thus safely undoing any previous `with` in the
		 * promise chain.
		 *
		 * WARNING: Promises returned from `with`/`withThis` are NOT Promises/A+
		 * compliant, specifically violating 2.2.5 (http://promisesaplus.com/#point-41)
		 *
		 * @param {object} receiver `this` value for all handlers attached to
		 *  the returned promise.
		 * @returns {Promise}
		 */
		Promise.prototype['with'] = Promise.prototype.withThis = function(receiver) {
			var p = this._beget();
			var child = p._handler;
			child.receiver = receiver;
			this._handler.chain(child, receiver);
			return p;
		};

		return Promise;
	};

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));


},{}],30:[function(require,module,exports){
(function (process){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

/*global process,document,setTimeout,clearTimeout,MutationObserver,WebKitMutationObserver*/
(function(define) { 'use strict';
define(function(require) {
	/*jshint maxcomplexity:6*/

	// Sniff "best" async scheduling option
	// Prefer process.nextTick or MutationObserver, then check for
	// setTimeout, and finally vertx, since its the only env that doesn't
	// have setTimeout

	var MutationObs;
	var capturedSetTimeout = typeof setTimeout !== 'undefined' && setTimeout;

	// Default env
	var setTimer = function(f, ms) { return setTimeout(f, ms); };
	var clearTimer = function(t) { return clearTimeout(t); };
	var asap = function (f) { return capturedSetTimeout(f, 0); };

	// Detect specific env
	if (isNode()) { // Node
		asap = function (f) { return process.nextTick(f); };

	} else if (MutationObs = hasMutationObserver()) { // Modern browser
		asap = initMutationObserver(MutationObs);

	} else if (!capturedSetTimeout) { // vert.x
		var vertxRequire = require;
		var vertx = vertxRequire('vertx');
		setTimer = function (f, ms) { return vertx.setTimer(ms, f); };
		clearTimer = vertx.cancelTimer;
		asap = vertx.runOnLoop || vertx.runOnContext;
	}

	return {
		setTimer: setTimer,
		clearTimer: clearTimer,
		asap: asap
	};

	function isNode () {
		return typeof process !== 'undefined' && process !== null &&
			typeof process.nextTick === 'function';
	}

	function hasMutationObserver () {
		return (typeof MutationObserver === 'function' && MutationObserver) ||
			(typeof WebKitMutationObserver === 'function' && WebKitMutationObserver);
	}

	function initMutationObserver(MutationObserver) {
		var scheduled;
		var node = document.createTextNode('');
		var o = new MutationObserver(run);
		o.observe(node, { characterData: true });

		function run() {
			var f = scheduled;
			scheduled = void 0;
			f();
		}

		var i = 0;
		return function (f) {
			scheduled = f;
			node.data = (i ^= 1);
		};
	}
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

}).call(this,require('_process'))
},{"_process":8}],31:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return function makePromise(environment) {

		var tasks = environment.scheduler;

		var objectCreate = Object.create ||
			function(proto) {
				function Child() {}
				Child.prototype = proto;
				return new Child();
			};

		/**
		 * Create a promise whose fate is determined by resolver
		 * @constructor
		 * @returns {Promise} promise
		 * @name Promise
		 */
		function Promise(resolver, handler) {
			this._handler = resolver === Handler ? handler : init(resolver);
		}

		/**
		 * Run the supplied resolver
		 * @param resolver
		 * @returns {Pending}
		 */
		function init(resolver) {
			var handler = new Pending();

			try {
				resolver(promiseResolve, promiseReject, promiseNotify);
			} catch (e) {
				promiseReject(e);
			}

			return handler;

			/**
			 * Transition from pre-resolution state to post-resolution state, notifying
			 * all listeners of the ultimate fulfillment or rejection
			 * @param {*} x resolution value
			 */
			function promiseResolve (x) {
				handler.resolve(x);
			}
			/**
			 * Reject this promise with reason, which will be used verbatim
			 * @param {Error|*} reason rejection reason, strongly suggested
			 *   to be an Error type
			 */
			function promiseReject (reason) {
				handler.reject(reason);
			}

			/**
			 * @deprecated
			 * Issue a progress event, notifying all progress listeners
			 * @param {*} x progress event payload to pass to all listeners
			 */
			function promiseNotify (x) {
				handler.notify(x);
			}
		}

		// Creation

		Promise.resolve = resolve;
		Promise.reject = reject;
		Promise.never = never;

		Promise._defer = defer;
		Promise._handler = getHandler;

		/**
		 * Returns a trusted promise. If x is already a trusted promise, it is
		 * returned, otherwise returns a new trusted Promise which follows x.
		 * @param  {*} x
		 * @return {Promise} promise
		 */
		function resolve(x) {
			return isPromise(x) ? x
				: new Promise(Handler, new Async(getHandler(x)));
		}

		/**
		 * Return a reject promise with x as its reason (x is used verbatim)
		 * @param {*} x
		 * @returns {Promise} rejected promise
		 */
		function reject(x) {
			return new Promise(Handler, new Async(new Rejected(x)));
		}

		/**
		 * Return a promise that remains pending forever
		 * @returns {Promise} forever-pending promise.
		 */
		function never() {
			return foreverPendingPromise; // Should be frozen
		}

		/**
		 * Creates an internal {promise, resolver} pair
		 * @private
		 * @returns {Promise}
		 */
		function defer() {
			return new Promise(Handler, new Pending());
		}

		// Transformation and flow control

		/**
		 * Transform this promise's fulfillment value, returning a new Promise
		 * for the transformed result.  If the promise cannot be fulfilled, onRejected
		 * is called with the reason.  onProgress *may* be called with updates toward
		 * this promise's fulfillment.
		 * @param {function=} onFulfilled fulfillment handler
		 * @param {function=} onRejected rejection handler
		 * @param {function=} onProgress @deprecated progress handler
		 * @return {Promise} new promise
		 */
		Promise.prototype.then = function(onFulfilled, onRejected, onProgress) {
			var parent = this._handler;
			var state = parent.join().state();

			if ((typeof onFulfilled !== 'function' && state > 0) ||
				(typeof onRejected !== 'function' && state < 0)) {
				// Short circuit: value will not change, simply share handler
				return new this.constructor(Handler, parent);
			}

			var p = this._beget();
			var child = p._handler;

			parent.chain(child, parent.receiver, onFulfilled, onRejected, onProgress);

			return p;
		};

		/**
		 * If this promise cannot be fulfilled due to an error, call onRejected to
		 * handle the error. Shortcut for .then(undefined, onRejected)
		 * @param {function?} onRejected
		 * @return {Promise}
		 */
		Promise.prototype['catch'] = function(onRejected) {
			return this.then(void 0, onRejected);
		};

		/**
		 * Creates a new, pending promise of the same type as this promise
		 * @private
		 * @returns {Promise}
		 */
		Promise.prototype._beget = function() {
			return begetFrom(this._handler, this.constructor);
		};

		function begetFrom(parent, Promise) {
			var child = new Pending(parent.receiver, parent.join().context);
			return new Promise(Handler, child);
		}

		// Array combinators

		Promise.all = all;
		Promise.race = race;
		Promise._traverse = traverse;

		/**
		 * Return a promise that will fulfill when all promises in the
		 * input array have fulfilled, or will reject when one of the
		 * promises rejects.
		 * @param {array} promises array of promises
		 * @returns {Promise} promise for array of fulfillment values
		 */
		function all(promises) {
			return traverseWith(snd, null, promises);
		}

		/**
		 * Array<Promise<X>> -> Promise<Array<f(X)>>
		 * @private
		 * @param {function} f function to apply to each promise's value
		 * @param {Array} promises array of promises
		 * @returns {Promise} promise for transformed values
		 */
		function traverse(f, promises) {
			return traverseWith(tryCatch2, f, promises);
		}

		function traverseWith(tryMap, f, promises) {
			var handler = typeof f === 'function' ? mapAt : settleAt;

			var resolver = new Pending();
			var pending = promises.length >>> 0;
			var results = new Array(pending);

			for (var i = 0, x; i < promises.length && !resolver.resolved; ++i) {
				x = promises[i];

				if (x === void 0 && !(i in promises)) {
					--pending;
					continue;
				}

				traverseAt(promises, handler, i, x, resolver);
			}

			if(pending === 0) {
				resolver.become(new Fulfilled(results));
			}

			return new Promise(Handler, resolver);

			function mapAt(i, x, resolver) {
				if(!resolver.resolved) {
					traverseAt(promises, settleAt, i, tryMap(f, x, i), resolver);
				}
			}

			function settleAt(i, x, resolver) {
				results[i] = x;
				if(--pending === 0) {
					resolver.become(new Fulfilled(results));
				}
			}
		}

		function traverseAt(promises, handler, i, x, resolver) {
			if (maybeThenable(x)) {
				var h = getHandlerMaybeThenable(x);
				var s = h.state();

				if (s === 0) {
					h.fold(handler, i, void 0, resolver);
				} else if (s > 0) {
					handler(i, h.value, resolver);
				} else {
					resolver.become(h);
					visitRemaining(promises, i+1, h);
				}
			} else {
				handler(i, x, resolver);
			}
		}

		Promise._visitRemaining = visitRemaining;
		function visitRemaining(promises, start, handler) {
			for(var i=start; i<promises.length; ++i) {
				markAsHandled(getHandler(promises[i]), handler);
			}
		}

		function markAsHandled(h, handler) {
			if(h === handler) {
				return;
			}

			var s = h.state();
			if(s === 0) {
				h.visit(h, void 0, h._unreport);
			} else if(s < 0) {
				h._unreport();
			}
		}

		/**
		 * Fulfill-reject competitive race. Return a promise that will settle
		 * to the same state as the earliest input promise to settle.
		 *
		 * WARNING: The ES6 Promise spec requires that race()ing an empty array
		 * must return a promise that is pending forever.  This implementation
		 * returns a singleton forever-pending promise, the same singleton that is
		 * returned by Promise.never(), thus can be checked with ===
		 *
		 * @param {array} promises array of promises to race
		 * @returns {Promise} if input is non-empty, a promise that will settle
		 * to the same outcome as the earliest input promise to settle. if empty
		 * is empty, returns a promise that will never settle.
		 */
		function race(promises) {
			if(typeof promises !== 'object' || promises === null) {
				return reject(new TypeError('non-iterable passed to race()'));
			}

			// Sigh, race([]) is untestable unless we return *something*
			// that is recognizable without calling .then() on it.
			return promises.length === 0 ? never()
				 : promises.length === 1 ? resolve(promises[0])
				 : runRace(promises);
		}

		function runRace(promises) {
			var resolver = new Pending();
			var i, x, h;
			for(i=0; i<promises.length; ++i) {
				x = promises[i];
				if (x === void 0 && !(i in promises)) {
					continue;
				}

				h = getHandler(x);
				if(h.state() !== 0) {
					resolver.become(h);
					visitRemaining(promises, i+1, h);
					break;
				} else {
					h.visit(resolver, resolver.resolve, resolver.reject);
				}
			}
			return new Promise(Handler, resolver);
		}

		// Promise internals
		// Below this, everything is @private

		/**
		 * Get an appropriate handler for x, without checking for cycles
		 * @param {*} x
		 * @returns {object} handler
		 */
		function getHandler(x) {
			if(isPromise(x)) {
				return x._handler.join();
			}
			return maybeThenable(x) ? getHandlerUntrusted(x) : new Fulfilled(x);
		}

		/**
		 * Get a handler for thenable x.
		 * NOTE: You must only call this if maybeThenable(x) == true
		 * @param {object|function|Promise} x
		 * @returns {object} handler
		 */
		function getHandlerMaybeThenable(x) {
			return isPromise(x) ? x._handler.join() : getHandlerUntrusted(x);
		}

		/**
		 * Get a handler for potentially untrusted thenable x
		 * @param {*} x
		 * @returns {object} handler
		 */
		function getHandlerUntrusted(x) {
			try {
				var untrustedThen = x.then;
				return typeof untrustedThen === 'function'
					? new Thenable(untrustedThen, x)
					: new Fulfilled(x);
			} catch(e) {
				return new Rejected(e);
			}
		}

		/**
		 * Handler for a promise that is pending forever
		 * @constructor
		 */
		function Handler() {}

		Handler.prototype.when
			= Handler.prototype.become
			= Handler.prototype.notify // deprecated
			= Handler.prototype.fail
			= Handler.prototype._unreport
			= Handler.prototype._report
			= noop;

		Handler.prototype._state = 0;

		Handler.prototype.state = function() {
			return this._state;
		};

		/**
		 * Recursively collapse handler chain to find the handler
		 * nearest to the fully resolved value.
		 * @returns {object} handler nearest the fully resolved value
		 */
		Handler.prototype.join = function() {
			var h = this;
			while(h.handler !== void 0) {
				h = h.handler;
			}
			return h;
		};

		Handler.prototype.chain = function(to, receiver, fulfilled, rejected, progress) {
			this.when({
				resolver: to,
				receiver: receiver,
				fulfilled: fulfilled,
				rejected: rejected,
				progress: progress
			});
		};

		Handler.prototype.visit = function(receiver, fulfilled, rejected, progress) {
			this.chain(failIfRejected, receiver, fulfilled, rejected, progress);
		};

		Handler.prototype.fold = function(f, z, c, to) {
			this.when(new Fold(f, z, c, to));
		};

		/**
		 * Handler that invokes fail() on any handler it becomes
		 * @constructor
		 */
		function FailIfRejected() {}

		inherit(Handler, FailIfRejected);

		FailIfRejected.prototype.become = function(h) {
			h.fail();
		};

		var failIfRejected = new FailIfRejected();

		/**
		 * Handler that manages a queue of consumers waiting on a pending promise
		 * @constructor
		 */
		function Pending(receiver, inheritedContext) {
			Promise.createContext(this, inheritedContext);

			this.consumers = void 0;
			this.receiver = receiver;
			this.handler = void 0;
			this.resolved = false;
		}

		inherit(Handler, Pending);

		Pending.prototype._state = 0;

		Pending.prototype.resolve = function(x) {
			this.become(getHandler(x));
		};

		Pending.prototype.reject = function(x) {
			if(this.resolved) {
				return;
			}

			this.become(new Rejected(x));
		};

		Pending.prototype.join = function() {
			if (!this.resolved) {
				return this;
			}

			var h = this;

			while (h.handler !== void 0) {
				h = h.handler;
				if (h === this) {
					return this.handler = cycle();
				}
			}

			return h;
		};

		Pending.prototype.run = function() {
			var q = this.consumers;
			var handler = this.join();
			this.consumers = void 0;

			for (var i = 0; i < q.length; ++i) {
				handler.when(q[i]);
			}
		};

		Pending.prototype.become = function(handler) {
			if(this.resolved) {
				return;
			}

			this.resolved = true;
			this.handler = handler;
			if(this.consumers !== void 0) {
				tasks.enqueue(this);
			}

			if(this.context !== void 0) {
				handler._report(this.context);
			}
		};

		Pending.prototype.when = function(continuation) {
			if(this.resolved) {
				tasks.enqueue(new ContinuationTask(continuation, this.handler));
			} else {
				if(this.consumers === void 0) {
					this.consumers = [continuation];
				} else {
					this.consumers.push(continuation);
				}
			}
		};

		/**
		 * @deprecated
		 */
		Pending.prototype.notify = function(x) {
			if(!this.resolved) {
				tasks.enqueue(new ProgressTask(x, this));
			}
		};

		Pending.prototype.fail = function(context) {
			var c = typeof context === 'undefined' ? this.context : context;
			this.resolved && this.handler.join().fail(c);
		};

		Pending.prototype._report = function(context) {
			this.resolved && this.handler.join()._report(context);
		};

		Pending.prototype._unreport = function() {
			this.resolved && this.handler.join()._unreport();
		};

		/**
		 * Wrap another handler and force it into a future stack
		 * @param {object} handler
		 * @constructor
		 */
		function Async(handler) {
			this.handler = handler;
		}

		inherit(Handler, Async);

		Async.prototype.when = function(continuation) {
			tasks.enqueue(new ContinuationTask(continuation, this));
		};

		Async.prototype._report = function(context) {
			this.join()._report(context);
		};

		Async.prototype._unreport = function() {
			this.join()._unreport();
		};

		/**
		 * Handler that wraps an untrusted thenable and assimilates it in a future stack
		 * @param {function} then
		 * @param {{then: function}} thenable
		 * @constructor
		 */
		function Thenable(then, thenable) {
			Pending.call(this);
			tasks.enqueue(new AssimilateTask(then, thenable, this));
		}

		inherit(Pending, Thenable);

		/**
		 * Handler for a fulfilled promise
		 * @param {*} x fulfillment value
		 * @constructor
		 */
		function Fulfilled(x) {
			Promise.createContext(this);
			this.value = x;
		}

		inherit(Handler, Fulfilled);

		Fulfilled.prototype._state = 1;

		Fulfilled.prototype.fold = function(f, z, c, to) {
			runContinuation3(f, z, this, c, to);
		};

		Fulfilled.prototype.when = function(cont) {
			runContinuation1(cont.fulfilled, this, cont.receiver, cont.resolver);
		};

		var errorId = 0;

		/**
		 * Handler for a rejected promise
		 * @param {*} x rejection reason
		 * @constructor
		 */
		function Rejected(x) {
			Promise.createContext(this);

			this.id = ++errorId;
			this.value = x;
			this.handled = false;
			this.reported = false;

			this._report();
		}

		inherit(Handler, Rejected);

		Rejected.prototype._state = -1;

		Rejected.prototype.fold = function(f, z, c, to) {
			to.become(this);
		};

		Rejected.prototype.when = function(cont) {
			if(typeof cont.rejected === 'function') {
				this._unreport();
			}
			runContinuation1(cont.rejected, this, cont.receiver, cont.resolver);
		};

		Rejected.prototype._report = function(context) {
			tasks.afterQueue(new ReportTask(this, context));
		};

		Rejected.prototype._unreport = function() {
			if(this.handled) {
				return;
			}
			this.handled = true;
			tasks.afterQueue(new UnreportTask(this));
		};

		Rejected.prototype.fail = function(context) {
			Promise.onFatalRejection(this, context === void 0 ? this.context : context);
		};

		function ReportTask(rejection, context) {
			this.rejection = rejection;
			this.context = context;
		}

		ReportTask.prototype.run = function() {
			if(!this.rejection.handled) {
				this.rejection.reported = true;
				Promise.onPotentiallyUnhandledRejection(this.rejection, this.context);
			}
		};

		function UnreportTask(rejection) {
			this.rejection = rejection;
		}

		UnreportTask.prototype.run = function() {
			if(this.rejection.reported) {
				Promise.onPotentiallyUnhandledRejectionHandled(this.rejection);
			}
		};

		// Unhandled rejection hooks
		// By default, everything is a noop

		// TODO: Better names: "annotate"?
		Promise.createContext
			= Promise.enterContext
			= Promise.exitContext
			= Promise.onPotentiallyUnhandledRejection
			= Promise.onPotentiallyUnhandledRejectionHandled
			= Promise.onFatalRejection
			= noop;

		// Errors and singletons

		var foreverPendingHandler = new Handler();
		var foreverPendingPromise = new Promise(Handler, foreverPendingHandler);

		function cycle() {
			return new Rejected(new TypeError('Promise cycle'));
		}

		// Task runners

		/**
		 * Run a single consumer
		 * @constructor
		 */
		function ContinuationTask(continuation, handler) {
			this.continuation = continuation;
			this.handler = handler;
		}

		ContinuationTask.prototype.run = function() {
			this.handler.join().when(this.continuation);
		};

		/**
		 * Run a queue of progress handlers
		 * @constructor
		 */
		function ProgressTask(value, handler) {
			this.handler = handler;
			this.value = value;
		}

		ProgressTask.prototype.run = function() {
			var q = this.handler.consumers;
			if(q === void 0) {
				return;
			}

			for (var c, i = 0; i < q.length; ++i) {
				c = q[i];
				runNotify(c.progress, this.value, this.handler, c.receiver, c.resolver);
			}
		};

		/**
		 * Assimilate a thenable, sending it's value to resolver
		 * @param {function} then
		 * @param {object|function} thenable
		 * @param {object} resolver
		 * @constructor
		 */
		function AssimilateTask(then, thenable, resolver) {
			this._then = then;
			this.thenable = thenable;
			this.resolver = resolver;
		}

		AssimilateTask.prototype.run = function() {
			var h = this.resolver;
			tryAssimilate(this._then, this.thenable, _resolve, _reject, _notify);

			function _resolve(x) { h.resolve(x); }
			function _reject(x)  { h.reject(x); }
			function _notify(x)  { h.notify(x); }
		};

		function tryAssimilate(then, thenable, resolve, reject, notify) {
			try {
				then.call(thenable, resolve, reject, notify);
			} catch (e) {
				reject(e);
			}
		}

		/**
		 * Fold a handler value with z
		 * @constructor
		 */
		function Fold(f, z, c, to) {
			this.f = f; this.z = z; this.c = c; this.to = to;
			this.resolver = failIfRejected;
			this.receiver = this;
		}

		Fold.prototype.fulfilled = function(x) {
			this.f.call(this.c, this.z, x, this.to);
		};

		Fold.prototype.rejected = function(x) {
			this.to.reject(x);
		};

		Fold.prototype.progress = function(x) {
			this.to.notify(x);
		};

		// Other helpers

		/**
		 * @param {*} x
		 * @returns {boolean} true iff x is a trusted Promise
		 */
		function isPromise(x) {
			return x instanceof Promise;
		}

		/**
		 * Test just enough to rule out primitives, in order to take faster
		 * paths in some code
		 * @param {*} x
		 * @returns {boolean} false iff x is guaranteed *not* to be a thenable
		 */
		function maybeThenable(x) {
			return (typeof x === 'object' || typeof x === 'function') && x !== null;
		}

		function runContinuation1(f, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.become(h);
			}

			Promise.enterContext(h);
			tryCatchReject(f, h.value, receiver, next);
			Promise.exitContext();
		}

		function runContinuation3(f, x, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.become(h);
			}

			Promise.enterContext(h);
			tryCatchReject3(f, x, h.value, receiver, next);
			Promise.exitContext();
		}

		/**
		 * @deprecated
		 */
		function runNotify(f, x, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.notify(x);
			}

			Promise.enterContext(h);
			tryCatchReturn(f, x, receiver, next);
			Promise.exitContext();
		}

		function tryCatch2(f, a, b) {
			try {
				return f(a, b);
			} catch(e) {
				return reject(e);
			}
		}

		/**
		 * Return f.call(thisArg, x), or if it throws return a rejected promise for
		 * the thrown exception
		 */
		function tryCatchReject(f, x, thisArg, next) {
			try {
				next.become(getHandler(f.call(thisArg, x)));
			} catch(e) {
				next.become(new Rejected(e));
			}
		}

		/**
		 * Same as above, but includes the extra argument parameter.
		 */
		function tryCatchReject3(f, x, y, thisArg, next) {
			try {
				f.call(thisArg, x, y, next);
			} catch(e) {
				next.become(new Rejected(e));
			}
		}

		/**
		 * @deprecated
		 * Return f.call(thisArg, x), or if it throws, *return* the exception
		 */
		function tryCatchReturn(f, x, thisArg, next) {
			try {
				next.notify(f.call(thisArg, x));
			} catch(e) {
				next.notify(e);
			}
		}

		function inherit(Parent, Child) {
			Child.prototype = objectCreate(Parent.prototype);
			Child.prototype.constructor = Child;
		}

		function snd(x, y) {
			return y;
		}

		function noop() {}

		return Promise;
	};
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],32:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return {
		pending: toPendingState,
		fulfilled: toFulfilledState,
		rejected: toRejectedState,
		inspect: inspect
	};

	function toPendingState() {
		return { state: 'pending' };
	}

	function toRejectedState(e) {
		return { state: 'rejected', reason: e };
	}

	function toFulfilledState(x) {
		return { state: 'fulfilled', value: x };
	}

	function inspect(handler) {
		var state = handler.state();
		return state === 0 ? toPendingState()
			 : state > 0   ? toFulfilledState(handler.value)
			               : toRejectedState(handler.value);
	}

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],33:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */

/**
 * Promises/A+ and when() implementation
 * when is part of the cujoJS family of libraries (http://cujojs.com/)
 * @author Brian Cavalier
 * @author John Hann
 * @version 3.6.3
 */
(function(define) { 'use strict';
define(function (require) {

	var timed = require('./lib/decorators/timed');
	var array = require('./lib/decorators/array');
	var flow = require('./lib/decorators/flow');
	var fold = require('./lib/decorators/fold');
	var inspect = require('./lib/decorators/inspect');
	var generate = require('./lib/decorators/iterate');
	var progress = require('./lib/decorators/progress');
	var withThis = require('./lib/decorators/with');
	var unhandledRejection = require('./lib/decorators/unhandledRejection');
	var TimeoutError = require('./lib/TimeoutError');

	var Promise = [array, flow, fold, generate, progress,
		inspect, withThis, timed, unhandledRejection]
		.reduce(function(Promise, feature) {
			return feature(Promise);
		}, require('./lib/Promise'));

	var apply = require('./lib/apply')(Promise);

	// Public API

	when.promise     = promise;              // Create a pending promise
	when.resolve     = Promise.resolve;      // Create a resolved promise
	when.reject      = Promise.reject;       // Create a rejected promise

	when.lift        = lift;                 // lift a function to return promises
	when['try']      = attempt;              // call a function and return a promise
	when.attempt     = attempt;              // alias for when.try

	when.iterate     = Promise.iterate;      // DEPRECATED (use cujojs/most streams) Generate a stream of promises
	when.unfold      = Promise.unfold;       // DEPRECATED (use cujojs/most streams) Generate a stream of promises

	when.join        = join;                 // Join 2 or more promises

	when.all         = all;                  // Resolve a list of promises
	when.settle      = settle;               // Settle a list of promises

	when.any         = lift(Promise.any);    // One-winner race
	when.some        = lift(Promise.some);   // Multi-winner race
	when.race        = lift(Promise.race);   // First-to-settle race

	when.map         = map;                  // Array.map() for promises
	when.filter      = filter;               // Array.filter() for promises
	when.reduce      = lift(Promise.reduce);       // Array.reduce() for promises
	when.reduceRight = lift(Promise.reduceRight);  // Array.reduceRight() for promises

	when.isPromiseLike = isPromiseLike;      // Is something promise-like, aka thenable

	when.Promise     = Promise;              // Promise constructor
	when.defer       = defer;                // Create a {promise, resolve, reject} tuple

	// Error types

	when.TimeoutError = TimeoutError;

	/**
	 * Get a trusted promise for x, or by transforming x with onFulfilled
	 *
	 * @param {*} x
	 * @param {function?} onFulfilled callback to be called when x is
	 *   successfully fulfilled.  If promiseOrValue is an immediate value, callback
	 *   will be invoked immediately.
	 * @param {function?} onRejected callback to be called when x is
	 *   rejected.
	 * @param {function?} onProgress callback to be called when progress updates
	 *   are issued for x. @deprecated
	 * @returns {Promise} a new promise that will fulfill with the return
	 *   value of callback or errback or the completion value of promiseOrValue if
	 *   callback and/or errback is not supplied.
	 */
	function when(x, onFulfilled, onRejected, onProgress) {
		var p = Promise.resolve(x);
		if (arguments.length < 2) {
			return p;
		}

		return p.then(onFulfilled, onRejected, onProgress);
	}

	/**
	 * Creates a new promise whose fate is determined by resolver.
	 * @param {function} resolver function(resolve, reject, notify)
	 * @returns {Promise} promise whose fate is determine by resolver
	 */
	function promise(resolver) {
		return new Promise(resolver);
	}

	/**
	 * Lift the supplied function, creating a version of f that returns
	 * promises, and accepts promises as arguments.
	 * @param {function} f
	 * @returns {Function} version of f that returns promises
	 */
	function lift(f) {
		return function() {
			for(var i=0, l=arguments.length, a=new Array(l); i<l; ++i) {
				a[i] = arguments[i];
			}
			return apply(f, this, a);
		};
	}

	/**
	 * Call f in a future turn, with the supplied args, and return a promise
	 * for the result.
	 * @param {function} f
	 * @returns {Promise}
	 */
	function attempt(f /*, args... */) {
		/*jshint validthis:true */
		for(var i=0, l=arguments.length-1, a=new Array(l); i<l; ++i) {
			a[i] = arguments[i+1];
		}
		return apply(f, this, a);
	}

	/**
	 * Creates a {promise, resolver} pair, either or both of which
	 * may be given out safely to consumers.
	 * @return {{promise: Promise, resolve: function, reject: function, notify: function}}
	 */
	function defer() {
		return new Deferred();
	}

	function Deferred() {
		var p = Promise._defer();

		function resolve(x) { p._handler.resolve(x); }
		function reject(x) { p._handler.reject(x); }
		function notify(x) { p._handler.notify(x); }

		this.promise = p;
		this.resolve = resolve;
		this.reject = reject;
		this.notify = notify;
		this.resolver = { resolve: resolve, reject: reject, notify: notify };
	}

	/**
	 * Determines if x is promise-like, i.e. a thenable object
	 * NOTE: Will return true for *any thenable object*, and isn't truly
	 * safe, since it may attempt to access the `then` property of x (i.e.
	 *  clever/malicious getters may do weird things)
	 * @param {*} x anything
	 * @returns {boolean} true if x is promise-like
	 */
	function isPromiseLike(x) {
		return x && typeof x.then === 'function';
	}

	/**
	 * Return a promise that will resolve only once all the supplied arguments
	 * have resolved. The resolution value of the returned promise will be an array
	 * containing the resolution values of each of the arguments.
	 * @param {...*} arguments may be a mix of promises and values
	 * @returns {Promise}
	 */
	function join(/* ...promises */) {
		return Promise.all(arguments);
	}

	/**
	 * Return a promise that will fulfill once all input promises have
	 * fulfilled, or reject when any one input promise rejects.
	 * @param {array|Promise} promises array (or promise for an array) of promises
	 * @returns {Promise}
	 */
	function all(promises) {
		return when(promises, Promise.all);
	}

	/**
	 * Return a promise that will always fulfill with an array containing
	 * the outcome states of all input promises.  The returned promise
	 * will only reject if `promises` itself is a rejected promise.
	 * @param {array|Promise} promises array (or promise for an array) of promises
	 * @returns {Promise} promise for array of settled state descriptors
	 */
	function settle(promises) {
		return when(promises, Promise.settle);
	}

	/**
	 * Promise-aware array map function, similar to `Array.prototype.map()`,
	 * but input array may contain promises or values.
	 * @param {Array|Promise} promises array of anything, may contain promises and values
	 * @param {function(x:*, index:Number):*} mapFunc map function which may
	 *  return a promise or value
	 * @returns {Promise} promise that will fulfill with an array of mapped values
	 *  or reject if any input promise rejects.
	 */
	function map(promises, mapFunc) {
		return when(promises, function(promises) {
			return Promise.map(promises, mapFunc);
		});
	}

	/**
	 * Filter the provided array of promises using the provided predicate.  Input may
	 * contain promises and values
	 * @param {Array|Promise} promises array of promises and values
	 * @param {function(x:*, index:Number):boolean} predicate filtering predicate.
	 *  Must return truthy (or promise for truthy) for items to retain.
	 * @returns {Promise} promise that will fulfill with an array containing all items
	 *  for which predicate returned truthy.
	 */
	function filter(promises, predicate) {
		return when(promises, function(promises) {
			return Promise.filter(promises, predicate);
		});
	}

	return when;
});
})(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); });

},{"./lib/Promise":17,"./lib/TimeoutError":19,"./lib/apply":20,"./lib/decorators/array":21,"./lib/decorators/flow":22,"./lib/decorators/fold":23,"./lib/decorators/inspect":24,"./lib/decorators/iterate":25,"./lib/decorators/progress":26,"./lib/decorators/timed":27,"./lib/decorators/unhandledRejection":28,"./lib/decorators/with":29}],34:[function(require,module,exports){
(function (Buffer){
"use strict";

var querystring = require('querystring');
var util = require('util');

var when = require('when');

var utils = require('./utils');
var request = require('./request');

var oauth = {};

function normalizeScope(scope) {
  // Set options.scope if not set, or convert an array into a string
  if (typeof scope === 'undefined') {
    scope = 'identity';
  } else if (util.isArray(scope)) {
    scope = scope.join(',');
  }
  return scope;
}

// keep backwards compatability
oauth.getAuthUrl = 
oauth.getExplicitAuthUrl = function(options) {
  var query = {};

  query.client_id = options.consumerKey;
  query.state = options.state;
  query.redirect_uri = options.redirectUri;
  query.duration = options.duration || 'temporary';
  query.response_type = 'code';
  query.scope = normalizeScope(options.scope);

  var baseUrl = 'https://www.reddit.com/api/v1/authorize';

  if (options.mobile) {
    baseUrl += '.compact';
  }

  return baseUrl + '?' + querystring.stringify(query);
};

oauth.getImplicitAuthUrl = function(options) {
  var query = {};

  query.client_id = options.consumerKey;
  query.state = options.state;
  query.redirect_uri = options.redirectUri;
  query.response_type = 'token';
  query.scope = normalizeScope(options.scope);

  var baseUrl = 'https://www.reddit.com/api/v1/authorize';

  if (options.mobile) {
    baseUrl += '.compact';
  }

  return baseUrl + '?' + querystring.stringify(query);
};

/*
   `type` can be one of 'script', 'explicit', or 'refresh'
   depending on the type of token (and accompanying auth data) is
   needed.
 */
oauth.getAuthData = function(type, options) {

  var params = {};

  params.scope = normalizeScope(options.scope);

  switch (type) {
    case 'script':
      params.grant_type = 'password';
      params.username = options.username;
      params.password = options.password;
      break;
    case 'web': // web & installed for backwards compatability
    case 'insalled':
    case 'explicit':
      params.grant_type = 'authorization_code';
      params.client_id = options.consumerKey;
      params.redirect_uri = options.redirectUri;
      params.code = options.authorizationCode;
      break;
    case 'refresh':
      params.grant_type = 'refresh_token';
      params.refresh_token = options.refreshToken;
      break;
    default:
      return when.reject(new Error('invalid type specified'));
  }

  var buff = new Buffer(options.consumerKey + ':' + options.consumerSecret);
  var auth = 'Basic ' + (buff).toString('base64');

  return request.https({
    method: 'POST',
    hostname: 'ssl.reddit.com',
    path: '/api/v1/access_token',
    headers: {
      'Authorization': auth
    }
  }, querystring.stringify(params)).then(function(response) {
    var data;

    try {
      data = JSON.parse(response._body);
    } catch(e) {
      throw new Error('Failed to get Auth Data:\n' + response._body + '\n' + e.stack);
    }

    if (data.error) {
      throw new Error('Reddit Error:\n' + data.error);
    }

    return data;
  });

};

oauth.revokeToken = function(token, isRefreshToken, options) {

  var tokenTypeHint = isRefreshToken ? 'refresh_token' : 'access_token';
  var params = { token: token, token_type_hint: tokenTypeHint };

  var auth = 'Basic ' + (new Buffer(
    options.consumerKey + ':' + options.consumerSecret)).toString('base64');

  return request.https({
    method: 'POST',
    hostname: 'ssl.reddit.com',
    path: '/api/v1/revoke_token',
    headers: {
      'Authorization': auth
    }
  }, querystring.stringify(params)).then(function(response) {
    if (response._status !== 204) {
      throw new Error('Unable to revoke the given token');
    }
  });
};

module.exports = oauth;

}).call(this,require("buffer").Buffer)
},{"./request":36,"./utils":38,"buffer":3,"querystring":12,"util":15,"when":33}],35:[function(require,module,exports){
"use strict";

// Override SuperAgents parser with one of our own that
// does not complain about content-type: application/json
// that are empty (204 response from reddit)
module.exports = function redditParser(response, done) {
    response.text = '';
    response.setEncoding('utf8');
    response.on('data', function(chunk) { response.text += chunk; });
    response.on('end', function() {
	// Return null if the response was empty (to match browser parser)
	// or if the status code is 204
	if (response.text === '' || response.statusCode === 204) {
	    done(null, null);
	    return;
	}

	try { done(null, JSON.parse(response.text)); }
	catch (error) { done(error, null); }
    });
};

},{}],36:[function(require,module,exports){
var utils = require('../utils');

module.exports = utils.isNode() ? require('./requestNode') : require('./requestBrowser');

},{"../utils":38,"./requestBrowser":37,"./requestNode":undefined}],37:[function(require,module,exports){
//
// Browser requests, mirrors the syntax of the node requests
//

var when = require('when');

exports.https = function(options, formData) {

  options = options || {};
  options.headers = options.headers || {};

  return when.promise(function(resolve, reject) {

    try {
      // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
      var x = new XMLHttpRequest();

      var url = 'https://' + options.hostname + options.path;

      // append the form data to the end of the url
      if (options.method === 'GET') {
	url += '?' + formData;
      }

      x.open(options.method, url, true);

      x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      Object.keys(options.headers).forEach(function(headerKey) {
	x.setRequestHeader(headerKey, options.headers[headerKey]);
      });

      x.onreadystatechange = function() {
	if (x.readyState > 3) {
	  // Normalize the result to match how requestNode.js works
	  return resolve({
	    _body: x.responseText,
	    _status: x.status
	  });
	}
      };

      x.send(options.method === 'GET' ? null : formData);

    } catch (e) {
      return reject(e);
    }

  });

};

},{"when":33}],38:[function(require,module,exports){
"use strict";

// checks basic globals to help determine which environment we are in
exports.isNode = function() {
    return typeof require === "function" &&
        typeof exports === "object" &&
        typeof module === "object" &&
        typeof window === "undefined";
};

},{}]},{},[1])(1)
});