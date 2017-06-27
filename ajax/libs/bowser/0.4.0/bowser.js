/*!
  * Bowser - a browser detector
  * https://github.com/ded/bowser
  * MIT License | (c) Dustin Diaz 2014
  */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports['browser'] = definition()
  else if (typeof define == 'function') define(definition)
  else this[name] = definition()
}('bowser', function () {
   /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true,
      v /* temporary placeholder for versions. */

  function detect(ua) {

    var ie = /(msie|trident)/i.test(ua)
      , chrome = /chrome|crios/i.test(ua)
      , phantom = /phantom/i.test(ua)
      , iphone = /iphone/i.test(ua)
      , ipad = /ipad/i.test(ua)
      , ipod = /ipod/i.test(ua)
      , touchpad = /touchpad/i.test(ua)
      , silk = /silk/i.test(ua)
      , safari = /safari/i.test(ua) && !chrome && !phantom && !silk
      , android = /android/i.test(ua)
      , opera = /opera/i.test(ua) || /opr/i.test(ua)
      , firefox = /firefox/i.test(ua)
      , gecko = /gecko\//i.test(ua)
      , seamonkey = /seamonkey\//i.test(ua)
      , webkitVersion = /version\/(\d+(\.\d+)?)/i
      // , firefoxVersion = /firefox\/(\d+(\.\d+)?)/i
      , firefoxVersion = /firefox[ \/](\d+(\.\d+)?)/i
      , mobile = /mobile/i.test(ua)
      , o = {}

    if (opera) {
      if ((v = ua.match(webkitVersion)) && v.length > 1) v = v[1]
      else if ((v = ua.match(/opr\/(\d+(\.\d+)?)/i)) && v.length > 1) v = v[1]
      else if ((v = ua.match(/opera[ \/](\d+(\.\d+)?)/i)) && v.length > 1) v = v[1]
      else v = 0
      o = {
        name: 'Opera'
      , opera: t
      , version: v
      }
    } else if (ie) o = {
        name: 'Internet Explorer'
      , msie: t
      , version: ua.match(/(msie |rv:)(\d+(\.\d+)?)/i)[2]
      }
    else if (chrome) o = {
        name: 'Chrome'
      , webkit: t
      , chrome: t
      , version: ua.match(/(?:chrome|crios)\/(\d+(\.\d+)?)/i)[1]
      , ipad: ipad
      , iphone: iphone
      , ios: !!ua.match(/crios/i)
      , mobile: mobile
      }
    else if (phantom) o = {
        name: 'PhantomJS'
      , webkit: t
      , phantom: t
      , version: ua.match(/phantomjs\/(\d+(\.\d+)?)/i)[1]
      }
    else if (touchpad) o = {
        name: 'TouchPad'
      , webkit: t
      , touchpad: t
      , version : ua.match(/touchpad\/(\d+(\.\d+)?)/i)[1]
      }
    else if (silk) o =  {
        name: 'Amazon Silk'
      , webkit: t
      , android: t
      , mobile: t
      , version : ua.match(/silk\/(\d+(\.\d+)?)/i)[1]
      }
    else if (iphone || ipad || ipod) {
      o = {
        name : iphone ? 'iPhone' : ipad ? 'iPad' : 'iPod'
      , webkit: t
      , mobile: iphone
      , ios: t
      , iphone: iphone
      , ipad: ipad
      , ipod: ipod
      }
      // WTF: version is not part of user agent in web apps
      if (webkitVersion.test(ua)) {
        o.version = ua.match(webkitVersion)[1]
      }
    }
    else if (android) o = {
        name: 'Android'
      , webkit: t
      , android: t
      , mobile: t
      , version: (ua.match(webkitVersion) || ua.match(firefoxVersion))[1]
      }
    else if (safari) o = {
        name: 'Safari'
      , webkit: t
      , safari: t
      , version: ((v = ua.match(webkitVersion)) ? v[1] : 0)
      }
    else if (gecko) {
      o = {
        name: 'Gecko'
      , gecko: t
      , mozilla: t
      , version: ((v = ua.match(firefoxVersion)) && v? v[1] : 0)
      }
      if (firefox) {
        o.name = 'Firefox';
        o.firefox = t;
      }
    }
    else if (seamonkey) o = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: ua.match(/seamonkey\/(\d+(\.\d+)?)/i)[1]
      }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if ((o.msie && o.version >= 9) ||
        (o.chrome && o.version >= 20) ||
        (o.firefox && o.version >= 10.0) ||
        (o.safari && o.version >= 5) ||
        (o.opera && o.version >= 10.0)) {
      o.a = t;
    }

    else if ((o.msie && o.version < 9) ||
        (o.chrome && o.version < 20) ||
        (o.firefox && o.version < 10.0) ||
        (o.safari && o.version < 5) ||
        (o.opera && o.version < 10.0)) {
      o.c = t
    } else o.x = t

    return o
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')


  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});
