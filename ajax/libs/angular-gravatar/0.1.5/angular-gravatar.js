'use strict';
angular.module('ui.gravatar', ['md5']).provider('gravatarService', function() {
  var hashRegex, self;
  self = this;
  hashRegex = /^[0-9a-f]{32}$/i;
  this.defaults = {};
  this.secure = false;
  this.$get = [
    'md5', function(md5) {
      return {
        url: function(src, opts) {
          var k, params, pieces, urlBase, v;
          if (opts == null) {
            opts = {};
          }
          opts = angular.extend(angular.copy(self.defaults), opts);
          urlBase = self.secure ? 'https://secure' : 'http://www';
          pieces = [urlBase, '.gravatar.com/avatar/', hashRegex.test(src) ? src : md5(src)];
          params = ((function() {
            var _results;
            _results = [];
            for (k in opts) {
              v = opts[k];
              _results.push("" + k + "=" + (escape(v)));
            }
            return _results;
          })()).join('&');
          if (params.length > 0) {
            pieces.push('?' + params);
          }
          return pieces.join('');
        }
      };
    }
  ];
  return this;
}).directive('gravatarSrc', [
  'gravatarService', function(gravatarService) {
    var filterKeys;
    filterKeys = function(prefix, object) {
      var k, retVal, v;
      retVal = {};
      for (k in object) {
        v = object[k];
        if (k.indexOf(prefix) === 0) {
          k = k.substr(prefix.length).toLowerCase();
          if (k.length > 0) {
            retVal[k] = v;
          }
        }
      }
      return retVal;
    };
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var opts;
        opts = filterKeys('gravatar', attrs);
        delete opts['src'];
        return scope.$watch(attrs.gravatarSrc, function(src) {
          if (src == null) {
            return;
          }
          return element.attr('src', gravatarService.url(src, opts));
        });
      }
    };
  }
]);
