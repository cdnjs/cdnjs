// Shred is an HTTP client library intended to simplify the use of Node's
// built-in HTTP library. In particular, we wanted to make it easier to interact
// with HTTP-based APIs.
// 
// See the [examples](./examples.html) for more details.

var _ = require("underscore")
// Ax is a nice logging library we wrote. You can use any logger, providing it
// has `info`, `warn`, `debug`, and `error` methods that take a string.
  , Ax = require("ax")
  , CookieJarLib = require( "cookiejar" )
  , CookieAccessInfo = CookieJarLib.CookieAccessInfo
  , CookieJar = CookieJarLib.CookieJar
  , Cookie = CookieJarLib.Cookie
;

// Shred takes some options, including a logger and request defaults.

var Shred = function(options) {
  options = (options||{});
  this.defaults = options.defaults||{};
  this.log = options.logger||(new Ax({ level: "info" }));
  this._sharedCookieJar = new CookieJar();
};

// Most of the real work is done in the request and reponse classes.
 
Shred.Request = require("./shred/request");
Shred.Response = require("./shred/response");

// The `request` method kicks off a new request, instantiating a new `Request`
// object and passing along whatever default options we were given.

Shred.prototype = {
  request: function(options) {
    options.logger = this.log;
    options.cookieJar = ( 'cookieJar' in options ) ? options.cookieJar : this._sharedCookieJar; // let them set cookieJar = null
    return new Shred.Request(_.defaults(options,this.defaults));
  }
};

// Define a bunch of convenience methods so that you don't have to include
// a `method` property in your request options.

"get put post delete".split(" ").forEach(function(method) {
  Shred.prototype[method] = function(options) {
    options.method = method;
    return this.request(options);
  };
});


module.exports = Shred;
