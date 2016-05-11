(function(globals) {
  function d3Transform(chain) {
    var transforms = [];
    if (chain !== undefined) { transforms.push(chain);  }

    function push(kind, args) {
      var n = args.length;

      transforms.push(function() {
        if (kind == 'seq') {
          return args[0].apply(this, arr(arguments));
        } else {
          return kind + '(' + (n == 1 && typeof args[0] == 'function'
              ? args[0].apply(this, arr(arguments)) : args) + ')';
        }
      });
    }

    function arr(args) {
      return Array.prototype.slice.call(args);
    }

    var my = function() {
      var that = this,
          args = arr(arguments);

      return transforms.map(function(f) {
        return f.apply(that, args);
      }).join(' ');
    };

    ['translate', 'rotate', 'scale', 'matrix', 'skewX', 'skewY', 'seq'].forEach(function(t) {
      my[t] = function() {
        push(t, arr(arguments));
        return my;
      };
    });

    return my;
  }

  // Add the "transform" method to d3.svg if d3.svg is defined.
  if (typeof d3 !== 'undefined' && d3.svg) {
      d3.svg.transform = d3Transform;
  }

  // Export the "transform" method if module.exports is defined, otherwise add it to the global namespace as d3Transform.
  if (typeof module !== 'undefined' && module.exports) {
      module.exports = d3Transform;
  }  else {
      globals.d3Transform = d3Transform;
  }

})(this);
