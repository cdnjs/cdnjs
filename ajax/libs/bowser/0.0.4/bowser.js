/*!
  * Bowser - a browser detector
  * copyright Dustin Diaz 2011
  * https://github.com/ded/bowser
  * MIT License
  */
!function (context) {
  /**
    * navigator.userAgent =>
    * Chrome:  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.57 Safari/534.24"
    * Opera:   "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.7; U; en) Presto/2.7.62 Version/11.01"
    * Safari:  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; en-us) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"
    * IE:      "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)"
    * Firefox: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0) Gecko/20100101 Firefox/4.0"
    */

  var ua = navigator.userAgent,
      ie = /msie/i.test(ua),
      chrome = /chrome/i.test(ua),
      safari = /safari/i.test(ua) && !chrome,
      opera = /opera/i.test(ua),
      firefox = /firefox/i.test(ua),
      gecko = /gecko\//i.test(ua);

  function detect() {

    if (ie) {
      return {
        msie: 1,
        version: ua.match(/msie ([\d\.]+);/i)[1]
      };
    }
    if (chrome) {
      return {
        webkit: 1,
        chrome: 1,
        version: ua.match(/chrome\/([\d\.]+)/i)[1]
      };
    }
    if (safari) {
      return {
        webkit: 1,
        safari: 1,
        version: ua.match(/version\/([\d\.]+)/i)[1]
      };
    }
    if (opera) {
      return {
        opera: 1,
        version: ua.match(/version\/([\d\.]+)/i)[1]
      };
    }
    if (gecko) {
      var o = {
        gecko: 1,
        version: ua.match(/firefox\/([\d\.]+)/i)[1]
      };
      if (firefox) {
        o.firefox = 1;
      }
      return o;
    }

  }

  var bowser = detect();

  // Graded Browser Support
  // http://developer.yahoo.com/yui/articles/gbs
  if ((bowser.msie && bowser.version >= 6) ||
      (bowser.chrome && bowser.version >= 8) ||
      (bowser.firefox && bowser.version >= 3.6) ||
      (bowser.safari && bowser.version >= 5) ||
      (bowser.opera && bowser.version >= 9.5)) {
    bowser.a = true;
  }

  else if ((bowser.msie && bowser.version < 6) ||
      (bowser.chrome && bowser.version < 8) ||
      (bowser.firefox && bowser.version < 3.6) ||
      (bowser.safari && bowser.version < 5) ||
      (bowser.opera && bowser.version < 9.5)) {
    bowser.c = true;
  } else {
    bowser.x = true;
  }

  typeof module !== 'undefined' && module.exports ?
    (module.exports.browser = bowser) :
    (context.bowser = bowser);

}(this);