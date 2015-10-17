/*!
 * jQuery Browser Plugin 0.0.7
 * https://github.com/gabceb/jquery-browser-plugin
 *
 * Original jquery-browser code Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * Modifications Copyright 2014 Gabriel Cebrian
 * https://github.com/gabceb
 *
 * Released under the MIT license
 *
 * Date: 12-12-2014
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], function ($) {
      factory($, root);
    });
  } else {
    // Browser globals
    factory(jQuery, root);
  }
}(this, function(jQuery, window) {
  "use strict";

  var matched, browser;

  jQuery.uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(edge)\/([\w.]+)/.exec( ua ) ||
        /(opr)[\/]([\w.]+)/.exec( ua ) ||
        /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

    var platform_match = /(ipad)/.exec( ua ) ||
        /(ipod)/.exec( ua ) ||
        /(iphone)/.exec( ua ) ||
        /(kindle)/.exec( ua ) ||
        /(silk)/.exec( ua ) ||
        /(android)/.exec( ua ) ||
        /(windows phone)/.exec( ua ) ||
        /(win)/.exec( ua ) ||
        /(mac)/.exec( ua ) ||
        /(linux)/.exec( ua ) ||
        /(cros)/.exec( ua ) ||
        /(playbook)/.exec( ua ) ||
        /(bb)/.exec( ua ) ||
        /(blackberry)/.exec( ua ) ||
        [];

    return {
      browser: match[ 5 ] || match[ 3 ] || match[ 1 ] || "",
      version: match[ 2 ] || match[ 4 ] || "0",
      versionNumber: match[ 4 ] || match[ 2 ] || "0",
      platform: platform_match[ 0 ] || ""
    };
  };

  matched = jQuery.uaMatch( window.navigator.userAgent );
  browser = {};

  if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.versionNumber, 10);
  }

  if ( matched.platform ) {
    browser[ matched.platform ] = true;
  }

  // These are all considered mobile platforms, meaning they run a mobile browser
  if ( browser.android || browser.bb || browser.blackberry || browser.ipad || browser.iphone ||
    browser.ipod || browser.kindle || browser.playbook || browser.silk || browser[ "windows phone" ]) {
    browser.mobile = true;
  }

  // These are all considered desktop platforms, meaning they run a desktop browser
  if ( browser.cros || browser.mac || browser.linux || browser.win ) {
    browser.desktop = true;
  }

  // Chrome, Opera 15+ and Safari are webkit based browsers
  if ( browser.chrome || browser.opr || browser.safari ) {
    browser.webkit = true;
  }

  // IE11 has a new token so we will assign it msie to avoid breaking changes
  // IE12 disguises itself as Chrome, but adds a new Edge token.
  if ( browser.rv || browser.edge ) {
    var ie = "msie";

    matched.browser = ie;
    browser[ie] = true;
  }

  // Blackberry browsers are marked as Safari on BlackBerry
  if ( browser.safari && browser.blackberry ) {
    var blackberry = "blackberry";

    matched.browser = blackberry;
    browser[blackberry] = true;
  }

  // Playbook browsers are marked as Safari on Playbook
  if ( browser.safari && browser.playbook ) {
    var playbook = "playbook";

    matched.browser = playbook;
    browser[playbook] = true;
  }

  // BB10 is a newer OS version of BlackBerry
  if ( browser.bb ) {
    var bb = "blackberry";

    matched.browser = bb;
    browser[bb] = true;
  }

  // Opera 15+ are identified as opr
  if ( browser.opr ) {
    var opera = "opera";

    matched.browser = opera;
    browser[opera] = true;
  }

  // Stock Android browsers are marked as Safari on Android.
  if ( browser.safari && browser.android ) {
    var android = "android";

    matched.browser = android;
    browser[android] = true;
  }

  // Kindle browsers are marked as Safari on Kindle
  if ( browser.safari && browser.kindle ) {
    var kindle = "kindle";

    matched.browser = kindle;
    browser[kindle] = true;
  }

   // Kindle Silk browsers are marked as Safari on Kindle
  if ( browser.safari && browser.silk ) {
    var silk = "silk";

    matched.browser = silk;
    browser[silk] = true;
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;

  jQuery.browser = browser;
  return browser;
}));
