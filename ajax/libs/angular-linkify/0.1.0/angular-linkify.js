angular.module('linkify', []);

angular.module('linkify').filter('linkify', function () {
    'use strict';
    
    function linkify (_str) {
        var tweet = _str.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g, function(url) { 
            var wrap = document.createElement('div');
            var anch = document.createElement('a');
            anch.href = url;
            anch.target = "_blank";
            anch.innerHTML = url;
            wrap.appendChild(anch);
            return wrap.innerHTML;
        });
        
        tweet = tweet.replace(/(^|\s)@(\w+)/g, '$1<a href="http://www.twitter.com/$2" target="_blank">@$2</a>');
        return tweet.replace(/(^|\s)#(\w+)/g, '$1<a href="http://search.twitter.com/search?q=%23$2" target="_blank">#$2</a>');
     }
    
    //
    return function (text) {
        return linkify(text);
    };
});

