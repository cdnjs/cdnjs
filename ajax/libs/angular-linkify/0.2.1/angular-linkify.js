angular.module('linkify', []);

angular.module('linkify')
  .filter('linkify', function () {
      'use strict';
      
      function linkify (_str, type) {
          var tweet = _str.replace( /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+(?![^\s]*?")([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/ig, function(url) { 
              var wrap = document.createElement('div');
              var anch = document.createElement('a');
              anch.href = url;
              anch.target = "_blank";
              anch.innerHTML = url;
              wrap.appendChild(anch);
              return wrap.innerHTML;
          });
          
          // Twitter
          if (type === 'twitter') {
            tweet = tweet.replace(/(|\s)*@(\w+)/g, '$1<a href="https://www.twitter.com/$2" target="_blank">@$2</a>');
            tweet = tweet.replace(/(^|\s)*#(\w+)/g, '$1<a href="https://twitter.com/search?q=%23$2" target="_blank">#$2</a>');
          }
          
          // Github
          if (type === 'github') {
            
          }
          
          return tweet;
       }
      
      //
      return function (text, type) {
          return linkify(text, type);
      };
  })
  .directive('linkify', function ($filter, $timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var type = attrs.linkify;
        
        $timeout(function () {
          element.html($filter('linkify')(element.html(), type));
        });
      }
    };
  });

