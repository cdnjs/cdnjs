(function() {
  var format, lookup,
    __slice = Array.prototype.slice;

  format = String.prototype.format = function() {
    var args, error, explicit, idx, implicit,
      _this = this;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (args.length === 0) {
      return function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return _this.format.apply(_this, args);
      };
    }
    idx = 0;
    explicit = implicit = false;
    error = 'cannot switch from {} to {} numbering'.format();
    return this.replace(/([{}])\1|[{](.*?)(?:!(.+?))?[}]/g, function(match, literal, key, transformer) {
      var fn, value, _ref, _ref2, _ref3;
      if (literal) return literal;
      if (key.length) {
        explicit = true;
        if (implicit) throw error('implicit', 'explicit');
        value = (_ref = lookup(args, key)) != null ? _ref : '';
      } else {
        implicit = true;
        if (explicit) throw error('explicit', 'implicit');
        value = (_ref2 = args[idx++]) != null ? _ref2 : '';
      }
      value = value.toString();
      if (fn = format.transformers[transformer]) {
        return (_ref3 = fn.call(value)) != null ? _ref3 : '';
      } else {
        return value;
      }
    });
  };

  lookup = function(object, key) {
    var match;
    if (!/^(\d+)([.]|$)/.test(key)) key = '0.' + key;
    while (match = /(.+?)[.](.+)/.exec(key)) {
      object = object[match[1]];
      key = match[2];
    }
    return object[key];
  };

  format.transformers = {};

}).call(this);
