(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', './Requestable'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('./Requestable'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.Requestable);
    global.RateLimit = mod.exports;
  }
})(this, function (module, _Requestable2) {
  'use strict';

  var _Requestable3 = _interopRequireDefault(_Requestable2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var RateLimit = function (_Requestable) {
    _inherits(RateLimit, _Requestable);

    /**
     * construct a RateLimit
     * @param {Requestable.auth} auth - the credentials to authenticate to GitHub
     * @param {string} [apiBase] - the base Github API URL
     * @return {Promise} - the promise for the http request
     */

    function RateLimit(auth, apiBase) {
      _classCallCheck(this, RateLimit);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(RateLimit).call(this, auth, apiBase));
    }

    /**
     * Query the current rate limit
     * @see https://developer.github.com/v3/rate_limit/
     * @param {Requestable.callback} [cb] - will receive the rate-limit data
     * @return {Promise} - the promise for the http request
     */


    _createClass(RateLimit, [{
      key: 'getRateLimit',
      value: function getRateLimit(cb) {
        return this._request('GET', '/rate_limit', null, cb);
      }
    }]);

    return RateLimit;
  }(_Requestable3.default);

  module.exports = RateLimit;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJhdGVMaW1pdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQVlNLFM7Ozs7Ozs7Ozs7QUFPSCx1QkFBWSxJQUFaLEVBQWtCLE9BQWxCLEVBQTJCO0FBQUE7O0FBQUEsMEZBQ2xCLElBRGtCLEVBQ1osT0FEWTtBQUUxQjs7Ozs7Ozs7Ozs7O21DQVFZLEUsRUFBSTtBQUNkLGVBQU8sS0FBSyxRQUFMLENBQWMsS0FBZCxFQUFxQixhQUFyQixFQUFvQyxJQUFwQyxFQUEwQyxFQUExQyxDQUFQO0FBQ0Y7Ozs7OztBQUdKLFNBQU8sT0FBUCxHQUFpQixTQUFqQiIsImZpbGUiOiJSYXRlTGltaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlXG4gKiBAY29weXJpZ2h0ICAyMDEzIE1pY2hhZWwgQXVmcmVpdGVyIChEZXZlbG9wbWVudCBTZWVkKSBhbmQgMjAxNiBZYWhvbyBJbmMuXG4gKiBAbGljZW5zZSAgICBMaWNlbnNlZCB1bmRlciB7QGxpbmsgaHR0cHM6Ly9zcGR4Lm9yZy9saWNlbnNlcy9CU0QtMy1DbGF1c2UtQ2xlYXIuaHRtbCBCU0QtMy1DbGF1c2UtQ2xlYXJ9LlxuICogICAgICAgICAgICAgR2l0aHViLmpzIGlzIGZyZWVseSBkaXN0cmlidXRhYmxlLlxuICovXG5cbmltcG9ydCBSZXF1ZXN0YWJsZSBmcm9tICcuL1JlcXVlc3RhYmxlJztcblxuLyoqXG4gKiBSYXRlTGltaXQgYWxsb3dzIHVzZXJzIHRvIHF1ZXJ5IHRoZWlyIHJhdGUtbGltaXQgc3RhdHVzXG4gKi9cbmNsYXNzIFJhdGVMaW1pdCBleHRlbmRzIFJlcXVlc3RhYmxlIHtcbiAgIC8qKlxuICAgICogY29uc3RydWN0IGEgUmF0ZUxpbWl0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmF1dGh9IGF1dGggLSB0aGUgY3JlZGVudGlhbHMgdG8gYXV0aGVudGljYXRlIHRvIEdpdEh1YlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlXSAtIHRoZSBiYXNlIEdpdGh1YiBBUEkgVVJMXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNvbnN0cnVjdG9yKGF1dGgsIGFwaUJhc2UpIHtcbiAgICAgIHN1cGVyKGF1dGgsIGFwaUJhc2UpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFF1ZXJ5IHRoZSBjdXJyZW50IHJhdGUgbGltaXRcbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9yYXRlX2xpbWl0L1xuICAgICogQHBhcmFtIHtSZXF1ZXN0YWJsZS5jYWxsYmFja30gW2NiXSAtIHdpbGwgcmVjZWl2ZSB0aGUgcmF0ZS1saW1pdCBkYXRhXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGdldFJhdGVMaW1pdChjYikge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QoJ0dFVCcsICcvcmF0ZV9saW1pdCcsIG51bGwsIGNiKTtcbiAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSYXRlTGltaXQ7XG4iXX0=
//# sourceMappingURL=RateLimit.js.map
