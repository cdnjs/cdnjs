(function() {
  var applyExtra;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __slice = Array.prototype.slice;
  applyExtra = function(Batman) {
    Batman.mixin(Batman.Encoders, {
      railsDate: {
        encode: function(value) {
          return value;
        },
        decode: function(value) {
          var a;
          a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
          if (a) {
            return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
          } else {
            Batman.developer.warn("Unrecognized rails date " + value + "!");
            return Date.parse(value);
          }
        }
      }
    });
    return Batman.RailsStorage = (function() {
      __extends(RailsStorage, Batman.RestStorage);
      function RailsStorage() {
        RailsStorage.__super__.constructor.apply(this, arguments);
      }
      RailsStorage.prototype._addJsonExtension = function(options) {
        return options.url += '.json';
      };
      RailsStorage.prototype.optionsForRecord = function() {
        var args, callback, _i;
        args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), callback = arguments[_i++];
        return RailsStorage.__super__.optionsForRecord.apply(this, __slice.call(args).concat([function(err, options) {
          if (!err) {
            this._addJsonExtension(options);
          }
          return callback.call(this, err, options);
        }]));
      };
      RailsStorage.prototype.optionsForCollection = function() {
        var args, callback, _i;
        args = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), callback = arguments[_i++];
        return RailsStorage.__super__.optionsForCollection.apply(this, __slice.call(args).concat([function(err, options) {
          if (!err) {
            this._addJsonExtension(options);
          }
          return callback.call(this, err, options);
        }]));
      };
      RailsStorage.prototype.after('update', 'create', function(_arg) {
        var err, key, record, recordOptions, response, validationError, validationErrors, _i, _len, _ref;
        err = _arg[0], record = _arg[1], response = _arg[2], recordOptions = _arg[3];
        if (err) {
          if (err.request.get('status') === 422) {
            _ref = JSON.parse(err.request.get('response'));
            for (key in _ref) {
              validationErrors = _ref[key];
              for (_i = 0, _len = validationErrors.length; _i < _len; _i++) {
                validationError = validationErrors[_i];
                record.get('errors').add(key, "" + key + " " + validationError);
              }
            }
            return [record.get('errors'), record, response, recordOptions];
          }
        }
        return arguments[0];
      });
      return RailsStorage;
    })();
  };
  if ((typeof module !== "undefined" && module !== null) && (typeof require !== "undefined" && require !== null)) {
    module.exports = applyExtra;
  } else {
    applyExtra(Batman);
  }
}).call(this);
