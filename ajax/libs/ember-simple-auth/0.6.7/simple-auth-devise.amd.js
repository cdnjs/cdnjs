(function(global) {
  var define = global.define;
  var require = global.require;
  var Ember = global.Ember;
  if (typeof Ember === 'undefined' && typeof require !== 'undefined') {
    Ember = require('ember');
  }

Ember.libraries.register('Ember Simple Auth Devise', '0.6.7');

define("simple-auth-devise/authenticators/devise", 
  ["simple-auth/authenticators/base","simple-auth/utils/is-secure-url","./../configuration","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Base = __dependency1__["default"];
    var isSecureUrl = __dependency2__["default"];
    var Configuration = __dependency3__["default"];

    /**
      Authenticator that works with the Ruby gem
      [Devise](https://github.com/plataformatec/devise).

      __As token authentication is not actually part of devise anymore, the server
      needs to implement some customizations__ to work with this authenticator -
      see the README and
      [discussion here](https://gist.github.com/josevalim/fb706b1e933ef01e4fb6).

      _The factory for this authenticator is registered as
      `'simple-auth-authenticator:devise'` in Ember's container._

      @class Devise
      @namespace SimpleAuth.Authenticators
      @module simple-auth-devise/authenticators/devise
      @extends Base
    */
    __exports__["default"] = Base.extend({
      /**
        The endpoint on the server the authenticator acquires the auth token
        and email from.

        This value can be configured via
        [`SimpleAuth.Configuration.Devise#serverTokenEndpoint`](#SimpleAuth-Configuration-Devise-serverTokenEndpoint).

        @property serverTokenEndpoint
        @type String
        @default '/users/sign_in'
      */
      serverTokenEndpoint: '/users/sign_in',

      /**
        The devise resource name

        This value can be configured via
        [`SimpleAuth.Configuration.Devise#resourceName`](#SimpleAuth-Configuration-Devise-resourceName).

        @property resourceName
        @type String
        @default 'user'
      */
      resourceName: 'user',

      /**
        @method init
        @private
      */
      init: function() {
        this.serverTokenEndpoint = Configuration.serverTokenEndpoint;
        this.resourceName        = Configuration.resourceName;
      },

      /**
        Restores the session from a set of session properties; __will return a
        resolving promise when there's a non-empty `user_token` and a non-empty
        `user_email` in the `properties`__ and a rejecting promise otherwise.

        @method restore
        @param {Object} properties The properties to restore the session from
        @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being authenticated
      */
      restore: function(properties) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
          if (!Ember.isEmpty(properties.user_token) && !Ember.isEmpty(properties.user_email)) {
            resolve(properties);
          } else {
            reject();
          }
        });
      },

      /**
        Authenticates the session with the specified `credentials`; the credentials
        are `POST`ed to the
        [`Authenticators.Devise#serverTokenEndpoint`](#SimpleAuth-Authenticators-Devise-serverTokenEndpoint)
        and if they are valid the server returns an auth token and email in
        response. __If the credentials are valid and authentication succeeds, a
        promise that resolves with the server's response is returned__, otherwise a
        promise that rejects with the server error is returned.

        @method authenticate
        @param {Object} options The credentials to authenticate the session with
        @return {Ember.RSVP.Promise} A promise that resolves when an auth token and email is successfully acquired from the server and rejects otherwise
      */
      authenticate: function(credentials) {
        var _this = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {
          var data                 = {};
          data[_this.resourceName] = {
            email:    credentials.identification,
            password: credentials.password
          };
          _this.makeRequest(data).then(function(response) {
            Ember.run(function() {
              resolve(response);
            });
          }, function(xhr, status, error) {
            Ember.run(function() {
              reject(xhr.responseJSON || xhr.responseText);
            });
          });
        });
      },

      /**
        Does nothing

        @method invalidate
        @return {Ember.RSVP.Promise} A resolving promise
      */
      invalidate: function() {
        return Ember.RSVP.resolve();
      },

      /**
        @method makeRequest
        @private
      */
      makeRequest: function(data, resolve, reject) {
        if (!isSecureUrl(this.serverTokenEndpoint)) {
          Ember.Logger.warn('Credentials are transmitted via an insecure connection - use HTTPS to keep them secure.');
        }
        return Ember.$.ajax({
          url:        this.serverTokenEndpoint,
          type:       'POST',
          data:       data,
          dataType:   'json',
          beforeSend: function(xhr, settings) {
            xhr.setRequestHeader('Accept', settings.accepts.json);
          }
        });
      }
    });
  });
define("simple-auth-devise/authorizers/devise", 
  ["simple-auth/authorizers/base","simple-auth/utils/is-secure-url","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Base = __dependency1__["default"];
    var isSecureUrl = __dependency2__["default"];

    /**
      Authenticator that works with the Ruby gem
      [Devise](https://github.com/plataformatec/devise) by sending the `user_token`
      and `user_email` properties from the session in the `Authorization` header.

      __As token authentication is not actually part of devise anymore, the server
      needs to implement some customizations__ to work with this authenticator -
      see the README for more information.

      _The factory for this authorizer is registered as
      `'simple-auth-authorizer:devise'` in Ember's container._

      @class Devise
      @namespace SimpleAuth.Authorizers
      @module simple-auth-devise/authorizers/devise
      @extends Base
    */
    __exports__["default"] = Base.extend({
      /**
        Authorizes an XHR request by sending the `user_token` and `user_email`
        properties from the session in the `Authorization` header:

        ```
        Authorization: Token token="<user_token>", user_email="<user_email>"
        ```

        @method authorize
        @param {jqXHR} jqXHR The XHR request to authorize (see http://api.jquery.com/jQuery.ajax/#jqXHR)
        @param {Object} requestOptions The options as provided to the `$.ajax` method (see http://api.jquery.com/jQuery.ajaxPrefilter/)
      */

      authorize: function(jqXHR, requestOptions) {
        var userToken = this.get('session.user_token');
        var userEmail = this.get('session.user_email');
        if (this.get('session.isAuthenticated') && !Ember.isEmpty(userToken) && !Ember.isEmpty(userEmail)) {
          if (!isSecureUrl(requestOptions.url)) {
            Ember.Logger.warn('Credentials are transmitted via an insecure connection - use HTTPS to keep them secure.');
          }
          var authData = 'token="' + userToken + '", user_email="' + userEmail + '"';
          jqXHR.setRequestHeader('Authorization', 'Token ' + authData);
        }
      }
    });
  });
define("simple-auth-devise/configuration", 
  ["simple-auth/utils/load-config","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var loadConfig = __dependency1__["default"];

    var defaults = {
      serverTokenEndpoint: '/users/sign_in',
      resourceName:        'user'
    };

    /**
      Ember Simple Auth Device's configuration object.

      To change any of these values, define a global environment object for Ember
      Simple Auth and define the values there:

      ```js
      window.ENV = window.ENV || {};
      window.ENV['simple-auth-devise'] = {
        serverTokenEndpoint: '/some/other/endpoint'
      }
      ```

      @class Devise
      @namespace SimpleAuth.Configuration
      @module simple-auth/configuration
    */
    __exports__["default"] = {
      /**
        The endpoint on the server the authenticator acquires the auth token
        and email from.

        @property serverTokenEndpoint
        @readOnly
        @static
        @type String
        @default '/users/sign_in'
      */
      serverTokenEndpoint: defaults.serverTokenEndpoint,

      /**
        The devise resource name.

        @property resourceName
        @readOnly
        @static
        @type String
        @default 'user'
      */
      resourceName: defaults.resourceName,

      /**
        @method load
        @private
      */
      load: loadConfig(defaults)
    };
  });
define("simple-auth-devise/ember", 
  ["./initializer"],
  function(__dependency1__) {
    "use strict";
    var initializer = __dependency1__["default"];

    Ember.onLoad('Ember.Application', function(Application) {
      Application.initializer(initializer);
    });
  });
define("simple-auth-devise/initializer", 
  ["./configuration","simple-auth/utils/get-global-config","simple-auth-devise/authenticators/devise","simple-auth-devise/authorizers/devise","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var Configuration = __dependency1__["default"];
    var getGlobalConfig = __dependency2__["default"];
    var Authenticator = __dependency3__["default"];
    var Authorizer = __dependency4__["default"];

    __exports__["default"] = {
      name:       'simple-auth-devise',
      before:     'simple-auth',
      initialize: function(container, application) {
        var config = getGlobalConfig('simple-auth-devise');
        Configuration.load(container, config);
        container.register('simple-auth-authorizer:devise', Authorizer);
        container.register('simple-auth-authenticator:devise', Authenticator);
      }
    };
  });
})((typeof global !== 'undefined') ? global : window);
