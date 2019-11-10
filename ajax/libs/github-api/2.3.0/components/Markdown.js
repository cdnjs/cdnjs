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
    global.Markdown = mod.exports;
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

  var Markdown = function (_Requestable) {
    _inherits(Markdown, _Requestable);

    /**
     * construct a RateLimit
     * @param {Requestable.auth} auth - the credentials to authenticate to GitHub
     * @param {string} [apiBase] - the base Github API URL
     * @return {Promise} - the promise for the http request
     */

    function Markdown(auth, apiBase) {
      _classCallCheck(this, Markdown);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Markdown).call(this, auth, apiBase));
    }

    /**
     * Render html from Markdown text.
     * @see https://developer.github.com/v3/markdown/#render-an-arbitrary-markdown-document
     * @param {Object} options - conversion options
     * @param {string} [options.text] - the markdown text to convert
     * @param {string} [options.mode=markdown] - can be either `markdown` or `gfm`
     * @param {string} [options.context] - repository name if mode is gfm
     * @param {Requestable.callback} [cb] - will receive the converted html
     * @return {Promise} - the promise for the http request
     */


    _createClass(Markdown, [{
      key: 'render',
      value: function render(options, cb) {
        return this._request('POST', '/markdown', options, cb);
      }
    }]);

    return Markdown;
  }(_Requestable3.default);

  module.exports = Markdown;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1hcmtkb3duLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BWU0sUTs7Ozs7Ozs7OztBQU9ILHNCQUFZLElBQVosRUFBa0IsT0FBbEIsRUFBMkI7QUFBQTs7QUFBQSx5RkFDbEIsSUFEa0IsRUFDWixPQURZO0FBRTFCOzs7Ozs7Ozs7Ozs7Ozs7OzZCQVlNLE8sRUFBUyxFLEVBQUk7QUFDakIsZUFBTyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQXNCLFdBQXRCLEVBQW1DLE9BQW5DLEVBQTRDLEVBQTVDLENBQVA7QUFDRjs7Ozs7O0FBR0osU0FBTyxPQUFQLEdBQWlCLFFBQWpCIiwiZmlsZSI6Ik1hcmtkb3duLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZVxuICogQGNvcHlyaWdodCAgMjAxMyBNaWNoYWVsIEF1ZnJlaXRlciAoRGV2ZWxvcG1lbnQgU2VlZCkgYW5kIDIwMTYgWWFob28gSW5jLlxuICogQGxpY2Vuc2UgICAgTGljZW5zZWQgdW5kZXIge0BsaW5rIGh0dHBzOi8vc3BkeC5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlLUNsZWFyLmh0bWwgQlNELTMtQ2xhdXNlLUNsZWFyfS5cbiAqICAgICAgICAgICAgIEdpdGh1Yi5qcyBpcyBmcmVlbHkgZGlzdHJpYnV0YWJsZS5cbiAqL1xuXG5pbXBvcnQgUmVxdWVzdGFibGUgZnJvbSAnLi9SZXF1ZXN0YWJsZSc7XG5cbi8qKlxuICogUmF0ZUxpbWl0IGFsbG93cyB1c2VycyB0byBxdWVyeSB0aGVpciByYXRlLWxpbWl0IHN0YXR1c1xuICovXG5jbGFzcyBNYXJrZG93biBleHRlbmRzIFJlcXVlc3RhYmxlIHtcbiAgIC8qKlxuICAgICogY29uc3RydWN0IGEgUmF0ZUxpbWl0XG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmF1dGh9IGF1dGggLSB0aGUgY3JlZGVudGlhbHMgdG8gYXV0aGVudGljYXRlIHRvIEdpdEh1YlxuICAgICogQHBhcmFtIHtzdHJpbmd9IFthcGlCYXNlXSAtIHRoZSBiYXNlIEdpdGh1YiBBUEkgVVJMXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIHRoZSBwcm9taXNlIGZvciB0aGUgaHR0cCByZXF1ZXN0XG4gICAgKi9cbiAgIGNvbnN0cnVjdG9yKGF1dGgsIGFwaUJhc2UpIHtcbiAgICAgIHN1cGVyKGF1dGgsIGFwaUJhc2UpO1xuICAgfVxuXG4gICAvKipcbiAgICAqIFJlbmRlciBodG1sIGZyb20gTWFya2Rvd24gdGV4dC5cbiAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIuZ2l0aHViLmNvbS92My9tYXJrZG93bi8jcmVuZGVyLWFuLWFyYml0cmFyeS1tYXJrZG93bi1kb2N1bWVudFxuICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBjb252ZXJzaW9uIG9wdGlvbnNcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy50ZXh0XSAtIHRoZSBtYXJrZG93biB0ZXh0IHRvIGNvbnZlcnRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5tb2RlPW1hcmtkb3duXSAtIGNhbiBiZSBlaXRoZXIgYG1hcmtkb3duYCBvciBgZ2ZtYFxuICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmNvbnRleHRdIC0gcmVwb3NpdG9yeSBuYW1lIGlmIG1vZGUgaXMgZ2ZtXG4gICAgKiBAcGFyYW0ge1JlcXVlc3RhYmxlLmNhbGxiYWNrfSBbY2JdIC0gd2lsbCByZWNlaXZlIHRoZSBjb252ZXJ0ZWQgaHRtbFxuICAgICogQHJldHVybiB7UHJvbWlzZX0gLSB0aGUgcHJvbWlzZSBmb3IgdGhlIGh0dHAgcmVxdWVzdFxuICAgICovXG4gICByZW5kZXIob3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KCdQT1NUJywgJy9tYXJrZG93bicsIG9wdGlvbnMsIGNiKTtcbiAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNYXJrZG93bjtcbiJdfQ==
//# sourceMappingURL=Markdown.js.map
