/**
 * syncHeight - jQuery plugin to automagically Sync the heights of columns
 * Made to seemlessly work with the CCS-Framework YAML (yaml.de)
 * @requires jQuery v1.0.3 or newer
 *
 * http://blog.ginader.de/dev/syncheight/
 *
 * Copyright (c) 2007-2013
 * Dirk Ginader (ginader.de)
 * Dirk Jesse (yaml.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 1.5
 *
 * Changelog
 * * v1.5 fixes issue with box-sizing: border-box
 * * v1.4: new Method unSyncHeight() that removes previously added syncs i.e. for responsive layouts
 * * v1.3: compatibility fix for jQuery 1.9.x (removed $.browser)
 *
 * Usage sync:
  $(window).load(function(){
    $('p').syncHeight();
  });
 * Usage unsync:
  $(window).resize(function(){
    if($(window).width() < 500){
      $('p').unSyncHeight();
    }
  });
 */

(function($) {
  var getHeightProperty = function() {
    var browser_id = 0;
    var property = [
      // To avoid content overflow in synchronised boxes on font scaling, we
      // use 'min-height' property for modern browsers ...
      ['min-height','0px'],
      // and 'height' property for Internet Explorer.
      ['height','1%']
    ];

    var bMatch = /(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [],
      browser = bMatch[1] || "",
      browserVersion = bMatch[2] || "0";

    // check for IE6 ...
    if(browser === 'msie' && browserVersion < 7){
      browser_id = 1;
    }

    return {
      'name': property[browser_id][0],
      'autoheightVal': property[browser_id][1]
    };
  };

  $.getSyncedHeight = function(selector) {
    var max = 0;
    var heightProperty = getHeightProperty();
    // get maximum element height ...
    $(selector).each(function() {
      // fallback to auto height before height check ...
      $(this).css(heightProperty.name, heightProperty.autoheightVal);
      var val = parseInt($(this).css('height'),10);
      if(val > max){
        max = val;
      }
    });
    return max;
  };

  $.fn.syncHeight = function(config) {
    var defaults = {
      updateOnResize: false,  // re-sync element heights after a browser resize event (useful in flexible layouts)
      height: false
    };

    var options = $.extend(defaults, config);
    var e = this;
    var max = 0;
    var heightPropertyName = getHeightProperty().name;

    if(typeof(options.height) === "number") {
      max = options.height;
    } else {
      max = $.getSyncedHeight(this);
    }

    // set synchronized element height ...
    $(this).each(function() {
      $(this).css(heightPropertyName, max+'px');
    });

    // optional sync refresh on resize event ...
    if (options.updateOnResize === true) {
      $(window).resize(function(){
        $(e).syncHeight();
      });
    }
    return this;
  };

  $.fn.unSyncHeight = function() {
    var heightPropertyName = getHeightProperty().name;
    $(this).each(function() {
      $(this).css(heightPropertyName, '');
    });
  };
})(jQuery);
