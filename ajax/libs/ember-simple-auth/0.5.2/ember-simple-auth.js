(function(global) {

var define, requireModule;

(function() {
  var registry = {}, seen = {};

  define = function(name, deps, callback) {
    registry[name] = { deps: deps, callback: callback };
  };

  requireModule = function(name) {
    if (seen.hasOwnProperty(name)) { return seen[name]; }
    seen[name] = {};

    if (!registry[name]) {
      throw new Error("Could not find module " + name);
    }

    var mod = registry[name],
        deps = mod.deps,
        callback = mod.callback,
        reified = [],
        exports;

    for (var i=0, l=deps.length; i<l; i++) {
      if (deps[i] === 'exports') {
        reified.push(exports = {});
      } else {
        reified.push(requireModule(resolve(deps[i])));
      }
    }

    var value = callback.apply(this, reified);
    return seen[name] = exports || value;

    function resolve(child) {
      if (child.charAt(0) !== '.') { return child; }
      var parts = child.split("/");
      var parentBase = name.split("/").slice(0, -1);

      for (var i=0, l=parts.length; i<l; i++) {
        var part = parts[i];

        if (part === '..') { parentBase.pop(); }
        else if (part === '.') { continue; }
        else { parentBase.push(part); }
      }

      return parentBase.join("/");
    }
  };

  requireModule.registry = registry;
})();

define("ember-simple-auth", 
  ["./ember-simple-auth/core","./ember-simple-auth/session","./ember-simple-auth/authenticators","./ember-simple-auth/authorizers","./ember-simple-auth/stores","./ember-simple-auth/utils","./ember-simple-auth/mixins/application_route_mixin","./ember-simple-auth/mixins/authenticated_route_mixin","./ember-simple-auth/mixins/authentication_controller_mixin","./ember-simple-auth/mixins/login_controller_mixin","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__, __dependency10__, __exports__) {
    "use strict";
    var setup = __dependency1__.setup;
    var initializeExtension = __dependency1__.initializeExtension;
    var Configuration = __dependency1__.Configuration;
    var Session = __dependency2__.Session;
    var Authenticators = __dependency3__.Authenticators;
    var Authorizers = __dependency4__.Authorizers;
    var Stores = __dependency5__.Stores;
    var Utils = __dependency6__.Utils;
    var ApplicationRouteMixin = __dependency7__.ApplicationRouteMixin;
    var AuthenticatedRouteMixin = __dependency8__.AuthenticatedRouteMixin;
    var AuthenticationControllerMixin = __dependency9__.AuthenticationControllerMixin;
    var LoginControllerMixin = __dependency10__.LoginControllerMixin;

    /**
      Ember.SimpleAuth's main module.

      @module Ember.SimpleAuth
    */

    __exports__.setup = setup;
    __exports__.initializeExtension = initializeExtension;
    __exports__.Configuration = Configuration;
    __exports__.Session = Session;
    __exports__.Authenticators = Authenticators;
    __exports__.Authorizers = Authorizers;
    __exports__.Stores = Stores;
    __exports__.Utils = Utils;
    __exports__.ApplicationRouteMixin = ApplicationRouteMixin;
    __exports__.AuthenticatedRouteMixin = AuthenticatedRouteMixin;
    __exports__.AuthenticationControllerMixin = AuthenticationControllerMixin;
    __exports__.LoginControllerMixin = LoginControllerMixin;
  });
define("ember-simple-auth/authenticators", 
  ["./authenticators/base","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Base = __dependency1__.Base;

    var Authenticators = {
      Base: Base
    };

    __exports__.Authenticators = Authenticators;
  });
define("ember-simple-auth/authenticators/base", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var global = (typeof window !== 'undefined') ? window : {},
        Ember = global.Ember;

    /**
      The base for all authenticators. __This serves as a starting point for
      implementing custom authenticators and must not be used directly.__

      The authenticator authenticates the session. The actual mechanism used to do
      this might e.g. be posting a set of credentials to a server and in exchange
      retrieving an access token, initiating authentication against an external
      provider like Facebook etc. and depends on the specific authenticator. Any
      data that the authenticator receives upon successful authentication and
      resolves with from the
      [Ember.SimpleAuth.Authenticators.Base#authenticate](#Ember-SimpleAuth-Authenticators-Base-authenticate)
      method is stored in the session and can then be used by the authorizer (see
      [Ember.SimpleAuth.Authorizers.Base](#Ember-SimpleAuth-Authorizers-Base)).

      The authenticator also decides whether a set of data that was restored from
      the session store (see
      [Ember.SimpleAuth.Stores.Base](#Ember-SimpleAuth-Stores-Base)) is sufficient
      for the session to be authenticated or not.

      __Custom authenticators have to be registered with Ember's dependency
      injection container__ so that the session can retrieve an instance, e.g.:

      ```javascript
      var CustomAuthenticator = Ember.SimpleAuth.Authenticators.Base.extend({
        ...
      });
      Ember.Application.initializer({
        name: 'authentication',
        initialize: function(container, application) {
          container.register('authenticator:custom', CustomAuthenticator);
          Ember.SimpleAuth.setup(container, application);
        }
      });
      App.AuthenticationController  = Ember.Controller.extend(Ember.SimpleAuth.AuthenticationControllerMixin, {
        authenticatorFactory: 'authenticator:custom'
      });
      ```

      @class Base
      @namespace Authenticators
      @extends Ember.Object
      @uses Ember.Evented
    */
    var Base = Ember.Object.extend(Ember.Evented, {
      /**
        __Triggered when the data that constitutes the session is updated by the
        authenticator__. This might happen e.g. because the authenticator refreshes
        it or an event from is triggered from an external authentication provider.
        The session automatically catches that event, passes the updated data back
        to the authenticator's
        [Ember.SimpleAuth.Authenticators.Base#restore](#Ember-SimpleAuth-Authenticators-Base-restore)
        method and handles the result of that invocation accordingly.

        @event sessionDataUpdated
        @param {Object} data The updated session data
      */
      /**
        __Triggered when the data that constitutes the session is invalidated by
        the authenticator__. This might happen e.g. because the date expires or an
        event is triggered from an external authentication provider. The session
        automatically catches that event and invalidates itself.

        @event sessionDataInvalidated
        @param {Object} data The updated session data
      */

      /**
        Restores the session from a set of properties. __This method is invoked by
        the session either after the application starts up and session data was
        restored from the store__ or when properties in the store have changed due
        to external events (e.g. in another tab) and the new set of properties
        needs to be re-checked for whether it still constitutes an authenticated
        session.

        __This method returns a promise. A resolving promise will result in the
        session being authenticated.__ Any properties the promise resolves with
        will be saved in and accessible via the session. In most cases the `data`
        argument will simply be forwarded through the promise. A rejecting promise
        indicates that authentication failed and the session will remain unchanged.

        `Ember.SimpleAuth.Authenticators.Base`'s implementation always returns a
        rejecting promise.

        @method restore
        @param {Object} data The data to restore the session from
        @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being authenticated
      */
      restore: function(data) {
        return new Ember.RSVP.reject();
      },

      /**
        Authenticates the session with the specified `options`. These options vary
        depending on the actual authentication mechanism the authenticator
        implements (e.g. a set of credentials or a Facebook account id etc.). __The
        session will invoke this method when an action in the appliaction triggers
        authentication__ (see
        [Ember.SimpleAuth.AuthenticationControllerMixin.actions#authenticate](#Ember-SimpleAuth-AuthenticationControllerMixin-authenticate)).

        __This method returns a promise. A resolving promise will result in the
        session being authenticated.__ Any properties the promise resolves with
        will be saved in and accessible via the session. A rejecting promise
        indicates that authentication failed and the session will remain unchanged.

        `Ember.SimpleAuth.Authenticators.Base`'s implementation always returns a
        rejecting promise and thus never authenticates the session.

        @method authenticate
        @param {Object} options The options to authenticate the session with
        @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being authenticated
      */
      authenticate: function(options) {
        return new Ember.RSVP.reject();
      },

      /**
        This callback is invoked when the session is invalidated. While the session
        will invalidate itself and clear all session properties, it might be
        necessary for some authenticators to perform additional tasks (e.g.
        invalidating an access token on the server), which should be done in this
        method.

        __This method returns a promise. A resolving promise will result in the
        session being invalidated.__ A rejecting promise will result in the session
        invalidation being intercepted and the session being left authenticated.

        `Ember.SimpleAuth.Authenticators.Base`'s implementation always returns a
        resolving promise and thus never intercepts session invalidation.

        @method invalidate
        @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being invalidated
      */
      invalidate: function() {
        return new Ember.RSVP.resolve();
      }
    });

    __exports__.Base = Base;
  });
define("ember-simple-auth/authorizers", 
  ["./authorizers/base","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Base = __dependency1__.Base;

    var Authorizers = {
      Base: Base
    };

    __exports__.Authorizers = Authorizers;
  });
define("ember-simple-auth/authorizers/base", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var global = (typeof window !== 'undefined') ? window : {},
        Ember = global.Ember;

    /**
      The base for all authorizers. __This serves as a starting point for
      implementing custom authorizers and must not be used directly.__

      __The authorizer preprocesses all XHR requests__ (except ones to 3rd party
      origins, see [Ember.SimpleAuth.setup](#Ember-SimpleAuth-setup)) and makes
      sure they have the required data attached that allows the server to identify
      the user making the request. This data might be a specific header, data in
      the query part of the URL, cookies etc. __The authorizer has to fit the
      authenticator__ (see
      [Ember.SimpleAuth.Authenticators.Base](#Ember-SimpleAuth-Authenticators-Base))
      as it relies on data that the authenticator retrieved during authentication
      and that it makes available through the session.

      @class Base
      @namespace Authorizers
      @extends Ember.Object
    */
    var Base = Ember.Object.extend({
      /**
        The session the authorizer gets the data it needs to authorize requests
        from (see [Ember.SimpleAuth.Session](#Ember-SimpleAuth-Session)).

        @property session
        @readOnly
        @type Ember.SimpleAuth.Session
        @default the session instance that is created during Ember.SimpleAuth' setup (see [Ember.SimpleAuth.setup](#Ember-SimpleAuth-setup))
      */
      session: null,

      /**
        Authorizes an XHR request by adding some sort of secret information that
        allows the server to identify the user making the request (e.g. a token in
        the `Authorization` header or some other secret in the query string etc.).

        `Ember.SimpleAuth.Authorizers.Base`'s implementation does nothing.

        @method authorize
        @param {jqXHR} jqXHR The XHR request to authorize (see http://api.jquery.com/jQuery.ajax/#jqXHR)
        @param {Object} requestOptions The options as provided to the `$.ajax` method (see http://api.jquery.com/jQuery.ajaxPrefilter/)
      */
      authorize: function(jqXHR, requestOptions) {
      }
    });

    __exports__.Base = Base;
  });
define("ember-simple-auth/core", 
  ["./session","./stores","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Session = __dependency1__.Session;
    var registerStores = __dependency2__.registerStores;

    function extractLocationOrigin(location) {
      if (Ember.typeOf(location) === 'string') {
        var link = document.createElement('a');
        link.href = location;
        //IE requires the following line when url is relative.
        //First assignment of relative url to link.href results in absolute url on link.href but link.hostname and other properties are not set
        //Second assignment of absolute url to link.href results in link.hostname and other properties being set as expected
        link.href = link.href;
        location = link;
      }
      var port = location.port;
      if (Ember.isEmpty(port)) {
        //need to include the port whether its actually present or not as some versions of IE will always set it
        port = location.protocol === 'http:' ? '80' : (location.protocol === 'https:' ? '443' : '');
      }
      return location.protocol + '//' + location.hostname + (port !== '' ? ':' + port : '');
    }

    var urlOrigins     = {};
    var documentOrigin = extractLocationOrigin(window.location);
    var crossOriginWhitelist;
    function shouldAuthorizeRequest(url) {
      var urlOrigin = urlOrigins[url] = urlOrigins[url] || extractLocationOrigin(url);
      return crossOriginWhitelist.indexOf(urlOrigin) > -1 || urlOrigin === documentOrigin;
    }

    var extensionInitializers = [];

    /**
      Ember.SimpleAuth's configuration object.

      @class Configuration
      @namespace $mainModule
    */
    var Configuration = {
      /**
        The route to transition to for authentication; should be set through
        [Ember.SimpleAuth.setup](#Ember-SimpleAuth-setup).

        @property authenticationRoute
        @readOnly
        @static
        @type String
        @default 'login'
      */
      authenticationRoute: 'login',

      /**
        The route to transition to after successful authentication; should be set
        through [Ember.SimpleAuth.setup](#Ember-SimpleAuth-setup).

        @property routeAfterAuthentication
        @readOnly
        @static
        @type String
        @default 'index'
      */
      routeAfterAuthentication: 'index',

      /**
        The name of the property that the session is injected with into routes and
        controllers; should be set through
        [Ember.SimpleAuth.setup](#Ember-SimpleAuth-setup).

        @property sessionPropertyName
        @readOnly
        @static
        @type String
        @default 'session'
      */
      sessionPropertyName: 'session',

      /**
        @property applicationRootUrl
        @static
        @private
        @type String
      */
      applicationRootUrl: null
    };

    /**
      Sets up Ember.SimpleAuth for the application; this method __should be invoked
      in a custom initializer__ like this:

      ```javascript
      Ember.Application.initializer({
        name: 'authentication',
        initialize: function(container, application) {
          Ember.SimpleAuth.setup(container, application);
        }
      });
      ```

      @method setup
      @namespace $mainModule
      @static
      @param {Container} container The Ember.js application's dependency injection container
      @param {Ember.Application} application The Ember.js application instance
      @param {Object} options
        @param {String} [options.authorizerFactory] The authorizer factory to use as it is registered with Ember's container, see [Ember's API docs](http://emberjs.com/api/classes/Ember.Application.html#method_register); when the application does not interact with a server that requires authorized requests, no auzthorizer is needed
        @param {Object} [options.storeFactory] The store factory to use as it is registered with Ember's container, see [Ember's API docs](http://emberjs.com/api/classes/Ember.Application.html#method_register) - defaults to `session-stores:local-storage`
        @param {Object} [options.sessionPropertyName] The name for the property that the session is injected with into routes and controllers - defaults to `session`
        @param {String} [options.authenticationRoute] route to transition to for authentication - defaults to `'login'`
        @param {String} [options.routeAfterAuthentication] route to transition to after successful authentication - defaults to `'index'`
        @param {Array[String]} [options.crossOriginWhitelist] Ember.SimpleAuth will never authorize requests going to a different origin than the one the Ember.js application was loaded from; to explicitely enable authorization for additional origins, whitelist those origins - defaults to `[]` _(beware that origins consist of protocol, host and port (port can be left out when it is 80 for HTTP or 443 for HTTPS))_
    **/
    var setup = function(container, application, options) {
      application.deferReadiness();
      registerStores(container);
      extensionInitializers.forEach(function(initializer) {
        initializer(container, application, options);
      });

      options                                = options || {};
      Configuration.routeAfterAuthentication = options.routeAfterAuthentication || Configuration.routeAfterAuthentication;
      Configuration.authenticationRoute      = options.authenticationRoute || Configuration.authenticationRoute;
      Configuration.sessionPropertyName      = options.sessionPropertyName || Configuration.sessionPropertyName;
      Configuration.applicationRootUrl       = container.lookup('router:main').get('rootURL') || '/';
      crossOriginWhitelist                   = Ember.A(options.crossOriginWhitelist || []).map(function(origin) {
        return extractLocationOrigin(origin);
      });

      options.storeFactory = options.storeFactory || 'ember-simple-auth-session-store:local-storage';
      var store            = container.lookup(options.storeFactory);
      var session          = Session.create({ store: store, container: container });

      container.register('ember-simple-auth-session:main', session, { instantiate: false });
      Ember.A(['controller', 'route']).forEach(function(component) {
        container.injection(component, Configuration.sessionPropertyName, 'ember-simple-auth-session:main');
      });

      if (!Ember.isEmpty(options.authorizerFactory)) {
        var authorizer = container.lookup(options.authorizerFactory);
        if (!!authorizer) {
          authorizer.set('session', session);
          Ember.$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
            if (shouldAuthorizeRequest(options.url)) {
              authorizer.authorize(jqXHR, options);
            }
          });
          Ember.$(document).ajaxError(function(event, jqXHR, setting, exception) {
            if (jqXHR.status === 401) {
              session.trigger('authorizationFailed');
            }
          });
        }
      } else {
        Ember.Logger.debug('No authorizer factory was specified for Ember.SimpleAuth - specify one if backend requests need to be authorized.');
      }

      var advanceReadiness = function() {
        application.advanceReadiness();
      };
      session.restore().then(advanceReadiness, advanceReadiness);
    };

    /**
      Registers an extension initializer to be invoked when
      [Ember.SimpleAuth.setup](#Ember-SimpleAuth-setup) is invoked. __This is used
      by extensions__ to the base Ember.SimpleAuth library that can e.g. register
      factories with the Ember.js dependency injection container here etc.

      @method initializeExtension
      @namespace $mainModule
      @static
      @param {Function} initializer The initializer to be invoked when [Ember.SimpleAuth.setup](#Ember-SimpleAuth-setup) is invoked; this will receive the same arguments as [Ember.SimpleAuth.setup](#Ember-SimpleAuth-setup).
    */
    var initializeExtension = function(initializer) {
      extensionInitializers.push(initializer);
    };

    __exports__.setup = setup;
    __exports__.initializeExtension = initializeExtension;
    __exports__.Configuration = Configuration;
  });
define("ember-simple-auth/mixins/application_route_mixin", 
  ["./../core","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var global = (typeof window !== 'undefined') ? window : {},
        Ember  = global.Ember;

    var Configuration = __dependency1__.Configuration;

    /**
      The mixin for the application route. This defines actions to authenticate the
      session as well as to invalidate it. These actions can be used in all
      templates like this:

      ```handlebars
      {{#if session.isAuthenticated}}
        <a {{ action 'invalidateSession' }}>Logout</a>
      {{else}}
        <a {{ action 'authenticateSession' }}>Login</a>
      {{/if}}
      ```

      While this code works it is __preferrable to use the regular `link-to` helper
      for the _'login'_ link__ as that will add the `'active'` class to the link.
      For the _'logout'_ actions of course there is no route.

      ```handlebars
      {{#if session.isAuthenticated}}
        <a {{ action 'invalidateSession' }}>Logout</a>
      {{else}}
        {{#link-to 'login'}}Login{{/link-to}}
      {{/if}}
      ```

      This mixin also defines actions that are triggered whenever the session is
      successfully authenticated or invalidated and whenever authentication or
      invalidation fails. These actions provide a good starting point for adding
      custom behavior to these events.

      __When this mixin is used and the application's `ApplicationRoute` defines
      the `activate` method, that method has to call `_super`.__

      @class ApplicationRouteMixin
      @namespace $mainModule
      @extends Ember.Mixin
      @static
    */
    var ApplicationRouteMixin = Ember.Mixin.create({
      /**
        @method activate
        @private
      */
      activate: function() {
        var _this = this;
        Ember.A([
          'sessionAuthenticationSucceeded',
          'sessionAuthenticationFailed',
          'sessionInvalidationSucceeded',
          'sessionInvalidationFailed',
          'authorizationFailed'
        ]).forEach(function(event) {
          _this.get(Configuration.sessionPropertyName).on(event, function(error) {
            Array.prototype.unshift.call(arguments, event);
            _this.send.apply(_this, arguments);
          });
        });
      },

      actions: {
        /**
          This action triggers transition to the `authenticationRoute` specified in
          [Ember.SimpleAuth.setup](#Ember-SimpleAuth-setup). It can be used in
          templates as shown above. It is also triggered automatically by
          [Ember.SimpleAuth.AuthenticatedRouteMixin](#Ember-SimpleAuth-AuthenticatedRouteMixin)
          whenever a route that requries authentication is accessed but the session
          is not currently authenticated.

          __For an application that works without an authentication route (e.g.
          because it opens a new window to handle authentication there), this is
          the method to override, e.g.:__

          ```javascript
          App.ApplicationRoute = Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
            actions: {
              authenticateSession: function() {
                this.get('session').authenticate('authenticator:custom', {});
              }
            }
          });
          ```

          @method actions.authenticateSession
        */
        authenticateSession: function() {
          this.transitionTo(Configuration.authenticationRoute);
        },

        /**
          This action is triggered whenever the session is successfully
          authenticated. If there is a transition that was previously intercepted
          by
          [AuthenticatedRouteMixin#beforeModel](#Ember-SimpleAuth-AuthenticatedRouteMixin-beforeModel)
          it will retry that. If there is no such transition, this action
          transitions to the `routeAfterAuthentication` specified in
          [Ember.SimpleAuth.setup](#Ember-SimpleAuth-setup).

          @method actions.sessionAuthenticationSucceeded
        */
        sessionAuthenticationSucceeded: function() {
          var attemptedTransition = this.get(Configuration.sessionPropertyName).get('attemptedTransition');
          if (attemptedTransition) {
            attemptedTransition.retry();
            this.get(Configuration.sessionPropertyName).set('attemptedTransition', null);
          } else {
            this.transitionTo(Configuration.routeAfterAuthentication);
          }
        },

        /**
          This action is triggered whenever session authentication fails. The
          `error` argument is the error object that the promise the authenticator
          returns rejects with. (see
          [Ember.SimpleAuth.Authenticators.Base#authenticate](#Ember-SimpleAuth-Authenticators-Base-authenticate)).

          It can be overridden to display error messages etc.:

          ```javascript
          App.ApplicationRoute = Ember.Route.extend(Ember.SimpleAuth.ApplicationRouteMixin, {
            actions: {
              sessionAuthenticationFailed: function(error) {
                this.controllerFor('application').set('loginErrorMessage', error.message);
              }
            }
          });
          ```

          @method actions.sessionAuthenticationFailed
          @param {any} error The error the promise returned by the authenticator rejects with, see [Ember.SimpleAuth.Authenticators.Base#authenticate](#Ember-SimpleAuth-Authenticators-Base-authenticate)
        */
        sessionAuthenticationFailed: function(error) {
        },

        /**
          This action invalidates the session (see
          [Ember.SimpleAuth.Session#invalidate](#Ember-SimpleAuth-Session-invalidate)).
          If invalidation succeeds, it reloads the application (see
          [Ember.SimpleAuth.ApplicationRouteMixin#sessionInvalidationSucceeded](#Ember-SimpleAuth-ApplicationRouteMixin-sessionInvalidationSucceeded)).

          @method actions.invalidateSession
        */
        invalidateSession: function() {
          this.get(Configuration.sessionPropertyName).invalidate();
        },

        /**
          This action is invoked whenever the session is successfully invalidated.
          It reloads the Ember.js application by redirecting the browser to the
          application's root URL so that all in-memory data (such as Ember Data
          stores etc.) gets cleared. The root URL is automatically retrieved from
          the Ember.js application's router (see
          http://emberjs.com/guides/routing/#toc_specifying-a-root-url).

          @method actions.sessionInvalidationSucceeded
        */
        sessionInvalidationSucceeded: function() {
          window.location.replace(Configuration.applicationRootUrl);
        },

        /**
          This action is invoked whenever session invalidation fails. This mainly
          serves as an extension point to add custom behavior and does nothing by
          default.

          @method actions.sessionInvalidationFailed
          @param {any} error The error the promise returned by the authenticator rejects with, see [Ember.SimpleAuth.Authenticators.Base#invalidate](#Ember-SimpleAuth-Authenticators-Base-invalidate)
        */
        sessionInvalidationFailed: function(error) {
        },

        /**
          This action is invoked when an authorization error occurs (which is
          the case __when the server responds with HTTP status 401__). It
          invalidates the session and reloads the application (see
          [Ember.SimpleAuth.ApplicationRouteMixin#sessionInvalidationSucceeded](#Ember-SimpleAuth-ApplicationRouteMixin-sessionInvalidationSucceeded)).

          @method actions.authorizationFailed
        */
        authorizationFailed: function() {
          if (this.get(Configuration.sessionPropertyName).get('isAuthenticated')) {
            this.get(Configuration.sessionPropertyName).invalidate();
          }
        }
      }
    });

    __exports__.ApplicationRouteMixin = ApplicationRouteMixin;
  });
define("ember-simple-auth/mixins/authenticated_route_mixin", 
  ["./../core","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var global = (typeof window !== 'undefined') ? window : {},
        Ember = global.Ember;

    var Configuration = __dependency1__.Configuration;

    /**
      The mixin for routes that require the session to be authenticated in order to
      be accessible. Including this mixin in a route automatically adds a hook that
      enforces the session to be authenticated and redirect to the
      `authenticationRoute` specified in
      [Ember.SimpleAuth.setup](#Ember-SimpleAuth-setup) if it is not.

      ```javascript
        App.ProtectedRoute = Ember.Route.extend(Ember.SimpleAuth.AuthenticatedRouteMixin);
      ```

      `Ember.SimpleAuth.AuthenticatedRouteMixin` performs the redirect in the
      `beforeModel` method so that in all methods executed after that the session
      is guaranteed to be authenticated. __If `beforeModel` is overridden, ensure
      that the custom implementation calls `this._super(transition)`__ so that the
      session enforcement code is actually executed.

      @class AuthenticatedRouteMixin
      @extends Ember.Mixin
      @static
    */
    var AuthenticatedRouteMixin = Ember.Mixin.create({
      /**
        This method implements the enforcement of the session being authenticated.
        If the session is not authenticated, the current transition will be aborted
        and a redirect will be triggered to the `authenticationRoute` specified in
        [Ember.SimpleAuth.setup](#Ember-SimpleAuth-setup). The method also saves
        the intercepted transition so that it can be retried after the session has
        been authenticated (see
        [Ember.SimpleAuth.ApplicationRouteMixin#sessionAuthenticationSucceeded](#Ember-SimpleAuth-ApplicationRouteMixin-sessionAuthenticationSucceeded)).

        @method beforeModel
        @param {Transition} transition The transition that lead to this route
      */
      beforeModel: function(transition) {
        if (!this.get(Configuration.sessionPropertyName).get('isAuthenticated')) {
          transition.abort();
          this.get(Configuration.sessionPropertyName).set('attemptedTransition', transition);
          transition.send('authenticateSession');
        }
      }
    });

    __exports__.AuthenticatedRouteMixin = AuthenticatedRouteMixin;
  });
define("ember-simple-auth/mixins/authentication_controller_mixin", 
  ["./../core","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var global = (typeof window !== 'undefined') ? window : {},
        Ember = global.Ember;

    var Configuration = __dependency1__.Configuration;

    /**
      The mixin for the controller that handles the `authenticationRoute` specified
      in [Ember.SimpleAuth.setup](#Ember-SimpleAuth-setup)). It provides the
      `authenticate` action that will authenticate the session with the configured
      authenticator (see
      [Ember.SimpleAuth.AuthenticationControllerMixin#authenticatorFactory](#Ember-SimpleAuth-AuthenticationControllerMixin-authenticatorFactory)).

      @class AuthenticationControllerMixin
      @extends Ember.Mixin
    */
    var AuthenticationControllerMixin = Ember.Mixin.create({
      /**
        The authenticator used to authenticate the session.

        @property authenticatorFactory
        @type String
        @default null
      */
      authenticatorFactory: null,

      actions: {
        /**
          This action will authenticate the session with the configured
          authenticator (see
          [Ember.SimpleAuth.AuthenticationControllerMixin#authenticatorFactory](#Ember-SimpleAuth-AuthenticationControllerMixin-authenticatorFactory),
          [Ember.SimpleAuth.Session#authenticate](#Ember-SimpleAuth-Session-authenticate)).

          @method actions.authenticate
          @param {Object} options Any options the authenticator needs to authenticate the session
        */
        authenticate: function(options) {
          return this.get(Configuration.sessionPropertyName).authenticate(this.get('authenticatorFactory'), options);
        }
      }
    });

    __exports__.AuthenticationControllerMixin = AuthenticationControllerMixin;
  });
define("ember-simple-auth/mixins/login_controller_mixin", 
  ["./../core","./authentication_controller_mixin","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var global = (typeof window !== 'undefined') ? window : {},
        Ember = global.Ember;

    var Configuration = __dependency1__.Configuration;
    var AuthenticationControllerMixin = __dependency2__.AuthenticationControllerMixin;

    /**
      The mixin to use with the controller that handles the `authenticationRoute`
      specified in
      [Ember.SimpleAuth.setup](#Ember-SimpleAuth-setup) if the used authentication
      mechanism works with a login form that asks for user credentials. It provides
      the `authenticate` action that will authenticate the session with the
      configured authenticator when invoked. __This is a specialization of
      [Ember.SimpleAuth.AuthenticationControllerMixin](#Ember-SimpleAuth-AuthenticationControllerMixin).__

      Accompanying the controller that this mixin is mixed in the application needs
      to have a `login` template with the fields `identification` and `password` as
      well as an actionable button or link that triggers the `authenticate` action,
      e.g.:

      ```handlebars
      <form {{action 'authenticate' on='submit'}}>
        <label for="identification">Login</label>
        {{input id='identification' placeholder='Enter Login' value=identification}}
        <label for="password">Password</label>
        {{input id='password' placeholder='Enter Password' type='password' value=password}}
        <button type="submit">Login</button>
      </form>
      ```

      @class LoginControllerMixin
      @extends Ember.SimpleAuth.AuthenticationControllerMixin
    */
    var LoginControllerMixin = Ember.Mixin.create(AuthenticationControllerMixin, {
      actions: {
        /**
          This action will authenticate the session with the configured
          authenticator (see
          [Ember.SimpleAuth.LoginControllerMixin#authenticatorFactory](#Ember-SimpleAuth-LoginControllerMixin-authenticatorFactory))
          if both `identification` and `password` are non-empty. It passes both
          values to the authenticator.

          __The action also resets the `password` property so sensitive data does
          not stay in memory for longer than necessary.__

          @method actions.authenticate
        */
        authenticate: function() {
          var data = this.getProperties('identification', 'password');
          this.set('password', null);
          this._super(data);
        }
      }
    });

    __exports__.LoginControllerMixin = LoginControllerMixin;
  });
define("ember-simple-auth/session", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var global = (typeof window !== 'undefined') ? window : {},
        Ember = global.Ember;

    /**
      __The session provides access to the current authentication state as well as
      any data the authenticator resolved with__ (see
      [Ember.SimpleAuth.Authenticators.Base#authenticate](#Ember-SimpleAuth-Authenticators-Base-authenticate)).
      It is created when Ember.SimpleAuth is set up (see
      [Ember.SimpleAuth.setup](#Ember-SimpleAuth-setup)) and __injected into all
      controllers and routes so that these parts of the application
      can always access the current authentication state and other data__,
      depending on the used authenticator and whether the session is actually
      authenticated (see
      [Ember.SimpleAuth.Authenticators.Base](#Ember-SimpleAuth-Authenticators-Base))).

      The session also provides methods to authenticate it and to invalidate itself
      (see
      [Ember.SimpleAuth.Session#authenticate](#Ember-SimpleAuth-Session-authenticate),
      [Ember.SimpleAuth.Session#invaldiate](#Ember-SimpleAuth-Session-invaldiate)).
      These methods are usually invoked through actions from routes or controllers.
      To authenticate the session manually, simple call the
      [Ember.SimpleAuth.Session#authenticate](#Ember-SimpleAuth-Session-authenticate)
      method with the authenticator factory to use as well as any options the
      authenticator needs to authenticate the session:

      ```javascript
        this.get('session').authenticate('authenticatorFactory', { some: 'option' }).then(function() {
          // authentication was successful
        }, function() {
          // authentication failed
        });
      ```

      When the session's authentication state changes or an attempt to change it
      fails, it will trigger the `'sessionAuthenticationSucceeded'`,
      `'sessionAuthenticationFailed'`, `'sessionInvalidationSucceeded'` or
      `'sessionInvalidationFailed'` events.

      The session also observes the store and - if it is authenticated - the
      authenticator for changes (see
      [Ember.SimpleAuth.Authenticators.Base](#Ember-SimpleAuth-Authenticators-Base)
      end [Ember.SimpleAuth.Stores.Base](#Ember-SimpleAuth-Stores-Base)).

      @class Session
      @extends Ember.ObjectProxy
      @uses Ember.Evented
    */
    var Session = Ember.ObjectProxy.extend(Ember.Evented, {
      /**
        Triggered __whenever the session is successfully authenticated__. When the
        application uses the mixin,
        [Ember.SimpleAuth.ApplicationRouteMixin.actions#sessionAuthenticationSucceeded](#Ember-SimpleAuth-ApplicationRouteMixin-sessionAuthenticationSucceeded)
        will be invoked whenever this event is triggered.

        @event sessionAuthenticationSucceeded
      */
      /**
        Triggered __whenever an attempt to authenticate the session fails__. When
        the application uses the mixin,
        [Ember.SimpleAuth.ApplicationRouteMixin.actions#sessionAuthenticationFailed](#Ember-SimpleAuth-ApplicationRouteMixin-sessionAuthenticationFailed)
        will be invoked whenever this event is triggered.

        @event sessionAuthenticationFailed
        @param {Object} error The error object; this depends on the authenticator in use, see [Ember.SimpleAuth.Authenticators.Base#authenticate](#Ember-SimpleAuth-Authenticators-Base-authenticate)
      */
      /**
        Triggered __whenever the session is successfully invalidated__. When the
        application uses the mixin,
        [Ember.SimpleAuth.ApplicationRouteMixin.actions#sessionInvalidationSucceeded](#Ember-SimpleAuth-ApplicationRouteMixin-sessionInvalidationSucceeded)
        will be invoked whenever this event is triggered.

        @event sessionInvalidationSucceeded
      */
      /**
        Triggered __whenever an attempt to invalidate the session fails__. When the
        application uses the mixin,
        [Ember.SimpleAuth.ApplicationRouteMixin.actions#sessionInvalidationFailed](#Ember-SimpleAuth-ApplicationRouteMixin-sessionInvalidationFailed)
        will be invoked whenever this event is triggered.

        @event sessionInvalidationFailed
        @param {Object} error The error object; this depends on the authenticator in use, see [Ember.SimpleAuth.Authenticators.Base#invalidate](#Ember-SimpleAuth-Authenticators-Base-invalidate)
      */
      /**
        Triggered __whenever the server rejects the authorization information
        passed with a request and responds with status 401__. When the application
        uses the mixin,
        [Ember.SimpleAuth.ApplicationRouteMixin.actions#authorizationFailed](#Ember-SimpleAuth-ApplicationRouteMixin-authorizationFailed)
        will be invoked whenever this event is triggered.

        @event authorizationFailed
      */

      /**
        The authenticator factory used to authenticate the session. This is only
        set when the session is currently authenticated.

        @property authenticatorFactory
        @type String
        @readOnly
        @default null
      */
      authenticatorFactory: null,
      /**
        The store used to persist session properties. This is assigned during
        Ember.SimpleAuth's setup and can be configured there
        (see [Ember.SimpleAuth.setup](#Ember-SimpleAuth-setup)).

        @property store
        @type Ember.SimpleAuth.Stores.Base
        @readOnly
        @default null
      */
      store: null,
      /**
        Returns whether the session is currently authenticated.

        @property isAuthenticated
        @type Boolean
        @readOnly
        @default false
      */
      isAuthenticated: false,
      /**
        @property attemptedTransition
        @private
      */
      attemptedTransition: null,
      /**
        @property content
        @private
      */
      content: {},

      /**
        @method init
        @private
      */
      init: function() {
        this.bindToStoreEvents();
      },

      /**
        Authenticates the session with an `authenticator` and appropriate
        `options`. __This delegates the actual authentication work to the
        `authenticator`__ and handles the returned promise accordingly (see
        [Ember.SimpleAuth.Authenticators.Base#authenticate](#Ember-SimpleAuth-Authenticators-Base-authenticate)).
        All data the authenticator resolves with will be saved in the session.

        __This method returns a promise itself. A resolving promise indicates that
        the session was successfully authenticated__ while a rejecting promise
        indicates that authentication failed and the session remains
        unauthenticated.

        @method authenticate
        @param {String} authenticatorFactory The authenticator factory to use as it is registered with Ember's container, see [Ember's API docs](http://emberjs.com/api/classes/Ember.Application.html#method_register)
        @param {Object} options The options to pass to the authenticator; depending on the type of authenticator these might be a set of credentials, a Facebook OAuth Token, etc.
        @return {Ember.RSVP.Promise} A promise that resolves when the session was authenticated successfully
      */
      authenticate: function(authenticatorFactory, options) {
        Ember.assert('Session#authenticate requires the authenticator factory to be specified, was ' + authenticatorFactory, !Ember.isEmpty(authenticatorFactory));
        var _this = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {
          _this.container.lookup(authenticatorFactory).authenticate(options).then(function(content) {
            _this.setup(authenticatorFactory, content, true);
            resolve();
          }, function(error) {
            _this.clear();
            _this.trigger('sessionAuthenticationFailed', error);
            reject(error);
          });
        });
      },

      /**
        Invalidates the session with the authenticator it is currently
        authenticated with (see
        [Ember.SimpleAuth.Session#authenticatorFactory](#Ember-SimpleAuth-Session-authenticatorFactory)).
        __This invokes the authenticator's `invalidate` method and handles the
        returned promise accordingly__ (see
        [Ember.SimpleAuth.Authenticators.Base#invalidate](#Ember-SimpleAuth-Authenticators-Base-invalidate)).

        __This method returns a promise itself. A resolving promise indicates that
        the session was successfully invalidated__ while a rejecting promise
        indicates that the promise returned by the `authenticator` rejected and
        thus invalidation was cancelled. In that case the session remains
        authenticated. Once the session is successfully invalidated it clears all
        of its data.

        @method invalidate
        @return {Ember.RSVP.Promise} A promise that resolves when the session was invalidated successfully
      */
      invalidate: function() {
        var _this = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {
          var authenticator = _this.container.lookup(_this.authenticatorFactory);
          authenticator.invalidate(_this.content).then(function() {
            authenticator.off('sessionDataUpdated');
            _this.clear(true);
            resolve();
          }, function(error) {
            _this.trigger('sessionInvalidationFailed', error);
            reject(error);
          });
        });
      },

      /**
        @method restore
        @private
      */
      restore: function() {
        var _this = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {
          var restoredContent      = _this.store.restore();
          var authenticatorFactory = restoredContent.authenticatorFactory;
          if (!!authenticatorFactory) {
            delete restoredContent.authenticatorFactory;
            _this.container.lookup(authenticatorFactory).restore(restoredContent).then(function(content) {
              _this.setup(authenticatorFactory, content);
              resolve();
            }, function() {
              _this.store.clear();
              reject();
            });
          } else {
            _this.store.clear();
            reject();
          }
        });
      },

      /**
        @method setup
        @private
      */
      setup: function(authenticatorFactory, content, trigger) {
        trigger = !!trigger && !this.get('isAuthenticated');
        this.beginPropertyChanges();
        this.setProperties({
          isAuthenticated:      true,
          authenticatorFactory: authenticatorFactory,
          content:              content
        });
        this.bindToAuthenticatorEvents();
        var data = Ember.$.extend({ authenticatorFactory: authenticatorFactory }, this.content);
        this.store.replace(data);
        this.endPropertyChanges();
        if (trigger) {
          this.trigger('sessionAuthenticationSucceeded');
        }
      },

      /**
        @method clear
        @private
      */
      clear: function(trigger) {
        trigger = !!trigger && this.get('isAuthenticated');
        this.beginPropertyChanges();
        this.setProperties({
          isAuthenticated:      false,
          authenticatorFactory: null,
          content:              {}
        });
        this.store.clear();
        this.endPropertyChanges();
        if (trigger) {
          this.trigger('sessionInvalidationSucceeded');
        }
      },

      /**
        @method bindToAuthenticatorEvents
        @private
      */
      bindToAuthenticatorEvents: function() {
        var _this = this;
        var authenticator = this.container.lookup(this.authenticatorFactory);
        authenticator.off('sessionDataUpdated');
        authenticator.off('sessionDataInvalidated');
        authenticator.on('sessionDataUpdated', function(content) {
          _this.setup(_this.authenticatorFactory, content);
        });
        authenticator.on('sessionDataInvalidated', function(content) {
          _this.clear(true);
        });
      },

      /**
        @method bindToStoreEvents
        @private
      */
      bindToStoreEvents: function() {
        var _this = this;
        this.store.on('sessionDataUpdated', function(content) {
          var authenticatorFactory = content.authenticatorFactory;
          if (!!authenticatorFactory) {
            delete content.authenticatorFactory;
            _this.container.lookup(authenticatorFactory).restore(content).then(function(content) {
              _this.setup(authenticatorFactory, content, true);
            }, function() {
              _this.clear(true);
            });
          } else {
            _this.clear(true);
          }
        });
      }
    });

    __exports__.Session = Session;
  });
define("ember-simple-auth/stores", 
  ["./stores/base","./stores/local_storage","./stores/ephemeral","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Base = __dependency1__.Base;
    var LocalStorage = __dependency2__.LocalStorage;
    var Ephemeral = __dependency3__.Ephemeral;

    var Stores = {
      Base:         Base,
      LocalStorage: LocalStorage,
      Ephemeral:    Ephemeral
    };

    var registerStores = function(container) {
      container.register('ember-simple-auth-session-store:local-storage', LocalStorage);
      container.register('ember-simple-auth-session-store:ephemeral', Ephemeral);
    };

    __exports__.registerStores = registerStores;
    __exports__.Stores = Stores;
  });
define("ember-simple-auth/stores/base", 
  ["../utils/flat_objects_are_equal","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var global = (typeof window !== 'undefined') ? window : {},
        Ember = global.Ember;

    var flatObjectsAreEqual = __dependency1__.flatObjectsAreEqual;

    /**
      The base for all store types. __This serves as a starting point for
      implementing custom stores and must not be used directly.__

      Stores are used to persist the session's state so it survives a page reload
      and is synchronized across multiple tabs or windows of the same application.
      The store to be used with the application can be configured during
      Ember.SimpleAuth's setup
      (see [Ember.SimpleAuth.setup](#Ember-SimpleAuth-setup)).

      @class Base
      @namespace Stores
      @extends Ember.Object
      @uses Ember.Evented
    */
    var Base = Ember.Object.extend(Ember.Evented, {
      /**
        __Triggered when the data that constitutes the session changes in the
        store. This usually happens because the session is authenticated or
        invalidated in another tab or window.__ The session automatically catches
        that event, passes the updated data to its authenticator's
        [Ember.SimpleAuth.Authenticators.Base#restore](#Ember-SimpleAuth-Authenticators-Base-restore)
        method and handles the result of that invocation accordingly.

        @event sessionDataUpdated
        @param {Object} data The updated session data
      */

      /**
        Persists the `data` in the store.

        `Ember.SimpleAuth.Stores.Base`'s implementation does nothing.

        @method persist
        @param {Object} data The data to persist
      */
      persist: function(data) {
      },

      /**
        Restores all data currently saved in the store as a plain object.

        `Ember.SimpleAuth.Stores.Base`'s implementation always returns an empty
        plain Object.

        @method restore
        @return {Object} The data currently persisted in the store.
      */
      restore: function() {
        return {};
      },

      /**
        Replaces all data currently saved in the store with the specified `data`.

        `Ember.SimpleAuth.Stores.Base`'s implementation clears the store, then
        persists the specified `data`. If the store's current content is equal to
        the specified `data`, nothing is done.

        @method replace
        @param {Object} data The data to replace the store's content with
      */
      replace: function(data) {
        if (!flatObjectsAreEqual(data, this.restore())) {
          this.clear();
          this.persist(data);
        }
      },

      /**
        Clears the store.

        `Ember.SimpleAuth.Stores.Base`'s implementation does nothing.

        @method clear
      */
      clear: function() {
      }
    });

    __exports__.Base = Base;
  });
define("ember-simple-auth/stores/ephemeral", 
  ["./base","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var global = (typeof window !== 'undefined') ? window : {},
        Ember = global.Ember;

    var Base = __dependency1__.Base;

    /**
      Store that saves its data in memory and thus __is not actually persistent__.
      It does also not synchronize the session's state across multiple tabs or
      windows as those cannot share memory.

      __This store is mainly useful for testing.__

      _The factory for this store is registered as
      `'ember-simple-auth-session-store:ephemeral'` in Ember's container._

      @class Ephemeral
      @namespace Stores
      @extends Stores.Base
    */
    var Ephemeral = Base.extend({
      /**
        @method init
        @private
      */
      init: function() {
        this.clear();
      },

      /**
        Persists the `data`.

        @method persist
        @param {Object} data The data to persist
      */
      persist: function(data) {
        this._data = Ember.$.extend(data, this._data);
      },

      /**
        Restores all data currently saved as a plain object.

        @method restore
        @return {Object} All data currently persisted
      */
      restore: function() {
        return Ember.$.extend({}, this._data);
      },

      /**
        Clears the store.

        @method clear
      */
      clear: function() {
        delete this._data;
        this._data = {};
      }
    });

    __exports__.Ephemeral = Ephemeral;
  });
define("ember-simple-auth/stores/local_storage", 
  ["./base","../utils/flat_objects_are_equal","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var global = (typeof window !== 'undefined') ? window : {},
        Ember = global.Ember;

    var Base = __dependency1__.Base;
    var flatObjectsAreEqual = __dependency2__.flatObjectsAreEqual;

    /**
      Store that saves its data in the browser's `localStorage`.

      _The factory for this store is registered as
      `'ember-simple-auth-session-store:local-storage'` in Ember's container._

      @class LocalStorage
      @namespace Stores
      @extends Stores.Base
    */
    var LocalStorage = Base.extend({
      /**
        The prefix to use for the store's keys so they can be distinguished from
        others.

        @property keyPrefix
        @type String
        @default 'ember_simple_auth:'
      */
      keyPrefix: 'ember_simple_auth:',

      /**
        @property _triggerChangeEventTimeout
        @private
      */
      _triggerChangeEventTimeout: null,

      /**
        @method init
        @private
      */
      init: function() {
        this.bindToStorageEvents();
      },

      /**
        Persists the `data` in the `localStorage`.

        @method persist
        @param {Object} data The data to persist
      */
      persist: function(data) {
        for (var property in data) {
          var key = this.buildStorageKey(property);
          localStorage.setItem(key, data[property]);
        }
        this._lastData = this.restore();
      },

      /**
        Restores all data currently saved in the `localStorage` identified by the
        `keyPrefix` as one plain object.

        @method restore
        @return {Object} All data currently persisted in the `localStorage`
      */
      restore: function() {
        var _this = this;
        var data = {};
        this.knownKeys().forEach(function(key) {
          var originalKey = key.replace(_this.keyPrefix, '');
          data[originalKey] = localStorage.getItem(key);
        });
        return data;
      },

      /**
        Clears the store by deleting all `localStorage` keys prefixed with the
        `keyPrefix`.

        @method clear
      */
      clear: function() {
        this.knownKeys().forEach(function(key) {
          localStorage.removeItem(key);
        });
        this._lastData = null;
      },

      /**
        @method buildStorageKey
        @private
      */
      buildStorageKey: function(property) {
        return this.keyPrefix + property;
      },

      /**
        @method knownKeys
        @private
      */
      knownKeys: function(callback) {
        var keys = Ember.A([]);
        for (var i = 0, l = localStorage.length; i < l; i++) {
          var key = localStorage.key(i);
          if (key.indexOf(this.keyPrefix) === 0) {
            keys.push(key);
          }
        }
        return keys;
      },

      /**
        @method bindToStorageEvents
        @private
      */
      bindToStorageEvents: function() {
        var _this = this;
        Ember.$(window).bind('storage', function(e) {
          var data = _this.restore();
          if (!flatObjectsAreEqual(data, _this._lastData)) {
            _this._lastData = data;
            Ember.run.cancel(_this._triggerChangeEventTimeout);
            _this._triggerChangeEventTimeout = Ember.run.next(_this, function() {
              this.trigger('sessionDataUpdated', data);
            });
          }
        });
      }
    });

    __exports__.LocalStorage = LocalStorage;
  });
define("ember-simple-auth/utils", 
  ["./utils/is_secure_url","./utils/flat_objects_are_equal","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var isSecureUrl = __dependency1__.isSecureUrl;
    var flatObjectsAreEqual = __dependency2__.flatObjectsAreEqual;

    var Utils = {
      isSecureUrl:         isSecureUrl,
      flatObjectsAreEqual: flatObjectsAreEqual
    };

    __exports__.Utils = Utils;
  });
define("ember-simple-auth/utils/flat_objects_are_equal", 
  ["exports"],
  function(__exports__) {
    "use strict";
    /**
      @method flatObjectsAreEqual
      @private
    */
    var flatObjectsAreEqual = function(a, b) {
      function sortObject(object) {
        var array = [];
        for (var property in object) {
          array.push([property, object[property]]);
        }
        return array.sort(function(a, b) {
          if (a[0] < b[0]) {
            return -1;
          } else if (a[0] > b[0]) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      return JSON.stringify(sortObject(a)) === JSON.stringify(sortObject(b));
    };

    __exports__.flatObjectsAreEqual = flatObjectsAreEqual;
  });
define("ember-simple-auth/utils/is_secure_url", 
  ["exports"],
  function(__exports__) {
    "use strict";
    /**
      @method isSecureUrl
      @private
    */
    var isSecureUrl = function(url) {
      var link  = document.createElement('a');
      link.href = url;
      link.href = link.href;
      return link.protocol == 'https:';
    };

    __exports__.isSecureUrl = isSecureUrl;
  });
global.Ember.SimpleAuth = requireModule('ember-simple-auth');
})((typeof global !== 'undefined') ? global : window);
