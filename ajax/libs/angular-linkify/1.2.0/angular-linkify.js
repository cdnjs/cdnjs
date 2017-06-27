angular.module('linkify', []);

angular.module('linkify')
  .filter('linkify', function () {
      'use strict';

      function linkify (_str, type) {
        if (!_str) {
          return;
        }

        var _text = _str.replace( /(?:https?\:\/\/|www\.)+(?![^\s]*?")([\w.,@?!^=%&amp;:\/~+#-]*[\w@?!^=%&amp;\/~+#-])?/ig, function(url) {
          var wrap = document.createElement('div');
          var anch = document.createElement('a');
          anch.href = url;
          anch.target = "_blank";
          anch.innerHTML = url;
          wrap.appendChild(anch);
          return wrap.innerHTML;
        });

        // bugfix
        if (!_text) {
          return '';
        }

        // Twitter
        if (type === 'twitter') {
          _text = _text.replace(/(|\s)*@([\u00C0-\u1FFF\w]+)/g, '$1<a href="https://twitter.com/$2" target="_blank">@$2</a>');
          _text = _text.replace(/(^|\s)*#([\u00C0-\u1FFF\w]+)/g, '$1<a href="https://twitter.com/search?q=%23$2" target="_blank">#$2</a>');
        }


        // Github
        if (type === 'github') {
          _text = _text.replace(/(|\s)*@(\w+)/g, '$1<a href="https://github.com/$2" target="_blank">@$2</a>');
        }

        return _text;
      }

      //
      return function (text, type) {
        return linkify(text, type);
      };
  })
  .factory('linkify', ['$filter', function ($filter) {
    'use strict';

    function _linkifyAsType (type) {
      return function (str) {(type, str);
        return $filter('linkify')(str, type);
      };
    }

    return {
      twitter: _linkifyAsType('twitter'),
      github: _linkifyAsType('github'),
      normal: _linkifyAsType()
    };
  }])
  .directive('linkify', ['$filter', '$timeout', 'linkify', function ($filter, $timeout, linkify) {
    'use strict';

    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var type = attrs.linkify || 'normal';
        $timeout(function () { element.html(linkify[type](element.html())); });
      }
    };
  }]);

