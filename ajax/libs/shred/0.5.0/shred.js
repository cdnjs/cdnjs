var _ = require("underscore")
  , Ax = require("ax")
;

var Modules = {
  Request: require("./shred/request"),
  Response: require("./shred/response")
}

var Shred = function(options) {
  options = (options||{});
  this.defaults = options.defaults||{};
  this.log = options.logger||(new Ax({ level: "info" }));
};

_.extend(Shred, Modules);

var Methods = {
  request: function(options) {
    return new Shred.Request(this, _.defaults(options,this.defaults));
  }
};

"GET PUT POST DELETE".split(" ").forEach(function(method) {
  Methods[method] = Methods[method.toLowerCase(method)] = function(options) {
    options.method = method;
    return this.request(options);
  };
});

_.extend(Shred.prototype, Methods);

module.exports = Shred;
